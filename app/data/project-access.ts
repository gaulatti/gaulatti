import type { ProjectFact, ProjectLink, ProjectSurface, ProjectStatus } from './projects';

export function projectAccess(catalog: ProjectFact[]) {
  function publishedProjects(manifest: ProjectFact[] = catalog): ProjectFact[] {
    return manifest.filter((project) => project.publicationApproved);
  }
  function projectsForSurface(surface: ProjectSurface, manifest: ProjectFact[] = catalog): ProjectFact[] {
    return publishedProjects(manifest).filter((project) => project.surface === surface);
  }
  function projectsByIds(ids: string[], manifest: ProjectFact[] = catalog): ProjectFact[] {
    const published = new Map(publishedProjects(manifest).map((project) => [project.id, project]));
    return ids.flatMap((id) => {
      const project = published.get(id);
      return project ? [project] : [];
    });
  }
  function publishedProject(id: string | undefined, manifest: ProjectFact[] = catalog): ProjectFact | undefined {
    return publishedProjects(manifest).find((project) => project.id === id);
  }
  return { publishedProjects, projectsForSurface, projectsByIds, publishedProject };
}

export function projectPath(project: Pick<ProjectFact, 'id'>): string {
  return '/portfolio/' + project.id;
}
export function siteLink(project: ProjectFact): ProjectLink | undefined {
  return project.links.find((link) => link.kind === 'site');
}
export function repositoryLinks(project: ProjectFact): ProjectLink[] {
  return project.links.filter((link) => link.kind === 'repository');
}
export function statusLabel(status: ProjectStatus): string {
  switch (status) {
    case 'live':
      return 'Live';
    case 'in-development':
      return 'In development';
    case 'private-development':
      return 'Private · in development';
    case 'archived':
      return 'Archived';
  }
}
