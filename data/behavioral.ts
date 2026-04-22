export const behavioralStories = [
  {
    id: 1,
    title: "Food Safety Agent (0→1 Build)",
    company: "Digbi Health",
    tags: ["Invent & Simplify", "Think Big", "Bias for Action", "Deliver Results", "Influence Without Authority"],
    situation: "Digbi had 8 nutritionists each fielding 100–150 food safety queries per day from 50,000 users asking things like 'can I eat this?' and waiting 1–2 days for an answer. The company was expanding but couldn't keep hiring nutritionists — they needed a product solution, not a headcount solution.",
    task: "I owned the end-to-end build of a personalised food safety agent — and made the strategic call to place it inside Digbi's existing conversational AI tool as the first step in migrating users away from nutritionist dependency entirely.",
    action: [
      "Started with people, not architecture. Spent week 1 in 2–3 sessions with nutritionists understanding how they reasoned through safety questions — not just gathering requirements.",
      "Co-built the knowledge base with nutritionists as authors so the clinical logic was theirs, not mine.",
      "Built a barcode scanner that mapped products to Digbi's ingredient taxonomy, retrieved relevant clinical guidance through a RAG pipeline, and delivered a response in 30 seconds.",
      "Made the strategic call to place it inside the existing conversational AI tool — not as a standalone feature — to gradually shift user behaviour away from coach dependency.",
      "Launched with nutritionist review of flagged answers as a safety net. Moved to full autonomy as trust was established over time.",
      "Before launch, ran a validation session designed to surface weak spots — not to demo strengths."
    ],
    result: [
      "Response time dropped from 1–2 days to 30 seconds.",
      "Nutritionists tested it rigorously and trusted it enough to actively recommend it to users.",
      "The business case I built projected a 45% gross margin improvement by reducing nutritionist headcount dependency — it became the centrepiece of the enterprise pitch.",
      "Automating 85% of food safety queries meant Digbi could scale users without scaling headcount — eliminating the biggest driver of per-user service cost."
    ],
    followups: [
      { q: "Were they satisfied with results?", a: "Better than relaunch scores." },
      { q: "How did the client experience change?", a: "TAT reduced significantly." },
      { q: "Business impact?", a: "Increased engagement 27%, average session time per user on platform." },
      { q: "What would you have done differently?", a: "Agent orchestration — I would have designed the multi-agent layer earlier rather than treating it as a next step." }
    ],
    watchout: null
  },
  {
    id: 2,
    title: "AskDigbi — Customer Obsession",
    company: "Digbi Health",
    tags: ["Customer Obsession", "Ownership", "Bias for Action", "Dive Deep", "Influence Without Authority", "Invent & Simplify"],
    situation: "AskDigbi was live and working — but 70% of users who opened it left without sending a single message. This was three weeks into my internship. Nobody had flagged it as a priority.",
    task: "I self-initiated an investigation and made the case to fix it.",
    action: [
      "Started with the funnel, not assumptions. The data showed users were hitting a blank text box and bouncing within seconds — every question felt like the wrong one to ask.",
      "Partnered with the CS team who were hearing a second signal from users: they couldn't find anything. Food logs, health history, and metrics were all scattered with no clear home.",
      "These two problems were on separate roadmaps but affecting the same frustrated user. I connected them and solved them as one problem.",
      "Built a prototype, projected the impact, and made the case to get buy-in to execute. UX side: consolidated everything — food, recipes, metrics, logging — into one tab. AI side: built a question-generation agent that read each user's recent food logs and health history, surfacing 2 personalised questions before they had to think of one. Specific to their data, not generic health tips.",
      "Wrote evals and reviewed outputs personally before launch."
    ],
    result: [
      "Within 30 days of launch, sessions lifted 27% across 5,000 active users.",
      "The blank box problem was eliminated.",
      "CSAT → 80%."
    ],
    followups: [
      { q: "Why do you think it wasn't flagged as a priority?", a: "A million customers, tight deadlines — the team was moving fast and this was a silent problem. No one was complaining loudly because people just left." }
    ],
    watchout: null
  },
  {
    id: 3,
    title: "Bukukas Payments — Delivery Under Pressure",
    company: "Bukukas",
    tags: ["Deliver Results", "Have Backbone / Disagree & Commit", "Earn Trust", "Ownership", "Bias for Action"],
    situation: "It was 2021 at Bukukas — a bookkeeping startup in Indonesia with over a million customers. We had six weeks to ship payments before a hard shutdown date. If we didn't ship, we'd miss the Ramadan campaign window — our biggest commercial opportunity of the year — and hand it to a competitor who was already two weeks ahead of us.",
    task: "I was the FE owner on a team of three, responsible for end-to-end delivery of the payment frontend — KYC onboarding, send/receive flows, payment history, and bank management. I was the direct connection point between BE, designer, PM, QA, and content writer. Third-party integration with Xendit, a 3rd-party tool with 16–24h response times on blockers.",
    action: [
      "Before committing to any dates, I sat with the PM to translate the product spec into FE journeys.",
      "The hardest moment came in December — a dispute between engineering and QA over bugs vs. features stalled the sign-off. Escalating to leadership would have taken days we didn't have.",
      "I spent half a day pre-triaging every disputed item by user impact and whether it would block a real transaction. I brought that analysis to the QA lead and PM, conceded everything where QA was defensible, and held firm on one item the PRD was clear on — whether payments auto-synced to bookkeeping history or required user opt-in.",
      "Sign-off done in one session."
    ],
    result: [
      "Shipped before the competitor.",
      "Payment adoption became the primary growth metric in the weeks after launch.",
      "The Ramadan campaign, two months later, was built entirely on that infrastructure being live.",
      "The QA lead became someone I called before a release rather than negotiated with during one — that changed how every subsequent release went."
    ],
    followups: [],
    watchout: null
  },
  {
    id: 4,
    title: "Design System — Senior Devs Said No",
    company: "Lummo / Donut.cx",
    tags: ["Influencing Without Authority", "Disagree & Commit", "Deliver Results", "Think Big", "Earn Trust"],
    situation: "Lummo was pivoting from Bukukas to Donut.cx. Three frontend engineering pods were converging on one codebase for the first time — each with different conventions, different component patterns, different definitions of correct code. A designer working across all three with no shared library — design decisions being re-interpreted differently in every pod, every sprint. I suggested building a design system before the pivot began.",
    task: "Senior developers pushed back hard — it would kill time. My manager was onboard but I needed the senior devs to actually cooperate on the ground. Change their minds without the authority to mandate anything, against people with more seniority and more technical context than me.",
    action: [
      "Didn't go back with the same argument. Went back with a document — pros and cons of building before vs. after, industry standards showing what it cost other teams when they didn't, and a concrete POC proposal.",
      "POC framing was deliberate: not asking them to commit to a full design system — asking for a small, time-boxed yes. Got approval.",
      "Built the design system alongside the pivot product in parallel — a live catalogue of actual requirements. Components documented in real time from the product being built.",
      "One senior dev didn't adopt it for the first 2–3 sprints. Kept writing his own CSS — long, repetitive, inconsistent. Set up a 1:1 using the PR data as the entry point. Reframed the argument: 'by adopting this library you can drop Tailwind, eliminate repetitive CSS, and stop maintaining old components. This saves you time.' He adopted it fully before launch.",
      "Led a pod of 3 engineers through the full build — stakeholder meetings, cross-pod convention conflicts, live feature requests from the pivot."
    ],
    result: [
      "20+ core components with full variants shipped — 70+ including all states and configurations.",
      "Design-to-dev handoff cut by ~50% — designers stopped fielding three sets of interpretation questions per component.",
      "Production-ready 2 weeks ahead of a 6-month schedule — time given back to testing.",
      "Three pods, one consistent product.",
      "Designer handed off once to a shared library instead of three times to three interpretations."
    ],
    followups: [],
    watchout: "~50% handoff is a team estimate. Always redirect to the harder number: 2 weeks ahead of a 6-month schedule. If challenged on components: '20+ distinct components, 70+ including variants.' Manager was onboard — don't hide this if asked, but don't lead with it."
  },
  {
    id: 5,
    title: "Engineering Sprint — 3 Features, 7 Interns, 1 Team",
    company: "Digbi Health",
    tags: ["Influencing Without Authority", "Ownership", "Bias for Action", "Deliver Results", "Working with Engineers"],
    situation: "Digbi had brought on 7 product interns simultaneously. The engineering team of 20 was stretched thin supporting enterprise deployments. Most intern projects were struggling to get any build time. I had 3 features to build — the barcode food scanner, AskDigbi enhancements, and UI/UX improvements — and no structural reason for a team of 5 engineers to prioritise my work over anyone else's.",
    task: "Get and sustain engineering priority across 3 features over 8 weeks — while 6 other interns couldn't get build time.",
    action: [
      "Got on the sprint by making it easy to say yes. For each feature I came with full system architecture — APIs, edge cases, sprint-ready tasks with estimates. The ask was always 'execute this,' not 'figure out how to build this.' Engineers deprioritise vague asks that generate back-and-forth. I removed that friction entirely.",
      "Sustained priority across 8 weeks with a lightweight operating rhythm — regular syncs, PRD walkthroughs, QA-dev check-ins. Kept a live tab on blockers and resolved them fast.",
      "The hardest moment was on the barcode scanner. One engineer started missing deadlines. Set up a 1:1 — not to escalate, but to understand what was blocking him. He'd been working around a spec ambiguity about how the AI agent would be architected. Clarified it in the meeting, flagged the impact on the pilot launch timeline directly, agreed on a revised deadline. Direct, not adversarial."
    ],
    result: [
      "All 3 features shipped within the 8-week window.",
      "After launch, questions asked to the AI agent increased by 50% — from 5,000 to 10,000 per week.",
      "Reduced TAT from 2 days to 30 seconds.",
      "Principle that stuck: influence with engineers comes from technical credibility, a consistent operating rhythm, and being direct about stakes. Title doesn't enter into it."
    ],
    followups: [],
    watchout: "5K→10K questions/week is shared with Story 1 — the combined result of all three features shipping; the barcode scanner drove the biggest share. Use Story 4 as your primary influence story and Story 5 as your follow-up example."
  },
  {
    id: 6,
    title: "EMR Legacy Migration",
    company: "TruDoc Healthcare — UAE | 2023–2024",
    tags: ["Navigating Ambiguity", "Cross-functional Leadership", "Technical Depth", "Risk Management"],
    situation: "TruDoc's platform held 3M medical records used by doctors in live patient consultations every day. The codebase was 10 years old, no documentation, original developers were gone. One missed dependency in a live clinical system doesn't produce a bug report — it breaks something during a consultation before anyone knows it's broken.",
    task: "I was the engineer leading this alongside one other person — coordinating clinical, operations, and engineering stakeholders across 6 months, while knowing I was leaving for my MBA at the end.",
    action: [
      "No documentation, no original developers — only way through was function by function, page by page. Built the dependency map manually before touching any code.",
      "Ran separate stakeholder sessions by group — not joint ones. Clinical staff stop contributing when engineers are in the room. Found a care coordinator who flagged a patient data visualisation used in every consultation — not in documentation, not visible in the code. Found it only because they were the only non-technical people in the room.",
      "Defined rollback criteria upfront — the answer to 'should we roll back' cannot be a judgment call at 2am.",
      "Migration went screen by screen — both systems on production simultaneously, redirecting as each surface was completed. Started with RBAC first, the most foundational piece, and worked outward."
    ],
    result: [
      "Page load time dropped from 5 to 1.8 seconds — approximately 40% faster. Nothing broke a live consultation across 6 months.",
      "The migration unlocked the legacy stack running on outdated, unsupported libraries — every new feature request hit the same wall. The migration removed all of that.",
      "TruDoc could now hire engineers who actually wanted to work in the stack, add any modern library they needed, and build without a ceiling.",
      "Did not just migrate a system — removed the constraints that were blocking everything that came after."
    ],
    followups: [],
    watchout: "Never say 'zero disruptions' — say 'nothing broke a live consultation.' Never say 60% — always 40%, and explain Angular digest cycle vs React virtual DOM if pushed. If asked about the MBA timeline — own it as responsibility, not limitation."
  },
  {
    id: 7,
    title: "Clinical Note Auto-Save",
    company: "TruDoc Healthcare — UAE | 2023–2024",
    tags: ["Navigating Ambiguity", "Delivery Under Pressure", "Data-driven Prioritization", "Legacy Systems"],
    situation: "TruDoc's EMR held clinical notes, prescriptions, allergies, and insurance data written by doctors in live patient consultations. The codebase was 2014-era Angular, no documentation, original developers gone. Approximately 30% of all CS tickets were about clinical notes failing — notes not saving mid-consultation, blank records after appointments, missing medications, entire consultation notes gone. That is not a UX problem. That is a patient safety problem.",
    task: "Fix clinical note auto-save in a legacy codebase with no documentation — without breaking live clinical workflows — in 2 weeks, while the broader migration to React was happening in parallel.",
    action: [
      "The only way to understand a system with no documentation is to go to the people who use it. Spent time with doctors and operators — not gathering requirements, but building the dependency map that documentation should have given me. Asked specific questions: 'If this changes, what else might behave differently?'",
      "For auto-save specifically: modern React state management was not available — had to work within 2014-era Angular event handling patterns. Worked within it — a background save mechanism compatible with the existing patterns, which took longer to design but was far more stable when it ran.",
      "While in the codebase I didn't just fix the save problem. Added autofills — clinical note autofills and insurance autofill from patient records — reducing the time and clicks required on the four highest-use pages.",
      "Every change was tested on a staging environment replicating production clinical workflows before deploying. In a healthcare system, production is not the testing environment."
    ],
    result: [
      "Auto-save shipped in 2 weeks.",
      "Approximately 30% of CS tickets were about clinical note failures — after the fix, that category essentially disappeared.",
      "Doctors stopped losing consultation notes mid-appointment.",
      "Autofill improvements reduced the time and clicks required on the four highest-use pages.",
      "Latency reduced, DB query loading time reduced."
    ],
    followups: [],
    watchout: null
  },
  {
    id: 8,
    title: "Donut.cx Analytics",
    company: "Lummo / Donut.cx | 2022–2023",
    tags: ["Bias for Action", "Deliver Results", "Tradeoff Decision", "Ownership", "Think Big"],
    situation: "Lummo had just pivoted from Bukukas to Donut.cx — a B2B customer engagement SaaS. I had been leading the design system through the pivot and realised I wanted to try the product side. I asked my engineering manager for a PM capacity role. He agreed — no PM title, no roadmap, no OKRs. I had no PM background. I consulted other PMs on the team while building product instinct in real time.",
    task: "Own the product end to end — find the gaps, write the specs, run the full PDLC, and ship things that actually moved the numbers. I was working as a PM and FE engineer both.",
    action: [
      "Started by finding what was broken rather than inheriting what existed. The clearest gap was analytics visibility — clients couldn't see what was working on their platform. Without analytics, clients couldn't make decisions. Without decisions, they couldn't justify staying.",
      "Scoped it properly — specs, design, BE and FE engineering, testing — and the honest estimate was 6 to 7 weeks. We did not have 6 to 7 weeks.",
      "Made a call: integrate Looker Studio via iframe instead of building the analytics layer from scratch. Two weeks, not seven. The tradeoff was real — the embedded Looker interface would not match our design system. Named it upfront and presented the tradeoff to stakeholders: 7 weeks done right, or 2 weeks with a UI inconsistency we would resolve in the next sprint.",
      "Leadership pushed back — they wanted to think it through. Instead of arguing, I built a rough working version and showed them. They could see it working. They aligned.",
      "Put real effort into making the embedded interface feel as native as possible — matching Donut.cx colours and styling as closely as the iframe constraint allowed. Wrote the specs, developed alongside the engineers, and owned QA."
    ],
    result: [
      "Onboarded before the competitor.",
      "10 new clients in the 2 months after launch — roughly 20% growth in client base, from about 50 to 60 clients.",
      "Active users on the platform grew approximately 21% in the first 30 days.",
      "The UI inconsistency was resolved in the next sprint."
    ],
    followups: [],
    watchout: "Do NOT say 'PM role formalised' — removed from this story. The 21% is active user growth, not session lift — be precise. The 20% client growth is from 50 to 60 clients in 2 months — have that calculation ready. Leadership pushed back but aligned after seeing the prototype — that is your conflict moment, do not skip it."
  },
  {
    id: 9,
    title: "AskDigbi Technical Overhaul",
    company: "Digbi Health | 2025",
    tags: ["Technical Depth", "Dive Deep", "Are Right A Lot", "AI Evaluation", "Data-driven Decision"],
    situation: "AskDigbi, the Digbi health conversational AI, was live but quietly not working. Nobody had instrumented it well enough to know what was actually broken.",
    task: "Own a full overhaul of the technical AI layer — measured before and after with defined criteria. Not just qualitatively better. Specifically better.",
    action: [
      "When I monitored the pipeline with Langfuse I found four compounding problems: the prompt was not structured for consistent output, user data was being parsed incorrectly before reaching the model, the RAG chunking strategy was pulling context from the wrong time windows, and the agent could only answer questions about the most recent food log.",
      "Started with Langfuse to establish a baseline before touching anything — retrieval accuracy, response latency, output relevance. The baseline told me what to fix first: RAG chunking was causing the most user-facing failures. Wrong context meant wrong answers. That came first.",
      "Rewrote the prompt with explicit structure, fixed user data parsing, reworked the chunking strategy so retrieval pulled the right historical data.",
      "Set evaluation criteria — accuracy, relevance, latency — and tested every change against all three before it went near production. When the prompt rewrite improved accuracy but increased latency, I iterated until both were acceptable.",
      "On the product side: extended AskDigbi to other pages so the AI picks up context from wherever you are — not just the main screen."
    ],
    result: [
      "~90 open bugs on Jira related to AskDigbi output quality. The overhaul resolved 30–35 of them — roughly 35% — specifically the ones traceable to the four compounding technical failures.",
      "The evaluation benchmarks became a sales asset — enterprise buyers with AI governance requirements asked specifically for performance documentation.",
      "The full AI suite — food agent and AskDigbi together — helped bring in 5 enterprise clients contributing approximately $8M in new revenue."
    ],
    followups: [],
    watchout: "This is Story 9 — separate from Story 2 (AskDigbi UX). Story 2 fixed the UX and built the question-generation agent. Story 9 fixed the technical AI pipeline. If both come up: 'I worked on AskDigbi twice — once on the UX and engagement side, and once on the technical AI pipeline.' The $8M is the full AI suite — food agent and AskDigbi together — not AskDigbi alone. Always frame it that way."
  }
];
