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

test('case-study source references cannot reveal a private project or an unapproved repository', () => {
  const privateProject = projects.find((project) => project.visibility === 'private')!;
  const reference = projects.find((project) => project.id === 'croccante')!.story!.study.references[0];
  const privateWithSource = {
    ...privateProject,
    story: { ...privateProject.story!, study: { ...privateProject.story!.study, references: [reference] } }
  };
  assert.throws(
    () => publicCatalog([privateWithSource, ...projects.filter((project) => project.id !== privateProject.id)]),
    /private case study/
  );
  const first = projects[0];
  const unrelatedSource = {
    ...first,
    story: {
      ...first.story!,
      study: {
        ...first.story!.study,
        references: [{ ...reference, href: 'https://github.com/other/private/blob/' + 'a'.repeat(40) + '/README.md' }]
      }
    }
  };
  assert.throws(() => publicCatalog([unrelatedSource, ...projects.slice(1)]), /approved public repository/);
});

test('source references must name an immutable revision rather than a moving branch', () => {
  const first = projects[0];
  const reference = first.story!.study.references[0];
  const changed = {
    ...first,
    story: {
      ...first.story!,
      study: {
        ...first.story!.study,
        references: [{ ...reference, href: reference.href.replace(/\/blob\/[a-f0-9]{40}\//, '/blob/main/') }]
      }
    }
  };
  assert.throws(() => publicCatalog([changed, ...projects.slice(1)]), /source reference must pin/);
});
