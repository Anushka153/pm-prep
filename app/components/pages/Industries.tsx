"use client";
import PageNotes from "@/app/components/PageNotes";

const INDUSTRIES = [
  { icon: "🚗", name: "Mobility / Ride-sharing", tag: "Uber, Lyft, Waymo, Ola", items: [["US rideshare market","~$50B/year"],["Uber global trips/day","~20M trips"],["Avg trip duration","~25 minutes"],["Rides/person/day (mid city)","~0.2"],["Platform take rate","25–30%"],["Key metric","GMV, take rate, driver utilization, ETA accuracy"]] },
  { icon: "🎵", name: "Music / Audio Streaming", tag: "Spotify, Apple Music, YouTube Music", items: [["Spotify MAU","~600M"],["Spotify paid subscribers","~250M"],["Spotify revenue","~$16B/year"],["Royalty payout rate","~70% of revenue"],["ARPU (premium)","~$5–6/month"],["Key metric","MAU, paid conversion, churn, ARPU, DAU/MAU"]] },
  { icon: "🛒", name: "E-commerce", tag: "Amazon, Flipkart, Meesho", items: [["Amazon US GMV","~$500B+"],["Amazon Prime members (US)","~170M"],["Marketplace take rate","8–15%"],["Avg order value (US)","~$40–50"],["Return rate (apparel)","~30%"],["Key metric","GMV, repeat purchase rate, cart conversion, NPS, LTV/CAC"]] },
  { icon: "🎬", name: "Video Streaming", tag: "YouTube, Netflix, Disney+", items: [["YouTube daily watch time","~1B hours"],["YouTube annual revenue","~$35–40B"],["YouTube annual cost","~$22B"],["Netflix subscribers (global)","~270M"],["Netflix ARPU","~$13–16/month"],["Key metric","Watch time, CTR, subscriber LTV, content ROI, DAU/MAU"]] },
  { icon: "✈️", name: "Aviation / Airports", tag: "European airports, IATA benchmarks", items: [["Revenue types","Aeronautical + Non-aero"],["Non-aero share (best airports)","~50–60%"],["Revenue per enplaned pax","€15–25 (medium EU)"],["Key non-aero driver","Dwell time → retail spend"],["Schengen implication","Separate secure zones"],["Key metric","Dwell time, throughput, RPE, footfall, slot utilization"]] },
  { icon: "🛵", name: "Quick Commerce / Grocery", tag: "Blinkit, BigBasket, Grofers, Zepto", items: [["India grocery market","~$600B/year"],["Online penetration (India)","~3–5%"],["Avg order value (India)","₹400–600"],["Delivery promise (q-commerce)","10–30 minutes"],["Dark store radius","~2–3 km"],["Key metric","GMV/order, CAC, dark store contribution margin, SKU density"]] },
  { icon: "🔄", name: "Sharing / P2P Marketplace", tag: "Airbnb, OLIO, Fat Llama", items: [["Platform take rate","10–20%"],["Trust mechanism","KYC, escrow, ratings, insurance"],["Cold start solution","Single city/community launch"],["Marketplace rule #1","Supply first, then demand"],["Key metric","Liquidity, GMV, take rate, NPS, dispute rate"]] },
  { icon: "🎮", name: "Gaming / Puzzle Apps", tag: "NYT Games, Wordle, Duolingo", items: [["NYT Games DAU estimate","~3–5M daily players"],["Wordle free tier","Yes (acquisition driver)"],["Paid games bundle","~$5/month (NYT)"],["Engagement driver","Streak mechanics, social sharing"],["Monetization gap","Competitive/social layer"],["Key metric","DAU, streak retention, D7/D30, invite rate, paid conversion"]] },
  { icon: "💼", name: "B2B SaaS", tag: "Notion, Slack, Salesforce, HubSpot", items: [["Median SaaS ARR growth (early)","~100–150%/yr"],["Good NRR (net revenue retention)",">110%"],["Avg ACV","SMB $5K · Mid $30K · Ent $100K+"],["Churn (annual)","SMB ~15–20% · Enterprise ~5–8%"],["Trial-to-paid conversion","~15–25%"],["Key metric","ARR, NRR, CAC payback, logo churn"]] },
  { icon: "📱", name: "Social / Creator / Ads", tag: "Meta, TikTok, YouTube, Instagram", items: [["Meta ARPU (US/Canada)","~$60/yr"],["Google revenue per user (US)","~$50/yr"],["TikTok creator fund rate","~$0.02–0.04/1K views"],["Social ad CTR benchmark","~0.9–1.5% (Facebook)"],["Key metric","ARPU, DAU/MAU, CPM, creator retention"]] },
  { icon: "🏥", name: "Healthtech / Digital Health", tag: "Digbi, Noom, Hinge Health, Transcarent", items: [["US healthcare spend","~$4.5T/yr"],["Employer health benefit spend/employee","~$15,000/yr"],["Employer wellness budget/employee","$50–500/yr"],["Health app D30 retention","~15–25%"],["Avg health insurance premium (US)","~$8K/yr individual · $22K family"],["Key metric","Clinical outcomes, engagement rate, employer ROI, contract renewal"]] },
  { icon: "🇮🇳", name: "India Digital / Consumer", tag: "Meesho, Zepto, CRED, PhonePe", items: [["India internet users","~550M"],["UPI transactions/month","~10–12B (2024)"],["E-commerce penetration","~8–10% of retail"],["Avg order value (e-comm)","₹800–1,200"],["Tier 2/3 city internet growth","Fastest-growing segment"],["Key metric","GMV, COD vs prepaid ratio, DAU, vernacular engagement"]] },
];

