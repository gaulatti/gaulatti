import { Building2, RadioTower, Tv } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/journey";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Experience — Javier Godoy (Gaulatti)" },
    {
      name: "description",
      content:
        "A journey through design systems, team leadership, and scalable architecture - from an early career engineer to a cross-functional leader at Narmi.",
    },
  ];
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="light:bg-black dark:bg-white flex h-16 w-16 items-center justify-center">
      {children}
    </div>
  );
}

export default function Journey() {
  return (
    <main className="pt-32 pb-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <header className="mb-16">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              My Journey
            </h1>
            <p className="light:text-gray-600 dark:text-text-secondary max-w-2xl text-xl">
              From writing my first lines of production code to leading
              cross-functional teams, my path has been shaped by a passion for
              building great software and empowering others.
            </p>
          </header>

          <section className="mb-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-accent-blue h-1 w-12" />
              <h2 className="text-3xl font-bold">Technical Skills</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Cloud & Infrastructure</h3>
                <ul className="light:text-gray-600 dark:text-text-secondary space-y-2">
                  <li>AWS (CDK, Lambda, DynamoDB)</li>
                  <li>AWS (API Gateway, Cognito)</li>
                  <li>AWS (S3, CloudFront, Route53)</li>
                  <li>AWS (EC2, RDS, ECR)</li>
                  <li>Docker, Serverless Framework</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Frontend & UI</h3>
                <ul className="light:text-gray-600 dark:text-text-secondary space-y-2">
                  <li>React, Redux, TypeScript</li>
                  <li>Angular, Astro, Tailwind</li>
                  <li>HTML5, CSS3, GraphQL</li>
                  <li>Design Systems, Figma</li>
                  <li>WebRTC, RTMP</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Backend & Tools</h3>
                <ul className="light:text-gray-600 dark:text-text-secondary space-y-2">
                  <li>NestJS, Express, Spring</li>
                  <li>PostgreSQL, DynamoDB</li>
                  <li>gRPC, REST APIs</li>
                  <li>Git, CI/CD</li>
                  <li>Agile/Scrum, Kanban</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-accent-blue h-1 w-12" />
              <h2 className="text-3xl font-bold">Experience & Growth</h2>
            </div>

            <div className="space-y-12">
              <div className="group">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0">
                    <IconBadge>
                      <RadioTower className="h-8 w-8 text-white dark:text-black" />
                    </IconBadge>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">
                      Executive Producer — Sanremo Festival Coverage
                    </h3>
                    <p className="light:text-gray-600 dark:text-text-secondary mb-4 text-xl">
                      FifthBell × ModoItaliano (Chile) × HNMag (Spain)
                    </p>
                    <p className="dark:text-text-secondary text-gray-600">
                      2026 • Sanremo, Italy
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-22">
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Live Operations Leadership</h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Led a distributed live media operation covering the
                      Sanremo Music Festival, coordinating contributors across
                      Italy and Spain for a joint venture between FifthBell,
                      ModoItaliano, and HNMag. Served as Executive Producer with
                      full responsibility for editorial direction, technical
                      supervision, and operational continuity.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Crisis Response & Production Redesign
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      When a critical external broadcast dependency failed and
                      threatened the viability of the coverage, made the
                      decision to remove that dependency and assume full
                      operational control from Sanremo. Rebuilt the production
                      model locally in approximately three days — including
                      signal routing, production workflow, and contributor
                      coordination — while the operation was running.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Execution</h4>
                    <p className="dark:text-text-secondary mb-3 text-gray-600">
                      Directed nightly broadcasts lasting roughly 4–5 hours
                      under sustained schedule pressure, with press activity
                      beginning around 11am and broadcasts concluding between 2am
                      and 3am. Final broadcast reached approximately 2,000
                      concurrent viewers.
                    </p>
                    <ul className="light:text-gray-600 dark:text-text-secondary list-disc space-y-1 pl-6">
                      <li>Interview coordination with artists and press representatives</li>
                      <li>On-air narrative direction and real-time editorial decisions</li>
                      <li>Technical setup, monitoring, and teardown each day</li>
                      <li>Remote contributor coordination across time zones</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0">
                    <IconBadge>
                      <Tv className="h-8 w-8 text-white dark:text-black" />
                    </IconBadge>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">
                      Founder & Lead Engineer — FifthBell
                    </h3>
                    <p className="light:text-gray-600 dark:text-text-secondary mb-4 text-xl">
                      Independent Media Systems Platform
                    </p>
                    <p className="dark:text-text-secondary text-gray-600">
                      2023 – Present
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-22">
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Platform & Architecture</h4>
                    <ul className="light:text-gray-600 dark:text-text-secondary list-disc space-y-2 pl-6">
                      <li>
                        Founded and built FifthBell, an independent digital
                        newsroom and media systems platform focused on real-time
                        news monitoring and live broadcasting.
                      </li>
                      <li>
                        Designed the full platform architecture including a
                        custom CMS (Payload backend + React editorial
                        interface), an automated publishing pipeline generating
                        static HTML to S3/CloudFront, and event-driven content
                        distribution.
                      </li>
                      <li>
                        Implemented a global news aggregation and event
                        clustering system using NestJS, Qdrant, and Google
                        Gemini for semantic deduplication and relevance
                        analysis.
                      </li>
                    </ul>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Broadcast & Automation Tools</h4>
                    <ul className="light:text-gray-600 dark:text-text-secondary list-disc space-y-2 pl-6">
                      <li>
                        Built a real-time broadcast overlay system (Alcántara)
                        using NestJS, SSE, and React, rendering live graphics
                        at fixed 1920×1080 via OBS browser sources.
                      </li>
                      <li>
                        Developed an OBS control and playlist management
                        interface (Toni) via obs-websocket with AWS CDK
                        infrastructure.
                      </li>
                      <li>
                        Containerized OBS Studio runtime (Alana) using Docker
                        with VNC access and Intel QSV hardware encoding for
                        24/7 YouTube streaming.
                      </li>
                      <li>
                        Built a social media story template studio (Stronzi)
                        with live preview and 1080×1920 PNG export using React
                        Router 7 and Tailwind CSS 4.
                      </li>
                    </ul>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Operations & Infrastructure</h4>
                    <ul className="light:text-gray-600 dark:text-text-secondary list-disc space-y-2 pl-6">
                      <li>
                        Operate a stream routing platform (Celesti) — Go backend
                        (Echo + GORM) with a Kotlin/Jetpack Compose Android TV
                        client — for managing M3U channel inventory and
                        dispatching playback commands via SSE.
                      </li>
                      <li>
                        Manage all infrastructure on AWS including Lambda, S3,
                        CloudFront, DynamoDB, SQS/SNS, and Cognito, deployed via
                        CDK.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0">
                    <IconBadge>
                      <img
                        src="/icons/narmi.svg"
                        alt="Narmi"
                        className="h-8 w-8 fill-current light:invert dark:invert-0"
                      />
                    </IconBadge>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">Narmi</h3>
                    <p className="light:text-gray-600 dark:text-text-secondary mb-4 text-xl">
                      Senior Software Engineer II
                    </p>
                    <p className="dark:text-text-secondary text-gray-600">
                      2025 - Present
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-22">
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Grow Team - Account Opening Platform
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Leading architecture and implementation of Account Opening
                      features for both business and consumer accounts. Driving
                      technical decisions and mentoring team members while
                      building scalable solutions that enable financial
                      institutions to streamline their onboarding processes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0">
                    <IconBadge>
                      <img
                        src="/icons/cnn.svg"
                        alt="CNN"
                        className="h-8 w-8 fill-current light:invert dark:invert-0"
                      />
                    </IconBadge>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">
                      Warner Bros. Discovery (CNN)
                    </h3>
                    <p className="light:text-gray-600 dark:text-text-secondary mb-4 text-xl">
                      Staff Software Engineer / Acting GM
                    </p>
                    <p className="dark:text-text-secondary text-gray-600">
                      2023 - 2025
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-22">
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Design Systems Team Lead</h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Lead and architect the design systems initiative, providing
                      technical direction and mentorship to the team. Drive
                      collaboration between engineering and design to translate
                      design tokens and components into performant, scalable code
                      libraries. Focus on developer experience and system
                      adoption across teams.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Site Performance Platform Lead
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Lead development and team direction for the performance
                      assessment platform, integrating Lighthouse, Datadog RUM,
                      and Google PageSpeed Insights. Guide team strategy and
                      implementation while maintaining direct contribution to
                      architecture and development. Platform provides
                      comprehensive metrics for performance, SEO,
                      accessibility, and visual consistency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0">
                    <IconBadge>
                      <img
                        src="/icons/amazon.svg"
                        alt="Amazon"
                        className="h-8 w-8 fill-current light:invert dark:invert-0"
                      />
                    </IconBadge>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">Amazon</h3>
                    <p className="light:text-gray-600 dark:text-text-secondary mb-4 text-xl">
                      Software Development Engineer
                    </p>
                    <p className="dark:text-text-secondary text-gray-600">
                      2017 - 2022 • Seattle, WA / New York, NY
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-22">
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Advertiser Experience</h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Enhanced self-service campaign builder features and expanded
                      to EU and FE markets. Led Observability efforts meeting
                      SRE goals through automation and monitoring. As
                      Single-threaded owner of Defect Reduction program,
                      resolved critical bottlenecks, reducing Catastrophic
                      Defect Rate from 40% to 1.3% through systematic analysis
                      and improvements.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Amazon Explore</h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Early member of the Amazon Explore team, helping build the
                      virtual experiences platform from the ground up. Developed
                      core streaming infrastructure and host-side experience
                      features.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Alexa Shopping & Infrastructure
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Led Peak Readiness program ensuring infrastructure
                      readiness for Prime Day. Coordinated with 15 global teams
                      to verify infrastructure, scaling, and SOPs/Runbooks.
                      Spearheaded migration from third-party safety management
                      service in Fulfillment Centers.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">Payments Services</h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Developed and integrated new payment services focusing on
                      eligibility and tax allocation. Enabled multi-tender
                      purchases including tax-free options with EBT (2017) and
                      HSA/FSA (2018) payment methods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="shrink-0">
                    <IconBadge>
                      <Building2 className="h-8 w-8 text-white" />
                    </IconBadge>
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">
                      Earlier Experience
                    </h3>
                    <p className="light:text-gray-600 dark:text-text-secondary mb-4 text-xl">
                      Growing from Engineer to Leader
                    </p>
                    <p className="dark:text-text-secondary text-gray-600">
                      2010 - 2016 • Chile & Remote
                    </p>
                  </div>
                </div>
                <div className="space-y-4 pl-0 md:pl-22">
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Waggl (2016) - Senior Web Developer
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Translated business requirements into specifications,
                      created design documents, and supported junior engineers
                      while implementing features. (Remote from Santiago, Chile)
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      DesertPoint (2016) - Lead Software Developer
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Built startup&apos;s PoC for monitoring truck drivers&apos; work
                      hours in mining industry, preventing fatigue through ETL
                      process and data handling.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Maxis SpA (2013) - CTO & Cofounder
                    </h4>
                    <p className="dark:text-text-secondary text-gray-600">
                      Led website and platform development, managing team of five
                      developers while collaborating with clients and refining
                      specifications.
                    </p>
                  </div>
                  <div className="dark:bg-sand bg-gray-50 p-6">
                    <h4 className="mb-3 font-bold">
                      Scrum S.A. (2010-2013) - From IT Support to Multi-Role
                      Leader
                    </h4>
                    <p className="dark:text-text-secondary mb-3 text-gray-600">
                      Initially hired for basic IT support and infrastructure
                      management, I organically grew into multiple crucial roles
                      as the company evolved. As team members departed, I
                      stepped up to fill critical gaps, ultimately handling:
                    </p>
                    <ul className="dark:text-text-secondary mb-3 list-disc pl-6 text-gray-600">
                      <li>
                        Product Management: Gathering requirements and planning
                        features for our mining software Antara
                      </li>
                      <li>
                        Project Management: Coordinating deliverables and
                        timelines across teams
                      </li>
                      <li>
                        Software Engineering: Developing core components in .NET
                      </li>
                      <li>
                        QA: Establishing testing protocols and quality standards
                      </li>
                      <li>
                        Infrastructure: Maintaining systems and network
                        architecture
                      </li>
                    </ul>
                    <p className="dark:text-text-secondary mb-3 text-gray-600 italic">
                      &quot;What started as basic IT support became a crash course in
                      wearing multiple hats - this role taught me how to adapt
                      quickly and take ownership of whatever needed to be
                      done.&quot;
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="light:bg-gray-100 dark:bg-sand dark:text-text-primary rounded-sm px-3 py-1 text-sm light:text-gray-700">
                        Multi-role Leadership
                      </span>
                      <span className="light:bg-gray-100 dark:bg-sand dark:text-text-primary rounded-sm px-3 py-1 text-sm light:text-gray-700">
                        Product Management
                      </span>
                      <span className="light:bg-gray-100 dark:bg-sand dark:text-text-primary rounded-sm px-3 py-1 text-sm light:text-gray-700">
                        Software Development
                      </span>
                      <span className="light:bg-gray-100 dark:bg-sand dark:text-text-primary rounded-sm px-3 py-1 text-sm light:text-gray-700">
                        Quality Assurance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-accent-blue h-1 w-12" />
              <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
            </div>

            <div className="bg-persgray-50 p-8">
              <p className="mb-6 text-xl">
                Have an interesting project or opportunity? I&apos;d love to hear
                about it.
              </p>
              <Link
                to="/contact"
                className="light:bg-black dark:bg-accent-blue inline-block px-8 py-3 text-white transition-transform hover:translate-y-[-4px]"
              >
                Start a Conversation
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
