-- AI & PM Questions seed
-- Run in Supabase SQL editor after the main seed.sql
-- Category: 'ai' — matches existing schema

INSERT INTO questions (question, category) VALUES
  ('How does AI change what a PM actually does day-to-day?', 'ai'),
  ('How do you decide whether to build an AI feature in-house or buy/integrate a third-party solution?', 'ai'),
  ('What metrics would you use to measure whether an AI feature is working?', 'ai'),
  ('A user reports that your AI feature gave them wrong information and they made a decision based on it. How do you handle it?', 'ai'),
  ('How do you prioritize an AI feature on your roadmap when its impact is uncertain?', 'ai'),
  ('How do you think about AI ethics when designing a feature targeting a broad user base?', 'ai'),
  ('How do you explain what an AI feature does to a non-technical user?', 'ai'),
  ('What''s the risk of AI replacing user workflows, and how do you design around it?', 'ai'),
  ('How does AI change the competitive moat for a product?', 'ai'),
  ('A user group that''s a minority of your base gets significantly worse results from your AI feature. How do you handle it?', 'ai'),
  ('How do you design an AI feature that users can trust even when they can''t verify the output?', 'ai'),
  ('How do you think about feedback loops in AI-powered products?', 'ai'),
  ('How do you manage the cost of running AI features at scale?', 'ai'),
  ('How would you approach building an AI feature when you have very little training data?', 'ai'),
  ('When should you use a foundation model vs. a fine-tuned model?', 'ai'),
  ('How do you handle a situation where your AI feature performs well on average but fails for specific user groups?', 'ai'),
  ('How would you explain your AI roadmap to non-technical stakeholders?', 'ai'),
  ('How do you decide when automation should replace a human step vs. when humans should stay in the loop?', 'ai'),
  ('What does AI governance mean at the PM level, and what''s your role in it?', 'ai'),
  ('How do you think about user expectations when launching an AI feature for the first time?', 'ai'),
  ('What is prompt engineering and how would an APM use it practically — not as an engineer, but as a PM?', 'ai'),
  ('What is an AI agent and how might one affect a product you work on as an APM?', 'ai'),
  ('What is multimodal AI and what product use case would it unlock at an entry-level PM''s scope?', 'ai');

-- Model answers

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'AI shifts a PM''s job from information-gathering to judgment. The tedious parts — synthesis, note-taking, data pulls — get faster. The judgment-intensive parts — prioritization, stakeholder alignment, user insight — remain human work and become more important.

Concretely, here''s what changes at the APM level:
- Discovery: AI can cluster user feedback, auto-tag themes in interviews, and surface anomalies in usage data. I still decide what the pattern *means* and whether it''s worth acting on.
- Writing: briefs, PRDs, release notes draft faster. But if I let AI write the "why" of a feature, I lose my own understanding of it — and that shows in reviews.
- Analysis: SQL-level data questions become conversational. I can iterate faster without waiting for a data analyst.

What doesn''t change:
- Understanding the emotional context behind user behavior
- Building trust with engineers and designers
- Making the call when data is ambiguous

Risk for APMs: Over-relying on AI synthesis early in a career means you skip the pattern-recognition muscle-building that makes senior PMs good. Use AI to go faster, not to skip the thinking.

My default: AI for speed on repeatable tasks; human judgment on anything that shapes strategy or user trust.'
FROM questions WHERE question = 'How does AI change what a PM actually does day-to-day?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'At the APM level, the build vs. buy question for AI is usually already partially answered by your company''s platform and data reality. My framework:

**Buy/integrate when:**
- The capability is not a differentiator (e.g., spell check, basic summarization)
- You lack the training data or ML engineering capacity to build it well
- Speed-to-market matters more than customization
- A good API exists (OpenAI, Cohere, Anthropic, etc.)

**Build when:**
- Your proprietary data is the moat — the model only gets good because of what you know
- Latency or privacy requirements rule out external APIs
- The behavior needs to be deeply customized to your product''s context

At my level, I''d frame this as: "What''s our data advantage here?" If we don''t have unique data, we''re not going to beat a foundation model vendor at their own game.

