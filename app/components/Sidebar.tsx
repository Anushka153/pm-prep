"use client";
import { supabase } from "@/lib/supabase";

const NAV = [
  { section: "Overview" },
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { section: "My Cases" },
  { id: "cases", icon: "📋", label: "Case Log" },
  { id: "patterns", icon: "🔁", label: "Patterns & Gaps" },
  { section: "Frameworks" },
  { id: "frameworks", icon: "🧩", label: "Frameworks" },
  { id: "quickref", icon: "⚡", label: "Quick Reference" },
  { section: "Market Sizing" },
  { id: "marketsizing", icon: "📐", label: "Sizing Examples" },
  { id: "industries", icon: "🏭", label: "Industries" },
  { section: "Keywords" },
  { id: "keywords", icon: "🔑", label: "Power Keywords" },
  { section: "Practice" },
  { id: "cardgames", icon: "🃏", label: "Card Games" },
  { id: "behavioral", icon: "🎤", label: "Behavioral Stories" },
  { section: "Interview Prep" },
  { id: "interviewqs", icon: "💬", label: "Interview Qs" },
  { section: "Question Bank" },
  { id: "questionbank", icon: "📚", label: "Question Bank" },
  { section: "Resources" },
  { id: "dataanswers", icon: "📊", label: "Data Answers" },
  { id: "db", icon: "🗄️", label: "Resource DB" },
];

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }: Props) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 40, display: "none"
          }}
          className="sidebar-overlay"
        />
      )}
      <nav style={{
        width: 220, background: "var(--surface)", borderRight: "1px solid var(--border)",
        height: "100vh", position: "sticky", top: 0, display: "flex", flexDirection: "column",
        overflow: "hidden", flexShrink: 0
      }}>
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>📋 PM Prep</div>
          <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>Interview Dashboard</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {NAV.map((item, i) => {
            if ("section" in item) {
              return (
                <div key={i} style={{
                  fontSize: 10, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase",
                  letterSpacing: "0.08em", padding: "12px 16px 4px"
                }}>
                  {item.section}
                </div>
              );
            }
            const isActive = activePage === item.id;
            return (
              <div
                key={item.id}
                onClick={() => { onNavigate(item.id!); onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", cursor: "pointer", borderRadius: 8, margin: "1px 8px",
                  background: isActive ? "rgba(91,80,232,0.15)" : "transparent",
                  color: isActive ? "var(--accent)" : "var(--text2)",
                  fontSize: 13, fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s"
                }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </div>
            );
          })}
        </div>

        <div style={{ padding: 12, borderTop: "1px solid var(--border)" }}>
          <button
            onClick={handleSignOut}
            style={{
              width: "100%", background: "transparent", border: "1px solid var(--border)",
              borderRadius: 8, padding: "8px 12px", color: "var(--text2)", fontSize: 12,
              cursor: "pointer"
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}
