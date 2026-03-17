import { Link } from "react-router";
import { BauhausBackground } from "~/components/BauhausBackground";
import type { Route } from "./+types/portfolio";

interface Project {
  title: string;
  description: string;
  type: "autostrada" | "pompeii" | "monitor";
  tags: string[];
  link: string;
  imageUrl?: string;
  repos: {
    infra: string;
    service: string;
    frontend: string;
  };
  other?: { link: string; text: string; icon: string }[];
}

const personalProjects: Project[] = [
  {
    title: "Nazca",
    description:
      "Automated seismic monitoring system that broadcasts real-time earthquake visualizations to YouTube 24/7. Built with React for rendering, NestJS for data aggregation, and FFMPEG for video stream generation—all running without human intervention.",
    type: "autostrada",
    tags: ["TypeScript", "React", "NestJS", "AWS", "FFMPEG", "Docker"],
    link: "https://nazca.gaulatti.com",
    imageUrl: "/hero/nazca-ss.avif",
    repos: {
      infra: "https://github.com/gaulatti/nazca",
      service: "https://github.com/gaulatti/nazca-service",
      frontend: "https://github.com/gaulatti/nazca-frontend",
    },
    other: [
      {
        link: "https://www.youtube.com/watch?v=2oW7_GF6-pI",
        text: "Live Stream",
        icon: "/icons/youtube.svg",
      },
    ],
  },
  {
    title: "Autostrada",
    description:
      "Frontend observability platform unifying Lighthouse audits, RUM data, and PageSpeed Insights. Designed for continuous performance governance with automated scoring, trend analysis, and alerting across web properties.",
    type: "autostrada",
    tags: ["TypeScript", "React", "NestJS", "AWS", "Lighthouse"],
    link: "https://autostrada.gaulatti.com",
    imageUrl: "/hero/autostrada.avif",
    repos: {
      infra: "https://github.com/gaulatti/autostrada",
      service: "https://github.com/gaulatti/autostrada-service",
      frontend: "https://github.com/gaulatti/autostrada-frontend",
    },
  },
  {
    title: "Monitor",
    description:
      "AI-powered news monitoring system that aggregates global sources, clusters stories into events, and sends real-time alerts. Combines web scraping with NLP to filter signal from noise in breaking news scenarios.",
    type: "monitor",
    tags: ["TypeScript", "NestJS", "Web Scraping", "AI/ML", "AWS"],
    link: "https://monitor.gaulatti.com",
    imageUrl: "/hero/monitor.avif",
    repos: {
      infra: "https://github.com/gaulatti/monitor",
      service: "https://github.com/gaulatti/monitor-service",
      frontend: "https://github.com/gaulatti/monitor-frontend",
    },
  },
  {
    title: "Pompeii",
    description:
      "Centralized authentication service providing SSO across multiple applications. Implements OAuth2 with support for external providers like Google, eliminating duplicate auth code across services.",
    type: "pompeii",
    tags: ["TypeScript", "NestJS", "OAuth2", "MySQL", "AWS"],
    link: "https://pompeii.gaulatti.com",
    imageUrl: "/hero/pompeii.avif",
    repos: {
      infra: "https://github.com/gaulatti/pompeii",
      service: "https://github.com/gaulatti/pompeii-service",
      frontend: "https://github.com/gaulatti/pompeii-frontend",
    },
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects — Javier Godoy" },
    {
      name: "description",
      content:
        "Engineering projects: observability platforms, real-time monitoring systems, and media infrastructure tools.",
    },
  ];
}

export default function Portfolio() {
  return (
    <main className="pt-32 pb-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-fade-in mb-8 text-5xl font-bold tracking-tight md:text-6xl">
            Projects
          </h1>
          <p
            className="text-fade-in light:text-gray-600 dark:text-text-secondary mb-16 max-w-2xl text-xl"
            style={{ animationDelay: "100ms" }}
          >
            Production systems I&apos;ve designed and built. Each project
            addresses real operational challenges in observability, monitoring,
            and media infrastructure.
          </p>

          <section className="mb-24">
            <h2 className="mb-12 text-3xl font-bold">Featured Personal Projects</h2>
            <div className="grid gap-12">
              {personalProjects.map((project, index) => (
                <article
                  key={project.title}
                  className="text-fade-in group"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="grid items-center gap-8 md:grid-cols-2">
                    <div className="order-2 md:order-1">
                      <a
                        href={project.link}
                        className="group/title block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="group-hover/title:text-accent-blue mb-4 text-2xl font-bold transition-colors">
                          {project.title}
                        </h3>
                      </a>
                      <p className="dark:text-text-secondary mb-4 text-gray-600">
                        {project.description}
                      </p>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="light:bg-gray-100 dark:bg-sand rounded-sm px-2 py-1 text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href={project.repos.infra}
                            className="light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/icons/github.svg"
                              alt=""
                              className="h-4 w-4 dark:invert"
                            />
                            <span>Infrastructure</span>
                          </a>
                          <a
                            href={project.repos.service}
                            className="light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/icons/github.svg"
                              alt=""
                              className="h-4 w-4 dark:invert"
                            />
                            <span>Service</span>
                          </a>
                          <a
                            href={project.repos.frontend}
                            className="light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/icons/github.svg"
                              alt=""
                              className="h-4 w-4 dark:invert"
                            />
                            <span>Frontend</span>
                          </a>
                          {project.other?.map((item) => (
                            <a
                              key={item.link}
                              href={item.link}
                              className="light:text-gray-600 dark:text-text-secondary hover:text-accent-blue inline-flex items-center gap-2 text-sm transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="h-4 w-4 dark:invert"
                              />
                              <span>{item.text}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <a
                        href={project.link}
                        className="block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="light:bg-gray-100 dark:bg-sand hover-lift aspect-video overflow-hidden rounded-sm">
                          <BauhausBackground
                            type={project.type}
                            imageUrl={project.imageUrl}
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div
            className="text-fade-in mt-24 text-center"
            style={{ animationDelay: "800ms" }}
          >
            <p className="mb-8 text-xl">Interested in collaborating on a project?</p>
            <Link
              to="/contact"
              className="light:bg-black dark:bg-accent-blue focus-accent hover-lift inline-block px-8 py-3 font-medium text-white"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
