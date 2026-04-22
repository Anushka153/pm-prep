-- Run this in the Supabase SQL editor
-- Step 1: Temporarily allow anon inserts (or just run as superuser here)

-- Insert questions
INSERT INTO questions (question, category) VALUES
  ('Describe your experience developing AI-driven products from concept to launch.', 'ai'),
  ('How do you prioritize features in an AI product roadmap?', 'ai'),
  ('What methodologies do you use for gathering user requirements for AI products?', 'ai'),
  ('How do you measure the success of an AI feature?', 'ai'),
  ('How do you handle bias or hallucinations in AI products you manage?', 'ai'),
  ('Walk me through how you would build a recommendation system for a new product.', 'ai'),
  ('How do you work with ML engineers and data scientists as a PM?', 'ai'),
  ('How do you ensure your AI models are ethical and unbiased?', 'ai'),
  ('How do you measure the success of an AI product post-launch?', 'ai'),
  ('A key metric has dropped 20% week over week. Walk me through how you''d diagnose it.', 'execution'),
  ('Design a product for [X user group] to solve [Y problem].', 'design'),
  ('Should [company] enter [new market]?', 'strategy'),
  ('Tell me about a time you had to make a decision with incomplete data.', 'behavioral'),
  ('How many Uber rides happen in New York City per day?', 'estimation'),
  ('How do you manage or lead a team?', 'behavioral'),
  ('Describe a time you pivoted your product strategy based on user feedback.', 'behavioral');

-- Insert model answers (linked by question text to get the id)
INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'At my internship at Digbi Health, I built an AI-powered food safety agent entirely from scratch. The problem was that nutritionists were manually reviewing every food item for members with gut conditions — it didn''t scale. I designed a full RAG pipeline where a barcode scan triggers ingredient extraction, maps to a custom taxonomy, retrieves personalized safety rules, and GPT-4.1 synthesizes a response. I used LangFuse for prompt versioning and ran structured evaluations before launch. The product went live during my internship and meaningfully reduced manual review time for the nutrition team.

💡 Tips:
• Lead with the problem, not the tech
• Name the pipeline components (RAG, eval, versioning) — shows depth
• Always end with measurable outcome'
FROM questions WHERE question = 'Describe your experience developing AI-driven products from concept to launch.';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'I prioritize by combining user impact with technical feasibility. First I segment users and identify which pain point is most acute and most frequent. Then I evaluate each feature on two axes — how directly it moves the primary metric, and how much engineering risk or model uncertainty it carries. For AI products specifically, I also factor in evaluation readiness — if we can''t measure whether the AI is performing correctly, I won''t ship it. I prefer phased rollouts starting with 5–10% of users so I can validate before scaling.

💡 Tips:
• AI-specific wrinkle: eval readiness as a gate — this is a differentiator most candidates miss
• Mention model uncertainty as a distinct risk type from eng risk
• Phased rollout % shows operational maturity'
FROM questions WHERE question = 'How do you prioritize features in an AI product roadmap?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'I start with direct user interviews to understand the job they''re trying to get done — not what feature they want, but what outcome they need. For AI products specifically, I also shadow actual workflows to find where humans are doing repetitive judgment calls, because that''s usually where AI can add the most value. At Digbi Health, I observed nutritionists reviewing food logs manually before designing the agent. I then validate requirements through lightweight prototypes and structured eval sets before committing to a full build.

💡 Tips:
• Shadowing workflows to find repetitive judgment calls is the AI-specific insight here — lead with it
• Eval sets as a validation tool (not just usability tests) signals AI PM maturity
• JTBD framing (outcome not feature) is always strong'
FROM questions WHERE question = 'What methodologies do you use for gathering user requirements for AI products?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Split into two layers: model performance metrics (precision, recall, latency, p99) AND product metrics (task completion rate, time saved, user trust score)
• Guardrail: error rate must stay below X% before scaling
• Mention eval sets and human-in-the-loop review for early stage'
FROM questions WHERE question = 'How do you measure the success of an AI feature?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Name the risk types: hallucination, bias, prompt injection, over-reliance
• Mitigations: RAG grounding over pure generation, structured eval with adversarial test cases, confidence thresholds, human review loop
• Show you think about guardrails before launch, not after'
FROM questions WHERE question = 'How do you handle bias or hallucinations in AI products you manage?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Cold start is the first problem — how do you handle new users with no data?
• Collaborative filtering vs content-based vs hybrid — know the tradeoffs
• Define the optimization target first (watch time? satisfaction? revenue?) — interviewers love when you challenge the default'
FROM questions WHERE question = 'Walk me through how you would build a recommendation system for a new product.';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Show you understand model lifecycle: training → eval → deployment → monitoring
• Your job: translate business requirements into clear eval criteria they can build against
• Key habit: write the eval set before the model is built — forces clarity on what success looks like'
FROM questions WHERE question = 'How do you work with ML engineers and data scientists as a PM?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'I approach this at three stages — data, evaluation, and deployment. At the data stage, I audit training and retrieval data for representation gaps. At evaluation, I test model outputs across different user segments — not just average accuracy, but accuracy for edge case users who are often underrepresented. At deployment, I always keep a human-in-the-loop for high-stakes decisions. At Digbi Health, every food safety recommendation the AI made was reviewable by a nutritionist before it affected a member''s diet plan. I also set up observability through LangFuse so I could catch drift or unexpected outputs in production.

