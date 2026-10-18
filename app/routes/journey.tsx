import { ArrowRight, ArrowUpRight, Printer } from 'lucide-react';
import { Link } from 'react-router';
import { experience, earlierExperience, volunteering } from '~/data/resume';
import { publishedProject, projectPath } from '~/data/public-projects';
import { pageMeta } from '~/data/seo';
import type { Route } from './+types/journey';

export function meta({}: Route.MetaArgs) {
  return pageMeta(
    'Résumé — Javier Godoy | Staff Software Engineer',
    'Staff Software Engineer building AI infrastructure and developer platforms. Experience at Medsender, Narmi, CNN, and Amazon.',
    '/journey'
  );
}

const selectedProjects = ['mistify', 'colombo', 'guggiana', 'bleecker', 'alcantara'].map((id) => publishedProject(id)!);

export default function Journey() {
  return (
    <div className='consumer-main resume-page'>
      <div className='container'>
        <header className='resume-intro'>
          <div>
            <p className='editorial-kicker'>Experience & background</p>
            <h1>Javier Godoy</h1>
            <p className='resume-title'>Staff Software Engineer</p>
            <p className='secondary-copy resume-summary'>
              I build AI infrastructure, developer platforms, and production systems. My work spans healthcare, fintech, media, and
              e-commerce.
            </p>
          </div>
          <div className='resume-contact'>
            <p>New York, NY</p>
            <a href='mailto:jack@gaulatti.com'>jack@gaulatti.com</a>
            <a href='https://github.com/gaulatti'>
              GitHub <ArrowUpRight size={14} aria-hidden='true' />
            </a>
            <a href='https://www.linkedin.com/in/gaulatti/'>
              LinkedIn <ArrowUpRight size={14} aria-hidden='true' />
            </a>
            <button type='button' onClick={() => window.print()} className='quiet-link resume-print'>
              <Printer size={15} aria-hidden='true' /> Print résumé
            </button>
          </div>
        </header>
        <div className='resume-layout'>
          <aside className='resume-rail'>
            <section>
              <p className='editorial-kicker'>Focus</p>
              <h2>AI & platforms</h2>
              <p className='secondary-copy'>LLM gateways, MCP services, language and media workflows, engineering automation.</p>
              <h2>Production systems</h2>
              <p className='secondary-copy'>Distributed systems, API design, durable processing, observability, developer experience.</p>
              <h2>Implementation</h2>
              <p className='secondary-copy'>Rust, Go, Python, TypeScript, AWS, PostgreSQL, React, and native application platforms.</p>
            </section>
            <section>
              <p className='editorial-kicker'>Selected projects</p>
              {selectedProjects.map((project) => (
                <Link className='resume-project-link' to={projectPath(project)} key={project.id}>
                  <span>
                    <strong>{project.name}</strong>
                    <span className='secondary-copy'>{project.subtitle}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden='true' />
                </Link>
              ))}
              <Link className='quiet-link' to='/portfolio'>
                All project stories <ArrowRight size={15} aria-hidden='true' />
              </Link>
            </section>
            <section>
              <p className='editorial-kicker'>Languages</p>
              <p className='secondary-copy'>
                Spanish · Native
                <br />
                English · Fluent
                <br />
                Italian · Intermediate
              </p>
            </section>
          </aside>
          <div className='resume-main'>
            <section aria-labelledby='experience-title'>
              <p className='editorial-kicker'>Professional experience</p>
              <h2 id='experience-title'>Engineering work</h2>
              <div className='resume-experience'>
                {experience.map((item) => (
                  <article className='resume-role' key={item.company}>
                    <header>
                      <div>
                        <p className='resume-dates'>{item.dates}</p>
                        <h3>{item.company}</h3>
                        <p className='resume-role-title'>{item.title}</p>
                        <p className='secondary-copy resume-location'>{item.location}</p>
                      </div>
                      {item.logo && (
                        <a href={item.href} aria-label={item.company + ' website'} target='_blank' rel='noopener noreferrer'>
                          <img
                            src={item.logo}
                            alt=''
                            className={'resume-company-logo' + (item.company === 'Medsender' ? ' resume-medsender-logo' : '')}
                          />
                        </a>
                      )}
                    </header>
                    <p className='editorial-kicker resume-focus'>{item.focus}</p>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li className='secondary-copy' key={highlight}>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            <section className='resume-section' aria-labelledby='earlier-title'>
              <p className='editorial-kicker'>2010–2016</p>
              <h2 id='earlier-title'>Earlier engineering work</h2>
              <div className='resume-earlier'>
                {earlierExperience.map((item) => (
                  <article key={item.company}>
                    <div>
                      <h3>{item.company}</h3>
                      <p className='secondary-copy'>{item.role}</p>
                    </div>
                    <p className='resume-dates'>{item.dates}</p>
                    <p className='secondary-copy resume-earlier-detail'>{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className='resume-section' aria-labelledby='education-title'>
              <p className='editorial-kicker'>Education & credentials</p>
              <h2 id='education-title'>Learning and qualifications</h2>
              <article className='resume-education'>
                <h3>Western Governors University</h3>
                <p>B.S. Software Engineering</p>
                <p className='secondary-copy'>2019–2026 · All academic requirements completed. Degree conferral pending.</p>
              </article>
              <div className='resume-credentials'>
                <div>
                  <h3>CompTIA Project+</h3>
                  <p className='secondary-copy'>CompTIA · October 2026</p>
                </div>
                <div>
                  <h3>ITIL® 4 Foundation</h3>
                  <p className='secondary-copy'>PeopleCert · October 2026</p>
                </div>
              </div>
            </section>
            <section className='resume-section' aria-labelledby='community-title'>
              <p className='editorial-kicker'>Beyond employment</p>
              <h2 id='community-title'>Volunteering & community</h2>
              <p className='secondary-copy resume-community-intro'>
                Photography, media production, and community engineering alongside my software work.
              </p>
              <div className='resume-volunteering'>
                {volunteering.map((item) => (
                  <article key={item.company}>
                    <h3>{item.company}</h3>
                    <p className='secondary-copy'>{item.role}</p>
                    <p className='resume-dates'>{item.dates}</p>
                  </article>
                ))}
              </div>
              <Link to='/success-cases/sanremo' className='quiet-link'>
                Sanremo production case study <ArrowRight size={16} aria-hidden='true' />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
