import React, { useState, useEffect } from "react";
import { Code2, Monitor, Database, Server, Wrench } from 'lucide-react';
import DP from "../assets/DP.webp";
import { useLocation } from "react-router-dom";


const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      id: 'languages',
      title: "Languages",
      icon: Code2,
      color: "gold",
      skills: ["Java", "Python", "C"]
    },
    {
      id: 'frontend',
      title: "Frontend",
      icon: Monitor,
      color: "warm",
      skills: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      id: 'backend',
      title: "Backend",
      icon: Server,
      color: "sand",
      skills: ["Spring Boot", "Node.js", "Express.js", "REST API", "Flask", "Fast API"]
    },
    {
      id: 'database',
      title: "Database",
      icon: Database,
      color: "bronze",
      skills: ["MySQL", "MongoDB"]
    },
    {
      id: 'tools',
      title: "Tools",
      icon: Wrench,
      color: "stone",
      skills: ["Git", "VS Code", "IntelliJ IDEA", "Eclipse", "Data Structures", "Algorithms"]
    }
  ];

  // All colors derived from the Projects palette:
  // bg: #f5f2ec, text: #1a1812, accent gold: #b8952a, card: #ffffff
  const colorClasses = {
    gold: {
      icon: "proj-icon-gold",
      bg: "proj-bg-gold",
      border: "proj-border-gold",
      skill: "proj-skill-gold"
    },
    warm: {
      icon: "proj-icon-warm",
      bg: "proj-bg-warm",
      border: "proj-border-warm",
      skill: "proj-skill-warm"
    },
    sand: {
      icon: "proj-icon-sand",
      bg: "proj-bg-sand",
      border: "proj-border-sand",
      skill: "proj-skill-sand"
    },
    bronze: {
      icon: "proj-icon-bronze",
      bg: "proj-bg-bronze",
      border: "proj-border-bronze",
      skill: "proj-skill-bronze"
    },
    stone: {
      icon: "proj-icon-stone",
      bg: "proj-bg-stone",
      border: "proj-border-stone",
      skill: "proj-skill-stone"
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-8 md:px-20"
        style={{ background: "#f5f2ec" }}
      >
        <div
          className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden animate-fade-in"
          style={{ border: "4px solid rgba(184,149,42,0.35)", boxShadow: "0 8px 32px rgba(184,149,42,0.15)" }}
        >
          <img src={DP} alt="Praveen" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-4 max-w-xl animate-slide-in-right">
          <h1 className="text-3xl md:text-5xl font-bold" style={{ color: "#1a1812" }}>
            Hi, I'm Praveen 👋
          </h1>
          <p className="text-lg italic" style={{ color: "#7a6a3a" }}>
            "Balancing life like a movie — action on field, emotions in cinema, and logic in code."
          </p>
          <p className="leading-relaxed text-md md:text-lg" style={{ color: "rgba(26,24,18,0.65)" }}>
            I'm a passionate developer who loves coding, movies from TFI,
            and playing cricket. I enjoy creating smooth and meaningful digital
            experiences using modern web technologies. Always learning, growing,
            and upgrading myself like a true all-rounder!
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center justify-center py-20"
        style={{ background: "linear-gradient(to bottom, #f5f2ec, #ffffff)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1812" }}>
              Technical <em style={{ color: "#b8952a" }}>Skills.</em>
            </h2>
            <p style={{ color: "rgba(26,24,18,0.45)", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
              // Click on any icon to explore my expertise
            </p>
          </div>

          {/* Skills Tree Container */}
          <div className="flex flex-col items-center justify-center relative">
            {/* SVG branches */}
            <svg className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '600px', height: '120px', zIndex: 0 }}>
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="40"
                stroke="rgba(184,149,42,0.4)"
                strokeWidth="1"
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
              {skillCategories.map((category, index) => {
                const totalCategories = skillCategories.length;
                const xPosition = ((index - (totalCategories - 1) / 2) * 120) + 300;
                return (
                  <line
                    key={category.id}
                    x1="300"
                    y1="40"
                    x2={xPosition}
                    y2="120"
                    stroke="rgba(184,149,42,0.35)"
                    strokeWidth="1"
                    className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  />
                );
              })}
            </svg>

            {/* Root Node */}
            <div
              className={`mb-5 transition-all duration-700 relative z-10 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to right, #b8952a, #8a6e1a)" }}
                ></div>
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(135deg, #1a1812, #3a3020)" }}
                >
                  <span style={{ color: "#b8952a", fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>SKILLS</span>
                </div>
              </div>
            </div>

            <div className="h-10 mb-5"></div>

            {/* Categories Row */}
            <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 mb-8 px-4 relative z-10">
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                const colors = colorClasses[category.color];
                const isActive = activeCategory === category.id;

                return (
                  <div key={category.id} className="flex flex-col items-center">
                    <div className="h-8 mb-3"></div>

                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-400 hover:scale-110 active:scale-95 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      } proj-cat-btn ${isActive ? `proj-cat-active ${colors.border}` : ''}`}
                      style={{ transitionDelay: `${700 + index * 100}ms` }}
                    >
                      <Icon className={`w-6 h-6 ${colors.icon} transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
                      {isActive && (
                        <span className={`absolute inset-0 rounded-full ${colors.bg} opacity-20 animate-ping`}></span>
                      )}
                    </button>

                    <span
                      className={`text-sm mt-2 transition-all duration-300 ${isActive ? 'scale-105' : ''}`}
                      style={{ color: isActive ? "#1a1812" : "rgba(26,24,18,0.6)", fontWeight: isActive ? 700 : 500 }}
                    >
                      {category.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Skills Display Area */}
            <div className="w-full max-w-5xl flex items-start justify-center">
              {skillCategories.map((category) => {
                const colors = colorClasses[category.color];
                const isActive = activeCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className={`transition-all duration-500 ease-out ${
                      isActive
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 -translate-y-4 scale-95 pointer-events-none absolute'
                    }`}
                  >
                    {isActive && (
                      <div className="flex flex-col items-center">
                        <div className={`w-0.5 h-10 mb-5 ${colors.bg} animate-branch-grow`}></div>
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl px-4">
                          {category.skills.map((skill, skillIndex) => (
                            <div
                              key={skill}
                              className={`${colors.skill} px-5 py-2.5 rounded-full border shadow-sm text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default animate-skill-pop-in`}
                              style={{
                                animationDelay: `${skillIndex * 60}ms`,
                                animationFillMode: 'both',
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "13px"
                              }}
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {!activeCategory && (
                <div
                  className={`text-center py-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ color: "rgba(26,24,18,0.35)" }}
                >
                  <div className="text-5xl mb-3 animate-bounce-slow">👆</div>
                  <p className="text-base font-medium" style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>Select a category to explore skills</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── Category button base ── */
        .proj-cat-btn {
          background: #ffffff;
          border: 1px solid rgba(26,24,18,0.12);
          box-shadow: 0 2px 8px rgba(26,24,18,0.07);
        }
        .proj-cat-btn:hover {
          box-shadow: 0 6px 20px rgba(184,149,42,0.18);
        }
        .proj-cat-active {
          border-width: 2px;
          box-shadow: 0 4px 16px rgba(184,149,42,0.2);
        }

        /* ── Gold (Languages) ── */
        .proj-icon-gold  { color: #b8952a; }
        .proj-bg-gold    { background: #b8952a; }
        .proj-border-gold { border-color: #b8952a; }
        .proj-skill-gold {
          background: rgba(184,149,42,0.07);
          color: #8a6e1a;
          border-color: rgba(184,149,42,0.28);
        }
        .proj-skill-gold:hover { border-color: rgba(184,149,42,0.5); box-shadow: 0 4px 12px rgba(184,149,42,0.12); }

        /* ── Warm brown (Frontend) ── */
        .proj-icon-warm  { color: #a0784a; }
        .proj-bg-warm    { background: #a0784a; }
        .proj-border-warm { border-color: #a0784a; }
        .proj-skill-warm {
          background: rgba(160,120,74,0.07);
          color: #7a5830;
          border-color: rgba(160,120,74,0.28);
        }
        .proj-skill-warm:hover { border-color: rgba(160,120,74,0.5); box-shadow: 0 4px 12px rgba(160,120,74,0.12); }

        /* ── Sand (Backend) ── */
        .proj-icon-sand  { color: #8a7a52; }
        .proj-bg-sand    { background: #8a7a52; }
        .proj-border-sand { border-color: #8a7a52; }
        .proj-skill-sand {
          background: rgba(138,122,82,0.07);
          color: #635838;
          border-color: rgba(138,122,82,0.28);
        }
        .proj-skill-sand:hover { border-color: rgba(138,122,82,0.5); box-shadow: 0 4px 12px rgba(138,122,82,0.12); }

        /* ── Bronze (Database) ── */
        .proj-icon-bronze  { color: #c47c2a; }
        .proj-bg-bronze    { background: #c47c2a; }
        .proj-border-bronze { border-color: #c47c2a; }
        .proj-skill-bronze {
          background: rgba(196,124,42,0.07);
          color: #935c18;
          border-color: rgba(196,124,42,0.28);
        }
        .proj-skill-bronze:hover { border-color: rgba(196,124,42,0.5); box-shadow: 0 4px 12px rgba(196,124,42,0.12); }

        /* ── Stone (Tools) ── */
        .proj-icon-stone  { color: #7a6e58; }
        .proj-bg-stone    { background: #7a6e58; }
        .proj-border-stone { border-color: #7a6e58; }
        .proj-skill-stone {
          background: rgba(122,110,88,0.07);
          color: #564e3c;
          border-color: rgba(122,110,88,0.28);
        }
        .proj-skill-stone:hover { border-color: rgba(122,110,88,0.5); box-shadow: 0 4px 12px rgba(122,110,88,0.12); }

        /* ── Animations ── */
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes branchGrow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        @keyframes skillPopIn {
          0%   { opacity: 0; transform: translateY(-15px) scale(0.8); }
          60%  { transform: translateY(2px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .animate-fade-in        { animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1); }
        .animate-slide-in-right { animation: slideInRight 1s cubic-bezier(0.4,0,0.2,1); }
        .animate-branch-grow    { animation: branchGrow 0.5s cubic-bezier(0.4,0,0.2,1); transform-origin: top; }
        .animate-skill-pop-in   { animation: skillPopIn 0.6s cubic-bezier(0.34,1.56,0.64,1); }
        .animate-bounce-slow    { animation: bounceSlow 2s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default Homepage;