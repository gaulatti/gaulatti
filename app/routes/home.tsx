import { HeroCarousel, type HeroCarouselItem } from '@gaulatti/bleecker';
import { Link } from 'react-router';
import type { Route } from './+types/home';
import { Architecture } from '~/components/home/Architecture';
import { Experience } from '~/components/home/Experience';
import { FeaturedOperation } from '~/components/home/FeaturedOperation';
import { Hero } from '~/components/home/Hero';
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
  const heroCarouselItems: HeroCarouselItem[] = featuredItems.map((item) => ({
    id: `${item.type}:${item.title}`,
    kind: item.type,
    title: item.title,
    description: item.description,
    imageUrl: item.image,
    href: item.link,
    external: item.link.startsWith('http'),
    tags: item.tags
  }));

  return (
    <div className='flex flex-col'>
      <HeroCarousel
        items={heroCarouselItems}
        renderLink={({ ariaLabel, children, className, item }) =>
          item.external ? (
            <a href={item.href} aria-label={ariaLabel} className={className} target='_blank' rel='noopener noreferrer'>
              {children}
            </a>
          ) : (
            <Link to={item.href} aria-label={ariaLabel} className={className}>
              {children}
            </Link>
          )
        }
      />
      <Hero />
      <Experience />
      <FeaturedOperation />
      <Architecture />
    </div>
  );
}
