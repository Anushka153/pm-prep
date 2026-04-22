"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import PageNotes from "@/app/components/PageNotes";

interface Question {
  id: number;
  question: string;
  category: string;
  company: string | null;
  type: string;
  difficulty: string | null;
  model_answer: string | null;
}

interface Note {
  id: number;
  question_id: number;
  note_text: string;
  updated_at: string;
}

const CATS = ["all", "design", "execution", "strategy", "estimation", "behavioral", "prioritization"];

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [notes, setNotes] = useState<Record<number, Note>>({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: qs }, { data: ns }] = await Promise.all([
        supabase.from("questions").select("*, model_answers(answer_text)").order("id"),
        supabase.from("notes").select("*"),
      ]);
      if (qs) setQuestions(qs.map((q: any) => ({ ...q, model_answer: q.model_answers?.[0]?.answer_text ?? null })));
      if (ns) {
        const map: Record<number, Note> = {};
        ns.forEach((n: Note) => { map[n.question_id] = n; });
        setNotes(map);
      }
      setLoading(false);
    };
    load();
  }, []);

  const openQuestion = (q: Question) => {
    setOpenId(q.id);
    setNoteText(notes[q.id]?.note_text ?? "");
  };

  const saveNote = useCallback(async (questionId: number) => {
    setSaving(true);
    const existing = notes[questionId];
    const { data: user } = await supabase.auth.getUser();
    if (existing) {
      await supabase.from("notes").update({ note_text: noteText, updated_at: new Date().toISOString() }).eq("id", existing.id);
      setNotes(prev => ({ ...prev, [questionId]: { ...existing, note_text: noteText } }));
    } else {
      const { data } = await supabase.from("notes").insert({
        question_id: questionId, note_text: noteText, user_id: user.user?.id
      }).select().single();
      if (data) setNotes(prev => ({ ...prev, [questionId]: data }));
    }
    setSaving(false);
  }, [noteText, notes]);

  const filtered = questions.filter((q) => {
    const matchCat = filter === "all" || q.type === filter || q.category === filter;
    const matchSearch = !search || q.question.toLowerCase().includes(search.toLowerCase()) || (q.company || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openQ = questions.find(q => q.id === openId);

  if (loading) return (
    <div style={{ padding: "24px 28px", color: "var(--text2)" }}>Loading questions...</div>
  );

  return (
    <div style={{ padding: "24px 28px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Question Bank</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>{questions.length} questions · click to view answer + add notes</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 14px", color: "var(--text)", fontSize: 13, outline: "none"
          }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {CATS.map((c) => (
          <button key={c} className={`filter-btn${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((q) => {
          const hasNote = !!notes[q.id];
          const isOpen = openId === q.id;
          return (
            <div key={q.id} style={{ background: "var(--surface)", border: "1px solid " + (isOpen ? "var(--accent)" : "var(--border)"), borderRadius: 10, overflow: "hidden" }}>
              <div
                onClick={() => isOpen ? setOpenId(null) : openQuestion(q)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer" }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span className={`tag tag-${q.type === "execution" ? "exec" : q.type}`}>{q.type}</span>
                    {q.company && <span style={{ fontSize: 11, color: "var(--text2)" }}>{q.company}</span>}
                    {hasNote && <span style={{ fontSize: 11, color: "var(--accent2)" }}>📝 Note</span>}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{q.question}</div>
                </div>
                <span style={{ color: "var(--text2)", fontSize: 16 }}>{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && openQ && (
                <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
                  {openQ.model_answer && (
                    <div className="feedback-box model">
                      <h4>Model Answer</h4>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)", whiteSpace: "pre-wrap" }}>{openQ.model_answer}</p>
                    </div>
                  )}

                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
                      📝 Your Notes
                    </div>
                    <textarea
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      placeholder="Add your notes, key takeaways, or things to remember..."
                      rows={4}
                      style={{
                        width: "100%", background: "var(--surface)", border: "1px solid var(--border)",
                        borderRadius: 6, padding: "8px 12px", color: "var(--text)", fontSize: 13,
                        resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.5
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                      <button
                        onClick={() => saveNote(q.id)}
                        disabled={saving}
                        style={{
                          background: "var(--accent)", border: "none", borderRadius: 6,
                          padding: "7px 18px", color: "white", fontSize: 13, fontWeight: 600,
                          cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1
                        }}
                      >
                        {saving ? "Saving..." : "Save Note"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ color: "var(--text2)", padding: 24, textAlign: "center", fontSize: 13 }}>
            No questions found. Add some in Supabase!
          </div>
        )}
      </div>

      <PageNotes pageKey="questionbank" />
    </div>
  );
}
