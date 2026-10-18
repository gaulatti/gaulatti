import { approvedProjects, approvedHomeSystemIds } from './public-projects.generated';
import { projectAccess } from './project-access';
export type { ProjectFact, ProjectStory, ProjectSurface, ProjectStatus, ProjectLink } from './projects';
export { projectPath, siteLink, repositoryLinks, statusLabel } from './project-access';

export const projects = approvedProjects;
export const HOME_SYSTEM_IDS = approvedHomeSystemIds;
export const { publishedProjects, projectsForSurface, projectsByIds, publishedProject } = projectAccess(projects);
