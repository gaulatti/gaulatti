import { Link } from "react-router";

const systems = [
  {
    title: "Cronkite",
    subtitle: "Publishing Engine & Rendering Pipeline",
    description:
      "Publishes content to S3, generates static HTML pages, and produces automated short-form video clips. Integrates with CMS workflows for seamless content delivery.",
    tags: ["TypeScript", "AWS S3", "FFMPEG"],
    color: "bg-accent-blue",
  },
  {
    title: "Alcántara",
    subtitle: "Broadcast Overlay Control System",
    description:
      "Professional TV broadcast overlay system with real-time SSE updates. Control panel manages lower thirds, full-screen graphics, and corner bugs with instant preview.",
    tags: ["React", "NestJS", "SSE"],
    color: "bg-accent-red",
  },
  {
    title: "Toni",
    subtitle: "OBS Control & Playlist Management",
    description:
      "Control interface for OBS via WebSocket. Manages media playlists, scene switching, and transitions. Provides clean feed output to Alana for streaming.",
    tags: ["React", "NestJS", "obs-websocket"],
    color: "bg-accent-yellow",
  },
  {
    title: "Alana",
    subtitle: "Containerized OBS Streaming Runtime",
    description:
      "Dockerized OBS Studio with obs-websocket for remote control. Receives clean feed from Alcántara+Toni, handles GPU encoding (Intel QSV), and streams to YouTube 24/7.",
    tags: ["Docker", "OBS", "VNC"],
    color: "bg-accent-blue",
  },
  {
    title: "Stronzi",
    subtitle: "Story Template Studio",
    description:
      "Web application for creating professional 1080×1920 story templates. Live preview, dynamic forms, and one-click PNG export for social media content.",
    tags: ["React Router 7", "TypeScript", "Tailwind"],
    color: "bg-accent-blue",
  },
  {
    title: "Monitor",
    subtitle: "Global News & Earthquake Monitoring",
    description:
      "Source-agnostic content ingestion with Qdrant for semantic clustering and Google Gemini for analysis. Real-time SSE feeds for posts, earthquakes, and events.",
    tags: ["NestJS", "Qdrant", "Gemini"],
    color: "bg-accent-red",
  },
  {
    title: "Celesti",
    subtitle: "Stream Routing & Monitoring",
    description:
      "Go backend (mattone) + Kotlin Android TV client (pioggia). M3U import, SSE commands, and multi-display coordination for newsroom environments.",
    tags: ["Go", "Kotlin", "Jetpack Compose"],
    color: "bg-accent-yellow",
  },
];

export function Systems() {
  return (
    <section className="relative py-24">
      <div className="absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2">
        <div className="rotate-45 border-accent-red h-full w-full border-8" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              FifthBell Media Systems
            </h2>
            <p className="light:text-gray-600 dark:text-text-secondary mx-auto max-w-3xl text-xl">
              A personal media infrastructure platform I designed, built, and
              operate. These systems power real-world broadcast operations,
              automated content production, and newsroom monitoring.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {systems.map((system) => (
              <div key={system.title} className="hover-lift dark:bg-sand bg-white p-8">
                <div className={`mb-6 h-2 w-16 ${system.color}`} />
                <h3 className="mb-3 text-2xl font-bold">{system.title}</h3>
                <p className="text-sea dark:text-accent-blue mb-4 text-sm">
                  {system.subtitle}
                </p>
                <p className="dark:text-text-secondary mb-4 text-gray-600">
                  {system.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {system.tags.map((tag) => (
                    <span
                      key={tag}
                      className="dark:bg-dark-sand rounded bg-gray-100 px-3 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/engineering"
              className="text-sea dark:text-accent-blue inline-flex items-center font-medium hover:underline"
            >
              View Full Architecture
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
