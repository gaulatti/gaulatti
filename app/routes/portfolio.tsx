import { Link } from 'react-router';
import { BauhausBackground } from '~/components/BauhausBackground';
import type { Route } from './+types/portfolio';

interface Project {
  title: string;
  description: string;
  type: 'autostrada' | 'pompeii' | 'monitor';
  tags: string[];
  link?: string;
  imageUrl?: string;
  repos: { label: string; link: string }[];
  other?: { link: string; text: string; icon: string }[];
}

const personalProjects: Project[] = [
  {
    title: 'Monitor',
    description:
      "AI-powered news monitoring system that aggregates global sources, clusters stories into events, and sends real-time alerts. Originally built for fifthbell's newsroom operations. Combines web scraping with NLP to filter signal from noise in breaking news scenarios.",
    type: 'monitor',
    tags: ['TypeScript', 'NestJS', 'AI/ML', 'AWS'],
    link: 'https://monitor.fifthbell.com',
    imageUrl: '/hero/monitor.avif',
    repos: []
  }
];

const mediaProjects: Project[] = [
  {
    title: 'Cronkite',
    description:
      'Core publishing engine for fifthbell. Transforms CMS content into static HTML pages and automated short-form video clips via FFMPEG. Event-driven builds deploy to S3 with CloudFront invalidation in under a second.',
    type: 'autostrada',
    tags: ['TypeScript', 'NestJS', 'FFMPEG', 'AWS S3', 'CloudFront'],
    imageUrl: '/hero/design.avif',
    repos: []
  },
  {
    title: 'Alcántara',
    description:
      'Professional broadcast overlay control system with real-time SSE updates. Manages lower thirds, full-screen graphics, and corner bugs at fixed 1920×1080. Consolidates scene and playlist control (formerly split with Toni).',
    type: 'monitor',
    tags: ['React', 'NestJS', 'SSE', 'Prisma', 'obs-websocket'],
    imageUrl: '/hero/normandy.avif',
    repos: []
  },
  {
    title: 'Alana',
    description:
      'Dockerized OBS Studio runtime for 24/7 automated streaming to YouTube. Receives clean feeds from Alcántara, handles GPU hardware encoding via Intel QSV, and exposes VNC for visual monitoring.',
    type: 'pompeii',
    tags: ['Docker', 'OBS Studio', 'VNC', 'Intel QSV'],
    imageUrl: '/hero/catastrophes.avif',
    repos: [{ label: 'GitHub', link: 'https://github.com/gaulatti/alana' }]
  },
  {
    title: 'Broadway',
    description:
      "Web application for creating branded 1080×1920 social media story templates. Live preview, auto-generated forms from field definitions, and one-click PNG export. Built for fifthbell's content pipeline, branded under gaulatti.",
    type: 'autostrada',
    tags: ['React Router 7', 'TypeScript', 'Tailwind CSS 4', 'Vite'],
    link: 'https://broadway.gaulatti.com',
    imageUrl: '/hero/wiphala.avif',
    repos: [{ label: 'GitHub', link: 'https://github.com/gaulatti/broadway' }]
  },
  {
    title: 'Celesti',
    description:
      'Stream routing and newsroom display management platform. Go backend (mattone) with a Kotlin/Jetpack Compose Android TV client (pioggia). Manages M3U channel inventory and dispatches playback commands to devices via SSE.',
    type: 'monitor',
    tags: ['Go', 'Echo', 'Kotlin', 'Jetpack Compose', 'SSE'],
    imageUrl: '/hero/points.avif',
    repos: [
      { label: 'mattone', link: 'https://github.com/gaulatti/mattone' },
      { label: 'pioggia', link: 'https://github.com/gaulatti/pioggia' }
    ]
  }
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Projects — Gaulatti' },
    {
      name: 'description',
      content: 'Engineering projects: observability platforms, real-time monitoring systems, and media infrastructure tools.'
    }
  ];
}

export default function Portfolio() {
  const renderProject = (project: Project, index: number) => (
    <article key={project.title} className='text-fade-in group' style={{ animationDelay: `${(index + 2) * 100}ms` }}>
      <div className='grid items-center gap-8 md:grid-cols-2'>
        <div className='order-2 md:order-1'>
          {project.link ? (
            <a href={project.link} className='group/title block' target='_blank' rel='noopener noreferrer'>
              <h3 className='group-hover/title:text-accent-blue mb-4 text-2xl font-bold transition-colors'>{project.title}</h3>
            </a>
          ) : (
            <h3 className='mb-4 text-2xl font-bold'>{project.title}</h3>
          )}
          <p className='dark:text-text-secondary mb-4 text-gray-600'>{project.description}</p>
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              {project.tags.map((tag) => (
                <span key={tag} className='light:bg-gray-100 dark:bg-sand rounded-sm px-2 py-1 text-sm'>
                  {tag}
                </span>
              ))}
            </div>
            {(project.link || project.repos.length > 0 || project.other) && (
              <div className='flex flex-wrap gap-4'>
                {project.link ? (
                  <a
                    href={project.link}
                    className='light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='h-4 w-4'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 3h6v6' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M10 14 21 3' />
                    </svg>
                    <span>Live Site</span>
                  </a>
                ) : null}
                {project.repos.map((repo) => (
                  <a
                    key={repo.link}
                    href={repo.link}
                    className='light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src='/icons/github.svg' alt='' className='h-4 w-4 dark:invert' />
                    <span>{repo.label}</span>
                  </a>
                ))}
                {project.other?.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    className='light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={item.icon} alt='' className='h-4 w-4 dark:invert' />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='order-1 md:order-2'>
          {project.link ? (
            <a href={project.link} className='block' target='_blank' rel='noopener noreferrer'>
              <div className='light:bg-gray-100 dark:bg-sand hover-lift aspect-video overflow-hidden rounded-sm'>
                <BauhausBackground type={project.type} imageUrl={project.imageUrl} />
              </div>
            </a>
          ) : (
            <div className='light:bg-gray-100 dark:bg-sand hover-lift aspect-video overflow-hidden rounded-sm'>
              <BauhausBackground type={project.type} imageUrl={project.imageUrl} />
            </div>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <main className='pt-32 pb-24'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='text-fade-in mb-8 text-5xl font-bold tracking-tight md:text-6xl'>Projects</h1>
          <p className='text-fade-in light:text-gray-600 dark:text-text-secondary mb-16 max-w-2xl text-xl' style={{ animationDelay: '100ms' }}>
            Production systems I&apos;ve designed and built. Each project addresses real operational challenges in observability, monitoring, and media
            infrastructure.
          </p>

          <section className='mb-24'>
            <h2 className='mb-12 text-3xl font-bold'>Personal Projects</h2>
            <div className='grid gap-12'>{personalProjects.map((project, index) => renderProject(project, index))}</div>
          </section>

          <section className='mb-24'>
            <h2 className='mb-3 text-3xl font-bold'>Media Infrastructure</h2>
            <p className='light:text-gray-600 dark:text-text-secondary mb-12 max-w-2xl text-lg'>
              Built to power fifthbell&apos;s broadcast and publishing operations. Authored and maintained under the gaulatti brand.
            </p>
            <div className='grid gap-12'>{mediaProjects.map((project, index) => renderProject(project, index))}</div>
          </section>

          <div className='text-fade-in mt-8 text-center' style={{ animationDelay: '800ms' }}>
            <p className='mb-8 text-xl'>Interested in collaborating on a project?</p>
            <Link to='/contact' className='light:bg-black dark:bg-accent-blue focus-accent hover-lift inline-block px-8 py-3 font-medium text-white'>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
