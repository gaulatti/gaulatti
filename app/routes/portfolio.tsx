import { BauhausBackground } from '@gaulatti/bleecker/components/bauhaus-background';
import { Link } from 'react-router';
import {
  projectsForSurface,
  repositoryLinks,
  siteLink,
  statusLabel,
  type ProjectFact
} from '~/data/projects';
import type { Route } from './+types/portfolio';

/**
 * Every fact on this page comes from the curated manifest in
 * `app/data/projects.ts`. Nothing here is discovered, and an entry that is not
 * explicitly approved for publication never reaches this component.
 */
const personalProjects = projectsForSurface('personal');
const mediaProjects = projectsForSurface('media-infrastructure');

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
  const renderProject = (project: ProjectFact, index: number) => {
    const site = siteLink(project);
    const repositories = repositoryLinks(project);

    return (
    <article key={project.id} className='text-fade-in group' style={{ animationDelay: `${(index + 2) * 100}ms` }}>
      <div className='grid items-center gap-8 md:grid-cols-2'>
        <div className='order-2 md:order-1'>
          {site ? (
            <a href={site.href} className='group/title block' target='_blank' rel='noopener noreferrer'>
              <h3 className='group-hover/title:text-accent-blue mb-4 text-xl font-medium tracking-refined md:text-2xl transition-colors'>{project.name}</h3>
            </a>
          ) : (
            <h3 className='mb-4 text-xl font-medium tracking-refined md:text-2xl'>{project.name}</h3>
          )}
          {project.status === 'live' ? null : (
            <p className='font-secondary text-text-secondary mb-3 text-sm uppercase tracking-wide'>{statusLabel(project.status)}</p>
          )}
          <p className='font-secondary text-text-secondary mb-4 text-gray-600'>{project.summary}</p>
          <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              {project.tags.map((tag) => (
                <span key={tag} className='bg-light-sand/55 dark:bg-white/[0.05] rounded-sm px-2 py-1 text-sm'>
                  {tag}
                </span>
              ))}
            </div>
            {project.links.length > 0 && (
              <div className='flex flex-wrap gap-4'>
                {site ? (
                  <a
                    href={site.href}
                    className='font-secondary text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors'
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
                {repositories.map((repository) => (
                  <a
                    key={repository.href}
                    href={repository.href}
                    className='font-secondary text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src='/icons/github.svg' alt='' className='h-4 w-4 dark:invert' />
                    <span>{repository.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='order-1 md:order-2'>
          {site ? (
            <a href={site.href} className='block' target='_blank' rel='noopener noreferrer'>
              <div className='bg-light-sand/55 dark:bg-white/[0.05] hover-lift aspect-video overflow-hidden rounded-sm'>
                <BauhausBackground type={project.art.type} imageUrl={project.art.imageUrl} />
              </div>
            </a>
          ) : (
            <div className='bg-light-sand/55 dark:bg-white/[0.05] hover-lift aspect-video overflow-hidden rounded-sm'>
              <BauhausBackground type={project.art.type} imageUrl={project.art.imageUrl} />
            </div>
          )}
        </div>
      </div>
    </article>
    );
  };

  return (
    <div className='consumer-main pt-32'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='text-fade-in mb-8 text-4xl font-semibold leading-[1.08] tracking-refined md:text-5xl'>Projects</h1>
          <p className='text-fade-in font-secondary text-text-secondary mb-16 max-w-2xl text-xl' style={{ animationDelay: '100ms' }}>
            Production systems I&apos;ve designed and built. Each project addresses real operational challenges in observability, monitoring, and media
            infrastructure.
          </p>

          <section className='mb-24'>
            <h2 className='mb-12 text-2xl font-semibold tracking-refined md:text-3xl'>Personal Projects</h2>
            <div className='grid gap-12'>{personalProjects.map((project, index) => renderProject(project, index))}</div>
          </section>

          <section className='mb-24'>
            <h2 className='mb-3 text-2xl font-semibold tracking-refined md:text-3xl'>Media Infrastructure</h2>
            <p className='font-secondary text-text-secondary mb-12 max-w-2xl text-lg'>
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
    </div>
  );
}
