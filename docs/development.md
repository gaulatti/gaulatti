# Gaulatti.com

Javier Godoy’s engineering portfolio: AI infrastructure, developer platforms,
design systems, and software for newsrooms and live production.

The website includes a project index, individual project pages, an engineering
résumé, and longer case studies. It uses React Router 7.12, TypeScript, Tailwind
CSS 4, and Bleecker.

## Local development

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the URL printed by the development server. Before starting, the site
generates its approved public catalog, project-preview images, and link export.

```sh
npm run check
npm run start
```

The complete check runs TypeScript, catalog/publication checks, the production
build, and tests of the actual pre-rendered HTML and image output.
The production preview serves on port 3000.
It serves the pre-rendered pages directly; a SPA catch-all would return the
wrong initial HTML for project links.

## Content

- The root `README.md` is the public professional profile. Keep its existing
  section order, quote, contact details, experience/project tables, and skill
  badges when refreshing facts. Setup and deployment guidance belongs here.
  Profile content follows the approved résumé and project catalog; project
  links point to their public `/portfolio/<id>` case studies. Education states
  academic completion separately from degree conferral, and employer product
  credit does not claim subsequent versions or company-wide launch metrics.
  Keep employment separate from volunteering. Volunteer organizations, titles,
  and dates match the résumé data and LinkedIn; Sanremo coverage belongs under
  ModoItaliano's Executive Producer volunteering role. Independent software
  ownership belongs in About Me and Projects rather than a separate fifthbell
  engineering employment entry.
- `app/data/project-catalog.ts`: curated project summaries and stories.
- `app/data/project-studies.ts`: deeper architecture, operating context, evidence,
  limitations, and pinned public technical notes.
- `app/data/projects.ts`: public repository allowlist, types, and home selection.
- `app/data/resume.ts`: employment, earlier work, and volunteering.
- `app/routes/project.tsx`: individual project pages at `/portfolio/:projectId`.
- `docs/portfolio.md`: evidence, authoring, sharing, and deployment behavior.

Project pages have stable canonical URLs, unique Open Graph previews, related
projects, and introductory repository/application/documentation links. `/project-links.csv` provides the approved
project URLs for updating professional profiles after publication.

The source catalog is an editorial document. It is not synchronized from
GitHub automatically. Approval, link visibility, and content validation run
before the browser catalog and public assets are generated.

## Static hosting

React Router pre-renders all public pages. The build contains:

- `build/client`: HTML, navigation data, images, and browser assets.
- `build/static-pages`: extensionless HTML objects, grouped by path depth.

The existing deployment workflow uploads the client build, then uploads each
static-page group with `Content-Type: text/html`. This makes clean project URLs
return their own HTML from S3, without requiring a new CloudFront rewrite.
The existing workflow clears its configured S3 bucket before upload and then
invalidates CloudFront. Do not trigger it without approval for that deployment.

The GitHub wiki remote was unavailable during this update. This README and
`docs/portfolio.md` contain the current development and publishing guidance.
