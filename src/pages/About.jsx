import { useEffect, useRef, useState } from "react";

const SKILLS_ICONS = {
  Languages:   { icons: "java,c,python,js,html,css" },
  Frameworks:  { icons: "spring,flask,fastapi,nodejs,express,react,tailwind" },
  Databases:   { icons: "mysql,mongodb" },
  Tools:       { icons: "git,github,postman,vscode,idea,eclipse" },
};

const ACHIEVEMENTS = [
  {
    metric: "168+",
    label: "LeetCode Problems",
    detail: "Arrays, trees, graphs, dynamic programming",
  },
  {
    metric: "Java",
    label: "HackerRank Certified",
    detail: "Core Java & object-oriented programming",
  },
  {
    metric: "Cisco",
    label: "Python Essentials",
    detail: "Certified foundational Python knowledge",
  },
  {
    metric: "Live",
    label: "Production Deployment",
    detail: "Real satellite data via Google Earth Engine",
  },
];

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/praveen-devarakota/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/praveen-devarakota",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/praveen2006/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    label: "dsrisaipraveen@gmail.com",
    href: "mailto:dsrisaipraveen@gmail.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const About = () => {
  return (
    <section id="about" className="about-page">
      <div className="about-bg-glow" />

      <div className="about-inner">

        {/* ── Header ── */}
        <FadeUp>
          <p className="about-eyebrow">// Background & Contact</p>
          <h2 className="about-title">About <em>Me.</em></h2>
          <p className="about-lead">
            Backend-focused developer building reliable APIs and full-stack systems.
            Currently pursuing B.Tech in Information Technology at{" "}
            <span className="about-highlight">VR Siddhartha Engineering College</span>{" "}
            (2023–2027), with a consistent DSA practice and a growing interest in system design.
          </p>
        </FadeUp>

        {/* ── Two-col layout ── */}
        <div className="about-grid">

          {/* Left — Bio + Links */}
          <div className="about-left">
            <FadeUp delay={80}>
              <div className="about-card about-bio-card">
                <div className="about-card-label">// Overview</div>
                <p className="about-bio-text">
                  I enjoy the full lifecycle of building software — from designing
                  clean API contracts and normalised schemas to deploying production
                  systems that handle real data. My primary stack is{" "}
                  <strong>Java + Spring Boot</strong> for structured backends, and I
                  reach for <strong>Python (Flask / FastAPI)</strong> or{" "}
                  <strong>Node.js (Express)</strong> when the problem calls for it.
                </p>
                <p className="about-bio-text" style={{ marginBottom: 0 }}>
                  Outside engineering I follow Telugu cinema closely, play cricket,
                  and work through DSA problems daily — habits that keep me sharp,
                  patient, and competitive in equal measure.
                </p>
              </div>
            </FadeUp>

            {/* Links */}
            <FadeUp delay={140}>
              <div className="about-card">
                <div className="about-card-label">// Connect</div>
                <div className="about-links">
                  {LINKS.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="about-link-btn"
                    >
                      <span className="about-link-icon">{l.icon}</span>
                      {l.label}
                      <span className="about-link-arrow">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right — Skills + Achievements */}
          <div className="about-right">

            {/* Tech stack */}
            <FadeUp delay={160}>
              <div className="about-card">
                <div className="about-card-label">// Tech Stack</div>
                <div className="about-stack">
                  {Object.entries(SKILLS_ICONS).map(([cat, { icons }]) => (
                    <div key={cat} className="about-stack-row">
                      <span className="about-stack-cat">{cat}</span>
                      <img
                        src={`https://skillicons.dev/icons?i=${icons}&theme=light`}
                        alt={cat}
                        className="about-stack-icons"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Achievements */}
            <FadeUp delay={220}>
              <div className="about-card">
                <div className="about-card-label">// Achievements</div>
                <div className="about-achievements">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className="about-achievement-row">
                      <div className="about-achievement-metric">{a.metric}</div>
                      <div className="about-achievement-info">
                        <div className="about-achievement-label">{a.label}</div>
                        <div className="about-achievement-detail">{a.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

          </div>
        </div>

        {/* ── Footer strip ── */}
        <FadeUp delay={260}>
          <div className="about-footer-strip">
            <div className="about-footer-left">
              <div className="about-avail-dot" />
              <span className="about-avail-text">Open to backend internships & collaborations</span>
            </div>
            <a href="mailto:dsrisaipraveen@gmail.com" className="about-cta">
              Get in touch
              <span className="about-cta-arrow">↗</span>
            </a>
          </div>
        </FadeUp>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

        .about-page {
          background: #f5f2ec;
          padding: 110px 24px 130px;
          color: #1a1812;
          position: relative;
          overflow: hidden;
        }
        .about-bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 40% at 8% 20%,  rgba(184,149,42,0.07) 0%, transparent 68%),
            radial-gradient(ellipse 45% 35% at 90% 78%, rgba(184,149,42,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        .about-inner {
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 52px;
        }

        .about-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(26,24,18,0.38);
          letter-spacing: 0.07em;
          margin: 0 0 12px;
        }
        .about-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #1a1812;
          line-height: 1.1;
          margin: 0 0 18px;
        }
        .about-title em { color: #b8952a; font-style: italic; }
        .about-lead {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(26,24,18,0.55);
          line-height: 1.72;
          max-width: 620px;
          margin: 0;
        }
        .about-highlight {
          color: #b8952a;
          font-weight: 600;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          align-items: start;
        }
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr; }
        }

        .about-left,
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .about-card {
          background: #ffffff;
          border: 1px solid rgba(26,24,18,0.08);
          border-radius: 20px;
          padding: 24px 24px 22px;
          transition: border-color 0.28s ease, box-shadow 0.28s ease;
          box-shadow: 0 2px 10px rgba(26,24,18,0.04);
          position: relative;
          overflow: hidden;
        }
        .about-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(184,149,42,0.04) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .about-card:hover::after { opacity: 1; }
        .about-card:hover {
          border-color: rgba(184,149,42,0.26);
          box-shadow: 0 10px 36px rgba(26,24,18,0.07), 0 0 0 1px rgba(184,149,42,0.1);
        }
        .about-card-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(26,24,18,0.32);
          margin-bottom: 16px;
        }

        .about-bio-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: rgba(26,24,18,0.62);
          line-height: 1.72;
          margin: 0 0 14px;
        }
        .about-bio-text strong {
          color: #1a1812;
          font-weight: 600;
        }

        .about-links {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .about-link-btn {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          color: #1a1812;
          text-decoration: none;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.18s ease;
        }
        .about-link-btn:hover {
          background: rgba(184,149,42,0.07);
          border-color: rgba(184,149,42,0.22);
          color: #b8952a;
          transform: translateX(3px);
        }
        .about-link-icon {
          width: 28px; height: 28px;
          border-radius: 7px;
          background: rgba(26,24,18,0.05);
          border: 1px solid rgba(26,24,18,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .about-link-btn:hover .about-link-icon {
          background: rgba(184,149,42,0.1);
          border-color: rgba(184,149,42,0.3);
        }
        .about-link-arrow {
          margin-left: auto;
          font-size: 11px;
          opacity: 0.35;
          transition: opacity 0.2s, transform 0.2s;
        }
        .about-link-btn:hover .about-link-arrow {
          opacity: 0.8;
          transform: translate(2px, -2px);
        }

        .about-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .about-stack-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .about-stack-cat {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(26,24,18,0.35);
          min-width: 72px;
          flex-shrink: 0;
        }
        .about-stack-icons {
          height: 28px;
          display: block;
        }

        .about-achievements {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .about-achievement-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(26,24,18,0.05);
        }
        .about-achievement-row:last-child { border-bottom: none; }
        .about-achievement-metric {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: #b8952a;
          min-width: 52px;
          flex-shrink: 0;
          line-height: 1;
        }
        .about-achievement-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a1812;
          margin-bottom: 2px;
        }
        .about-achievement-detail {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          color: rgba(26,24,18,0.38);
          letter-spacing: 0.03em;
        }

        .about-footer-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 20px 28px;
          background: #ffffff;
          border: 1px solid rgba(26,24,18,0.08);
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(26,24,18,0.04);
        }
        .about-footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .about-avail-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.15);
          animation: avail-pulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes avail-pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
          50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0.08); }
        }
        .about-avail-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: rgba(26,24,18,0.55);
        }
        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 9px 20px;
          border-radius: 10px;
          border: 1px solid rgba(184,149,42,0.35);
          color: #b8952a;
          text-decoration: none;
          background: transparent;
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease,
                      box-shadow 0.22s ease, transform 0.18s ease;
        }
        .about-cta:hover {
          background: #b8952a;
          color: #fff;
          border-color: #b8952a;
          box-shadow: 0 4px 18px rgba(184,149,42,0.3);
          transform: translateY(-1px);
        }
        .about-cta-arrow {
          font-size: 12px;
          transition: transform 0.2s ease;
        }
        .about-cta:hover .about-cta-arrow { transform: translate(2px, -2px); }

        @media (max-width: 640px) {
          .about-page { padding: 80px 16px 90px; }
          .about-footer-strip { padding: 16px 18px; }
        }
      `}</style>
    </section>
  );
};

export default About;