import { Link } from 'react-router';
import { experience } from '~/data/resume';

const highlights = [
  { company: 'Medsender', description: 'Building AI infrastructure and developer tooling, including an LLM Gateway, MCP services, engineering automation, and deployment safeguards.' },
  { company: 'CNN / Warner Bros. Discovery', description: 'Staff engineering across developer platforms, design systems, performance, and automation. Built tools that reduced repeated implementation work across teams.' },
  { company: 'Amazon', description: 'Led Amazon Explore’s defect-reduction program, reducing catastrophic session failures from 40% to 1.3% over six months.' }
].map((highlight) => {
  const role = experience.find((item) => item.company === highlight.company);
  if (!role) throw new Error('Missing homepage experience: ' + highlight.company);
  return { ...highlight, role };
});

export function Experience() {
  return (
    <section className='home-section quiet-section' aria-labelledby='home-experience'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <h2 id='home-experience' className='home-section-heading'>Engineering experience</h2>
          <div className='home-experience-list'>
            {highlights.map(({ company, description, role }) => (
              <article key={company} className='home-experience-row'>
                <div className='home-company-mark'><img src={role.logo} alt='' loading='lazy' /></div>
                <div>
                  <h3 className='mb-2 text-xl font-medium tracking-refined'>{company === 'CNN / Warner Bros. Discovery' ? 'CNN' : company}</h3>
                  <p className='secondary-copy'>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <Link to='/journey' className='quiet-link mt-8 inline-block'>View full résumé →</Link>
        </div>
      </div>
    </section>
  );
}
