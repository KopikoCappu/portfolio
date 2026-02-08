import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/* GLOBAL STYLE INJECTION */
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

  /* Lenis Essential CSS */
  html.lenis {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  .lenis.lenis-stopped {
    overflow: hidden;
  }

  *::-webkit-scrollbar {
    display: none;
  }
  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
  .animate-bounce-slow {
    animation: bounce-slow 2s infinite;
  }
`;
document.head.appendChild(style);

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState<"home" | "about" | "contact">("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.5,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Favicon Logic
    let favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(favicon);
    }
    favicon.type = 'image/x-icon';
    favicon.href = 'IMG_2489.JPEG';

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target && lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        immediate: false,
        duration: 1.5,
      });
    }
  };

  const experiences = [
    {
      role: "Machine Learning / Microbe Researcher",
      company: "Epi-Logic Lab",
      period: "University of Florida / Oct 2025 — Present",
      notes: "Engineered scalable Python Pipelines to process medical genomic information, extracting k-mer features and constructing datasets for Machine Learning based antibiotic resistance prediction.",
      ingredients: ["Python", "Pytorch", "SciKit", "Pandas", "Matplotlib"]
    },
    {
      role: "SWE Automation Intern",
      company: "University of Florida",
      period: "University of Florida / March 2025 — Present",
      notes: "Developed end-to-end automation pipelines that reduced manual data entry by 98%. Focused on building resilient error-handling systems and scalable infrastructure.",
      ingredients: ["Python", "Google App Script", "JavaScript", "Linux", "Qualtrics"]
    },
    {
      role: "IT Intern",
      company: "Kelly Services Inc.",
      period: "Kelly Services / Summer 2023",
      notes: "Managing OCPS laptop inventory through Excel databasing, enabling quick lookup and efficient tracking, performing data processing to streamline workflows, and automating BIOS configuration and updates.",
      ingredients: ["Excel", "SQL", "Linux", "IOS"]
    },
  ];

  const projects = [
    {
      title: "Tapper",
      category: "Fullstack Mobile Development",
      description: "A proximity based social media app targeted at college students using NFC scanning with QR Code fallback. Data securely stored in Google Cloud Service - Firebase with user authentification and real-time handshake sessions.",
      image: "New Project (1).jpg"
    },
    {
      title: "Antibiotic Resistance Predictor",
      category: "Bioinformatics and Machine Learning",
      description: "A predictive machine learning model used to study and predict future dominant linages of microbes, using genomic sequence data and Python data processing in order to detect anomalous mutations and predicting antimicrobial resistance.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop"
    },
    {
      title: "UF Study Abroad Pipeline",
      category: "Automation Systems",
      description: "Developed multi-layer survey automated application system facilitating the exchange of UF students with the University of Kyoto. Reducing manual labor by 98% using Google App Script, Python, Gmail API, and Qualtrics. ",
      image: "screenshot_2025-01-20_at_10.17.12_am.jpg"
    }
  ];

  return (
    <div className="w-full font-sans bg-[#0A0A0A] text-[#EAead2]">
      {/* OVERLAYS (ABOUT / CONTACT) */}
      {activeSection !== "home" && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-20 transition-all duration-500"
          onClick={() => setActiveSection("home")}
        >
          <div 
            className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <div className="w-64 h-80 md:w-80 md:h-[450px] bg-[#1A1A1A] border border-[#EAead2]/20 rounded-sm overflow-hidden">
                <img 
                  src="IMG_2489.JPEG" 
                  alt="Profile" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {activeSection === "about" ? "About Me" : "Contacts"}
                </h2>
                <div className="w-12 h-px bg-[#EAead2] opacity-40" />
              </div>

              {activeSection === "about" ? (
                <p className="text-xl leading-relaxed text-[#EAead2]/80 font-serif italic">
                  CS @ UF / Machine-Learning Research @ UF Marini-Lab. I love nature videography, cooking new recipes, and protecting the environment.
                </p> 
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.4em] block">Digital Reach</span>
                    <div className="flex flex-col gap-3">
                      <a href="https://www.linkedin.com/in/minhtran605/" target="_blank" className="text-2xl hover:italic transition-all w-fit">LinkedIn</a>
                      <a href="https://github.com/KopikoCappu" target="_blank" className="text-2xl hover:italic transition-all w-fit">GitHub</a>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.4em] block">Direct Line</span>
                    <a href="mailto:minhtran60524@gmail.com" className="text-xl block hover:opacity-60 transition-all">minhtran60524@gmail.com</a>
                    <span className="text-xl block opacity-80">+1 (407) 274-7484</span>
                  </div>
                </div>
              )}
              <button onClick={() => setActiveSection("home")} className="mt-4 text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-all text-left">
                [ Click anywhere to return ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main>
        {/* HERO */}
        <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute top-8 right-10 z-40 flex gap-8">
            <button onClick={() => setActiveSection("about")} className="uppercase tracking-widest text-sm hover:opacity-70">About</button>
            <button onClick={() => setActiveSection("contact")} className="uppercase tracking-widest text-sm hover:opacity-70">Contact</button>
          </div>

          <div className="relative flex flex-col items-center">
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold relative z-10" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.03em" }}>
              PORTFOLIO
            </h1>
            <div className="pointer-events-none flex items-center gap-4 -translate-x-[100%] translate-y-[-370%] md:-translate-x-[180%] md:-translate-y-[440%] lg:-translate-x-[240%] lg:-translate-y-[500%] xl:-translate-x-[280%] xl:-translate-y-[560%]">
              <div className="w-10 h-10 border-2 border-[#EAead2] rounded-full" />
              <div className="w-24 h-10 border-2 border-[#EAead2] rounded-full" />
            </div>

            <div className="pointer-events-none flex items-center gap-4 translate-x-[100%] -translate-y-[80%] md:translate-x-[180%] md:-translate-y-[140%] lg:translate-x-[240%] md:-translate-y-[160%] xl:translate-x-[280%] xl:-translate-y-[200%]">
              <div className="w-10 h-10 bg-[#EAead2] rounded-full" />
              <div className="w-24 h-10 bg-[#EAead2] rounded-full flex items-center justify-center">
                <span className="text-md italic text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Minh Tran</span>
              </div>
            </div>
          </div>

          <button onClick={() => scrollToSection("meet-the-chef")} className="absolute bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2">
            <span className="uppercase tracking-[0.5em] text-[20px] group-hover:tracking-[0.6em] transition-all duration-500">Meet the Chef</span>
            <svg className="w-6 h-6 opacity-60 animate-bounce-slow mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* MEET THE CHEF */}
        <section id="meet-the-chef" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-10 mt-40 max-sm:pb-80">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="flex flex-col justify-center">
              <span className="opacity-80 uppercase tracking-[0.4em] text-[12px] font-bold mb-6">Introduction</span>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>The Philosophy</h2>
              <p className="opacity-80 text-xl font-serif italic leading-relaxed border-l border-[#EAead2]/20 pl-8">
                "I view software engineering like a high-end kitchen: details are non-negotiable, the 'ingredients' must be top-tier, and the final experience should leave a good taste in your mouth."
              </p>
            </div>
            <div className="flex flex-col justify-center gap-12">
              <div>
                <span className="opacity-80 uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Current Palate</span>
                <ul className="opacity-60 space-y-4 text-lg">
                  <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#EAead2]" /> Exploring LLM agentic workflows</li>
                  <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#EAead2]" /> Scripting data automation processes</li>
                  <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-[#EAead2]" /> Integrating cloud web services </li>
                </ul>
              </div>
              <div>
                <span className="opacity-80 uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Beyond the Terminal</span>
                <p className="opacity-70 leading-relaxed font-light">
                  When I'm not at the desk, I'm likely experimenting with photography, keeping up with epidemiological research, or learning new recipes.
                </p>
              </div>
            </div>
          </div>
          <button onClick={() => scrollToSection("experience-menu")} className="absolute bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2">
            <span className="uppercase tracking-[0.5em] text-[20px] group-hover:tracking-[0.6em] transition-all">Chef's Experience</span>
            <svg className="w-6 h-6 opacity-60 animate-bounce-slow mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* EXPERIENCE MENU */}
        <section id="experience-menu" className="snap-start relative w-full min-h-screen bg-[#0A0A0A] flex items-start justify-center overflow-y-auto pt-32 pb-40">
          <div className="max-w-7xl w-full px-10 relative h-full">
            
            <div className="mb-12 ml-5">
              <span className="uppercase tracking-[0.4em] text-[10px] text-[#EAead2] block mb-2 font-bold">Selected Works</span>
                <h2 className="text-4xl font-serif italic text-[#EAead2]">Professional Experience</h2>
            </div>

            <div className="flex flex-col gap-10 ml-5 relative pb-25">
              {experiences.map((item, i) => (
                <div key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="group relative py-4 flex items-start">
                  
                  <div className="w-full md:max-w-[50%] flex flex-col gap-2 transition-transform duration-700 ease-out group-hover:-translate-x-2 border-b border-white pb-20">
                    <span className="block italic text-white text-xs font-serif">Course 0{i + 1}</span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#EAead2]/90 transition-all duration-300 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.role}
                    </h3>
                    <span className="text-[13px] uppercase tracking-[0.2em] text-[#EAead2] font-sans">{item.period}</span>
                  </div>

                  <div className={`hidden md:flex absolute right-0 top-0 w-[40%] h-full flex-col justify-center gap-6 pointer-events-none transition-all duration-700 ease-out ${hoveredIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                    <div>
                      <span className="text-[15px] uppercase tracking-[0.3em] text-[#EAead2] block mb-4 font-bold">Chef's Notes</span>
                      <p className="text-lg text-[#EAead2] font-serif italic leading-relaxed border-l-2 border-white pl-6 text-wrap">"{item.notes}"</p>
                    </div>
                    <div>
                      <span className="text-[20px] uppercase tracking-[0.3em] text-[#EAead2]/70 block mb-4 font-bold">Primary Ingredients</span>
                      <div className="flex flex-wrap gap-2">
                        {item.ingredients.map((ing, idx) => (
                          <span key={idx} className="px-3 py-1 border border-[#EAead2]/70 rounded-full text-[15px] uppercase tracking-widest text-[#EAead2]">{ing}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            <button onClick={() => scrollToSection("current-dishes")} className="absolute bottom-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2 ">
            <span className="uppercase tracking-[0.5em] text-[20px] group-hover:tracking-[0.6em] transition-all duration-500 text-[#EAead2]">Current Dishes</span>
            <svg className="w-6 h-6 text-[#EAead2] opacity-60 animate-bounceslow mb-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </section>

        {/* PROJECTS MENU */}
        <section id="current-dishes" className="relative w-full min-h-screen flex flex-col items-center py-32 px-10">
          <div className="max-w-6xl w-full">
            <div className="mb-32 text-center">
              <span className="opacity-40 uppercase tracking-[0.6em] text-[12px] font-bold block mb-4">Ready to be Served</span>
              <h2 className="text-6xl md:text-8xl font-serif italic" style={{ fontFamily: "'Playfair Display', serif" }}>Current Dishes</h2>
            </div>
            <div className="flex flex-col gap-40">
              {projects.map((project, index) => (
                <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-3/5 group relative cursor-crosshair">
                    <div className="relative overflow-hidden aspect-[16/9] rounded-sm">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                    <div className="overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-700">
                      <div className="pt-4 border-l border-[#EAead2] pl-6 mt-4">
                        <p className="text-xl font-serif italic opacity-70 leading-relaxed">"{project.description}"</p>
                      </div>
                    </div>
                  </div>
                  <div className={`w-full md:w-2/5 ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-[10px] uppercase tracking-[0.4em] block mb-2">Recipe 0{index + 1}</span>
                    <h3 className="text-4xl md:text-6xl font-serif italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 italic">{project.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => scrollToSection("hero")} className="mt-40 group flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-all">
            <span className="uppercase tracking-[0.5em] text-[10px]">Back to Top</span>
            <div className="w-px h-12 bg-[#EAead2]" />
          </button>
        </section>
      </main>
    </div>
  );
};

export default PortfolioPage;