# Project pages and résumé

## Reader-facing contract

- Homepage updates are content only. Preserve the carousel, component order,
  markup, CSS classes, spacing, typography, icons, and artwork. Current copy
  highlights Medsender's AI infrastructure, CNN's developer platforms, and
  Amazon Explore reliability. The 40% to 1.3% metric concerns catastrophic
  Explore session failures, not payment failures. Technology descriptions
  reflect the reviewed portfolio without adding a new homepage section.

- Every approved project has a stable `/portfolio/<id>` page.
- A page explains its context, design and implementation, engineering decisions,
  and current scope. Owner-authored projects explicitly credit Javier’s independent
  design and development using his own resources. The preserved PHP-Nuke archive
  retains its third-party authorship attribution.
- Expanded case studies add the operating context, architecture/workflow steps,
  evidence and outcomes, and current limitations within the existing detail
  layout. Historical prototypes stay proportional to the surviving source;
  Kolibri's private launch boundary is preserved.
- The index extends the original narrow, image-and-text row layout. Projects
  remain grouped by category, with search and a visible empty state. Titles,
  artwork, and read links open the individual project page. The existing six
  project illustrations are retained; added entries use the same decorative
  photography and Bauhaus treatment, not claimed product screenshots.
- Detail-page introductions show full repository names, direct application links
  where available, technical documentation, and an explicit access note. They do
  not include a copy-URL button. Private and unreleased entries explain their
  availability without inventing a source/demo link.
- A direct request returns project-specific HTML, canonical metadata, and a
  1200 × 630 PNG preview without requiring the crawler to execute JavaScript.
- The fifthbell overview links to the same catalog rather than duplicating
  outdated implementation descriptions. The unrouted legacy engineering module
  re-exports that overview.
- The résumé reflects Medsender, Narmi’s March 2026 end date, the consolidated
  Waggl engagement, the Servel contract, and the volunteering classifications.
- Medsender is included on this website. This change makes no LinkedIn edits.

## Coverage and evidence

Public repository metadata, default-branch READMEs, and top-level source
inventories were reviewed on 18 October 2026. Source review establishes what the
repositories describe and contain; it is not a production deployment or
acceptance test for those applications.

The 30-repository inventory becomes 27 public-source project pages:
Autostrada’s three repositories belong to one project, and `rotvulpix` is a
profile-only README rather than a software project. The existing public
portfolio descriptions of Monitor, Cronkite, Celesti, and Kolibri are retained,
and Pompeii is added from the owner-approved description. Their implementation
repositories are not linked.

Historical projects and recovery sources are described as such. PHP-Nuke is
explicitly attributed as a preserved third-party system, not original work.
Clouseau remains research and development. Native design-system libraries do
not claim completed platform parity or acceptance.

Employment facts come from the owner’s corrections and reviewed LinkedIn
entries: Narmi is June 2025–March 2026 with the display title Software Engineer;
Amazon ends in January 2023. Medsender’s July 2026 start follows the supplied
July 27 reference. Medsender accomplishment descriptions use the owner-supplied
LLM Gateway, developer portal, MCP, engineering automation, and delivery-safety
work. No confidential implementation details or unverified impact metrics are
added.

The Narmi entry credits the owner-confirmed original AI DecisionAssist
implementation using Anthropic Claude via Amazon Bedrock. The later public
announcement documents the product, not individual authorship or the scope of
that original implementation. Its subsequent interface, features, and advertised
outcome metrics are not attributed to Javier's version.

Product announcement:
https://www.narmi.com/press/narmi-launches-ai-decisionassist-to-streamline-account-opening-for-community-banks-and-credit-unions

WGU academic requirements are complete; conferral is pending. Earlier
institutions are omitted until their degree/completion wording is confirmed.

## Authoring and approval

