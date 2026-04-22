"use client";
import PageNotes from "@/app/components/PageNotes";
import { useState } from "react";
import { dbLinks } from "@/data/dbLinks";

const TAGS = ["all", "Amazon", "Behavioral", "Strategy", "Frameworks", "Product Design", "General", "AI/ML", "Own Analysis"];

export default function ResourceDB() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? (dbLinks as any[]) : (dbLinks as any[]).filter(l => l.tags?.includes(filter));

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Resource DB</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Curated PM interview resources</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {TAGS.map(t => (
          <button key={t} className={`filter-btn${filter === t ? " active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((l: any, i: number) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 14 }}>{l.title}</div>
                {l.desc && <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>{l.desc}</div>}
                {l.tags && (
                  <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                    {l.tags.map((t: string, ti: number) => <span key={ti} className="kw-tag">{t}</span>)}
                  </div>
                )}
              </div>
              {l.url && (
                <a href={l.url} target="_blank" rel="noopener noreferrer" style={{
                  background: "rgba(91,80,232,0.1)", border: "1px solid rgba(91,80,232,0.2)",
                  color: "var(--accent)", borderRadius: 6, padding: "4px 12px", fontSize: 12,
                  fontWeight: 600, textDecoration: "none", flexShrink: 0
                }}>Open →</a>
              )}
            </div>
          </div>
        ))}
      </div>
      <PageNotes pageKey="resourcedb" />
    </div>
  );
}
