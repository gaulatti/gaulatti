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
    type: 'post',
    title: 'From Problem to Product: How Nazca turned into Live Streaming for Real-Time Earthquake Monitoring.',
    description:
      "Typically, technological products arise from an existing need. Ideas don't appear spontaneously; they don't emerge from nothing.",
    image: '/hero/nazca.avif',
    link: 'https://blog.gaulatti.com/from-problem-to-product-how-nazca-turned-live-streaming-into-real-time-earthquake-monitoring-722428121737',
    tags: ['Streaming', 'Innovation', 'Monitoring', 'Automation'],
  },
  {
    type: 'post',
    title: 'Nobody can agree on how to estimate story points, so here’s my approach.',
    description:
      "Struggling with story points? Here's a fresh, grounded approach to estimation that embraces complexity, team dynamics, and practical planning strategies.",
    image: '/hero/points.avif',
    link: 'https://medium.com/http418/nobody-can-agree-on-how-to-estimate-story-points-so-heres-my-approach-e2f499324103',
    tags: ['Agile', 'Planning', 'Estimation'],
  },
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
    type: 'post',
    title: 'Learn to Design Again',
    description: 'Before we test features, we should be testing ideas. This post explores how design can be a mindset — not just a deliverable.',
    image: '/hero/design.avif',
    link: 'https://medium.com/http418/learn-to-design-again-da667eb822bf',
    tags: ['Design', 'Process', 'Reflection'],
  },
];
