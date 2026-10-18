import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router';
import { publishedProject, projectsByIds, projectPath } from '~/data/public-projects';
import { pageMeta } from '~/data/seo';
import type { Route } from './+types/project';

export function loader({ params }: Route.LoaderArgs) {
  const project = publishedProject(params.projectId);
  if (!project?.story) throw new Response('Project not found', { status: 404 });
  return { project, related: projectsByIds(project.story.related) };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [{ title: 'Project not found — Javier Godoy' }, { name: 'robots', content: 'noindex' }];
  return pageMeta(
    data.project.name + ' — ' + data.project.subtitle + ' | Javier Godoy',
    data.project.summary,
    projectPath(data.project),
    '/og/projects/' + data.project.id + '.png'
  );
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const { project, related } = loaderData;
  const story = project.story!;
  const study = story.study;
  const decisionNumber = study.workflow ? '04' : '03';
  const evidenceNumber = study.workflow ? '05' : '04';
  const scopeNumber = study.workflow ? '06' : '05';
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  async function copyLink() {
    try {
      await navigator.clipboard.writeText('https://gaulatti.com' + projectPath(project));
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }
  return (
    <article className='consumer-main project-page'>
      <div className='container'>
        <Link to='/portfolio' className='project-back quiet-link'>
          <ArrowLeft size={16} aria-hidden='true' /> All projects
        </Link>
        <header className='project-intro'>
          <div>
            <p className='editorial-kicker'>{project.subtitle}</p>
            <h1>{project.name}</h1>
            <p className='secondary-copy project-lead'>{project.summary}</p>
            <p className='secondary-copy mt-4'>{story.ownership}</p>
          </div>
          <div className='project-intro-meta'>
            <p className='editorial-kicker'>Javier Godoy</p>
            <ul className='project-tags' aria-label='Technologies'>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <button type='button' className='project-share focus-ring' onClick={copyLink}>
              {copyState === 'copied' ? <Check size={16} aria-hidden='true' /> : <LinkIcon size={16} aria-hidden='true' />}
              {copyState === 'copied' ? 'Link copied' : 'Copy project link'}
            </button>
            <span className='secondary-copy project-copy-status' role='status'>
              {copyState === 'failed'
                ? 'Could not copy the link. Copy the address from your browser.'
                : copyState === 'copied'
                  ? 'The project link is ready to share.'
                  : ''}
            </span>
          </div>
        </header>
        <div className='project-body'>
          <aside className='project-contents' aria-label='On this page'>
            <p className='editorial-kicker'>The project</p>
            <a href='#context'>Context</a>
            <a href='#contribution'>Implementation</a>
            {study.workflow && <a href='#architecture'>Architecture and workflow</a>}
            <a href='#decisions'>Engineering decisions</a>
            <a href='#evidence'>Evidence and outcomes</a>
            <a href='#status'>Where it stands</a>
          </aside>
          <div className='project-story'>
            <section id='context'>
              <p className='editorial-kicker'>01 / Context</p>
              <h2>The problem behind the project</h2>
              <p className='secondary-copy'>{story.problem}</p>
              {study.context.map((paragraph) => (
                <p className='secondary-copy mt-5' key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
            <section id='contribution'>
              <p className='editorial-kicker'>02 / Implementation</p>
              <h2>Design and implementation</h2>
              <p className='secondary-copy'>{story.contribution}</p>
              {study.implementation.map((paragraph) => (
                <p className='secondary-copy mt-5' key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
            {study.workflow && (
              <section id='architecture'>
                <p className='editorial-kicker'>03 / Architecture</p>
                <h2>{study.workflow.title}</h2>
                <ol className='project-decisions m-0 list-none p-0'>
                  {study.workflow.steps.map((step, index) => (
                    <li className='project-decision' key={step.title}>
                      <span aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p className='secondary-copy'>{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <section id='decisions'>
              <p className='editorial-kicker'>{decisionNumber} / Approach</p>
              <h2>Engineering decisions</h2>
              <div className='project-decisions'>
                {story.decisions.map((decision, index) => (
                  <div key={decision.title} className='project-decision'>
                    <span aria-hidden='true'>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{decision.title}</h3>
                      <p className='secondary-copy'>{decision.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section id='evidence'>
              <p className='editorial-kicker'>{evidenceNumber} / Evidence</p>
              <h2>Evidence and outcomes</h2>
              {study.evidence.map((paragraph) => (
                <p className='secondary-copy mt-5' key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {study.references.length > 0 && (
                <>
                  <h3 className='mt-8 text-base font-medium'>Source and technical notes</h3>
                  <div className='project-external-links'>
                    {study.references.map((reference) => (
                      <a key={reference.href} href={reference.href} target='_blank' rel='noopener noreferrer' className='quiet-link'>
                        {reference.label}
                        <ArrowUpRight size={16} aria-hidden='true' />
                      </a>
                    ))}
                  </div>
                </>
              )}
            </section>
            <section id='status' className='project-status'>
              <p className='editorial-kicker'>{scopeNumber} / Current scope</p>
              <h2>Where it stands</h2>
              <p className='secondary-copy'>{story.statusNote}</p>
              {study.limitations.map((paragraph) => (
                <p className='secondary-copy mt-5' key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {project.links.length > 0 && (
                <div className='project-external-links'>
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' className='quiet-link'>
                      {link.label}
                      <ArrowUpRight size={16} aria-hidden='true' />
                    </a>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
        {related.length > 0 && (
          <section className='project-related'>
            <p className='editorial-kicker'>Part of a larger system</p>
            <h2>Related projects</h2>
            <div>
              {related.map((item) => (
                <Link to={projectPath(item)} key={item.id}>
                  <span>
                    <strong>{item.name}</strong>
                    <span className='secondary-copy'>{item.subtitle}</span>
                  </span>
                  <ArrowRight size={20} aria-hidden='true' />
                </Link>
              ))}
            </div>
          </section>
        )}
        <footer className='portfolio-endnote'>
          <p className='secondary-copy'>Interested in the thinking behind the work?</p>
          <Link to='/contact' className='quiet-link'>
            Let’s talk <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </footer>
      </div>
    </article>
  );
}
