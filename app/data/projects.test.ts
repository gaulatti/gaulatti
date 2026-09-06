import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  HOME_SYSTEM_IDS,
  PUBLIC_REPOSITORIES,
  projects,
  projectsByIds,
  repositoryLinks,
  siteLink,
  projectsForSurface,
  publishedProjects,
  statusLabel,
  type ProjectFact
} from './projects.ts';
import {
  EXPIRED_AFTER_DAYS,
  STALE_AFTER_DAYS,
  errorsOf,
  evidenceAgeDays,
  isPublishableHref,
  repositoriesOutsideAllowlist,
  validateManifest,
  validateProject
} from './projects.validate.ts';

/** A minimal valid entry to mutate one field at a time. */
const entry = (overrides: Partial<ProjectFact> = {}): ProjectFact => ({
  id: 'example',
  name: 'Example',
  subtitle: 'Subtitle',
  summary: 'A summary.',
  status: 'in-development',
  visibility: 'public',
  publicationApproved: true,
  evidenceDate: '2026-09-06',
  surface: 'personal',
  tags: ['Tag'],
  links: [],
  art: { type: 'monitor' },
  ...overrides
});

const NOW = new Date('2026-09-06T12:00:00.000Z');
const rules = (project: ProjectFact, now: Date = NOW) =>
  validateProject(project, now).map((issue) => issue.rule);

/* -------------------------------------------------------------------------- */
/* The real manifest                                                          */
/* -------------------------------------------------------------------------- */

test('the published manifest has no validation errors', () => {
  const issues = errorsOf(validateManifest(projects));
  assert.deepEqual(
    issues.map((issue) => `${issue.projectId}: ${issue.rule} — ${issue.message}`),
    []
  );
});

test('every repository the manifest publishes is on the public allowlist', () => {
  assert.deepEqual(repositoriesOutsideAllowlist(projects, PUBLIC_REPOSITORIES), []);
});

test('no entry links a host outside the ones the site vouches for', () => {
  const allowedHosts = new Set(['github.com', 'monitor.gaulatti.com', 'broadway.gaulatti.com']);
  for (const project of publishedProjects()) {
    for (const link of project.links) {
      assert.ok(
        allowedHosts.has(new URL(link.href).hostname),
        `${project.id} links an unvetted host: ${link.href}`
      );
    }
  }
});

test('both portfolio surfaces render something', () => {
  assert.ok(projectsForSurface('personal').length > 0);
  assert.ok(projectsForSurface('media-infrastructure').length > 0);
});

/* -------------------------------------------------------------------------- */
/* Editorial corrections                                                      */
/* -------------------------------------------------------------------------- */

const find = (id: string): ProjectFact => {
  const project = projects.find((candidate) => candidate.id === id);
  assert.ok(project, `${id} is missing from the manifest`);
  return project;
};

test('Colombo describes acceptance rather than completed delivery', () => {
  const colombo = find('colombo');
  assert.match(colombo.summary, /durable spool/i);
  assert.match(colombo.summary, /retried independently/i);
  assert.match(colombo.summary, /promise to deliver rather than a completed delivery/i);
  // The Java implementation moved to an archive branch; the site said otherwise.
  assert.doesNotMatch(colombo.summary, /Java|Spring Boot|Apache FTP/i);
  assert.ok(colombo.tags.includes('Rust'));
});

test('Alana is the composed broadcast runtime, not an OBS container', () => {
  const alana = find('alana');
  assert.match(alana.subtitle, /composed broadcast runtime/i);
  assert.match(alana.summary, /RTMP/);
  assert.match(alana.summary, /lifecycle-controlled/i);
  assert.doesNotMatch(alana.summary, /YouTube|Intel QSV|VNC|OBS Studio/i);
});

test('Broadway is typed static and media authoring, not only story templates', () => {
  const broadway = find('broadway');
  assert.match(broadway.subtitle, /typed template authoring/i);
  assert.match(broadway.summary, /typed templates/i);
  assert.match(broadway.summary, /PDF/);
  assert.doesNotMatch(broadway.summary, /1080×1920|social media story/i);
});

test('Manzoni does not claim the React Native migration has shipped', () => {
  const manzoni = find('manzoni');
  assert.match(manzoni.summary, /published client is Flutter/i);
  assert.match(manzoni.summary, /not on the public branch yet/i);
  assert.equal(manzoni.status, 'in-development');
});

test('Kolibri is private, unlaunched, and not publicly distributable', () => {
  const kolibri = find('kolibri');
  assert.equal(kolibri.visibility, 'private');
  assert.equal(kolibri.status, 'private-development');
  assert.deepEqual(kolibri.links, []);
  assert.equal(kolibri.repository, undefined);
  assert.match(kolibri.summary, /deferred until graduation/i);
  assert.match(statusLabel(kolibri.status), /private/i);
  assert.doesNotMatch(kolibri.summary, /available|download|launched|try it/i);
});

