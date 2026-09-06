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
export type ProjectSurface = 'personal' | 'media-infrastructure';

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
  art: {
    type: 'autostrada' | 'pompeii' | 'monitor';
    imageUrl?: string;
  };
}

/**
 * Repositories a person has explicitly confirmed are public and may be linked.
 *
 * This is an allowlist rather than a blocklist on purpose: this repository is
 * itself public, so enumerating what is *private* would publish private
 * metadata. Nothing is added here by discovery.
 *
 * Confirmed public on 2026-09-06.
 */
export const PUBLIC_REPOSITORIES: string[] = [
  'gaulatti/alana',
  'gaulatti/alcantara',
  'gaulatti/broadway',
  'gaulatti/colombo',
  'gaulatti/manzoni'
];

/**
 * Verified against each repository's public default branch and, where a public
 * URL exists, against a live response on 2026-09-06.
 */
export const projects: ProjectFact[] = [
  {
    id: 'colombo',
    name: 'Colombo',
    subtitle: 'Newsroom Upload Gateway',
    summary:
      'A single-process Rust upload gateway for live photo ingestion. It accepts FTP, explicit FTPS, and HTTP uploads, validates credentials against the tenant CMS, and returns success only once the file and its operation context are in a durable spool that survives a restart. Delivery to S3 and the CMS callback are retried independently afterwards, so an accepted upload is a promise to deliver rather than a completed delivery.',
    status: 'in-development',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'personal',
    tags: ['Rust', 'FTP/FTPS', 'HTTP', 'AWS S3', 'PostgreSQL'],
    repository: 'gaulatti/colombo',
    links: [{ label: 'GitHub', href: 'https://github.com/gaulatti/colombo', kind: 'repository' }],
    art: { type: 'monitor', imageUrl: '/hero/colombo.avif' }
  },
  {
    id: 'monitor',
    name: 'Monitor',
    subtitle: 'Global News & Earthquake Monitoring',
    summary:
      'Source-agnostic ingestion from global news sources with language detection, semantic embedding, and story clustering, plus real-time feeds for posts, events, and earthquakes. Built to separate signal from noise while a story is still breaking.',
    status: 'live',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'personal',
    tags: ['TypeScript', 'NestJS', 'Qdrant', 'SSE', 'AWS'],
    links: [{ label: 'monitor.gaulatti.com', href: 'https://monitor.gaulatti.com', kind: 'site' }],
    art: { type: 'monitor', imageUrl: '/hero/monitor.avif' }
  },
  {
    id: 'manzoni',
    name: 'Manzoni',
    subtitle: 'Field Capture Client',
    summary:
      'The camera client photographers use in the field: capture a photo and upload it straight to Colombo, with credentials held in platform secure storage and the upload surfaced as it happens. The published client is Flutter; a React Native rewrite on the shared component system is underway and is not on the public branch yet.',
    status: 'in-development',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'personal',
    tags: ['Flutter', 'Dart', 'iOS', 'Android'],
    repository: 'gaulatti/manzoni',
    links: [{ label: 'GitHub', href: 'https://github.com/gaulatti/manzoni', kind: 'repository' }],
    art: { type: 'autostrada', imageUrl: '/hero/normandy.avif' }
  },
  {
    id: 'kolibri',
    name: 'Kolibri',
    subtitle: 'Private product, in development',
    summary:
      'A capstone-derived product currently in private development. Its public launch is deliberately deferred until graduation, so there is nothing to try, install, or read yet — it is listed here only so the portfolio is complete and honest about what exists.',
    status: 'private-development',
    visibility: 'private',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'personal',
    tags: ['In development'],
    links: [],
    art: { type: 'pompeii' }
  },
  {
    id: 'alcantara',
    name: 'Alcántara',
    subtitle: 'Broadcast Overlay & Program Control',
    summary:
      'The control surface for a live broadcast: lower thirds, full-screen graphics, and corner bugs at a fixed 1920×1080, pushed to air over SSE. Scene and playlist control, once split into a separate tool, now live here.',
    status: 'in-development',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'media-infrastructure',
    tags: ['React', 'NestJS', 'SSE', 'Prisma', 'obs-websocket'],
    repository: 'gaulatti/alcantara',
    links: [{ label: 'GitHub', href: 'https://github.com/gaulatti/alcantara', kind: 'repository' }],
    art: { type: 'monitor', imageUrl: '/hero/catastrophes.avif' }
  },
  {
    id: 'alana',
    name: 'Alana',
    subtitle: 'Composed Broadcast Runtime',
    summary:
      'The headless runtime that renders one Alcántara program and publishes it — to one or more RTMP outputs and, optionally, a concurrent low-latency feed. It is lifecycle-controlled: it renders nothing until an authenticated start is accepted and acknowledged. For public destinations it is transport-only, forwarding opaque identifiers and secret references without ever resolving one.',
    status: 'in-development',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'media-infrastructure',
    tags: ['Docker', 'RTMP', 'LiveKit', 'Broadcast'],
    repository: 'gaulatti/alana',
    links: [{ label: 'GitHub', href: 'https://github.com/gaulatti/alana', kind: 'repository' }],
    art: { type: 'pompeii', imageUrl: '/hero/nazca.avif' }
  },
  {
    id: 'broadway',
    name: 'Broadway',
    subtitle: 'Typed Template Authoring',
    summary:
      'An authoring tool for static and media pieces built from reusable, typed templates. Each template declares its fields, the editor generates the form, the preview updates live, and the result exports as a high-quality PNG or, for document templates, a vector PDF with selectable text.',
    status: 'live',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'media-infrastructure',
    tags: ['React Router 7', 'TypeScript', 'Tailwind CSS 4', 'Vite'],
    repository: 'gaulatti/broadway',
    links: [
      { label: 'broadway.gaulatti.com', href: 'https://broadway.gaulatti.com', kind: 'site' },
      { label: 'GitHub', href: 'https://github.com/gaulatti/broadway', kind: 'repository' }
    ],
    art: { type: 'autostrada', imageUrl: '/hero/wiphala.avif' }
  },
  {
    id: 'cronkite',
    name: 'Cronkite',
    subtitle: 'Publishing & Rendering Pipeline',
    summary:
      'The publishing path behind the newsroom: it renders static pages, pushes them to storage, and produces automated short-form video from published content. Its source is private.',
    status: 'private-development',
    visibility: 'private',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'media-infrastructure',
    tags: ['TypeScript', 'AWS S3', 'FFmpeg'],
    links: [],
    art: { type: 'autostrada', imageUrl: '/hero/design.avif' }
  },
  {
    id: 'celesti',
    name: 'Celesti',
    subtitle: 'Stream Routing & Newsroom Displays',
    summary:
      'Channel inventory and display management for a newsroom wall: a Go service holds the channel list and dispatches playback commands over SSE to Android TV clients. Both components are private.',
    status: 'private-development',
    visibility: 'private',
    publicationApproved: true,
    evidenceDate: '2026-09-06',
    surface: 'media-infrastructure',
    tags: ['Go', 'Kotlin', 'Jetpack Compose', 'SSE'],
    links: [],
    art: { type: 'monitor', imageUrl: '/hero/points.avif' }
  }
];

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

/**
 * The entries the site may render. Approval is manual and per entry; there is
 * no discovery path that can add one.
 */
export function publishedProjects(manifest: ProjectFact[] = projects): ProjectFact[] {
  return manifest.filter((project) => project.publicationApproved);
}

export function projectsForSurface(
  surface: ProjectSurface,
  manifest: ProjectFact[] = projects
): ProjectFact[] {
  return publishedProjects(manifest).filter((project) => project.surface === surface);
}

/** Published entries for an explicit, ordered list of ids. Unknown ids are dropped. */
export function projectsByIds(ids: string[], manifest: ProjectFact[] = projects): ProjectFact[] {
  const published = new Map(publishedProjects(manifest).map((project) => [project.id, project]));
  return ids.flatMap((id) => {
    const project = published.get(id);
    return project ? [project] : [];
  });
}

/** The single site link an entry offers, if it has one. */
export function siteLink(project: ProjectFact): ProjectLink | undefined {
  return project.links.find((link) => link.kind === 'site');
}

/** Repository links for an entry. Private entries always have none. */
export function repositoryLinks(project: ProjectFact): ProjectLink[] {
  return project.links.filter((link) => link.kind === 'repository');
}

/** Human-readable status label, used wherever an entry is not simply live. */
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
