"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  pageKey: string;
  label?: string;
}

export default function PageNotes({ pageKey, label = "Section Notes" }: Props) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const storageKey = `page-notes:${pageKey}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setText(stored);
  }, [storageKey]);

  const handleChange = (val: string) => {
    setText(val);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(storageKey, val);
      setSaved(true);
    }, 800);
  };

  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          📝 {label}
        </h2>
        <span style={{ fontSize: 11, color: saved ? "var(--green)" : "var(--text2)" }}>
          {saved ? "Saved" : "Saving..."}
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
