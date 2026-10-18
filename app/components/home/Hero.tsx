import { Link } from 'react-router';

export function Hero() {
  return (
    <section className='home-intro relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-sand/10 via-transparent to-transparent opacity-20' />
      <div className='container relative'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='font-display mb-6 text-6xl leading-tight font-medium tracking-tight md:text-7xl'>Javier Godoy</h1>
          <p className='font-display tracking-refined mb-2 text-2xl font-normal text-sea md:text-3xl'>Staff Software Engineer</p>
          <p className='text-text-secondary mb-6 text-sm font-light tracking-widest uppercase'>New York, NY</p>
          <p className='home-lead mx-auto mb-5 max-w-2xl text-xl leading-relaxed md:text-2xl'>
            I build AI infrastructure, developer platforms, and software that runs live operations.
          </p>
          <p className='secondary-copy mx-auto mb-8 max-w-2xl text-lg'>
            Currently at Medsender. Previously at Amazon, CNN, and Narmi. Outside work, I build and operate my own software for newsrooms, broadcasting, and photography.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link to='/portfolio' className='home-primary-link focus-ring'>Explore projects</Link>
            <Link to='/journey' className='home-secondary-link focus-ring'>View résumé</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
