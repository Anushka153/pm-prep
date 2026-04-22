export const frameworks = [
  {
    title: "Product Design",
    tag: "Design",
    colorClass: "fw-blue",
    trigger: ["Design a product for X","How would you improve X?","Build a feature for X","What would you build for X users?"],
    steps: [
      { title: "Clarify", desc: "Goal, scope, platform, user type. Who is the primary user? What platform? New feature or improvement?" },
      { title: "Segment Users", desc: "By behavior, need, or demographic. Pain point mapping across the user journey: Awareness → Onboarding → Core action → Repeat use → Advocacy." },
      { title: "Identify Pain Points", desc: "Go through each stage of the journey. Don't just focus on the core action — the edges (discovery, advocacy) are where real gaps live." },
      { title: "Prioritize", desc: "Pick highest impact segment. Cut through prioritization decisively — don't hedge." },
      { title: "Solutions (But How?)", desc: "List 3 solutions with depth. After every solution, ask: but how? One more layer separates good from great." },
      { title: "Trade-offs", desc: "Evaluate feasibility, timeline, resources. Pick one and defend it." },
      { title: "Success Metrics", desc: "Primary (what you optimize for) + Secondary (business health) + Guardrail (what you must not break)." },
      { title: "Launch Strategy", desc: "Alpha → Beta (5–10%) → Ramp (25–50–100%) → Full launch. Always define rollback trigger." }
    ]
  },
  {
    title: "Strategy",
    tag: "Strategy",
    colorClass: "fw-green",
    trigger: ["How would you grow X by 3x?","How would you win market share against X?","Would you build X or Y?","Should X enter market Y?"],
    steps: [
      { title: "Define Winning", desc: "What does success look like in 3–5 years? Revenue, market share, user base? Be specific." },
      { title: "Market Timing", desc: "Payments infrastructure? Device penetration? Consumer behavior? Regulatory environment? Supply side readiness? Competition?" },
      { title: "Segment & Beachhead", desc: "Pick the highest-density, most digital-ready segment. Start narrow — prove demand before expanding." },
      { title: "Moat", desc: "Network effects, switching costs, data moat, brand loyalty. Which of these are you building?" },
      { title: "Phase the Strategy", desc: "Phase 1 (0–6mo): Validate, asset-light. Phase 2 (6–18mo): Scale, supply side. Phase 3 (18mo+): Defend moat." },
      { title: "Marketplace Rules", desc: "Supply first. Cold start: single city/community. Define liquidity threshold before expanding. Trust mechanisms: KYC, escrow, ratings." }
    ]
  },
  {
    title: "Metrics Diagnosis",
    tag: "Execution",
    colorClass: "fw-red",
    trigger: ["Metric X dropped by Y%. What do you do?","Add-to-cart rate fell 15%. Walk me through your approach.","How would you diagnose a drop in DAU?"],
    steps: [
      { title: "Confirm the Data", desc: "Is this a reporting bug or a real drop? Check logging, confirm data pipeline is healthy." },
      { title: "Segment", desc: "Platform (iOS/Android/web), Geography, User type (new/returning/power), Category, Price range, Time (before/after deployment)." },
      { title: "Sudden vs Gradual", desc: "Sudden = likely a bug, deployment, or external event. Gradual = behavior change, competition, or product degradation." },
      { title: "Hypotheses", desc: "Generate 3–5 across: Product (bug, UX change), User behavior (seasonality, habit), External (competition, news), Data (logging issue)." },
      { title: "Validate Fast", desc: "Logs and session replays first. Internal data before surveys. Prioritize fast hypotheses. CEO wants answers in hours." },
      { title: "Fix & Monitor", desc: "Fix root cause, monitor guardrail metrics, define rollback trigger. Don't declare victory after one week." }
    ]
  },
  {
    title: "Estimation",
    tag: "Estimation",
    colorClass: "fw-orange",
    trigger: ["How many X are there in Y?","Estimate the market size of X","How much revenue does X make?","How many people use X daily?"],
    steps: [
      { title: "Clarify Scope", desc: "What exactly are we estimating? Geography? Time period? Include or exclude certain user types?" },
      { title: "Top-down vs Bottom-up", desc: "Top-down: start from total market, apply penetration %. Bottom-up: build from individual units up. State which you're using and why." },
      { title: "State Assumptions", desc: "Every assumption out loud. Interviewers don't expect perfection — they want to see your reasoning." },
      { title: "Build the Funnel", desc: "Population → Target population → Active users → Paying users → Revenue. Show each step." },
      { title: "Do the Math", desc: "Round cleanly. 1.3M is fine as 1M. Don't get lost in false precision." },
      { title: "Sanity Check", desc: "Compare to a known number. Order-of-magnitude check. Work it backwards from revenue." }
    ]
  },
  {
    title: "RICE Prioritization",
    tag: "Prioritization",
    colorClass: "fw-blue",
    trigger: ["How do you prioritize?","You have 5 features and limited engineers — what do you build?","Walk me through your roadmap decision","How do you decide what NOT to build?"],
    steps: [
      { title: "Define North Star First", desc: "Before scoring anything, name the primary metric you're optimizing for. Every RICE score is meaningless without this anchor." },
      { title: "Reach", desc: "How many users does this affect per quarter? Be specific — '80K artists' not 'lots of users'. Use actual data or state your assumption." },
      { title: "Impact", desc: "How much does it move the north star per user? Scale: 3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal. Be honest — most features are a 1." },
      { title: "Confidence", desc: "How sure are you? 100% = hard data. 80% = strong signal. 50% = gut feel. Low confidence should shrink the score significantly." },
      { title: "Effort", desc: "Total engineering weeks. Include design, QA, and rollout — not just build time. Underestimating effort is the most common mistake." },
      { title: "Score & Decide", desc: "Score = (Reach × Impact × Confidence) ÷ Effort. Rank all options. Pick the top items that fit your sprint capacity. Explicitly say what you're cutting and why." },
      { title: "State Trade-offs", desc: "RICE doesn't decide — you do. Explain why #1 beats #2 in context. 'We pick this now because it unblocks the next quarter's growth, not because it scores highest.'" }
    ]
  },
  {
    title: "Pricing Strategy",
    tag: "Strategy",
    colorClass: "fw-orange",
    trigger: ["How would you monetise X?","Should we charge for this feature?","How do you set the price?","We're launching a new tier — how do you price it?"],
    steps: [
      { title: "Value-Based Pricing", desc: "Price based on what the customer is willing to pay for the value delivered. Best for B2B SaaS. Ask: what does this save or earn the customer? Price at 10–20% of that value." },
      { title: "Cost-Plus Pricing", desc: "Cost + target margin. Rarely optimal alone, but useful as a floor. Never price below this in a healthy business." },
      { title: "Competitive Pricing", desc: "Anchor to what the market charges, then differentiate. Useful for commoditised products. Risk: starts a race to the bottom." },
      { title: "Freemium Threshold", desc: "What's free must be genuinely useful (drives adoption) but leaves a clear gap that paid solves (drives conversion). Free tier should not cannibalise paid. Target free-to-paid conversion: 2–5% consumer, 15–25% B2B trial." },
      { title: "Per-Seat vs Usage vs Flat", desc: "Per-seat: scales with org size (Slack, Notion). Usage-based: scales with value consumed (AWS, Twilio). Flat: predictable, easy to sell, but doesn't scale. Pick the model that aligns your revenue with customer value." },
      { title: "Price Sensitivity Test", desc: "Van Westendorp: ask users 4 questions: too cheap / cheap / expensive / too expensive. Gives you the acceptable price range. Always test before announcing." }
    ]
  },
  {
    title: "Go-to-Market (GTM)",
    tag: "Strategy",
    colorClass: "fw-green",
    trigger: ["How would you launch this?","Walk me through your go-to-market strategy","How do you acquire the first 1,000 users?","You're launching in a new market — how do you approach it?"],
    steps: [
      { title: "Define Success", desc: "What does a successful launch look like at 30 days, 90 days, 1 year? Name the specific metric and threshold. Without this, you can't know if the launch worked." },
      { title: "Identify Beachhead", desc: "Who are your first 100 users? They should be the highest-need, most reachable, most likely to give you honest feedback. Don't try to serve everyone on Day 1." },
      { title: "Channel Selection", desc: "Direct sales, partnerships, product-led, community, paid acquisition, referral? Match channel to where your beachhead actually spends time. B2B: direct outreach + LinkedIn. Consumer: influencers + referral." },
      { title: "Sequencing", desc: "Alpha (internal) → Beta (hand-picked users, no marketing) → Limited launch (waitlist, PR, seeding) → Open launch. Each stage proves a different hypothesis before spending more." },
      { title: "Pricing & Packaging", desc: "Launch pricing is a signal. A/B test at least two price points in beta. Free trials with a hard end date convert better than unlimited free tiers." },
      { title: "Success Criteria & Rollback", desc: "Define: if primary metric doesn't hit X by day 30, we pause and diagnose. Rollback ≠ failure. It means you preserved resources to try again with better information." }
    ]
  },
  {
    title: "Stakeholder Management",
    tag: "Behavioral",
    colorClass: "fw-red",
    trigger: ["How do you work with engineering?","Tell me about a time you influenced without authority","How do you handle disagreement with leadership?","How do you manage competing priorities from different teams?"],
    steps: [
      { title: "Map Stakeholders", desc: "Who needs to be informed, consulted, or decides? RACI: Responsible (does the work), Accountable (owns the outcome), Consulted (input), Informed (update only). Over-communicating to wrong tier wastes everyone's time." },
      { title: "Influence Without Authority", desc: "PMs don't manage engineers — they persuade them. How: connect the work to something the engineer cares about (craft, impact, career growth). Show the data. Never pull rank you don't have." },
      { title: "Handling Disagreement", desc: "1. Understand their concern fully before defending your position. 2. Separate the person from the idea. 3. Use data where available. 4. If still stuck: escalate to shared north star metric — what does the data say about the customer?" },
      { title: "Engineering Partnership", desc: "Involve engineers in problem framing, not just solution delivery. Weekly syncs on 3 things: what shipped, what's blocked, what's next. Never surprise an engineer with a scope change in standup." },
      { title: "Saying No", desc: "No is a complete sentence, but it needs a reason. Format: 'I can't prioritise that this quarter because [reason tied to north star metric]. Here's when I can revisit it: [date or trigger].' Never just say no and move on." },
      { title: "The Pre-Mortem", desc: "Before a controversial decision, run a pre-mortem: 'Imagine it's 6 months later and this failed. What went wrong?' This surfaces objections before they become resistance, and builds buy-in through inclusion." }
    ]
  }
];