Process: write a one-pager covering capability requirements, data availability, engineering cost, and the risk of API dependency (what happens if the vendor raises prices or gets acquired?). Get input from ML engineering before committing.

Tradeoff to flag: buying is faster but creates vendor dependency. Building gives control but requires sustained ML investment. For most APM-stage features, I''d start with a vendor integration, validate user value, then evaluate building later if scale or differentiation justify it.'
FROM questions WHERE question = 'How do you decide whether to build an AI feature in-house or buy/integrate a third-party solution?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'AI feature measurement needs two layers: task performance and user/business impact.

**Task performance (did the AI do the right thing?):**
- Accuracy / precision / recall depending on the task type
- Hallucination rate for generative features — how often does it produce confident wrong output?
- Latency — AI responses that take 8 seconds feel broken even if they''re correct

**User impact (did it help users accomplish their goal?):**
- Task completion rate with vs. without the feature
- Time-on-task: did the AI make the user faster?
- Feature adoption and repeat use — one-time use suggests curiosity, not value
- User satisfaction (thumbs up/down, CSAT, NPS delta)

**Business impact:**
- Retention among users who use the AI feature vs. those who don''t
- Support ticket deflection if the AI is serving a support function
- Revenue attribution if the feature is part of a paid tier

What I''d avoid over-indexing on: raw engagement. Users interacting with an AI feature a lot might mean it''s valuable — or it might mean it''s not working and they''re retrying repeatedly.

One metric I always add: error recovery rate. When the AI gets it wrong, can users easily correct it? A feature with 80% accuracy and good error recovery is often more usable than one with 90% accuracy and no recovery path.'
FROM questions WHERE question = 'What metrics would you use to measure whether an AI feature is working?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'This is a trust incident, not just a bug. Handle it in parallel tracks:

**Immediate response (24 hours):**
1. Acknowledge the user directly, personally. Don''t hide behind a canned response.
2. Understand what happened: what did they ask, what did the AI say, what decision did they make, what was the impact?
3. Determine severity: is this a one-off edge case or a systematic failure pattern?

**Short-term (this sprint):**
- Pull logs for the specific interaction
- Reproduce the failure — can I trigger the same wrong output?
- Check if this error class exists in other recent interactions (sample 50-100 similar queries)
- Flag to engineering and the ML team with specifics

**Product response:**
- If it''s a systematic issue: add a disclosure ("AI can make mistakes — verify important decisions") and/or gate the feature while fixing
- If it''s an edge case: document it, add it to the eval set, improve the guardrail for that class of query

**Communication:**
- Tell the user what we found and what we''re fixing, with a timeline
- If they suffered real harm, escalate to legal/policy

The principle I operate from: AI features that handle consequential decisions need confidence indicators, clear disclaimers, and easy human escalation paths. If we didn''t build those in, the incident is partly a product design failure, not just a model failure.

Never minimize. Never blame the user for trusting the product.'
FROM questions WHERE question = 'A user reports that your AI feature gave them wrong information and they made a decision based on it. How do you handle it?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Uncertainty doesn''t mean deprioritize — it means change how you validate before committing full build resources.

My approach for AI features with uncertain impact:

**Stage 1: Time-boxed spike (1-2 weeks)**
- Can we build a rough prototype using an existing API or prompt engineering?
- Measure: does the output quality meet a minimum bar for the intended task?
- If no: stop. If yes: move to user testing.

**Stage 2: User testing with non-production prototype**
- Show 10-15 target users the AI output (even manually generated) and ask: would this change how you do this task? Would you use this weekly?
- This de-risks the "will users care?" question before engineering investment

**Stage 3: Estimate impact more concretely**
- With user feedback in hand, I can score RICE more confidently
- I replace "unknown impact" with a bracketed estimate: low/medium/high with rationale

**On the roadmap:**
- I''d put well-validated AI features in the regular queue with normal prioritization
- I''d put unvalidated AI ideas in a "discovery/spike" category — time-boxed, low-commitment, explicit validation criteria

Tradeoff to be honest about: some stakeholders push AI features because they''re exciting, not because there''s evidence of user need. My job is to require the same evidence standard for AI features as any other feature — and push back when that bar isn''t met.'
FROM questions WHERE question = 'How do you prioritize an AI feature on your roadmap when its impact is uncertain?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Ethics for AI features isn''t a checklist — it''s a set of questions I embed into the design process before launch.

