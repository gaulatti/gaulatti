import type { Route } from './+types/home';
import { BeyondEngineering } from '~/components/home/BeyondEngineering';
import { Experience } from '~/components/home/Experience';
import { FeaturedOperation } from '~/components/home/FeaturedOperation';
import { Hero } from '~/components/home/Hero';
import { SelectedProjects } from '~/components/home/SelectedProjects';
import { Writing } from '~/components/home/Writing';

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: 'Javier Godoy — Staff Software Engineer | AI Infrastructure & Platforms'
    },
    {
      name: 'description',
      content:
        'Staff Software Engineer building AI infrastructure, developer platforms, and production systems. Medsender, Narmi, CNN, and Amazon.'
    }
  ];
}

export default function Home() {
  return (
    <div className='home-page flex flex-col'>
      <Hero />
      <SelectedProjects />
      <Experience />
      <FeaturedOperation />
      <Writing />
      <BeyondEngineering />
    </div>
  );
}
