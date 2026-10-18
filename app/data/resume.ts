export interface Experience {
  company: string;
  title: string;
  dates: string;
  location: string;
  logo?: string;
  href?: string;
  focus: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: 'Medsender',
    title: 'Staff Software Engineer',
    dates: 'Jul 2026 – Present',
    location: 'New York, NY',
    logo: '/icons/medsender.svg',
    href: 'https://medsender.com',
    focus: 'AI infrastructure & developer platforms',
    highlights: [
      'Launched a customer-facing LLM Gateway for production AI workflows.',
      'Own the developer portal and build MCP services to connect tools and systems.',
      'Build AI-assisted review and governance tooling, engineering automation, and deployment safeguards.'
    ]
  },
  {
    company: 'Narmi',
    title: 'Software Engineer',
    dates: 'Jun 2025 – Mar 2026',
    location: 'New York, NY',
    logo: '/icons/narmi.svg',
    href: 'https://www.narmi.com',
    focus: 'Account opening & AI-assisted KYC',
    highlights: [
      'Worked on account-opening systems for business and consumer banking.',
      'Designed a Claude-powered pipeline that turned third-party identity-verification summaries into risk scores and actionable next steps.',
      'Mentored a junior engineer to lead tactical execution while guiding the integration strategy and technical direction.'
    ]
  },
  {
    company: 'CNN / Warner Bros. Discovery',
    title: 'Staff Software Engineer',
    dates: 'Jan 2023 – May 2025',
    location: 'New York, NY',
    logo: '/icons/cnn.svg',
    href: 'https://www.cnn.com',
    focus: 'Design systems & site performance',
    highlights: [
      'Delivered CNN’s design system internally with two engineers in seven months, avoiding a planned $3M agency engagement.',
      'Built an automated Figma-to-code pipeline using TypeScript, NestJS, and Style Dictionary, generating component libraries from a shared design contract.',
      'Built a performance-observability platform combining real-user metrics, Lighthouse CI, and PageSpeed Insights.',
      'Drove adoption across Live Story and Politics ahead of the 2024 election and identified livestreaming components as a major performance bottleneck.'
    ]
  },
  {
    company: 'Amazon',
    title: 'Software Development Engineer',
    dates: 'Feb 2017 – Jan 2023',
    location: 'Seattle, WA & New York, NY',
    logo: '/icons/amazon.svg',
    href: 'https://www.amazon.com',
    focus: 'Payments, Alexa Shopping, Explore & advertising',
    highlights: [
      'Owned Amazon Explore’s defect-reduction program, reducing catastrophic session failures from 40% to 1.3% over six months and clearing the executive launch gate.',
      'Built observability using AWS IoT Core and CloudWatch and traced reliability failures across Redux Saga and WebRTC.',
      'Led peak-event readiness across 15 global teams for Alexa Shopping and improved monitoring after uncovering a silent production outage.',
      'Launched EBT and HSA/FSA payment support, including eligibility verification, tax allocation, and multi-tender purchase flows.',
      'Expanded Fire TV self-service advertising into European and Far East markets and consolidated overlapping fulfillment-center safety initiatives.'
    ]
  }
];

export const earlierExperience = [
  {
    company: 'Waggl',
    role: 'Senior Web Developer · Contract',
    dates: 'Sep – Dec 2016',
    detail: 'Ruby on Rails development for its employee feedback platform. Acquired by Perceptyx in 2021.'
  },
  {
    company: 'CyberCenter',
    role: 'Senior Web Developer',
    dates: 'May – Sep 2016',
    detail: 'Web application development in Santiago, Chile.'
  },
  {
    company: 'Capitalizarme',
    role: 'Web Developer',
    dates: 'Mar – May 2016',
    detail: 'Ruby on Rails, PostgreSQL, and cloud infrastructure.'
  },
  {
    company: 'Desert Point Technologies',
    role: 'Lead Web Developer',
    dates: 'Jan – Mar 2016',
    detail: 'Web applications using PHP, Ruby on Rails, and MySQL.'
  },
  {
    company: 'Servicio Electoral de Chile',
    role: 'Lead Web Developer · Contract',
    dates: 'Nov – Dec 2015',
    detail: 'PHP, Laravel, MySQL, Angular, and Sass.'
  },
  {
    company: 'Cumplo',
    role: 'Web Developer',
    dates: 'Aug – Nov 2015',
    detail: 'Web application work across PHP, Ruby, Python, and JavaScript.'
  },
  {
    company: 'Arca Comunicaciones Chile',
    role: 'Lead Web Developer',
    dates: 'Nov 2014 – Jul 2015',
    detail: 'Web development for clients including Bayer Conosur.'
  },
  {
    company: 'LINETS',
    role: 'Senior PHP Developer',
    dates: 'Jan – Oct 2014',
    detail: 'Symfony and Doctrine applications, from requirements through delivery.'
  },
  {
    company: 'Scrum S.A.',
    role: 'IT Manager / .NET Developer / QA Tester',
    dates: 'Oct 2010 – Jun 2013',
    detail: 'Infrastructure operations, application development, and software testing.'
  }
];

export const volunteering = [
  { company: 'ModoItaliano', role: 'Executive Producer', dates: 'Nov 2025 – Present' },
  { company: 'fifthbell', role: 'Photographer', dates: 'Jul 2025 – Present' },
  { company: 'devsChile', role: 'Huemul Developer', dates: '2015 – Present' },
  { company: 'L Train Brass Band', role: 'Tech Committee Director', dates: 'Apr 2024 – Apr 2025' },
  { company: 'Area Sports Network', role: 'Executive Producer', dates: 'Oct 2020 – Nov 2021' },
  { company: 'Pulso Sports', role: 'Executive Producer', dates: 'Sep 2019 – Oct 2020' },
  { company: 'Plataforma Latina Networks', role: 'Founder', dates: 'Aug – Sep 2019' },
  { company: 'PLAZFER.', role: 'Founding Engineer', dates: 'Dec 2016 – Jul 2018' },
  { company: 'Maxis Ltda.', role: 'Founding Engineer', dates: 'Jun – Oct 2013' }
];
