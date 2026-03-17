import { Link } from "react-router";

const socialLinks = [
  {
    href: "https://github.com/gaulatti",
    label: "GitHub",
    icon: "/icons/github.svg",
  },
  {
    href: "https://bsky.app/profile/gaulatti.com",
    label: "Bluesky",
    icon: "/icons/bluesky.svg",
  },
  {
    href: "https://instagram.com/gaulatti",
    label: "Instagram",
    icon: "/icons/instagram.svg",
  },
  {
    href: "https://linkedin.com/in/gaulatti",
    label: "LinkedIn",
    icon: "/icons/linkedin.svg",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-sea dark:bg-sand text-white">
      <div className="via-sunset/30 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img
              src="/icons/gaulatti.svg"
              alt="gaulatti"
              className="mb-8 h-12 w-auto opacity-90 invert"
            />
            <p className="tracking-refined max-w-md leading-relaxed text-sand/90">
              Crafting digital experiences that blend precision with poetry.
              Where engineering meets artistry, creating spaces for reflection,
              innovation, and the quiet appreciation of life&apos;s remarkable
              moments.
            </p>
          </div>

          <div>
            <h3 className="tracking-elegant light:text-sand dark:text-desert mb-8 text-sm font-medium uppercase">
              Navigation
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="dark:text-text-secondary text-sand/80 transition-colors duration-400 hover:text-sunset"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="/blog"
                  className="dark:text-text-secondary text-sand/80 transition-colors duration-400 hover:text-sunset"
                >
                  Blog
                </a>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="dark:text-text-secondary text-sand/80 transition-colors duration-400 hover:text-sunset"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="dark:text-text-secondary text-sand/80 transition-colors duration-400 hover:text-sunset"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="tracking-elegant light:text-sand dark:text-desert mb-8 text-sm font-medium uppercase">
              Connect
            </h3>
            <ul className="dark:text-text-secondary space-y-4 fill-current text-sand/80">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="group flex items-center gap-3 transition-colors duration-400 hover:text-sunset"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.icon}
                      alt={social.label}
                      className="h-5 w-5 opacity-80 invert transition-opacity duration-400 group-hover:opacity-100"
                    />
                    <span className="tracking-refined">{social.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:jack@gaulatti.com"
                  className="group flex items-center gap-3 transition-colors duration-400 hover:text-sunset"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 opacity-80 transition-opacity duration-400 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="tracking-refined">Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-sand/10 mt-20 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="tracking-refined text-sm text-sand/60">
            © {year} Javier Godoy Núñez. All rights reserved.
          </div>
        </div>
      </div>

      <div className="from-desert via-sunset to-sea h-1 w-full bg-gradient-to-r opacity-80" />
    </footer>
  );
}
