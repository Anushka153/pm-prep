"use client";
import { useState } from "react";
import { behavioralStories } from "@/data/behavioral";

export default function Behavioral() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Behavioral Stories</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Your STAR-format stories for behavioral questions</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(behavioralStories as any[]).map((s, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", cursor: "pointer" }}>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text)" }}>{s.title || s.q}</div>
                {s.tags && <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>{s.tags.map((t: string, ti: number) => <span key={ti} className="kw-tag">{t}</span>)}</div>}
              </div>
              <span style={{ color: "var(--text2)" }}>{open === i ? "▲" : "▼"}</span>
            </div>
            {open === i && (
              <div style={{ padding: "0 18px 18px" }}>
                {s.situation && <div style={{ marginBottom: 10 }}><strong style={{ color: "var(--accent2)" }}>S:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.situation}</span></div>}
                {s.task && <div style={{ marginBottom: 10 }}><strong style={{ color: "var(--accent2)" }}>T:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.task}</span></div>}
                {s.action && <div style={{ marginBottom: 10 }}><strong style={{ color: "var(--accent2)" }}>A:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.action}</span></div>}
                {s.result && <div><strong style={{ color: "var(--accent2)" }}>R:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.result}</span></div>}
                {s.a && <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{s.a}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