**The questions I ask early:**

1. **Who could be harmed by errors?** If the AI makes a mistake, who bears the cost? A bad playlist recommendation is recoverable. A wrong medical or financial suggestion is not. The severity of failure should shape how conservative the design is.

2. **Does the feature perform equitably?** AI models trained on biased data produce biased outputs. I''d ask: have we tested this feature''s performance across demographics, languages, and use contexts? Where does accuracy degrade?

3. **Is the user aware they''re interacting with AI?** Transparency is a baseline. I don''t hide AI generation — users deserve to know, especially for consequential content.

4. **Are we creating dependency we haven''t earned?** If users start trusting our AI for things it''s not reliably good at, we''ve created a harm by overpromising.

5. **What''s the opt-out path?** Users who don''t want AI-generated content should be able to get the non-AI experience without significant friction.

**Practical process:**
- Include ethics review in the design review phase, not as an afterthought post-launch
- For broad-impact features, I''d involve policy/legal/trust-and-safety before shipping

The standard I hold: I should be comfortable explaining how this feature works to any user it affects — including those most likely to be harmed by errors.'
FROM questions WHERE question = 'How do you think about AI ethics when designing a feature targeting a broad user base?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'The goal is accurate mental model, not technical explanation. Users don''t need to know what a transformer is; they need to know what to expect, what to trust, and what to do when it fails.

My approach:

**Lead with the job it does, not how it works:**
"This feature reads your notes and suggests the three most relevant action items" — not "this uses an LLM with retrieval-augmented generation."

**Set honest expectations upfront:**
"It''s usually right, but it can miss context only you''d know. Always review before sending."

**Explain the failure mode simply:**
"If it suggests something that doesn''t make sense, hit the thumbs-down button. That helps us improve it."

**Show, don''t tell:**
An animated example or first-run walkthrough communicates the feature''s behavior better than any copy.

**For in-product UI, I follow three rules:**
1. Label AI-generated content clearly (a small "AI" badge or "Suggested by AI" label)
2. Make editing/dismissing trivial — one click to discard
3. Provide a feedback mechanism (thumbs up/down or "This was helpful")

**For stakeholder communication:**
When explaining an AI feature to non-technical stakeholders, I use the "input → process → output" frame: "Here''s what the user provides, here''s what the system does with it, here''s what they receive." Keep it to 3 sentences, then offer to go deeper if they want.

Non-technical users don''t need to understand AI — they need to trust it appropriately.

Design for calibrated trust, not maximum trust.'
FROM questions WHERE question = 'How do you explain what an AI feature does to a non-technical user?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'The risk is real and operates on two levels: user experience and product health.

**At the UX level:**
If AI takes over a workflow the user understood and controlled, they may feel disempowered, confused when it fails, and unable to course-correct. Think of autocomplete that fills in text the user didn''t intend — it''s faster until it''s wrong, and then it''s infuriating.

**At the product health level:**
If users become dependent on an AI workflow that we later change or remove (due to cost, model changes, or quality issues), we''ve broken something core to their product experience. We''ve also potentially lost their skill — which means churn risk is higher when they consider alternatives.

**Design principles I apply:**

1. **AI as assistant, not actor** — default to AI suggesting, not AI doing. Let users confirm before the action takes effect, at least in V1.

2. **Preserve the manual path** — don''t remove the non-AI workflow. Users should be able to do the task without AI if they choose.

3. **Make AI behavior legible** — if the AI reorganized something, the user should be able to see what it changed and revert easily.

4. **Build in degradation gracefully** — what happens when the AI is unavailable or wrong? The product should still work, just more slowly.

5. **Measure displacement, not just adoption** — if AI feature adoption goes up but overall task completion goes down, something is wrong. The feature might be replacing the workflow without delivering the outcome.

The framing I use internally: we''re giving users a power tool, not replacing their hands.'
FROM questions WHERE question = 'What''s the risk of AI replacing user workflows, and how do you design around it?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'AI reshapes moats in two ways: it erodes some existing moats and creates new ones — sometimes for you, sometimes for your competitors.

