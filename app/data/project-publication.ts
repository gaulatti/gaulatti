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
  }
  return published;
}

export function approvedHomeSystems(catalog = publicCatalog()) {
  const ids = new Set(catalog.map((project) => project.id));
  for (const id of HOME_SYSTEM_IDS) if (!ids.has(id)) throw new Error('Unapproved home system: ' + id);
  return [...HOME_SYSTEM_IDS];
}
