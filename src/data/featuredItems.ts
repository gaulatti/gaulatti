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
    image: 'https://autostrada.gaulatti.com/login.background.png',
    link: '/portfolio',
    tags: ['Observability', 'Lighthouse', 'Performance'],
  },
  {
    type: 'post',
    title: 'Engineering in Software Catastrophes',
    description:
      'The perfect storm in software engineering isn’t as rare as we think. Here’s what I’ve learned from building through failures — and why they teach better than success.',
    image: 'https://cdn-images-1.medium.com/max/2600/1*-tZ9v2w7gSDpH8cjG8T8Wg.jpeg',
    link: 'https://medium.com/http418/engineering-in-software-catastrophes-8cd08266059c',
    tags: ['Engineering', 'Resilience', 'Culture'],
  },
  {
    type: 'project',
    title: 'Wiphala',
    description:
      'A plugin-based workflow orchestrator built for flexibility and speed. Coordinates tasks across services, runtimes, and clouds — no lock-in, no drag.',
    image: 'https://wiphala.gaulatti.com/login.background.png',
    link: '/portfolio',
    tags: ['Workflow', 'Orchestration', 'gRPC'],
  },
  {
    type: 'post',
    title: 'Learn to Design Again',
    description: 'Before we test features, we should be testing ideas. This post explores how design can be a mindset — not just a deliverable.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ilFzZHCuacbWiuXpKItc7w.jpeg',
    link: 'https://medium.com/http418/learn-to-design-again-da667eb822bf',
    tags: ['Design', 'Process', 'Reflection'],
  },
];