**Moats AI tends to erode:**
- UX differentiation: if your advantage was "we''re easier to use," foundation models give competitors a fast path to comparable UX
- Content moats: if your advantage was curated content, AI can generate comparable content at scale
- Basic feature differentiation: features that took months to build can now be prototyped in weeks

**Moats AI can create or strengthen:**
1. **Proprietary data**: A model trained on your users'' behavior, domain-specific data, or private knowledge base will outperform a generic model. This is the strongest AI moat.
2. **Feedback loops**: If your AI improves with each user interaction and competitors'' AI doesn''t (because they lack the data pipeline), you widen the gap over time.
3. **Embedded trust**: Users who''ve come to rely on your AI''s specific behavior will churn less — if it''s accurate and predictable.
4. **Integration depth**: AI that''s deeply embedded in the user''s workflow (Copilot in Word, for example) creates switching costs that API-based competitors can''t easily replicate.

**At the APM level, the practical question is:**
Does the AI feature we''re building deepen our data advantage, or are we just wrapping a generic API in our UI? If it''s the latter, we need to be honest that we''re buying time, not building a moat.

For most early-stage AI features: shipping is the right move. Build the data flywheel, then differentiate. Don''t use "it won''t be a moat" as a reason not to ship.'
FROM questions WHERE question = 'How does AI change the competitive moat for a product?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'This is both a fairness problem and a product quality problem. I treat it as both.

**Immediate triage:**
- How large is the gap in performance? Slightly worse vs. significantly worse is a different urgency level.
- What''s causing it? Training data representation? A feature of the task that''s structurally harder for this group? Evaluation metrics that didn''t test for this segment?
- Who is affected? "Minority of base" can still mean thousands of users.

**Short-term:**
- Add this segment to the eval set immediately so future model changes are measured against their performance, not just the majority
- Consider a disclosure if the performance gap is significant: "This feature works best for [context X]; we''re improving it for [context Y]"
- If the feature is consequential (medical, financial, hiring), consider restricting availability for this group until quality meets a minimum bar

**Medium-term:**
- Work with ML engineering to understand the training data distribution
- Collect more signal from this user group — with consent — to improve future model versions
- Partner with trust and safety or policy if this implicates regulatory compliance

**What I''d communicate:**
I''d acknowledge the gap directly in any user-facing communication — not defensive, not minimizing. "We''ve identified that our AI feature performs less accurately for [X] users. We''re actively improving this and will update you when we have meaningful progress."

The principle: minority users are not an acceptable tradeoff for majority performance. Every user deserves a product that works for them, and shipping an AI feature that knowingly performs worse for a protected or underrepresented group is a trust and legal liability.'
FROM questions WHERE question = 'A user group that''s a minority of your base gets significantly worse results from your AI feature. How do you handle it?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Trust in AI output without verification is an interesting design problem — you''re asking users to trust a black box. The answer is to make the box less black without requiring technical depth from users.

**Design patterns that build calibrated trust:**

1. **Show the source or reasoning** — "Based on your last 3 conversations with this customer" tells the user why the AI said what it said. Reasoning is more trustworthy than a bare conclusion.

2. **Confidence signals** — "High confidence: X" vs. "Uncertain: you may want to verify this." Don''t pretend equal certainty for all outputs.

3. **Consistency over time** — A feature that gives the same answer for the same input builds trust through predictability. Random variation (even if accurate) erodes trust.

4. **Graceful disagreement** — When users override the AI''s suggestion, track it (if they consent). If users regularly override the same type of output, the model should learn from that.

5. **Start with low-stakes outputs** — First introduce the AI feature for decisions that are easy to verify (drafting a non-critical email) before deploying for high-stakes decisions. Let users build their own trust model.

6. **Human escalation path** — Always offer: "Talk to a person instead." Users who know they can escalate trust the AI more because the stakes feel lower.

**What to avoid:**
- Anthropomorphizing the AI so much that users over-trust it
- Hiding error rates in fine print
- Removing edit/override capability to make the feature "cleaner"

