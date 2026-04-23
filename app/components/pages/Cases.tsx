'use client';
import PageNotes from '@/app/components/PageNotes';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'amazon', label: 'Amazon' },
  { key: 'design', label: 'Design' },
  { key: 'execution', label: 'Execution' },
  { key: 'strategy', label: 'Strategy' },
  { key: '9+', label: 'Score 9+' },
  { key: 'prioritization', label: 'Prioritization' },
  { key: 'b2b', label: 'B2B' },
  { key: 'drill', label: 'Gap Drills' },
  { key: 'estimation', label: 'Estimation' },
  { key: 'practice', label: 'Practice' },
  { key: 'scored', label: 'Scored' },
];

function getTagClass(type: string) {
  const map: Record<string, string> = {
    prioritization: 'tag-prioritization',
    b2b: 'tag-b2b',
    design: 'tag-design',
    strategy: 'tag-strategy',
    execution: 'tag-exec',
    estimation: 'tag-estimation',
    google: 'tag-google',
    amazon: 'tag-amazon',
    drill: 'tag-drill',
  };
  return map[type] || 'tag-design';
}

export default function Cases() {
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState<number | null>(null);
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('case_logs')
      .select('*')
      .order('id')
      .then(({ data }) => {
        if (data) setCases(data);
      });
  }, []);

  const filtered = cases.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'amazon') return c.type.includes('amazon');
    if (filter === 'design') return c.type.includes('design');
    if (filter === 'execution') return c.type.includes('execution');
    if (filter === 'strategy') return c.type.includes('strategy');
    if (filter === '9+') return c.score >= 9;
    if (filter === 'prioritization') return c.type.includes('prioritization');
    if (filter === 'b2b') return c.type.includes('b2b');
    if (filter === 'drill') return !!c.drill;
    if (filter === 'estimation') return c.type.includes('estimation');
    if (filter === 'practice') return c.practice === true;
    if (filter === 'scored') return c.score !== null && c.score !== undefined;
    return true;
  });

  return (
    <div style={{ padding: '24px 28px', maxWidth: 900 }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'var(--bg)',
          paddingTop: 8,
          paddingBottom: 16,
          marginBottom: 8,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 400,
              fontFamily: 'var(--font-cursive)',
              letterSpacing: '0.01em',
            }}
          >
            Case Closed
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 3 }}>
            All your PM interview cases with feedback
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((c: any) => {
          const isPractice = c.practice === true;
          const scoreClass = isPractice
            ? 'score-practice'
            : c.score >= 9
              ? 'score-high'
              : c.score >= 8
                ? 'score-mid'
                : 'score-low';
          const scoreBadge = isPractice ? 'PRAC' : (c.score ?? '—');
          const typeTag = c.type[0];
          const isOpen = openId === c.id;

          return (
            <div
              key={c.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() => setOpenId(isOpen ? null : c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  cursor: 'pointer',
                }}
              >
                <div className={`score ${scoreClass}`}>{scoreBadge}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>
                      {c.company}
                    </span>
                    <span className={`tag ${getTagClass(typeTag)}`}>
                      {typeTag}
                    </span>
                    {c.drill && (
                      <span className="drill-label">🎯 {c.drill}</span>
                    )}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      color: 'var(--text)',
                      marginTop: 2,
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      color: 'var(--text2)',
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    {c.question}
                  </div>
                </div>
                <div
                  style={{
                    color: 'var(--text2)',
                    fontSize: 18,
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                  }}
                >
                  ▾
                </div>
              </div>

              {isOpen && (
                <div
                  style={{
                    padding: '0 18px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 12,
                    }}
                  >
                    <div className="feedback-box nailed">
                      <h4>
                        {isPractice ? '🎯 What to Nail' : '✅ What You Nailed'}
                      </h4>
                      <ul>
                        {(c.nailed || []).map((n: string, i: number) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="feedback-box missed">
                      <h4>
                        {isPractice ? '⚠️ Trap to Avoid' : '❌ What You Missed'}
                      </h4>
                      <ul>
                        {(c.missed || []).map((m: string, i: number) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {(c.model || []).length > 0 && (
                    <div className="feedback-box model">
                      <h4>
                        {isPractice ? '📋 Model Approach' : 'Model Answer'}
                      </h4>
                      <ul>
                        {c.model.map((m: string, i: number) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(c.keywords || []).length > 0 && (
                    <div className="feedback-box keywords">
                      <h4>🔑 Keywords to Use</h4>
                      <div className="keywords-wrap">
                        {c.keywords.map((k: string, i: number) => (
                          <span key={i} className="kw-tag">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <PageNotes pageKey="cases" />
    </div>
  );
}
