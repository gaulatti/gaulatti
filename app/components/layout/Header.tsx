import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/engineering", label: "Engineering" },
  { href: "/portfolio", label: "Projects" },
  { href: "/sanremo", label: "Sanremo" },
  { href: "https://blog.gaulatti.com", label: "Writing", external: true },
  { href: "/journey", label: "Resume" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="light:bg-white/90 dark:bg-dark-sand/95 light:border-sand/5 dark:border-dark-sand fixed top-0 z-50 w-full border-b shadow-[0_1px_3px_0_rgb(0,0,0,0.02)] backdrop-blur-2xl dark:shadow-[0_1px_3px_0_rgb(0,0,0,0.3)]">
      <div className="container mx-auto px-4">
        <nav className="flex h-20 items-center justify-between">
          <Link to="/" className="group transition-all duration-400">
            <img
              src="/icons/gaulatti.svg"
              alt="gaulatti"
              className="h-8 w-auto opacity-90 transition-opacity duration-400 group-hover:opacity-100 dark:invert"
            />
          </Link>

          <div className="hidden items-center space-x-12 md:flex">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="light:hover:text-sea dark:hover:text-accent-blue tracking-refined text-base font-medium transition-colors duration-400"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="light:hover:text-sea dark:hover:text-accent-blue tracking-refined text-base font-medium transition-colors duration-400"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              className="light:bg-sea dark:bg-accent-blue light:hover:border-desert/20 tracking-elegant light:hover:bg-desert border border-transparent px-6 py-2.5 text-base font-medium text-white shadow-sm transition-all duration-400 hover:shadow"
            >
              Contact
            </Link>
          </div>

          <button
            className="group md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`h-[1px] w-full bg-text-primary opacity-90 transition-all duration-400 group-hover:opacity-100 ${
                  isMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1px] w-full bg-text-primary opacity-90 transition-all duration-400 group-hover:opacity-100 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1px] w-full bg-text-primary opacity-90 transition-all duration-400 group-hover:opacity-100 ${
                  isMenuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        <div
          className={`light:bg-light-sand/95 dark:bg-sand/95 border-sand/10 border-t backdrop-blur-md md:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="space-y-6 py-6">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="light:hover:text-sea dark:hover:text-accent-blue tracking-refined block px-4 text-base font-medium transition-colors duration-400"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="light:hover:text-sea dark:hover:text-accent-blue tracking-refined block px-4 text-base font-medium transition-colors duration-400"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              className="light:hover:text-sea dark:hover:text-accent-blue tracking-refined block px-4 text-base font-medium transition-colors duration-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
