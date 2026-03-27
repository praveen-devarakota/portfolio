import { useState, useEffect, useRef } from "react";

const LEETCODE_USERNAME = "praveen2006";

const STATS = {
  totalSolved: 168,
  easySolved: 68,
  mediumSolved: 90,
  hardSolved: 10,
  ranking: "—",
  acceptanceRate: "—",
  lastUpdated: "September 2025",
};

const TOTAL_POOL = { Easy: 930, Medium: 2022, Hard: 913 };

const DSA_TECHNIQUES = [
  "Sliding Window", "Two Pointers", "Binary Search",
  "HashMap", "Prefix Sum", "Greedy",
  "Recursion", "Arrays", "Strings", "Stacks & Queues",
  "Linked Lists", "Heaps"
];

/* ─── Animated Counter ─── */
function Counter({ to, duration = 1400 }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * to));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, duration]);
  return <>{val}</>;
}

/* ─── Donut SVG ─── */
function Donut({ easy, medium, hard }) {
  const total = easy + medium + hard;
  const R = 70, SW = 10;
  const circ = 2 * Math.PI * R;
  const gap = 0.018 * circ;

  const segs = [
    { v: easy,   c: "#16a34a" },
    { v: medium, c: "#d97706" },
    { v: hard,   c: "#dc2626" },
  ];

  let cursor = 0;
  const arcs = segs.map((s) => {
    const len = (s.v / total) * circ - gap;
    const offset = -cursor;
    cursor += (s.v / total) * circ;
    return { ...s, len, offset };
  });

  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      <circle cx={80} cy={80} r={R} fill="none" stroke="#f1f5f9" strokeWidth={SW} />
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx={80} cy={80} r={R}
          fill="none"
          stroke={a.c}
          strokeWidth={SW}
          strokeDasharray={`${Math.max(a.len, 0)} ${circ}`}
          strokeDashoffset={a.offset}
          strokeLinecap="butt"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "80px 80px",
            transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)",
          }}
        />
      ))}
      <text x={80} y={74} textAnchor="middle" fontSize={26} fontWeight={800}
        fontFamily="'Clash Display', sans-serif" fill="#0f172a">
        {total}
      </text>
      <text x={80} y={92} textAnchor="middle" fontSize={11} fontWeight={500}
        fontFamily="'DM Mono', monospace" fill="#94a3b8" letterSpacing="0.08em">
        SOLVED
      </text>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function Cp() {
  const diffs = [
    { label: "Easy",   solved: STATS.easySolved,   total: TOTAL_POOL.Easy,   color: "#16a34a", track: "#dcfce7", pill: "#f0fdf4", border: "#bbf7d0" },
    { label: "Medium", solved: STATS.mediumSolved, total: TOTAL_POOL.Medium, color: "#d97706", track: "#fef3c7", pill: "#fffbeb", border: "#fde68a" },
    { label: "Hard",   solved: STATS.hardSolved,   total: TOTAL_POOL.Hard,   color: "#dc2626", track: "#fee2e2", pill: "#fef2f2", border: "#fecaca" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

        :root {
          --ink: #0f172a;
          --muted: #64748b;
          --faint: #94a3b8;
          --border: #e2e8f0;
          --surface: #ffffff;
          --bg: #f8fafc;
          --amber: #d97706;
          --amber-lt: #fef3c7;
        }

        .cp-wrap {
          font-family: 'Clash Display', 'DM Serif Display', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          padding: 72px 24px 96px;
          color: var(--ink);
        }

        .cp-inner { max-width: 760px; margin: 0 auto; }

        /* ── HEADER ── */
        .cp-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .cp-eyebrow-line {
          flex: 1;
          max-width: 40px;
          height: 1.5px;
          background: var(--amber);
        }
        .cp-eyebrow-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--amber);
          font-weight: 500;
        }

        .cp-title {
          font-size: clamp(2.6rem, 6vw, 4.2rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin: 0 0 10px;
        }
        .cp-title em {
          font-style: italic;
          font-family: 'DM Serif Display', serif;
          color: var(--amber);
        }

        .cp-desc {
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          color: var(--faint);
          letter-spacing: 0.04em;
          margin-bottom: 52px;
        }

        /* ── CARD ── */
        .cp-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 1px 2px rgba(0,0,0,0.04),
            0 4px 16px rgba(0,0,0,0.04),
            0 0 0 0px var(--amber);
          transition: box-shadow 0.3s ease;
        }
        .cp-card:hover {
          box-shadow:
            0 1px 2px rgba(0,0,0,0.04),
            0 8px 32px rgba(0,0,0,0.07),
            0 0 0 3px var(--amber-lt);
        }

        /* ── TOP STRIP ── */
        .cp-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          padding: 22px 28px;
          border-bottom: 1.5px solid var(--border);
          background: #fafafa;
        }

        .cp-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cp-brand-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: var(--amber-lt);
          border: 1.5px solid #fde68a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .cp-brand-name {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .cp-brand-handle {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--faint);
          letter-spacing: 0.06em;
        }

        .cp-profile-link {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          background: var(--surface);
          border: 1.5px solid var(--border);
          padding: 8px 16px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.18s ease;
        }
        .cp-profile-link:hover {
          background: var(--ink);
          color: #fff;
          border-color: var(--ink);
        }
        .cp-profile-link svg { transition: transform 0.18s ease; }
        .cp-profile-link:hover svg { transform: translate(2px, -2px); }

        /* ── CENTER SECTION ── */
        .cp-body {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 36px;
          align-items: center;
          padding: 36px 28px;
          border-bottom: 1.5px solid var(--border);
        }
        @media (max-width: 560px) {
          .cp-body { grid-template-columns: 1fr; justify-items: center; }
        }

        /* ── DIFF ROWS ── */
        .diff-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }

        .diff-item {
          padding: 14px 16px;
          border-radius: 12px;
          border: 1.5px solid;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          cursor: default;
        }
        .diff-item:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .diff-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 9px;
        }
        .diff-lbl {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .diff-count {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
        }
        .diff-count-dim {
          font-family: 'DM Mono', monospace;
          color: #cbd5e1;
          font-size: 12px;
        }

        .diff-track {
          height: 5px;
          border-radius: 100px;
          overflow: hidden;
        }
        .diff-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 1.3s cubic-bezier(.4,0,.2,1);
        }

        /* ── TECHNIQUES ── */
        .cp-tags {
          padding: 24px 28px 28px;
          border-bottom: 1.5px solid var(--border);
        }
        .cp-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--faint);
          margin-bottom: 14px;
        }
        .cp-tag-grid { display: flex; flex-wrap: wrap; gap: 7px; }

        .cp-tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          padding: 6px 13px;
          border-radius: 7px;
          background: #f8fafc;
          border: 1.5px solid var(--border);
          color: var(--ink);
          letter-spacing: 0.03em;
          transition: all 0.15s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .cp-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
          z-index: 0;
        }
        .cp-tag:hover::before { transform: scaleX(1); }
        .cp-tag span { position: relative; z-index: 1; }
        .cp-tag:hover span { color: #fff; }

        /* ── FOOTER META ── */
        .cp-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 16px 28px;
          background: #fafafa;
        }

        .cp-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--muted);
        }
        .cp-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 2px #dcfce7;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 2px #dcfce7; }
          50%       { box-shadow: 0 0 0 4px #dcfce7; }
        }

        .cp-updated {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--faint);
          letter-spacing: 0.04em;
        }

        /* ── STAT SUMMARY PILLS ── */
        .cp-totals {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .cp-total-pill {
          padding: 10px 18px;
          border: 1.5px solid var(--border);
          border-radius: 100px;
          background: var(--surface);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          transition: border-color 0.15s, background 0.15s;
        }
        .cp-total-pill:hover {
          border-color: var(--amber);
          background: var(--amber-lt);
        }
        .cp-total-pill-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .cp-total-pill-sub {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          color: var(--faint);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="cp-wrap">
        <div className="cp-inner">

          {/* ── Header ── */}
          <div className="cp-eyebrow">
            <div className="cp-eyebrow-line" />
            <span className="cp-eyebrow-text">Competitive Programming</span>
          </div>

          <h2 className="cp-title">
            Problem<br /><em>Solving.</em>
          </h2>
          <p className="cp-desc">Data Structures &amp; Algorithms · LeetCode Profile</p>

          {/* ── Summary Pills ── */}
          <div className="cp-totals">
            {[
              { dot: "#16a34a", val: STATS.easySolved,   lbl: "Easy" },
              { dot: "#d97706", val: STATS.mediumSolved, lbl: "Medium" },
              { dot: "#dc2626", val: STATS.hardSolved,   lbl: "Hard" },
            ].map((p) => (
              <div className="cp-total-pill" key={p.lbl}>
                <div className="cp-total-pill-dot" style={{ background: p.dot }} />
                <Counter to={p.val} />
                <span className="cp-total-pill-sub">{p.lbl}</span>
              </div>
            ))}
          </div>

          {/* ── Card ── */}
          <div className="cp-card">

            {/* Strip */}
            <div className="cp-strip">
              <div className="cp-brand">
                <div className="cp-brand-icon">🟡</div>
                <div>
                  <div className="cp-brand-name">LeetCode</div>
                  <div className="cp-brand-handle">@{LEETCODE_USERNAME}</div>
                </div>
              </div>

              <a
                href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="cp-profile-link"
              >
                View Profile
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 9.5L9.5 1.5M9.5 1.5H4.5M9.5 1.5V6.5"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Ring + Diff */}
            <div className="cp-body">
              <Donut
                easy={STATS.easySolved}
                medium={STATS.mediumSolved}
                hard={STATS.hardSolved}
              />

              <div className="diff-list">
                {[
                  { label: "Easy",   solved: STATS.easySolved,   total: TOTAL_POOL.Easy,   color: "#16a34a", track: "#dcfce7", pill: "#f0fdf4", border: "#bbf7d0" },
                  { label: "Medium", solved: STATS.mediumSolved, total: TOTAL_POOL.Medium, color: "#d97706", track: "#fef3c7", pill: "#fffbeb", border: "#fde68a" },
                  { label: "Hard",   solved: STATS.hardSolved,   total: TOTAL_POOL.Hard,   color: "#dc2626", track: "#fee2e2", pill: "#fef2f2", border: "#fecaca" },
                ].map((d) => (
                  <div key={d.label} className="diff-item"
                    style={{ background: d.pill, borderColor: d.border }}>
                    <div className="diff-head">
                      <span className="diff-lbl" style={{ color: d.color }}>{d.label}</span>
                      <span>
                        <span className="diff-count" style={{ color: d.color }}>
                          <Counter to={d.solved} />
                        </span>
                        <span className="diff-count-dim"> / {d.total}</span>
                      </span>
                    </div>
                    <div className="diff-track" style={{ background: d.track }}>
                      <div className="diff-fill"
                        style={{ width: `${(d.solved / d.total) * 100}%`, background: d.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div className="cp-tags">
              <div className="cp-section-label">Techniques Practiced</div>
              <div className="cp-tag-grid">
                {DSA_TECHNIQUES.map((t) => (
                  <div className="cp-tag" key={t}>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="cp-footer">
              <div className="cp-status">
                <div className="cp-status-dot" />
                Active
              </div>
              <div className="cp-updated">Updated {STATS.lastUpdated}</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}