import { portfolioCatalog } from './project-catalog.ts';

/**
 * The curated project manifest.
 *
 * Every public project fact on this site is rendered from here, so a claim can
 * be corrected in one place instead of drifting across route components.
 *
 * Three rules govern this file:
 *
 * 1. **Editorial, not discovered.** Nothing writes to this manifest
 *    automatically. Repository discovery may *suggest* that an entry has
 *    drifted, but a person decides what the site says.
 * 2. **Manual approval.** An entry appears on the site only when
 *    `publicationApproved` is true. The default for anything new is `false`.
 * 3. **Nothing private leaks.** An entry whose `visibility` is `private`
 *    carries no repository, no links, and never claims to be live. Private
 *    repository URLs and internal endpoints are never inferred into output.
 *
 * `evidenceDate` is the day the entry was last checked against the repository
 * or a running system. See `projects.validate.ts` for the freshness policy.
 */

/** How available the product itself is — not how finished it is. */
export type ProjectStatus =
  /** Publicly reachable and running. Requires a `site` link. */
  | 'live'
  /** Public source, actively built, not offered as a public service. */
  | 'in-development'
  /** Private. Not publicly available and not publicly distributable. */
  | 'private-development'
  /** No longer developed or operated. */
  | 'archived';

/** Whether the product and its source are public at all. */
export type ProjectVisibility = 'public' | 'private';

/** Which portfolio surface an entry belongs to. */
export type ProjectSurface = 'personal' | 'media-infrastructure' | 'ai-platforms' | 'design-systems' | 'earlier-work';

export type ProjectLinkKind = 'site' | 'repository' | 'article';

export interface ProjectLink {
  label: string;
  href: string;
  kind: ProjectLinkKind;
}

export interface ProjectFact {
  /** Stable identifier. Never renamed once published; the display name may change. */
  id: string;
  name: string;
  /** Short label shown above the summary on the systems grid. */
  subtitle: string;
  /** Curated public description. */
  summary: string;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  /** Manual approval gate. Nothing renders on the public site without this. */
  publicationApproved: boolean;
  /** ISO `YYYY-MM-DD` date the facts here were last verified. */
  evidenceDate: string;
  surface: ProjectSurface;
  tags: string[];
  links: ProjectLink[];
  /** `owner/name`, and only ever for a repository that is public. */
  repository?: string;
  /** Additional public repositories that form the same product. */
  repositories?: string[];
  story?: ProjectStory;
  art: {
    type: 'autostrada' | 'pompeii' | 'monitor';
    imageUrl?: string;
  };
}

export interface ProjectStory {
  problem: string;
  contribution: string;
  decisions: Array<{ title: string; description: string }>;
  statusNote: string;
  related: string[];
}

/**
 * Repositories a person has explicitly confirmed are public and may be linked.
 *
 * This is an allowlist rather than a blocklist on purpose: this repository is
 * itself public, so enumerating what is *private* would publish private
 * metadata. Nothing is added here by discovery.
 *
 * Confirmed public on 2026-10-18. A profile-only README repository is excluded.
 */
export const PUBLIC_REPOSITORIES: string[] = [
  'gaulatti/alana',
  'gaulatti/alcantara',
  'gaulatti/atlantide',
  'gaulatti/autostrada',
  'gaulatti/autostrada-frontend',
  'gaulatti/autostrada-service',
  'gaulatti/avelino',
  'gaulatti/bleecker',
  'gaulatti/broadway',
  'gaulatti/castela',
  'gaulatti/clouseau',
  'gaulatti/colombo',
  'gaulatti/croccante',
  'gaulatti/foris-challenge',
  'gaulatti/gaulatti',
  'gaulatti/gtt-player',
  'gaulatti/guggiana',
  'gaulatti/leonora-latorre',
  'gaulatti/manzoni',
  'gaulatti/mistify',
  'gaulatti/nazca',
  'gaulatti/nena',
  'gaulatti/orchard',
  'gaulatti/palazzo',
  'gaulatti/php-nuke',
  'gaulatti/roxette',
  'gaulatti/sabella',
  'gaulatti/springfield',
  'gaulatti/thompson',
];

/**
 * Verified against each repository's public default branch and, where a public
 * URL exists, against the evidence described in each project story. Source review does not imply deployment verification.
 */
export const projects: ProjectFact[] = portfolioCatalog;

/**
 * The systems highlighted on the home page, in the order they appear. A
 * curated selection rather than a query, so the home page stays an editorial
 * surface. Every id must exist in the manifest and be approved.
 */
export const HOME_SYSTEM_IDS: string[] = [
  'alcantara',
  'alana',
  'broadway',
  'cronkite',
  'monitor',
  'celesti'
];

export { projectPath, siteLink, repositoryLinks, statusLabel } from './project-access.ts';
import { projectAccess } from './project-access.ts';
export const { publishedProjects, projectsForSurface, projectsByIds, publishedProject } = projectAccess(projects);
