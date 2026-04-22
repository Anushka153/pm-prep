export const daScenarios = [
  {
    cat: 'diagnosis',
    q: 'A key metric dropped X%. How do you diagnose it?',
    framework: 'Funnel + Segmentation + Hypothesis',
    steps: [
      'Confirm the data is real — check for logging errors, dashboard bugs, or tracking changes. Never build hypotheses on bad data.',
      'Characterise the drop: sudden vs. gradual, platform (iOS/Android/web), geography, user segment, category. Each dimension narrows the root cause.',
      'Check deployment correlation — if the drop aligns with a release, rollback while you investigate.',
      'Generate 3 hypotheses and rank by likelihood. Sudden = bug or deployment. Gradual = behaviour change, competitive loss, or product degradation.',
      'Validate the fastest hypothesis first. Use session replays, error logs, and funnel breakdowns before commissioning new queries.'
    ],
    tech: ['Amplitude / Mixpanel — funnel breakdown by segment', 'BigQuery / Redshift — raw event queries to isolate the drop', 'Datadog / Sentry — deployment and error correlation', 'FullStory / LogRocket — session replays to see what users actually did'],
    phrase: '"First thing I\'d do is confirm the data is real — check if it\'s a logging change or a real user behaviour shift. Then I\'d segment by platform, geography, and cohort in Amplitude to isolate where the drop lives before generating hypotheses."',
    guardrail: 'Don\'t start building solutions before confirming which layer of the funnel broke.'
  },
  {
    cat: 'metrics',
    q: 'What metrics would you track for [feature/product]?',
    framework: 'North Star → Primary → Guardrail',
    steps: [
      'Identify the North Star metric — the one number that best captures the value the feature delivers to users and the business.',
      'Define primary metrics: the direct behaviour you\'re trying to move (e.g. D7 retention, click-through rate, session length).',
      'Define guardrail metrics: what must not break while you improve the primary (e.g. don\'t lift engagement by degrading load time).',
      'Add leading indicators — metrics that predict the North Star before it moves (early signals of success or failure).',
      'Name the measurement method: event tracking via Amplitude, funnel in SQL, or periodic cohort pull.'
    ],
    tech: ['Amplitude / Mixpanel — event-level tracking and funnel visualisation', 'BigQuery — cohort queries and retention curves', 'Looker / Metabase — dashboards for ongoing monitoring', 'Langfuse — for AI/LLM feature evaluation (accuracy, latency, relevance)'],
    phrase: '"The North Star is [X]. Primary metric is [Y] because it directly measures the user behaviour we\'re trying to change. Guardrail is [Z] — we can\'t let that drop while optimising for Y. I\'d track this in Amplitude with a custom funnel, and pull a weekly cohort retention query from BigQuery."',
    guardrail: 'If you name two North Stars, you have none. Pick one and defend it.'
  },
  {
    cat: 'testing',
    q: 'How would you set up an A/B test for this?',
    framework: 'Hypothesis → Size → Run → Decide → Roll out',
    steps: [
      'State the hypothesis: "We believe [change] will [metric] because [reason]." One hypothesis per test.',
      'Define success upfront: primary metric + minimum detectable effect (MDE) + significance threshold (95% standard, 90% if moving fast).',
      'Calculate sample size: use a power calculator. Rule of thumb — the smaller the MDE, the longer you run.',
      'Randomise correctly: user-level not session-level (avoids novelty effects). Ensure control/treatment are truly isolated.',
      'Define rollback trigger before launch: "If primary metric drops >5% in 48 hours, revert immediately."',
      'After sufficient runtime: check statistical significance, then segment the results (did it work for all users, or just one cohort?).'
    ],
    tech: ['Optimizely / LaunchDarkly — feature flagging and experiment assignment', 'Statsig — experiment platform with built-in power calculations', 'BigQuery — post-hoc analysis and segment breakdowns', 'Python (scipy.stats) — for custom significance testing if needed'],
    phrase: '"I\'d run this as a user-level A/B test on 10% of users — 5% control, 5% treatment. Success threshold is a 10% lift in D7 retention at 95% significance. Rollback trigger is a 5% drop in the primary metric within the first 48 hours. Minimum runtime is 2 weeks to account for day-of-week effects."',
    guardrail: 'Never end a test early because it looks good. Wait for the full runtime to avoid false positives from peeking.'
  },
  {
    cat: 'testing',
    q: 'How do you know your A/B test result is real?',
    framework: 'Statistical validity checklist',
    steps: [
      'Check sample ratio mismatch (SRM) — if control and treatment groups aren\'t the sizes you expected, the randomisation is broken and the result is invalid.',
      'Confirm you ran for the full planned duration — stopping early inflates false positive rate.',
      'Check novelty effect — new UI features often spike on launch then regress. Run for at least 2 weeks.',
      'Segment the result — if the lift is only in one small cohort, the overall result may not be meaningful.',
      'Validate with a second metric — primary metric improved, but did a correlated metric also move in the expected direction?'
    ],
    tech: ['Statsig / Optimizely — built-in SRM checks', 'BigQuery — manual SRM query: count users per variant vs. expected split', 'Python — sequential testing (if you need to peek without false positives)'],
    phrase: '"Before I call a result significant, I run three checks: SRM to confirm the randomisation held, full runtime to avoid peeking bias, and a novelty-effect check by looking at the result in week 1 vs. week 2 separately."',
    guardrail: 'A statistically significant result on a broken experiment is still wrong. Always check SRM first.'
  },
  {
    cat: 'ml',
    q: 'How would you build or improve a recommendation system?',
    framework: 'Cold start → Algorithm → Evaluation → Guardrails',
    steps: [
      'Define the goal: are we optimising for engagement (clicks, watch time) or for a business outcome (conversion, retention)? The objective function is everything.',
      'Handle cold start: new users have no history. Use content-based filtering (item attributes) or onboarding prompts to seed preferences.',
      'For existing users: collaborative filtering (what similar users liked) or matrix factorisation (latent factor models). Hybrid approaches outperform either alone.',
      'Evaluation: offline (precision@K, recall@K, NDCG) and online (CTR, conversion, D7 retention). Offline metrics don\'t always predict online performance.',
      'Guardrails: content diversity score (prevent filter bubble), fairness metrics (new vs. popular items), latency SLA (p99 < Xms).'
    ],
    tech: ['Python (scikit-learn, LightFM) — collaborative filtering and hybrid models', 'Vertex AI / SageMaker — managed training and serving', 'Pinecone / Weaviate — vector database for embedding-based retrieval', 'Langfuse — for LLM-assisted recommendation explanation/ranking', 'Amplitude — CTR and conversion tracking post-launch'],
    phrase: '"I\'d start with a hybrid model — collaborative filtering for users with history, content-based for cold start. Evaluation would be precision@10 offline, then a live A/B test measuring CTR and D7 retention. The guardrail I\'d add is a diversity score — if the recommendation set drops below a threshold of category variety, we override the algorithm."',
    guardrail: 'Over-optimising for engagement without a diversity guardrail creates a filter bubble. Name it every time.'
  },
  {
    cat: 'ml',
    q: 'How would you evaluate an AI/LLM feature before and after launch?',
    framework: 'Baseline → Criteria → Eval suite → Monitor',
    steps: [
      'Establish a baseline before touching anything. "It\'s better now" is not measurable. Pick 2–3 quantifiable criteria: accuracy, latency, relevance, hallucination rate.',
      'Build an eval suite: a representative set of test cases covering happy path, edge cases, and adversarial inputs. Run every change against all criteria before it goes near production.',
      'Instrument the pipeline: log every request, response, retrieval, and latency. You can\'t debug what you can\'t observe.',
      'Offline eval → staging on production data → shadow mode → live with rollback trigger.',
      'Post-launch: track output quality metrics (thumbs up/down, correction rate), latency percentiles (p50/p95/p99), and user engagement (sessions, message rate).'
    ],
    tech: ['Langfuse — LLM observability: tracing, evals, latency, retrieval quality', 'Promptfoo — prompt evaluation and regression testing', 'Ragas — RAG pipeline evaluation (context precision, answer relevance, faithfulness)', 'BigQuery — custom eval metrics at scale', 'Datadog — infra latency and error rate monitoring'],
    phrase: '"Before launch, I\'d establish a baseline in Langfuse — retrieval accuracy, response latency, output relevance. I\'d build an eval suite of 50–100 representative cases and run every change against all three criteria. The model doesn\'t go to production until all three improve or hold. Post-launch, I\'d track p95 latency and a weekly human eval sample to catch regression."',
    guardrail: 'Never ship an AI feature without an eval suite. "It feels better" is not a release criterion.'
  },
  {
    cat: 'ml',
    q: 'How would you detect and reduce bias in an ML model?',
    framework: 'Define fairness → Audit → Mitigate → Monitor',
    steps: [
      'Define what fairness means for this specific product: equal accuracy across demographic groups? Equal false positive rate? These are different, and you can\'t optimise for all simultaneously.',
      'Audit the training data: is certain user behaviour (and therefore certain demographics) over- or under-represented? Biased data = biased model.',
      'Measure disaggregated metrics: overall accuracy can look fine while one subgroup is being systematically mis-served. Segment every eval metric.',
      'Mitigation options: re-weighting training data, adversarial debiasing, or post-processing output scores by group.',
      'Ongoing monitoring: bias doesn\'t stay fixed. User behaviour shifts, new cohorts appear. Set up a recurring fairness audit.'
    ],
    tech: ['Fairlearn (Python) — bias detection and mitigation toolkit', 'What-If Tool (Google) — visual exploration of model behaviour by segment', 'Langfuse — for LLM feature parity across user groups', 'BigQuery — disaggregated metric queries by demographic or behavioural segment'],
    phrase: '"First I\'d define what fairness means here — equal accuracy, or equal false positive rate? They require different interventions. Then I\'d audit training data representation and compute metrics disaggregated by segment. In production I\'d set up a recurring fairness audit because user distribution shifts over time."',
    guardrail: 'Equal overall accuracy can mask severe bias in a minority subgroup. Always segment your eval metrics.'
  },
  {
    cat: 'sql',
    q: 'How would you calculate D7/D30 retention in SQL?',
    framework: 'Cohort join on signup date + activity date',
    steps: [
      'Define "active" clearly before writing anything — a session? A meaningful action? Retention means nothing without a definition.',
      'Build a cohort table: all users and their signup date.',
      'Join to an events table: for each user, check if they had an activity event exactly N days after signup.',
      'Group by cohort week/month and calculate retention rate as (active users on day N) / (total users in cohort).'
    ],
    tech: ['BigQuery — standard SQL, good for large event tables', 'dbt — model retention as a reusable transform', 'Amplitude — built-in retention chart (no SQL needed for quick checks)', 'Metabase / Looker — visualise cohort retention curves'],
    phrase: '"I\'d write a cohort query in BigQuery — join the users table to the events table on user_id where event_date is between signup_date + 6 and signup_date + 8, then group by signup week and calculate the retention rate. I\'d validate the result against Amplitude\'s built-in retention chart as a sanity check."',
    sqlSnippet: `-- D7 Retention
WITH cohorts AS (
  SELECT user_id, DATE(created_at) AS signup_date
  FROM users
),
activity AS (
  SELECT DISTINCT user_id, DATE(event_timestamp) AS active_date
  FROM events
  WHERE event_name = 'session_start'
)
SELECT
  c.signup_date,
  COUNT(DISTINCT c.user_id)                          AS cohort_size,
  COUNT(DISTINCT a.user_id)                          AS retained_d7,
  ROUND(COUNT(DISTINCT a.user_id) * 100.0
        / COUNT(DISTINCT c.user_id), 1)              AS retention_pct
FROM cohorts c
LEFT JOIN activity a
  ON c.user_id = a.user_id
 AND a.active_date BETWEEN DATE_ADD(c.signup_date, INTERVAL 6 DAY)
                       AND DATE_ADD(c.signup_date, INTERVAL 8 DAY)
GROUP BY c.signup_date
ORDER BY c.signup_date;`,
    guardrail: 'Decide on "exactly day 7" vs. "any activity in day 6–8 window" — be consistent and state your definition.'
  },
  {
    cat: 'sql',
    q: 'How would you write a funnel drop-off query?',
    framework: 'Step-level event counts → ordered by user journey',
    steps: [
      'List every step in the funnel with a corresponding event name.',
      'Count distinct users who completed each step — use window functions or conditional aggregation.',
      'Calculate step-over-step conversion rate: users at step N / users at step N-1.',
      'Add a time constraint — funnel completion within a session window (e.g. 30 minutes) to avoid inflated numbers from multi-day wanderers.'
    ],
    tech: ['BigQuery — conditional COUNT with CASE WHEN per event', 'Amplitude — visual funnel builder (zero SQL, fast for hypothesis checking)', 'dbt — reusable funnel model that marketing and product can both use', 'Mixpanel — funnel with segmentation by cohort or property'],
    phrase: '"I\'d build this funnel in Amplitude first for speed, then replicate it in BigQuery with a session-window constraint so I\'m counting users who completed the funnel in one sitting, not across days. The drop-off at each step tells me which layer to investigate."',
    sqlSnippet: `-- Funnel: view → add_to_cart → purchase (within 30-min session)
WITH base AS (
  SELECT
    user_id,
    MAX(CASE WHEN event_name = 'product_view'   THEN 1 END) AS did_view,
    MAX(CASE WHEN event_name = 'add_to_cart'    THEN 1 END) AS did_cart,
    MAX(CASE WHEN event_name = 'purchase'       THEN 1 END) AS did_purchase
  FROM events
  WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  GROUP BY user_id
)
SELECT
  COUNT(*)                          AS total_users,
  SUM(did_view)                     AS viewed,
  SUM(did_cart)                     AS added_to_cart,
  SUM(did_purchase)                 AS purchased,
  ROUND(SUM(did_cart)    * 100.0 / NULLIF(SUM(did_view), 0), 1)    AS view_to_cart_pct,
  ROUND(SUM(did_purchase)* 100.0 / NULLIF(SUM(did_cart), 0), 1)    AS cart_to_purchase_pct
FROM base;`,
    guardrail: 'NULLIF prevents divide-by-zero when a funnel step has zero users — always add it.'
  },
  {
    cat: 'sql',
    q: 'How would you identify power users vs. casual users in SQL?',
    framework: 'Percentile bucketing on activity frequency',
    steps: [
      'Define what "activity" means: sessions, purchases, messages sent, etc.',
      'Count activity per user over a fixed window (last 30 days).',
      'Use NTILE or PERCENTILE_CONT to bucket users: top 10% = power users, bottom 50% = casual.',
      'Join back to user attributes to understand who the power users are (cohort, acquisition channel, plan type).'
    ],
    tech: ['BigQuery — NTILE() window function for bucketing', 'Amplitude — user segmentation by event frequency', 'Looker — cohort-level breakdown of power vs. casual'],
    phrase: '"I\'d define power users as the top 10% by session count in the last 30 days using NTILE(10) in BigQuery, then join to user attributes to understand their cohort and acquisition channel. That tells me both who they are and where they came from — which informs both product and growth decisions."',
    sqlSnippet: `-- Power user segmentation
WITH activity AS (
  SELECT
    user_id,
    COUNT(*) AS session_count
  FROM events
  WHERE event_name   = 'session_start'
    AND event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
  GROUP BY user_id
),
bucketed AS (
  SELECT
    user_id,
    session_count,
    NTILE(10) OVER (ORDER BY session_count DESC) AS decile
  FROM activity
)
SELECT
  CASE WHEN decile = 1  THEN 'Power User'
       WHEN decile <= 3 THEN 'Regular'
       ELSE                  'Casual'
  END                           AS segment,
  COUNT(*)                      AS user_count,
  ROUND(AVG(session_count), 1)  AS avg_sessions
FROM bucketed
GROUP BY 1
ORDER BY user_count DESC;`,
    guardrail: 'Power users drive a disproportionate share of engagement — but don\'t build only for them or you\'ll hurt growth.'
  },
  {
    cat: 'diagnosis',
    q: 'How would you investigate if a new feature is cannibalising another?',
    framework: 'Incremental impact analysis — additive vs. substitutive',
    steps: [
      'Compare the metric you\'re gaining (new feature usage) against the metric you might be losing (old feature usage) in the same user segment.',
      'Run a cohort comparison: users who adopted the new feature vs. users who didn\'t — did old feature engagement drop more in the adopter group?',
      'Check net impact: is total time/spend/engagement per user higher or lower after adoption? Cannibalization is only bad if the net is negative.',
      'Look at acquisition: if the new feature is attracting a different user type, what looks like cannibalization may actually be segment expansion.'
    ],
    tech: ['Amplitude — user-level cohort comparison across feature events', 'BigQuery — before/after engagement query segmented by feature adoption date', 'Mixpanel — funnel and flow analysis to see if users are substituting one path for another'],
    phrase: '"I\'d segment users by new feature adoption and compare old feature engagement before and after adoption. If total engagement per user is flat or growing, cannibalization isn\'t a problem — it\'s substitution at the same value level. Only if net engagement drops is it a real concern."',
    guardrail: 'Cannibalization of a worse feature by a better one is a good thing. Always check net impact, not just the feature you\'re "losing."'
  },
  {
    cat: 'metrics',
    q: 'How would you define and measure product-market fit?',
    framework: 'Retention curve + qualitative signal + Sean Ellis test',
    steps: [
      'Retention curve: if the curve flattens above zero, some users find ongoing value. A curve that trends to zero = no PMF.',
      'Sean Ellis test: ask users "How would you feel if you could no longer use this product?" — 40%+ saying "very disappointed" is the PMF benchmark.',
      'NPS + qualitative: what do users say they\'d use instead? A specific substitute is a good sign — it means your product has a clear value proposition.',
      'Engagement depth: are users reaching the "aha moment" (the action correlated with long-term retention)? Track time-to-aha and funnel completion rate.',
      'Organic growth rate: strong PMF products grow by word of mouth. CAC drops over time as referral kicks in.'
    ],
    tech: ['Amplitude — retention curve visualisation', 'Typeform / Delighted — Sean Ellis survey', 'BigQuery — time-to-aha query: median time from signup to first key action', 'Mixpanel — funnel from signup to aha moment'],
    phrase: '"I\'d look at three signals: the retention curve in Amplitude (does it flatten above zero?), the Sean Ellis score from a quick Typeform survey (aiming for 40%+ very disappointed), and time-to-aha from BigQuery. If all three are trending right, we\'re finding PMF. If retention is still declining to zero, we\'re not there yet."',
    guardrail: 'Vanity metrics (sign-ups, installs) mask the absence of PMF. Always look at retention, not acquisition.'
  }
];

