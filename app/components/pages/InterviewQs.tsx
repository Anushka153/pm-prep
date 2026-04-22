"use client";
import { useState } from "react";
import { iqData } from "@/data/iqData";

const CATS = [
  { key: "all", label: "All" },
  { key: "ai", label: "🤖 AI/ML" },
  { key: "execution", label: "🔍 Execution" },
  { key: "design", label: "🎨 Product Design" },
  { key: "strategy", label: "♟ Strategy" },
  { key: "behavioral", label: "🎤 Behavioral" },
  { key: "estimation", label: "📐 Estimation" },
];

export default function InterviewQs() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = filter === "all" ? (iqData as any[]) : (iqData as any[]).filter(q => q.cat === filter);

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Interview Questions</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Common PM interview questions with model answers</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {CATS.map(c => (
          <button key={c.key} className={`filter-btn${filter === c.key ? " active" : ""}`} onClick={() => setFilter(c.key)}>{c.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((q: any, i: number) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <span className={`tag tag-${q.cat === "execution" ? "exec" : q.cat === "ai" ? "google" : q.cat}`} style={{ marginBottom: 6, display: "inline-block" }}>{q.cat}</span>
                <div style={{ fontSize: 13, color: "var(--text)", marginTop: 4 }}>{q.q}</div>
              </div>
              <span style={{ color: "var(--text2)" }}>{open === i ? "▲" : "▼"}</span>
            </div>
            {open === i && (
              <div style={{ padding: "0 16px 16px" }}>
                <div className="feedback-box model">
                  <h4>Model Answer</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)", whiteSpace: "pre-wrap" }}>{q.a}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
