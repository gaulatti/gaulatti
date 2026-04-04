import type { ComponentType } from 'react';
import { Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Route } from './+types/contact';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

type IconProps = {
  className?: string;
};

function MediumIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden fill='currentColor'>
      <path d='M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z' />
    </svg>
  );
}

function FlickrIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden fill='currentColor'>
      <path d='M5.334 6.666C2.3884 6.666 0 9.055 0 12c0 2.9456 2.3884 5.334 5.334 5.334 2.9456 0 5.332-2.3884 5.332-5.334 0-2.945-2.3864-5.334-5.332-5.334zm13.332 0c-2.9456 0-5.332 2.389-5.332 5.334 0 2.9456 2.3864 5.334 5.332 5.334C21.6116 17.334 24 14.9456 24 12c0-2.945-2.3884-5.334-5.334-5.334Z' />
    </svg>
  );
}

function MusescoreIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 127.307 105.773' xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden fill='currentColor'>
      <path d='m 0,41.833 0,62.604 2.436,0 0,-35.44 c 0,-3.494 0.446,-6.821 1.34,-9.989 0.974,-3.166 2.313,-5.929 4.018,-8.282 1.787,-2.437 3.938,-4.344 6.457,-5.726 2.516,-1.462 5.317,-2.192 8.404,-2.192 3.49,0 6.334,0.568 8.525,1.706 2.194,1.135 3.898,2.68 5.118,4.627 1.216,1.95 2.028,4.222 2.434,6.821 0.489,2.599 0.732,5.359 0.732,8.284 l 0,40.191 2.435,0 0,-39.703 c 0,-2.924 0.447,-5.686 1.34,-8.283 0.893,-2.678 2.193,-5.035 3.897,-7.064 1.706,-2.029 3.776,-3.613 6.213,-4.75 2.435,-1.218 5.155,-1.827 8.161,-1.827 3.41,0 6.211,0.486 8.403,1.462 2.274,0.974 4.06,2.355 5.359,4.141 1.38,1.786 2.314,3.938 2.803,6.454 0.566,2.519 0.85,5.319 0.85,8.404 l 0.082,23.017 c 0.02,0 2.384,-0.066 2.384,-0.066 l -0.029,-22.95 c 0,-3.41 -0.326,-6.495 -0.974,-9.255 -0.65,-2.844 -1.747,-5.237 -3.29,-7.188 -1.542,-2.028 -3.572,-3.613 -6.09,-4.75 -2.517,-1.137 -5.683,-1.704 -9.499,-1.704 -4.874,0 -9.096,1.338 -12.668,4.019 -3.572,2.68 -5.968,6.213 -7.187,10.597 l -0.243,0 c -1.057,-4.627 -3.247,-8.243 -6.578,-10.841 -3.247,-2.68 -7.307,-3.938 -12.179,-3.774 -2.437,0 -4.75,0.445 -6.943,1.338 -2.111,0.813 -4.059,1.99 -5.847,3.533 -1.787,1.543 -3.288,3.329 -4.505,5.36 -1.219,2.029 -2.111,4.261 -2.68,6.697 l -0.244,0 0,-15.463 -2.434,0' />
      <path d='m 126.027,104.434 0,-62.601 -2.437,0 0,35.443 c 0,3.492 -0.486,6.82 -1.46,9.987 -0.973,3.168 -2.437,5.968 -4.385,8.404 -1.867,2.355 -4.223,4.264 -7.065,5.725 -2.842,1.381 -6.13,2.07 -9.865,2.07 -2.68,0 -5.237,-0.364 -7.674,-1.097 -2.354,-0.813 -4.466,-2.029 -6.334,-3.654 -1.786,-1.704 -3.206,-3.815 -4.262,-6.333 -1.056,-2.599 -1.154,-5.811 -1.154,-9.464 l -2.386,0.371 c 0,0.969 0,2.069 0.003,3.003 0.136,2.505 0.325,4.733 1.1,6.821 1.138,2.76 2.681,5.115 4.628,7.064 2.031,1.868 4.386,3.288 7.064,4.262 2.762,0.893 5.765,1.338 9.014,1.338 6.172,0 11.166,-1.581 14.981,-4.748 3.897,-3.165 6.416,-7.185 7.551,-12.059 l 0.243,0 0,15.469 2.415,0' />
      <path d='m 98.747,23.872 c 0,-1.541 1.248,-2.789 2.789,-2.789 1.54,0 2.789,1.248 2.789,2.789 0,1.54 -1.249,2.789 -2.789,2.789 -1.55,0 -2.79,-1.249 -2.79,-2.789' />
      <path d='m 74.199,25.182 2.324,0 c 0,-15.006 12.52,-22.857 24.886,-22.857 6.278,0 12.063,1.999 16.289,5.626 4.766,4.092 7.285,10.05 7.285,17.231 l 2.324,0 c 0,-7.88 -2.799,-14.448 -8.096,-18.995 C 114.564,2.198 108.241,0 101.409,0 87.889,0 74.201,8.649 74.201,25.182 Z' />
    </svg>
  );
}

