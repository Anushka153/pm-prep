"use client";
import PageNotes from "@/app/components/PageNotes";
import { cases } from "@/data/cases";

const STRENGTHS = [
  "Clarifying questions are always sharp and structured",
  "Pain point identification is thorough and empathetic",
  "Creative solutions that stand out (green/yellow/red, walk option, chatty driver toggle)",
  "Guardrail metrics — you always protect the downside",
  "Launch strategy with A/B testing, beta rollout, gradual ramp",
  "Strong segmentation across price, demographics, behavior",
  "Moonshot thinking while staying grounded (PWA, X-terminal, AI prediction)",
];

const GAPS = [
  "Voice all assumptions and clarifications out loud — interviewers score what they hear",
  "Move faster to solutions once root cause is identified",
  "Add business metrics (GMV, ARPU, take rate) without being prompted",
  "Discovery problem — how do users find what they need? Often skipped",
  "Supply side in two-sided marketplaces — state it upfront",
  "Creator/seller side impact when improving consumer-facing features",
  "Cold start problem — often missed in design questions",
];

const DELIVERY = [
  "Replace 'uh' with a brief pause — silence reads as confident",
  "Complete each sentence before starting the next",
  "Slow down by 20% when nervous — clarity beats speed",
  "State your assumption then commit — don't ask the interviewer to narrow scope",
  "Pause 3–5 seconds before answering — shows composure, not hesitation",
];

const KEYWORDS_MISSING = [
  "Cohort analysis, churn rate, LTV, CAC, retention curve",
  "Funnel analysis, session replay, deployment rollback",
  "Cold start, filter bubble, content diversity score",
  "Precision vs recall, false positive rate, sockpuppet detection",
  "Dwell time, throughput, revenue per enplaned passenger (RPE)",
  "Dark stores, SKU density, cold chain, unit economics",
  "Escrow, two-sided marketplace, liquidity problem, KYC",
];

export default function Patterns() {
  const scoredCases = (cases as any[]).filter(c => c.score !== null && c.score !== undefined);
  const dist: Record<string, number> = {};
  scoredCases.forEach(c => {
    const k = String(c.score);
    dist[k] = (dist[k] || 0) + 1;
  });

  const scoreColors: Record<string, string> = {
    "7.5": "#ef4444", "8": "#eab308", "8.5": "#eab308", "9": "#22c55e", "9.5": "var(--accent2)"
  };

  const cards = [
    { title: "✅ Consistent Strengths", items: STRENGTHS, border: "#22c55e", bg: "rgba(34,197,94,0.05)" },
    { title: "❌ Consistent Gaps to Fix", items: GAPS, border: "#ef4444", bg: "rgba(239,68,68,0.05)" },
    { title: "🎤 Delivery Coaching", items: DELIVERY, border: "var(--accent)", bg: "rgba(91,80,232,0.05)" },
    { title: "📚 Keywords You Keep Missing", items: KEYWORDS_MISSING, border: "var(--accent2)", bg: "rgba(232,162,80,0.05)" },
  ];

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Patterns & Gaps</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>What you consistently do well — and what to fix.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 32 }}>
        {cards.map((card, i) => (
          <div key={i} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: 12, padding: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>{card.title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {card.items.map((item, ii) => (
                <div key={ii} style={{ fontSize: 13, color: "var(--text2)", paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                  <span style={{ position: "absolute", left: 0, color: card.border }}>•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Score Distribution</h2>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {Object.entries(dist).sort().map(([score, count]) => (
            <div key={score} style={{ textAlign: "center", flex: 1, minWidth: 80 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: scoreColors[score] || "var(--text)" }}>{count}</div>
              <div style={{ fontSize: 12, color: "var(--text2)" }}>{score} score{count > 1 ? "s" : ""}</div>
            </div>
          ))}
        </div>
      </div>
      <PageNotes pageKey="patterns" />
    </div>
  );
}
