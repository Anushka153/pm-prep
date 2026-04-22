"use client";
import { useState } from "react";
import { frameworks } from "@/data/frameworks";

export default function Frameworks() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>PM Frameworks</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Four core frameworks for every interview question type.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(frameworks as any[]).map((fw, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", cursor: "pointer" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, padding: "2px 10px", borderRadius: 4, background: "rgba(91,80,232,0.15)", color: "var(--accent)" }}>{fw.tag}</span>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{fw.title}</span>
                </div>
                {fw.subtitle && <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>{fw.subtitle}</div>}
              </div>
              <span style={{ color: "var(--text2)", fontSize: 16 }}>{open === i ? "▲" : "▼"}</span>
            </div>
            {open === i && (
              <div style={{ padding: "0 20px 20px" }}>
                {fw.steps && (
                  <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    {fw.steps.map((s: string, si: number) => (
                      <li key={si} style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: s }} />
                    ))}
                  </ol>
                )}
                {fw.sections && fw.sections.map((sec: any, si: number) => (
                  <div key={si} style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{sec.title}</div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                      {(sec.items || []).map((item: string, ii: number) => (
                        <li key={ii} style={{ fontSize: 13, color: "var(--text)", paddingLeft: 16, position: "relative", lineHeight: 1.5 }}>
                          <span style={{ position: "absolute", left: 0, color: "var(--text2)" }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {fw.example && (
                  <div style={{ marginTop: 16, background: "rgba(91,80,232,0.06)", border: "1px solid rgba(91,80,232,0.2)", borderRadius: 8, padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Example</div>
                    <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>{fw.example}</div>
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