Trust is earned by being reliable and transparent over time. Design for the long-term trust relationship, not the first-impression wow moment.'
FROM questions WHERE question = 'How do you design an AI feature that users can trust even when they can''t verify the output?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Feedback loops are what separate AI products that get better over time from ones that stay static. They''re also what can create runaway failures if not designed carefully.

**The basics of AI feedback loops:**

1. **User signal collection** — Every interaction is a potential data point: thumbs up/down, explicit ratings, corrections, repeated retries (implicit negative signal), or downstream behavior (did the user act on the AI''s suggestion?).

2. **Connecting signal to model improvement** — Raw user feedback doesn''t automatically improve the model. There needs to be a pipeline: collect signal → label or validate → retrain or fine-tune → evaluate → deploy. As a PM, I own defining what "good" looks like; ML engineering owns the pipeline.

3. **Ground truth definition** — The hardest part of a feedback loop is defining what correct output looks like. For some tasks (math, code), ground truth is clear. For others (writing quality, recommendations), it requires human evaluation or proxy metrics.

**Risks to design around:**
- **Feedback bias**: if only certain users provide feedback (power users, complainers), the model optimizes for them, not the full user base
- **Reward hacking**: if the feedback signal is engagement, the model may learn to generate engaging-but-wrong output
- **Drift**: user preferences change; a model trained on last year''s feedback may drift out of alignment with current needs
- **Self-reinforcing loops**: recommendation systems that only show what users already like create filter bubbles and suppress discovery

**My PM role in this:**
Define the feedback mechanism in the design spec, not as an afterthought. Decide which signals are trustworthy and how they flow to model improvement. Set a cadence for reviewing model performance — not just at launch but quarterly.'
FROM questions WHERE question = 'How do you think about feedback loops in AI-powered products?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'AI inference costs are real and can surprise PMs who haven''t shipped AI features before. I think about cost in three stages: design, launch, and scale.

**At design time:**
- Choose the right model size for the task. Using a state-of-the-art large model for a task a smaller, cheaper model handles fine is waste.
- Design for appropriate latency. Real-time AI responses cost more than async (batch) processing — use async where users will tolerate it.
- Set a per-user or per-call cost ceiling early. Know what the unit economics need to be for this feature to be viable at scale.

**At launch:**
- Implement usage limits on AI calls per user/session to prevent abuse and cost spikes
- Cache common outputs where appropriate (same input → same output can be served from cache)
- Monitor cost per active user from day one — if it''s not in your launch metrics dashboard, add it

**At scale:**
- Evaluate model distillation or fine-tuning a smaller model on your specific task if volume justifies the engineering investment
- Negotiate volume pricing with your AI vendor once you have predictable usage
- Run a cost/value audit quarterly: is this feature generating revenue or retention value proportionate to its inference cost?

**The PM''s responsibility:**
Cost optimization on AI features is partly an engineering problem, but the PM needs to own the business case. If an AI feature costs $X per user per month and monetization only delivers $Y, the feature is underwater — even if users love it.

I always include an AI cost line in my feature business case. If I can''t model it, I''m not ready to ship it.'
FROM questions WHERE question = 'How do you manage the cost of running AI features at scale?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Low data is a common starting condition, not a blocker. The approach depends on what kind of data you have and what kind of AI feature you''re building.

**Options, in order of what I''d try first:**

1. **Use foundation models with prompting** — For many tasks, a well-prompted GPT-4/Claude-class model outperforms a custom-trained model with limited data. Start here. You don''t need your own data to leverage a foundation model.

2. **Few-shot examples in context** — If you have even 10-20 high-quality examples, include them in the prompt. This dramatically improves output quality without training.

3. **Retrieval-Augmented Generation (RAG)** — If your problem is "the model doesn''t know our specific content/data," RAG lets you retrieve relevant information at query time and inject it into the context. No training required.

4. **Synthetic data generation** — Generate training examples using an existing AI model, then fine-tune on those. Works for structured tasks; requires careful quality review.

5. **Fine-tuning on curated small datasets** — If you have 100-500 high-quality labeled examples, fine-tuning a smaller open-source model can beat a generic large model for your specific task.

**The data flywheel approach:**
Start with prompting, ship the feature, collect user interactions as implicit training data. As the dataset grows, improve the model. This is the most practical path for most PM-stage products.

