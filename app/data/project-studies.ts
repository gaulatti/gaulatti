import type { ProjectStudy } from './projects';

/** Curated case studies from owner history and source reviewed on 18 October 2026. */
export const projectStudies: Record<string, ProjectStudy> = {
  croccante: {
    context: [
      'The operating problem is a live publisher losing its uplink while the audience is still watching. A captive portal, a dropped connection, or a restarting encoder should not force every destination to end the show. The relay therefore runs away from the publisher and treats the broadcast session as something longer lived than its incoming network connection.',
      'The same program may go to several platforms. A destination rejecting a connection needs its own retry behavior; restarting the entire fan-out would turn one platform’s failure into an outage for the others.'
    ],
    implementation: [
      'I built the container, private control service, destination resolver, supervisor scripts, durable filler preparation, health checks, telemetry, and media smoke harness. nginx-rtmp receives one program; a separate supervised FFmpeg process copies its encoded audio and video to each selected destination.',
      'The control path is Alcántara → Alana → Croccante. Alcántara chooses the destinations, Alana prepares and coordinates the renderer, and Croccante resolves the exact credential versions and owns the outgoing connections. A publisher can connect while the service is stopped without making anything public.',
      'For continuity, a source image or video is checksum-verified and prepared once against the live H.264/AAC profile. The completed artifact is installed atomically on durable storage. A broadcast binds one immutable filler version, so preparing a replacement cannot silently change an active show.'
    ],
    evidence: [
      'The architecture notes record a real YouTube continuity experiment: the live-to-filler transition had a 0.18-second outbound gap, the return to live had a 2.40-second gap, and one continuous broadcast survived a five-minute publisher absence. These are observations from that experiment, rather than a latency promise for every platform.',
      'The Docker smoke harness uses local RTMP and RTMPS recorders and checks received media bytes, authenticated lifecycle commands, process ownership, and transition gaps. Its five-second transition threshold turns continuity into a regression check rather than a visual assumption.',
      'Health checks reconcile nginx’s publisher view with hook markers and supervisor processes. This catches the case where the ingest port is healthy but a broken hook prevents any media from reaching the outputs. Private metrics expose mode changes, retries, backoff, and filler activity without stream keys or destination URLs.'
    ],
    limitations: [
      'Switching between live input and filler reconnects the outgoing RTMP process. A persistent FIFO-fed output could avoid that reconnect, but would require a different fan-out architecture. The recorded test supported retaining the simpler supervised design; a less tolerant destination would require revisiting it.',
      'The relay copies an already encoded program. Encoding and composition remain Alana’s responsibility. Prepared filler must match the live profile, and an active destination selection stays fixed until an explicit Stop and new Start.',
      'The implementation also accounts for nginx-rtmp’s worker-local stream state, FFmpeg socket timeouts, and the different permissions of nginx hooks and root-owned relay processes. A native I/O shim keeps resolved publish URLs out of FFmpeg process arguments.'
    ],
    references: [
      {
        label: 'Architecture, tradeoffs, and measured continuity',
        href: 'https://github.com/gaulatti/croccante/blob/ac192a62fb8af0b1b1e4b7a685c4f0dc0b2ad9c2/docs/architecture.md'
      },
      {
        label: 'Media and lifecycle smoke harness',
        href: 'https://github.com/gaulatti/croccante/blob/ac192a62fb8af0b1b1e4b7a685c4f0dc0b2ad9c2/test/smoke.sh'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Prepare the session',
          description:
            'Resolve the complete destination selection and verify a ready filler version before opening outputs. A failed preparation leaves the session stopped.'
        },
        {
          title: 'Start deliberately',
          description:
            'An authenticated, idempotent command opens the session. Increasing command sequences prevent a delayed Start from overriding a newer Stop.'
        },
        {
          title: 'Supervise each destination',
          description:
            'Each destination moves through waiting, relaying, filler, and retry backoff independently. Fast repeated failures back off; healthy destinations continue.'
        },
        {
          title: 'Survive publisher loss',
          description:
            'After live media has appeared, loss of the publisher selects prepared filler until it returns. Losing media or the control connection never means Stop.'
        },
        {
          title: 'Stop explicitly',
          description:
            'Stop terminates every outgoing publisher, removes resolved destination state, and returns supervisors to idle without restarting the container.'
        }
      ]
    }
  },
  alana: {
    context: [
      'A television program is more than an encoder process. It combines rendered graphics, audio, optional low-latency return video, recordings, and public delivery. These outputs need clear ownership so a failed recorder or destination does not unnecessarily take the entire program off air.',
      'Alana replaces the earlier description of this project as an OBS container. Its responsibility is to render Alcántara’s composed Program headlessly and supervise publication, while Palazzo handles radio and Croccante handles public relay continuity.'
    ],
    implementation: [
      'I built the runtime around Chromium, a virtual display, PulseAudio, FFmpeg, and an optional LiveKit publisher. Browser and audio capture are shared inputs; output encoders, progress tracking, watchdogs, restart budgets, and health state are isolated by output.',
      'The private control service persists requested and actual lifecycle state. Start first establishes local readiness, then obtains an exact matching Croccante acknowledgement. Stop waits for the relay’s acknowledgement before removing local output. A downstream failure remains visible as degraded state rather than being turned into an apparently successful Stop.',
      'I also added an independent recorder for the composed program. Closed Matroska segments have checksums and media manifests; finalization verifies them and remuxes a final MP4 without another encode. Disk quotas, free-space reserves, restart limits, and recording failures affect the recorder rather than the live program.'
    ],
    evidence: [
      'The repository documents command replay, out-of-order sequences, downstream acknowledgement mismatches, process stalls, and restart reconciliation as explicit runtime cases. Recording checks cover segment validation, finalization, bounded retries, and low-disk conditions.',
      'A completed recording requires both valid audio/video streams and a checksum-verified final file. A requested operation or a finalizing file is not advertised as reusable media. This contract is also consumed by Alcántara’s recording controls and Broadway’s excerpt-draft work.'
    ],
    limitations: [
      'Composition is shared, but each concurrent output still needs encoding and network capacity. The recorder has its own CPU and disk cost even though its failures are isolated.',
      'LiveKit is optional and consumes no publisher resources when disabled. Radio is outside this runtime. Alana forwards public-destination references but does not resolve platform stream keys.'
    ],
    references: [
      {
        label: 'Runtime, lifecycle, and recording contracts',
        href: 'https://github.com/gaulatti/alana/blob/fcc1ec29a4239631d7fb146b2d9ea905103aa0f2/README.md'
      },
      {
        label: 'Independent recording supervisor',
        href: 'https://github.com/gaulatti/alana/blob/fcc1ec29a4239631d7fb146b2d9ea905103aa0f2/recording.py'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Render one program',
          description: 'A program-scoped runtime opens the authorized renderer in Chromium and captures its display and mixed audio.'
        },
        {
          title: 'Publish isolated outputs',
          description:
            'RTMP encoders and the optional LiveKit leg have separate process supervision and recovery. A failed leg cannot restart the others.'
        },
        {
          title: 'Coordinate public delivery',
          description:
            'Alana passes an immutable destination selection and prepared filler version to Croccante, then checks the returned version, hash, count, and IDs.'
        },
        {
          title: 'Record separately',
          description:
            'An explicitly started recorder consumes the composed display and audio, persists closed segments, and produces a verified final artifact after Stop.'
        },
        {
          title: 'Reconcile after restart',
          description:
            'Durable lifecycle state restores intent; current process and relay observations determine whether the requested program is actually running.'
        }
      ]
    }
  },
  alcantara: {
    context: [
      'I built Alcántara as the operator’s control plane for television, radio, and simulcast. The important distinction is between preparing something and putting it on air: editing a scene, inviting a guest, or opening the console must not silently change Program.',
      'The radio workflow grew from the same operational need. A continuous filler rotation should keep running without 24 artificial hourly schedules, while timed content blocks take over deliberately and hand control back predictably. The interface has to show what the engines actually did, not just the last button pressed.'
    ],
    implementation: [
      'I designed and built the React operator console, NestJS/Fastify backend, PostgreSQL model, authorization boundaries, media library integration, and machine contracts with Alana and Palazzo. Preview and Program have separate state; CUT, TAKE, and explicit lifecycle commands control what reaches air.',
      'The guest-contribution system provides six reusable slots, private invitations, device checks, short-lived room credentials, reconnect leases, producer cues, and private talkback. Layouts reference a stable slot rather than a person, so replacing a guest does not require rebuilding scenes. A guest reaches Program only through the normal switcher workflow.',
      'For radio I implemented continuous rotation, optional timed rundowns, tag-assisted draft generation, cue-specific browser voice tracks, mixer control, and output confidence. Playback advances on Palazzo’s authoritative end events. Preview generation, saving, checking, and publication remain distinct steps.'
    ],
    evidence: [
      'The retained radio work documents an actual integration problem: a one-use audio-monitor grant failed when a browser probed or reconnected to the media URL. The revised contract allows a bounded connection/reconnection window while retaining program scope and avoiding login tokens in the media URL.',
      'The local stack supplies PostgreSQL, migrations, fictional programs, guarded test authentication, LiveKit, and a machine-contract fixture. It exercises normal ownership and permission paths without publishing to real destinations. The repository also includes interaction fixtures for TV, radio, simulcast, and safety states.',
      'Guest return audio uses a separate mix-minus route for each guest, excluding that guest’s own microphone. Producer talkback is confined to its intended return path rather than being mixed into Program.'
    ],
    limitations: [
      'A connected stream and detected engine audio are different observations. Output-confidence samples can become stale; a level check does not by itself prove listener-side reception.',
      'Timed rundowns require the backend to be available at the scheduled start. Ambiguous starts are surfaced rather than blindly replayed. External source ingestion and renderer migrations have their own rollout gates; a documented design is not automatically a completed cutover.'
    ],
    references: [
      {
        label: 'Operator console and guest contribution',
        href: 'https://github.com/gaulatti/alcantara/blob/43190938039d975f83751efddde20fc1e23456b0/README.md'
      },
      {
        label: 'Continuous radio and timed rundown workflow',
        href: 'https://github.com/gaulatti/alcantara/blob/43190938039d975f83751efddde20fc1e23456b0/docs/radio-station-workflow.md'
      },
      {
        label: 'Destination authority and recovery',
        href: 'https://github.com/gaulatti/alcantara/blob/43190938039d975f83751efddde20fc1e23456b0/docs/broadcast-destinations.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Prepare off air',
          description: 'Create scenes, select media, prepare guest slots, and stage Preview without mutating Program.'
        },
        {
          title: 'Authorize a command',
          description:
            'Backend permissions distinguish viewing, operating, and managing destination configuration. A Start snapshots the exact selection and credential references.'
        },
        {
          title: 'Execute through the right engine',
          description:
            'Television commands go through Alana to Croccante; radio commands go to Palazzo. Simulcast exposes the state of each leg.'
        },
        {
          title: 'Receive authoritative feedback',
          description:
            'SSE and engine lifecycle observations update now-playing, requested/actual state, output confidence, and degraded conditions.'
        },
        {
          title: 'Monitor the encoded output',
          description:
            'The Radio desk receives Icecast audio through Palazzo and Alcántara’s backends. Listening and monitor volume affect only the operator’s device.'
        }
      ]
    }
  },
  palazzo: {
    context: [
      'Palazzo is the execution engine underneath the radio desk. A station’s listener stream needs to remain available while program automation starts, stops, changes songs, or reconnects to its controller. Treating every automation Stop as an Icecast shutdown would turn a routine operator action into a listener interruption.',
      'Another difficult boundary is a recorded introduction that belongs to one particular song. Network retries, queue timing, or a failing asset must not cause that introduction to play over the previous track or be scheduled twice.'
    ],
    implementation: [
      'I built a single-container service combining a NestJS control API, a supervised Liquidsoap process, and Icecast. The private API owns readiness, song/instant requests, applied mixer state, durable idempotency, and replay-safe playback events. The public listener mount is kept separate from those machine controls.',
      'Before replacing a song, the service probes real audio packets and validates the media. It reserves the command durably, preloads a recorded intro, and arms that intro for the exact parent playback ID. Liquidsoap releases it only when the matching song starts. The intro can duck and fade the song while manual jingles remain on a separate bus.',
      'I separated transport health from automation state and playback truth. On restart the engine requires reconciliation; a running container cannot stand in for confirmation that an earlier Start succeeded. Stop flushes song, intro, and instant queues, waits for observed idle, and leaves the continuous listener transport connected.'
    ],
    evidence: [
      'The program-scoped playout contract includes duplicate commands, restarts, preflight failures, intro degradation, and control/telemetry outages. The durable journal preserves command identity across a process or container restart.',
      'The output-monitor integration forwards encoded Icecast bytes incrementally through the private backend path. Closing an operator’s monitor connection closes that relay connection without stopping broadcast playback.',
      'Levels, positions, heartbeats, dependency readiness, and bounded failure outcomes provide separate evidence about audio production and control health. Those observations feed Alcántara’s now-playing and output-confidence surfaces.'
    ],
    limitations: [
      'Queue exhaustion, silence, or loss of the controller does not invent an explicit Stop. Requested automation and actual dependency state can differ, and degraded state remains visible.',
      'Palazzo executes playout; Alcántara owns scheduling and operator intent. Source validation can reject corrupt or unreachable media, but it cannot establish editorial suitability or perceptual quality.'
    ],
    references: [
      {
        label: 'Atomic playout and durable command identity',
        href: 'https://github.com/gaulatti/palazzo/blob/932512de5c7de435d752be0cc37b7de13b20e0fe/docs/program-playout.md'
      },
      {
        label: 'Automation versus continuous transport',
        href: 'https://github.com/gaulatti/palazzo/blob/932512de5c7de435d752be0cc37b7de13b20e0fe/docs/broadcast-lifecycle.md'
      },
      {
        label: 'Playback telemetry and audio return',
        href: 'https://github.com/gaulatti/palazzo/blob/932512de5c7de435d752be0cc37b7de13b20e0fe/README.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Preflight upcoming media',
          description:
            'Validate format, codec, duration, channels, and the presence of decodable audio before changing the current playout.'
        },
        {
          title: 'Reserve one operation',
          description:
            'Persist the idempotency key and semantic request. A retry reuses the original playback IDs; a different request cannot reuse the same key.'
        },
        {
          title: 'Coordinate song and intro',
          description:
            'Arm the intro against its parent song, then replace the song. An invalid song rejects the operation; an unavailable intro follows the explicit song-only policy.'
        },
        {
          title: 'Report engine truth',
          description: 'Playback IDs travel through Liquidsoap telemetry, authoritative snapshots, and replay-safe SSE events.'
        },
        {
          title: 'Preserve transport',
          description: 'Automation lifecycle changes queues and program state while Liquidsoap and the Icecast mount remain running.'
        }
      ]
    }
  },
  mistify: {
    context: [
      'The editorial system needs the same language and content operations in several places: understanding incoming feeds, relating coverage about the same event, translating material, and working with recorded media. I built a shared service so these capabilities do not become separate model integrations inside every application.',
      'The hard problem is not exposing a model behind an endpoint. It is making expensive, asynchronous analysis recoverable and making the result useful to an editorial workflow. A restarted worker, an unavailable consumer, or uncertain speaker attribution must not quietly become a lost job or a fabricated answer.'
    ],
    implementation: [
      'I built independent HTTP helpers and a composable gRPC analysis path around FastText, transformer classifiers and translation models, sentence embeddings, and clustering logic. Monitor supplies its taxonomy and consumes the analysis; the service owns model execution and reusable processing.',
      'The asynchronous worker uses a Redis-backed pending/in-flight lifecycle. An operation is removed only after its callback is acknowledged. Interrupted work is recovered, and exhausted callback delivery returns the original job to pending. This is at-least-once delivery, so consumers must recognize repeated results.',
      'The recorded-media extension persists probe, transcription, diarization, and summary stages independently. It validates immutable source checksums, timecoded results, speaker uncertainty, and citations back to the transcript. Successful stages can be reused after a restart instead of paying for the complete pipeline again.'
    ],
    evidence: [
      'The recorded-media fixture path exercises HTTP validation, probing, Redis persistence, worker retries, cancellation, provenance, and metrics without downloading production model weights. These checks establish orchestration behavior, not real-model accuracy.',
      'The earlier clustering investigation compared semantic same-event decisions with deterministic embedding/community behavior. The conclusion was to retain explicit provider routing and require labeled event pairs and communities before claiming one model was better. More or fewer clusters alone was not treated as an accuracy result.',
      'Queue depth, callback outcomes, stage failures, and model-resource metrics make it possible to distinguish slow inference from failed delivery or unavailable dependencies.'
    ],
    limitations: [
      'The recorded-media processor seam is intentionally unavailable until an appropriate pinned adapter is configured. Production transcription, diarization, and summarization quality still need representative benchmarks; the durable API does not establish that model acceptance.',
      'Text and media operations have different availability and authorization boundaries. The combined analysis operation is gRPC, not an invented HTTP analyze endpoint. Translation, embeddings, categories, urgency, and clustering remain distinct capabilities.'
    ],
    references: [
      {
        label: 'Text services and asynchronous delivery',
        href: 'https://github.com/gaulatti/mistify/blob/b3e656d7f3cb7c11faea792665f4ad88c7585631/README.md'
      },
      {
        label: 'Durable media stages, provenance, and limits',
        href: 'https://github.com/gaulatti/mistify/blob/b3e656d7f3cb7c11faea792665f4ad88c7585631/MEDIA_OPERATIONS.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Accept bounded input',
          description:
            'Text helpers accept their operation-specific input. Recorded media is structurally probed and checksummed before expensive work is queued.'
        },
        {
          title: 'Execute reusable analysis',
          description:
            'Language, classification, translation, embedding, and clustering can run independently or through a combined gRPC operation.'
        },
        {
          title: 'Persist progress',
          description: 'Workers record operation and stage state before and after execution so recovery can skip completed work.'
        },
        {
          title: 'Deliver with acknowledgement',
          description:
            'Callbacks are retried and recovered rather than treated as fire-and-forget. Duplicate results retain their operation identity.'
        },
        {
          title: 'Return evidence-aware output',
          description:
            'Media results carry timecodes and model provenance; unknown speakers and unsupported summary citations remain explicit.'
        }
      ]
    }
  },
  colombo: {
    context: [
      'Photographs often originate from equipment and networks that cannot participate in a modern browser upload flow. Cameras still use FTP, connections drop, and the newsroom CMS or storage can be temporarily unavailable. I wanted a gateway that accepts the equipment photographers already use while giving clients an honest, recoverable delivery contract.',
      'An upload acknowledgement is therefore a durability boundary. It cannot mean the gateway merely received some bytes in memory, and it cannot imply that storage delivery and newsroom confirmation have already finished.'
    ],
    implementation: [
      'I rewrote the gateway as one Rust process supporting FTP, explicit FTPS, and HTTP, with PostgreSQL tenant lookup and CMS-issued assignment/storage authority. Session credentials stay isolated even when multiple camera connections use the same username.',
      'Before returning success, the service hashes and fsyncs the file and its private operation context into an atomically installed spool entry. Fixed workers recover accepted and interrupted entries after restart. Stable storage keys and persisted delivery state separate S3 work from CMS notification retries.',
      'I also built durable receipts for mobile reconciliation, credential refresh within the upload budget, bounded retention, passive-port handling for camera clients, structured metrics, and local CMS/storage fixtures. The prior Java service remains available as a historical implementation.'
    ],
    evidence: [
      'The repository contains protocol and container checks around durable acceptance, tenant isolation, callback retries, credential failures, receipt semantics, and real FTP/FTPS behavior. One compatibility fix retires an old passive endpoint before issuing a replacement, matching persistent camera behavior.',
      'An operational investigation found that scanning 6,630 retained spool records every second consumed roughly 9.8–13% of one CPU core in the observed setup. The scheduler was changed to track pending work in memory and scan retained records once per minute. The regression checks the scheduling cadence; that investigation did not by itself prove the eventual production CPU reduction.',
      'A stalled FTP transfer does not hold a shared session lock while waiting for its data socket. Disconnect cleanup for one camera therefore does not prevent another connection from receiving a greeting.'
    ],
    limitations: [
      'Acceptance promises recoverable delivery work, not completed delivery. S3 and callbacks have separate bounded retry budgets; expired authority can be refreshed, while denied authority or a changed assignment is terminal.',
      'The durable spool depends on correctly provisioned storage. The HTTP multipart size boundary includes framing overhead, and a mobile client must keep an accepted operation’s receipt rather than starting a duplicate upload when a status request fails.'
    ],
    references: [
      {
        label: 'Durable upload and receipt contract',
        href: 'https://github.com/gaulatti/colombo/blob/6ad0092062cd0f7094e9aefe74c2979678c512ee/README.md'
      },
      {
        label: 'Upload worker and retained-spool scheduling',
        href: 'https://github.com/gaulatti/colombo/blob/6ad0092062cd0f7094e9aefe74c2979678c512ee/src/upload.rs'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Resolve the assignment',
          description:
            'Identify the tenant and validate the supplied credential with its CMS, obtaining an assignment and short-lived storage authority.'
        },
        {
          title: 'Accept durably',
          description:
            'Hash and persist the file and operation context. Only then return FTP success or HTTP acceptance with an operation ID.'
        },
        {
          title: 'Deliver independently',
          description: 'Upload to a stable S3 object and persist that result before attempting the newsroom callback.'
        },
        {
          title: 'Reconcile the receipt',
          description:
            'Expose accepted, uploading, delivered, callback-confirmed, failed, and expired states without returning storage secrets or internal paths.'
        },
        {
          title: 'Recover and retain',
          description:
            'Restart-safe workers resume eligible work; terminal receipts remain available for reconciliation and are later retained or expired explicitly.'
        }
      ]
    }
  },
  guggiana: {
    context: [
      'An article can become an accessible audio rendition in several languages, but generating every language for every article wastes translation and synthesis work when most variants are never requested. Guggiana treats each language rendition as a reusable artifact with its own lifecycle.',
      'The project also separates a second question: which speech engine should produce that artifact? Changing providers requires evidence about voice quality, locale support, licensing, and operating cost, rather than replacing a service name in the workflow.'
    ],
    implementation: [
      'I built the TypeScript/CDK workflow around Step Functions, Lambda, DynamoDB, S3, translation, Polly synthesis, and final audio assembly. Article metadata and per-language state connect retrieval to asynchronous processing and stored output.',
      'For lazy renditions, an explicit request grows the article’s requested-language set. A stream-triggered worker claims each missing locale with one conditional DynamoDB write and starts its workflow. Concurrent callers reuse a live claim or an existing artifact instead of starting duplicate synthesis. A failed start releases that locale for retry without affecting other languages.',
      'I added a provider-neutral speech contract and a separate local worker/experiment path. Documents use plain text and explicit pauses; provider adapters own engine-specific markup. Artifacts record model revision, format, duration, locale, and checksum so evaluation and later reuse have a reproducible basis.'
    ],
    evidence: [
      'The lazy-rendition contract identifies cache hits, concurrent reuse, actual workflow starts, and failed starts separately. This measures avoided work against the earlier behavior of launching all five supported languages, without inventing a dollar-saving percentage.',
      'The speech bake-off defines 20 fixtures, explicit evidence states, objective measurements, optional local ASR diagnostics, and a randomized reviewer packet. The local worker has fake-engine lifecycle/protocol checks so retries, cancellation, normalization, and artifact behavior can be verified independently of subjective voice quality.'
    ],
    limitations: [
      'The neutral speech contract and local synthesis worker are not yet the deployed Step Functions default. Adopting a different provider remains a separate quality, exact-locale, licensing, and operational decision.',
      'The existing request that omits language selection retains its all-language behavior. Cost avoidance therefore depends on callers making explicit requests; the new code does not reinterpret older clients silently.'
    ],
    references: [
      {
        label: 'Concurrency and avoided synthesis work',
        href: 'https://github.com/gaulatti/guggiana/blob/5ddfd29b30bbb7246150d145288756e3745f7733/docs/lazy-language-renditions.md'
      },
      {
        label: 'Provider-neutral speech boundary',
        href: 'https://github.com/gaulatti/guggiana/blob/5ddfd29b30bbb7246150d145288756e3745f7733/docs/speech-synthesis-contract.md'
      },
      {
        label: 'Speech evaluation experiment',
        href: 'https://github.com/gaulatti/guggiana/blob/5ddfd29b30bbb7246150d145288756e3745f7733/experiments/tts-bakeoff/README.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Request only needed locales',
          description:
            'Resolve a single locale, a subset, or an explicit all-language request without expanding a specific request into unnecessary work.'
        },
        {
          title: 'Claim missing renditions',
          description:
            'Conditional per-locale writes serialize concurrent demand; abandoned claims expire and successful artifacts are reused.'
        },
        {
          title: 'Orchestrate production stages',
          description: 'Step Functions coordinates article preparation, translation, speech synthesis, callbacks, and final assembly.'
        },
        {
          title: 'Persist reusable artifacts',
          description:
            'DynamoDB tracks progress and S3 holds output. A later request for an existing rendition avoids translation and synthesis.'
        },
        {
          title: 'Evaluate alternative engines separately',
          description:
            'Pinned Chatterbox/Piper/Polly experiments and an optional local worker share a neutral contract without changing the deployed provider.'
        }
      ]
    }
  },
  monitor: {
    context: [
      'Monitor is the editorial discovery workspace in a larger newsroom workflow. Feed items, earthquakes, and related coverage need to become a usable picture of an event rather than a collection of disconnected links. The editor needs to compare sources while the story is still developing.',
      'That puts two kinds of uncertainty in the same interface: a changing real-world event and asynchronous machine analysis. I keep source content, enrichment, event grouping, and editorial decisions distinguishable so a model result does not become an unreviewed publication decision.'
    ],
    implementation: [
      'I built a Rust backend and React workspace around PostgreSQL and pgvector, authenticated ingestion, analysis callbacks, event relationships, and real-time feeds. PostgreSQL holds authoritative relational and vector state; the older Qdrant path is a migration compatibility concern rather than the primary persistence model.',
      'Merriman handles feed delivery and editorial extraction/synthesis, Mistify supplies language and semantic helpers, and the editorial CMS owns drafts, review, scheduling, and publication authority. Monitor’s job is discovery and organization; it does not duplicate the complete CMS or publishing engine.',
      'The clustering provider experiment uses stable per-post assignment so retries stay with the same provider. Candidate retrieval and event persistence remain shared, allowing semantic same-event evaluation without rewriting the ingestion and editorial models.'
    ],
    evidence: [
      'The PostgreSQL-backed provider experiment exercised candidate retrieval, a stubbed semantic response, and event persistence, including an error path that did not silently switch back to a different provider. The source record describes local integration evidence, not a completed production A/B quality result.',
      'The native newsroom work carries Monitor into a shared macOS application alongside the editorial workspace while keeping product sessions and lifecycles separate. The same editorial model therefore informs both browser and native operating surfaces.'
    ],
    limitations: [
      'Same-event quality needs labeled pairs and final event communities. Cluster counts, a few compelling examples, or a model’s confidence are not enough to establish editorial recall or precision.',
      'The implementation source is not linked from this page. Deployment, provider routing, and completed editorial acceptance are separate from the architecture described here.'
    ],
    references: [],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Ingest source material',
          description:
            'Receive feeds and bounded server integrations, preserving source identity and persistence independently of enrichment.'
        },
        {
          title: 'Enrich asynchronously',
          description: 'Request language, category, embedding, and clustering work and process acknowledged results.'
        },
        {
          title: 'Organize developing events',
          description: 'Relate posts to events and expose live columns and event views for editorial inspection.'
        },
        {
          title: 'Hand off deliberately',
          description:
            'Selected material enters a separate drafting/review workflow. Discovery and model analysis do not grant publication authority.'
        }
      ]
    }
  },
  cronkite: {
    context: [
      'A publishing system must turn approved editorial content into pages and artifacts without acquiring the authority to decide what should be published. I separated the CMS’s content and workflow decisions from the renderer’s responsibility for producing and delivering bytes.',
      'The work includes tenant-specific presentation packages, declared system pages, article output, and media-collection surfaces. A real gallery repair exposed why route configuration, a template manifest, authorization to write the output, and the output object itself are separate pieces of a successful publication.'
    ],
    implementation: [
      'I built the rendering/distribution service and its contract with the CMS and presentation packages. The CMS supplies a canonical document and exact signed write targets. A package manifest declares the renderable and its presentation needs; Cronkite validates the request, renders the artifact, executes the authorized writes, and returns receipts.',
      'The current boundary removes autonomous feed discovery and hidden publication cascades. Startup loads and validates enabled presentation packages but does not publish pages. The CMS owns editorial status, retries after process exit, social composition/posting, and durable receipt reconciliation.',
      'I also worked on tenant isolation, standalone/system pages, shared media galleries, and immutable program-renderer registration. These are contract and deployment problems as much as template problems: a renderer cannot safely invent bucket authority or publish undeclared output.'
    ],
    evidence: [
      'The media-gallery investigation separated a deployed routing change from an absent HTML object. Package declaration and signed-target permissions were prepared and tested, while configuration/release/cutover remained explicit follow-up work. That distinction prevents a successful build from masquerading as a completed publication.',
      'The CMS ownership contract documents request validation, tenant boundaries, declared output scope, and receipt semantics. It also records the tradeoff that an invalid enabled presentation package blocks startup.'
    ],
    limitations: [
      'Editorial workflow, social-provider credentials, and publication scheduling remain CMS-owned. Older descriptions that imply Cronkite autonomously polls and posts content are too broad for the current contract.',
      'Loading a package, releasing that package, deploying the renderer, authorizing a target, and verifying the final page are separate delivery steps. Private implementation and tenant configuration are not exposed here.'
    ],
    references: [],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Authorize content and scope',
          description: 'The CMS chooses the canonical content version and the exact renderable/output targets.'
        },
        {
          title: 'Load a declared presentation',
          description: 'Cronkite validates the tenant’s presentation package and manifest rather than discovering work implicitly.'
        },
        {
          title: 'Render and write',
          description: 'The renderer produces bytes and uses only the caller-authorized HTTP write operations.'
        },
        {
          title: 'Return authoritative receipts',
          description: 'The CMS persists outcomes and decides whether and how to retry or progress the editorial workflow.'
        }
      ]
    }
  },
  bleecker: {
    context: [
      'A portfolio of operational products quickly becomes expensive to maintain if each application implements its own tables, dialogs, navigation, themes, and typography. I built Bleecker as the shared web foundation for those products, including this website, rather than treating visual consistency as an application-by-application exercise.',
      'The design system also provides contracts that native libraries can implement. Sharing semantic names and tokens matters; forcing a native platform to import browser code does not.'
    ],
    implementation: [
      'I designed the visual language and built the React components, layout primitives, theme system, bundled typography, Storybook fixtures, and platform-neutral token/contract exports. Canonical TypeScript token data generates the CSS layer and provides shared inputs to the sibling implementations.',
      'The library includes operational layouts and continuously updated feed primitives, not just isolated buttons. Attention surfaces use a continuous intensity model, while applications own the domain meaning of that intensity. Form and overlay components own focus, label relationships, controlled state, and dismissal behavior.',
      'I keep renderer-neutral exports dependency-light so native consumers can reuse vocabulary without loading the DOM, CSS, Radix, or chart implementation. Hand-authored components retain their platform behavior even when consuming generated conformance artifacts.'
    ],
    evidence: [
      'The controlled Select reset work checks the parent value, placeholder, native form value, and actual submitted data together. The modal lifecycle work covers mounted focus, Tab containment, nested dismissal, and focus/scroll restoration.',
      'The build checks generated tokens for drift. A separate conformance proof consumes a pinned neutral artifact without overwriting the existing components; unsupported behavior stays explicit rather than being counted as complete parity.'
    ],
    limitations: [
      'Application labels, page structure, and complete product workflows still need application-level accessibility testing. A component library can supply good primitives without proving every consumer is accessible.',
      'Tailwind consumers compile the shared styling with their utilities; non-Tailwind consumers use the packaged stylesheet. Loading both compiled utility layers can change responsive behavior through the cascade.'
    ],
    references: [
      {
        label: 'Shared foundations and browser behavior',
        href: 'https://github.com/gaulatti/bleecker/blob/cb891040bb40fa5668a7ccb851681396620b4d11/README.md'
      },
      {
        label: 'Controlled theme ownership',
        href: 'https://github.com/gaulatti/bleecker/blob/cb891040bb40fa5668a7ccb851681396620b4d11/docs/controlled-theme.md'
      },
      {
        label: 'Modal focus and dismissal',
        href: 'https://github.com/gaulatti/bleecker/blob/cb891040bb40fa5668a7ccb851681396620b4d11/docs/modal-keyboard-lifecycle.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Define a shared vocabulary',
          description: 'Canonical tokens and component contracts define semantic roles, variants, and visual foundations.'
        },
        {
          title: 'Render for the web',
          description: 'React components and layout patterns turn those contracts into accessible browser behavior.'
        },
        {
          title: 'Verify complete interactions',
          description:
            'Storybook compositions and interaction fixtures exercise state, focus, reset, nested overlays, themes, and responsive layouts.'
        },
        {
          title: 'Consume through public boundaries',
          description:
            'Applications use stable package entry points; native siblings reuse the neutral leaf exports rather than web renderers.'
        }
      ]
    }
  },
  sabella: {
    context: [
      'Apple applications need to look related to the web products while behaving like native macOS, iPhone, iPad, and television software. Keyboard focus, pointer input, Dynamic Type, safe areas, and remote navigation cannot be reduced to a CSS translation.',
      'I use Sabella as the native presentation foundation for newsroom and television clients. The package owns reusable interaction and presentation; the consuming application retains product state, identity, and service calls.'
    ],
    implementation: [
      'I built SwiftUI components, semantic contract enums, token mappings, packaged font registration, application shells, and native component catalogs. Platform-specific implementations share the design language without pretending that a television screen is a desktop component grid.',
      'The tvOS surface adds editorial shelves, channel guides, remote focus, playback overlays, and native live playback. It exposes semantic playback activity so a consumer can distinguish advancing media from buffering, failure, or a request to play.',
      'The package keeps catalogs and development examples outside the library product. Release checks include a clean consumer so a successful package build is not the only evidence that downstream applications can import it.'
    ],
    evidence: [
      'The catalog coverage gate discovers public component/style APIs and compares them with registered fixtures. A deliberately missing fake component proves that omitted coverage can fail the gate.',
      'The bounded primary-button conformance proof records deterministic mappings and platform exceptions. Native accessibility and input stay with Sabella rather than being inferred from a neutral schema.'
    ],
    limitations: [
      'Shared API names do not establish complete visual or behavioral parity across platforms. Each platform has its own acceptance surface.',
      'Live-player state can report advancing media, but a product still owns channel identity, service authorization, viewing attribution, and device operations.'
    ],
    references: [
      {
        label: 'Native catalogs and package boundary',
        href: 'https://github.com/gaulatti/sabella/blob/f5ac479bfceaa7eab23c1716ac47420ac53dae25/README.md'
      },
      {
        label: 'Component parity record',
        href: 'https://github.com/gaulatti/sabella/blob/f5ac479bfceaa7eab23c1716ac47420ac53dae25/PARITY.md'
      },
      {
        label: 'Television presentation and focus',
        href: 'https://github.com/gaulatti/sabella/blob/f5ac479bfceaa7eab23c1716ac47420ac53dae25/docs/tvos-design.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Map shared design contracts',
          description: 'Tokens and semantic variants become Swift values while SwiftUI owns native rendering.'
        },
        {
          title: 'Adapt interaction to the device',
          description:
            'macOS uses pointer/keyboard patterns, touch devices use safe-area-aware navigation, and tvOS uses remote focus and playback patterns.'
        },
        {
          title: 'Exercise native catalogs',
          description: 'Dedicated platform catalogs provide the reference surface for appearance, state, Dynamic Type, and interaction.'
        },
        {
          title: 'Verify the consumed package',
          description: 'A separate application imports the library product without depending on its catalog or sibling source tree.'
        }
      ]
    }
  },
  orchard: {
    context: [
      'Orchard brings the same design language to native Windows applications using WinUI 3. The difficult work is matching semantics and visual detail while preserving Windows focus, automation, high-contrast, pointer, and packaging behavior.',
      'The component catalog is also a working acceptance environment. A screenshot by itself cannot establish that a control keeps consumer state, receives physical input, or remains correct after loading and reparenting.'
    ],
    implementation: [
      'I built the C#/WinUI component library, generated token resources, theme mappings, bundled fonts, native catalog, and independent package-consumer checks. Consumer-owned records and content flow into tables, charts, navigation, forms, and layout patterns.',
      'The capture/verification tooling checks rendered pixels alongside input gates and protected glyph references. Performance work in capture persistence retains exact output while reducing avoidable conversion buffers and garbage collection, rather than changing the acceptance threshold.',
      'Native lifecycle cases include chart focus arriving before Loaded, stale focus notifications after reparenting, and template/content identity across reloads. These cases belong to the component contract, not only to a static visual sample.'
    ],
    evidence: [
      'The architecture notes retain paired capture-persistence checks for opaque and transparent images, byte-for-byte PNG/RGBA comparisons, and write-error propagation. Optimizations are measured without relaxing the existing native input or image gates.',
      'The documented x64 replay completed its retained sequence, while native ARM64 execution remained a separate outstanding item. That distinction keeps a successful cross-architecture build from being reported as physical-device acceptance.'
    ],
    limitations: [
      'Component candidates, builds, visual comparison, native interaction, and platform acceptance are tracked separately. Full parity is still in progress.',
      'Native cursor checks require a usable pointer device/session. The library does not change operating-system input settings to make a fixture appear to pass.'
    ],
    references: [
      {
        label: 'Native behavior and verification design',
        href: 'https://github.com/gaulatti/orchard/blob/ebc4a8f949968f053254fe26b7a35c8f87215955/docs/architecture.md'
      },
      {
        label: 'Parity and acceptance state',
        href: 'https://github.com/gaulatti/orchard/blob/ebc4a8f949968f053254fe26b7a35c8f87215955/docs/parity.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Generate native resources',
          description: 'Shared tokens become Windows resources with light, dark, and high-contrast mappings.'
        },
        {
          title: 'Preserve consumer ownership',
          description: 'Components project the application’s original content, records, selection, and actions.'
        },
        {
          title: 'Exercise native interaction',
          description: 'Catalog checks combine keyboard/pointer behavior, automation, focus, and rendered appearance.'
        },
        {
          title: 'Verify package consumption',
          description: 'Independent applications consume packaged output so source-tree assumptions do not hide distribution defects.'
        }
      ]
    }
  },
  avelino: {
    context: [
      'Avelino is the Linux member of the same design-system family. Its target is a faithful Qt Quick implementation, using preserved Sabella desktop and television renderings as references while keeping Apple implementation code outside the Linux product.',
      'This is an explicit porting and acceptance problem. A component can exist in QML, compile, and appear in a catalog while still being wrong in text shaping, geometry, state handling, physical input, or accessibility.'
    ],
    implementation: [
      'I built the Linux token/typography foundation, QML component candidates, catalog, installed-consumer checks, and reference-reproduction tooling. Source artifacts and rendered references carry checksums and provenance so comparisons can be reproduced without depending on a moving sibling checkout.',
      'The work investigates behavior as well as pixels: controlled values versus raw editing, focus ownership, label layout, child clipping, independent action targets, and popup lifecycle. Each candidate keeps consumer content and state instead of replacing them with a painted approximation.',
      'The acceptance process retains failure evidence and separates virtual display/package checks from strict mirror acceptance. Desktop and television remain separate scopes.'
    ],
    evidence: [
      'The repository contains per-component source investigations, reference reproduction, catalog captures, and independent consumer checks. Negative results remain part of the evidence instead of being converted into approved visual exceptions.',
      'The current project explicitly distinguishes registered candidates from components that have passed the complete mirror gate. This is a more demanding acceptance bar than a passing QML build.'
    ],
    limitations: [
      'Full desktop and television acceptance remain pending; the project does not claim completed parity.',
      'Cross-platform text and native interaction can require more work than copying geometry. Platform differences need an explicit decision rather than an undocumented approximation.'
    ],
    references: [
      {
        label: 'Linux scope and acceptance contract',
        href: 'https://github.com/gaulatti/avelino/blob/4b4efdf7b5b205e42090eef6e507ed2ab4d9c4c3/README.md'
      },
      {
        label: 'Strict visual acceptance',
        href: 'https://github.com/gaulatti/avelino/blob/4b4efdf7b5b205e42090eef6e507ed2ab4d9c4c3/docs/visual-acceptance.md'
      },
      {
        label: 'Installed-consumer verification',
        href: 'https://github.com/gaulatti/avelino/blob/4b4efdf7b5b205e42090eef6e507ed2ab4d9c4c3/docs/packaging.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Freeze the reference',
          description: 'Recover checksummed historical inputs and rendered reference states.'
        },
        {
          title: 'Implement a Linux candidate',
          description: 'Map visual and semantic behavior to Qt Quick and Linux-native input/accessibility.'
        },
        {
          title: 'Check a real consumer',
          description: 'Install the package and exercise a separate application rather than importing source directories.'
        },
        {
          title: 'Compare the full contract',
          description: 'Assess frames, fonts, symbols, state, raster output, physical input, and reader behavior independently.'
        }
      ]
    }
  },
  thompson: {
    context: [
      'Thompson gives React Native products the same semantic component vocabulary as the web system without importing browser renderers. It supports mobile workflows such as durable capture/upload queues and editorial interfaces, where touch behavior and compact layouts matter as much as appearance.',
      'A name-for-name API port is insufficient. Safe areas, sheets, nested scrolling, native focus, keyboard behavior, and phone/tablet composition need deliberate native implementations.'
    ],
    implementation: [
      'I built native primitives, application layouts, forms, overlays, charts, feed surfaces, and a Storybook catalog around Bleecker’s neutral tokens/contracts. React Native views own rendering; browser CSS, DOM components, Radix, and Recharts are outside the package.',
      'Responsive layouts preserve public names while adapting behavior. Feed columns become vertically scrolling lanes or horizontally paged phone views; a supporting rail becomes an independently scrollable native region at wide sizes. Theme storage is injected rather than requiring one persistence dependency.',
      'I also defined package-consumer and parity checks. Stable release consumption requires an immutable registry artifact and integrity-checked lockfile rather than a moving Git branch or a sibling checkout.'
    ],
    evidence: [
      'The strict parity check compares public Bleecker modules and symbols with their native counterparts. That checks API coverage; native fixtures and platform acceptance remain distinct.',
      'A bounded neutral-button proof uses a sanitized consumer-owned fixture and records adaptations, unsupported behavior, and exact artifact provenance rather than copying private producer material into a public package.'
    ],
    limitations: [
      'API completeness is not a claim that every native interaction has passed device acceptance. A registry release and its consumer adoption are also separate milestones.',
      'Applications must load the packaged fonts and respect the provider’s safe-area ownership. Duplicate wrappers or moving dependency pins can undermine otherwise correct components.'
    ],
    references: [
      {
        label: 'Native API and layout contracts',
        href: 'https://github.com/gaulatti/thompson/blob/30a76c849e2486ba26b15b0c0c569fbde8c0606c/README.md'
      },
      {
        label: 'Immutable package consumption',
        href: 'https://github.com/gaulatti/thompson/blob/30a76c849e2486ba26b15b0c0c569fbde8c0606c/docs/RELEASING.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Consume neutral foundations',
          description: 'Read semantic contracts and tokens without loading the web renderer.'
        },
        {
          title: 'Implement native behavior',
          description: 'Use native views, safe-area ownership, native SVG charts, and mobile interaction patterns.'
        },
        {
          title: 'Exercise phone and tablet fixtures',
          description: 'Storybook covers narrow/wide layouts, themes, state, and production-critical interactions.'
        },
        {
          title: 'Verify external consumption',
          description: 'Check public exports and package contents from a clean consumer before treating a release as usable.'
        }
      ]
    }
  },
  broadway: {
    context: [
      'Broadway turns reusable presentation templates into editable, exportable content. The same definition should determine the form the author fills in, the preview they see, and the artifact they export; maintaining three separate versions would create predictable drift.',
      'The project grew beyond vertical social images into documents and a separate programmatic-video path. Each medium has a different correctness boundary: a PNG must capture its fonts and images, a document should retain selectable text, and a video needs verifiable timing and media properties.'
    ],
    implementation: [
      'I built the template registry, typed fields, generated editor forms, preview renderer, packaged-asset contract, PNG export, and vector PDF path. Template definitions declare their exact local font faces, and the preview and image embedding use the same declaration.',
      'Export preflight rejects missing fonts and non-embeddable images rather than silently producing a different layout. I kept product-specific authoring behavior in Broadway and shared UI primitives in Bleecker.',
      'The isolated video package adds deterministic compositions, local fonts/logos, versioned fixture validation, H.264 output, representative-frame checks, and media probing. It can turn a human-selected window from a finalized Alana recording into an unpublished excerpt draft.'
    ],
    evidence: [
      'Template/export contract checks exercise registration and asset requirements. The video path additionally verifies encoded output with ffprobe and checks representative frames and selected duration.',
      'An excerpt remains a draft with explicit queued, rendering, rendered, failed, and canceled states. Rendering an artifact does not authorize its publication.'
    ],
    limitations: [
      'Video tooling is deliberately isolated from the web application’s runtime dependencies. Human selection and approval remain part of the excerpt workflow.',
      'Template export quality depends on declared, locally available assets. Remote runtime font substitution is rejected rather than accepted as a visually similar result.'
    ],
    references: [
      {
        label: 'Authoring, font, and export contracts',
        href: 'https://github.com/gaulatti/broadway/blob/af81a7bcf2232e9386caff1718d1725b0270e8db/README.md'
      },
      {
        label: 'Template system',
        href: 'https://github.com/gaulatti/broadway/blob/af81a7bcf2232e9386caff1718d1725b0270e8db/TEMPLATE_STUDIO.md'
      },
      {
        label: 'Deterministic video and excerpt drafts',
        href: 'https://github.com/gaulatti/broadway/blob/af81a7bcf2232e9386caff1718d1725b0270e8db/video/README.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Declare a template',
          description: 'Typed fields, presentation code, and required assets describe one reusable format.'
        },
        {
          title: 'Generate the authoring surface',
          description: 'The editor derives inputs and renders a live preview from that declaration.'
        },
        {
          title: 'Preflight and export',
          description: 'Check required media/fonts, then produce PNG or a document-appropriate vector PDF.'
        },
        {
          title: 'Keep video isolated',
          description:
            'A separate rendering package validates compositions and recording excerpts without changing the existing application export path.'
        }
      ]
    }
  },
  manzoni: {
    context: [
      'Manzoni is the field client for Colombo’s upload contract. A captured image must survive an application restart and a bad network before the server has accepted it; after acceptance, the client must avoid sending a duplicate simply because it cannot currently read the receipt.',
      'The interface therefore needs more than an upload progress bar. Accepted, delivered, confirmed by the newsroom, failed, expired, and unknown delivery are different states with different safe actions.'
    ],
    implementation: [
      'I built the mobile capture and queue workflow with app-owned media copies, SQLite persistence, secure credential storage, and the current React Native/Expo implementation. The earlier Flutter application remains a separate rollback/reference path.',
      'After an HTTP acceptance, the required operation ID becomes the reconciliation identity. The client polls Colombo on launch, foreground return, a real offline-to-online transition, a slow foreground interval, or an explicit Check delivery action. Automatic triggers respect backoff; an operator refresh can ask immediately.',
      'The domain reconciliation rules prevent a local timeout, an unavailable status endpoint, or an unrecognized receipt from becoming a false failure or success. Existing queue schemas migrate in place so pending rows and media copies survive an application update.'
    ],
    evidence: [
      'The repository checks receipt mapping, reconciliation triggers, schema migration, and mobile build/export contracts. The important failure case is an accepted upload followed by a status outage: the client must keep the existing operation rather than create a duplicate.',
      'The internal-distribution guard requires an exact published Thompson package and registry integrity. The retained documentation records that this guard can block a candidate until the package is actually available; a successful development build is not substituted for distribution acceptance.'
    ],
    limitations: [
      'The Flutter path is not the durable Expo queue described here. Migration, package publication, signed internal builds, and physical-device checks remain distinct tasks.',
      'Delivery unknown is intentional. It is safer and more accurate than guessing that an accepted file failed because the network cannot return its receipt.'
    ],
    references: [
      {
        label: 'Durable queue and receipt reconciliation',
        href: 'https://github.com/gaulatti/manzoni/blob/925c6e9d33a8f58d952bcdffce8f2bfca9f21d70/README.md'
      },
      {
        label: 'Internal-distribution acceptance',
        href: 'https://github.com/gaulatti/manzoni/blob/925c6e9d33a8f58d952bcdffce8f2bfca9f21d70/expo-app/docs/internal-distribution.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Capture locally',
          description: 'Copy media into application-owned storage and persist the queue entry before attempting the upload.'
        },
        {
          title: 'Obtain durable acceptance',
          description: 'Send the authenticated upload and require HTTP 202 plus Colombo’s operation ID.'
        },
        {
          title: 'Reconcile delivery',
          description: 'Advance only on authoritative receipt states, preserving unknown state when the server cannot answer.'
        },
        {
          title: 'Retry safely',
          description: 'Allow a new upload only after a terminal failed/expired outcome; retain accepted work that may still be processing.'
        }
      ]
    }
  },
  atlantide: {
    context: [
      'Atlantide connects Celesti’s device and channel model to an Apple TV. It needs to preserve the operator’s channel order, remote commands, and viewing state while presenting a television-native interface rather than a desktop dashboard.',
      'Playback also feeds product data. A channel should count as viewed when media is actually advancing in an active application, not merely because a command was received or a tile had focus.'
    ],
    implementation: [
      'I built the device-state adapters, channel/API mapping, remote playback controllers, durable viewing outbox, and application integration. Sabella owns reusable television presentation, remote focus, and decoder selection; Atlantide supplies registered identity and authoritative product state.',
      'Channel groups load lightweight summaries first and fetch channel pages when opened. Focus and browse position are restored after playback, while the service owns ranking and lineup order. Stream medium comes from the service rather than being guessed from a filename or logo.',
      'Viewing intervals use engine-confirmed activity and monotonic duration. They are checkpointed into durable segments and delivered with stable IDs so retries and relaunches do not double-count. Quad layouts attribute visible channels separately and ignore hidden panes.'
    ],
    evidence: [
      'The UI architecture records late-callback/source-generation guards, page-boundary tuning, focus restoration, background-radio behavior, and durable segment delivery.',
      'The outbox treats recorded and duplicate responses as terminal success, retains retryable failures, and skips durable terminal rejections so one bad segment does not block unrelated viewing history.'
    ],
    limitations: [
      'Signed release creation, physical-device installation, and production smoke tests remain separate from package and simulator checks.',
      'Sabella owns player behavior. Atlantide does not replace the authoritative stream URL or implement a competing visual system to work around a consumer integration issue.'
    ],
    references: [
      {
        label: 'Device, playback, and viewing architecture',
        href: 'https://github.com/gaulatti/atlantide/blob/ce1c8dbccc2cc8104cfa5bbc98af1f511dc71396/docs/ui-architecture.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Register and browse',
          description: 'Load device identity and ordered channel-group summaries without downloading the entire catalog.'
        },
        {
          title: 'Resolve authoritative media',
          description: 'Pass the service-provided stream and medium to the shared television player.'
        },
        {
          title: 'Observe real activity',
          description: 'Distinguish advancing media from buffering, inactivity, failure, and source replacement.'
        },
        {
          title: 'Persist viewing events',
          description: 'Queue bounded segments before delivery, retry transient failures, and preserve browse/focus state on return.'
        }
      ]
    }
  },
  autostrada: {
    context: [
      'Autostrada groups three repositories into one web-performance product: the dashboard, the application service, and infrastructure. The operating question is how a site changes over time, rather than what a single Lighthouse run scored.',
      'The project connects measurements with target, scan, project, and access-management models so performance observations can become navigable history.'
    ],
    implementation: [
      'I built the React/TypeScript dashboard, NestJS backend, and CDK infrastructure definitions. The dashboard uses authenticated routes, data tables, sorting/pagination, Redux/Saga side effects, and feature controls.',
      'The service coordinates scan-related work and stores results, while the frontend exposes reports and target management. Cognito handles user identity, and service boundaries support REST/gRPC integrations around collection and analysis.'
    ],
    evidence: [
      'The public repositories expose the three-part architecture, scan/service models, dashboard routes, and infrastructure tests. They show implementation scope without establishing a public service’s current uptime or usage.',
      'This is distinct from the employer-owned performance work in my résumé. The portfolio page documents the independent Autostrada codebase and does not reuse an employer impact metric as a product result.'
    ],
    limitations: [
      'Collection, storage, and a reporting interface do not automatically establish that two lab runs are comparable. Performance interpretation still depends on consistent targets and measurement conditions.',
      'No public adoption, benchmark improvement, or ongoing production service is claimed for this independent project.'
    ],
    references: [
      {
        label: 'Dashboard architecture',
        href: 'https://github.com/gaulatti/autostrada-frontend/blob/8f88f8b07c34a5ea5b4b88a96f720a03f48191eb/README.md'
      },
      {
        label: 'Application service',
        href: 'https://github.com/gaulatti/autostrada-service/blob/51298138b11d8f5767fa24e37ba541a5eefe3a51/README.md'
      },
      {
        label: 'Infrastructure definitions',
        href: 'https://github.com/gaulatti/autostrada/blob/9e8e8bdd71ecbff0eafa775e7ca77a882aa91ad6/README.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Define targets and access',
          description: 'Authenticated users manage the sites and project context that scans belong to.'
        },
        {
          title: 'Coordinate measurement',
          description: 'The backend organizes scan work and consumes Lighthouse/PageSpeed-related results.'
        },
        {
          title: 'Store and inspect history',
          description: 'Reports and tables make stored results available for comparison and operational follow-up.'
        },
        {
          title: 'Provision deliberately',
          description: 'Infrastructure definitions describe the AWS environment separately from the application repositories.'
        }
      ]
    }
  },
  clouseau: {
    context: [
      'I extracted repeated verification/review logic into Clouseau because code coverage alone cannot decide whether a change belongs in a product. A change may pass every test while weakening the contract, testing a fake implementation, or implementing a feature no one authorized.',
      'The project investigates how AI-assisted change review can work with explicit evidence and narrow authority. It is engineering automation research with concrete GitHub integrations, not a claim that a model can independently decide product intent.'
    ],
    implementation: [
      'I built shared coverage gates, the composite action, trusted configuration handling, model assessment, revision-bound approval control, bounded repair paths, and coordinated documentation maintenance. Consumers retain their own build/test commands and product contracts.',
      'The review path separates untrusted contributor execution from privileged assessment and gating. The reviewer reads protected-base configuration and treats patches, commit messages, tickets, and source as evidence rather than instructions. Model-provider access and GitHub write authority live in separate jobs.',
      'The coverage checker verifies exact, nonempty application line and branch counts rather than rounded percentages. The acceptance protocol additionally evaluates necessity, proportionality, technical findings, test integrity, independent investigation, and unresolved authority questions.'
    ],
    evidence: [
      'The repository provides fixed evaluation fixtures for maintenance, product drift, test fakery, and change acceptance. Read-only evaluation modes retain evidence without writing to a pull request.',
      'The documentation path challenges both supported and deliberately false claims, validates complete page batches, and refuses invented source references or incomplete evidence. Model confidence is not an approval credential.'
    ],
    limitations: [
      'The project remains experimental. Qualification fixtures and successful protocol checks do not prove general review accuracy across a portfolio.',
      'Consumers must pin a reviewed commit and configure real branch protection. New product purpose and authority remain human decisions; Clouseau cannot expand the permissions granted by a caller.'
    ],
    references: [
      {
        label: 'Review, trust, and operation boundaries',
        href: 'https://github.com/gaulatti/clouseau/blob/8554de1fc01bbc746a9ba4c20185ee3d7a579e18/README.md'
      },
      {
        label: 'Change-acceptance protocol',
        href: 'https://github.com/gaulatti/clouseau/blob/8554de1fc01bbc746a9ba4c20185ee3d7a579e18/docs/change-acceptance.md'
      }
    ],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Run untrusted verification',
          description: 'Contributor code executes on a disposable read-only runner without privileged review secrets.'
        },
        {
          title: 'Assess against trusted contracts',
          description: 'A protected-base reviewer compares intent, source evidence, and technical results at a specific revision.'
        },
        {
          title: 'Investigate uncertainty',
          description:
            'Technical uncertainty is recorded and investigated; a human intent comment cannot waive a factual or integrity failure.'
        },
        {
          title: 'Apply a narrow gate',
          description:
            'A separate controller validates native protection and exact evidence before approving or arming protected auto-merge.'
        },
        {
          title: 'Keep documentation coupled to evidence',
          description:
            'Wiki generation checks source-line support; a separate publication job verifies deployment and protects concurrent human edits.'
        }
      ]
    }
  },
  pompeii: {
    context: [
      'An application suite needs a common answer to who a principal is and what that principal may do. Copying authorization rules into every product creates inconsistent permissions and makes cross-application recovery difficult.',
      'I built Pompeii as the shared identity/authorization and feature-capability plane while allowing each product to retain its own sessions, routes, and domain decisions.'
    ],
    implementation: [
      'The Go backend exposes an administration API and a private native gRPC authorization interface, with a React administration application and PostgreSQL registry data. Cognito application registrations provide identity context; authorization is evaluated at the service boundary.',
      'The implementation separates application registration, canonical principal identity, permission decisions, feature capabilities, and administration. Consumers such as newsroom and broadcast controls ask for the relevant capability rather than granting access because a browser happened to log in.',
      'Configuration is loaded and validated before migrations or service startup. Deployment readiness checks the administration and authorization listeners separately so one healthy route does not mask a missing authorization service.'
    ],
    evidence: [
      'The current repository documents canonical principal recovery, separate REST/gRPC readiness, configuration validation, and bounded authorization telemetry.',
      'The product’s value is the reusable permission contract across services. It does not replace application-side ownership checks or turn frontend visibility into authorization.'
    ],
    limitations: [
      'The implementation source and production configuration remain private. The description here covers the shared service boundary, not individual identities or access grants.',
      'An unavailable authorization service is an explicit failure for protected operations; applications should not silently treat that condition as permission.'
    ],
    references: [],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Register an application',
          description: 'Keep application identity and its identity-provider configuration in the shared registry.'
        },
        {
          title: 'Resolve a principal',
          description: 'Map authenticated identity to the canonical authorization principal and recovery rules.'
        },
        {
          title: 'Evaluate capability',
          description: 'Return the product-scoped permission or feature decision over the private service boundary.'
        },
        {
          title: 'Administer and observe',
          description:
            'Use authenticated administration and bounded telemetry without moving product workflow state into the identity plane.'
        }
      ]
    }
  },
  celesti: {
    context: [
      'Celesti is the channel and device-management layer for a newsroom display setup. It connects an inventory of streams with actual screens and playback clients, rather than asking each television to maintain a separate, manually curated list.',
      'The operating model includes remote single-stream, quad, and emergency modes, plus channels that are television, radio, or automatically classified by the service.'
    ],
    implementation: [
      'I built the shared channel/device service and native-client workflows, including M3U inventory, command delivery, device identity, and playback telemetry. Clients receive the authoritative channel order and stream properties instead of inventing their own catalog.',
      'The system has platform-specific players and presentation libraries while sharing service contracts. Atlantide supplies the Apple TV application; Android television clients use the same broader routing and display-management model.',
      'Viewing attribution and operational health remain different signals. A command requesting playback does not prove that media advanced, and an app in the background should not silently accrue foreground viewing time.'
    ],
    evidence: [
      'The existing operating history includes using Celesti on a five-screen newsroom setup and checking the client’s foreground playback activity. That is concrete device use, distinct from a claim about external customer adoption.',
      'The public Atlantide architecture provides a detailed consumer-side record of paged channel browsing, source-switch guards, quad attribution, and durable viewing delivery without exposing the private service implementation.'
    ],
    limitations: [
      'Playback capabilities depend on platform decoders, stream formats, network reachability, and the current client. One successful screen does not establish all-device or all-format parity.',
      'The private service and client implementation links are intentionally omitted; the related Atlantide page documents its public native consumer.'
    ],
    references: [],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Manage inventory',
          description: 'Import and organize source channels and expose ordered groups to clients.'
        },
        {
          title: 'Register screens',
          description: 'Associate a device with its identity and receive its real operational state.'
        },
        {
          title: 'Deliver commands',
          description: 'Send playback/display changes through the service contract while the client owns native execution.'
        },
        {
          title: 'Observe the result',
          description: 'Use engine activity and device telemetry to distinguish requested output from actual playback.'
        }
      ]
    }
  },
  gaulatti: {
    context: [
      'This website needs to do two jobs: provide a quick overview of my engineering work and give each project a durable page that can stand alone when shared from LinkedIn. Expanding coverage should preserve the existing portfolio’s visual identity rather than replace it with a different product.',
      'Because social crawlers often do not execute application JavaScript, a client-rendered detail route is insufficient. The first HTML response needs the project’s actual content and preview metadata.'
    ],
    implementation: [
      'I maintain the React Router site, curated catalog, individual project pages, résumé data, search/grouping, and static publication output. The catalog is editorially reviewed; source discovery does not automatically approve content or publish private repository links.',
      'The build projects approved data into a browser-safe catalog, pre-renders each detail page, generates a project-specific preview image, and exports canonical links. The S3 hosting output includes extensionless HTML objects so clean URLs can return their own document.',
      'The index retains the established image-and-text rows and decorative artwork. The added detail pages extend that navigation with architecture, design decisions, evidence, and related systems.'
    ],
    evidence: [
      'The local verification checks publication guards, complete public-repository coverage, initial project HTML, canonical/preview metadata, image dimensions, and the actual preview server’s direct-link behavior.',
      'Desktop and mobile browser checks exercise category filters, search, title/artwork navigation, repository/application links, and résumé layout. The same generated project data feeds the index and detail pages so a content correction reaches both surfaces.'
    ],
    limitations: [
      'The website is a static publication with an explicit approval boundary. A repository discovered during research is not automatically added to the public catalog, and a private implementation is not linked merely because it is mentioned in a project story.'
    ],
    references: [],
    workflow: {
      title: 'Architecture and workflow',
      steps: [
        {
          title: 'Curate and approve',
          description: 'Record project facts, source visibility, and explicit publication approval.'
        },
        {
          title: 'Generate public output',
          description: 'Export approved browser data, project HTML, preview images, sitemap entries, and link listings.'
        },
        {
          title: 'Verify direct links',
          description: 'Check actual static HTTP responses so deep links do not receive a generic homepage.'
        },
        {
          title: 'Publish separately',
          description: 'Keep source changes, build validation, deployment, and live verification as separate milestones.'
        }
      ]
    }
  },
  kolibri: {
    context: [
      'This capstone-derived product is deliberately kept in private development while degree conferral is pending. Listing it acknowledges the work without presenting an unavailable product as a public launch.'
    ],
    implementation: [
      'I own its development independently and am retaining the product and implementation materials privately. The public portfolio does not reproduce the academic submission or expose the private codebase.'
    ],
    evidence: [
      'The public milestone available here is completion of the academic requirements. A product launch, public source release, and degree conferral are separate milestones.'
    ],
    limitations: [
      'A fuller product case study is withheld until the planned public release boundary. There is no public installation, demo, or implementation link on this page.'
    ],
    references: []
  },
  nena: {
    context: [
      'Nena preserves an early web exploration of Yearn. Its useful engineering scope is a small authenticated application shell rather than a completed content or media platform.'
    ],
    implementation: [
      'I built the React/TypeScript application with client routing, an authentication check, hosted sign-in redirection through Amplify/Cognito, and an initial home view. The retained screen includes embedded media and placeholder navigation, showing the stage the experiment actually reached.'
    ],
    evidence: [
      'The public application entry point shows the session check, configured identity-provider redirect, home route, and logout route. The initial page source distinguishes implemented structure from unfinished navigation.'
    ],
    limitations: [
      'The repository is a historical prototype. It does not establish a released Yearn product, a complete content backend, or current identity-provider availability.'
    ],
    references: [
      {
        label: 'Authentication and route entry point',
        href: 'https://github.com/gaulatti/nena/blob/bcdafa16602e9aa7f28649f6dcb8d6bd02066a30/src/App.tsx'
      },
      {
        label: 'Retained home screen',
        href: 'https://github.com/gaulatti/nena/blob/bcdafa16602e9aa7f28649f6dcb8d6bd02066a30/src/pages/index.tsx'
      }
    ]
  },
  roxette: {
    context: [
      'Roxette explores the native iOS side of Yearn, particularly audio playback and a small player/playlist interface. It is earlier work in the same broad media direction as the later radio and television systems.'
    ],
    implementation: [
      'I built SwiftUI views and an observable player model around AVPlayer. The model configures the playback audio session, tracks media time, exposes play/pause/seek actions, and integrates now-playing metadata and remote transport commands.',
      'The retained implementation uses a fixed radio source and contains unfinished application screens. That makes the source useful as an experiment in native playback integration rather than evidence of a complete streaming catalog.'
    ],
    evidence: [
      'The public player model contains the periodic time observer, MediaPlayer now-playing updates, remote command handlers, and finite/live-duration handling. The neighboring screens show which interface pieces remained placeholders.'
    ],
    limitations: [
      'No current App Store distribution or complete device acceptance is claimed. A fixed sample stream and registered remote controls are not proof of a production media product.'
    ],
    references: [
      {
        label: 'Native audio and transport integration',
        href: 'https://github.com/gaulatti/roxette/blob/40f98b18ce0913fdb2b073c35df5e1b0e800f02e/roxette/models/PlayerViewModel.swift'
      }
    ]
  },
  springfield: {
    context: [
      'Springfield makes live-stream repackaging an application operation with a bounded lifecycle. Starting FFmpeg is only the beginning: the service has to know when playback is actually available, prevent unlimited resource growth, and remove dead processes and expired output.'
    ],
    implementation: [
      'I built the NestJS service around FFmpeg, nginx-rtmp, and a MySQL stream model. Start creates an operation with an expiry, the service tracks the process and output, and cleanup reconciles database rows, processes, and files.',
      'The retained design bounds concurrent jobs and gives them a finite lifetime. HLS readiness is checked through HTTP rather than by looking for a local playlist file, which would be wrong when the serving process is in another container.'
    ],
    evidence: [
      'The public README and stream-service implementation document on-demand repackaging, centralized cleanup, a ten-stream concurrency boundary, and a five-minute default lifetime. These are implementation limits, not a measured throughput result.',
      'GTT Player includes a consumer path for listing and starting Springfield jobs, connecting server-side repackaging with a native playback experiment.'
    ],
    limitations: [
      'The project remains earlier stream-infrastructure work. Real capacity depends on media profiles, process cost, and the serving environment; a configured concurrency limit does not establish a load-test result.'
    ],
    references: [
      {
        label: 'Job lifecycle and cross-container readiness',
        href: 'https://github.com/gaulatti/springfield/blob/1c978fd4d4d6314bc6164616ab2f1c1107ac243b/README.md'
      },
      {
        label: 'Stream orchestration implementation',
        href: 'https://github.com/gaulatti/springfield/blob/1c978fd4d4d6314bc6164616ab2f1c1107ac243b/src/streams/streams.service.ts'
      }
    ]
  },
  castela: {
    context: [
      'Castela is a small early experiment in turning a web page into a summary. It predates the later shared AI service and is intentionally shown as a prototype rather than being retroactively described as a complete AI platform.'
    ],
    implementation: [
      'I built a Flask application that accepts a URL, downloads its HTML, extracts text with BeautifulSoup, runs the BART CNN summarization pipeline, and renders the summary back into the page. The retained implementation is a short synchronous request path, with model inference in the application process.'
    ],
    evidence: [
      'The public application source directly shows the complete fetch → text extraction → summarization → template-render flow and its configured output-length bounds.'
    ],
    limitations: [
      'The prototype does not implement the durable queue, authenticated ingestion, source provenance, URL-fetch hardening, or long-document handling of a production editorial system. Its value here is the earlier experiment and the progression toward more explicit service boundaries.'
    ],
    references: [
      {
        label: 'Complete summarization prototype',
        href: 'https://github.com/gaulatti/castela/blob/a843cfe21a8e85afe9b9fb31ee6431c6c67a7bf9/app.py'
      }
    ]
  },
  'gtt-player': {
    context: [
      'GTT Player explores native browsing and playback of channels described by M3U playlists. It also contains a client for Springfield’s on-demand stream service, linking catalog selection with server-side repackaging.'
    ],
    implementation: [
      'I built playlist/group/channel views, an M3U parser, cached playlist handling, and an observable playback model. The parser extracts channel names, logos, grouping metadata, and stream URLs from the retained playlist shape.',
      'The active playback path in the reviewed model uses MobileVLCKit. AVPlayer and casting-related code also exist, but their presence is not treated as proof that every transport or remote-playback control is complete. The model includes explicit error state and Springfield list/start integration.'
    ],
    evidence: [
      'The public parser and player sources expose the exact supported playlist assumptions and current playback choice. This makes the prototype’s real scope clearer than describing it only as a generic Swift media player.'
    ],
    limitations: [
      'The parser assumes a particular attribute order and HTTP stream lines; it is not a claim of universal M3U compatibility. Casting, external playback, and lifecycle behavior need separate device validation.'
    ],
    references: [
      {
        label: 'Playlist parsing',
        href: 'https://github.com/gaulatti/gtt-player/blob/66fc324ca1c6ec1fe160c29cc381a373c6e54079/GTTPlayer/Services/M3UParser.swift'
      },
      {
        label: 'Playback and Springfield integration',
        href: 'https://github.com/gaulatti/gtt-player/blob/66fc324ca1c6ec1fe160c29cc381a373c6e54079/GTTPlayer/ViewModels/PlayerViewModel.swift'
      }
    ]
  },
  'leonora-latorre': {
    context: [
      'This retained 2015 website is earlier client-facing web work for a condominium. Its requirements are closer to information architecture and usable content navigation than to the distributed systems in the later portfolio.'
    ],
    implementation: [
      'I worked on the HTML, CSS, JavaScript, visual assets, and page structure. The retained entry page organizes the site around home, organizational information, a gallery, documents, contact, and user access.'
    ],
    evidence: [
      'The public source preserves the entry document and supporting assets. It provides a concrete record of the website’s navigation and implementation era.'
    ],
    limitations: [
      'This is a historical source snapshot, not a claim that the original installation, document collection, or user-access backend is currently maintained or available.'
    ],
    references: [
      {
        label: 'Retained website entry point',
        href: 'https://github.com/gaulatti/leonora-latorre/blob/5e02524d6d48116b1386cf04e5433f4552085dd6/index.html'
      }
    ]
  },
  'foris-challenge': {
    context: [
      'This repository preserves programming-challenge work across several languages. It belongs in the earlier-work archive rather than being presented as a deployed software product.'
    ],
    implementation: [
      'I collected independent solutions in C, C++, C#, Java, JavaScript, PHP, Python, Ruby, and Swift, with retained problem inputs. The repository shows language-level problem solving and implementation practice.'
    ],
    evidence: [
      'The public directory structure and solution sources establish the languages and artifacts present. They do not establish comparative runtime performance or a standardized assessment score.'
    ],
    limitations: [
      'No product adoption, production architecture, or benchmark result is inferred from a collection of challenge solutions.'
    ],
    references: [
      {
        label: 'Challenge archive',
        href: 'https://github.com/gaulatti/foris-challenge/blob/b371201728e62d5c05d3bef1d08c78bd56106176/README.md'
      }
    ]
  },
  nazca: {
    context: [
      'Nazca is retained as an earlier idea connecting live video with earthquake monitoring. It reflects the same operational interest in events and media that later appears in newsroom monitoring and broadcast projects.'
    ],
    implementation: [
      'The public record available for this entry is the historical article linked below. The current repository does not provide a source tree from which to reconstruct a more detailed implementation.'
    ],
    evidence: [
      'The article is the evidence for the project concept. This page deliberately separates that historical record from later systems whose implementation and runtime contracts are available.'
    ],
    limitations: [
      'There is insufficient current source evidence to claim a functioning Nazca service, a specific architecture, or measured detection/streaming performance.'
    ],
    references: []
  },
  'php-nuke': {
    context: [
      'This entry is a preservation/reference item in the earlier-work archive. PHP-Nuke is a third-party portal/CMS system; keeping a copy does not make it my original software project.'
    ],
    implementation: [
      'I retain the source distribution and its original documentation, credits, licensing, installation, and upgrade materials. The archive includes the original portal modules and supporting files rather than a new platform built under the same name.'
    ],
    evidence: [
      'The preserved README, credits, and copying documents establish provenance and the original system’s identity. They are the appropriate source for authorship and licensing.'
    ],
    limitations: [
      'This page makes no claim that I authored PHP-Nuke, that the archived version is secure for new deployment, or that a current hosted installation is available.'
    ],
    references: [
      {
        label: 'Original project documentation',
        href: 'https://github.com/gaulatti/php-nuke/blob/02cb291be0b20105b134bea3012dc2c08f7df06f/readme.md'
      },
      {
        label: 'Original credits',
        href: 'https://github.com/gaulatti/php-nuke/blob/02cb291be0b20105b134bea3012dc2c08f7df06f/Credits.txt'
      },
      {
        label: 'Preserved license',
        href: 'https://github.com/gaulatti/php-nuke/blob/02cb291be0b20105b134bea3012dc2c08f7df06f/Copying.txt'
      }
    ]
  }
};