type SocialLink = {
  name: string;
  icon?: string;
  iconComponent?: ComponentType<IconProps>;
  url: string;
  username: string;
};

const socials: SocialLink[] = [
  {
    name: 'GitHub',
    icon: '/icons/github.svg',
    url: 'https://github.com/gaulatti',
    username: '@gaulatti'
  },
  {
    name: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    url: 'https://linkedin.com/in/gaulatti',
    username: 'gaulatti'
  },
  {
    name: 'Instagram',
    icon: '/icons/instagram.svg',
    url: 'https://instagram.com/gaulatti',
    username: '@gaulatti'
  },
  {
    name: 'Bluesky',
    icon: '/icons/bluesky.svg',
    url: 'https://bsky.app/profile/gaulatti.com',
    username: '@gaulatti.com'
  },
  {
    name: 'Medium',
    iconComponent: MediumIcon,
    url: 'https://blog.gaulatti.com',
    username: 'blog.gaulatti.com'
  },
  {
    name: 'Musescore',
    iconComponent: MusescoreIcon,
    url: 'https://music.gaulatti.com',
    username: 'music.gaulatti.com'
  },
  {
    name: 'Flickr',
    iconComponent: FlickrIcon,
    url: 'https://photos.gaulatti.com',
    username: 'photos.gaulatti.com'
  },
  {
    name: 'Email',
    icon: '',
    url: 'mailto:jack@gaulatti.com',
    username: 'jack@gaulatti.com'
  }
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Contact — Gaulatti' },
    {
      name: 'description',
      content: 'Get in touch with Javier Godoy for collaboration opportunities in software development, music composition, or media production.'
    }
  ];
}

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const resetTimer = useRef<number | null>(null);

  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID ?? (import.meta.env as Record<string, string | undefined>).PUBLIC_FORMSPREE_FORM_ID ?? '';

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const getInputClasses = (fieldName: string) =>
    `w-full rounded-sm border p-2 focus:ring-2 focus:ring-accent-blue focus:outline-none focus:border-transparent light:border-gray-300 dark:border-sand/20 dark:bg-light-sand dark:text-white ${
      invalidFields[fieldName] ? 'border-accent-red' : ''
    }`;

  const handleInvalid = (fieldName: string) => {
    setInvalidFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const clearInvalid = (fieldName: string) => {
    if (!invalidFields[fieldName]) {
      return;
    }

    setInvalidFields((prev) => {
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }

    setStatus('sending');
    const response = await fetch(formRef.current.action, {
      method: 'POST',
      body: new FormData(formRef.current),
      headers: {
        Accept: 'application/json'
      }
    }).catch(() => null);

    if (response?.ok) {
      formRef.current.reset();
      setStatus('success');
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
      resetTimer.current = window.setTimeout(() => {
        setStatus('idle');
      }, 3000);
      return;
    }

    setStatus('error');
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }
    resetTimer.current = window.setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  const buttonText = {
    idle: 'Send Message',
    sending: 'Sending...',
    success: 'Message Sent',
    error: 'Try Again'
  }[status];

  return (
    <main className='pt-32 pb-24'>
      <div className='container'>
        <div className='mx-auto max-w-4xl'>
          <div className='grid gap-16 lg:grid-cols-2'>
            <div>
              <h1 className='mb-8 text-5xl font-bold tracking-tight md:text-6xl'>Let&apos;s Create Together</h1>
              <p className='light:text-gray-600 dark:text-text-secondary mb-12 text-xl'>
                Whether you&apos;re interested in collaboration, have a project in mind, or just want to say hello, I&apos;d love to hear from you.
              </p>

              <div className='space-y-6'>
                <h2 className='text-xl font-bold'>Connect With Me</h2>
                <ul className='space-y-4'>
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        className='light:bg-gray-50 dark:bg-sand dark:hover:bg-[#253548] light:hover:bg-gray-100 group flex items-center gap-4 rounded-sm p-4 transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {social.iconComponent ? (
                          <social.iconComponent className='light:text-gray-900 h-6 w-6 dark:text-white' />
                        ) : social.icon ? (
                          <img src={social.icon} alt={social.name} className='light:text-gray-900 h-6 w-6 dark:invert' />
                        ) : (
                          <Mail className='light:text-gray-900 h-6 w-6 dark:text-white' />
                        )}
                        <div>
                          <div className='font-medium'>{social.name}</div>
                          <div className='light:text-gray-600 dark:text-text-secondary text-sm'>{social.username}</div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className='dark:bg-sand rounded-sm bg-gray-50 p-8'>
                <h2 className='mb-6 text-2xl font-bold'>Send a Message</h2>
                <form ref={formRef} action={`https://formspree.io/f/${formId}`} method='POST' className='space-y-6' onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='name' className='light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      required
                      minLength={2}
                      className={getInputClasses('name')}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid('name');
                      }}
                      onInput={() => clearInvalid('name')}
                    />
                  </div>

                  <div>
                    <label htmlFor='email' className='light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium'>
                      Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      required
                      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                      className={getInputClasses('email')}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid('email');
                      }}
                      onInput={() => clearInvalid('email')}
                    />
                  </div>

                  <div>
                    <label htmlFor='subject' className='light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium'>
                      Subject
                    </label>
                    <input
                      type='text'
                      name='subject'
                      id='subject'
                      required
                      minLength={2}
                      className={getInputClasses('subject')}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid('subject');
                      }}
                      onInput={() => clearInvalid('subject')}
                    />
                  </div>

                  <div>
                    <label htmlFor='message' className='light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium'>
                      Message
                    </label>
                    <textarea
                      name='message'
                      id='message'
                      rows={6}
                      required
                      minLength={10}
                      className={getInputClasses('message')}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid('message');
                      }}
                      onInput={() => clearInvalid('message')}
                    />
                  </div>

                  <button
                    type='submit'
                    className='light:bg-black dark:bg-accent-blue hover-lift relative w-full px-8 py-3 font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50'
                    disabled={status === 'sending'}
                  >
                    <span className='inline-flex items-center'>
                      <span>{buttonText}</span>
                      {status === 'sending' ? (
                        <span className='ml-2'>
                          <svg className='h-5 w-5 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            />
                          </svg>
                        </span>
                      ) : null}
                    </span>
                  </button>

                  {status === 'success' ? (
                    <div className='text-center'>
                      <p className='text-accent-blue'>Thank you! Your message has been sent.</p>
                    </div>
                  ) : null}

                  {status === 'error' ? (
                    <div className='text-center'>
                      <p className='text-accent-red'>Sorry, there was an error sending your message. Please try again.</p>
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
