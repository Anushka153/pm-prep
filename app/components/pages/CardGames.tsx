"use client";
import { useState } from "react";
import { decks } from "@/data/decks";
import PageNotes from "@/app/components/PageNotes";

const DECK_NAMES = Object.keys(decks);

export default function CardGames() {
  const [currentDeck, setCurrentDeck] = useState(DECK_NAMES[0]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffled, setShuffled] = useState(() => [...(decks as any)[DECK_NAMES[0]]].sort(() => Math.random() - 0.5));

  const card = shuffled[index];
  const total = shuffled.length;

  const selectDeck = (name: string) => {
    setCurrentDeck(name);
    setShuffled([...(decks as any)[name]].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
  };

  const next = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => Math.min(i + 1, total - 1)), 100);
  };

  const prev = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => Math.max(i - 1, 0)), 100);
  };

  const reshuffle = () => {
    setShuffled([...(decks as any)[currentDeck]].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFlipped(false);
  };

  return (
    <div style={{ padding: "24px 28px", maxWidth: 700 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Card Games</h1>
        <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Flip cards to test your PM knowledge</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {DECK_NAMES.map((name) => (
          <button
            key={name}
            className={`filter-btn${currentDeck === name ? " active" : ""}`}
            onClick={() => selectDeck(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "var(--text2)", fontSize: 13 }}>Card {index + 1} of {total}</span>
        <button onClick={reshuffle} className="filter-btn">🔀 Reshuffle</button>
      </div>

      {card && (
        <div
          onClick={() => setFlipped(!flipped)}
          style={{
            background: "var(--surface)", border: "1px solid " + (flipped ? "var(--accent)" : "var(--border)"),
            borderRadius: 16, padding: 32, minHeight: 200, cursor: "pointer",
            display: "flex", flexDirection: "column", justifyContent: "center",
            transition: "border-color 0.2s", marginBottom: 20
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
            {flipped ? "Answer" : "Question — tap to reveal"}
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text)", whiteSpace: "pre-wrap" }}>
            {flipped ? card.a : card.q}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={prev} disabled={index === 0} className="filter-btn" style={{ flex: 1, opacity: index === 0 ? 0.4 : 1 }}>← Prev</button>
        <button onClick={next} disabled={index === total - 1} className="filter-btn" style={{ flex: 1, opacity: index === total - 1 ? 0.4 : 1 }}>Next →</button>
      </div>

      <PageNotes pageKey="cardgames" />
    </div>
  );
}
