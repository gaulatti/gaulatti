import type { ProjectFact, ProjectLink } from './projects';

/**
 * Validation for the curated project manifest.
 *
 * These checks exist to stop the site from drifting back into the failure modes
 * it has already had: a stale description, a dead link, a private repository
 * URL published by accident, and a fact nobody has re-checked in a year.
 *
 * Everything here is pure; `now` is injected so the freshness policy is
 * deterministic in tests.
 */

/** Past this age an entry is reported as a warning: worth re-checking. */
export const STALE_AFTER_DAYS = 180;

/** Past this age a *published* entry is an error: it may no longer be true. */
export const EXPIRED_AFTER_DAYS = 365;

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const REPOSITORY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]*\/[A-Za-z0-9._-]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type IssueSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: IssueSeverity;
  /** The offending entry, or `manifest` for a whole-manifest problem. */
  projectId: string;
  rule: string;
  message: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function error(projectId: string, rule: string, message: string): ValidationIssue {
  return { severity: 'error', projectId, rule, message };
}

function warning(projectId: string, rule: string, message: string): ValidationIssue {
  return { severity: 'warning', projectId, rule, message };
}

function isBlank(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

/**
 * A link is publishable when it is an absolute `https` URL or a site-relative
 * path. Plain `http` and protocol-relative URLs are refused outright.
 */
export function isPublishableHref(href: string): boolean {
  if (isBlank(href)) return false;
  if (href.startsWith('/')) return !href.startsWith('//');
  if (!href.startsWith('https://')) return false;
  try {
    const url = new URL(href);
    return url.hostname.length > 0;
  } catch {
    return false;
  }
}

/** Whole days between an ISO `YYYY-MM-DD` evidence date and `now`. */
export function evidenceAgeDays(evidenceDate: string, now: Date): number | null {
  if (!DATE_PATTERN.test(evidenceDate)) return null;
  const parsed = Date.parse(`${evidenceDate}T00:00:00.000Z`);
  if (Number.isNaN(parsed)) return null;
  return Math.floor((now.getTime() - parsed) / DAY_MS);
}

function validateLinks(project: ProjectFact): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();

  project.links.forEach((link: ProjectLink) => {
    if (isBlank(link.label)) {
      issues.push(error(project.id, 'link-label', 'A link has no label.'));
    }
    if (!isPublishableHref(link.href)) {
      issues.push(
        error(project.id, 'link-href', `"${link.href}" is not an https URL or a site-relative path.`)
      );
    }
    if (seen.has(link.href)) {
      issues.push(error(project.id, 'link-duplicate', `"${link.href}" is listed twice.`));
    }
    seen.add(link.href);
  });

  return issues;
}

function validateVisibility(project: ProjectFact): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (project.visibility === 'private') {
    if (project.links.length > 0) {
      issues.push(
        error(
          project.id,
          'private-no-links',
          'A private project must publish no links; private repository URLs and internal endpoints never reach output.'
        )
      );
    }
    if (project.repository) {
      issues.push(
        error(project.id, 'private-no-repository', 'A private project must not name a repository.')
      );
    }
    if (project.status === 'live') {
      issues.push(
        error(project.id, 'private-not-live', 'A private project must not be presented as live.')
      );
    }
    if (project.status !== 'private-development' && project.status !== 'archived') {
      issues.push(
        error(
          project.id,
          'private-status',
          `A private project must be "private-development" or "archived", not "${project.status}".`
        )
      );
    }
  }

  if (project.visibility === 'public' && project.status === 'private-development') {
    issues.push(
      error(project.id, 'public-status', 'A public project cannot have private-development status.')
    );
  }

  if (project.repository && !REPOSITORY_PATTERN.test(project.repository)) {
    issues.push(
      error(project.id, 'repository-format', `"${project.repository}" is not an owner/name pair.`)
    );
  }

  if (project.status === 'live' && !project.links.some((link) => link.kind === 'site')) {
    issues.push(
      error(project.id, 'live-needs-site', 'A live project must link the site that proves it.')
    );
  }

  return issues;
}

