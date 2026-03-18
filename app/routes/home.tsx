import type { Route } from './+types/home';
import { Architecture } from '~/components/home/Architecture';
import { Experience } from '~/components/home/Experience';
import { FeaturedOperation } from '~/components/home/FeaturedOperation';
import { Hero } from '~/components/home/Hero';
import { HeroSection } from '~/components/home/HeroSection';
import { featuredItems } from '~/data/featuredItems';

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: 'Javier Godoy — Staff Software Engineer | Media Infrastructure & Real-Time Systems'
    },
    {
      name: 'description',
      content:
        'Staff Software Engineer specializing in media infrastructure, platform engineering, and real-time production systems. Amazon, CNN/Warner Bros. Discovery experience.'
    }
  ];
}

export default function Home() {
  return (
    <div className='flex flex-col'>
      <HeroSection items={featuredItems} />
      <Hero />
      <Experience />
      <FeaturedOperation />
      <Architecture />
    </div>
  );
}
