import { Link } from 'react-router';

export function Architecture() {
  return (
    <section className='relative overflow-hidden py-24'>
      <div className='absolute inset-0'>
        <div className='bg-accent-yellow absolute top-0 left-0 h-64 w-64 -rotate-12 opacity-5' />
        <div className='bg-accent-blue absolute right-0 bottom-0 h-64 w-64 rotate-12 opacity-5' />
      </div>

      <div className='container relative'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-4xl font-bold tracking-tight md:text-5xl'>Technical Stack</h2>
            <p className='light:text-gray-600 dark:text-text-secondary text-xl'>Production-grade infrastructure and tooling</p>
          </div>

          <div className='grid gap-12 lg:grid-cols-2'>
            <div className='space-y-8'>
              <div className='hover-lift dark:bg-sand bg-white p-8'>
                <h3 className='mb-6 text-2xl font-bold'>Languages & Frameworks</h3>
                <div className='space-y-4'>
                  <div>
                    <h4 className='mb-2 font-bold'>Backend</h4>
                    <p className='dark:text-text-secondary text-gray-600'>TypeScript, Node.js, NestJS, Python, Kotlin</p>
                  </div>
                  <div>
                    <h4 className='mb-2 font-bold'>Frontend</h4>
                    <p className='dark:text-text-secondary text-gray-600'>React, Astro, Tailwind CSS, GraphQL</p>
                  </div>
                  <div>
                    <h4 className='mb-2 font-bold'>Data</h4>
                    <p className='dark:text-text-secondary text-gray-600'>PostgreSQL, DynamoDB, Redis, Elasticsearch</p>
                  </div>
                </div>
              </div>

              <div className='hover-lift dark:bg-sand bg-white p-8'>
                <h3 className='mb-6 text-2xl font-bold'>Cloud & Infrastructure</h3>
                <div className='space-y-4'>
                  <div>
                    <h4 className='mb-2 font-bold'>AWS Services</h4>
                    <p className='dark:text-text-secondary text-gray-600'>Lambda, Step Functions, S3, CloudFront, EC2, RDS, DynamoDB, SQS/SNS</p>
                  </div>
                  <div>
                    <h4 className='mb-2 font-bold'>DevOps</h4>
                    <p className='dark:text-text-secondary text-gray-600'>Docker, CDK, Terraform, GitHub Actions, CI/CD pipelines</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-8'>
              <div className='hover-lift dark:bg-sand bg-white p-8'>
                <h3 className='mb-6 text-2xl font-bold'>Media & Broadcast</h3>
                <div className='space-y-4'>
                  <div>
                    <h4 className='mb-2 font-bold'>Streaming</h4>
                    <p className='dark:text-text-secondary text-gray-600'>OBS, FFMPEG, HLS/M3U, YouTube Live API, RTMP</p>
                  </div>
                  <div>
                    <h4 className='mb-2 font-bold'>Real-Time</h4>
                    <p className='dark:text-text-secondary text-gray-600'>Server-Sent Events (SSE), WebSockets, Event-Driven Architecture</p>
                  </div>
                  <div>
                    <h4 className='mb-2 font-bold'>Audio/Video</h4>
                    <p className='dark:text-text-secondary text-gray-600'>Jitsi, Scarlett audio interfaces, browser-based rendering</p>
                  </div>
                </div>
              </div>

              <div className='hover-lift dark:bg-sand bg-white p-8'>
                <h3 className='mb-6 text-2xl font-bold'>Beyond Engineering</h3>
                <div className='space-y-4'>
                  <div>
                    <h4 className='mb-2 font-bold'>Photojournalism</h4>
                    <p className='dark:text-text-secondary text-gray-600'>Event coverage and documentary reporting</p>
                    <a
                      href='https://photos.gaulatti.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-accent-blue mt-1 inline-block text-sm hover:underline'
                    >
                      View on Photos &rarr;
                    </a>
                  </div>
                  <div>
                    <h4 className='mb-2 font-bold'>Music</h4>
                    <p className='dark:text-text-secondary text-gray-600'>Original compositions and orchestral arrangements</p>
                    <a
                      href='https://music.gaulatti.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-accent-blue mt-1 inline-block text-sm hover:underline'
                    >
                      Listen →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='mb-8 text-xl'>Interested in discussing architecture or collaboration?</p>
            <Link
              to='/contact'
              className='light:bg-black dark:bg-white light:text-white dark:text-black hover:bg-sea dark:hover:bg-accent-blue dark:hover:text-white inline-block px-8 py-3 font-medium transition-colors'
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
