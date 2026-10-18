import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router';
import { publishedProjects, projectPath, type ProjectSurface } from '~/data/public-projects';
import { pageMeta } from '~/data/seo';
import type { Route } from './+types/portfolio';

export const categories: Array<{ id: ProjectSurface; label: string }> = [
  { id: 'ai-platforms', label: 'AI & platforms' },
  { id: 'design-systems', label: 'Design systems' },
  { id: 'media-infrastructure', label: 'Media & broadcast' },
  { id: 'personal', label: 'Applications & tools' },
  { id: 'earlier-work', label: 'Earlier work' }
];
const catalog = publishedProjects();

export function meta({}: Route.MetaArgs) {
  return pageMeta(
    'Projects — Javier Godoy',
    'AI services, developer platforms, native design systems, and media infrastructure. Project stories, engineering decisions, and public source.',
    '/portfolio'
  );
}

export default function Portfolio() {
  const [category, setCategory] = useState<ProjectSurface | 'all'>('all');
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const shown = catalog.filter(
    (project) =>
      (category === 'all' || project.surface === category) &&
      [project.name, project.subtitle, project.summary, ...project.tags].join(' ').toLocaleLowerCase().includes(normalizedQuery)
  );
  return (
    <div className='consumer-main portfolio-page'>
      <div className='container'>
        <header className='portfolio-intro'>
          <div>
            <p className='editorial-kicker'>Independent engineering</p>
            <h1>Projects</h1>
            <p className='secondary-copy portfolio-lead'>
              AI infrastructure, developer tools, and software for newsrooms and live production. A closer look at what I build and the
              decisions behind it.
            </p>
          </div>
          <div className='portfolio-intro-note'>
            <span className='portfolio-count'>{catalog.length}</span>
            <p className='secondary-copy'>
              project stories
              <br />
              from current work to earlier experiments
            </p>
          </div>
        </header>
        <div className='portfolio-tools'>
          <fieldset className='portfolio-filters'>
            <legend className='sr-only'>Project category</legend>
            {[{ id: 'all' as const, label: 'All projects' }, ...categories].map((item) => (
              <button
                key={item.id}
                type='button'
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
                className='portfolio-filter focus-ring'
              >
                {item.label}
              </button>
            ))}
          </fieldset>
          <label className='portfolio-search'>
            <Search size={17} aria-hidden='true' />
            <span className='sr-only'>Search projects</span>
            <input type='search' value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Name, technology, or idea' />
          </label>
        </div>
        <p className='portfolio-result-count secondary-copy' role='status'>
          {shown.length} {shown.length === 1 ? 'project' : 'projects'}
          {query ? ' matching “' + query + '”' : ''}
        </p>
        {shown.length === 0 ? (
          <div className='portfolio-empty'>
            <h2>No matching projects</h2>
            <p className='secondary-copy'>Try another name, technology, or category.</p>
            <button
              type='button'
              className='quiet-link'
              onClick={() => {
                setCategory('all');
                setQuery('');
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className='portfolio-grid'>
            {shown.map((project, index) => (
              <article className='project-card' key={project.id}>
                <div className='project-card-heading'>
                  <p className='editorial-kicker'>{categories.find((item) => item.id === project.surface)?.label}</p>
                  <span className='project-card-number' aria-hidden='true'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className='project-card-main'>
                  <p className='project-card-subtitle'>{project.subtitle}</p>
                  <h2>
                    <Link to={projectPath(project)}>
                      {project.name}
                      <ArrowUpRight size={25} aria-hidden='true' />
                    </Link>
                  </h2>
                  <p className='secondary-copy'>{project.summary}</p>
                </div>
                <div className='project-card-bottom'>
                  <ul className='project-tags' aria-label='Technologies'>
                    {project.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <Link to={projectPath(project)} className='project-read-link'>
                    Read the project <ArrowRight size={16} aria-hidden='true' />
                    <span className='sr-only'>: {project.name}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
        <footer className='portfolio-endnote'>
          <p className='secondary-copy'>Explore the work behind my résumé.</p>
          <Link to='/journey' className='quiet-link'>
            See my experience <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </footer>
      </div>
    </div>
  );
}
