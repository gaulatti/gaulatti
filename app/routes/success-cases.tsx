import { Link } from 'react-router';

export function meta() {
  return [
    { title: 'Case Studies — Gaulatti' },
    {
      name: 'description',
      content:
        'Real-world projects and operations I built or led — from designing a personal media infrastructure platform to executive producing live broadcasts from Sanremo, Italy.'
    }
  ];
}

export default function SuccessCases() {
  return (
    <main className='flex flex-col pt-24'>
      <section className='relative py-16'>
        <div className='container'>
          <div className='mx-auto max-w-4xl'>
            <h1 className='mb-6 text-5xl font-bold tracking-tight md:text-6xl'>Case Studies</h1>
            <p className='light:text-gray-600 dark:text-text-secondary max-w-3xl text-xl'>
              Real-world work I designed, built, and led — each one documenting not just what was done, but the decisions and context behind it.
            </p>
          </div>
        </div>
      </section>

      <section className='light:bg-gray-50 dark:bg-deep-sea py-16'>
        <div className='container'>
          <div className='mx-auto max-w-4xl space-y-10'>
            <Link to='/success-cases/fifthbell' className='group block'>
              <div className='dark:bg-sand rounded-lg bg-white p-10 transition-all duration-300 hover:shadow-lg'>
                <div className='bg-accent-blue mb-6 h-1 w-16' />
                <p className='text-accent-blue mb-3 text-sm font-medium tracking-wide uppercase'>Platform Engineering</p>
                <h2 className='mb-4 text-3xl font-bold group-hover:underline'>fifthbell Media Systems</h2>
                <p className='light:text-gray-600 dark:text-text-secondary mb-6 text-lg'>
                  A personal media infrastructure platform I designed, built, and operate — powering live broadcast operations, automated content production,
                  and newsroom monitoring.
                </p>
                <div className='mb-8 flex flex-wrap gap-6'>
                  <div className='flex items-center gap-2'>
                    <span className='bg-accent-blue h-2 w-2 rounded-full' />
                    <span className='light:text-gray-600 dark:text-text-secondary text-sm'>8+ interconnected services</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-accent-red h-2 w-2 rounded-full' />
                    <span className='light:text-gray-600 dark:text-text-secondary text-sm'>Live broadcast infrastructure</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-accent-yellow h-2 w-2 rounded-full' />
                    <span className='light:text-gray-600 dark:text-text-secondary text-sm'>TypeScript, AWS, NestJS</span>
                  </div>
                </div>
                <span className='text-accent-blue text-sm font-medium'>Read case study →</span>
              </div>
            </Link>

            <Link to='/success-cases/sanremo' className='group block'>
              <div className='dark:bg-sand rounded-lg bg-white p-10 transition-all duration-300 hover:shadow-lg'>
                <div className='bg-accent-red mb-6 h-1 w-16' />
                <p className='text-accent-red mb-3 text-sm font-medium tracking-wide uppercase'>Live Operations</p>
                <h2 className='mb-4 text-3xl font-bold group-hover:underline'>Sanremo Festival Coverage</h2>
                <p className='light:text-gray-600 dark:text-text-secondary mb-6 text-lg'>
                  Executive production and live operations leadership for a joint media venture covering the Sanremo Music Festival — including crisis response,
                  a complete production rebuild, and delivery under sustained operational pressure.
                </p>
                <div className='mb-8 flex flex-wrap gap-6'>
                  <div className='flex items-center gap-2'>
                    <span className='bg-accent-blue h-2 w-2 rounded-full' />
                    <span className='light:text-gray-600 dark:text-text-secondary text-sm'>3 countries coordinated</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-accent-red h-2 w-2 rounded-full' />
                    <span className='light:text-gray-600 dark:text-text-secondary text-sm'>4–5 hour broadcasts</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-accent-yellow h-2 w-2 rounded-full' />
                    <span className='light:text-gray-600 dark:text-text-secondary text-sm'>~2,000 peak viewers</span>
                  </div>
                </div>
                <span className='text-accent-red text-sm font-medium'>Read case study →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
