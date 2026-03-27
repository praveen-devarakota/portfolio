import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const PROJECTS = [
  {
    title: "School Management System",
    type: "Backend • Spring Boot",
    desc: "Backend system for managing students, teachers, classes, and attendance with JWT authentication and role-based access.",
    tech: ["Spring Boot", "MySQL", "JWT", "REST APIs"],
    github: "https://github.com/praveen-devarakota/SchoolManagementSystem-backend",
    live: null,
  },
  {
    title: "Developer Portfolio",
    type: "Frontend • React",
    desc: "Responsive portfolio website showcasing projects, skills, and achievements with modern UI.",
    tech: ["React", "JavaScript", "HTML", "Tailwind CSS"],
    github: "https://github.com/praveen-devarakota/portfolio",
    live: null,
  },
  {
    title: "Satellite Indices Viewer",
    type: "Geospatial Web App",
    desc: "Interactive platform to visualize NDVI, NDWI, NDMI using Google Earth Engine datasets.",
    tech: ["React", "GEE", "Geospatial", "Tailwind CSS", "Flask"],
    github: "https://github.com/praveen-devarakota/GEE-Indexing-backend",
    live: "https://satellite-indices-viewer.vercel.app",
  },
  {
    title: "Tourix",
    type: "Full Stack • MERN",
    desc: "Tourism platform to explore destinations with scalable backend and REST APIs.",
    tech: ["MongoDB", "Express", "React", "Node"],
    github: "https://github.com/praveen-devarakota/Tourix-Backend",
    live: null,
  },
  {
    title: "StayFinder",
    type: "Full Stack • MERN",
    desc: "Accommodation booking platform with authentication, listings, and booking management.",
    tech: ["MongoDB", "Express", "React", "Node"],
    github: "https://github.com/praveen-devarakota/StayFinder",
    live: "https://stayfinder-frontend-v5gf.onrender.com/",
  },
  {
    title: "E-Commerce Platform",
    type: "Full Stack Application",
    desc: "Complete e-commerce system with admin dashboard, user frontend, and backend APIs including product management, cart, orders, and authentication.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    github: {
      Frontend: "https://github.com/praveen-devarakota/Ecommerce-frontend",
      Backend: "https://github.com/praveen-devarakota/Ecommerce-backend",
      Admin: "https://github.com/praveen-devarakota/Ecommerce-admin",
    },
    live:"https://ecommerce-frontend-eta-fawn.vercel.app/"
  },
];

const TYPE_COLORS = {
  "Backend":    { bg: "rgba(138,110,66,0.10)",  text: "#7a5c1e", border: "rgba(138,110,66,0.22)" },
  "Frontend":   { bg: "rgba(184,149,42,0.10)",  text: "#b8952a", border: "rgba(184,149,42,0.28)" },
  "Geospatial": { bg: "rgba(76,120,86,0.09)",   text: "#3d7a50", border: "rgba(76,120,86,0.22)"  },
  "Full Stack": { bg: "rgba(130,95,160,0.08)",  text: "#7a5a96", border: "rgba(130,95,160,0.20)" },
};

function getTypeColor(type) {
  for (const key of Object.keys(TYPE_COLORS)) {
    if (type.includes(key)) return TYPE_COLORS[key];
  }
  return { bg: "rgba(26,24,18,0.07)", text: "#5a5040", border: "rgba(26,24,18,0.15)" };
}

