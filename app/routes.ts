import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('success-cases', 'routes/success-cases.tsx'),
  route('success-cases/fifthbell', 'routes/success-cases/fifthbell.tsx'),
  route('success-cases/sanremo', 'routes/success-cases/sanremo.tsx'),
  route('portfolio', 'routes/portfolio.tsx'),
  route('journey', 'routes/journey.tsx'),
  route('contact', 'routes/contact.tsx')
] satisfies RouteConfig;
