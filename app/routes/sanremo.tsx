import { Link } from "react-router";
import type { Route } from "./+types/sanremo";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "Sanremo Festival Coverage — Executive Production & Live Operations Leadership",
    },
    {
      name: "description",
      content:
        "Case study on leading a distributed live broadcast operation during the Sanremo Festival, including crisis response, technical redesign, editorial direction, and execution under pressure.",
    },
  ];
}

export default function Sanremo() {
  return (
    <main className="flex flex-col pt-24">
      <section className="relative py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <p className="text-accent-red mb-4 text-sm font-medium tracking-wide uppercase">
              Live Operations Case Study
            </p>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              Sanremo Festival Coverage
            </h1>
            <p className="light:text-gray-700 dark:text-text-secondary mb-6 text-2xl">
              Executive Production, Technical Direction, and Live Operations
              Leadership
            </p>
            <p className="light:text-gray-600 dark:text-text-secondary max-w-3xl text-lg">
              A joint media operation between FifthBell, ModoItaliano (Chile),
              and HNMag (Spain), led from Sanremo under live broadcast
              conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="light:bg-gray-50 dark:bg-deep-sea py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Context</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                This was a joint venture between FifthBell, ModoItaliano (a
                Chilean media outlet), and HNMag (a Spanish publication). The
                goal was to deliver live coverage of the Sanremo Music Festival
                to Spanish-speaking audiences across multiple platforms.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                I served as the <strong className="text-text-primary">Executive Producer</strong> — the person
                ultimately responsible for leading the operation, making
                editorial decisions, coordinating contributors, and ensuring
                broadcasts went live as planned.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary text-lg">
                The mission required coordinating on-site production in Italy
                with remote contributors from Chile and Spain, while handling
                press accreditation, interview scheduling, technical
                infrastructure, and multi-hour live broadcasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Crisis</h2>
            <div className="bg-accent-red/5 border-accent-red mb-8 rounded-r-lg border-l-4 p-8">
              <p className="light:text-gray-700 dark:text-text-secondary text-lg">
                The original broadcast plan depended on infrastructure and
                equipment operated remotely from Chile. That dependency became
                unreliable and jeopardized the entire operation.
              </p>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                This was not a minor inconvenience. The technical failures and
                coordination breakdowns threatened the viability of the coverage
                itself. With press credentials already issued and broadcast
                commitments already announced, the operation faced potential
                collapse days before the festival began.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary text-lg">
                The situation required immediate assessment and a decision about
                whether to continue, and if so, under what structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="light:bg-gray-50 dark:bg-deep-sea py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Decision</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                I made the decision to{" "}
                <strong className="text-text-primary">
                  remove the failing external dependency
                </strong>{" "}
                and assume full operational control from Sanremo.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                This was not a decision made lightly. It meant taking full
                responsibility for the success or failure of the operation from
                that point forward. It also meant redesigning the entire
                technical and operational workflow under extreme time pressure.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary text-lg">
                I brought the remaining team back into focus and re-centered the
                mission. The goal remained the same: deliver professional live
                coverage from Sanremo. The path to get there had to be rebuilt
                from scratch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Rebuild</h2>
            <div className="mb-8 grid gap-8 md:grid-cols-2">
              <div className="dark:bg-sand rounded-lg bg-white p-6">
                <div className="bg-accent-blue mb-4 h-1 w-12" />
                <h3 className="mb-2 font-bold">Signal Control</h3>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Shifted all broadcast signal routing to local infrastructure
                  in Italy.
                </p>
              </div>
              <div className="dark:bg-sand rounded-lg bg-white p-6">
                <div className="bg-accent-red mb-4 h-1 w-12" />
                <h3 className="mb-2 font-bold">Production Control</h3>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Rebuilt the production workflow to operate independently from
                  Sanremo.
                </p>
              </div>
              <div className="dark:bg-sand rounded-lg bg-white p-6">
                <div className="bg-accent-yellow mb-4 h-1 w-12" />
                <h3 className="mb-2 font-bold">Technical Direction</h3>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Consolidated technical decision-making under single
                  operational authority.
                </p>
              </div>
              <div className="dark:bg-sand rounded-lg bg-white p-6">
                <div className="bg-accent-blue mb-4 h-1 w-12" />
                <h3 className="mb-2 font-bold">Timeline</h3>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Complete architecture rebuild executed in approximately 3
                  days.
                </p>
              </div>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="light:text-gray-600 dark:text-text-secondary text-lg">
                During this period, I handled editorial direction, technical
                direction, on-air decisions, and contributor coordination
                simultaneously. The rebuild required designing new workflows,
                configuring streaming infrastructure, and establishing
                communication protocols — all while continuing to conduct
                interviews and gather content for the broadcasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="light:bg-gray-50 dark:bg-deep-sea py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Execution</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                I led the operation under extreme schedule pressure. Press
                conferences began around 11am daily. Live broadcasts typically
                concluded between 2am and 3am. The work required minimal sleep
                and sustained operational focus across multiple consecutive days.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary mb-8 text-lg">
                Responsibilities during execution included:
              </p>
              <ul className="grid list-none gap-4 pl-0 md:grid-cols-2">
                {[
                  "Interview coordination with artists and press representatives",
                  "On-air narrative direction and editorial decisions",
                  "Real-time production decisions during multi-hour broadcasts",
                  "Technical setup, monitoring, and teardown",
                  "Coordination of remote contributors across Italy and Spain",
                  "Troubleshooting and crisis response during live broadcasts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-accent-blue mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                    <span className="light:text-gray-600 dark:text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Outcome</h2>
            <div className="mb-8 grid gap-6 md:grid-cols-3">
              <div className="dark:bg-sand rounded-lg bg-white p-6 text-center">
                <p className="text-accent-blue mb-2 text-4xl font-bold">~2,000</p>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Peak concurrent viewers
                </p>
              </div>
              <div className="dark:bg-sand rounded-lg bg-white p-6 text-center">
                <p className="text-accent-red mb-2 text-4xl font-bold">4-5h</p>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Average broadcast duration
                </p>
              </div>
              <div className="dark:bg-sand rounded-lg bg-white p-6 text-center">
                <p className="text-accent-yellow mb-2 text-4xl font-bold">3</p>
                <p className="light:text-gray-600 dark:text-text-secondary text-sm">
                  Countries coordinated
                </p>
              </div>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ul className="space-y-3">
                {[
                  "Multi-hour live broadcasts delivered successfully from Sanremo",
                  "Contributors coordinated across Italy and Spain throughout the festival",
                  "The operation succeeded after the original plan collapsed",
                  "Complete rebuild executed under live operational pressure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-accent-blue mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                    <span className="light:text-gray-600 dark:text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="light:bg-gray-50 dark:bg-deep-sea py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold">Why It Mattered</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                This was not software work. This was operational leadership
                under pressure.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                Software was one artifact inside a larger mission that involved
                coordinating people across time zones, making editorial
                decisions in real time, managing logistics under uncertainty,
                and executing live broadcasts while simultaneously handling
                crisis response.
              </p>
              <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
                The experience demonstrated the ability to:
              </p>
              <ul className="mb-6 space-y-3">
                {[
                  "Make difficult decisions under pressure when dependencies fail",
                  "Rebuild operational infrastructure rapidly when circumstances demand it",
                  "Lead distributed teams through uncertainty toward successful outcomes",
                  "Execute complex operations requiring sustained focus over extended periods",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-accent-red mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                    <span className="light:text-gray-600 dark:text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="light:text-gray-600 dark:text-text-secondary text-lg">
                These are the same capabilities required to lead large-scale
                engineering initiatives, navigate organizational complexity, and
                deliver results when plans inevitably change.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="light:text-gray-600 dark:text-text-secondary mb-6 text-lg">
              The technical systems used in this operation are documented
              separately.
            </p>
            <Link
              to="/engineering"
              className="light:bg-sea dark:bg-accent-blue inline-block px-8 py-3 font-medium text-white transition-all duration-300 hover:opacity-90"
            >
              View Engineering Systems →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