function validateFreshness(project: ProjectFact, now: Date): ValidationIssue[] {
  const age = evidenceAgeDays(project.evidenceDate, now);
  if (age === null) {
    return [
      error(project.id, 'evidence-date', `"${project.evidenceDate}" is not a YYYY-MM-DD date.`)
    ];
  }
  if (age < 0) {
    return [error(project.id, 'evidence-future', 'The evidence date is in the future.')];
  }
  if (project.publicationApproved && age > EXPIRED_AFTER_DAYS) {
    return [
      error(
        project.id,
        'evidence-expired',
        `Published facts are ${age} days old, over the ${EXPIRED_AFTER_DAYS}-day limit. Re-verify or unpublish.`
      )
    ];
  }
  if (age > STALE_AFTER_DAYS) {
    return [
      warning(project.id, 'evidence-stale', `Facts are ${age} days old; re-check against the source.`)
    ];
  }
  return [];
}

function validateRequiredFields(project: ProjectFact): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!ID_PATTERN.test(project.id ?? '')) {
    issues.push(error(project.id || '(missing id)', 'id-format', 'Ids are lowercase and kebab-case.'));
  }
  for (const field of ['name', 'subtitle', 'summary'] as const) {
    if (isBlank(project[field])) {
      issues.push(error(project.id, `${field}-required`, `"${field}" must not be empty.`));
    }
  }
  if (project.tags.length === 0) {
    issues.push(error(project.id, 'tags-required', 'At least one tag is required.'));
  }

  return issues;
}

/**
 * Validates one entry. Callers usually want {@link validateManifest}, which
 * also catches duplicate ids.
 */
export function validateProject(project: ProjectFact, now: Date = new Date()): ValidationIssue[] {
  return [
    ...validateRequiredFields(project),
    ...validateLinks(project),
    ...validateVisibility(project),
    ...validateFreshness(project, now)
  ];
}

export function validateManifest(
  manifest: ProjectFact[],
  now: Date = new Date()
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const seen = new Set<string>();

  for (const project of manifest) {
    if (seen.has(project.id)) {
      issues.push(error(project.id, 'duplicate-id', `Id "${project.id}" is used more than once.`));
    }
    seen.add(project.id);
    issues.push(...validateProject(project, now));
  }

  return issues;
}

export function errorsOf(issues: ValidationIssue[]): ValidationIssue[] {
  return issues.filter((issue) => issue.severity === 'error');
}

/**
 * Deny by default: every repository the manifest names, and every repository
 * link it renders, must appear on an explicitly curated allowlist of
 * repositories confirmed public.
 *
 * The check is framed this way on purpose. Listing the repositories that are
 * *private* would itself publish private metadata from this public repository,
 * so the manifest can only ever name something a person has explicitly vouched
 * for. Repository discovery may suggest that the allowlist has drifted; it
 * never edits it.
 */
export function repositoriesOutsideAllowlist(
  manifest: ProjectFact[],
  allowedPublicRepositories: string[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allowed = new Set(allowedPublicRepositories.map((name) => name.toLowerCase()));

  for (const project of manifest) {
    if (project.repository && !allowed.has(project.repository.toLowerCase())) {
      issues.push(
        error(
          project.id,
          'repository-not-allowlisted',
          `"${project.repository}" is not on the public-repository allowlist.`
        )
      );
    }

    for (const link of project.links) {
      if (link.kind !== 'repository') continue;
      if (!project.repository) {
        issues.push(
          error(
            project.id,
            'repository-link-unbacked',
            `"${link.href}" is a repository link on an entry that names no repository.`
          )
        );
        continue;
      }
      const expected = `https://github.com/${project.repository}`;
      if (link.href !== expected) {
        issues.push(
          error(
            project.id,
            'repository-link-mismatch',
            `"${link.href}" does not match the allowlisted repository "${project.repository}".`
          )
        );
      }
    }
  }

  return issues;
}
