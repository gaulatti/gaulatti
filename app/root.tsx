import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import './app.css';

const defaultTitle = 'Javier Godoy — Staff Software Engineer | Media Infrastructure & Real-Time Systems';
const defaultDescription =
  'Staff Software Engineer specializing in media infrastructure, platform engineering, and real-time production systems. Amazon, CNN/Warner Bros. Discovery experience.';

const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID ?? (import.meta.env as Record<string, string | undefined>).PUBLIC_GA_TRACKING_ID ?? '';

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

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500&display=swap'
  }
];

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
      <body className='flex min-h-screen flex-col antialiased'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
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
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
