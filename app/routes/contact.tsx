import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Route } from "./+types/contact";

type FormStatus = "idle" | "sending" | "success" | "error";

const socials = [
  {
    name: "GitHub",
    icon: "/icons/github.svg",
    url: "https://github.com/gaulatti",
    username: "@gaulatti",
  },
  {
    name: "LinkedIn",
    icon: "/icons/linkedin.svg",
    url: "https://linkedin.com/in/gaulatti",
    username: "gaulatti",
  },
  {
    name: "Instagram",
    icon: "/icons/instagram.svg",
    url: "https://instagram.com/gaulatti",
    username: "@gaulatti",
  },
  {
    name: "Bluesky",
    icon: "/icons/bluesky.svg",
    url: "https://bsky.app/profile/gaulatti.com",
    username: "@gaulatti.com",
  },
  {
    name: "Email",
    icon: "",
    url: "mailto:jack@gaulatti.com",
    username: "jack@gaulatti.com",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact — Gaulatti" },
    {
      name: "description",
      content:
        "Get in touch with Javier Godoy for collaboration opportunities in software development, music composition, or media production.",
    },
  ];
}

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [invalidFields, setInvalidFields] = useState<Record<string, boolean>>(
    {},
  );
  const formRef = useRef<HTMLFormElement>(null);
  const resetTimer = useRef<number | null>(null);

  const formId =
    import.meta.env.VITE_FORMSPREE_FORM_ID ??
    ((import.meta.env as Record<string, string | undefined>)
      .PUBLIC_FORMSPREE_FORM_ID ??
      "");

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const getInputClasses = (fieldName: string) =>
    `w-full rounded-sm border p-2 focus:ring-2 focus:ring-accent-blue focus:outline-none focus:border-transparent light:border-gray-300 dark:border-sand/20 dark:bg-light-sand dark:text-white ${
      invalidFields[fieldName] ? "border-accent-red" : ""
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

    setStatus("sending");
    const response = await fetch(formRef.current.action, {
      method: "POST",
      body: new FormData(formRef.current),
      headers: {
        Accept: "application/json",
      },
    }).catch(() => null);

    if (response?.ok) {
      formRef.current.reset();
      setStatus("success");
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
      resetTimer.current = window.setTimeout(() => {
        setStatus("idle");
      }, 3000);
      return;
    }

    setStatus("error");
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }
    resetTimer.current = window.setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  const buttonText = {
    idle: "Send Message",
    sending: "Sending...",
    success: "Message Sent",
    error: "Try Again",
  }[status];

  return (
    <main className="pt-32 pb-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h1 className="mb-8 text-5xl font-bold tracking-tight md:text-6xl">
                Let&apos;s Create Together
              </h1>
              <p className="light:text-gray-600 dark:text-text-secondary mb-12 text-xl">
                Whether you&apos;re interested in collaboration, have a project in
                mind, or just want to say hello, I&apos;d love to hear from you.
              </p>

              <div className="space-y-6">
                <h2 className="text-xl font-bold">Connect With Me</h2>
                <ul className="space-y-4">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        className="light:bg-gray-50 dark:bg-sand dark:hover:bg-[#253548] light:hover:bg-gray-100 group flex items-center gap-4 rounded-sm p-4 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon ? (
                          <img
                            src={social.icon}
                            alt={social.name}
                            className="light:text-gray-900 h-6 w-6 dark:invert"
                          />
                        ) : (
                          <Mail className="light:text-gray-900 h-6 w-6 dark:text-white" />
                        )}
                        <div>
                          <div className="font-medium">{social.name}</div>
                          <div className="light:text-gray-600 dark:text-text-secondary text-sm">
                            {social.username}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="dark:bg-sand rounded-sm bg-gray-50 p-8">
                <h2 className="mb-6 text-2xl font-bold">Send a Message</h2>
                <form
                  ref={formRef}
                  action={`https://formspree.io/f/${formId}`}
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      minLength={2}
                      className={getInputClasses("name")}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid("name");
                      }}
                      onInput={() => clearInvalid("name")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className={getInputClasses("email")}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid("email");
                      }}
                      onInput={() => clearInvalid("email")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      minLength={2}
                      className={getInputClasses("subject")}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid("subject");
                      }}
                      onInput={() => clearInvalid("subject")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="light:text-gray-700 dark:text-text-secondary mb-1 block text-sm font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={6}
                      required
                      minLength={10}
                      className={getInputClasses("message")}
                      onInvalid={(event) => {
                        event.preventDefault();
                        handleInvalid("message");
                      }}
                      onInput={() => clearInvalid("message")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="light:bg-black dark:bg-accent-blue hover-lift relative w-full px-8 py-3 font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={status === "sending"}
                  >
                    <span className="inline-flex items-center">
                      <span>{buttonText}</span>
                      {status === "sending" ? (
                        <span className="ml-2">
                          <svg
                            className="h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </span>
                  </button>

                  {status === "success" ? (
                    <div className="text-center">
                      <p className="text-accent-blue">
                        Thank you! Your message has been sent.
                      </p>
                    </div>
                  ) : null}

                  {status === "error" ? (
                    <div className="text-center">
                      <p className="text-accent-red">
                        Sorry, there was an error sending your message. Please
                        try again.
                      </p>
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