**What to flag to stakeholders:**
Low data means higher error rates early. Set honest expectations: "V1 will have [X]% accuracy. We''ll improve it as we collect more signal from real usage." Don''t promise production-grade quality from a cold-start model.'
FROM questions WHERE question = 'How would you approach building an AI feature when you have very little training data?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'This is a spectrum, not a binary — and the answer usually changes over the product lifecycle.

**Start with a foundation model when:**
- You''re validating whether AI can even solve the task
- You don''t have meaningful labeled training data
- Speed-to-market matters more than peak performance
- The task is general enough that a generic model handles it well (summarization, classification, Q&A)
- Your team doesn''t have ML engineering resources for training infrastructure

**Consider fine-tuning when:**
- The foundation model consistently fails in specific, predictable ways you can fix with examples
- You have 500+ high-quality labeled examples specific to your task
- Latency or cost is a concern (fine-tuned smaller models can match large model quality at fraction of cost)
- Your domain has specialized vocabulary, format, or reasoning the generic model doesn''t handle well (legal, medical, financial)
- You need consistent output format or tone that prompting alone doesn''t reliably produce

**The decision path I use:**
1. Prototype with a foundation model + prompting
2. Evaluate quality on real examples
3. If quality is sufficient → ship with foundation model
4. If quality fails in specific patterns → collect those failure cases → fine-tune on them
5. Evaluate fine-tuned model vs. foundation model on held-out test set
6. Ship whichever wins on quality + cost + latency

**What to watch for:**
Fine-tuning can reduce generalization — a fine-tuned model may perform worse on slightly different inputs. Always evaluate on diverse test cases, not just in-distribution examples.

For most APM-level products, start with a foundation model. Fine-tuning is a later optimization, not a starting point.'
FROM questions WHERE question = 'When should you use a foundation model vs. a fine-tuned model?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Average performance masking group-level failures is one of the most common and dangerous patterns in AI products. My approach:

**Diagnosis first:**
- Segment performance metrics by user group: demographics, use case type, language, device, account tenure
- Run evaluation on held-out data stratified by these groups — not just overall accuracy
- Interview users in underperforming segments to understand the qualitative failure mode

**Severity classification:**
- Is this a minor quality gap or a systematic failure that makes the feature unusable for this group?
- Does it touch a protected characteristic (race, gender, disability, language)? If so, urgency and legal exposure increase.

**Response options:**
1. **Fix the model** — add more representative training data, adjust evaluation metrics to penalize group-level failures, run targeted fine-tuning
2. **Constrain the feature** — restrict availability to user groups where it meets a minimum quality bar; communicate clearly
3. **Add a disclaimer** — if the gap is modest, a clear disclaimer ("works best for X") manages expectations while you improve
4. **Accelerate the feedback loop** — add targeted data collection for the underperforming group with user consent

**Communication:**
Be transparent with affected users. "We know this feature doesn''t work as well for [X] users and we''re working on it" is better than silence. Silence gets discovered, and discovery is worse than proactive disclosure.

**Internal:** Document the gap, the cause, and the remediation plan. Put it in the ML roadmap, not just the bug queue. This is a product quality issue, not just a model bug.'
FROM questions WHERE question = 'How do you handle a situation where your AI feature performs well on average but fails for specific user groups?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Non-technical stakeholders — executives, sales, marketing, customer success — need to understand the AI roadmap in terms of user outcomes and business impact, not model architecture.

**The frame I use:**
"Here''s the user problem we''re solving, here''s how AI enables a solution we couldn''t build before, here''s what we''re shipping and when, and here''s how we''ll know it''s working."

**Structure for an AI roadmap presentation:**

1. **Problem statement** — What user pain are we solving? Establish this without mentioning AI.
2. **Why AI unlocks this now** — One sentence: "AI lets us [do X] at a scale/accuracy/speed that wasn''t possible before."
3. **Three milestones with dates** — Keep it to three. "Shipped," "In progress," "Planned." Non-technical stakeholders don''t need the build-train-evaluate cycle explained.
4. **Success metrics** — User-facing: task completion, time savings, satisfaction. Business-facing: retention, conversion, cost reduction.
5. **Risks and mitigations** — Be honest about where the AI might fail and what you''re doing about it. This builds credibility.

