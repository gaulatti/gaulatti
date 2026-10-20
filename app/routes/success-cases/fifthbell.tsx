import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { projectsByIds, projectPath } from '~/data/public-projects';
import { pageMeta } from '~/data/seo';

const areas = [
  {
    title: 'Field photography',
    description: 'Getting an image from a camera into an editorial workflow, with a clear record of acceptance and delivery.',
    ids: ['colombo', 'manzoni']
  },
  {
    title: 'Language and editorial intelligence',
    description: 'Reusable language processing, article-to-audio workflows, and an editor’s view of developing stories.',
    ids: ['mistify', 'monitor', 'guggiana']
  },
  {
    title: 'Publishing and visual authoring',
    description: 'Preparing editorial content and reusable visual pieces for delivery.',
    ids: ['cronkite', 'broadway']
  },
  {
    title: 'Broadcast, radio, and displays',
    description: 'Production control, rendering, delivery, audio playout, and native clients for newsroom screens.',
    ids: ['alcantara', 'alana', 'croccante', 'palazzo', 'celesti', 'atlantide']
  }
];

export function meta() {
  return pageMeta(
    'fifthbell — Media Systems | Javier Godoy',
    'The engineering projects behind photography, newsroom workflows, publishing, and live production. Built by Javier Godoy.',
    '/success-cases/fifthbell'
  );
}

export default function Fifthbell() {
  return (
    <div className='consumer-main project-page'>
      <div className='container'>
        <Link className='project-back quiet-link' to='/success-cases'>
          ← Case studies
        </Link>
        <header className='page-intro'>
          <p className='editorial-kicker'>Independent media engineering</p>
          <h1 className='mt-4 mb-6'>fifthbell Media Systems</h1>
          <p className='secondary-copy project-lead'>
            I build software alongside producing and photographing real events. That operational context shapes the work: durable intake,
            recoverable processing, editorial control, and reliable delivery.
          </p>
          <p className='secondary-copy mt-6 max-w-3xl'>
            These projects cover different parts of that work. Each has its own implementation and current scope, described on its project
            page.
          </p>
        </header>
        {areas.map((area) => (
          <section className='project-related mt-16' key={area.title}>
            <p className='editorial-kicker'>The work</p>
            <h2>{area.title}</h2>
            <p className='secondary-copy mb-6 max-w-3xl'>{area.description}</p>
            <div>
              {projectsByIds(area.ids).map((project) => (
                <Link key={project.id} to={projectPath(project)}>
                  <span>
                    <strong>{project.name}</strong>
                    <span className='secondary-copy'>{project.summary}</span>
                  </span>
                  <ArrowRight size={20} aria-hidden='true' />
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section className='project-status mt-16'>
          <p className='editorial-kicker'>The operational context</p>
          <h2 className='mt-3 mb-4 text-2xl font-medium'>Sanremo Festival coverage</h2>
          <p className='secondary-copy max-w-3xl'>
            The Sanremo case study covers the production work: coordinating contributors, responding to a failed broadcast dependency, and
            rebuilding the operating setup while coverage was under way.
          </p>
          <Link className='quiet-link mt-6 inline-flex items-center gap-2' to='/success-cases/sanremo'>
            Read the production case study <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </section>
        <footer className='portfolio-endnote'>
          <p className='secondary-copy'>There is more to the portfolio than media systems.</p>
          <Link className='quiet-link' to='/portfolio'>
            All project stories <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </footer>
      </div>
    </div>
  );
}