function LinkButton({ label, href }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((o) => !o);
  };

  // Plain string → direct link
  if (typeof href === "string") {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="proj-btn">
        {label}
        <span className="proj-btn-arrow">↗</span>
      </a>
    );
  }

  // Object with only 1 entry → direct link (no dropdown)
  const entries = Object.entries(href);
  if (entries.length === 1) {
    return (
      <a href={entries[0][1]} target="_blank" rel="noreferrer" className="proj-btn">
        {label} · {entries[0][0]}
        <span className="proj-btn-arrow">↗</span>
      </a>
    );
  }

  // Object with multiple entries → dropdown
  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`proj-btn ${open ? "proj-btn-open" : ""}`}
        onMouseDown={handleMouseDown}
      >
        {label}
        <span
          className="proj-btn-chevron"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >▾</span>
      </button>

      {open && (
        <DropdownPortal
          entries={entries}
          anchorRef={btnRef}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function DropdownPortal({ entries, anchorRef, onClose }) {
  const menuRef = useRef(null);

  // Calculate position from the anchor button
  const rect = anchorRef.current?.getBoundingClientRect() ?? { bottom: 0, left: 0 };
  const style = {
    position: "fixed",
    top: rect.bottom + 8,
    left: rect.left,
    zIndex: 9999,
  };

  // Close when clicking anywhere outside the menu
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div ref={menuRef} className="proj-dropdown proj-dropdown-open" style={style}>
      {entries.map(([key, link]) => (
        <a
          key={key}
          href={link}
          target="_blank"
          rel="noreferrer"
          className="proj-dropdown-item"
          onClick={onClose}
        >
          <span className="proj-dropdown-dot" />
          {key}
          <span style={{ marginLeft: "auto", opacity: 0.45, fontSize: "10px" }}>↗</span>
        </a>
      ))}
    </div>,
    document.body
  );
}

function ProjectCard({ p, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const typeColor = getTypeColor(p.type);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`proj-card ${visible ? "proj-card-visible" : ""}`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      {/* Card top */}
      <div className="proj-card-top">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="proj-name">{p.title}</h3>
          <span
            className="proj-type-badge"
            style={{
              background: typeColor.bg,
              color: typeColor.text,
              border: `1px solid ${typeColor.border}`,
            }}
          >
            {p.type}
          </span>
        </div>
        <div className="proj-card-number">0{index + 1}</div>
      </div>

      {/* Animated divider */}
      <div className="proj-divider" />

      {/* Description */}
      <p className="proj-text">{p.desc}</p>

      {/* Tech stack */}
      <div className="proj-tech">
        {p.tech.map((t, idx) => (
          <span key={idx} className="proj-tech-tag">{t}</span>
        ))}
      </div>

      {/* Links */}
      <div className="proj-links">
        {p.github && <LinkButton label="GitHub" href={p.github} />}
        {p.live   && <LinkButton label="Live"   href={p.live}   />}
      </div>
    </div>
  );
}

const Projects = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="proj-page">
      <div className="proj-bg-glow" />

      <div className="proj-inner">
        {/* Header */}
        <div
          ref={headerRef}
          className={`proj-head ${headerVisible ? "proj-head-visible" : ""}`}
        >
          <p className="proj-eyebrow">// Real-world applications & full stack builds</p>
          <h2 className="proj-title">Selected <em>Projects.</em></h2>
          <p className="proj-subtitle">
            A collection of things I've built — from lean backends to full-stack systems.
          </p>
        </div>

        {/* Grid */}
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} p={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

        /* ─── Page ─── */
        .proj-page {
          background: #f5f2ec;
          padding: 110px 24px 130px;
          color: #1a1812;
          position: relative;
          overflow: hidden;
        }
        .proj-bg-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 12% 18%, rgba(184,149,42,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 35% at 88% 80%, rgba(184,149,42,0.05) 0%, transparent 65%);
          pointer-events: none;
        }
        .proj-inner {
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ─── Header ─── */
        .proj-head {
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .proj-head-visible { opacity: 1; transform: translateY(0); }

        .proj-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(26,24,18,0.38);
          letter-spacing: 0.07em;
          margin: 0 0 12px;
        }
        .proj-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #1a1812;
          line-height: 1.1;
          margin: 0 0 14px;
        }
        .proj-title em { color: #b8952a; font-style: italic; }
        .proj-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: rgba(26,24,18,0.48);
          max-width: 400px;
          line-height: 1.6;
          margin: 0;
        }

        /* ─── Grid ─── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 22px;
        }

        /* ─── Card ─── */
        .proj-card {
          background: #ffffff;
          border: 1px solid rgba(26,24,18,0.08);
          border-radius: 20px;
          padding: 26px 26px 22px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: visible;
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.55s cubic-bezier(0.4,0,0.2,1),
            transform 0.55s cubic-bezier(0.4,0,0.2,1),
            border-color 0.28s ease,
            box-shadow 0.28s ease;
          box-shadow: 0 2px 10px rgba(26,24,18,0.05);
        }
        /* Subtle shimmer layer on hover */
        .proj-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(184,149,42,0.05) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .proj-card:hover::after { opacity: 1; }
        .proj-card-visible { opacity: 1; transform: translateY(0); }
        .proj-card:hover {
          border-color: rgba(184,149,42,0.28);
          transform: translateY(-5px);
          box-shadow:
            0 14px 44px rgba(26,24,18,0.08),
            0 0 0 1px rgba(184,149,42,0.12);
        }

        /* ─── Card top ─── */
        .proj-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 16px;
        }
        .proj-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 16.5px;
          font-weight: 700;
          color: #1a1812;
          margin: 0 0 8px;
          line-height: 1.25;
        }
        .proj-type-badge {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 20px;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .proj-card-number {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: rgba(184,149,42,0.16);
          line-height: 1;
          flex-shrink: 0;
          user-select: none;
          transition: color 0.3s ease;
        }
        .proj-card:hover .proj-card-number { color: rgba(184,149,42,0.32); }

        /* ─── Divider ─── */
        .proj-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(184,149,42,0.25), rgba(184,149,42,0.05), transparent);
          margin-bottom: 14px;
          transform-origin: left;
          transition: background 0.3s ease;
        }
        .proj-card:hover .proj-divider {
          background: linear-gradient(to right, rgba(184,149,42,0.45), rgba(184,149,42,0.1), transparent);
        }

        /* ─── Description ─── */
        .proj-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: rgba(26,24,18,0.6);
          line-height: 1.68;
          margin: 0 0 16px;
          flex: 1;
        }

        /* ─── Tech Tags ─── */
        .proj-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 20px;
        }
        .proj-tech-tag {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(184,149,42,0.07);
          border: 1px solid rgba(184,149,42,0.2);
          color: #8a6e1a;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .proj-tech-tag:hover {
          background: rgba(184,149,42,0.13);
          border-color: rgba(184,149,42,0.36);
          transform: translateY(-1px);
        }

        /* ─── Links ─── */
        .proj-links {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: auto;
        }
        .proj-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 9px;
          border: 1px solid rgba(184,149,42,0.3);
          color: #b8952a;
          background: transparent;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          transition:
            background 0.22s ease,
            color 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            transform 0.18s ease;
        }
        .proj-btn:hover,
        .proj-btn-open {
          background: #b8952a;
          color: #fff;
          border-color: #b8952a;
          box-shadow: 0 4px 16px rgba(184,149,42,0.3);
          transform: translateY(-1px);
        }
        .proj-btn:active { transform: translateY(0); }
        .proj-btn-arrow {
          font-size: 12px;
          transition: transform 0.2s ease;
        }
        .proj-btn:hover .proj-btn-arrow { transform: translate(2px, -2px); }
        .proj-btn-chevron {
          font-size: 11px;
          display: inline-block;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }

        /* ─── Dropdown ─── */
        .proj-dropdown-wrap { position: relative; }
        .proj-dropdown {
          background: #ffffff;
          border: 1px solid rgba(26,24,18,0.09);
          border-radius: 12px;
          padding: 6px;
          min-width: 148px;
          box-shadow: 0 10px 32px rgba(26,24,18,0.13), 0 2px 8px rgba(26,24,18,0.07);
          opacity: 0;
          transform: translateY(-6px) scale(0.96);
          transition:
            opacity 0.2s cubic-bezier(0.4,0,0.2,1),
            transform 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        .proj-dropdown-open {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .proj-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          color: #1a1812;
          text-decoration: none;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .proj-dropdown-item:hover {
          background: rgba(184,149,42,0.09);
          color: #b8952a;
        }
        .proj-dropdown-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(184,149,42,0.5);
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .proj-page { padding: 80px 16px 90px; }
          .proj-grid { grid-template-columns: 1fr; }
          .proj-head { margin-bottom: 44px; }
        }
      `}</style>
    </section>
  );
};

export default Projects;