**What to avoid:**
- Technical jargon (LLM, fine-tuning, RAG, embeddings) without definition
- Overpromising on accuracy timelines — AI capability improvements are less predictable than feature development
- Treating AI as a differentiator in the roadmap without explaining what makes it specifically your AI advantage

**For skeptics:**
"The goal isn''t to use AI — the goal is to help users [outcome]. AI is the mechanism that makes that possible at this scale. If a simpler approach worked better, I''d use that." This reframes AI as means, not end.'
FROM questions WHERE question = 'How would you explain your AI roadmap to non-technical stakeholders?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'This is one of the most important design decisions in AI product work. I evaluate it across three dimensions: consequence, accuracy, and user trust.

**Keep humans in the loop when:**
- Consequences of errors are high (financial, medical, legal, safety)
- AI accuracy is below a threshold that makes errors unacceptably frequent
- The decision requires context the AI doesn''t have access to (emotional context, unstated user preferences, organizational politics)
- The user''s trust in the AI hasn''t been established yet (early in product lifecycle)
- Regulatory or compliance requirements mandate human review

**Move toward automation when:**
- Errors are low-consequence and easily correctable
- AI accuracy is consistently high on measured test sets
- The human step creates meaningful friction or delay that degrades user experience
- Volume makes human review unsustainable at scale
- Users have demonstrated trust through adoption and low override rates

**The gradient, not the binary:**
Most good AI features don''t go straight from "human does it" to "AI does it." The path is:
1. AI suggests → human approves → action taken
2. AI acts → human can undo → action taken
3. AI acts → exception flagged for human review → action taken
4. AI acts autonomously with audit log

Move along this gradient based on accuracy and user trust evidence, not optimism.

**Specific example:**
Email response drafting: AI drafts (user reviews and edits) is the right starting state. AI sends automatically is appropriate only after users have edited <10% of drafts consistently for a meaningful sample period — evidence they trust it.

The principle I hold: automate the task, preserve the agency.'
FROM questions WHERE question = 'How do you decide when automation should replace a human step vs. when humans should stay in the loop?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'AI governance at the PM level is the set of practices that ensure AI features are built, shipped, and operated responsibly — with clear accountability for what they do and what they shouldn''t do.

**My role as a PM:**

1. **Define the scope of AI decisions** — What can the AI decide autonomously? What requires human review? What should the AI never do? I own documenting these boundaries before launch.

2. **Establish evaluation criteria** — What quality bar must the AI meet before it ships? What accuracy, fairness, and safety thresholds are required? I work with ML engineering to define these and hold the gate.

3. **Own the audit trail** — For consequential AI features, I ensure there''s a log of what the AI decided and why, so errors can be diagnosed and accountability can be established.

4. **Monitor in production** — Governance isn''t just pre-launch. I track quality metrics, bias signals, and user feedback continuously post-launch. I set up alerts for performance degradation.

5. **Handle incidents** — When the AI fails in a significant way, I lead the incident response on the product side: communicate to affected users, coordinate with ML on root cause, decide whether to roll back.

**Concrete governance artifacts I create:**
- AI feature spec section: "What this AI will and won''t do"
- Launch checklist: accuracy threshold, fairness evaluation, disclosure copy, escalation path
- Monitoring dashboard: accuracy, error rate, user override rate, cost

**The honest answer on limits:**
Full AI governance at the enterprise level involves legal, policy, compliance, and dedicated AI governance teams. At the APM level, I''m doing the product layer of governance — not the whole picture, but a critical layer.'
FROM questions WHERE question = 'What does AI governance mean at the PM level, and what''s your role in it?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Users come to AI features with wildly variable expectations — from "this will be magic and never wrong" to "AI stuff never works for me." Neither extreme is the right calibration, and the PM''s job is to set accurate expectations before and during first use.

**The expectations problem:**
Overpromising causes trust collapse when the feature inevitably makes a mistake. Underpromising causes under-adoption — users don''t try the feature at all. I aim for calibrated optimism: "Here''s what this is reliably good at, here''s where you should double-check."

**Design interventions that manage expectations:**

