import { Link } from "react-router";

export function Experience() {
  return (
    <section className="light:bg-gray-50 dark:bg-deep-sea py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Experience
            </h2>
            <p className="light:text-gray-600 dark:text-text-secondary text-xl">
              Building production systems at scale
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="light:bg-sea dark:bg-accent-blue mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-bold">Platform Engineering</h4>
              <p className="dark:text-text-secondary text-sm text-gray-600">
                Designing scalable infrastructure and developer platforms
              </p>
            </div>
            <div className="text-center">
              <div className="light:bg-sea dark:bg-accent-blue mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-bold">Media Infrastructure</h4>
              <p className="dark:text-text-secondary text-sm text-gray-600">
                Building broadcast, streaming, and content delivery systems
              </p>
            </div>
            <div className="text-center">
              <div className="light:bg-sea dark:bg-accent-blue mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="mb-2 font-bold">Real-Time Systems</h4>
              <p className="dark:text-text-secondary text-sm text-gray-600">
                Operating low-latency event-driven architectures
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/journey"
              className="light:bg-black dark:bg-accent-blue inline-block px-8 py-3 font-medium text-white"
            >
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
