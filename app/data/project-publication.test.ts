import assert from 'node:assert/strict';
import { test } from 'node:test';
import { projects, PUBLIC_REPOSITORIES, publishedProject } from './projects.ts';
import { publicCatalog } from './project-publication.ts';

test('an unapproved project is absent from the exported browser data and URL lookup', () => {
  const draft = { ...projects[0], id: 'unapproved-example', name: 'UNAPPROVED_CONTENT_MARKER', publicationApproved: false };
  const manifest = [...projects, draft];
  assert.equal(publishedProject(draft.id, manifest), undefined);
  assert.ok(!JSON.stringify(publicCatalog(manifest)).includes(draft.name));
});

test('a relationship cannot publish a link to an unapproved project', () => {
  const first = { ...projects[0], story: { ...projects[0].story!, related: ['unapproved-example'] } };
  assert.throws(() => publicCatalog([first, ...projects.slice(1)]), /related project is not approved/);
});

test('every curated public repository belongs to a project, including grouped components', () => {
  const covered = new Set(projects.flatMap((project) => [project.repository, ...(project.repositories ?? [])]).filter(Boolean));
  for (const repository of PUBLIC_REPOSITORIES) assert.ok(covered.has(repository), repository + ' is missing from the portfolio');
});