1. **Onboarding disclosure** — A one-time first-run screen: "This feature uses AI. It''s accurate [X]% of the time. You can always review and edit what it suggests." Short, honest, specific.

2. **In-context confidence signals** — Label outputs that are high vs. low confidence. Don''t treat all AI output the same.

3. **Fail gracefully and visibly** — When the AI doesn''t know something or is likely to be wrong, say so in the UI. "I''m not sure about this one — you may want to verify."

4. **Lead with a win** — Design the first-use experience to showcase a task where the AI is reliably accurate. Don''t let the first interaction be an edge case.

5. **Set up the feedback loop** — "Was this helpful?" After the first few uses, this both collects data and signals to the user that their feedback matters.

**The metric I track:**
Expectation calibration is hard to measure directly. I use proxy metrics: user override rate (are users regularly correcting the AI?), repeat use rate (did users come back after the first use?), and qualitative research on first-use experience.

Get expectations right at launch — it''s much harder to recover from a trust deficit than to build trust gradually.'
FROM questions WHERE question = 'How do you think about user expectations when launching an AI feature for the first time?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Prompt engineering is the practice of structuring inputs to an AI model to improve the quality and relevance of outputs. For a PM it means writing clearer, more constrained requests — the same skill as writing a good brief, applied to AI tools.

The core practices: give context first (who you are, what you are building, what outcome you need), specify format explicitly (bullet list, 3 sentences, table), add constraints (what not to include), and provide an example output when the format is not obvious.

Bad prompt: "Write a product spec." Better prompt: "Write a one-page spec for a mobile notification feature. Include: problem statement, 2 success metrics, 3 user stories, and explicit out-of-scope items. Audience is a 5-person engineering team. Do not include implementation details."

At APM level the most valuable application is building reusable prompt templates for recurring tasks — user interview synthesis, feature prioritization scoring, competitive analysis summaries. Write the prompt once, refine it, and reuse it so the quality compounds over time.'
FROM questions WHERE question = 'What is prompt engineering and how would an APM use it practically — not as an engineer, but as a PM?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'An AI agent is a system that uses an AI model to take sequences of actions autonomously — rather than responding to a single query. An agent can search, write code, send messages, or call APIs in a loop until a goal is complete.

For an APM on a productivity or workflow product, agents start appearing as: automated research assistants that gather and summarize information on demand, customer support systems that resolve tickets end-to-end without human review, or workflow triggers that act on conditions without a user initiating anything.

The product implication: if an AI agent can complete a task your UI currently handles — booking a slot, filing an expense — the user''s interaction shifts from navigating your interface to delegating a goal. Products with clean APIs and predictable data schemas will be used by agents. Products that require complex UI navigation will be bypassed.

At APM level: monitor whether your power users are asking for automation or API access. That is the early signal that agents are entering your product''s neighborhood.'
FROM questions WHERE question = 'What is an AI agent and how might one affect a product you work on as an APM?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'Multimodal AI refers to models that process and generate multiple types of input and output — text, images, audio, video, code — rather than a single modality. GPT-4o and Gemini are examples: they can take a screenshot and respond in text, or take voice input and return structured data.

**What this unlocks at entry-level PM scope:**

The most accessible use case: image + text input for user-facing features that previously required users to manually describe something. Examples at APM scope:
- A bug reporting tool where users upload a screenshot and the AI pre-fills the bug report fields
- A food logging app where users photograph a meal and AI estimates nutrition without manual entry
- A design feedback tool where a PM uploads a mockup and AI flags accessibility or UX issues

**Why this matters for APMs specifically:**
Multimodal doesn''t require more ML infrastructure than text-only — if you''re using a foundation model API, you just pass an image alongside the text prompt. The engineering lift is low. The user experience delta is high.

**The PM question to ask:**
Where in the current workflow do users have to translate something visual or auditory into text just to interact with your product? That translation step is friction. Multimodal AI can remove it.

**What to watch:**
Latency is higher for multimodal inputs. Cost per call is higher. And privacy considerations multiply — users may not realize images they upload contain metadata or faces. Address these in the spec before shipping.'
FROM questions WHERE question = 'What is multimodal AI and what product use case would it unlock at an entry-level PM''s scope?';
