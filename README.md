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
| Aug – Sep 2019 | **Plataforma Latina Networks** | Executive Producer |
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

**Programming Languages**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-3178C6?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge)
![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white&style=for-the-badge)
![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white&style=for-the-badge)
![Java](https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&style=for-the-badge)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?logo=kotlin&logoColor=white&style=for-the-badge)
![Swift](https://img.shields.io/badge/Swift-3178C6?style=for-the-badge)
![C#](https://img.shields.io/badge/C%23-3178C6?style=for-the-badge)
![Ruby](https://img.shields.io/badge/Ruby-3178C6?style=for-the-badge)
![PHP](https://img.shields.io/badge/PHP-3178C6?style=for-the-badge)
![SQL](https://img.shields.io/badge/SQL-3178C6?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-3178C6?style=for-the-badge)
![CSS](https://img.shields.io/badge/CSS-3178C6?style=for-the-badge)
![Sass](https://img.shields.io/badge/Sass-3178C6?style=for-the-badge)
![QML](https://img.shields.io/badge/QML-3178C6?style=for-the-badge)

![C](https://img.shields.io/badge/C-3178C6?style=for-the-badge)
![C++](https://img.shields.io/badge/C%2B%2B-3178C6?style=for-the-badge)
![Dart](https://img.shields.io/badge/Dart-3178C6?style=for-the-badge)

**Web & Frontend**

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-61DAFB?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-61DAFB?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white&style=for-the-badge)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white&style=for-the-badge)
![Redux-Saga](https://img.shields.io/badge/Redux--Saga-999999?logo=redux&logoColor=white&style=for-the-badge)
![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-61DAFB?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)

![Responsive interfaces](https://img.shields.io/badge/Responsive_interfaces-06B6D4?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-06B6D4?style=for-the-badge)
![Browser performance](https://img.shields.io/badge/Browser_performance-06B6D4?style=for-the-badge)
![Server-rendered and static applications](https://img.shields.io/badge/Server--rendered_and_static_applications-06B6D4?style=for-the-badge)

**Backend & Application Frameworks**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-43853D?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-43853D?style=for-the-badge)
![Django](https://img.shields.io/badge/Django-43853D?style=for-the-badge)
![Flask](https://img.shields.io/badge/Flask-43853D?style=for-the-badge)
![Ruby on Rails](https://img.shields.io/badge/Ruby_on_Rails-43853D?style=for-the-badge)
![Laravel](https://img.shields.io/badge/Laravel-43853D?style=for-the-badge)
![Symfony](https://img.shields.io/badge/Symfony-43853D?style=for-the-badge)
![Doctrine](https://img.shields.io/badge/Doctrine-43853D?style=for-the-badge)
![Spring](https://img.shields.io/badge/Spring-6DB33F?logo=spring&logoColor=white&style=for-the-badge)
![.NET](https://img.shields.io/badge/.NET-43853D?style=for-the-badge)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white&style=for-the-badge)
![gRPC](https://img.shields.io/badge/gRPC-4488CC?logo=grpc&logoColor=white&style=for-the-badge)

![REST APIs](https://img.shields.io/badge/REST_APIs-4488CC?style=for-the-badge)
![Asynchronous processing](https://img.shields.io/badge/Asynchronous_processing-4488CC?style=for-the-badge)
![Background workers](https://img.shields.io/badge/Background_workers-4488CC?style=for-the-badge)

**Native, Mobile & Desktop**

![SwiftUI](https://img.shields.io/badge/SwiftUI-6B57FF?style=for-the-badge)
![iOS](https://img.shields.io/badge/iOS-6B57FF?style=for-the-badge)
![macOS](https://img.shields.io/badge/macOS-6B57FF?style=for-the-badge)
![tvOS](https://img.shields.io/badge/tvOS-6B57FF?style=for-the-badge)
![React Native](https://img.shields.io/badge/React_Native-6B57FF?style=for-the-badge)
![Expo](https://img.shields.io/badge/Expo-6B57FF?style=for-the-badge)
![Flutter](https://img.shields.io/badge/Flutter-6B57FF?style=for-the-badge)
![Android](https://img.shields.io/badge/Android-6B57FF?style=for-the-badge)
![Android TV](https://img.shields.io/badge/Android_TV-6B57FF?style=for-the-badge)
![Jetpack Compose](https://img.shields.io/badge/Jetpack_Compose-6B57FF?style=for-the-badge)
![WinUI 3](https://img.shields.io/badge/WinUI_3-6B57FF?style=for-the-badge)
![Qt Quick](https://img.shields.io/badge/Qt_Quick-6B57FF?style=for-the-badge)

![Cross-platform Components](https://img.shields.io/badge/Cross--platform_Components-6B57FF?style=for-the-badge)
![Platform-specific Interaction](https://img.shields.io/badge/Platform--specific_Interaction-6B57FF?style=for-the-badge)

**AI & Language Processing**

![Anthropic Claude](https://img.shields.io/badge/Anthropic_Claude-D97757?style=for-the-badge)
![Amazon Bedrock](https://img.shields.io/badge/Amazon_Bedrock-FF9900?style=for-the-badge)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-D97757?style=for-the-badge)
![MCP](https://img.shields.io/badge/MCP-D97757?style=for-the-badge)
![PyTorch](https://img.shields.io/badge/PyTorch-D97757?style=for-the-badge)
![Transformers.js](https://img.shields.io/badge/Transformers.js-D97757?style=for-the-badge)

![LLM gateways](https://img.shields.io/badge/LLM_gateways-D97757?style=for-the-badge)
![MCP services](https://img.shields.io/badge/MCP_services-D97757?style=for-the-badge)
![AI-assisted code review and engineering automation](https://img.shields.io/badge/AI--assisted_code_review_and_engineering_automation-D97757?style=for-the-badge)
![Embeddings](https://img.shields.io/badge/Embeddings-D97757?style=for-the-badge)
![Vector search](https://img.shields.io/badge/Vector_search-D97757?style=for-the-badge)
![Semantic clustering](https://img.shields.io/badge/Semantic_clustering-D97757?style=for-the-badge)
![Classification](https://img.shields.io/badge/Classification-D97757?style=for-the-badge)
![Language detection](https://img.shields.io/badge/Language_detection-D97757?style=for-the-badge)
![Translation](https://img.shields.io/badge/Translation-D97757?style=for-the-badge)
![Transcription](https://img.shields.io/badge/Transcription-D97757?style=for-the-badge)
![Speaker diarization](https://img.shields.io/badge/Speaker_diarization-D97757?style=for-the-badge)
![Summarization](https://img.shields.io/badge/Summarization-D97757?style=for-the-badge)

**Databases & Persistence**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-4169E1?style=for-the-badge)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?logo=amazondynamodb&logoColor=white&style=for-the-badge)
![Redis](https://img.shields.io/badge/Redis-4169E1?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-4169E1?style=for-the-badge)
![pgvector](https://img.shields.io/badge/pgvector-4169E1?style=for-the-badge)
![Qdrant](https://img.shields.io/badge/Qdrant-4169E1?style=for-the-badge)

![Relational modeling](https://img.shields.io/badge/Relational_modeling-4169E1?style=for-the-badge)
![Vector storage](https://img.shields.io/badge/Vector_storage-4169E1?style=for-the-badge)
![Caching](https://img.shields.io/badge/Caching-4169E1?style=for-the-badge)
![Durable job state](https://img.shields.io/badge/Durable_job_state-4169E1?style=for-the-badge)
![Conditional writes](https://img.shields.io/badge/Conditional_writes-4169E1?style=for-the-badge)
![Idempotent processing](https://img.shields.io/badge/Idempotent_processing-4169E1?style=for-the-badge)

**AWS & Infrastructure**

![AWS CDK](https://img.shields.io/badge/AWS_CDK-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-FF9900?logo=awslambda&logoColor=white&style=for-the-badge)
![API Gateway](https://img.shields.io/badge/API_Gateway-FF9900?style=for-the-badge)
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS CloudFront](https://img.shields.io/badge/AWS_CloudFront-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS RDS](https://img.shields.io/badge/AWS_RDS-527FFF?logo=amazonrds&logoColor=white&style=for-the-badge)
![ECS/Fargate](https://img.shields.io/badge/ECS%2FFargate-FF9900?style=for-the-badge)
![AWS Cognito](https://img.shields.io/badge/AWS_Cognito-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![SQS](https://img.shields.io/badge/SQS-FF9900?style=for-the-badge)
![SNS](https://img.shields.io/badge/SNS-FF9900?style=for-the-badge)
![AWS Step Functions](https://img.shields.io/badge/AWS_Step_Functions-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS AppSync](https://img.shields.io/badge/AWS_AppSync-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS IoT Core](https://img.shields.io/badge/AWS_IoT_Core-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![CloudWatch](https://img.shields.io/badge/CloudWatch-FF9900?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-FF9900?style=for-the-badge)
![Nginx](https://img.shields.io/badge/Nginx-FF9900?style=for-the-badge)
![Serverless Framework](https://img.shields.io/badge/Serverless-FD5750?logo=serverless&logoColor=white&style=for-the-badge)
![Linux](https://img.shields.io/badge/Linux-FF9900?style=for-the-badge)

**Developer Platforms & Delivery**

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge)

![Developer portals](https://img.shields.io/badge/Developer_portals-2088FF?style=for-the-badge)
![CI/CD](https://img.shields.io/badge/CI%2FCD-2088FF?style=for-the-badge)
![Infrastructure as code](https://img.shields.io/badge/Infrastructure_as_code-2088FF?style=for-the-badge)
![Deployment safeguards](https://img.shields.io/badge/Deployment_safeguards-2088FF?style=for-the-badge)
![Automated review and governance](https://img.shields.io/badge/Automated_review_and_governance-2088FF?style=for-the-badge)
![Release workflows](https://img.shields.io/badge/Release_workflows-2088FF?style=for-the-badge)
![Reusable libraries](https://img.shields.io/badge/Reusable_libraries-2088FF?style=for-the-badge)
![Service integration](https://img.shields.io/badge/Service_integration-2088FF?style=for-the-badge)
![Developer tooling](https://img.shields.io/badge/Developer_tooling-2088FF?style=for-the-badge)

**Architecture & Reliability**

![Distributed systems](https://img.shields.io/badge/Distributed_systems-4A5568?style=for-the-badge)
![Event-driven architecture](https://img.shields.io/badge/Event--driven_architecture-4A5568?style=for-the-badge)
![Real-time systems](https://img.shields.io/badge/Real--time_systems-4A5568?style=for-the-badge)
![Service boundaries](https://img.shields.io/badge/Service_boundaries-4A5568?style=for-the-badge)
![Authentication and authorization](https://img.shields.io/badge/Authentication_and_authorization-4A5568?style=for-the-badge)
![Feature flags](https://img.shields.io/badge/Feature_flags-4A5568?style=for-the-badge)
![Retry and recovery workflows](https://img.shields.io/badge/Retry_and_recovery_workflows-4A5568?style=for-the-badge)
![Concurrency control](https://img.shields.io/badge/Concurrency_control-4A5568?style=for-the-badge)
![Fault isolation](https://img.shields.io/badge/Fault_isolation-4A5568?style=for-the-badge)
![Production debugging](https://img.shields.io/badge/Production_debugging-4A5568?style=for-the-badge)
![Performance optimization](https://img.shields.io/badge/Performance_optimization-4A5568?style=for-the-badge)

**Design Systems**

![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white&style=for-the-badge)
![Figma API](https://img.shields.io/badge/Figma_API-F24E1E?style=for-the-badge)
![Style Dictionary](https://img.shields.io/badge/Style_Dictionary-F24E1E?style=for-the-badge)
![Storybook](https://img.shields.io/badge/Storybook-F24E1E?style=for-the-badge)

![Design tokens](https://img.shields.io/badge/Design_tokens-F24E1E?style=for-the-badge)
![Token generation](https://img.shields.io/badge/Token_generation-F24E1E?style=for-the-badge)
![React component libraries](https://img.shields.io/badge/React_component_libraries-F24E1E?style=for-the-badge)
![Native component catalogs](https://img.shields.io/badge/Native_component_catalogs-F24E1E?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-F24E1E?style=for-the-badge)
![Cross-platform Design Contracts](https://img.shields.io/badge/Cross--platform_Design_Contracts-F24E1E?style=for-the-badge)

**Observability & Quality**

![Datadog RUM](https://img.shields.io/badge/Datadog_RUM-F46800?style=for-the-badge)
![Prometheus](https://img.shields.io/badge/Prometheus-F46800?style=for-the-badge)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge)
![Lighthouse CI](https://img.shields.io/badge/Lighthouse_CI-F46800?style=for-the-badge)
![PageSpeed Insights](https://img.shields.io/badge/PageSpeed_Insights-F46800?style=for-the-badge)

![CloudWatch](https://img.shields.io/badge/CloudWatch-F46800?style=for-the-badge)
![Real-user monitoring](https://img.shields.io/badge/Real--user_monitoring-F46800?style=for-the-badge)
![Operational dashboards](https://img.shields.io/badge/Operational_dashboards-F46800?style=for-the-badge)
![Automated testing](https://img.shields.io/badge/Automated_testing-F46800?style=for-the-badge)
![Integration testing](https://img.shields.io/badge/Integration_testing-F46800?style=for-the-badge)
![Regression testing](https://img.shields.io/badge/Regression_testing-F46800?style=for-the-badge)
![Accessibility verification](https://img.shields.io/badge/Accessibility_verification-F46800?style=for-the-badge)
![Incident diagnosis](https://img.shields.io/badge/Incident_diagnosis-F46800?style=for-the-badge)

**Streaming, Broadcast & Publishing**

![WebRTC](https://img.shields.io/badge/WebRTC-9146FF?style=for-the-badge)
![LiveKit](https://img.shields.io/badge/LiveKit-9146FF?style=for-the-badge)
![RTMP](https://img.shields.io/badge/RTMP-9146FF?style=for-the-badge)
![HLS](https://img.shields.io/badge/HLS-9146FF?style=for-the-badge)
![FFmpeg](https://img.shields.io/badge/FFmpeg-9146FF?style=for-the-badge)
![OBS](https://img.shields.io/badge/OBS-9146FF?style=for-the-badge)
![Chromium](https://img.shields.io/badge/Chromium-9146FF?style=for-the-badge)
![Liquidsoap](https://img.shields.io/badge/Liquidsoap-9146FF?style=for-the-badge)
![Icecast](https://img.shields.io/badge/Icecast-9146FF?style=for-the-badge)
![SSE](https://img.shields.io/badge/SSE-9146FF?style=for-the-badge)
![WebSockets](https://img.shields.io/badge/WebSockets-9146FF?style=for-the-badge)
![Amazon Polly](https://img.shields.io/badge/Amazon_Polly-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![AWS Transcribe](https://img.shields.io/badge/Amazon_Transcribe-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)
![Amazon Translate](https://img.shields.io/badge/Amazon_Translate-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)

![FTP/FTPS ingestion](https://img.shields.io/badge/FTP%2FFTPS_ingestion-FF9900?style=for-the-badge)
![Multi-destination streaming](https://img.shields.io/badge/Multi--destination_streaming-FF9900?style=for-the-badge)
![Broadcast continuity](https://img.shields.io/badge/Broadcast_continuity-FF9900?style=for-the-badge)
![CMS integration](https://img.shields.io/badge/CMS_integration-FF9900?style=for-the-badge)
![Publishing pipelines](https://img.shields.io/badge/Publishing_pipelines-FF9900?style=for-the-badge)
![Image and PDF generation](https://img.shields.io/badge/Image_and_PDF_generation-FF9900?style=for-the-badge)

**Technical Leadership**

![Architecture and technical direction](https://img.shields.io/badge/Architecture_and_technical_direction-4A5568?style=for-the-badge)
![Mentoring](https://img.shields.io/badge/Mentoring-4A5568?style=for-the-badge)
![Cross-team delivery](https://img.shields.io/badge/Cross--team_delivery-4A5568?style=for-the-badge)
![Engineering standards](https://img.shields.io/badge/Engineering_standards-4A5568?style=for-the-badge)
![Launch readiness](https://img.shields.io/badge/Launch_readiness-4A5568?style=for-the-badge)
![Incident coordination](https://img.shields.io/badge/Incident_coordination-4A5568?style=for-the-badge)
![Requirements to Production](https://img.shields.io/badge/Requirements_to_Production-4A5568?style=for-the-badge)

**Languages**

![English — Fluent](https://img.shields.io/badge/English_%E2%80%94_Fluent-4A5568?style=for-the-badge)
![Spanish — Native](https://img.shields.io/badge/Spanish_%E2%80%94_Native-4A5568?style=for-the-badge)
![Italian — Intermediate](https://img.shields.io/badge/Italian_%E2%80%94_Intermediate-4A5568?style=for-the-badge)

---


### Connect

- [Portfolio](https://gaulatti.com)
- [LinkedIn](https://linkedin.com/in/gaulatti)
- jack@gaulatti.com

---
