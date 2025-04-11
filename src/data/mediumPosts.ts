export interface MediumPost {
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
  link: string;
  readingTime: string;
}

export const mediumPosts: MediumPost[] = [
  {
    title: 'Engineering in Software Catastrophes',
    description:
      'Since a while ago, I\'ve been thinking about those scenarios where everything that can go wrong *actually does* go wrong. The so-feared "perfect storm" in software projects is more common than we think, often leading to unexpected outcomes.',
    pubDate: '2019-05-12',
    tags: ['Software Development', 'Failure Stories', 'Software Design', 'Quality Assurance'],
    link: 'https://medium.com/http418/engineering-in-software-catastrophes-8cd08266059c',
    readingTime: '6 min read',
  },
  {
    title: 'Learn to design again',
    description:
      'In order to test software without waiting until the very end of a development cycle, we need to focus on continuous delivery instead of relying on manual testing. In other words, adopt an iterative mindset early in the process to avoid accumulating technical debt.',
    pubDate: '2017-09-25',
    tags: ['Agile', 'Design Process', 'Software Development', 'Best Practices'],
    link: 'https://medium.com/http418/learn-to-design-again-da667eb822bf',
    readingTime: '5 min read',
  },
  {
    title: 'Be Agile… in a right way',
    description:
      'Many teams implement a hybrid form of "Agile" – following some principles but ignoring others. If you run sprints, use a wall of sticky notes, and aim to deliver software continuously without a big crunch at the end, make sure you\'re actually doing Agile the right way.',
    pubDate: '2017-09-19',
    tags: ['Agile', 'Scrum', 'Software Development', 'Best Practices'],
    link: 'https://medium.com/http418/be-agile-in-a-right-way-276d0621310f',
    readingTime: '4 min read',
  },
  {
    title: 'Staging, Testing, Devo. Forget it.',
    description:
      "In the last 7 years I've seen many companies try to devise ways to test their software. Many approaches are terrible (or only slightly less terrible), and almost all follow the flawed practice of waiting until the end of the development cycle to start testing.",
    pubDate: '2017-09-18',
    tags: ['Software Development', 'Quality Assurance', 'Best Practices', 'Agile', 'Sleep Disorders'],
    link: 'https://medium.com/http418/staging-testing-devo-forget-it-4b51d3368484',
    readingTime: '4 min read',
  },
  {
    title: 'QA is not part of our line. Is part of our lives.',
    description:
      'What I mean is simple: why are we always waiting to finish entire projects before testing their components, when we have the power to create, test, and release incrementally? This mentality is a project management failure that we **can** change.',
    pubDate: '2017-09-03',
    tags: ['Software Development', 'Best Practices', 'Quality Assurance', 'Status Quo', 'Product Management'],
    link: 'https://medium.com/http418/qa-is-not-part-of-our-line-is-part-of-our-lives-979df1112416',
    readingTime: '4 min read',
  },
];