test('every private entry stays link-free and unlaunched', () => {
  for (const project of publishedProjects().filter((p) => p.visibility === 'private')) {
    assert.deepEqual(project.links, [], `${project.id} publishes a link`);
    assert.equal(project.repository, undefined, `${project.id} names a repository`);
    assert.notEqual(project.status, 'live', `${project.id} claims to be live`);
  }
});

/* -------------------------------------------------------------------------- */
/* Manual approval                                                            */
/* -------------------------------------------------------------------------- */

test('nothing renders without explicit approval', () => {
  const manifest = [entry({ id: 'approved' }), entry({ id: 'draft', publicationApproved: false })];
  assert.deepEqual(
    publishedProjects(manifest).map((project) => project.id),
    ['approved']
  );
  assert.deepEqual(
    projectsForSurface('personal', manifest).map((project) => project.id),
    ['approved']
  );
});

/* -------------------------------------------------------------------------- */
/* Duplicate ids and required fields                                          */
/* -------------------------------------------------------------------------- */

test('a duplicate id is an error', () => {
  const issues = validateManifest([entry({ id: 'twice' }), entry({ id: 'twice' })], NOW);
  assert.ok(errorsOf(issues).some((issue) => issue.rule === 'duplicate-id'));
});

test('ids must be kebab-case and fields must be present', () => {
  assert.ok(rules(entry({ id: 'Not Kebab' })).includes('id-format'));
  assert.ok(rules(entry({ name: '  ' })).includes('name-required'));
  assert.ok(rules(entry({ subtitle: '' })).includes('subtitle-required'));
  assert.ok(rules(entry({ summary: '' })).includes('summary-required'));
  assert.ok(rules(entry({ tags: [] })).includes('tags-required'));
  assert.deepEqual(rules(entry()), []);
});

/* -------------------------------------------------------------------------- */
/* Links                                                                      */
/* -------------------------------------------------------------------------- */

test('only https and site-relative links are publishable', () => {
  assert.equal(isPublishableHref('https://example.com/x'), true);
  assert.equal(isPublishableHref('/contact'), true);
  assert.equal(isPublishableHref('http://example.com'), false);
  assert.equal(isPublishableHref('//example.com'), false);
  assert.equal(isPublishableHref('ftp://example.com'), false);
  assert.equal(isPublishableHref('https://'), false);
  assert.equal(isPublishableHref(''), false);
  assert.equal(isPublishableHref('   '), false);
});

test('bad, unlabelled, and duplicated links are errors', () => {
  const found = rules(
    entry({
      links: [
        { label: '', href: 'http://example.com', kind: 'site' },
        { label: 'Dup', href: 'https://example.com/a', kind: 'article' },
        { label: 'Dup', href: 'https://example.com/a', kind: 'article' }
      ]
    })
  );
  assert.ok(found.includes('link-label'));
  assert.ok(found.includes('link-href'));
  assert.ok(found.includes('link-duplicate'));
});

test('a live entry must link the site that proves it', () => {
  assert.ok(rules(entry({ status: 'live' })).includes('live-needs-site'));
  assert.deepEqual(
    rules(
      entry({
        status: 'live',
        links: [{ label: 'Site', href: 'https://example.com', kind: 'site' }]
      })
    ),
    []
  );
});

/* -------------------------------------------------------------------------- */
/* Visibility                                                                 */
/* -------------------------------------------------------------------------- */

test('a private entry cannot publish links, a repository, or a live claim', () => {
  const found = rules(
    entry({
      visibility: 'private',
      status: 'live',
      repository: 'gaulatti/secret',
      links: [{ label: 'Repo', href: 'https://github.com/gaulatti/secret', kind: 'repository' }]
    })
  );
  assert.ok(found.includes('private-no-links'));
  assert.ok(found.includes('private-no-repository'));
  assert.ok(found.includes('private-not-live'));
  assert.ok(found.includes('private-status'));
});

test('a private-development entry must not be marked public', () => {
  assert.ok(rules(entry({ status: 'private-development' })).includes('public-status'));
});

test('an archived private entry is allowed', () => {
  assert.deepEqual(rules(entry({ visibility: 'private', status: 'archived' })), []);
});

test('a repository must be an owner/name pair', () => {
  assert.ok(rules(entry({ repository: 'not-a-pair' })).includes('repository-format'));
});

/* -------------------------------------------------------------------------- */
/* Allowlist                                                                  */
/* -------------------------------------------------------------------------- */

test('a repository outside the allowlist is refused', () => {
  const issues = repositoriesOutsideAllowlist(
    [entry({ repository: 'gaulatti/not-vouched-for' })],
    PUBLIC_REPOSITORIES
  );
  assert.deepEqual(issues.map((issue) => issue.rule), ['repository-not-allowlisted']);
});

