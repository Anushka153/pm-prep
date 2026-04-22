"use client";
import PageNotes from "@/app/components/PageNotes";

const QR_CARDS = [
  {
    title: "Product Design in 60 Seconds",
    steps: ["Clarify goal, user, platform","Segment users, pick one","Map pain points across journey","Prioritize by impact × feasibility","Give 3 solutions with depth — ask: but how?","State trade-offs, pick one","Primary metric, secondary metric, guardrail metric","Launch: A/B test → beta → gradual ramp"]
  },
  {
    title: "Strategy in 60 Seconds",
    steps: ["Define what winning looks like","Check market timing (payments, devices, behavior)","Segment and pick the beachhead","Identify your moat (network effects, switching cost, data)","Phase the strategy: validate → scale → defend","For marketplaces: supply first, then demand"]
  },
  {
    title: "Metrics Diagnosis in 60 Seconds",
    steps: ["Confirm the data is real","Segment: platform, geography, user type, category, time","Identify sudden vs gradual (bug vs behavior)","Generate 3–5 hypotheses: product, behavior, competition, data","Validate fast: logs and replays first, surveys last","Fix, monitor, define rollback trigger"]
  },
  {
    title: "Estimation in 60 Seconds",
    steps: ["Clarify scope and definition","Pick top-down or bottom-up","State every assumption out loud","Build the funnel: population → active → paying","Do the math, round cleanly","Sanity check against something you know"]
  },
  {
    title: "Launch Strategy Template",
    steps: ["Alpha: Internal team. Validate technical feasibility. 1–2 weeks.","Beta (5–10%): Early adopters. Measure primary metric baseline.","Ramp (25% → 50% → 100%): Only expand if success threshold met.","Full launch: Monitor guardrail metrics for 2 weeks.","Rollback plan: If metric X drops Y%, revert immediately."]
  },
  {
    title: "Delivery Rules",
    steps: ["Voice everything out loud — score what they hear, not what you think","State assumptions before diving in — commit and justify","Use the but how? test — push one level deeper","Prioritize decisively — pick and defend, don't hedge","Move fast once diagnosed — get to solutions quickly","Pause, don't say 'uh' — 2-second pause reads as confident"]
  },
];

const METRICS = [
  { label: "Primary Metric", color: "var(--accent2)", desc: "What you are optimizing for. e.g. repeat purchase rate, NPS, DAU." },
  { label: "Secondary Metric", color: "var(--accent3)", desc: "Business health indicator. e.g. GMV, ARPU, take rate, revenue." },
  { label: "Guardrail Metric", color: "#ef4444", desc: "What you must NOT break. e.g. do not increase promo spend without ROI threshold." },
];

const PATTERNS = [
  { title: "Metrics Patterns", items: ["Always 3 metrics: primary → secondary → guardrail", "Never optimize one metric in isolation", "Guardrail = what you promise not to break", "Primary metric should be directly tied to user value"] },
  { title: "Prioritization Patterns", items: ["RICE: Reach × Impact × Confidence ÷ Effort", "Always explain why you deprioritized — not just what you picked", "Sequence by dependency, not just impact", "Stage 1 features unlock Stage 2 — show that logic"] },
  { title: "Market Entry Patterns", items: ["Supply first (marketplaces), demand follows", "Beachhead = one city, one user type, one use case", "Prove unit economics before scaling", "Moat: network effects > data > switching cost > brand"] },
  { title: "Utilization funnel, peak demand, throughput, cycle time, capacity estimation", items: ["Name the question type before starting math", "Population → utilization rate → peak demand → throughput → count", "Always adjust for real-world friction (stops, wait times)", "Sanity check with a known benchmark"] },
];

export default function QuickRef() {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Quick Reference</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Review this before every interview.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 32 }}>
        {QR_CARDS.map((card, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{card.title}</h3>
            <ol style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              {card.steps.map((s, si) => (
                <li key={si} style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5 }}>{s}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Metrics Framework</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 32 }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: `3px solid ${m.color}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: m.color, marginBottom: 6, fontWeight: 700 }}>{m.label}</div>
            <div style={{ fontSize: 13, color: "var(--text2)" }}>{m.desc}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Interview Patterns</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {PATTERNS.map((p, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>{p.title}</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {p.items.map((item, ii) => (
                <li key={ii} style={{ fontSize: 12, color: "var(--text2)", paddingLeft: 14, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0 }}>•</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <PageNotes pageKey="quickref" />
    </div>
  );
}
