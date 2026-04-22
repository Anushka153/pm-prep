"use client";
import PageNotes from "@/app/components/PageNotes";
import { cases } from "@/data/cases";

const scoredCases = cases.filter((c: any) => c.score !== null && c.score !== undefined);
const avgScore = scoredCases.length
  ? Math.round((scoredCases.reduce((s: number, c: any) => s + c.score, 0) / scoredCases.length) * 10) / 10
  : 0;
const bestCase = scoredCases.reduce((a: any, b: any) => (b.score > a.score ? b : a), scoredCases[0]);
const worstCases = scoredCases.filter((c: any) => c.score <= 7.5).map((c: any) => c.company);

const scoreProgression = scoredCases
  .sort((a: any, b: any) => a.id - b.id);

export default function Dashboard() {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Dashboard</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Your PM interview progress at a glance</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
        <div className="stat-card">
          <div style={{ fontSize: 12, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Cases Done</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)" }}>{scoredCases.length}</div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Across 8 companies</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 12, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Average Score</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent2)" }}>
            {avgScore}<span style={{ fontSize: 18 }}>/10</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Strong performance</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 12, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Best Case</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--green)" }}>{bestCase?.score}</div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>{bestCase?.title}</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 12, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Needs Work</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--yellow)" }}>7.5</div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>
            {[...new Set(worstCases)].join(", ")}
          </div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 12, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Frameworks</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent3)" }}>4</div>
          <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Design, Strategy, Execution, Estimation</div>
        </div>
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
        Score Progression
      </h2>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, marginBottom: 32 }}>
        {scoreProgression.map((c: any) => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 120, fontSize: 12, color: "var(--text2)", flexShrink: 0 }}>{c.company}</div>
            <div style={{ flex: 1, background: "var(--border)", borderRadius: 4, height: 8, position: "relative" }}>
              <div style={{
                width: `${(c.score / 10) * 100}%`, height: "100%", borderRadius: 4,
                background: c.score >= 9 ? "var(--green)" : c.score >= 8 ? "var(--accent2)" : "#ef4444"
              }} />
            </div>
            <div style={{ width: 32, fontSize: 13, fontWeight: 700, color: "var(--text)", textAlign: "right" }}>{c.score}</div>
          </div>
        ))}
      </div>
      <PageNotes pageKey="dashboard" />
    </div>
  );
}