test('a repository link that no allowlisted repository backs is refused', () => {
  // This is the shape of the bug the site had: a link to a repository the
  // entry does not name and nobody vouched for.
  const unbacked = repositoriesOutsideAllowlist(
    [
      entry({
        links: [{ label: 'mattone', href: 'https://github.com/gaulatti/mattone', kind: 'repository' }]
      })
    ],
    PUBLIC_REPOSITORIES
  );
  assert.deepEqual(unbacked.map((issue) => issue.rule), ['repository-link-unbacked']);

  const mismatched = repositoriesOutsideAllowlist(
    [
      entry({
        repository: 'gaulatti/colombo',
        links: [{ label: 'Other', href: 'https://github.com/gaulatti/other', kind: 'repository' }]
      })
    ],
    PUBLIC_REPOSITORIES
  );
  assert.deepEqual(mismatched.map((issue) => issue.rule), ['repository-link-mismatch']);
});

test('non-repository links are not allowlist-checked', () => {
  assert.deepEqual(
    repositoriesOutsideAllowlist(
      [entry({ links: [{ label: 'Post', href: 'https://blog.example.com/x', kind: 'article' }] })],
      PUBLIC_REPOSITORIES
    ),
    []
  );
});

/* -------------------------------------------------------------------------- */
/* Freshness                                                                  */
/* -------------------------------------------------------------------------- */

const daysAfter = (isoDate: string, days: number): Date =>
  new Date(Date.parse(`${isoDate}T00:00:00.000Z`) + days * 24 * 60 * 60 * 1000);

test('evidence age is measured in whole days', () => {
  assert.equal(evidenceAgeDays('2026-09-06', new Date('2026-09-06T23:59:59.000Z')), 0);
  assert.equal(evidenceAgeDays('2026-09-06', new Date('2026-09-16T00:00:00.000Z')), 10);
  assert.equal(evidenceAgeDays('not-a-date', NOW), null);
  assert.equal(evidenceAgeDays('2026-13-45', NOW), null);
});

test('fresh evidence produces nothing', () => {
  assert.deepEqual(rules(entry(), daysAfter('2026-09-06', STALE_AFTER_DAYS)), []);
});

test('stale evidence warns but does not fail the build', () => {
  const issues = validateProject(entry(), daysAfter('2026-09-06', STALE_AFTER_DAYS + 1));
  assert.deepEqual(issues.map((issue) => issue.rule), ['evidence-stale']);
  assert.deepEqual(errorsOf(issues), []);
});

test('expired evidence on a published entry is an error', () => {
  const issues = validateProject(entry(), daysAfter('2026-09-06', EXPIRED_AFTER_DAYS + 1));
  assert.deepEqual(errorsOf(issues).map((issue) => issue.rule), ['evidence-expired']);
});

test('expired evidence on an unpublished entry only warns', () => {
  const issues = validateProject(
    entry({ publicationApproved: false }),
    daysAfter('2026-09-06', EXPIRED_AFTER_DAYS + 1)
  );
  assert.deepEqual(issues.map((issue) => issue.rule), ['evidence-stale']);
});

test('a malformed or future evidence date is an error', () => {
  assert.ok(rules(entry({ evidenceDate: 'yesterday' })).includes('evidence-date'));
  assert.ok(rules(entry({ evidenceDate: '2026-09-06' }), new Date('2026-09-01T00:00:00.000Z')).includes('evidence-future'));
});

/* -------------------------------------------------------------------------- */
/* Labels                                                                     */
/* -------------------------------------------------------------------------- */

test('every status has a label', () => {
  for (const status of ['live', 'in-development', 'private-development', 'archived'] as const) {
    assert.ok(statusLabel(status).length > 0);
  }
});

/* -------------------------------------------------------------------------- */
/* Home selection and link helpers                                            */
/* -------------------------------------------------------------------------- */

test('every curated home system exists and is approved', () => {
  const selected = projectsByIds(HOME_SYSTEM_IDS);
  assert.deepEqual(
    selected.map((project) => project.id),
    HOME_SYSTEM_IDS,
    'a home system id is missing from the manifest or is not approved'
  );
});

test('unknown or unapproved ids are dropped rather than rendered empty', () => {
  const manifest = [entry({ id: 'known' }), entry({ id: 'draft', publicationApproved: false })];
  assert.deepEqual(
    projectsByIds(['known', 'draft', 'nonexistent'], manifest).map((project) => project.id),
    ['known']
  );
});

test('link helpers never surface anything for a private entry', () => {
  const kolibri = find('kolibri');
  assert.equal(siteLink(kolibri), undefined);
  assert.deepEqual(repositoryLinks(kolibri), []);

  const broadway = find('broadway');
  assert.equal(siteLink(broadway)?.href, 'https://broadway.gaulatti.com');
  assert.deepEqual(
    repositoryLinks(broadway).map((link) => link.href),
    ['https://github.com/gaulatti/broadway']
  );
});
