import { BauhausBackground } from '@gaulatti/bleecker/components/bauhaus-background';
import { Link } from 'react-router';
import { publishedProject, projectPath } from '~/data/public-projects';

const selection = [
  { id: 'mistify', description: 'AI processing for editorial workflows: turning text and media into structured results that other systems can use. Built around durable jobs, traceable outputs, and recovery when processing fails.' },
  { id: 'colombo', description: 'Getting photographs from the camera to the newsroom while an event is still happening. A Rust service handles uploads, keeps a durable local queue, and retries delivery when connectivity drops.' },
  { id: 'guggiana', description: 'Translation infrastructure for multilingual publishing. Coordinates work across languages, prevents duplicate processing, and lets applications change translation providers without rebuilding their publishing workflow.' },
  { id: 'alcantara', title: 'A connected broadcast system', description: 'Alcántara controls the production. Alana renders it. Croccante manages stream delivery and filler. Palazzo keeps radio running. I built these as connected services so production controls, rendering, and continuous broadcasting can operate independently.' }
].map((item) => {
  const project = publishedProject(item.id);
  if (!project) throw new Error('Missing approved homepage project: ' + item.id);
  return { ...item, project };
});
const broadcast = ['alcantara', 'alana', 'croccante', 'palazzo'].map((id) => {
  const project = publishedProject(id);
  if (!project) throw new Error('Missing approved broadcast project: ' + id);
  return project;
});

export function SelectedProjects() {
  return (
    <section className='home-section' aria-labelledby='home-projects'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <h2 id='home-projects' className='home-section-heading'>Selected projects</h2>
          <p className='secondary-copy mb-10 max-w-2xl text-lg'>I designed and built these projects independently, using my own resources.</p>
          <div className='home-project-list'>
            {selection.map(({ project, description, ...item }) => (
              <article key={project.id} className='grid items-center gap-6 md:grid-cols-2 md:gap-10'>
                <div className='order-2 md:order-1'>
                  <h3 className='mb-4 text-2xl font-medium tracking-refined'>
                    <Link to={projectPath(project)} className='home-project-title'>{item.title ?? project.name}</Link>
                  </h3>
                  <p className='secondary-copy mb-5'>{description}</p>
                  {project.id === 'alcantara' ? (
                    <div className='flex flex-wrap gap-x-5 gap-y-3' aria-label='Broadcast projects'>
                      {broadcast.map((system) => <Link key={system.id} to={projectPath(system)} className='quiet-link'>{system.name} →</Link>)}
                    </div>
                  ) : (
                    <Link to={projectPath(project)} className='quiet-link'>Explore {project.name} →</Link>
                  )}
                </div>
                <Link to={projectPath(project)} className='portfolio-project-art order-1 block md:order-2' aria-label={'Explore ' + project.name}>
                  <div className='bg-light-sand/55 hover-lift aspect-video overflow-hidden rounded-sm dark:bg-white/[0.05]'>
                    <BauhausBackground type={project.art.type} imageUrl={project.art.imageUrl} />
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <Link to='/portfolio' className='quiet-link mt-10 inline-block'>View all projects →</Link>
        </div>
      </div>
    </section>
  );
}
