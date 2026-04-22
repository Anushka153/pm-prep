"use client";
import { useState } from "react";
import { kwData } from "@/data/kwData";

const CATS = [
  { key: "all", label: "All" },
  { key: "metrics", label: "📈 Metrics" },
  { key: "diagnosis", label: "🔍 Diagnosis" },
  { key: "ml", label: "🧠 ML/AI" },
  { key: "marketplace", label: "🏪 Marketplace" },
  { key: "growth", label: "🚀 Growth" },
  { key: "mobility", label: "🚗 Mobility" },
];

export default function Keywords() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = filter === "all" ? (kwData as any[]) : (kwData as any[]).filter((k) => k.cat === filter);

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Power Keywords</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Industry terminology that signals PM depth</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {CATS.map((c) => (
          <button key={c.key} className={`filter-btn${filter === c.key ? " active" : ""}`} onClick={() => setFilter(c.key)}>
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {filtered.map((k: any) => (
          <div
            key={k.term}
            onClick={() => setOpen(open === k.term ? null : k.term)}
            style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
              padding: 16, cursor: "pointer", transition: "border-color 0.15s",
              borderColor: open === k.term ? "var(--accent)" : "var(--border)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{k.term}</div>
                <div style={{ fontSize: 10, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>{k.catLabel}</div>
              </div>
              <span style={{ color: "var(--text2)", fontSize: 14, flexShrink: 0 }}>{open === k.term ? "▲" : "▼"}</span>
            </div>
            {open === k.term && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{k.def}</div>
                <div style={{ fontSize: 12, color: "var(--accent2)", background: "rgba(232,162,80,0.08)", borderRadius: 6, padding: "6px 10px" }}>
                  <strong>When to use:</strong> {k.use}
                </div>
                {k.example && (
                  <div style={{ fontSize: 12, color: "var(--text2)", fontStyle: "italic", borderLeft: "2px solid var(--border)", paddingLeft: 10 }}>
                    {k.example}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