const BENCHMARKS = [
  { title: "📈 B2B SaaS Benchmarks", color: "var(--accent)", items: [["Good ARR growth (Series A–B)","2–3x/yr"],["World-class NRR",">120%"],["CAC payback (good)","<18 months"],["Gross margin (SaaS)","70–80%"],["Trial-to-paid conversion","15–25%"],["Enterprise deal close time","3–9 months"]] },
  { title: "📱 Social & Consumer Benchmarks", color: "var(--accent2)", items: [["Good D1 / D7 / D30 retention","40% / 20% / 10%"],["World-class D30 retention",">25%"],["Mobile app store conversion","~30% (impression → install)"],["Freemium-to-paid (consumer)","2–5%"],["Push notification opt-in","~50–60%"],["App uninstall rate (D30)","~25% typical"]] },
  { title: "🛒 E-commerce Benchmarks", color: "var(--accent3)", items: [["E-commerce conversion rate","2–3% (desktop) · 1–2% (mobile)"],["Cart abandonment rate","~70%"],["Email open rate (transactional)","~40–50%"],["Return rate (apparel)","~30%"],["Avg order value (US e-comm)","~$80–120"],["Repeat purchase rate (good)",">40% at 90 days"]] },
  { title: "🏥 Healthtech Benchmarks", color: "#0891b2", items: [["US healthcare spend","~$4.5T/yr (~18% of GDP)"],["Employer health cost/employee","~$15K/yr"],["Wellness app D30 retention","15–25%"],["Digital therapeutics NPS","50–70 (good)"],["Coaching session completion","~60–70% (good)"],["B2B health contract renewal",">80% = healthy business"]] },
];

const POPULATION = [
  { label: "United States", val: "~335M people", sub: "~130M households · ~260M smartphones · ~180M internet users" },
  { label: "India", val: "~1.4B people", sub: "~300M households · ~700M smartphones · ~550M internet users" },
  { label: "Global", val: "~8B people", sub: "~5.4B smartphones · ~5.4B internet users" },
  { label: "Key City Sizes", val: "", sub: "NYC ~8M · LA ~4M · Austin ~1M · Mumbai ~20M · Bangalore ~13M" },
];

export default function Industries() {
  return (
    <div style={{ padding: "24px 28px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Industry Reference</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Key benchmarks, metrics, and anchors for market sizing across industries.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginBottom: 36 }}>
        {INDUSTRIES.map((ind, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{ind.icon}</div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{ind.name}</h3>
            <div style={{ fontSize: 11, color: "var(--text2)", marginBottom: 14 }}>{ind.tag}</div>
            {ind.items.map(([key, val], ii) => (
              <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, padding: "5px 0", borderBottom: ii < ind.items.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 12, color: "var(--text2)", flex: 1 }}>{key}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", textAlign: "right", flexShrink: 0, maxWidth: "45%" }}>{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Number Benchmarks for Estimation</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 36 }}>
        {BENCHMARKS.map((b, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: b.color, marginBottom: 12 }}>{b.title}</h4>
            {b.items.map(([key, val], ii) => (
              <div key={ii} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "5px 0", borderBottom: ii < b.items.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 12, color: "var(--text2)" }}>{key}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Population Anchors for Estimation</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {POPULATION.map((p, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{p.label}</div>
            {p.val && <div style={{ fontWeight: 700, fontSize: 18, color: "var(--text)", marginBottom: 4 }}>{p.val}</div>}
            <div style={{ fontSize: 12, color: "var(--text2)" }}>{p.sub}</div>
          </div>
        ))}
      </div>
      <PageNotes pageKey="industries" />
    </div>
  );
}
