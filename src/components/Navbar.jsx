import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleScroll = (id) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const navLinks = [
    { label: "Home",     type: "link",   to: "/" },
    { label: "Skills",   type: "scroll", id: "skills" },
    { label: "Projects", type: "link",   to: "/projects" },
    { label: "CP",       type: "link",   to: "/competitive" },
    { label: "About",    type: "link",   to: "/about" },
  ];

  const PDF_PATH = "/resume-java.pdf";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');

        .nb-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nb-root.scrolled {
          background: rgba(245, 242, 236, 0.92);
          backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(184, 149, 42, 0.15);
          box-shadow: 0 4px 24px rgba(26, 24, 18, 0.07);
        }

        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nb-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #1a1812;
          text-decoration: none;
          letter-spacing: -0.02em;
          position: relative;
          flex-shrink: 0;
        }
        .nb-logo-dot { color: #b8952a; }
        .nb-logo::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: #b8952a;
          transition: width 0.3s ease;
        }
        .nb-logo:hover::after { width: 100%; }

        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .nb-link-btn,
        .nb-navlink {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(26, 24, 18, 0.55);
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 13px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nb-link-btn:hover,
        .nb-navlink:hover {
          color: #b8952a;
          background: rgba(184, 149, 42, 0.08);
        }
        .nb-navlink.active {
          color: #b8952a;
          background: rgba(184, 149, 42, 0.1);
          font-weight: 500;
        }

        .nb-resume {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b8952a;
          text-decoration: none;
          padding: 8px 20px;
          border: 1px solid rgba(184, 149, 42, 0.45);
          border-radius: 9px;
          background: transparent;
          cursor: pointer;
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .nb-resume::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #b8952a;
          transform: translateX(-101%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }
        .nb-resume:hover::before { transform: translateX(0); }
        .nb-resume:hover { color: #fff; border-color: #b8952a; }
        .nb-resume span { position: relative; z-index: 1; }

        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .nb-hamburger:hover { background: rgba(184, 149, 42, 0.08); }
        .nb-hamburger span {
          display: block;
          width: 20px; height: 1.5px;
          background: rgba(26, 24, 18, 0.7);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .nb-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nb-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .nb-drawer {
          position: fixed;
          top: 66px; left: 0; right: 0;
          background: rgba(245, 242, 236, 0.97);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(184, 149, 42, 0.12);
          box-shadow: 0 8px 32px rgba(26, 24, 18, 0.08);
          padding: 12px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          transform: translateY(-108%);
          opacity: 0;
          transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 99;
        }
        .nb-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .nb-drawer-link,
        .nb-drawer-btn {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(26, 24, 18, 0.6);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px 14px;
          border-radius: 10px;
          text-align: left;
          transition: all 0.18s ease;
        }
        .nb-drawer-link:hover,
        .nb-drawer-btn:hover,
        .nb-drawer-link.active {
          color: #b8952a;
          background: rgba(184, 149, 42, 0.08);
        }
        .nb-drawer-divider {
          height: 1px;
          background: rgba(26, 24, 18, 0.06);
          margin: 8px 0;
        }
        .nb-drawer-resume {
          margin-top: 4px;
          padding: 12px 14px;
          border: 1px solid rgba(184, 149, 42, 0.4);
          border-radius: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b8952a;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s ease;
          background: transparent;
          display: block;
        }
        .nb-drawer-resume:hover {
          background: #b8952a;
          color: #fff;
        }

        @media (max-width: 900px) {
          .nb-links, .nb-resume { display: none !important; }
          .nb-hamburger { display: flex; }
        }
      `}</style>

      <header className={`nb-root${scrolled ? " scrolled" : ""}`}>
        <div className="nb-inner">

          <NavLink to="/" className="nb-logo">
            P<span className="nb-logo-dot">.</span>D
          </NavLink>

          <ul className="nb-links">
            {navLinks.map((l) =>
              l.type === "link" ? (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `nb-navlink${isActive ? " active" : ""}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ) : (
                <li key={l.label}>
                  <button className="nb-link-btn" onClick={() => handleScroll(l.id)}>
                    {l.label}
                  </button>
                </li>
              )
            )}
          </ul>

          {/* Resume — plain download link, no modal */}
          <a
            href={PDF_PATH}
            download="resume-java.pdf"
            className="nb-resume"
          >
            <span>Resume ↓</span>
          </a>

          <button
            className={`nb-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`nb-drawer${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) =>
          l.type === "link" ? (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `nb-drawer-link${isActive ? " active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ) : (
            <button
              key={l.label}
              className="nb-drawer-btn"
              onClick={() => handleScroll(l.id)}
            >
              {l.label}
            </button>
          )
        )}
        <div className="nb-drawer-divider" />

        {/* Mobile drawer resume — also plain download */}
        <a
          href={PDF_PATH}
          download="resume-java.pdf"
          className="nb-drawer-resume"
          onClick={() => setMenuOpen(false)}
        >
          Resume ↓
        </a>
      </div>
    </>
  );
};

export default Navbar;