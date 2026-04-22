export const dbLinks = [
  {
    title: "Interviewing at Amazon: Leadership Principles",
    url: "https://www.scarletink.com/interviewing-at-amazon-leadership-principles/",
    source: "Scarlet Ink",
    tags: ["Amazon", "Behavioral"],
    description: "Deep dive into Amazon's 16 Leadership Principles — how they're assessed in interviews, what interviewers look for, and how to structure your stories."
  },
  {
    title: "AI Product Role Interview Questions (LinkedIn — Malay Krishna)",
    url: "https://www.linkedin.com/posts/malay-krishna_if-youre-applying-for-an-ai-product-role-share-7449684403431084032-prHp?utm_source=share&utm_medium=member_desktop&rcm=ACoAACRtkgsB6FtJKdaFal50Qg8p5-WswSns8L0",
    source: "LinkedIn",
    tags: ["AI/ML", "General"],
    description: "Interview questions to prepare for if you're applying for an AI product role — covers what interviewers look for in AI PM candidates."
  },
  {
    title: "Top Product Manager Interview Questions",
    url: "https://www.tryexponent.com/blog/top-product-manager-interview-questions",
    source: "Exponent",
    tags: ["General", "Frameworks", "Product Design"],
    description: "Comprehensive overview of the most common PM interview questions across product design, strategy, estimation, and behavioral — with tips on how to answer each type."
  },
  {
    title: "Detecting Fraudulent Transactions — Myntra PM Case",
    url: null,
    source: "Own Analysis",
    tags: ["AI/ML", "Strategy"],
    description: "Full PM case framework for fraud detection on an Indian e-commerce platform. Covers three fraud types (payment, account takeover, return/refund abuse), a 4-layer detection architecture (rules → ML → graph → human review), and Myntra-specific signals including COD/UPI vectors, return fraud, and the precision vs. recall tradeoff.",
    content: `
      <div style="margin-bottom:20px;padding:12px 16px;background:rgba(91,80,232,0.06);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;">
        <strong>Problem Frame:</strong> "Fraudulent transaction" on Myntra means at least three distinct things: payment fraud, account takeover, and return/refund abuse. High-value fashion (sneakers, luxury) attracts resellers and fraud rings. Mobile-first, metro users. COD + UPI + cards + BNPL — each with different fraud vectors.
      </div>

      <div style="font-weight:700;font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Signal Categories</div>

      <div style="font-weight:600;margin-bottom:4px;">Identity &amp; Account</div>
      <ul style="margin:0 0 12px;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
        <li>New account placing a high-value first order (no purchase history)</li>
        <li>Account credentials recently changed (email, phone, password) followed immediately by a purchase</li>
        <li>Billing address doesn't match delivery address, and delivery address appears on multiple accounts</li>
        <li>Multiple accounts linked to the same device fingerprint or IP</li>
      </ul>

      <div style="font-weight:600;margin-bottom:4px;">Transaction</div>
      <ul style="margin:0 0 12px;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
        <li>Order value significantly above that user's historical average</li>
        <li>Multiple orders placed in rapid succession to different addresses</li>
        <li>Unusually high quantity of the same SKU (reseller pattern — especially limited-release sneakers)</li>
        <li>Payment instrument used for the first time on a high-value cart</li>
        <li>UPI/card used across several accounts in a short window</li>
      </ul>

      <div style="font-weight:600;margin-bottom:4px;">Behavioural</div>
      <ul style="margin:0 0 12px;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
        <li>Session speed: add to cart + checkout in under 60 seconds → bot or credential-stuffing</li>
        <li>Geographic mismatch: login city ≠ delivery city ≠ device IP location</li>
        <li>No product page views, straight to cart → scraped cart injection</li>
      </ul>

      <div style="font-weight:600;margin-bottom:4px;">India-Specific</div>
      <ul style="margin:0 0 20px;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
        <li>High-value orders on bank holidays or post-midnight when manual review is unavailable</li>
        <li>Delivery pincode is a known freight-forwarder or logistics aggregator address (resale arbitrage)</li>
        <li>Card BIN doesn't match expected issuer geography for that user's profile</li>
      </ul>

      <div style="font-weight:700;font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">Detection Architecture (4 Layers)</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
        <div style="background:var(--surface2);border-radius:8px;padding:12px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">Layer 1 — Rules Engine <span style="font-weight:400;color:var(--text2);font-size:12px;">(real-time, low latency)</span></div>
          <div style="font-size:13px;color:var(--text2);">Hard blocks: order velocity thresholds, known fraudulent device IDs/IPs, blacklisted pincodes, impossible geo combinations. Catches large volume of low-sophistication fraud instantly.</div>
        </div>
        <div style="background:var(--surface2);border-radius:8px;padding:12px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">Layer 2 — ML Risk Scoring <span style="font-weight:400;color:var(--text2);font-size:12px;">(real-time)</span></div>
          <div style="font-size:13px;color:var(--text2);">Gradient boosting model on full feature set → risk score per transaction. Above threshold = review, below = auto-approve. Must retrain frequently — fraud patterns shift seasonally (sale events are high-fraud periods).</div>
        </div>
        <div style="background:var(--surface2);border-radius:8px;padding:12px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">Layer 3 — Graph Analysis <span style="font-weight:400;color:var(--text2);font-size:12px;">(near-real-time)</span></div>
          <div style="font-size:13px;color:var(--text2);">Entity resolution across accounts — linking shared devices, payment instruments, addresses, phone numbers to detect fraud rings. Especially relevant for return fraud where a cluster of accounts is coordinating.</div>
        </div>
        <div style="background:var(--surface2);border-radius:8px;padding:12px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">Layer 4 — Human Review Queue</div>
          <div style="font-size:13px;color:var(--text2);">Medium-risk transactions the model isn't confident about. Review team makes the call. Decisions feed back as labeled data to improve the model.</div>
        </div>
      </div>

      <div style="font-weight:700;font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Return &amp; Refund Fraud (Myntra-Specific)</div>
      <ul style="margin:0 0 12px;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
        <li>User orders expensive items, returns empty boxes or counterfeit items</li>
        <li>User claims non-delivery on a delivered order — repeatedly</li>
        <li>Wardrobing: buying, wearing, and returning (catch with product condition scanning at return warehouse)</li>
      </ul>
      <div style="font-size:13px;color:var(--text2);margin-bottom:20px;"><strong>Detection signals:</strong> return rate per user above threshold, return claim patterns on high-value orders, "item not received" claims against delivery-confirmed orders, warehouse-side image verification on returns.</div>

      <div style="font-weight:700;font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Metrics to Track</div>
      <ul style="margin:0 0 20px;padding-left:18px;display:flex;flex-direction:column;gap:4px;">
        <li><strong>False positive rate</strong> — legitimate users getting blocked kills conversion and trust</li>
        <li><strong>Fraud rate</strong> by transaction type and order value band</li>
        <li><strong>Chargeback rate</strong> — card network threshold ~1%; exceeding it has penalties</li>
        <li><strong>Time-to-detection</strong> for new fraud patterns</li>
      </ul>

      <div style="padding:12px 16px;background:rgba(220,85,53,0.06);border-left:3px solid var(--accent4);border-radius:0 8px 8px 0;margin-bottom:16px;">
        <strong>Key Tradeoff — Precision vs. Recall:</strong> Blocking too aggressively hurts good customers; too lenient lets fraud through. On Myntra, where customer experience is core, calibrate toward fewer false positives — a loyal customer getting their order declined on payday is a real retention risk.
      </div>

      <div style="font-weight:700;font-size:13px;color:var(--accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Build Priority</div>
      <div style="font-size:13px;color:var(--text2);">Phase 1: Device fingerprinting + rules engine for obvious signals, then ML model trained on labeled chargeback and return abuse data. Phase 2: Graph-based ring detection — high-value but operationally heavier, once the core model is stable.</div>
    `
  }
];
