import { Link } from 'react-router';
import { HOME_SYSTEM_IDS, projectsByIds, siteLink, statusLabel } from '~/data/projects';

/**
 * The home systems grid is rendered from the curated manifest. The selection
 * and its order are editorial (`HOME_SYSTEM_IDS`); the facts are not restated
 * here, so a correction lands in one place.
 */
const systems = projectsByIds(HOME_SYSTEM_IDS);

/** Presentation only — the accent rotates so adjacent cards differ. */
const accents = ['bg-accent-blue', 'bg-accent-red', 'bg-accent-yellow'];

export function Systems() {
  return (
    <section className='relative py-24'>
      <div className='absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2'>
        <div className='rotate-45 border-accent-red h-full w-full border-8' />
      </div>

      <div className='container relative'>
        <div className='mx-auto max-w-5xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-3xl font-semibold leading-tight tracking-refined md:text-4xl'>fifthbell Media Systems</h2>
            <p className='font-secondary text-text-secondary mx-auto max-w-3xl text-xl'>
              A personal media infrastructure platform I designed, built, and operate. These systems power real-world broadcast operations, automated content
              production, and newsroom monitoring.
            </p>
          </div>

          <div className='grid gap-8 md:grid-cols-2'>
            {systems.map((system, index) => {
              const site = siteLink(system);

              return (
                <div key={system.id} className='hover-lift content-surface p-8'>
                  <div className={`mb-6 h-2 w-16 ${accents[index % accents.length]}`} />
                  <h3 className='mb-3 text-xl font-medium tracking-refined md:text-2xl'>{system.name}</h3>
                  <p className='text-sea dark:text-accent-blue mb-4 text-sm'>{system.subtitle}</p>
                  {system.status === 'live' ? null : (
                    <p className='font-secondary text-text-secondary mb-3 text-xs uppercase tracking-wide'>{statusLabel(system.status)}</p>
                  )}
                  <p className='font-secondary text-text-secondary mb-4 text-gray-600'>{system.summary}</p>
                  <div className='flex flex-wrap gap-2'>
                    {system.tags.map((tag) => (
                      <span key={tag} className='dark:bg-dark-sand rounded bg-gray-100 px-3 py-1 text-xs'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {site ? (
                    <a
                      href={site.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sea dark:text-accent-blue mt-4 inline-flex items-center text-sm font-medium hover:underline'
                    >
                      Visit Live Site
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className='mt-12 text-center'>
            <Link to='/success-cases/fifthbell' className='text-sea dark:text-accent-blue inline-flex items-center font-medium hover:underline'>
              View Full Architecture
              <svg xmlns='http://www.w3.org/2000/svg' className='ml-2 h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
