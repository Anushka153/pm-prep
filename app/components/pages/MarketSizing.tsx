"use client";
import PageNotes from "@/app/components/PageNotes";
import { useState } from "react";

const MS_CASES = [
  {
    title: "How much does it cost to run YouTube for a day?",
    subtitle: "Cost estimation (bottom-up)",
    answer: "~$60M/day · ~$22B/year",
    tsm: [
      { label: "TAM", val: "$100M/day", desc: "Total revenue YouTube earns — the ceiling it must stay under to be profitable" },
      { label: "SAM (Operating)", val: "$60M/day", desc: "Actual operating cost: infra + people + content payouts" },
      { label: "Margin", val: "~40%", desc: "What's left after costs — your sanity check target" },
    ],
    steps: [
      { title: "Bottom-Up Breakdown", content: "Infrastructure: 500 hrs uploaded/min × 1440 min = ~720K hrs/day. At 1–2 GB/hr → ~1 PB new storage/day. Bandwidth: 1B watch-hours × 2 Mbps = ~2 exabytes served → ~$20M/day. Servers + compute ~$5M/day. Total infra: ~$25M/day\n\nPeople: ~10K employees × $300K fully loaded = $3B/yr → ~$8M/day\n\nContent/Licensing: YouTube pays ~$10B/yr to creators → ~$27M/day" },
      { title: "Final Tally", table: [["Bucket","Per Day","Per Year"],["Infrastructure","~$25M","~$9B"],["People","~$8M","~$3B"],["Content/Licensing","~$27M","~$10B"],["Total","~$60M/day","~$22B/year"]] },
    ],
    sanity: "YouTube revenue ~$35–40B/year. Cost $22B → ~40% margin. Reasonable for a scaled ad platform. ✅"
  },
  {
    title: "Launch autonomous vehicle service in Austin",
    subtitle: "TAM/SAM/SOM + fleet sizing",
    answer: "SOM $25–30M yr1 · 1,500 vehicles steady state",
    tsm: [
      { label: "TAM", val: "$350M", desc: "Total Austin rideshare spend (US market $50B × Austin 0.7% population share)" },
      { label: "SAM", val: "$210M", desc: "60% of trips AV-serviceable — exclude highways, far suburbs, extreme weather" },
      { label: "SOM (Yr 1)", val: "$25–30M", desc: "10–15% share as new entrant, limited fleet, geo-fenced zone only" },
    ],
    steps: [
      { title: "Fleet Size", bullets: ["200K daily trips total × 15% share = 30K trips/day to serve","35 min/cycle (25 min trip + 10 min turnaround) → 20 productive trips/vehicle/day","30,000 ÷ 20 = 1,500 vehicles steady state","Launch with 400–500 vehicles geo-fenced: downtown, airport, UT campus"] },
      { title: "Peak Strategy", bullets: ["3–4x demand spikes: commutes, Fri/Sat nights, SXSW, F1 Grand Prix","AV edge: pre-position fleet 15 min before peak using historical data — human drivers can't do this","Off-peak: discount scheduled rides + use idle time for charging/maintenance"] },
    ],
    sanity: "Waymo ~1,500 vehicles in SF (~900K pop). 1,500 for Austin at 1M tracks well. ✅"
  },
  {
    title: "Should Google enter ride-sharing?",
    subtitle: "Strategy + fleet estimation",
    answer: "Yes via Waymo — same fleet math applies",
    tsm: [
      { label: "TAM", val: "$350B", desc: "Global ride-sharing market (Uber ~$120B GMV, Lyft ~$10B, Ola ~$6B, DiDi ~$200B+ globally)" },
      { label: "SAM", val: "$50B", desc: "US market where Google has regulatory clarity and existing Maps infrastructure" },
      { label: "SOM (Yr 3)", val: "$5–7B", desc: "10–15% US share via Waymo in 5–10 cities, premium positioning" },
    ],
    steps: [
      { title: "Strategic Case", bullets: ["Google already owns Maps, navigation, ad targeting — data moat is pre-built","Waymo is 10+ years of AV R&D: the fleet is the product, not a separate bet","Ride-sharing = daily habit → daily Maps/Search touchpoint → ad flywheel","Risk: regulatory (AV licensing state-by-state), ops (vehicle maintenance at scale)"] },
      { title: "Recommendation", content: "Enter via Waymo, not a driver marketplace. Differentiate on safety record and pre-positioning. Beachhead: SF, Phoenix, Austin (existing Waymo ops). Expand to 10 cities by year 3. Measure: rides/vehicle/day, safety incidents/mile, NPS vs Uber." },
    ],
    sanity: "Waymo already operating commercially in SF and Phoenix. The question isn't if — it's how fast to scale. ✅"
  },
];

export default function MarketSizing() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Market Sizing Examples</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>From your practice sessions. Every example shows TAM → SAM → SOM.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MS_CASES.map((c, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", cursor: "pointer" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 3 }}>
                  {c.subtitle} · <span style={{ color: "var(--accent2)" }}>{c.answer}</span>
                </div>
              </div>
              <span style={{ color: "var(--text2)", fontSize: 16, flexShrink: 0, marginLeft: 12 }}>{open === i ? "▲" : "▼"}</span>
            </div>

            {open === i && (
              <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {c.tsm.map((t, ti) => (
                    <div key={ti} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{t.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--accent2)", marginBottom: 4 }}>{t.val}</div>
                      <div style={{ fontSize: 11, color: "var(--text2)", lineHeight: 1.4 }}>{t.desc}</div>
                    </div>
                  ))}
                </div>

                {c.steps.map((s: any, si: number) => (
                  <div key={si}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{s.title}</div>
                    {s.content && <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{s.content}</p>}
                    {s.bullets && (
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                        {s.bullets.map((b: string, bi: number) => (
                          <li key={bi} style={{ fontSize: 13, color: "var(--text2)", paddingLeft: 16, position: "relative" }}>
                            <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>•</span>{b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.table && (
                      <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                          {s.table.map((row: string[], ri: number) => (
                            <tr key={ri} style={{ borderBottom: "1px solid var(--border)" }}>
                              {row.map((cell, ci) => (
                                <td key={ci} style={{ padding: "8px 12px", color: ri === 0 ? "var(--text2)" : "var(--text)", fontWeight: ri === 0 || ri === s.table.length - 1 ? 700 : 400 }}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </table>
                      </div>
                    )}
                  </div>
                ))}

                <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "var(--text2)" }}>
                  <strong style={{ color: "#22c55e" }}>Sanity Check:</strong> {c.sanity}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <PageNotes pageKey="marketsizing" />
    </div>
  );
}
