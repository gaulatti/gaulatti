# Javier Godoy — Staff Software Engineer

> _"A king without scars is not a King."_

**New York, NY · [gaulatti.com](https://gaulatti.com) · [LinkedIn](https://linkedin.com/in/gaulatti) · jack@gaulatti.com**

---

### About Me

Staff Software Engineer with 15+ years of experience building production systems across healthcare, fintech, media, and e-commerce. My work spans AI infrastructure, developer platforms, distributed systems, and real-time production.

Currently at **Medsender**, building an LLM Gateway, MCP services, developer tooling, and engineering automation. Previously at **Amazon**, **Warner Bros. Discovery (CNN)**, and **Narmi**.

Outside work, I independently design, build, and operate software for newsrooms, broadcasting, and photography, using my own resources. I've completed all academic requirements for the **WGU B.S. in Software Engineering**; degree conferral is pending. Recently earned **CompTIA Project+**.

---

### Experience

| Period                 | Company                              | Role                                    |
| ---------------------- | ------------------------------------ | --------------------------------------- |
| Jul 2026 – Present     | **Medsender**                        | Staff Software Engineer                 |
| Jun 2025 – Mar 2026    | **Narmi**                            | Software Engineer                       |
| Jan 2023 – May 2025   | **Warner Bros. Discovery (CNN)**     | Staff Software Engineer                 |
| Feb 2017 – Jan 2023   | **Amazon**                           | Software Development Engineer           |
| 2010 – 2016           | Various roles                        | Lead/Senior Developer (Chile, Peru, US) |

#### Highlights

**Medsender (Jul 2026 – Present)**

- **AI Infrastructure** — Launched a customer-facing LLM Gateway for production AI workflows and build MCP services to connect tools and systems.
- **Developer Platforms** — Own the developer portal and build AI-assisted review and governance tooling, engineering automation, and deployment safeguards.

**Narmi (Jun 2025 – Mar 2026)**  
Created the original version of **AI DecisionAssist**, using **Anthropic Claude via Amazon Bedrock** to turn identity-verification data into risk assessments and actionable recommendations for account-opening reviewers. Mentored a junior engineer to lead tactical execution while guiding integration strategy and technical direction.

**Warner Bros. Discovery / CNN (Jan 2023 – May 2025)**

- **Design Systems** — Delivered CNN's design system internally with **two engineers in seven months**, avoiding a planned **$3M agency engagement**. Built an automated Figma-to-code pipeline using TypeScript, NestJS, and Style Dictionary.
- **Site Performance** — Built a performance-observability platform combining real-user metrics, Lighthouse CI, and PageSpeed Insights. Drove adoption across Live Story and Politics ahead of the 2024 election and identified livestreaming components as a major performance bottleneck.

**Amazon (Feb 2017 – Jan 2023)**

- **Amazon Explore** — Owned the defect-reduction program, reducing catastrophic session failures from **40% to 1.3% over six months** and clearing the executive launch gate. Built observability using AWS IoT Core and CloudWatch and traced failures across Redux Saga and WebRTC.
- **Alexa Shopping** — Led peak-event readiness across **15 global teams** and improved monitoring after uncovering a silent production outage.
- **Payments** — Launched EBT and HSA/FSA payment support, including eligibility verification, tax allocation, and multi-tender purchase flows.

---

### Volunteering

| Period | Organization | Role |
| ------ | ------------ | ---- |
| Nov 2025 – Present | **ModoItaliano** | Executive Producer |
| Jul 2025 – Present | **fifthbell** | Photographer |
| 2015 – Present | **devsChile** | Huemul Developer |
| Apr 2024 – Apr 2025 | **L Train Brass Band** | Tech Committee Director |
| Oct 2020 – Nov 2021 | **Area Sports Network** | Executive Producer |
| Sep 2019 – Oct 2020 | **Pulso Sports** | Executive Producer |
| Aug – Sep 2019 | **Plataforma Latina Networks** | Founder |
| Dec 2016 – Jul 2018 | **PLAZFER.** | Founding Engineer |
| Jun – Oct 2013 | **Maxis Ltda.** | Founding Engineer |

**ModoItaliano — Sanremo Festival (Feb 2026)**

In February 2026, led technical production and live operations for Sanremo Festival coverage with ModoItaliano, fifthbell, and HNMag across three countries. When the original setup failed, rebuilt the broadcast architecture in approximately three days and ran multi-hour broadcasts with distributed contributors.

---

### Projects

I designed and built these projects independently, using my own resources. Each link opens its architecture, engineering decisions, evidence, and available source or application links.

| Project | Description | Stack |
| ------- | ----------- | ----- |
| **[Mistify](https://gaulatti.com/portfolio/mistify)** | A shared AI service for language detection, translation, classification, clustering, and recorded-media analysis. | Python, FastAPI, gRPC, PyTorch, Redis |
| **[Colombo](https://gaulatti.com/portfolio/colombo)** | A Rust upload gateway that accepts photographs over FTP, FTPS, and HTTP, then delivers them to storage and a newsroom CMS. | Rust, FTP/FTPS, HTTP, AWS S3, PostgreSQL |
| **[Guggiana](https://gaulatti.com/portfolio/guggiana)** | An article-to-audio pipeline coordinating translation, speech synthesis, reusable language renditions, and audio assembly. | AWS Step Functions, Polly, DynamoDB, Python, TypeScript |
| **[Monitor](https://gaulatti.com/portfolio/monitor)** | A workspace for following developing stories, grouping related coverage, and tracking events across multiple feeds. | Rust, React, PostgreSQL, pgvector |
| **[Pompeii](https://gaulatti.com/portfolio/pompeii)** | A shared authentication and authorization service for application permissions, feature flags, and identity management. | Go, APIs, Authorization, Feature flags |
| **[Bleecker](https://gaulatti.com/portfolio/bleecker)** | A React component library with shared typography, design tokens, accessible controls, and application layouts. | React, TypeScript, Design tokens, Accessibility, Storybook |
| **[Alcántara](https://gaulatti.com/portfolio/alcantara)** | A broadcast control surface for graphics, program state, media, and live guest contributions. | React, NestJS, PostgreSQL, SSE, WebRTC |
| **[Alana](https://gaulatti.com/portfolio/alana)** | A headless runtime that renders an Alcántara program and publishes independent RTMP outputs and an optional low-latency feed. | Python, Chromium, FFmpeg, RTMP, LiveKit |
| **[Croccante](https://gaulatti.com/portfolio/croccante)** | An RTMP relay with independently supervised destinations, explicit broadcast lifecycle control, and prepared continuity media. | Python, nginx-rtmp, FFmpeg, RTMP |
| **[Palazzo](https://gaulatti.com/portfolio/palazzo)** | A self-hosted radio controller combining a NestJS API with Liquidsoap and Icecast. | NestJS, Liquidsoap, Icecast, SSE |
| **[Broadway](https://gaulatti.com/portfolio/broadway)** | A template editor with generated forms, live preview, and high-quality image and document exports. | React Router, TypeScript, PNG, Vector PDF |
| **[Cronkite](https://gaulatti.com/portfolio/cronkite)** | A CMS-directed rendering service that turns approved content and presentation manifests into authorized publishing artifacts. | TypeScript, AWS S3, FFmpeg |
| **[Celesti](https://gaulatti.com/portfolio/celesti)** | A channel inventory and display-management platform with service-controlled playback clients. | Go, Kotlin, Jetpack Compose, SSE |

[Explore the full portfolio →](https://gaulatti.com/portfolio)

---

### Skills

**Cloud & Infrastructure**

![Amazon Bedrock](https://img.shields.io/badge/Amazon_Bedrock-FF9900?style=for-the-badge)
![AWS CDK](https://img.shields.io/badge/AWS_CDK-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=awslambda&logoColor=white&style=for-the-badge)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?logo=amazondynamodb&logoColor=white&style=for-the-badge)
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS CloudFront](https://img.shields.io/badge/AWS_CloudFront-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS Cognito](https://img.shields.io/badge/AWS_Cognito-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS RDS](https://img.shields.io/badge/AWS_RDS-527FFF?logo=amazonrds&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![Serverless Framework](https://img.shields.io/badge/Serverless-FD5750?logo=serverless&logoColor=white&style=for-the-badge)

**Frontend & UI**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white&style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white&style=for-the-badge)
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white&style=for-the-badge)
![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white&style=for-the-badge)

**Backend & Systems**

![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white&style=for-the-badge)
![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white&style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?logo=kotlin&logoColor=white&style=for-the-badge)
![Java](https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&style=for-the-badge)
![Spring](https://img.shields.io/badge/Spring-6DB33F?logo=spring&logoColor=white&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)
![gRPC](https://img.shields.io/badge/gRPC-4488CC?logo=grpc&logoColor=white&style=for-the-badge)
![AWS AppSync](https://img.shields.io/badge/AWS_AppSync-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS Step Functions](https://img.shields.io/badge/AWS_Step_Functions-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)

**Broadcast & Media**

![AWS Transcribe](https://img.shields.io/badge/Amazon_Transcribe-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![Amazon Translate](https://img.shields.io/badge/Amazon_Translate-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![Amazon Polly](https://img.shields.io/badge/Amazon_Polly-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS IoT Core](https://img.shields.io/badge/AWS_IoT_Core-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![Redux-Saga](https://img.shields.io/badge/Redux--Saga-999999?logo=redux&logoColor=white&style=for-the-badge)

**Languages:** English (fluent) · Spanish (native) · Italian (intermediate)

---

### Connect

- [Portfolio](https://gaulatti.com)
- [LinkedIn](https://linkedin.com/in/gaulatti)
- jack@gaulatti.com

---
