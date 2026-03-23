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

type IconProps = {
  className?: string;
};

function MediumIcon({ className }: IconProps) {
  return (
    <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden fill='currentColor'>
      <path d='M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z' />
    </svg>
  );
}

function FlickrIcon({ className }: IconProps) {
  return (
    <svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden>
      <circle cx='5.334' cy='12' r='5.334' fill='#FF0084' />
      <circle cx='18.666' cy='12' r='5.334' fill='#0063DC' />
    </svg>
  );
}

function MusescoreIcon({ className }: IconProps) {
  return (
    <svg role='img' viewBox='0 0 127.307 105.773' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden fill='currentColor'>
      <path d='m 0,41.833 0,62.604 2.436,0 0,-35.44 c 0,-3.494 0.446,-6.821 1.34,-9.989 0.974,-3.166 2.313,-5.929 4.018,-8.282 1.787,-2.437 3.938,-4.344 6.457,-5.726 2.516,-1.462 5.317,-2.192 8.404,-2.192 3.49,0 6.334,0.568 8.525,1.706 2.194,1.135 3.898,2.68 5.118,4.627 1.216,1.95 2.028,4.222 2.434,6.821 0.489,2.599 0.732,5.359 0.732,8.284 l 0,40.191 2.435,0 0,-39.703 c 0,-2.924 0.447,-5.686 1.34,-8.283 0.893,-2.678 2.193,-5.035 3.897,-7.064 1.706,-2.029 3.776,-3.613 6.213,-4.75 2.435,-1.218 5.155,-1.827 8.161,-1.827 3.41,0 6.211,0.486 8.403,1.462 2.274,0.974 4.06,2.355 5.359,4.141 1.38,1.786 2.314,3.938 2.803,6.454 0.566,2.519 0.85,5.319 0.85,8.404 l 0.082,23.017 c 0.02,0 2.384,-0.066 2.384,-0.066 l -0.029,-22.95 c 0,-3.41 -0.326,-6.495 -0.974,-9.255 -0.65,-2.844 -1.747,-5.237 -3.29,-7.188 -1.542,-2.028 -3.572,-3.613 -6.09,-4.75 -2.517,-1.137 -5.683,-1.704 -9.499,-1.704 -4.874,0 -9.096,1.338 -12.668,4.019 -3.572,2.68 -5.968,6.213 -7.187,10.597 l -0.243,0 c -1.057,-4.627 -3.247,-8.243 -6.578,-10.841 -3.247,-2.68 -7.307,-3.938 -12.179,-3.774 -2.437,0 -4.75,0.445 -6.943,1.338 -2.111,0.813 -4.059,1.99 -5.847,3.533 -1.787,1.543 -3.288,3.329 -4.505,5.36 -1.219,2.029 -2.111,4.261 -2.68,6.697 l -0.244,0 0,-15.463 -2.434,0' />
      <path d='m 126.027,104.434 0,-62.601 -2.437,0 0,35.443 c 0,3.492 -0.486,6.82 -1.46,9.987 -0.973,3.168 -2.437,5.968 -4.385,8.404 -1.867,2.355 -4.223,4.264 -7.065,5.725 -2.842,1.381 -6.13,2.07 -9.865,2.07 -2.68,0 -5.237,-0.364 -7.674,-1.097 -2.354,-0.813 -4.466,-2.029 -6.334,-3.654 -1.786,-1.704 -3.206,-3.815 -4.262,-6.333 -1.056,-2.599 -1.154,-5.811 -1.154,-9.464 l -2.386,0.371 c 0,0.969 0,2.069 0.003,3.003 0.136,2.505 0.325,4.733 1.1,6.821 1.138,2.76 2.681,5.115 4.628,7.064 2.031,1.868 4.386,3.288 7.064,4.262 2.762,0.893 5.765,1.338 9.014,1.338 6.172,0 11.166,-1.581 14.981,-4.748 3.897,-3.165 6.416,-7.185 7.551,-12.059 l 0.243,0 0,15.469 2.415,0' />
      <path d='m 98.747,23.872 c 0,-1.541 1.248,-2.789 2.789,-2.789 1.54,0 2.789,1.248 2.789,2.789 0,1.54 -1.249,2.789 -2.789,2.789 -1.55,0 -2.79,-1.249 -2.79,-2.789' />
      <path d='m 74.199,25.182 2.324,0 c 0,-15.006 12.52,-22.857 24.886,-22.857 6.278,0 12.063,1.999 16.289,5.626 4.766,4.092 7.285,10.05 7.285,17.231 l 2.324,0 c 0,-7.88 -2.799,-14.448 -8.096,-18.995 C 114.564,2.198 108.241,0 101.409,0 87.889,0 74.201,8.649 74.201,25.182 Z' />
    </svg>
  );
}

const headerIconLinks: Array<{ href: string; icon: (props: IconProps) => React.ReactNode; label: string }> = [
  { href: 'https://blog.gaulatti.com', label: 'Medium', icon: MediumIcon },
  { href: 'https://music.gaulatti.com', label: 'Music', icon: MusescoreIcon },
  { href: 'https://www.flickr.com/photos/gaulatti/', label: 'Flickr', icon: FlickrIcon }
];

function HeaderActions({ mobile = false }: { mobile?: boolean }) {
  const wrapperClassName = mobile ? 'flex w-full items-center gap-3' : 'flex items-center gap-2';
  const iconButtonClassName = mobile
    ? 'light:hover:text-sea dark:hover:text-accent-blue light:hover:bg-sand/50 dark:hover:bg-dark-sand/50 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-400'
    : 'light:hover:text-sea dark:hover:text-accent-blue light:hover:bg-sand/50 dark:hover:bg-dark-sand/50 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-400';
  const iconClassName = mobile ? 'h-5 w-5' : 'h-4 w-4';

  return (
    <div className={wrapperClassName}>
      {headerIconLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a key={link.label} href={link.href} target='_blank' rel='noopener noreferrer' aria-label={link.label} className={iconButtonClassName}>
            <Icon className={iconClassName} />
            <span className='sr-only'>{link.label}</span>
          </a>
        );
      })}
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
