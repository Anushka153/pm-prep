"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  pageKey: string;
  label?: string;
}

export default function PageNotes({ pageKey, label = "Section Notes" }: Props) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [noteId, setNoteId] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;
      const { data } = await supabase
        .from("page_notes")
        .select("id, note_text")
        .eq("page_key", pageKey)
        .eq("user_id", user.user.id)
        .single();
      if (data) {
        setText(data.note_text);
        setNoteId(data.id);
      }
    };
    load();
  }, [pageKey]);

  const handleChange = (val: string) => {
    setText(val);
    setStatus("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(val), 800);
  };

  const save = async (val: string) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;
    if (noteId) {
      await supabase.from("page_notes").update({ note_text: val, updated_at: new Date().toISOString() }).eq("id", noteId);
    } else {
      const { data } = await supabase.from("page_notes").insert({
        user_id: user.user.id, page_key: pageKey, note_text: val
      }).select("id").single();
      if (data) setNoteId(data.id);
    }
    setStatus("saved");
  };

  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          📝 {label}
        </h2>
        <span style={{ fontSize: 11, color: status === "saved" ? "var(--green)" : status === "saving" ? "var(--accent2)" : "transparent" }}>
          {status === "saved" ? "Saved" : status === "saving" ? "Saving..." : "."}
        </span>
      </div>
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder="Jot down anything — key reminders, things to revisit, personal observations..."
        rows={5}
        style={{
          width: "100%", background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "12px 16px", color: "var(--text)", fontSize: 13,
          resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.6
        }}
      />
    </div>
  );
}
