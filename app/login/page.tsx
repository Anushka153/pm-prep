"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg)", padding: 20
    }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 16, padding: 40, width: "100%", maxWidth: 380
      }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚖️</div>
          <h1 style={{ fontSize: 28, fontWeight: 400, color: "var(--text)", fontFamily: "var(--font-cursive)" }}>Case Closed</h1>
          <p style={{ color: "var(--text2)", fontSize: 13, marginTop: 4 }}>Sign in to access your prep dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8,
              padding: "10px 14px", color: "var(--text)", fontSize: 14, outline: "none",
              width: "100%"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8,
              padding: "10px 14px", color: "var(--text)", fontSize: 14, outline: "none",
              width: "100%"
            }}
          />
          {error && (
            <div style={{ color: "#ef4444", fontSize: 13, background: "rgba(239,68,68,0.1)", padding: "8px 12px", borderRadius: 6 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "var(--accent)", border: "none", borderRadius: 8,
              padding: "11px 20px", color: "white", fontSize: 14, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
