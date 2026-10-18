import { featuredItems } from '~/data/featuredItems';

const articles = featuredItems.filter((item) => item.type === 'post' && [
  'Colombo: How to get a photo from the ground to the newsroom in 15 seconds',
  'Engineering in Software Catastrophes',
  'Learn to Design Again'
].includes(item.title));

export function Writing() {
  return (
    <section className='home-section' aria-labelledby='home-writing'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <h2 id='home-writing' className='home-section-heading'>Writing</h2>
          <p className='secondary-copy mb-8 max-w-2xl text-lg'>Notes from building software, running productions, and working through the problems between them.</p>
          <div className='home-writing-list'>
            {articles.map((article) => (
              <a key={article.link} href={article.link} className='home-writing-link' target='_blank' rel='noopener noreferrer'>
                <img src={article.image} alt='' loading='lazy' />
                <h3 className='text-lg font-medium tracking-refined'>{article.title}</h3>
                <span aria-hidden='true'>↗</span>
              </a>
            ))}
          </div>
          <a href='https://blog.gaulatti.com' className='quiet-link mt-8 inline-block' target='_blank' rel='noopener noreferrer'>Read the blog →</a>
        </div>
      </div>
    </section>
  );
}