💡 Tips:
• Three-stage structure (data → eval → deployment) is clean and memorable
• Human-in-the-loop for high-stakes decisions is the key safety signal — always name the stakes
• LangFuse / observability for drift shows you think beyond launch day'
FROM questions WHERE question = 'How do you ensure your AI models are ethical and unbiased?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'I measure across three layers. First, task performance — is the AI doing the job accurately? For the food safety agent that meant precision and recall on ingredient flagging. Second, user behavior — are users actually acting on the AI''s output, or ignoring it? Low adoption is a signal the AI isn''t trustworthy yet. Third, business impact — did it move the metric we cared about, which in our case was nutritionist time saved per member per week. I also monitor for model drift over time using LangFuse, because AI products can degrade silently after launch in ways traditional software doesn''t.

💡 Tips:
• Three-layer framework (task performance → user behavior → business impact) is clean and reusable
• Low adoption as a trust signal is the AI-specific nuance most candidates miss
• Model drift monitoring shows you think about post-launch lifecycle, not just ship-and-forget'
FROM questions WHERE question = 'How do you measure the success of an AI product post-launch?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Clarify before diving: which metric, what time period, which platform/geo?
• Funnel first — isolate which step broke before building hypotheses
• Internal (bug/deployment) vs external (competitor, seasonality) check early'
FROM questions WHERE question = 'A key metric has dropped 20% week over week. Walk me through how you''d diagnose it.';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Mission → Users → Pain points → Solutions → Metrics — in that order
• Always pick ONE primary user and go deep, don''t try to serve everyone
• End with: primary metric, guardrail metric, and what a 10% rollout looks like'
FROM questions WHERE question = 'Design a product for [X user group] to solve [Y problem].';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Framework: Market attractiveness (size, growth, margin) × Fit (capabilities, moat, distribution)
• Always give a clear recommendation — don''t hedge
• Name the beachhead, the moat you''d build, and the metric that would make you reverse course'
FROM questions WHERE question = 'Should [company] enter [new market]?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• STAR but weight heavily on your reasoning process, not just the outcome
• Show you set a decision deadline, named your assumptions explicitly, and built in a checkpoint to revisit
• Amazon LP: Bias for Action + Are Right A Lot'
FROM questions WHERE question = 'Tell me about a time you had to make a decision with incomplete data.';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, '💡 Tips:
• Segment by use case: commute, airport, night out, business
• NYC population ~8M → active adult riders → trip frequency per week
• Sanity check against known data: Uber does ~5M US trips/day; NYC is ~15–20% of that → ~750K–1M'
FROM questions WHERE question = 'How many Uber rides happen in New York City per day?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'I lead by context, not control. My job is to make sure everyone on the team understands the why behind what we''re building — the user problem, the success metric, and the constraints. Once that''s clear, I give people ownership over their area and check in at decision points rather than micromanaging execution.

I also set SMART goals with my team — Specific, Measurable, Achievable, Relevant, and Time-bound. For example, at Digbi Health, instead of saying "improve the AI agent," I framed it as "achieve 90% accuracy on ingredient flagging within six weeks before we roll out to the first 50 members." That gave the team a clear target, a deadline, and a measurable definition of done.

I believe in fast feedback loops — I''d rather surface a wrong assumption in week one than week six. I was working cross-functionally with engineers and nutritionists, and I made it a point to bring both sides into problem framing early, so solutions didn''t get rejected downstream.

💡 Tips:
• Lead with your philosophy first (context not control), then back it with a concrete example
• SMART goals signal operational maturity — always tie to a real deliverable
• Cross-functional framing (engineers + domain experts) shows you think about alignment, not just output'
FROM questions WHERE question = 'How do you manage or lead a team?';

INSERT INTO model_answers (question_id, answer_text)
SELECT id, 'At Digbi Health, I initially designed the food safety agent so nutritionists would review AI outputs after the fact — essentially as a quality check. But when I observed how nutritionists actually worked, they told me reviewing outputs they had no hand in felt uncomfortable. They didn''t trust recommendations they couldn''t trace. So I pivoted the design — instead of reviewers, I made them co-authors. I gave them visibility into the reasoning chain and let them adjust taxonomy rules directly. That single change dramatically improved buy-in and adoption.

💡 Tips:
• The pivot from "reviewer" to "co-author" is the insight — make sure you name that reframe explicitly
• Root cause was trust, not accuracy — shows you dug deeper than surface feedback
• Outcome: adoption and buy-in, not just a feature change — close the loop'
FROM questions WHERE question = 'Describe a time you pivoted your product strategy based on user feedback.';
