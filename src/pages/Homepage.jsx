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
      color: "blue",
      skills: ["Java", "Python", "C"]
    },
    {
      id: 'frontend',
      title: "Frontend",
      icon: Monitor,
      color: "emerald",
      skills: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      id: 'backend',
      title: "Backend",
      icon: Server,
      color: "purple",
      skills: ["Spring Boot", "Node.js", "Express.js", "REST API", "Flask", "Fast API"]
    },
    {
      id: 'database',
      title: "Database",
      icon: Database,
      color: "amber",
      skills: ["MySQL", "MongoDB"]
    },
    {
      id: 'tools',
      title: "Tools",
      icon: Wrench,
      color: "slate",
      skills: ["Git", "VS Code", "IntelliJ IDEA", "Eclipse", "Data Structures", "Algorithms"]
    }
  ];

  const colorClasses = {
    blue: {
      icon: "text-blue-600 hover:text-blue-700",
      bg: "bg-blue-500",
      border: "border-blue-400",
      skill: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300 hover:shadow-blue-100"
    },
    emerald: {
      icon: "text-emerald-600 hover:text-emerald-700",
      bg: "bg-emerald-500",
      border: "border-emerald-400",
      skill: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-100"
    },
    purple: {
      icon: "text-purple-600 hover:text-purple-700",
      bg: "bg-purple-500",
      border: "border-purple-400",
      skill: "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300 hover:shadow-purple-100"
    },
    amber: {
      icon: "text-amber-600 hover:text-amber-700",
      bg: "bg-amber-500",
      border: "border-amber-400",
      skill: "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300 hover:shadow-amber-100"
    },
    slate: {
      icon: "text-slate-600 hover:text-slate-700",
      bg: "bg-slate-500",
      border: "border-slate-400",
      skill: "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-slate-100"
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
        className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-8 md:px-20 bg-white"
      >
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg border-4 border-gray-300 animate-fade-in">
          <img src={DP} alt="Praveen" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-4 max-w-xl animate-slide-in-right">
          <h1 className="text-3xl md:text-5xl font-bold text-black">
            Hi, I'm Praveen 👋
          </h1>
          <p className="text-lg italic text-gray-700">
            "Balancing life like a movie — action on field, emotions in cinema, and logic in code."
          </p>
          <p className="text-gray-600 leading-relaxed text-md md:text-lg">
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
        className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div 
            className={`text-center mb-10 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-emerald-600">
                Technical Skills
              </span>
            </h2>
            <p className="text-gray-600 text-base">
              Click on any icon to explore my expertise
            </p>
          </div>

          {/* Skills Tree Container */}
          <div className="flex flex-col items-center justify-center relative">
            {/* Vertical line connecting root to all categories */}
            <svg className="absolute top-16 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '600px', height: '120px', zIndex: 0 }}>
              {/* Main trunk */}
              <line 
                x1="50%" 
                y1="0" 
                x2="50%" 
                y2="40" 
                stroke="#9ca3af" 
                strokeWidth="1"
                className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* Branches to categories */}
              {skillCategories.map((category, index) => {
                const totalCategories = skillCategories.length;
                const xPosition = ((index - (totalCategories - 1) / 2) * 120) + 300; // Centered distribution
                const colors = colorClasses[category.color];
                
                return (
                  <line 
                    key={category.id}
                    x1="300" 
                    y1="40" 
                    x2={xPosition} 
                    y2="120" 
                    stroke={colors.bg.replace('bg-', '#').replace('500', '').replace('-', '')} 
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
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-sm tracking-wider">SKILLS</span>
                </div>
              </div>
            </div>

            {/* Spacer for visual trunk (actual line is in SVG) */}
            <div className="h-10 mb-5"></div>

            {/* Categories Row */}
            <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 mb-8 px-4 relative z-10">
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                const colors = colorClasses[category.color];
                const isActive = activeCategory === category.id;

                return (
                  <div 
                    key={category.id} 
                    className="flex flex-col items-center"
                  >
                    {/* Spacer for branch line (actual line is in SVG above) */}
                    <div className="h-8 mb-3"></div>

                    {/* Category Node */}
                    <button
                      onClick={() => handleCategoryClick(category.id)}
                      className={`relative w-14 h-14 rounded-full bg-white border-2 ${
                        isActive ? colors.border : 'border-gray-300'
                      } flex items-center justify-center transition-all duration-400 hover:scale-110 active:scale-95 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      } ${isActive ? 'shadow-lg ring-4 ring-offset-2 ring-' + category.color + '-200' : 'shadow-md hover:shadow-lg'}`}
                      style={{ transitionDelay: `${700 + index * 100}ms` }}
                    >
                      <Icon className={`w-6 h-6 ${colors.icon} transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
                      
                      {/* Pulse Effect when Active */}
                      {isActive && (
                        <span className={`absolute inset-0 rounded-full ${colors.bg} opacity-20 animate-ping`}></span>
                      )}
                    </button>

                    {/* Category Label */}
                    <span className={`text-sm font-medium text-gray-700 mt-2 transition-all duration-300 ${
                      isActive ? 'font-bold text-gray-900 scale-105' : ''
                    }`}>
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
                        {/* Connecting Branch */}
                        <div className={`w-0.5 h-10 mb-5 ${colors.bg} animate-branch-grow`}></div>

                        {/* Skills Cloud */}
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl px-4">
                          {category.skills.map((skill, skillIndex) => (
                            <div
                              key={skill}
                              className={`${colors.skill} px-5 py-2.5 rounded-full border shadow-sm text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default animate-skill-pop-in`}
                              style={{ 
                                animationDelay: `${skillIndex * 60}ms`,
                                animationFillMode: 'both'
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
              
              {/* Placeholder */}
              {!activeCategory && (
                <div className={`text-center text-gray-400 py-8 transition-all duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-5xl mb-3 animate-bounce-slow">👆</div>
                  <p className="text-base font-medium">Select a category to explore skills</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }

        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(40px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }

        @keyframes branchGrow {
          from { 
            transform: scaleY(0);
            opacity: 0;
          }
          to { 
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes skillPopIn {
          0% { 
            opacity: 0; 
            transform: translateY(-15px) scale(0.8);
          }
          60% {
            transform: translateY(2px) scale(1.05);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounceSlow {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slide-in-right {
          animation: slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-branch-grow {
          animation: branchGrow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: top;
        }

        .animate-skill-pop-in {
          animation: skillPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Homepage;