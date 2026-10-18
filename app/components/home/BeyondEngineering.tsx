import { Link } from 'react-router';

export function BeyondEngineering() {
  return (
    <>
      <section className='home-section quiet-section' aria-labelledby='home-beyond'>
        <div className='container'>
          <div className='mx-auto max-w-4xl'>
            <h2 id='home-beyond' className='home-section-heading'>Beyond engineering</h2>
            <p className='secondary-copy mb-6 max-w-2xl text-lg'>I photograph live events and documentary stories, and write music and orchestral arrangements.</p>
            <div className='flex flex-wrap gap-6'>
              <a href='https://photos.gaulatti.com' className='quiet-link' target='_blank' rel='noopener noreferrer'>Photography →</a>
              <a href='https://music.gaulatti.com' className='quiet-link' target='_blank' rel='noopener noreferrer'>Music →</a>
            </div>
          </div>
        </div>
      </section>
      <section className='home-section' aria-labelledby='home-contact'>
        <div className='container text-center'>
          <h2 id='home-contact' className='home-section-heading'>Get in touch</h2>
          <p className='secondary-copy mb-7 text-lg'>For engineering opportunities, technical conversations, or collaboration.</p>
          <Link to='/contact' className='home-primary-link focus-ring inline-block'>Contact me</Link>
        </div>
      </section>
    </>
  );
}
