import type { ProjectFact, ProjectStory, ProjectSurface } from './projects';
import { projectStudies } from './project-studies.ts';

type Entry = {
  id: string;
  name: string;
  subtitle: string;
  summary: string;
  surface: ProjectSurface;
  tags: string[];
  repository?: string;
  repositories?: string[];
  links?: ProjectFact['links'];
  status?: ProjectFact['status'];
  visibility?: ProjectFact['visibility'];
  art: ProjectFact['art'];
  story: Omit<ProjectStory, 'ownership' | 'study'> & { ownership?: string };
};

/** Editorial copy, reviewed against public source on 18 October 2026. */
function project(entry: Entry): ProjectFact {
  const { story, ...fact } = entry;
  const study = projectStudies[entry.id];
  if (!study) throw new Error('Missing case study: ' + entry.id);
  return {
    status: 'in-development',
    visibility: 'public',
    publicationApproved: true,
    evidenceDate: '2026-10-18',
    links: entry.repository ? [{ label: 'Source code', href: 'https://github.com/' + entry.repository, kind: 'repository' }] : [],
    ...fact,
    story: {
      ownership: 'I designed and built this project independently, using my own resources.',
      ...story,
      study
    }
  };
}

export const portfolioCatalog: ProjectFact[] = [
  project({
    id: 'mistify',
    art: { type: 'monitor', imageUrl: '/hero/monitor.avif' },
    name: 'Mistify',
    subtitle: 'Language and media intelligence',
    summary: 'A shared AI service for language detection, translation, classification, clustering, and recorded-media analysis.',
    surface: 'ai-platforms',
    tags: ['Python', 'FastAPI', 'gRPC', 'PyTorch', 'Redis'],
    repository: 'gaulatti/mistify',
    story: {
      problem:
        'Newsroom applications need to understand multilingual text and recorded media without building a separate model integration for every workflow.',
      contribution: 'I build the service and reusable processing components that turn model capabilities into application workflows.',
      decisions: [
        {
          title: 'One service, composable operations',
          description:
            'Applications can call individual text helpers or submit a combined analysis through gRPC. Language detection, classification, translation, embeddings, and clustering share a service boundary.'
        },
        {
          title: 'Work that survives a restart',
          description:
            'Asynchronous operations use Redis-backed state and acknowledged callback delivery. Interrupted work is recovered, and consumers handle repeat delivery idempotently.'
        },
        {
          title: 'Recorded media as a workflow',
          description:
            'Transcription, diarization, and source-grounded summarization use durable processing stages rather than one long request.'
        }
      ],
      statusNote: 'Active development across text helpers and recorded-media workflows.',
      related: ['guggiana', 'monitor', 'colombo']
    }
  }),
  project({
    id: 'colombo',
    art: { type: 'monitor', imageUrl: '/hero/colombo.avif' },
    name: 'Colombo',
    subtitle: 'Reliable photo intake',
    summary: 'A Rust upload gateway that accepts photographs over FTP, FTPS, and HTTP, then delivers them to storage and a newsroom CMS.',
    surface: 'personal',
    tags: ['Rust', 'FTP/FTPS', 'HTTP', 'AWS S3', 'PostgreSQL'],
    repository: 'gaulatti/colombo',
    story: {
      problem:
        'A photographer should be able to send an image from a camera in the field without losing it when a network, storage service, or downstream CMS becomes unavailable.',
      contribution:
        'I designed and implemented the upload gateway, including its Rust rewrite, durable acceptance boundary, and independent delivery retries.',
      decisions: [
        {
          title: 'Acceptance is a durable promise',
          description:
            'A successful upload means the file and its operation context are safely stored in a durable spool. It is a promise to deliver rather than a completed delivery.'
        },
        {
          title: 'Separate delivery from notification',
          description:
            'S3 delivery and CMS callbacks are retried independently. Stable object keys and persisted delivery state avoid uploading the same accepted file again just because a callback failed.'
        },
        {
          title: 'Support the equipment photographers use',
          description:
            'FTP and explicit FTPS support camera workflows; HTTP provides the same acceptance contract to newer clients. The earlier Java implementation remains in an archive branch.'
        }
      ],
      statusNote: 'The current implementation is Rust. The earlier Java version remains available in an archive branch.',
      related: ['manzoni', 'mistify']
    }
  }),
  project({
    id: 'guggiana',
    art: { type: 'autostrada', imageUrl: '/hero/wiphala.avif' },
    name: 'Guggiana',
    subtitle: 'Multilingual article-to-audio',
    summary: 'An article-to-audio pipeline coordinating translation, speech synthesis, reusable language renditions, and audio assembly.',
    surface: 'ai-platforms',
    tags: ['AWS Step Functions', 'Polly', 'DynamoDB', 'Python', 'TypeScript'],
    repository: 'gaulatti/guggiana',
    story: {
      problem:
        'Publishing an article in several audio languages involves more than calling a speech model: requests can overlap, jobs can fail, and completed renditions should be reusable.',
      contribution: 'I build the workflow, storage contracts, and speech-provider research behind multilingual audio generation.',
      decisions: [
        {
          title: 'Generate only the requested languages',
          description:
            'Language renditions are created on demand. Atomic claims prevent concurrent callers from duplicating the same translation and synthesis work.'
        },
        {
          title: 'Orchestrate the whole operation',
          description:
            'Step Functions coordinates translation, speech synthesis, and audio assembly; S3 stores artifacts and DynamoDB tracks the work.'
        },
        {
          title: 'Evaluate alternative speech providers separately',
          description:
            'A provider-neutral speech contract, a multilingual bake-off, and an optional local worker let me investigate Chatterbox and Piper without silently changing the existing Polly workflow.'
        }
      ],
      statusNote:
        'The Polly workflow and local synthesis worker remain separate paths. Alternative speech providers are still being evaluated.',
      related: ['mistify', 'palazzo', 'cronkite']
    }
  }),
  project({
    id: 'monitor',
    art: { type: 'monitor', imageUrl: '/hero/monitor.avif' },
    name: 'Monitor',
    subtitle: 'Editorial intelligence',
    summary: 'A workspace for following developing stories, grouping related coverage, and tracking events across multiple feeds.',
    surface: 'ai-platforms',
    tags: ['Rust', 'React', 'PostgreSQL', 'pgvector'],
    visibility: 'private',
    status: 'private-development',
    story: {
      problem:
        'Editors need a way to follow several developing stories without losing related posts, event context, or the thread of a changing situation.',
      contribution:
        'I build the ingestion, enrichment, and editorial workspace, bringing related coverage into a live, multi-column interface.',
      decisions: [
        {
          title: 'Keep the editor in the loop',
          description:
            'Posts, related coverage, and event context share a workspace so a person can assess what matters and follow a story over time.'
        },
        {
          title: 'Separate collection from interpretation',
          description:
            'Source ingestion and language or semantic enrichment are separate concerns, allowing the editorial interface to build on reusable processing services.'
        }
      ],
      statusNote: 'The editorial workspace is in development. Its implementation repository is private.',
      related: ['mistify', 'colombo', 'sabella']
    }
  }),
  project({
    id: 'pompeii',
    art: { type: 'pompeii', imageUrl: '/hero/pompeii.avif' },
    name: 'Pompeii',
    subtitle: 'Shared identity and permissions',
    summary: 'A shared authentication and authorization service for application permissions, feature flags, and identity management.',
    surface: 'ai-platforms',
    tags: ['Go', 'APIs', 'Authorization', 'Feature flags'],
    visibility: 'private',
    status: 'private-development',
    story: {
      problem:
        'A growing set of applications needs consistent identity and permission decisions without copying the same access rules into every product.',
      contribution: 'I build the shared service and administration interface used to manage application access and capabilities.',
      decisions: [
        {
          title: 'Centralize policy, retain application boundaries',
          description:
            'Applications consume shared identity and authorization services while retaining ownership of their own workflows and domain data.'
        },
        {
          title: 'Make access manageable',
          description:
            'Administration interfaces expose application permissions and feature flags so access is an explicit product capability.'
        }
      ],
      statusNote: 'Shared identity and access infrastructure in private development.',
      related: ['monitor', 'bleecker']
    }
  }),
  project({
    id: 'bleecker',
    art: { type: 'autostrada', imageUrl: '/hero/design.avif' },
    name: 'Bleecker',
    subtitle: 'The web design system',
    summary: 'A React component library with shared typography, design tokens, accessible controls, and application layouts.',
    surface: 'design-systems',
    tags: ['React', 'TypeScript', 'Design tokens', 'Accessibility', 'Storybook'],
    repository: 'gaulatti/bleecker',
    story: {
      problem:
        'A portfolio of applications needs a consistent visual language and interaction model without rebuilding the same controls in every repository.',
      contribution:
        'I design and build the shared web component system, its tokens, and the contracts consumed by the native implementations.',
      decisions: [
        {
          title: 'A common vocabulary',
          description:
            'Encode Sans, Libre Franklin, a restrained palette, and shared spacing and control sizes give applications a consistent foundation.'
        },
        {
          title: 'Components and composition',
          description:
            'The library includes controls, navigation, feedback, data display, and application layouts, with visual fixtures documenting their behavior.'
        },
        {
          title: 'Contracts across platforms',
          description:
            'Native sibling libraries share tokens and component contracts while using the interaction and accessibility conventions of their own platforms.'
        }
      ],
      statusNote: 'The shared React library used by this website and other Gaulatti applications.',
      related: ['sabella', 'orchard', 'avelino', 'thompson']
    }
  }),
  project({
    id: 'sabella',
    art: { type: 'pompeii', imageUrl: '/hero/design.avif' },
    name: 'Sabella',
    subtitle: 'Native components for Apple platforms',
    summary: 'The SwiftUI sibling of Bleecker, sharing its tokens and component contracts across macOS, iOS, and tvOS.',
    surface: 'design-systems',
    tags: ['Swift', 'SwiftUI', 'macOS', 'iOS', 'tvOS'],
    repository: 'gaulatti/sabella',
    story: {
      problem: 'Native Apple applications should share the same product identity as the web without imitating browser controls.',
      contribution: 'I build the SwiftUI implementation, token mappings, component catalog, and parity checks.',
      decisions: [
        {
          title: 'Native behavior, shared identity',
          description:
            'SwiftUI controls retain platform interaction and accessibility behavior while consuming the same visual contracts as Bleecker.'
        },
        {
          title: 'Explicit parity',
          description:
            'Matching contract names and component inventories make the relationship to the web library reviewable instead of relying on appearance alone.'
        }
      ],
      statusNote:
        'Apple platforms are the scope of this library. Component implementation and platform acceptance are tracked separately in the public repository.',
      related: ['bleecker', 'orchard', 'avelino', 'thompson']
    }
  }),
  project({
    id: 'orchard',
    art: { type: 'autostrada', imageUrl: '/hero/points.avif' },
    name: 'Orchard',
    subtitle: 'Native components for Windows',
    summary: 'A Windows component library implementing the shared design system in C# and WinUI 3.',
    surface: 'design-systems',
    tags: ['C#', 'WinUI 3', 'Windows', 'Design tokens'],
    repository: 'gaulatti/orchard',
    story: {
      problem:
        'Windows applications need the same product language as their web and Apple counterparts while preserving native keyboard, accessibility, and high-contrast behavior.',
      contribution: 'I build the component library, generated token resources, and runnable Windows catalog.',
      decisions: [
        {
          title: 'Windows owns its implementation',
          description: 'Controls and themes use C# and WinUI 3 rather than embedding the web implementation.'
        },
        {
          title: 'Acceptance beyond compilation',
          description:
            'Component documentation records keyboard interaction, automation, layout, and visual acceptance instead of treating a successful build as proof of parity.'
        }
      ],
      statusNote: 'The public library and catalog are in development. Full component parity and Windows acceptance remain in progress.',
      related: ['bleecker', 'sabella', 'avelino']
    }
  }),
  project({
    id: 'avelino',
    art: { type: 'monitor', imageUrl: '/hero/design.avif' },
    name: 'Avelino',
    subtitle: 'Native components for Linux',
    summary: 'A Linux implementation of the shared design system using Qt Quick, with explicit visual and platform acceptance.',
    surface: 'design-systems',
    tags: ['Qt Quick', 'QML', 'Linux', 'Design tokens'],
    repository: 'gaulatti/avelino',
    story: {
      problem:
        'Linux applications need a native implementation of the same component contracts, with a clear reference for visual and interaction parity.',
      contribution: 'I build the Linux component candidates, reference tooling, catalog, and acceptance documentation.',
      decisions: [
        {
          title: 'One platform boundary',
          description: 'Avelino owns Linux. Apple and Windows implementations remain in their own libraries.'
        },
        {
          title: 'Reproducible visual references',
          description:
            'Checksummed source references and rendered fixtures support comparison with the shared component contracts and native reference implementations.'
        }
      ],
      statusNote:
        'Implementation has started. Desktop and television acceptance are pending; registration and passing builds do not establish visual parity.',
      related: ['bleecker', 'sabella', 'orchard']
    }
  }),
  project({
    id: 'thompson',
    art: { type: 'pompeii', imageUrl: '/hero/points.avif' },
    name: 'Thompson',
    subtitle: 'The React Native design system',
    summary: 'A React Native implementation of shared tokens and component contracts for mobile applications.',
    surface: 'design-systems',
    tags: ['React Native', 'TypeScript', 'Design tokens', 'Mobile'],
    repository: 'gaulatti/thompson',
    story: {
      problem:
        'Mobile applications need to share the product language of the web without importing DOM components, CSS, or web-only dependencies.',
      contribution: 'I build the native primitives, component contracts, and consumer examples used by mobile projects.',
      decisions: [
        {
          title: 'Share contracts, not browser code',
          description: 'Thompson consumes platform-neutral tokens and contracts, then renders them with React Native primitives.'
        },
        {
          title: 'Consumer-driven quality',
          description: 'Real applications provide references for typography, safe areas, touch targets, and interaction finish.'
        }
      ],
      statusNote: 'The native component library is in development, with release and consumer workflows documented in the repository.',
      related: ['bleecker', 'sabella', 'manzoni']
    }
  }),
  project({
    id: 'alcantara',
    art: { type: 'monitor', imageUrl: '/hero/normandy.avif' },
    name: 'Alcántara',
    subtitle: 'Live production control',
    summary: 'A broadcast control surface for graphics, program state, media, and live guest contributions.',
    surface: 'media-infrastructure',
    tags: ['React', 'NestJS', 'PostgreSQL', 'SSE', 'WebRTC'],
    repository: 'gaulatti/alcantara',
    story: {
      problem: 'A live production needs one place to control what goes to air, coordinate contributors, and understand program state.',
      contribution: 'I build the production interface, program and media model, renderer integration, and live contribution workflows.',
      decisions: [
        {
          title: 'Explicit program state',
          description:
            'Graphics, scenes, and media are coordinated through a shared program model and streamed updates instead of unrelated browser controls.'
        },
        {
          title: 'Separate control from rendering',
          description:
            'Alcántara owns production decisions; Alana renders the program, and Croccante owns delivery to public broadcast destinations.'
        },
        {
          title: 'Live guests as a managed workflow',
          description:
            'The calls console manages reusable contribution slots, invitations, and return audio and video within the production workflow.'
        }
      ],
      statusNote:
        'The current public source includes graphics, program control, and WebRTC contribution work. Individual integrations and rollout stages are documented separately.',
      related: ['alana', 'croccante', 'palazzo', 'broadway']
    }
  }),
  project({
    id: 'alana',
    art: { type: 'pompeii', imageUrl: '/hero/catastrophes.avif' },
    name: 'Alana',
    subtitle: 'Composed broadcast runtime',
    summary:
      'A headless runtime that renders an Alcántara program and publishes independent RTMP outputs and an optional low-latency feed.',
    surface: 'media-infrastructure',
    tags: ['Python', 'Chromium', 'FFmpeg', 'RTMP', 'LiveKit'],
    repository: 'gaulatti/alana',
    story: {
      problem:
        'Rendering a program, encoding it, publishing it, and recording it have different failure modes. A failure in one output should not restart every other part of a broadcast.',
      contribution:
        'I build the runtime supervision and explicit start/stop lifecycle that connect program rendering to broadcast delivery.',
      decisions: [
        {
          title: 'Independent output supervision',
          description: 'Each output has its own encoder and health state, so one failing destination does not restart the others.'
        },
        {
          title: 'An acknowledged lifecycle',
          description:
            'Start is acknowledged after the local pipeline and downstream session are ready; stop is coordinated before local output is torn down.'
        },
        {
          title: 'Keep credential ownership clear',
          description:
            'Public-destination identifiers and secret references pass through Alana, while the downstream delivery service owns credential resolution.'
        }
      ],
      statusNote: 'This is the composed broadcast runtime, not the older OBS-container description. Radio playback belongs to Palazzo.',
      related: ['alcantara', 'croccante', 'palazzo']
    }
  }),
  project({
    id: 'croccante',
    art: { type: 'autostrada', imageUrl: '/hero/nazca.avif' },
    name: 'Croccante',
    subtitle: 'Broadcast delivery and continuity',
    summary:
      'An RTMP relay with independently supervised destinations, explicit broadcast lifecycle control, and prepared continuity media.',
    surface: 'media-infrastructure',
    tags: ['Python', 'nginx-rtmp', 'FFmpeg', 'RTMP'],
    repository: 'gaulatti/croccante',
    story: {
      problem: 'A broadcaster needs to deliver one program to several destinations without allowing one outage to interrupt every output.',
      contribution:
        'I build the relay lifecycle, per-destination supervision, and continuity behavior used by the composed broadcast path.',
      decisions: [
        {
          title: 'Relay without another encode',
          description:
            'The program is already encoded upstream, so each destination uses stream copy. This avoids another generation of quality loss and per-destination encoder cost; bandwidth, connection supervision, and packet forwarding still grow with the number of outputs.'
        },
        {
          title: 'One failure domain per destination',
          description:
            'I chose long-lived supervisors over opaque nginx push retries so each output has an observable process, mode, retry budget, and health state. A rejecting platform can back off without recycling another platform’s healthy connection.'
        },
        {
          title: 'Prepare before going live',
          description:
            'Checksum verification, transcoding, and media-profile checks happen before Start. An atomic installation protects already-ready filler from a failed preparation, and the active session pins one version so a later edit cannot alter the live recovery path.'
        },
        {
          title: 'Keep session authority outside media observations',
          description:
            'A publisher connecting or disappearing is only an observation. Authenticated sequenced commands own Start and Stop. This prevents an uplink interruption, a stale command, or a control-plane outage from making an unintended publication decision.'
        }
      ],
      statusNote: 'A broadcast infrastructure component with documented lifecycle and recovery contracts.',
      related: ['alana', 'alcantara']
    }
  }),
  project({
    id: 'palazzo',
    art: { type: 'monitor', imageUrl: '/hero/sanremo.avif' },
    name: 'Palazzo',
    subtitle: 'Radio playout control',
    summary: 'A self-hosted radio controller combining a NestJS API with Liquidsoap and Icecast.',
    surface: 'media-infrastructure',
    tags: ['NestJS', 'Liquidsoap', 'Icecast', 'SSE'],
    repository: 'gaulatti/palazzo',
    story: {
      problem:
        'An automated radio program needs to coordinate songs, recorded introductions, jingles, and live audio while keeping the stream running.',
      contribution: 'I build the playout API, program-scoped automation, and playback lifecycle around the audio transport.',
      decisions: [
        {
          title: 'Keep transport and automation distinct',
          description: 'Program automation can start or stop without unnecessarily restarting the Icecast stream.'
        },
        {
          title: 'Treat a song and its introduction as one operation',
          description:
            'Program-scoped playout coordinates song and intro behavior with durable idempotency and explicit lifecycle reporting.'
        }
      ],
      statusNote: 'Radio-control development alongside the wider Alcántara production system.',
      related: ['alcantara', 'guggiana']
    }
  }),
  project({
    id: 'broadway',
    art: { type: 'autostrada', imageUrl: '/hero/wiphala.avif' },
    name: 'Broadway',
    subtitle: 'Typed visual authoring',
    summary: 'A template editor with generated forms, live preview, and high-quality image and document exports.',
    surface: 'media-infrastructure',
    tags: ['React Router', 'TypeScript', 'PNG', 'Vector PDF'],
    repository: 'gaulatti/broadway',
    links: [
      { label: 'Source code', href: 'https://github.com/gaulatti/broadway', kind: 'repository' },
      { label: 'Website', href: 'https://broadway.gaulatti.com', kind: 'site' }
    ],
    story: {
      problem:
        'Repeatedly creating branded visual pieces should not require manually rebuilding a layout or wiring a custom form for every template.',
      contribution: 'I build the typed template system, generated editing forms, previews, and export workflows.',
      decisions: [
        {
          title: 'The template declares its inputs',
          description: 'Typed fields drive the editing form and preview so a template has one clear contract.'
        },
        {
          title: 'Use the right output format',
          description: 'Visual pieces export to high-quality PNG. Document templates export as vector PDF with selectable text.'
        },
        {
          title: 'Keep rendering separate from publishing',
          description: 'Programmatic-video and excerpt work can be prepared and verified as drafts before any publishing step.'
        }
      ],
      statusNote:
        'The project has grown beyond a fixed-size story generator. Its public source documents static, document, and media-authoring workflows.',
      related: ['bleecker', 'alcantara', 'cronkite']
    }
  }),
  project({
    id: 'manzoni',
    art: { type: 'autostrada', imageUrl: '/hero/normandy.avif' },
    name: 'Manzoni',
    subtitle: 'Field photography client',
    summary: 'A mobile image-intake client with a persistent upload queue and delivery receipts from Colombo.',
    surface: 'personal',
    tags: ['React Native', 'Expo', 'SQLite', 'Flutter'],
    repository: 'gaulatti/manzoni',
    story: {
      problem:
        'A photograph captured in the field should remain queued after an application relaunch, and an accepted upload should not be mistaken for completed delivery.',
      contribution: 'I build the mobile intake and queue workflow, including the current Expo migration and its integration with Colombo.',
      decisions: [
        {
          title: 'Own the queued media',
          description: 'Camera captures and selected images are copied into application storage and recorded in SQLite before upload.'
        },
        {
          title: 'Separate credentials from queue data',
          description: 'SecureStore holds credentials; the queue contains media metadata and lifecycle state.'
        },
        {
          title: 'Follow the delivery receipt',
          description:
            'The client records Colombo’s accepted operation and follows it through to a terminal outcome. The original Flutter client remains as a rollback/reference implementation.'
        }
      ],
      statusNote:
        'The public branch now contains the Expo/TypeScript migration. Physical camera behavior and internal distribution have their own release requirements.',
      related: ['colombo', 'thompson']
    }
  }),
  project({
    id: 'atlantide',
    art: { type: 'monitor', imageUrl: '/hero/points.avif' },
    name: 'Atlantide',
    subtitle: 'tvOS playback client',
    summary: 'A native Apple TV client in the Celesti stream-routing and newsroom-display family.',
    surface: 'media-infrastructure',
    tags: ['Swift', 'tvOS', 'Playback'],
    repository: 'gaulatti/atlantide',
    story: {
      problem:
        'A newsroom display system needs a playback client that fits the Apple TV platform rather than treating every screen as a browser.',
      contribution: 'I develop the native tvOS client within the broader display and stream-routing project.',
      decisions: [
        {
          title: 'A native television client',
          description: 'The public repository contains Swift application code, an Xcode project, and tvOS configuration.'
        },
        {
          title: 'Keep the platform scope clear',
          description: 'This is the Apple TV client; the wider stream-routing platform is described separately under Celesti.'
        }
      ],
      statusNote: 'A native Swift tvOS client, in development.',
      related: ['celesti', 'sabella']
    }
  }),
  project({
    id: 'autostrada',
    art: { type: 'autostrada', imageUrl: '/hero/autostrada.avif' },
    name: 'Autostrada',
    subtitle: 'Web performance observability',
    summary: 'A web performance platform with a React dashboard, a NestJS service, and AWS infrastructure defined as code.',
    surface: 'personal',
    tags: ['React', 'NestJS', 'Lighthouse', 'PostgreSQL', 'AWS CDK'],
    repository: 'gaulatti/autostrada',
    repositories: ['gaulatti/autostrada-frontend', 'gaulatti/autostrada-service'],
    links: [
      { label: 'Infrastructure', href: 'https://github.com/gaulatti/autostrada', kind: 'repository' },
      { label: 'Dashboard', href: 'https://github.com/gaulatti/autostrada-frontend', kind: 'repository' },
      { label: 'API', href: 'https://github.com/gaulatti/autostrada-service', kind: 'repository' }
    ],
    story: {
      problem:
        'A one-off performance report is hard to act on without a history of scans, a clear target model, and a dashboard for comparing results.',
      contribution:
        'I built the dashboard, service, and infrastructure components for collecting and exploring website-performance results.',
      decisions: [
        {
          title: 'Separate collection from presentation',
          description: 'The NestJS service manages targets, scans, and results; the React dashboard presents the performance history.'
        },
        {
          title: 'Infrastructure belongs in source',
          description: 'The infrastructure repository describes compute, storage, authentication, and networking using AWS CDK.'
        }
      ],
      statusNote: 'Retained for recovery. Automatic deployment is disabled pending verification.',
      related: ['bleecker', 'clouseau']
    }
  }),
  project({
    id: 'clouseau',
    art: { type: 'pompeii', imageUrl: '/hero/sprints.avif' },
    name: 'Clouseau',
    subtitle: 'AI-assisted change review research',
    summary: 'Shared coverage gates and evidence-led pull request review automation for GitHub Actions.',
    surface: 'ai-platforms',
    tags: ['JavaScript', 'Python', 'GitHub Actions', 'AI review'],
    repository: 'gaulatti/clouseau',
    story: {
      problem:
        'Automated review needs to assess the purpose and evidence for a change, not just produce comments or approve a green build.',
      contribution:
        'I research and implement reusable review gates, evidence collection, evaluation fixtures, and controlled approval workflows.',
      decisions: [
        {
          title: 'Review the change, not only the patch',
          description:
            'The acceptance protocol examines product fit, repository contracts, technical findings, and the evidence supporting a change.'
        },
        {
          title: 'Separate evaluation from authority',
          description:
            'Read-only assessment and qualification fixtures are distinct from the protected operations that can approve or modify a pull request.'
        },
        {
          title: 'Keep human decisions explicit',
          description:
            'Purpose and authority questions remain owner decisions; technical uncertainty requires investigation rather than an informal waiver.'
        }
      ],
      statusNote: 'Research and development. Review protocols, qualification fixtures, and automation are being evaluated.',
      related: ['mistify', 'colombo', 'autostrada']
    }
  }),
  project({
    id: 'cronkite',
    art: { type: 'autostrada', imageUrl: '/hero/design.avif' },
    name: 'Cronkite',
    subtitle: 'Publishing and rendering',
    summary: 'A CMS-directed rendering service that turns approved content and presentation manifests into authorized publishing artifacts.',
    surface: 'media-infrastructure',
    tags: ['TypeScript', 'AWS S3', 'FFmpeg'],
    visibility: 'private',
    status: 'private-development',
    story: {
      problem: 'Editorial systems need a repeatable path from approved content to the formats and destinations used by readers.',
      contribution: 'I build the rendering and distribution pipeline behind the newsroom publishing workflow.',
      decisions: [
        {
          title: 'Publication authority stays with the CMS',
          description:
            'The CMS chooses canonical content, publication state, renderables, and signed write targets. Cronkite executes that request rather than discovering new work, deciding editorial scope, or holding ambient storage authority.'
        },
        {
          title: 'Declare presentation and return receipts',
          description: 'Presentation packages declare supported output. The renderer validates the contract, produces bytes, and returns receipts; the CMS persists outcomes and owns later retries. Boot validates packages without publishing autonomously.'
        }
      ],
      statusNote: 'A private implementation of the newsroom publishing pipeline.',
      related: ['broadway', 'guggiana', 'monitor']
    }
  }),
  project({
    id: 'celesti',
    art: { type: 'monitor', imageUrl: '/hero/points.avif' },
    name: 'Celesti',
    subtitle: 'Newsroom displays and stream routing',
    summary: 'A channel inventory and display-management platform with service-controlled playback clients.',
    surface: 'media-infrastructure',
    tags: ['Go', 'Kotlin', 'Jetpack Compose', 'SSE'],
    visibility: 'private',
    status: 'private-development',
    story: {
      problem:
        'A newsroom with several displays needs a shared channel inventory and a way to direct playback without configuring every screen independently.',
      contribution: 'I build the routing service and television client workflows used to manage those displays.',
      decisions: [
        {
          title: 'One inventory, multiple clients',
          description: 'The service manages channels and sends playback commands to television clients through an event-driven interface.'
        },
        {
          title: 'Platform-specific playback',
          description: 'Android TV and Apple TV clients have their own implementations instead of claiming a universal player.'
        }
      ],
      statusNote: 'The core platform source is private. Atlantide, its tvOS client, has a separate public repository.',
      related: ['atlantide', 'alcantara']
    }
  }),
  project({
    id: 'gaulatti',
    art: { type: 'autostrada', imageUrl: '/hero/pompeii.avif' },
    name: 'Gaulatti.com',
    subtitle: 'This engineering portfolio',
    summary: 'A React-based portfolio connecting engineering experience, project stories, and public source.',
    surface: 'personal',
    tags: ['React Router', 'TypeScript', 'Tailwind CSS', 'Bleecker'],
    repository: 'gaulatti/gaulatti',
    story: {
      problem:
        'A résumé lists roles, while source repositories explain implementation. Project pages connect the two with enough context to understand the work.',
      contribution: 'I build and maintain this website, its content model, and the project pages used to explain my engineering work.',
      decisions: [
        {
          title: 'One project, one durable URL',
          description:
            'Each project has an individual page that can be linked from a résumé, a professional profile, or a technical conversation.'
        },
        {
          title: 'Keep the facts in one place',
          description: 'A curated catalog feeds the project index and detail pages, with publication and public-source checks.'
        }
      ],
      statusNote: 'This site uses React Router and Bleecker. The previous Astro implementation is preserved in Git history.',
      related: ['bleecker', 'broadway']
    }
  }),
  project({
    id: 'kolibri',
    art: { type: 'pompeii', imageUrl: '/hero/pompeii.avif' },
    name: 'Kolibri',
    subtitle: 'A capstone-derived product',
    summary: 'A software product in private development, with public release held until degree conferral.',
    surface: 'personal',
    tags: ['Product development', 'Capstone'],
    visibility: 'private',
    status: 'private-development',
    story: {
      problem:
        'Academic work can become an independent product, but completing the academic requirements and releasing a product are separate milestones.',
      contribution: 'I am developing this capstone-derived product while completing the transition from academic work to a public release.',
      decisions: [
        {
          title: 'Keep the release boundary explicit',
          description:
            'The project remains private while degree conferral is pending. This page does not offer a download, demo, or source repository.'
        }
      ],
      statusNote: 'Academic requirements are complete; degree conferral and the public product release are pending.',
      related: []
    }
  }),
  project({
    id: 'nena',
    art: { type: 'autostrada', imageUrl: '/hero/wiphala.avif' },
    name: 'Nena',
    subtitle: 'Yearn web experiments',
    summary: 'An early React and TypeScript frontend for exploring the Yearn product.',
    surface: 'earlier-work',
    tags: ['React', 'TypeScript', 'Vite'],
    repository: 'gaulatti/nena',
    story: {
      problem: 'Early product ideas need a place to test interfaces before committing to a larger application.',
      contribution: 'I used Nena as an experimental web frontend for Yearn.',
      decisions: [
        {
          title: 'A deliberately early prototype',
          description:
            'The repository describes itself as an alpha experiment. Its React and Vite foundation supports quick interface iteration.'
        }
      ],
      statusNote: 'An earlier alpha prototype.',
      related: ['roxette']
    }
  }),
  project({
    id: 'roxette',
    art: { type: 'monitor', imageUrl: '/hero/wiphala.avif' },
    name: 'Roxette',
    subtitle: 'Yearn on iOS',
    summary: 'An iOS prototype for experimenting with the Yearn product on a native platform.',
    surface: 'earlier-work',
    tags: ['Swift', 'iOS'],
    repository: 'gaulatti/roxette',
    story: {
      problem: 'A native prototype provides a different way to explore a product idea and its mobile interactions.',
      contribution: 'I developed the iOS experiment alongside the Yearn web frontend.',
      decisions: [
        {
          title: 'Keep the experiment bounded',
          description:
            'The public source contains a Swift Xcode application. It is described as prototyping work rather than a released product.'
        }
      ],
      statusNote: 'An earlier iOS prototype.',
      related: ['nena']
    }
  }),
  project({
    id: 'springfield',
    art: { type: 'monitor', imageUrl: '/hero/nazca.avif' },
    name: 'Springfield',
    subtitle: 'Stream-processing service',
    summary: 'A service for on-demand live-stream repackaging, process lifecycle management, and playback readiness.',
    surface: 'earlier-work',
    tags: ['NestJS', 'FFmpeg', 'HLS', 'MySQL'],
    repository: 'gaulatti/springfield',
    story: {
      problem:
        'Repackaging live streams requires more than launching FFmpeg: processes, output files, readiness, and cleanup need a lifecycle.',
      contribution: 'I built the stream-management service and its orchestration around repackaging jobs.',
      decisions: [
        {
          title: 'Manage the job lifecycle',
          description: 'The service tracks stream work, limits concurrent processes, and cleans up expired processes and output.'
        },
        {
          title: 'Readiness is observable',
          description: 'Playback readiness is checked through HTTP rather than assuming that a started process has produced usable HLS.'
        }
      ],
      statusNote: 'Retained recovery source. Automatic deployment is disabled pending verified recovery.',
      related: ['alana', 'croccante']
    }
  }),
  project({
    id: 'castela',
    art: { type: 'autostrada', imageUrl: '/hero/design.avif' },
    name: 'Castela',
    subtitle: 'An early summarization prototype',
    summary: 'A historical Flask-based experiment in text summarization.',
    surface: 'earlier-work',
    tags: ['Python', 'Flask', 'Summarization'],
    repository: 'gaulatti/castela',
    status: 'archived',
    story: {
      problem: 'An early prototype provided a small web surface for experimenting with summarization.',
      contribution: 'I explored summarization in a Flask application before the later shared AI-service work.',
      decisions: [
        {
          title: 'Retain the experiment as history',
          description:
            'The public source contains a Flask application and templates. Its historical scope is kept distinct from the current Mistify service.'
        }
      ],
      statusNote: 'A historical Flask summarization prototype.',
      related: ['mistify']
    }
  }),
  project({
    id: 'gtt-player',
    art: { type: 'pompeii', imageUrl: '/hero/sanremo.avif' },
    name: 'GTT Player',
    subtitle: 'An early iOS media player',
    summary: 'A historical native media-player prototype for iOS.',
    surface: 'earlier-work',
    tags: ['Swift', 'iOS', 'Media playback'],
    repository: 'gaulatti/gtt-player',
    status: 'archived',
    story: {
      problem: 'A native media-player prototype provided a place to explore mobile playback interfaces.',
      contribution: 'I developed the iOS prototype and kept its source as a record of the work.',
      decisions: [
        {
          title: 'Separate prototype from release',
          description:
            'The public repository contains the application and test projects. It is retained as historical work rather than advertised as a supported player.'
        }
      ],
      statusNote: 'A historical iOS media-player prototype.',
      related: ['atlantide']
    }
  }),
  project({
    id: 'leonora-latorre',
    art: { type: 'monitor', imageUrl: '/hero/points.avif' },
    name: 'Leonora Latorre',
    subtitle: 'A condominium website',
    summary: 'A retained website project from 2015, built with HTML, CSS, and JavaScript.',
    surface: 'earlier-work',
    tags: ['HTML', 'CSS', 'JavaScript'],
    repository: 'gaulatti/leonora-latorre',
    status: 'archived',
    story: {
      problem: 'A condominium needed a website to present its information online.',
      contribution: 'I worked on the website and retain the public source as an earlier web-development project.',
      decisions: [
        {
          title: 'Preserve the original scope',
          description: 'The repository contains the site pages, styles, scripts, and assets. It is read-only historical source.'
        }
      ],
      statusNote: 'Superseded 2015 website; no live deployment.',
      related: []
    }
  }),
  project({
    id: 'foris-challenge',
    art: { type: 'autostrada', imageUrl: '/hero/sprints.avif' },
    name: 'Foris Challenge',
    subtitle: 'Programming exercises',
    summary: 'Solutions to programming challenges written in several languages.',
    surface: 'earlier-work',
    tags: ['Algorithms', 'C#', 'Python', 'JavaScript'],
    repository: 'gaulatti/foris-challenge',
    story: {
      problem: 'Small programming challenges offer a way to compare how different languages express the same solution.',
      contribution: 'I collected solutions across languages including C, C++, C#, Java, JavaScript, PHP, Python, Ruby, and Swift.',
      decisions: [
        {
          title: 'Compare implementations',
          description: 'Language-specific directories keep the exercise solutions separate and easy to inspect.'
        }
      ],
      statusNote: 'A collection of programming exercises.',
      related: []
    }
  }),
  project({
    id: 'nazca',
    art: { type: 'monitor', imageUrl: '/hero/nazca.avif' },
    name: 'Nazca',
    subtitle: 'Live streams and earthquake monitoring',
    summary: 'An earlier experiment connecting live-streaming workflows with earthquake monitoring.',
    surface: 'earlier-work',
    tags: ['Live streaming', 'Monitoring'],
    repository: 'gaulatti/nazca',
    status: 'archived',
    story: {
      problem: 'Earthquake information and live video can provide complementary context when following an unfolding event.',
      contribution: 'I explored that connection in Nazca and documented the idea in a published article.',
      decisions: [
        {
          title: 'Describe the evidence that remains',
          description:
            'The project story is documented in my writing. The public repository is currently empty, so this page makes no claim about an installable implementation.'
        }
      ],
      statusNote: 'Historical experiment. The public repository currently contains no implementation.',
      related: ['monitor', 'springfield']
    }
  }),
  project({
    id: 'php-nuke',
    art: { type: 'pompeii', imageUrl: '/hero/pompeii.avif' },
    name: 'PHP-Nuke archive',
    subtitle: 'Preserved web history',
    summary: 'A preserved copy of the third-party PHP-Nuke portal system, retained for historical reference.',
    surface: 'earlier-work',
    tags: ['PHP', 'Web history', 'Archive'],
    repository: 'gaulatti/php-nuke',
    status: 'archived',
    story: {
      ownership: 'I preserve this third-party project for reference. Original authorship belongs to PHP-Nuke’s creators.',
      problem: 'Earlier web platforms are useful historical references for how publishing systems were built.',
      contribution: 'I preserve this copy for reference. I do not claim original authorship of PHP-Nuke.',
      decisions: [
        {
          title: 'Keep attribution explicit',
          description: 'PHP-Nuke is third-party software. The repository retains its original credits and licensing material.'
        }
      ],
      statusNote: 'A third-party software archive with the original credits and licensing retained.',
      related: []
    }
  })
];
