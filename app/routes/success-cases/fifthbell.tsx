import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'fifthbell Media Systems — Platform Engineering & Infrastructure' },
    {
      name: 'description',
      content:
        'fifthbell media systems architecture, broadcast stack, and publishing pipeline. Real-world systems built and operated by a Staff Software Engineer.'
    }
  ];
}

export default function Fifthbell() {
  return (
    <main className='flex flex-col pt-24'>
      <section className='relative py-16'>
        <div className='container'>
          <div className='mx-auto max-w-4xl'>
            <Link to='/success-cases' className='text-accent-blue mb-6 inline-flex items-center gap-1 text-sm font-medium hover:underline'>
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
              </svg>
              Case Studies
            </Link>
            <p className='text-accent-blue mb-4 mt-4 text-sm font-medium tracking-wide uppercase'>Platform Engineering</p>
            <h1 className='mb-6 text-5xl font-bold tracking-tight md:text-6xl'>fifthbell Media Systems</h1>
            <p className='light:text-gray-600 dark:text-text-secondary max-w-3xl text-xl'>
              I design, build, and operate production systems. This page documents the architecture of fifthbell — a personal media infrastructure platform
              I&apos;ve built to power real-world broadcast operations, automated content production, and newsroom monitoring.
            </p>
          </div>
        </div>
      </section>

      <section className='light:bg-gray-50 dark:bg-deep-sea py-16'>
        <div className='container'>
          <div className='mx-auto max-w-5xl'>
            <div className='mb-12'>
              <h2 className='mb-4 text-3xl font-bold md:text-4xl'>fifthbell Media Systems</h2>
              <p className='light:text-gray-600 dark:text-text-secondary max-w-3xl text-lg'>
                A collection of interconnected services that form a complete media production and distribution platform. These systems have been used for live
                event coverage, automated broadcasting, and newsroom operations.
              </p>
            </div>

            <div className='dark:bg-sand mb-12 rounded-lg bg-white p-8'>
              <h3 className='mb-6 text-xl font-bold'>System Architecture</h3>
              <div className='rounded border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600'>
                <p className='dark:text-text-secondary mb-4 text-gray-500'>Architecture Diagram</p>
                <div className='mx-auto grid max-w-2xl grid-cols-3 gap-4 text-sm'>
                  <div className='bg-accent-blue/10 rounded p-4'>
                    <strong>Publishing Pipeline</strong>
                    <p className='mt-1 text-xs'>Cronkite → S3 → CloudFront</p>
                  </div>
                  <div className='bg-accent-red/10 rounded p-4'>
                    <strong>Broadcast Pipeline</strong>
                    <p className='mt-1 text-xs'>Alcántara → OBS → YouTube</p>
                  </div>
                  <div className='bg-accent-yellow/10 rounded p-4'>
                    <strong>Automation Pipeline</strong>
                    <p className='mt-1 text-xs'>Toni + Broadway → Scheduled</p>
                  </div>
                </div>
                <div className='dark:bg-dark-sand mx-auto mt-4 max-w-md rounded bg-gray-100 p-4'>
                  <strong>Monitoring Layer</strong>
                  <p className='mt-1 text-xs'>Monitor + Celesti → Real-time feeds</p>
                </div>
              </div>
            </div>

            <div className='grid gap-8 md:grid-cols-2'>
              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-blue mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Cronkite</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>Publishing Engine & Rendering Pipeline</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>
                  Core publishing system that transforms CMS content into static pages and automated video clips.
                </p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>• Event-driven publishing triggered by CMS updates</li>
                  <li>• Static HTML generation with incremental builds</li>
                  <li>• FFMPEG-based video rendering for short-form content</li>
                  <li>• S3 deployment with CloudFront invalidation</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>TypeScript</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>NestJS</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>AWS S3</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>FFMPEG</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>CloudFront</span>
                </div>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-red mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Alcántara</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>Broadcast Overlay Control System</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>
                  Professional TV broadcast overlay system with real-time control panel for managing on-air graphics.
                </p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>• React Router v7 frontend with Vite + Tailwind</li>
                  <li>• NestJS + Fastify backend with Prisma/SQLite</li>
                  <li>• SSE for real-time overlay updates</li>
                  <li>• Fixed 1920x1080 program output for broadcast</li>
                  <li>• Supports lower thirds, full-screen, corner bugs</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>React</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>NestJS</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>SSE</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Prisma</span>
                </div>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-yellow mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Toni</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>OBS Control & Playlist Management</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>
                  Control interface for OBS via WebSocket. Manages scenes, transitions, and media playlists.
                </p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>• React Router frontend for playlist management</li>
                  <li>• NestJS backend with obs-websocket integration</li>
                  <li>• Media upload and scene composition</li>
                  <li>• AWS CDK infrastructure deployment</li>
                  <li>• Provides clean feed output to Alana</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>React</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>NestJS</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>obs-websocket</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>AWS CDK</span>
                </div>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-blue mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Alana</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>Containerized OBS Streaming Runtime</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>Dockerized OBS Studio environment for 24/7 automated streaming to YouTube.</p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>• OBS Studio with obs-websocket (v5) for remote API control</li>
                  <li>• VNC access for visual monitoring</li>
                  <li>• GPU hardware encoding (Intel QSV)</li>
                  <li>• Receives clean feed from Alcántara + Toni</li>
                  <li>• Dynamic scene management via WebSocket commands</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Docker</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>OBS</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>VNC</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Intel QSV</span>
                </div>
                <a
                  href='https://github.com/gaulatti/alana'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-accent-blue mt-4 inline-block text-sm hover:underline'
                >
                  View on GitHub →
                </a>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-blue mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Broadway</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>Story Template Studio</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>
                  Web application for creating and exporting professional social media story templates.
                </p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>• Extensible React component template system</li>
                  <li>• Auto-generated forms from field definitions</li>
                  <li>• Real-time live preview of customizations</li>
                  <li>• Perfect 1080×1920 PNG export</li>
                  <li>• Server-side rendering with React Router 7</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>React Router 7</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>TypeScript</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Tailwind CSS 4</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Vite</span>
                </div>
                <a
                  href='https://github.com/gaulatti/broadway'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-accent-blue mt-4 inline-block text-sm hover:underline'
                >
                  View on GitHub →
                </a>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-red mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Monitor</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>Global News & Earthquake Monitoring</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>
                  Source-agnostic content ingestion and monitoring service with real-time SSE feeds.
                </p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>• NestJS + Fastify backend with Sequelize ORM</li>
                  <li>• Qdrant vector DB for semantic search & clustering</li>
                  <li>• Automatic language detection and embedding-based story deduplication</li>
                  <li>• AI-powered translation and classification pipeline</li>
                  <li>• SSE endpoints for posts, earthquakes, and events</li>
                  <li>• React Router frontend (Sonar)</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>NestJS</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Qdrant</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>SSE</span>
                </div>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <div className='bg-accent-yellow mb-6 h-1 w-16' />
                <h3 className='mb-2 text-2xl font-bold'>Celesti</h3>
                <p className='text-sea dark:text-accent-blue mb-4 text-sm font-medium'>Stream Routing & Monitoring</p>
                <h4 className='mt-6 mb-2 font-bold'>Purpose</h4>
                <p className='dark:text-text-secondary text-sm text-gray-600'>
                  Central control system for managing multiple displays in a newsroom environment.
                </p>
                <h4 className='mt-6 mb-2 font-bold'>Architecture</h4>
                <ul className='dark:text-text-secondary space-y-1 text-sm text-gray-600'>
                  <li>
                    • <strong>mattone</strong> — Go backend (Echo + GORM + PostgreSQL)
                  </li>
                  <li>
                    • <strong>pioggia</strong> — Kotlin Android TV client (Jetpack Compose)
                  </li>
                  <li>• M3U import and channel management</li>
                  <li>• SSE-based command dispatch to devices</li>
                  <li>• JWT auth via AWS Cognito</li>
                </ul>
                <h4 className='mt-6 mb-2 font-bold'>Technologies</h4>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Go</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Echo</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Kotlin</span>
                  <span className='dark:bg-dark-sand rounded bg-gray-100 px-2 py-1 text-xs'>Jetpack Compose</span>
                </div>
                <div className='mt-4 flex gap-4'>
                  <a href='https://github.com/gaulatti/mattone' target='_blank' rel='noopener noreferrer' className='text-accent-blue text-sm hover:underline'>
                    mattone →
                  </a>
                  <a href='https://github.com/gaulatti/pioggia' target='_blank' rel='noopener noreferrer' className='text-accent-blue text-sm hover:underline'>
                    pioggia →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='container'>
          <div className='mx-auto max-w-5xl'>
            <div className='mb-12'>
              <h2 className='mb-4 text-3xl font-bold md:text-4xl'>Broadcast Stack</h2>
              <p className='light:text-gray-600 dark:text-text-secondary max-w-3xl text-lg'>
                The live broadcast architecture used for multi-hour event coverage and distributed production workflows.
              </p>
            </div>

            <div className='dark:bg-sand mb-8 rounded-lg bg-white p-8'>
              <h3 className='mb-6 text-xl font-bold'>Signal Flow</h3>
              <div className='space-y-4'>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='bg-accent-blue/10 rounded px-4 py-2 font-medium'>Camera</div>
                  <span className='text-gray-400'>→</span>
                  <div className='bg-accent-blue/10 rounded px-4 py-2 font-medium'>OBS Studio</div>
                  <span className='text-gray-400'>→</span>
                  <div className='bg-accent-red/10 rounded px-4 py-2 font-medium'>Alcántara Overlays</div>
                  <span className='text-gray-400'>→</span>
                  <div className='bg-accent-yellow/10 rounded px-4 py-2 font-medium'>YouTube Live</div>
                </div>
                <div className='mt-4 flex flex-wrap items-center gap-4'>
                  <div className='dark:bg-dark-sand rounded bg-gray-100 px-4 py-2'>RAI Audio</div>
                  <span className='text-gray-400'>→</span>
                  <div className='dark:bg-dark-sand rounded bg-gray-100 px-4 py-2'>Scarlett 2i2</div>
                  <span className='text-gray-400'>→</span>
                  <div className='bg-accent-blue/10 rounded px-4 py-2 font-medium'>OBS Audio Mix</div>
                </div>
                <div className='mt-4 flex flex-wrap items-center gap-4'>
                  <div className='dark:bg-dark-sand rounded bg-gray-100 px-4 py-2'>Remote Hosts</div>
                  <span className='text-gray-400'>→</span>
                  <div className='dark:bg-dark-sand rounded bg-gray-100 px-4 py-2'>Jitsi</div>
                  <span className='text-gray-400'>→</span>
                  <div className='bg-accent-blue/10 rounded px-4 py-2 font-medium'>OBS NDI/Window Capture</div>
                </div>
              </div>
            </div>

            <div className='grid gap-8 md:grid-cols-3'>
              <div className='dark:bg-sand rounded-lg bg-white p-6 text-center'>
                <div className='text-sea dark:text-accent-blue mb-2 text-4xl font-bold'>4-5h</div>
                <p className='dark:text-text-secondary text-gray-600'>Broadcast Duration</p>
              </div>
              <div className='dark:bg-sand rounded-lg bg-white p-6 text-center'>
                <div className='text-sea dark:text-accent-blue mb-2 text-4xl font-bold'>~2000</div>
                <p className='dark:text-text-secondary text-gray-600'>P90 Concurrent Viewers</p>
              </div>
              <div className='dark:bg-sand rounded-lg bg-white p-6 text-center'>
                <div className='text-sea dark:text-accent-blue mb-2 text-4xl font-bold'>3+</div>
                <p className='dark:text-text-secondary text-gray-600'>Distributed Hosts</p>
              </div>
            </div>

            <div className='dark:bg-sand mt-8 rounded-lg bg-gray-50 p-6'>
              <h4 className='mb-3 font-bold'>Production Details</h4>
              <ul className='dark:text-text-secondary space-y-2 text-sm text-gray-600'>
                <li>• Hosts distributed across Italy and Spain, coordinated via Jitsi</li>
                <li>• Live audio ingest from RAI broadcast through Scarlett 2i2 audio interface</li>
                <li>• Real-time overlay control through Alcántara during live broadcast</li>
                <li>• Automated lower thirds and graphics triggered by production cues</li>
                <li>• Multi-camera switching with scene transitions managed in OBS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='light:bg-gray-50 dark:bg-deep-sea py-16'>
        <div className='container'>
          <div className='mx-auto max-w-5xl'>
            <div className='mb-12'>
              <h2 className='mb-4 text-3xl font-bold md:text-4xl'>Publishing Pipeline</h2>
              <p className='light:text-gray-600 dark:text-text-secondary max-w-3xl text-lg'>
                The content delivery architecture that powers static publishing, video generation, and social media automation.
              </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2'>
              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <h3 className='mb-4 text-xl font-bold'>Static Publishing</h3>
                <p className='dark:text-text-secondary mb-4 text-sm text-gray-600'>
                  Content flows from CMS through Cronkite for static generation, deployed to S3 with CloudFront distribution.
                </p>
                <ul className='dark:text-text-secondary space-y-2 text-sm text-gray-600'>
                  <li>• Webhook-triggered builds on content update</li>
                  <li>• Incremental regeneration for changed pages only</li>
                  <li>• Automatic CloudFront cache invalidation</li>
                  <li>• Sub-second deployment for breaking news</li>
                </ul>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <h3 className='mb-4 text-xl font-bold'>Video Automation</h3>
                <p className='dark:text-text-secondary mb-4 text-sm text-gray-600'>
                  Automated generation of short-form video content from text articles and data feeds.
                </p>
                <ul className='dark:text-text-secondary space-y-2 text-sm text-gray-600'>
                  <li>• Template-based video composition</li>
                  <li>• TTS integration for narration (Amazon Polly)</li>
                  <li>• FFMPEG rendering pipeline</li>
                  <li>• Automatic upload to YouTube and social platforms</li>
                </ul>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <h3 className='mb-4 text-xl font-bold'>Social Media Automation</h3>
                <p className='dark:text-text-secondary mb-4 text-sm text-gray-600'>
                  Broadway generates branded visuals for Instagram, coordinated with content publishing.
                </p>
                <ul className='dark:text-text-secondary space-y-2 text-sm text-gray-600'>
                  <li>• Brand-consistent template library</li>
                  <li>• Dynamic text and image insertion</li>
                  <li>• Multi-format export (post, story, carousel)</li>
                  <li>• Scheduled publishing queue</li>
                </ul>
              </div>

              <div className='dark:bg-sand rounded-lg bg-white p-8'>
                <h3 className='mb-4 text-xl font-bold'>Intelligence Layer</h3>
                <p className='dark:text-text-secondary mb-4 text-sm text-gray-600'>
                  Monitor feeds content suggestions into the publishing pipeline based on breaking news detection.
                </p>
                <ul className='dark:text-text-secondary space-y-2 text-sm text-gray-600'>
                  <li>• AI-powered relevance scoring</li>
                  <li>• Automated content suggestions</li>
                  <li>• Breaking news alerting</li>
                  <li>• Source verification tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='container'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='mb-6 text-3xl font-bold'>Want to discuss architecture?</h2>
            <p className='light:text-gray-600 dark:text-text-secondary mb-8 text-lg'>
              I&apos;m always interested in discussing systems design, media infrastructure, or potential collaboration.
            </p>
            <div className='flex flex-wrap justify-center gap-6'>
              <Link to='/contact' className='light:bg-sea dark:bg-accent-blue px-8 py-3 font-medium text-white transition-all duration-400'>
                Get in Touch
              </Link>
              <Link to='/success-cases/sanremo' className='light:border-dusk dark:border-white border px-8 py-3 font-medium transition-all duration-400'>
                See Sanremo Case Study
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