const daTools = [
  { scenario: 'User behaviour & funnels', tools: 'Amplitude, Mixpanel', when: 'Any engagement, retention, or funnel question' },
  { scenario: 'Raw data & custom queries', tools: 'BigQuery, Redshift, Snowflake', when: 'Cohort analysis, custom metric calculation, ad hoc diagnosis' },
  { scenario: 'Dashboards & reporting', tools: 'Looker, Metabase, Tableau', when: 'Ongoing monitoring, stakeholder reporting' },
  { scenario: 'A/B testing & feature flags', tools: 'Statsig, Optimizely, LaunchDarkly', when: 'Any launch, experiment, or rollout discussion' },
  { scenario: 'Session replay & UX debugging', tools: 'FullStory, LogRocket, Hotjar', when: 'Diagnosis of UI/flow issues, session-level investigation' },
  { scenario: 'Error & infra monitoring', tools: 'Datadog, Sentry, New Relic', when: 'Deployment impact, p99 latency, error rate questions' },
  { scenario: 'LLM / AI feature eval', tools: 'Langfuse, Promptfoo, Ragas', when: 'Any AI product question — eval, observability, regression' },
  { scenario: 'ML model training & serving', tools: 'Vertex AI, SageMaker, HuggingFace', when: 'Build vs. buy decisions, recommendation or classification systems' },
  { scenario: 'Vector search / RAG', tools: 'Pinecone, Weaviate, pgvector', when: 'RAG pipelines, semantic search, AI memory questions' },
  { scenario: 'Data transformation', tools: 'dbt, Airflow, Fivetran', when: 'Data pipeline or data quality questions' },
  { scenario: 'Product analytics SQL', tools: 'BigQuery (preferred)', when: 'Funnel, retention, cohort, segmentation queries' },
  { scenario: 'Surveys & qualitative', tools: 'Typeform, Delighted, Dovetail', when: 'PMF measurement, NPS, user research synthesis' }
];
