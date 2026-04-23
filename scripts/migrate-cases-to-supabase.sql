-- Run this in the Supabase SQL editor
-- Step 1: Create the case_logs table

CREATE TABLE IF NOT EXISTS case_logs (
  id integer PRIMARY KEY,
  company text NOT NULL,
  score numeric,
  practice boolean DEFAULT false,
  type text[] DEFAULT '{}',
  title text NOT NULL,
  question text NOT NULL,
  nailed text[] DEFAULT '{}',
  missed text[] DEFAULT '{}',
  keywords text[] DEFAULT '{}',
  model text[] DEFAULT '{}',
  drill text,
  rice text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read case_logs"
ON case_logs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert case_logs"
ON case_logs FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update case_logs"
ON case_logs FOR UPDATE TO authenticated USING (true);

-- Step 2: Seed existing cases

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(1, 'Amazon', 7.5, false,
 ARRAY['execution','amazon'],
 'Drop in Repeat Purchases',
 'Amazon is seeing a drop in repeat purchases from customers who bought a product for the first time. How would you diagnose the problem and what would you do about it?',
 ARRAY[
   'Strong clarifying questions — scoped to Amazon.com, defined repeat purchase correctly',
   'Segmentation by price range, category, demographics, and time',
   'Four solid hypotheses: poor post-purchase experience, no re-engagement, competition, product quality',
   'Specific validation metrics for each hypothesis'
 ],
 ARRAY[
   'Moving faster to solutions after diagnosis',
   'Voicing assumptions out loud instead of processing silently',
   'Business metrics (GMV, take rate) without being prompted'
 ],
 ARRAY['Cohort analysis','Churn rate','LTV','CAC','Retention curve','NPS baseline'],
 ARRAY[
   'Segment by category (consumables vs durables), price ($0–50, $50–200, $200+), demographics, and time (sudden vs gradual)',
   'Top hypotheses: poor post-purchase experience, no re-engagement, competitive loss, weak product quality',
   'Validate with return rates, delivery complaints, email open rates, seller ratings',
   'Solutions: fix returns flow, proactive delivery updates, personalized re-engagement, stricter seller thresholds',
   'Primary metric: 30-day repeat purchase rate. Guardrail: do not increase promotional spend without ROI threshold'
 ]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(2, 'Amazon', 8.0, false,
 ARRAY['execution','amazon'],
 'Add-to-Cart Drop 15%',
 'You are the PM for Amazon''s mobile app. The CEO tells you the add-to-cart rate has dropped by 15% over the last two weeks. What do you do?',
 ARRAY[
   'App bug as H4 hypothesis — most insightful observation',
   'Quick fix vs full revert decision framework',
   'Re-engagement email nudge showing business awareness',
   'Time-to-add-to-cart as a creative secondary metric'
 ],
 ARRAY[
   'Voicing clarifying questions out loud before segmenting',
   'Faster delivery of solutions once root cause identified',
   'A/B test rollout details and thresholds'
 ],
 ARRAY['Funnel analysis','Conversion rate','Session replay','Error rate','Deployment rollback'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(3, 'Amazon', 8.5, false,
 ARRAY['execution','amazon'],
 'Prime — Renewal Drop 20%',
 'Amazon Prime membership renewals have dropped by 20% over the last quarter. How would you approach this problem?',
 ARRAY[
   'Video vs ecommerce segmentation',
   'Singles vs families vs frequent shoppers breakdown',
   'Four hypotheses: content library, competitive pricing, weak engagement, product quality',
   'Customer complaint keyword analysis as fast validation method',
   '10% A/B test rollout over two weeks'
 ],
 ARRAY[
   'Content originals strategy for long-term library improvement',
   'Subscriber LTV analysis to prioritize which segment to save',
   'Competitive benchmarking details'
 ],
 ARRAY['Churn rate','Subscriber LTV','Content licensing','ARPU','DAU/MAU ratio'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(4, 'YouTube', 9.0, false,
 ARRAY['design'],
 'Recommendation Algorithm Improvement',
 'How would you improve YouTube''s recommendation algorithm?',
 ARRAY[
   'Unpaid users + Shorts as the right focus given ad revenue goal',
   'Recommendation bias and latency as key risks',
   'Interested/not interested button as lowest friction, highest signal solution',
   '20% watch time improvement threshold grounded in real session math',
   '10% beta rollout with cultural sensitivity check on walk-to-save option'
 ],
 ARRAY[
   'Creator side impact — better recommendations affect creator revenue and behavior',
   'Cold start problem for new users with no watch history',
   'Filter bubble risk from over-personalization'
 ],
 ARRAY['CTR','Watch time per session','Collaborative filtering','Content diversity score','Cold start','Filter bubble'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(5, 'Amazon', 9.0, false,
 ARRAY['design','amazon'],
 'Review Abuse Detection System',
 'Design a system to track review abuse on Amazon.com.',
 ARRAY[
   'Three abuse types: duplicate reviews, abusive language, irrelevant images',
   'Review count vs purchase count ratio as fake review signal',
   'NLP model for language, vision AI for image detection',
   'Human-in-the-loop: flag with model, decide with human',
   'Confusion matrix for model evaluation with precision/recall awareness',
   'Alpha testing internally before external rollout'
 ],
 ARRAY[
   'Seller incentive abuse — brands paying for fake positive reviews',
   'Verified purchase filter as baseline trust signal',
   'Cross-device and multi-account detection for serial abusers'
 ],
 ARRAY['Precision vs recall','False positive rate','Verified purchase badge','Sockpuppet accounts','Bot detection'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(6, 'Product Design', 9.5, false,
 ARRAY['design'],
 'Design an International Airport in Europe',
 'Design an international airport for a medium-sized European city like Prague or Valencia.',
 ARRAY[
   'Aeronautical vs non-aeronautical revenue distinction',
   'Frequent flyer prioritization for highest lifetime value',
   'Time efficiency and value for money as core underlying needs',
   'Automated baggage, navigator PWA app, bundled pricing, X-shaped terminal (moonshot)',
   '25% to 90% automated baggage rollout with human safety net',
   'PWA instead of native app — showed technical awareness'
 ],
 ARRAY[
   'Schengen vs non-Schengen zone design implication for European airports',
   'Dwell time as the key retail revenue metric',
   'Sustainability regulations specific to European infrastructure',
   'Connecting passenger experience as a distinct segment'
 ],
 ARRAY['Dwell time','Throughput','RPE','Common use terminal','Slot-controlled','Footfall','Yield management'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(7, 'Strategy', 9.0, false,
 ARRAY['strategy'],
 'Grofers vs Big Basket — 2010',
 'If you could go back to 2010, before either existed, would you build a Big Basket model or a Grofers model — and why?',
 ARRAY[
   'No UPI, COD dominance, and low digital trust in 2010 India',
   'Kirana onboarding difficulty — they already delivered free',
   'Asset-light to hybrid to full inventory phased strategy',
   'Tier 1 city focus for digital-ready consumers',
   'Corrected kirana household estimate (200–500, not 5,000)'
 ],
 ARRAY[
   'Stating the Tier 1 city assumption upfront instead of mid-answer',
   'Jio effect post-2016 as a tailwind for quick commerce',
   'Cold chain infrastructure as a Big Basket moat'
 ],
 ARRAY['CAC','Dark stores','SKU density','Cold chain','Hyperlocal delivery','Unit economics','Contribution margin','GMV per order'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(8, 'Design', 9.0, false,
 ARRAY['design','strategy'],
 'Borrowing & Lending Product',
 'Design a product for borrowing and lending. You are building a standalone startup with Series A funding.',
 ARRAY[
   'Supply-first thinking — onboard lenders before borrowers',
   'Green/yellow/red damage framework set by lender upfront — creative and defensible',
   'AI photo comparison for dispute resolution with human escalation',
   '10% flat take rate justified with unit economics (5–6% breakeven + 4% profit)',
   'College town pilot with 50/50 split and 4–5 month runway'
 ],
 ARRAY[
   'Escrow payment mechanism — hold borrower money until successful return',
   'Discovery problem — how do borrowers find items on the platform?',
   'Geographic expansion strategy after the college town pilot',
   'Insurance as a premium feature for high-value lenders'
 ],
 ARRAY['Escrow','Two-sided marketplace','Liquidity problem','Cold start','KYC','Trust and safety'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(9, 'Lyft', 8.5, false,
 ARRAY['design','execution'],
 'Improve Ride Quality',
 'You are the PM for Lyft. How would you improve ride quality?',
 ARRAY[
   'Daily commuters in peak hours as the right segment',
   'Six pain points across the full ride journey',
   'Walk 0.4 miles for lower price — similar to Google Maps dynamic routing',
   'AI driver availability prediction with confidence percentage in UI',
   'Saved favorite places for quick booking',
   'Complete metrics: primary (rides, surge bookings), secondary (GMV, cancellations), quality (NPS), guardrail (peak bookings)',
   'Cultural sensitivity check on walk option before full rollout',
   'Jevons Paradox cited correctly as a guardrail concern'
 ],
 ARRAY[
   'Driver quality improvement solutions (rating system, background checks)',
   'In-ride experience features (music, temperature preference)',
   'Safety features (share ride status, SOS button)'
 ],
 ARRAY['Surge pricing algorithm','Geofencing','Driver utilization rate','ETA accuracy','Ride completion rate'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, rice) VALUES
(10, 'Spotify for Artists', null, true,
 ARRAY['prioritization'],
 'Prioritize Creator Tools Roadmap — RICE',
 'You''re PM for Spotify for Artists. Five feature requests are on the table but you only have one sprint (4 weeks). Use RICE to decide what to build.',
 ARRAY[
   'Define the north star metric FIRST before scoring anything (artist 90-day retention / weekly streams per artist)',
   'Score all 5 features explicitly — don''t pick by gut',
   'State your Reach and Impact assumptions out loud before writing numbers',
   'Pick TWO winners and explain why the others lost'
 ],
 ARRAY[
   'Picking the ''coolest'' feature (fan DM) without scoring — it scores lowest on RICE',
   'Not defining Reach in actual numbers — ''lots of artists'' is not a RICE score',
   'Forgetting to sanity-check Effort against a real sprint capacity',
   'Ignoring the supply side: how does this affect artists who haven''t activated yet?'
 ],
 ARRAY['RICE','North star metric','Opportunity scoring','Impact vs effort','Sprint capacity','Guardrail metric'],
 ARRAY[
   'Pick: Playlist submission (RICE 54K) + Analytics dashboard (RICE 42.7K). Both fit in 4 weeks.',
   'Playlist submission wins because it directly moves streams (the primary business metric), editorial teams already have a manual version so confidence is high, and it takes only 1 sprint.',
   'Analytics dashboard reduces artist churn — if artists can''t see their data, they disengage. Low effort, high reach.',
   'Fan DM loses despite high reach because confidence is low (privacy complexity, abuse risk) and effort is high.',
   'Guardrail: don''t ship playlist submission without a fraud/spam filter — bad submissions erode editorial trust.',
   'Secondary metric: streams per active artist. Guardrail: editorial playlist quality score must not drop.'
 ],
 '<div style="font-size:13px;font-weight:700;color:var(--accent2);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">RICE Scoring — North Star: Artist 90-day retention</div>
<table class="rice-table">
  <tr><th>Feature</th><th>Reach (artists/qtr)</th><th>Impact</th><th>Confidence</th><th>Effort (wks)</th><th>RICE Score</th></tr>
  <tr><td>Listener analytics dashboard</td><td>80K</td><td>2</td><td>80%</td><td>3</td><td class="score-cell">42,667</td></tr>
  <tr><td>Fan direct messaging</td><td>80K</td><td>1</td><td>50%</td><td>8</td><td>5,000</td></tr>
  <tr><td>Merch store integration</td><td>20K</td><td>3</td><td>70%</td><td>12</td><td>3,500</td></tr>
  <tr class="winner"><td>✅ Playlist submission tool</td><td>80K</td><td>3</td><td>90%</td><td>4</td><td class="score-cell">54,000</td></tr>
  <tr><td>Tour date promotion</td><td>30K</td><td>2</td><td>60%</td><td>6</td><td>6,000</td></tr>
</table>'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, rice) VALUES
(11, 'Notion', null, true,
 ARRAY['prioritization','b2b'],
 'Q3 Roadmap Prioritization — 8 items, pick 3',
 'You''re PM at Notion. 8 backlog items, 3 slots for Q3. Primary metric: team retention at 90 days. Walk me through your prioritization.',
 ARRAY[
   'Anchor every decision to the primary metric (team 90-day retention) — not personal preference',
   'Group features by who they serve: new teams vs power users vs IT/admins',
   'Explicitly deprioritize API improvements with a clear reason (low reach for a retention metric)',
   'State the strategic rationale, not just the RICE number: ''Slack integration reduces the #1 reason teams churn'''
 ],
 ARRAY[
   'Picking AI writing assistant first because it''s exciting — it has low confidence and high effort for a retention metric',
   'Not asking: which of these reduce churn vs which just add delight? They rank differently.',
   'Ignoring the onboarding redesign because it sounds boring — it has the highest RICE score',
   'Not noting what you''re cutting and why: cutting API work signals strategic judgment'
 ],
 ARRAY['RICE','Team retention','Churn reduction','North star metric','Deprioritization rationale','B2B SaaS'],
 ARRAY[
   'Pick: Onboarding redesign + Slack integration + Version history. All three directly reduce early-team churn.',
   'Onboarding wins because new teams are the highest-risk cohort for 90-day retention. A bad first week = permanent churn.',
   'Slack integration wins because Slack-heavy teams are the biggest competitor for Notion''s attention — removing friction in that transition is the highest-leverage retention play.',
   'Version history wins because it solves a trust problem: teams won''t fully migrate to Notion if they can''t recover a deleted page.',
   'AI writing assistant is deprioritized — high excitement, but low confidence on retention impact and high effort. Push to Q4.',
   'API improvements are cut entirely — developer reach is tiny relative to the retention metric we''re optimizing for.'
 ],
 '<div style="font-size:13px;font-weight:700;color:var(--accent2);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">RICE Scoring — North Star: Team retention at 90 days</div>
<table class="rice-table">
  <tr><th>Feature</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort</th><th>RICE</th></tr>
  <tr class="winner"><td>✅ Onboarding redesign</td><td>50K teams</td><td>3</td><td>85%</td><td>6</td><td class="score-cell">21,250</td></tr>
  <tr class="winner"><td>✅ Slack integration</td><td>40K teams</td><td>2</td><td>90%</td><td>4</td><td class="score-cell">18,000</td></tr>
  <tr><td>Guest access improvements</td><td>35K teams</td><td>2</td><td>80%</td><td>4</td><td>14,000</td></tr>
  <tr class="winner"><td>✅ Document version history</td><td>20K teams</td><td>2</td><td>90%</td><td>3</td><td class="score-cell">12,000</td></tr>
  <tr><td>AI writing assistant</td><td>80K users</td><td>2</td><td>70%</td><td>12</td><td>9,333</td></tr>
  <tr><td>Better database views</td><td>25K users</td><td>2</td><td>80%</td><td>5</td><td>8,000</td></tr>
  <tr><td>Mobile offline mode</td><td>30K users</td><td>2</td><td>80%</td><td>8</td><td>6,000</td></tr>
  <tr><td>API improvements</td><td>5K devs</td><td>1</td><td>90%</td><td>6</td><td>750</td></tr>
</table>'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(12, 'Digital Health (Digbi-type)', null, true,
 ARRAY['b2b','design'],
 'Redesign the Care Coordinator Dashboard',
 'You''re PM at a digital health company offering AI-powered health coaching (like Digbi). How would you redesign the care coordinator/coach-facing product to improve patient outcomes at scale?',
 ARRAY[
   'Use your actual Digbi experience — you know this user cold. State that upfront.',
   'Segment coordinators: new coordinators (overwhelmed) vs experienced ones (need efficiency tools)',
   'Frame success from both sides: patient outcomes AND coordinator capacity (patients per coordinator)',
   'Name the B2B client in your metrics — employer/insurer renews the contract based on aggregate outcomes, not individual NPS'
 ],
 ARRAY[
   'Designing for patients instead of coordinators — the question is about the B2B tool, not the consumer app',
   'Not mentioning coordinator burnout as the core pain — they manage 100+ patients manually',
   'Forgetting the discovery problem: coordinators can''t tell which patients need help NOW without scanning every profile',
   'Missing the business metric: employer contract renewal rate depends on aggregate health outcomes, not individual satisfaction'
 ],
 ARRAY['B2B SaaS','Clinical outcomes','Coordinator capacity','Contract renewal','Cohort analysis','At-risk queue','NPS','ARR'],
 ARRAY[
   'Users: care coordinators managing 50–200 patients. Core job: improve patient health outcomes at scale without burning out.',
   'Pain point 1 — No priority queue: coordinators review every patient manually to find who needs help today. Solution: AI-powered at-risk queue surfacing patients with missed check-ins, declining engagement, or flagged vitals.',
   'Pain point 2 — Session prep takes 15–20 min manually. Solution: auto-generated session prep card (last session summary, key metrics, 3 talking points).',
   'Pain point 3 — Reactive, not proactive. Solution: batch personalized messaging — templates + patient-level tokens, send 20 nudges in 5 minutes.',
   'Pain point 4 — No visibility into what works. Solution: cohort outcomes dashboard showing which interventions produce the best health metrics by patient segment.',
   'Primary metric: % of patients meeting engagement targets at 90 days. Secondary: patients per coordinator (capacity). Guardrail: patient NPS must not drop below 4.2/5.',
   'B2B metric to mention unprompted: employer contract renewal rate — this is what Digbi''s clients actually care about.'
 ]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, drill) VALUES
(13, 'TikTok', null, true,
 ARRAY['design','drill'],
 'Improve TikTok Creator Monetization',
 'How would you improve TikTok''s monetization for creators?',
 ARRAY[
   'Say this BEFORE you segment: ''I''m going to state my assumptions before I start — interrupt me if any are wrong''',
   'Assumption 1: ''I''m assuming the goal is creator retention, not just short-term platform revenue''',
   'Assumption 2: ''I''m focusing on mid-tier creators (10K–1M followers) — mega-influencers already have brand deals, nano-creators need discovery first''',
   'Assumption 3: ''I''m assuming TikTok''s take rate target on creator commerce is 10–15%''',
   'After every solution: ''I''m assuming this is technically feasible given TikTok''s existing livestream infrastructure'''
 ],
 ARRAY[
   'Jumping straight to ''creators want better analytics'' without saying WHY you chose that segment',
   'Building a solution on an unstated assumption — the interviewer can''t score what they can''t hear',
   'Saying ''obviously'' — nothing is obvious in an interview. State every premise.',
   'Processing silently for 5+ seconds. Say: ''Give me a moment to think through assumptions'' — then think out loud.'
 ],
 ARRAY['Creator economy','Take rate','Affiliate commerce','Creator retention','GMV','Platform take rate'],
 ARRAY[
   'State assumptions → segment creators → identify unmet need → solutions → metrics.',
   'Key assumption to voice: mid-tier creators generate the most content volume but earn the least per view. That''s the monetization gap.',
   'Solutions: (1) Tipping during livestreams with 85/15 split, (2) Creator subscription tiers ($4.99/mo for exclusive content), (3) Affiliate commerce with transparent attribution.',
   'Business metric to mention unprompted: creator GMV, platform take rate, creator 90-day retention rate.',
   'Guardrail: don''t increase monetization friction that reduces viewer engagement — watch time per session must not drop.'
 ],
 'Voice Every Assumption Aloud'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, drill) VALUES
(14, 'DoorDash', null, true,
 ARRAY['design','execution','drill'],
 'Improve DoorDash''s Merchant-Facing Product',
 'You''re PM for DoorDash''s merchant product. How would you improve it?',
 ARRAY[
   'Open with: ''The goal is to improve merchant retention — because merchant churn directly reduces GMV and consumer selection quality''',
   'Mention GMV per merchant before the interviewer prompts you',
   'Mention take rate (~15–30% depending on plan) as context for why merchants are frustrated',
   'Say: ''merchant NRR (net revenue retention) is the business metric I''d track — are merchants growing or shrinking their DoorDash revenue?''',
   'Connect solutions to business impact: ''better analytics → merchants optimise menus → higher order value → higher GMV for DoorDash'''
 ],
 ARRAY[
   'Only talking about merchant UX without connecting it to DoorDash''s revenue',
   'Not mentioning take rate — it''s the core tension: merchants pay 15–30% but often don''t see ROI',
   'Ignoring the supply side: DoorDash needs merchants more than merchants need DoorDash in some markets',
   'Describing features without the financial impact — every solution needs a ''this improves X by Y'' attached'
 ],
 ARRAY['GMV','Take rate','Merchant NRR','Contribution margin','Merchant churn','Supply quality','Order completion rate'],
 ARRAY[
   'Core tension: merchants pay 15–30% take rate but many don''t understand their ROI from DoorDash. That creates churn.',
   'Segment: high-volume chain locations vs independent restaurants. Independent restaurants have the most pain and highest churn risk.',
   'Pain point 1 — No visibility into ROI. Solution: ROI dashboard showing revenue from DoorDash vs cost of take rate + packaging.',
   'Pain point 2 — Menu errors cause bad ratings. Solution: AI menu suggestion tool — highlight items that perform well vs those that arrive poorly.',
   'Pain point 3 — Payout timing is opaque. Solution: real-time payout tracker with next-business-day option.',
   'Primary metric: merchant 90-day retention. Secondary: GMV per merchant, avg order value. Guardrail: consumer rating must not drop below 4.3.',
   'Business metric to mention: DoorDash marketplace take rate, merchant NRR, contribution margin per market.'
 ],
 'Business Metrics Unprompted'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, drill) VALUES
(15, 'Instagram', null, true,
 ARRAY['design','strategy','drill'],
 'Grow Instagram Reels',
 'How would you grow Instagram Reels?',
 ARRAY[
   'Open with: ''Before I talk about the viewer experience, I want to start on the supply side — Reels growth is constrained by creator output, not viewer demand''',
   'Segment creators FIRST: casual posters vs aspiring creators vs professional creators',
   'Name creator pain points before viewer pain points: unclear what performs and why, bad audio discovery, unreliable monetization',
   'Connect supply health to demand: ''if creators don''t post, there''s nothing for viewers to watch — supply is the bottleneck'''
 ],
 ARRAY[
   'Jumping straight to ''improve the Reels feed algorithm'' — that''s a demand-side fix, not a supply-side fix',
   'Treating Reels as a consumer product — it''s a creator platform with a consumer frontend',
   'Not mentioning creator monetization: creators won''t post if TikTok pays better',
   'Missing the cold start for new creators: no followers = no views = creators quit before they get traction'
 ],
 ARRAY['Creator retention','Supply-side','Cold start','Creator monetization','DAU/MAU','Algorithmic boost','Content diversity'],
 ARRAY[
   'Supply first: the binding constraint on Reels growth is creator output volume and quality, not viewer appetite.',
   'Creator pain point 1 — No signal on what works. Solution: Creator Intelligence dashboard — show which audio, caption style, and posting time drove reach for similar accounts.',
   'Creator pain point 2 — Audio discovery is broken. Solution: trending audio shelf in the creation flow, surfaced before you record, not after.',
   'Creator pain point 3 — Monetization is opaque. Solution: creator earnings estimator — ''post at X time on Y topic and your estimated reach-based payout is $Z''.',
   'New creator cold start: ''New Creator Boost'' — algorithmically amplify first 5 Reels for accounts with <1K followers to give them a reason to keep posting.',
   'Primary metric: creator 30-day retention (% of creators who post again within 30 days). Secondary: Reels watch time, shares. Guardrail: don''t sacrifice feed engagement for Reels.'
 ],
 'Address Supply/Creator Side First'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, drill) VALUES
(16, 'Peer Learning Platform', null, true,
 ARRAY['design','strategy','drill'],
 'Design a Peer Skill-Sharing Platform',
 'Design a product for peer-to-peer professional skill sharing — practitioners teaching practitioners. You have Series A funding.',
 ARRAY[
   'Say explicitly: ''Before I design any feature, I need to address the cold start problem — this is a two-sided marketplace and Day 1 has no supply and no demand''',
   'Name the cold start solution before moving on: single skill, single company, seed supply before opening demand',
   'Define a liquidity threshold: ''I won''t open to demand-side learners until we have 10 courses with at least 3 lessons each''',
   'Explain why supply is harder to acquire than demand: practitioners have less incentive to teach than learners have to learn'
 ],
 ARRAY[
   'Designing the learner experience on Day 1 — without supply, learners have nothing to engage with',
   'Treating this like a consumer app launch — it''s a marketplace, cold start is the #1 risk',
   'Not defining a minimum viable supply threshold before spending on demand acquisition',
   'Skipping the supply incentive: why would a practitioner spend 5 hours creating a course for free?'
 ],
 ARRAY['Cold start','Two-sided marketplace','Supply-first','Liquidity threshold','Beachhead market','Cohort model','Take rate'],
 ARRAY[
   'Cold start solution: geo-fence to ONE skill (e.g. SQL for non-engineers) at ONE company as a corporate pilot.',
   'Supply incentive: pay early practitioners a flat $500 per course for the first 30 days. This seeds content before you can monetise via learners.',
   'Minimum viable supply: 10 courses × 5 lessons = 50 pieces of content before opening to demand. Track this as a daily KPI.',
   'Demand flywheel: once supply is in place, run a 2-week cohort with 50 learners. Completion rate = signal for quality. Social proof = more learners.',
   'Trust mechanism: practitioner verification (LinkedIn + skill assessment). Learners won''t pay for unverified content.',
   'Monetization: learner pays $30/course, platform takes 20%, practitioner keeps 80%. At 100 learners/course, practitioners earn $2,400 — sustainable without a platform fee.',
   'Primary metric: course completion rate (>60% = quality signal). Secondary: learner NPS. Guardrail: practitioner earning per hour must exceed $40 to retain supply.'
 ],
 'Name and Solve Cold Start Explicitly'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model, drill) VALUES
(17, 'Swiggy', null, true,
 ARRAY['design','drill'],
 'Improve Swiggy''s Food Ordering Experience',
 'You''re PM for Swiggy''s food ordering experience for consumers. How would you improve it?',
 ARRAY[
   'Open with: ''Before I talk about checkout or delivery, I want to start with discovery — most orders fail before they even start because users can''t find what they want''',
   'Name the discovery problem explicitly: keyword search fails indecisive users who don''t know what they want yet',
   'Distinguish two discovery modes: ''I know what I want'' (search-led) vs ''I don''t know what I want'' (browse-led)',
   'Address dish-level discovery, not just restaurant-level: ''I want biryani'' should show me the best biryanis, not the best restaurants'
 ],
 ARRAY[
   'Jumping straight to improving checkout or tracking — those are downstream of the discovery problem',
   'Only improving search — 40%+ of sessions are browse-not-search, especially on weekends',
   'Not mentioning the business impact of better discovery: higher order conversion = higher GMV = better take rate revenue',
   'Missing the cold start for new restaurants: new restaurants have no reviews, so they don''t surface in discovery even if good'
 ],
 ARRAY['Discovery problem','Order conversion rate','GMV','Session-to-order rate','Dish-level search','Personalisation','Reorder rate'],
 ARRAY[
   'Discovery is the #1 conversion problem: users who can''t find something they want in 3 minutes abandon the app.',
   'Segment by discovery intent: (1) Goal-directed — know what they want (search), (2) Mood-led — browsing (need curation), (3) Repeat — want their usual (need quick reorder).',
   'Pain point 1 (Mood-led): No ''what sounds good tonight'' flow. Solution: mood-based collections (''Comfort food'', ''Light and healthy'', ''Under 30 min'') surfaced on the home screen, personalised by past orders.',
   'Pain point 2 (Dish-level): Search returns restaurants, not dishes. Solution: dish-level search — ''biryani'' shows a ranked list of biryani dishes from all nearby restaurants with rating + price.',
   'Pain point 3 (New restaurants): New restaurants are invisible. Solution: ''New near you'' shelf with a 3-week algorithmic boost for newly onboarded restaurants.',
   'Primary metric: order conversion rate (session → placed order). Secondary: avg order value, reorder rate. Guardrail: delivery rating must not drop below 4.2.',
   'Business metric: GMV per session. A 5% lift in conversion × 1M daily sessions = 50K more orders/day at ₹500 avg = ₹2.5Cr incremental GMV/day.'
 ],
 'Address the Discovery Problem'
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(18, 'Apple Maps', 7.5, false,
 ARRAY['strategy'],
 'Win Market Share for Apple Maps',
 'You are a PM for Apple Maps. How would you win market share? If it already has all features, how would you market it?',
 ARRAY[
   'Strong clarifying questions — scoped to iOS, set 18–24 month timeline upfront',
   'Four distinct user segments grounded in real behaviour: new to town, daily commuters, weekend outgoers, third-party integration users',
   'Moat framing was smart — correctly identified ecosystem lock-in as Apple''s biggest lever',
   'Metrics were clean: primary (users on, journey starts, notif conversion), secondary (CarPlay), guardrail (CSAT/DSAT)',
   'The core insight — distribution over features — was stated out loud, which is the right place for it'
 ],
 ARRAY[
   'Didn''t explicitly separate ''win market share'' vs ''how to market it'' — interviewers ask both together to see if you notice they''re different problems',
   'Solutions were scattered across effort levels — Safari redirect and Lyft/Uber partnerships live at very different levels of ownership; grouping by effort or impact would feel more structured',
   'Metrics were disconnected from solutions — tie each metric back to a specific solution so it reads as one cohesive argument, not a checklist',
   'The core insight (distribution not features) should anchor the opening 30 seconds, not emerge mid-answer'
 ],
 ARRAY['Default distribution','Habit formation','Ecosystem lock-in','Switching cost','Activation','Commute loop','CarPlay','Privacy moat','Beachhead segment'],
 ARRAY[
   'Open with the reframe: This is a distribution problem, not a feature problem. Apple Maps doesn''t need to out-feature Google Maps — it needs to out-default it. Every iPhone ships with Maps pre-installed, so the problem is activation and habit formation, not acquisition.',
   'Pick one beachhead segment: Daily commuters — highest frequency of use, fastest habit loop. Win them first, then extend to weekend and out-of-town use cases.',
   'Core strategy: Use the ecosystem as a forcing function. When someone sets a work location in contacts or calendar, Apple Maps proactively surfaces commute routes at the right time of day. No extra permission friction beyond what''s already granted — turns passive Apple data into active Maps engagement.',
   'Why it wins: Creates usage habit through utility, not marketing. Once someone relies on Maps for daily commute, switching cost goes up naturally.',
   'Metrics: Weekly active navigations/user, commute route saves, 30-day retention after first navigation. CarPlay sessions as secondary signal.',
   'Marketing angle: People don''t switch maps apps from ads — they switch in a moment of need. Insert Apple Maps into those moments. Safari → Apple Maps default for directions searches. CarPlay setup prompt for new car buyers. New iPhone buyers and people who just moved are the only paid ad targets worth spending on.',
   'Privacy is the earned media angle: Google Maps monetizes your location data. Apple doesn''t. That''s a real differentiator and it resonates culturally right now.',
   'What not to do: Google Ads (fighting Google on Google''s turf with Google''s money). Feature comparison campaigns (positions you as the challenger, wrong frame when you''re already on every iPhone).',
   'One-line throughline: Default + utility + ecosystem data = habit. Everything else is secondary.'
 ]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(19, 'Netflix', 7.5, false,
 ARRAY['execution'],
 'NS Metric Drop',
 'Netflix''s NS (North Star) metric has dropped. How would you diagnose the problem and what would you do about it?',
 ARRAY[]::text[],
 ARRAY[
   'Think more metric — go deeper and wider on the metric tree before jumping to hypotheses',
   'Think out loud — voice every assumption, segmentation choice, and reasoning step as you go'
 ],
 ARRAY['North Star metric','Metric tree','Funnel analysis','Cohort analysis','DAU/MAU ratio','p99 / p95 latency','Streaming quality score','Play rate','Hours watched per subscriber'],
 ARRAY[
   'Clarify the NS metric: is it hours watched per subscriber per month, play rate, or retention?',
   'Build a metric tree: NS = (# subscribers who played) × (avg hours per player). Decompose each branch.',
   'Segment before hypothesing: new vs existing subscribers, content genre, device (mobile/TV/web), geography, subscription tier.',
   'Hypotheses: content library gap, technical degradation (buffering, p99 latency spike), recommendation failures, external competition, price-driven churn.',
   'Validate fast: check p99/p95 playback latency, streaming quality score, error rates, and recommendation CTR before running surveys.',
   'Primary metric: hours watched per subscriber/month. Guardrails: subscriber count, content licensing cost, churn rate.'
 ]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(20, 'Instagram', 8.5, false,
 ARRAY['design'],
 'Redesign Instagram DMs',
 'How would you redesign Instagram''s DM feature?',
 ARRAY[
   'User segmentation was genuinely strong — content creators, frequent active users, passive users shows DMs mean different things to different people',
   'Sharp, specific creator pain point: no way to distinguish spam brand deals from real collab requests — feels research-backed',
   'AI segmentation solution flows naturally from the pain points — good problem-to-solution structure',
   'Verbalized the influencer focus upfront and defended it as the right segment to prioritize',
   'Described the filter UI out loud: top-level tab strip separating friends vs collabs — clean and intuitive',
   'RICE/effort-impact scoring on solutions (1–2–3) to justify which to build first — shows prioritization discipline',
   'Tradeoffs and guard rails included — a lot of candidates skip these entirely'
 ],
 ARRAY[
   'Primary metric was session time — too broad for a DM redesign; collab response rate or collab conversion rate is tighter and directly tied to the segment you prioritized',
   'Pain points got slightly scattered (reels/day point landed better verbally than in the written structure)'
 ],
 ARRAY['DM triage','AI classification','Signal-to-noise','Inbox tabs','Creator monetization','Collab conversion rate','Creator retention','False positive rate','Response rate'],
 ARRAY[
   'Open with a reframe: IG DMs now serve three completely different jobs — personal conversations, creator-fan interaction, and brand deal sourcing. Trying to solve all three with one inbox is the core tension. State this upfront.',
   'Pick a focus: content creators, explicitly, because they drive Meta''s revenue. A creator with a better deal pipeline = more sponsored content = more ad inventory. That''s a boardroom-level argument.',
   'The specific problem: a creator with 500K followers gets hundreds of DMs daily. A message from their mom sits next to a spam brand deal sits next to a Fortune 500 collab. There is no signal-to-noise layer.',
   'Solution: AI-powered DM triage into three buckets — Personal, Potential Collab, Spam. UI is a tab strip at the top of the inbox (not buried in settings). Collabs tab shows: sender follower count, brand category, and a one-line AI summary of the ask. Creator acts with one tap: Accept / Decline / Flag as spam.',
   'Moonshot: AI chief of staff that drafts collab responses based on the creator''s past deals and rate card.',
   'Why this wins: makes Instagram the place where creator businesses get done. Deepens lock-in far more than any engagement metric.',
   'Primary metric: collab response rate + time-to-first-response on collab messages. Secondary: creator retention month-over-month. Guardrail: false positive rate on AI classification — misrouting a real friend''s message to spam erodes trust fast.'
 ]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(21, 'DoorDash', 7.5, false,
 ARRAY['design','execution'],
 'Improve DoorDash Merchant Product — Live Attempt',
 'You''re PM for DoorDash''s merchant product. How would you improve it?',
 ARRAY[
   'Called out DoorDash as a 3-sided marketplace (merchants, dashers, consumers) — shows marketplace fluency',
   'Clarifying questions on goal and demographic — directionally correct framework behavior',
   'Segment prioritization reasoning was defensible: Walmart/Target have IT resources, local businesses don''t',
   'Moonshot (AI manager): forecasting, SKU management, supplier ordering — coherent agentic PM concept tied to real experience',
   'Guardrail metric was strong: AI accuracy and latency for forecasting predictions — shows failure mode thinking'
 ],
 ARRAY[
   'Pain points were surface-level and onboarding-only — never mapped across the full merchant journey (onboarding → daily ops → growth)',
   'Missed daily operation pain points: order management chaos at peak hours, menu update friction, payout transparency, cancellation visibility',
   'Jumped to solutions before completing pain point coverage — interviewer can''t follow which pain point the AI manager solves',
   'Segment ''home running / cloud business from home'' was vague — should name it precisely: ghost kitchens or home-based food businesses',
   'Solution 3 (Learner tab) too vague — ''understand how to grow'' needs to specify: what data, what outcome',
   'Business metrics absent — no GMV per merchant, merchant retention rate, order volume per merchant, take rate impact',
   'Primary metric (session time + AI convos) doesn''t connect to a business outcome — interviewer will push: so what if session time goes up?',
   'No launch strategy — no pilot city, no merchant cohort, no success threshold before scaling'
 ],
 ARRAY['Merchant retention rate','Order volume per merchant','GMV contribution','Merchant churn','Payout cycle','Menu management','Cancellation rate','Order accuracy','Supply-side NPS'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(22, 'Instagram', 8.5, false,
 ARRAY['design','strategy'],
 'Grow Instagram Reels — Live Attempt',
 'How would you grow Instagram Reels?',
 ARRAY[
   'Supply-side framing from the start — ''enough demand but supply needs to be streamlined before demand drops off'' — identified the binding constraint correctly',
   'Segment selection sharp: three creator tiers (professional, casual, aspiring) with clear rationale for aspiring — highest upside if activated',
   'Pain points specific and well-sequenced: don''t know what works → tools → monetization opaque → gifts/subscriptions — dependency logic stated explicitly',
   'Solution 1 (Creator Intelligence Dashboard): trending audio, caption style, content impact on demographics — concrete and tied to the pain point',
   'Prioritization logic voiced: ''We can''t do 3 and 4 before we fix 1 — it''s a dependency'' — structural thinking rewarded in interviews',
   'Best metrics yet: primary (reels posted + impressions), secondary (GMV, ARPU), guardrail (reel quality) — ARPU unprompted fixes recurring gap',
   'Launch strategy present: 5% rollout to aspiring creators, tweak algorithm, then expand'
 ],
 ARRAY[
   'Clarifying questions too scattered — 5 in a row reads as fishing; should ask 2–3 targeted then commit',
   'Solution 2 (Monetization Dashboard) underdeveloped — projection model not explained: based on similar cohorts? What''s the data source?',
   'Solution 3 (Reachout Dashboard) named a risk but didn''t mitigate it — if you name a risk, name the fix',
   'Cold start problem missed again — new aspiring creators have no data; what does the dashboard show on day one?',
   'Guardrail metric too vague — ''quality of reels'' is not measurable; should be watch completion rate, skip rate, or report rate',
   'Primary metric not connected to business outcome — more reels posted → ad inventory → ad revenue; one sentence closes that loop'
 ],
 ARRAY['Creator retention rate','Content velocity','Watch completion rate','Skip rate','Ad inventory','CPM','Creator LTV','Cold start','Cohort benchmarking','Activation rate'],
 ARRAY[]::text[]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(23, 'Google / Gemini', 8.5, false,
 ARRAY['execution','google'],
 'Confident But Wrong — Fix Gemini''s Trust Problem',
 'You''re the PM for Gemini. Users are complaining that the product feels ''confident but wrong.'' How would you fix this?',
 ARRAY[
   'Defined ''wrong'' operationally as user-reported signals (thumbs down, corrections, contradictory follow-ups, session abandonment) — not ground truth benchmarks. Right PM/model boundary.',
   'Chose casual users as the highest-impact segment: they can''t verify answers, so confident wrongness does the most damage to activation and retention.',
   'Correctly identified this as gradual/systemic — not a deployment bug, which shaped hypotheses toward chronic causes.',
   'Three solutions attacking three distinct root causes: source attribution (UX), clarifying questions for ambiguous queries (product flow), and wording/tone calibration (copy).',
   'Prioritized Solution 3 (tone/wording) correctly: highest impact, least effort, no model retraining needed — pure product copy fix.',
   'Launch sequencing was logical: start with tone fix, learn, then layer source attribution.',
   'Guardrail metric was strong: don''t deteriorate retention and answer quality to the point that users stop trusting Gemini entirely.',
   'Secondary metric (contradictory back-and-forth within same session) was creative and specific — real hallucination detection signal.',
   'Incorporated mid-session feedback immediately (H3 and H4 correctly reframed).'
 ],
 ARRAY[
   'Primary metric underspecified — ''thumbs up/down'' is a direction, not a metric. Should be: thumbs-down rate on first response, with a target (e.g., reduce from X% to Y% in 4 weeks).',
   'No tradeoff analysis on Solution 2 (clarifying questions). The tradeoff is friction — fast-answer users bounce if Gemini asks multiple questions first. Must name and mitigate.',
   'Solution 1 (show sources) needs one more layer: which sources? How does Gemini decide credibility? Showing a wrong source confidently makes the problem worse.',
   'No business metric connection: trust improvement → D7 retention → DAU → revenue. That chain was never drawn. Critical for a Google PM answer.',
   'Asked the interviewer to define ''gradual vs sudden'' and ''recent model vs older model'' instead of stating assumptions out loud and moving on. Burned time.'
 ],
 ARRAY['Hallucination rate','Calibration','Epistemic uncertainty','Response confidence score','Thumbs-down rate','Source attribution','Query ambiguity detection','Session abandonment rate','D7 retention','Confidence signaling'],
 ARRAY[
   'Reframe first: This is a trust problem, not an accuracy problem. The model may be uncertain internally, but the product signals certainty. My job as PM is to close that gap — not retrain the model.',
   'Assumption stack: Current production Gemini, consumer web. ''Wrong'' = user-reported, not benchmark. Gradual complaint pattern = chronic, systemic. Focus: casual users (can''t verify, highest trust-damage risk).',
   'Top hypotheses: (1) Gemini''s tone uses certainty language regardless of internal confidence. (2) Personal or ambiguous queries get answered confidently despite no ground truth. (3) No source attribution — users can''t verify even when they want to.',
   'Solution 1 — Source attribution: Show ''Based on: [source]'' inline for factual claims. Users who want to verify can; users who don''t, ignore it. Tradeoff: if source is wrong, problem worsens — so only show sources above a credibility threshold.',
   'Solution 2 — Clarifying questions for ambiguous queries: Before answering open-ended personal queries, ask one scoping question. Tradeoff: friction. Mitigate by only triggering for queries below a confidence threshold — not every query.',
   'Solution 3 — Confidence-calibrated wording (pick first): Replace ''The answer is...'' with ''Based on available information...'' or ''I''m not certain, but...'' when internal confidence is below threshold. Purely a product copy + model output formatting change — no retraining.',
   'Primary metric: thumbs-down rate on first response. Target: reduce from baseline by 20% in 4 weeks. Secondary: contradictory follow-up rate in same session. Guardrail: D7 retention must not drop; answer quality score (internal eval) must not degrade.',
   'Business impact: trust → D7 retention → daily active users → ad revenue / Gemini Advanced subscriptions. This is the chain that matters to Google leadership.',
   'Launch: A/B test wording changes (Solution 3) on 10% of traffic. If thumbs-down rate drops without session abandonment rising, ramp to 50%. Layer Source Attribution (Solution 1) in Sprint 2 once tone baseline is established.'
 ]
);

INSERT INTO case_logs (id, company, score, practice, type, title, question, nailed, missed, keywords, model) VALUES
(24, 'Product Design', 8.0, false,
 ARRAY['design','estimation'],
 'Design a Skyscraper Elevator + Estimate Count',
 'Design an elevator for a skyscraper and estimate the number of elevators needed.',
 ARRAY[
   'Clarifying questions asked before committing — ''residence/office/hotel/hybrid?'' was the right first question, asked at the right time on paper',
   'Design was clean and user-journey driven: 3 distinct pain points (too many stops, no wait time visibility, accessibility) mapped directly to solutions',
   'Destination dispatch was the strongest solution — PM-level feature, not engineering, and addresses the core pain point of unnecessary stops',
   'Adjusted trip rate from 20 to 14 trips/hour to account for stop friction — most candidates ignore this, it''s the mark of a realistic estimate',
   'Spread peak demand over 2 hours instead of 1 — more defensible than 80% in 60 minutes, shows real-world reasoning',
   'Two-bank split (floors 1–35, 36–70) added naturally, showing systems thinking',
   'Sanity check landed correctly: Empire State Building has 73 elevators; 51 is in range and slightly conservative'
 ],
 ARRAY[
   'Asked ''who am I designing for?'' mid-math instead of at the start — clarifying questions belong at the top, not after you''ve committed to assumptions',
   'Needed prompting at each funnel step instead of building it end-to-end independently — the spine should be automatic: population → peak demand → trips per elevator → elevators needed',
   'No stated final recommendation to close the answer — always end with one sentence: ''I recommend X elevators, split into Y banks, with Z as the key design feature''',
   'Didn''t name the estimation question type out loud — saying ''This is a capacity estimation, so I''ll build a utilization funnel'' signals structure before you start'
 ],
 ARRAY['Utilization funnel','Peak demand','Throughput','Cycle time','Trip capacity','Destination dispatch','Express zone','Sanity check','Population density','Floor area ratio'],
 ARRAY[
   'STRUCTURE: This question has two parts — design first (who uses it, pain points, features), then estimation (how many do you need). Do them in that order. Design informs the math.',
   'DESIGN — Users: Office workers, peak at 8–10am and 5–7pm. Pain points: (1) Too many stops — everyone presses different floors. (2) No wait time visibility — frustrating to stand in lobby not knowing. (3) Accessibility — doors close too fast, no audio cues.',
   'DESIGN — Solutions: (1) Destination dispatch: enter floor in lobby, system groups passengers by destination → fewer stops per trip. (2) Real-time wait display in lobby. (3) Express zones: Bank A floors 1–35, Bank B floors 36–70. (4) Accessibility mode: extended door time, audio announcements, priority car.',
   'ESTIMATION — Scope: Office skyscraper, downtown NYC, 70 floors, 20,000 sq ft per floor, 100 sq ft per person.',
   'Step 1 — Population: 20,000 ÷ 100 × 70 = 14,000 people in the building.',
   'Step 2 — Peak demand: 70% arrive in a 2-hour morning window = 14,000 × 70% ÷ 2 = 4,900 people needing elevators per hour.',
   'Step 3 — Trips per elevator: Base trip = 3 min (load + travel + unload + return). Adjust for stops: 3 min becomes ~4.3 min → 14 trips per hour. With destination dispatch this improves, but use 14 as conservative baseline.',
   'Step 4 — People per elevator per hour: 14 trips × 12 people per car = 168 people/elevator/hour.',
   'Step 5 — Elevators needed: 4,900 ÷ 168 = ~29 per bank × 2 banks = ~58 elevators total. With destination dispatch reducing stops, round down to 50–55.',
   'Sanity check: Empire State Building (102 floors, ~20,000 workers) has 73 elevators. A 70-floor building with 14,000 workers at 51–55 is in range and slightly conservative — defensible.',
   'Final recommendation: ''I recommend 52 elevators split into two banks of 26, with destination dispatch as the core design feature. If occupancy grows past 16,000 people, add a third express bank for floors 60–70.'''
 ]
);
