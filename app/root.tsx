import { AppShell, Footer as BleeckerFooter, Header as BleeckerHeader, type NavItem, type RenderLinkProps } from '@gaulatti/bleecker';
import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import './app.css';

const defaultTitle = 'Javier Godoy — Staff Software Engineer | Media Infrastructure & Real-Time Systems';
const defaultDescription =
  'Staff Software Engineer specializing in media infrastructure, platform engineering, and real-time production systems. Amazon, CNN/Warner Bros. Discovery experience.';

const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID ?? (import.meta.env as Record<string, string | undefined>).PUBLIC_GA_TRACKING_ID ?? '';

const headerNavigation: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/success-cases', label: 'Case Studies' },
  { href: '/portfolio', label: 'Projects' },
  { href: '/journey', label: 'Resume' }
];

const footerSections: Array<{ title: string; items: NavItem[] }> = [
  {
    title: 'Navigation',
    items: [
      { href: '/', label: 'Home' },
      { href: '/success-cases', label: 'Case Studies' },
      { href: '/portfolio', label: 'Projects' },
      { href: '/journey', label: 'Resume' },
      { href: '/contact', label: 'Contact' }
    ]
  },
  {
    title: 'Connect',
    items: [
      { href: 'https://github.com/gaulatti', label: 'GitHub', external: true },
      { href: 'https://linkedin.com/in/gaulatti', label: 'LinkedIn', external: true },
      { href: 'https://bsky.app/profile/gaulatti.com', label: 'Bluesky', external: true },
      { href: 'https://instagram.com/gaulatti', label: 'Instagram', external: true },
      { href: 'https://blog.gaulatti.com', label: 'Medium', external: true },
      { href: 'https://music.gaulatti.com', label: 'Music', external: true },
      { href: 'https://www.flickr.com/photos/gaulatti/', label: 'Flickr', external: true },
      { href: 'mailto:jack@gaulatti.com', label: 'Email', external: true }
    ]
  }
];

function renderAppLink({ children, className, item, onClick }: RenderLinkProps<NavItem>) {
  if (item.external) {
    return (
      <a href={item.href} className={className} onClick={onClick} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    );
  }

  return (
    <Link to={item.href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function HeaderActions({ mobile = false }: { mobile?: boolean }) {
  const wrapperClassName = mobile ? 'flex flex-col items-start gap-3 w-full' : 'flex items-center gap-2';

  return (
    <div className={wrapperClassName}>
      <a
        href='https://blog.gaulatti.com'
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-full px-3 py-2 text-sm tracking-refined text-text-primary transition-colors duration-400 hover:text-sea dark:text-text-primary dark:hover:text-accent-blue'
      >
        Medium
      </a>
      <a
        href='https://music.gaulatti.com'
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-full px-3 py-2 text-sm tracking-refined text-text-primary transition-colors duration-400 hover:text-sea dark:text-text-primary dark:hover:text-accent-blue'
      >
        Music
      </a>
      <a
        href='https://www.flickr.com/photos/gaulatti/'
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-full px-3 py-2 text-sm tracking-refined text-text-primary transition-colors duration-400 hover:text-sea dark:text-text-primary dark:hover:text-accent-blue'
      >
        Flickr
      </a>
      <Link
        to='/contact'
        className='rounded-full border border-transparent bg-sea px-5 py-2 text-sm tracking-elegant text-white transition-all duration-400 hover:bg-desert dark:bg-accent-blue dark:hover:border-desert/20 dark:hover:bg-desert'
      >
        Contact
      </Link>
    </div>
  );
}

export const meta: Route.MetaFunction = () => [
  { title: defaultTitle },
  { name: 'description', content: defaultDescription },
  { name: 'author', content: 'Gaulatti' },
  {
    name: 'keywords',
    content:
      'Staff Software Engineer, Platform Engineering, Media Infrastructure, Real-Time Systems, AWS, Amazon, CNN, Warner Bros Discovery, Streaming, Broadcast Engineering, Javier Godoy'
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: 'https://gaulatti.com/' },
  { property: 'og:title', content: defaultTitle },
  { property: 'og:description', content: defaultDescription },
  { property: 'og:image', content: 'https://gaulatti.com/og.webp' },
  { property: 'twitter:card', content: 'summary_large_image' },
  { property: 'twitter:url', content: 'https://gaulatti.com/' },
  { property: 'twitter:title', content: defaultTitle },
  { property: 'twitter:description', content: defaultDescription },
  { property: 'twitter:image', content: 'https://gaulatti.com/og.webp' }
];

export const links: Route.LinksFunction = () => [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }];

export function Layout({ children }: { children: React.ReactNode }) {
  const shouldLoadAnalytics = !import.meta.env.DEV && Boolean(gaTrackingId);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        {shouldLoadAnalytics ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaTrackingId}');`
              }}
            />
          </>
        ) : null}
      </head>
      <body className='antialiased'>
        <AppShell
          offsetHeader={false}
          header={
            <BleeckerHeader
              brand={{
                href: '/',
                logoAlt: 'gaulatti',
                logoSrc: '/icons/gaulatti.svg',
                name: 'gaulatti'
              }}
              navigation={headerNavigation}
              actions={<HeaderActions />}
              mobileActions={<HeaderActions mobile />}
              renderLink={renderAppLink}
            />
          }
          footer={
            <BleeckerFooter
              brand={{
                href: '/',
                logoAlt: 'gaulatti',
                logoSrc: '/icons/gaulatti.svg',
                name: 'gaulatti',
                description:
                  'Crafting digital experiences that blend precision with poetry. Where engineering meets artistry, creating spaces for reflection, innovation, and the quiet appreciation of life\'s remarkable moments.'
              }}
              sections={footerSections}
              bottomLeft={`© ${new Date().getFullYear()} Javier Godoy Núñez. All rights reserved.`}
              renderLink={renderAppLink}
            />
          }
          className='antialiased'
        >
          {children}
        </AppShell>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='container mx-auto p-4 pt-16'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre className='w-full overflow-x-auto p-4'>
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
