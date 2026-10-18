import { projects, PUBLIC_REPOSITORIES, HOME_SYSTEM_IDS, publishedProjects } from './projects.ts';
import type { ProjectFact } from './projects.ts';
import { errorsOf, repositoriesOutsideAllowlist, validateManifest } from './projects.validate.ts';

export function publicCatalog(manifest: ProjectFact[] = projects): ProjectFact[] {
  const issues = [...errorsOf(validateManifest(manifest)), ...repositoriesOutsideAllowlist(manifest, PUBLIC_REPOSITORIES)];
  if (issues.length) throw new Error(issues.map((issue) => issue.projectId + ': ' + issue.rule).join('\n'));
  const published = publishedProjects(manifest);
  const ids = new Set(published.map((project) => project.id));
  for (const project of published) {
    const story = project.story;
    if (
      !story ||
      !story.ownership.trim() ||
      !story.problem.trim() ||
      !story.contribution.trim() ||
      !story.statusNote.trim() ||
      story.decisions.length === 0
    )
      throw new Error(project.id + ': incomplete project story');
    for (const decision of story.decisions)
      if (!decision.title.trim() || !decision.description.trim()) throw new Error(project.id + ': incomplete engineering decision');
    for (const id of story.related) if (!ids.has(id)) throw new Error(project.id + ': related project is not approved: ' + id);
    const study = story.study;
    if (!study) throw new Error(project.id + ': incomplete case study');
    for (const paragraphs of [study.context, study.implementation, study.evidence, study.limitations])
      if (!paragraphs?.length || paragraphs.some((paragraph) => !paragraph.trim())) throw new Error(project.id + ': incomplete case study');
    if (
      study.workflow &&
      (!study.workflow.title.trim() ||
        !study.workflow.steps.length ||
        study.workflow.steps.some((step) => !step.title.trim() || !step.description.trim()))
    )
      throw new Error(project.id + ': incomplete architecture workflow');
    if (project.visibility === 'private' && study.references.length)
      throw new Error(project.id + ': private case study cannot publish source references');
    const repositories = new Set([project.repository, ...(project.repositories ?? [])]);
    for (const reference of study.references) {
      let url: URL;
      try {
        url = new URL(reference.href);
      } catch {
        throw new Error(project.id + ': invalid source reference');
      }
      const [, owner, repository, kind, revision, ...path] = url.pathname.split('/');
      if (
        !reference.label.trim() ||
        url.origin !== 'https://github.com' ||
        url.username ||
        url.password ||
        url.search ||
        url.hash ||
        !repositories.has(owner + '/' + repository) ||
        !PUBLIC_REPOSITORIES.includes(owner + '/' + repository) ||
        kind !== 'blob' ||
        !/^[a-f0-9]{40}$/.test(revision) ||
        !path.length ||
        path.some((part) => !part)
      )
        throw new Error(project.id + ': source reference must pin a file in its approved public repository');
    }
  }
  return published;
}

export function approvedHomeSystems(catalog = publicCatalog()) {
  const ids = new Set(catalog.map((project) => project.id));
  for (const id of HOME_SYSTEM_IDS) if (!ids.has(id)) throw new Error('Unapproved home system: ' + id);
  return [...HOME_SYSTEM_IDS];
}
