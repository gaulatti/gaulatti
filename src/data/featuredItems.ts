interface HeroItem {
  type: 'post' | 'project';
  title: string;
  description: string;
  image?: string;
  link: string;
  tags?: string[];
}

/**
 * Featured items for the hero section.
 */
export const featuredItems: HeroItem[] = [
  {
    type: 'project',
    title: 'Autostrada',
    description:
      'Frontend observability, reimagined. Track performance, SEO, accessibility, and even aesthetics in real time — all from one modular, extensible platform.',
    image: '/hero/autostrada.avif',
    link: '/portfolio',
    tags: ['Observability', 'Lighthouse', 'Performance'],
  },
  {
    type: 'post',
    title: 'Engineering in Software Catastrophes',
    description:
      'The perfect storm in software engineering isn’t as rare as we think. Here’s what I’ve learned from building through failures — and why they teach better than success.',
    image: '/hero/catastrophes.avif',
    link: 'https://medium.com/http418/engineering-in-software-catastrophes-8cd08266059c',
    tags: ['Engineering', 'Resilience', 'Culture'],
  },
  {
    type: 'project',
    title: 'Wiphala',
    description:
      'A plugin-based workflow orchestrator built for flexibility and speed. Coordinates tasks across services, runtimes, and clouds — no lock-in, no drag.',
    image: '/hero/wiphala.avif',
    link: '/portfolio',
    tags: ['Workflow', 'Orchestration', 'gRPC'],
  },
  {
    type: 'post',
    title: 'Learn to Design Again',
    description: 'Before we test features, we should be testing ideas. This post explores how design can be a mindset — not just a deliverable.',
    image: '/hero/design.avif',
    link: 'https://medium.com/http418/learn-to-design-again-da667eb822bf',
    tags: ['Design', 'Process', 'Reflection'],
  },
];
