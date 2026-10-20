import { Link } from 'react-router';

export function Experience() {
  return (
    <section className='quiet-section py-24'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-3xl font-semibold leading-tight tracking-refined md:text-4xl'>Experience</h2>
            <p className='font-secondary text-text-secondary text-xl'>AI infrastructure, developer platforms, and production reliability</p>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            <div className='text-center'>
              <div className='light:bg-sea dark:bg-accent-blue mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                  />
                </svg>
              </div>
              <h4 className='mb-2 font-semibold'>Medsender</h4>
              <p className='font-secondary text-text-secondary text-sm text-gray-600'>Building an LLM Gateway, MCP services, developer tooling, and engineering automation.</p>
            </div>
            <div className='text-center'>
              <div className='light:bg-sea dark:bg-accent-blue mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <h4 className='mb-2 font-semibold'>CNN</h4>
              <p className='font-secondary text-text-secondary text-sm text-gray-600'>Staff engineering across design systems, performance, and developer platforms.</p>
            </div>
            <div className='text-center'>
              <div className='light:bg-sea dark:bg-accent-blue mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <h4 className='mb-2 font-semibold'>Amazon</h4>
              <p className='font-secondary text-text-secondary text-sm text-gray-600'>Reduced catastrophic Amazon Explore session failures from 40% to 1.3% over six months.</p>
            </div>
          </div>

          <div className='mt-12 text-center'>
            <Link to='/journey' className='light:bg-black dark:bg-accent-blue inline-block px-8 py-3 font-medium text-white'>
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
