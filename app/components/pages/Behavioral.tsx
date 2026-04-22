"use client";
import { useState, useEffect } from "react";
import { behavioralStories } from "@/data/behavioral";
import PageNotes from "@/app/components/PageNotes";
import { supabase } from "@/lib/supabase";

export default function Behavioral() {
  const [open, setOpen] = useState<number | null>(null);
  const [storyNotes, setStoryNotes] = useState<Record<number, { id: number; text: string }>>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;
      setUserId(user.user.id);
      const { data } = await supabase
        .from("page_notes")
        .select("id, page_key, note_text")
        .eq("user_id", user.user.id)
        .like("page_key", "behavioral-story-%");
      if (data) {
        const map: Record<number, { id: number; text: string }> = {};
        data.forEach((n: any) => {
          const idx = parseInt(n.page_key.replace("behavioral-story-", ""), 10);
          map[idx] = { id: n.id, text: n.note_text };
        });
        setStoryNotes(map);
      }
    };
    load();
  }, []);

  const saveStoryNote = async (i: number, val: string) => {
    setStoryNotes(prev => ({ ...prev, [i]: { ...prev[i], text: val } }));
    if (!userId) return;
    const existing = storyNotes[i];
    if (existing?.id) {
      await supabase.from("page_notes").update({ note_text: val, updated_at: new Date().toISOString() }).eq("id", existing.id);
    } else {
      const { data } = await supabase.from("page_notes").insert({
        user_id: userId, page_key: `behavioral-story-${i}`, note_text: val
      }).select("id").single();
      if (data) setStoryNotes(prev => ({ ...prev, [i]: { id: data.id, text: val } }));
    }
  };

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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{s.title || s.q}</span>
                  {storyNotes[i]?.text && <span style={{ fontSize: 11, color: "var(--accent2)" }}>📝</span>}
                </div>
                {s.tags && <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>{s.tags.map((t: string, ti: number) => <span key={ti} className="kw-tag">{t}</span>)}</div>}
              </div>
              <span style={{ color: "var(--text2)" }}>{open === i ? "▲" : "▼"}</span>
            </div>
            {open === i && (
              <div style={{ padding: "0 18px 18px" }}>
                {s.situation && <div style={{ marginBottom: 10 }}><strong style={{ color: "var(--accent2)" }}>S:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.situation}</span></div>}
                {s.task && <div style={{ marginBottom: 10 }}><strong style={{ color: "var(--accent2)" }}>T:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.task}</span></div>}
                {s.action && <div style={{ marginBottom: 10 }}><strong style={{ color: "var(--accent2)" }}>A:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.action}</span></div>}
                {s.result && <div style={{ marginBottom: 14 }}><strong style={{ color: "var(--accent2)" }}>R:</strong> <span style={{ fontSize: 13, color: "var(--text)" }}>{s.result}</span></div>}
                {s.a && <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 14 }}>{s.a}</div>}

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>📝 Story Notes</div>
                  <textarea
                    value={storyNotes[i]?.text || ""}
                    onChange={e => saveStoryNote(i, e.target.value)}
                    placeholder="What to add, improve, or remember about this story..."
                    rows={3}
                    style={{
                      width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
                      borderRadius: 6, padding: "8px 12px", color: "var(--text)", fontSize: 13,
                      resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.5
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <PageNotes pageKey="behavioral" label="General Behavioral Notes" />
    </div>
  );
}
