import { BauhausBackground } from '@gaulatti/bleecker/components/bauhaus-background';
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
        <div className='mx-auto max-w-4xl'>
          <header>
            <h1 className='mb-8 text-4xl font-semibold leading-[1.08] tracking-refined md:text-5xl'>Projects</h1>
            <p className='font-secondary text-text-secondary mb-12 max-w-2xl text-xl'>
              Independent software projects I design and build with my own resources, from AI infrastructure to developer tools and media systems.
            </p>
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
            categories.map((group) => {
              const projects = shown.filter((project) => project.surface === group.id);
              if (projects.length === 0) return null;
              return (
                <section className='mb-24' key={group.id} aria-labelledby={'group-' + group.id}>
                  <h2 id={'group-' + group.id} className='mb-12 text-2xl font-semibold tracking-refined md:text-3xl'>
                    {group.label}
                  </h2>
                  <div className='grid gap-12'>
                    {projects.map((project) => (
                      <article key={project.id} className='group'>
                        <div className='grid items-center gap-8 md:grid-cols-2'>
                          <div className='order-2 md:order-1'>
                            <Link to={projectPath(project)} className='group/title block'>
                              <h3 className='group-hover/title:text-accent-blue mb-4 text-xl font-medium tracking-refined transition-colors md:text-2xl'>
                                {project.name}
                              </h3>
                            </Link>
                            <p className='font-secondary text-text-secondary mb-4'>{project.summary}</p>
                            <ul className='mb-4 flex flex-wrap gap-2' aria-label='Technologies'>
                              {project.tags.map((tag) => (
                                <li key={tag} className='bg-light-sand/55 rounded-sm px-2 py-1 text-sm dark:bg-white/[0.05]'>
                                  {tag}
                                </li>
                              ))}
                            </ul>
                            <div className='flex flex-wrap gap-4'>
                              <Link to={projectPath(project)} className='quiet-link inline-flex items-center gap-2 text-sm'>
                                Read the project <ArrowRight size={16} aria-hidden='true' />
                                <span className='sr-only'>: {project.name}</span>
                              </Link>
                              {project.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='font-secondary text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors'
                                >
                                  {link.kind === 'repository' ? (
                                    <img src='/icons/github.svg' alt='' className='h-4 w-4 dark:invert' />
                                  ) : (
                                    <ArrowUpRight size={16} aria-hidden='true' />
                                  )}
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          </div>
                          <Link
                            to={projectPath(project)}
                            className='portfolio-project-art order-1 block md:order-2'
                            aria-label={'Explore ' + project.name}
                          >
                            <div className='bg-light-sand/55 hover-lift aspect-video overflow-hidden rounded-sm dark:bg-white/[0.05]'>
                              <BauhausBackground type={project.art.type} imageUrl={project.art.imageUrl} />
                            </div>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })
          )}
          <div className='mt-8 text-center'>
            <p className='mb-8 text-xl'>Interested in collaborating on a project?</p>
            <Link to='/contact' className='light:bg-black dark:bg-accent-blue focus-accent hover-lift inline-block px-8 py-3 font-medium text-white'>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