Edit `app/data/project-catalog.ts` for concise facts and
`app/data/project-studies.ts` for the expanded case study. Each entry includes an immutable ID,
summary, technologies, visibility, evidence date, and story. Public source URLs
must be explicitly covered by `PUBLIC_REPOSITORIES`; a multi-repository project
names each additional repository. Private entries carry no source links.

Public technical notes pin exact source files to reviewed commit SHAs. The
publication validator rejects moving branches, unrelated/unapproved repositories,
and references on private entries. The deeper review includes broadcast/radio
operation history, the editorial ingestion and clustering work, and source
contracts reviewed on 18 October 2026. Repository tests are described as existing
verification surfaces; they are not represented as newly executed here.
Croccante's 0.18s/2.40s transitions and five-minute publisher absence come from
its pinned public architecture experiment, not a general service-level claim.
Colombo's retained-spool CPU observation describes the earlier investigation;
it does not claim a measured production improvement after deployment.

The build exports only approved entries into
`app/data/public-projects.generated.ts`. Browser routes import this projection,
not the editorial source catalog. Unapproved entries do not enter browser
bundles, pre-render paths, preview images, the sitemap, or the link export.
Related-project links must refer to approved entries.

Run `npm run images` after a content edit while the dev server is running.
Startup, type checking, and production builds regenerate the necessary data.
Preview images use Bleecker’s shared colors and Encode Sans. The bundled font
retains its SIL Open Font License in `assets/fonts/OFL.txt`.

## Medsender artwork

`public/icons/medsender.svg` is a vector trace of the official wordmark served
by the Medsender website on 18 October 2026:

https://cdn.prod.website-files.com/6a342e6cb22a2399879d503c/6a34614faf8e48de9953cb40_medsender-logo-p-2600.png

The marketing site and public logo listing offered raster assets, not a source
SVG. The committed asset contains vector paths, not an embedded PNG. It was
traced with VTracer 0.6.15. The Medsender trademark and original artwork remain
the property of their owner.

## LinkedIn links

Use the project’s canonical `https://gaulatti.com/portfolio/<id>` URL after the
site is deployed. `/project-links.csv` exports all 32 addresses. Preview images are generated for
each page and exposed through `og:image`.

Local preview URLs are for review. This change does not update LinkedIn or make
the new production URLs available until deployment.

The application-link review on 18 October 2026 confirmed Broadway's public
generator/gallery and Alcántara's authorized sign-in surface. Gaulatti.com is
also linked directly. The Autostrada homepage returned 403, and Nena's old
identity-provider organization was deactivated, so those are not presented as
working demos. Their source remains accessible from the project header.

The production preview uses static-file serving, not the former SPA catch-all.
An HTTP regression starts the actual preview command, checks every project’s
initial response, and verifies navigation data and a missing-page 404.

## Hosting and verification

React Router 7.12 pre-rendering is configured with `ssr: false` and an explicit
path list. Its generated `<path>/index.html` files need an additional hosting
step for an S3 REST origin: S3 does not infer directory indexes for clean paths.

`scripts/prepare-static-pages.mjs` copies each page to an extensionless object
key. Staging groups are separated by path depth because a filesystem cannot
hold both a file named `portfolio` and a directory of the same name; S3 can
hold both `portfolio` and `portfolio/colombo` as object keys.

The deployment workflow overlays these groups at the bucket root with
`Content-Type: text/html`, after uploading the client assets and before the
existing invalidation. There is no CloudFront configuration change. The
existing bucket-clearing operation is preserved; deployment needs explicit
approval and is not performed as part of local verification.

`npm run check` verifies types, publication/visibility rules, complete public
source coverage, and every generated project’s initial HTML, canonical URL,
Open Graph tags, PNG dimensions, and staged S3 object. It also checks the
résumé and vector logo. Desktop/mobile browser verification covers index
filters, detail navigation, deep-link refresh, and résumé layout.

React Router reference for the pinned version:
https://github.com/remix-run/react-router/blob/react-router%407.12.0/docs/how-to/pre-rendering.md
