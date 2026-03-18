import { Link } from 'react-router';

export function FeaturedOperation() {
  return (
    <section className='light:bg-gray-50 dark:bg-deep-sea py-20'>
      <div className='container'>
        <div className='mx-auto max-w-5xl'>
          <p className='text-accent-red mb-4 text-sm font-medium tracking-wide uppercase'>Featured Operation</p>
          <div className='grid items-center gap-12 md:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-3xl font-bold md:text-4xl'>Sanremo Festival Coverage</h2>
              <p className='light:text-gray-600 dark:text-text-secondary mb-6 text-lg'>
                Executive production and live operations leadership for a joint media venture covering the Sanremo Festival. Includes crisis response,
                production redesign, editorial direction, and multi-hour live broadcasts from Italy.
              </p>
              <div className='mb-8 flex flex-wrap gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='bg-accent-blue h-2 w-2 rounded-full' />
                  <span className='light:text-gray-600 dark:text-text-secondary text-sm'>3 countries coordinated</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='bg-accent-red h-2 w-2 rounded-full' />
                  <span className='light:text-gray-600 dark:text-text-secondary text-sm'>4-5 hour broadcasts</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='bg-accent-yellow h-2 w-2 rounded-full' />
                  <span className='light:text-gray-600 dark:text-text-secondary text-sm'>~2,000 total viewers</span>
                </div>
              </div>
              <Link to='/success-cases/sanremo' className='text-accent-blue inline-flex items-center gap-2 font-medium hover:underline'>
                Read the case study
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </Link>
            </div>

            <div className='dark:bg-sand rounded-lg bg-white p-8'>
              <div className='space-y-4'>
                <div className='flex items-start gap-4'>
                  <div className='bg-accent-red h-full w-1 flex-shrink-0 rounded' />
                  <div>
                    <p className='mb-1 font-medium'>Crisis Response</p>
                    <p className='light:text-gray-600 dark:text-text-secondary text-sm'>
                      Removed failing dependency and assumed full operational control under time pressure.
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='bg-accent-blue h-full w-1 flex-shrink-0 rounded' />
                  <div>
                    <p className='mb-1 font-medium'>Technical Redesign</p>
                    <p className='light:text-gray-600 dark:text-text-secondary text-sm'>Rebuilt broadcast architecture locally in approximately 3 days.</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='bg-accent-yellow h-full w-1 flex-shrink-0 rounded' />
                  <div>
                    <p className='mb-1 font-medium'>Live Execution</p>
                    <p className='light:text-gray-600 dark:text-text-secondary text-sm'>
                      Led multi-hour broadcasts with distributed contributors across time zones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
