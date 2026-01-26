import React, { useState } from 'react';
import { Anchor } from 'lucide-react';


const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap');
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  *::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  * {
    scrollbar-width: none;
  }
  
  /* Hide scrollbar for IE and Edge */
  * {
    -ms-overflow-style: none;
  }

`;
document.head.appendChild(style);

interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  position: 'left' | 'right';
}

const experiences: Experience[] = [
  {
    date: 'March 2022 - June 2022',
    title: 'Digital Marketing Intern',
    company: 'Ocean-Based Climate Solutions',
    description: "Spearheaded digital marketing initiatives to promote company's brand and mission across online platforms. Conceptualized and created engaging Instagram stories, visually appealing infographics, and informative white papers. Conducted in-depth research on deep-sea upwelling and other innovative climate change solutions to educate audience.",
    skills: ['Canva', 'Figma', 'InDesign'],
    position: 'left',
  },
  {
    date: 'May 2023 - Aug 2023',
    title: 'Information and Technology Intern',
    company: 'Kelly Services',
    description: 'Performed detailed laptop inventory management, ensuring accurate tracking, updating, and documentation of all district devices. Conducted cleaning, diagnostics, and preventative maintenance on OCPS servers to support reliable infrastructure operations. Processed and updated BIOS configurations on OCPS laptops, improving device performance, security, and compliance across the district.',
    skills: ['Windows OS', 'Excel', 'MacOS'],
    position: 'right',
  },
  {
    date: 'March 2025 - Present',
    title: 'Software Automation Engineer',
    company: 'University of Florida',
    description: 'Built scalable Qualtrics survey systems and optimized data collection processes, reducing manual processing time by 95%. Developed automated workflows using Google Apps Script and Python macros, cutting repetitive tasks and lowering turnaround time for the foreign exchange program by 80%. Delivered actionable reports that supported decision-making across multiple departments, saving over 100+ staff hours annually.',
    skills: ['Python', 'Google App Script', 'Oracle VirtualBox', 'Qualtrics'],
    position: 'left',
  },
  {
    date: 'Sep 2025 - Present',
    title: 'UF CpE Capstone Design Teaching Assistant',
    company: 'University of Florida',
    description: 'Mentor and assist senior Computer Engineering students through the design lifecycle, from concept to prototype development. Provide technical guidance in embedded systems, PCB design, and engineering standards. Evaluate student deliverables, ensuring adherence to structured design methodology and engineering standards. Support lab sessions and foster professional communication, teamwork, and design ethics.',
    skills: ['Altium', 'C++', 'PCBs'],
    position: 'right',
  },
  {
    date: 'May 2021',
    title: 'AI/ML Epidemiology Research Assistant',
    company: 'University of Florida Department of Epidemiology',
    description: 'Assisting in the development of machine learning and large language models to understand and perform statistical analysis on real time viral data and prediction of growth patterns. Performing automation work on encoding genomic information, allowing regression and visualization of nucleotide and amino acid information. Streamlining passing information to AI models to cut down processing time and manual labor',
    skills: ['Python', 'KMC', 'HiPerGator', 'Git', 'Bash'],
    position: 'left',
  },
];

const PortfolioTimeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'contact'>('home');
  const [cardHeights, setCardHeights] = useState<{ [key: number]: number }>({});
  
  const cardRefs = React.useRef<{ [key: number]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    // Set page title
    document.title = "Minh Tran | Portfolio";
    
    // Set favicon (page icon)
    let favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(favicon);
    }
    favicon.type = 'image/x-icon';
    favicon.href = '1eca390a1a207fc06fba44b4ac3dd804.jpg'; // Replace with your icon URL
  }, []);

  React.useEffect(() => {
    // Measure collapsed heights for each card
    const measureHeights = () => {
      const heights: { [key: number]: number } = {};
      experiences.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (card) {
          // Temporarily show only header to measure
          const header = card.querySelector('.card-header') as HTMLElement;
          if (header) {
            heights[index] = header.offsetHeight + 64; // 64 = p-8 padding (32px top + 32px bottom)
          }
        }
      });
      setCardHeights(heights);
    };

    measureHeights();
    window.addEventListener('resize', measureHeights);
    return () => window.removeEventListener('resize', measureHeights);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const BUFFER = 230;
      const timelineStart = heroHeight + BUFFER;
      
      if (scrollY < timelineStart) {
        setScrollProgress(0);
        return;
      }
      
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const timelineEnd = scrollableHeight - 100;
      const timelineScrollable = timelineEnd - timelineStart;
      const currentScrollInTimeline = Math.min(scrollY - timelineStart, timelineScrollable);
      
      const progress = Math.min(90, Math.max(0, (currentScrollInTimeline / timelineScrollable) * 90));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full" style={{ fontFamily: 'Quicksand, sans-serif' }}>
      {/* HERO/LANDING PAGE - Full Screen */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("981ac6b1929d40ac4a8c055cdd0233cf.jpg")',
            filter: 'blur(0px)'
          }}
        />

        {/* Glass Container - Shifts based on active section */}
          <div
            className={`relative z-10 flex gap-6 transition-all duration-700 ease-in-out ${
              activeSection === 'home' ? 'left-2 w-[600px]' : 'w-[1200px]'
            }`}>

          {/* Main Glassmorphism Window Container */}
          <div className={`relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-md bg-white/1 transition-all duration-700 ease-in-out h-[550px] ${
            activeSection !== 'home' ? 'w-1/2' : 'w-full'
          }`}>
            {/* Content inside the main glass window */}
            <div className="relative w-full h-full flex items-center justify-center p-12">
              <div className="flex w-full h-full">
                {/* Main content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
                  <h1 className="text-8xl font-bold text-white mb-6 leading-tight">
                    Minh <br/>Tran
                  </h1>
                  <p className="text-xl text-white/80 mb-8">
                    Developer • Researcher
                  </p>
                  <button 
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    className="px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full text-lg font-semibold text-white transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    My Journey
                  </button>
                </div>
              </div>

              {/* Navigation at top right */}
              <div className="absolute top-8 flex gap-8 text-sm text-white/80">
                <button 
                  onClick={() => setActiveSection('home')}
                  className={`hover:text-white transition-colors ${activeSection === 'home' ? 'text-white font-semibold' : ''}`}
                >
                  HOME
                </button>
                <button 
                  onClick={() => setActiveSection('about')}
                  className={`hover:text-white transition-colors ${activeSection === 'about' ? 'text-white font-semibold' : ''}`}
                >
                  ABOUT
                </button>
                <button 
                  onClick={() => setActiveSection('contact')}
                  className={`hover:text-white transition-colors ${activeSection === 'contact' ? 'text-white font-semibold' : ''}`}
                >
                  CONTACT
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Panel - Slides in from right */}
          <div className={`rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-md bg-white/2 transition-all duration-700 ease-in-out ${
            activeSection !== 'home' ? 'w-1/2 h-[550px] opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full'
          }`}>
            <div className="relative w-full h-full p-12 overflow-y-auto">
              {activeSection === 'about' && (
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-6">About Me</h2>
                  <div className="space-y-4 text-white/90">
                    <p className="text-lg leading-relaxed">
                      I'm a Computer Science student and Researcher at the University of Florida, 
                      driven by curiosity and a love for automating technology.
                    </p>
                    <p className="text-lg leading-relaxed">
                      My journey spans from digital marketing for climate change to software automation 
                      and AI/ML epidemiology research. I thrive at the intersection of biology and software , building 
                      solutions that make a real-world impact.
                    </p>
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold mb-4">Skills & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Python', 'TypeScript', 'C++', 'React', 'Git', 'Machine Learning', 'Scripting', 'Automation'].map((skill, i) => (
                          <span key={i} className="px-4 py-2 bg-white/20 rounded-full text-sm border border-white/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold mb-4">Interests</h3>
                      <p className="text-lg leading-relaxed">
                        When I'm not coding, you'll find me watching nature documentaries, working on personal projects, or lifting weights. I believe in protecting the environment and using technology to benefit the world and not just for personal profit.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'contact' && (
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
                  <div className="space-y-6">
                    <p className="text-lg text-white/90 leading-relaxed">
                      I'm always open to new opportunities, collaborations, and interesting conversations. 
                      Feel free to reach out!
                    </p>
                    
                    <div className="space-y-4 mt-8">
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📧</span>
                        </div>
                        <div>
                          <div className="text-sm text-white/70">Email</div>
                          <div className="text-lg font-semibold">minhtran60524@gmail.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">💼</span>
                        </div>
                        <div>
                          <div className="text-sm text-white/70">LinkedIn</div>
                          <a
                            href="https://www.linkedin.com/in/minhtran605/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-white font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors"
                          >
                            linkedin.com/in/minhtran605
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">💻</span>
                        </div>

                        <div>
                          <div className="text-sm text-white/70">GitHub</div>
                          <a
                            href="https://github.com/KopikoCappu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg text-white font-semibold underline underline-offset-2 hover:text-blue-300 transition-colors"
                          >
                            github.com/KopikoCappu
                          </a>
                        </div>
                      </div>

                      
                      <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/20">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📍</span>
                        </div>
                        <div>
                          <div className="text-sm text-white/70">Location</div>
                          <div className="text-lg font-semibold">Gainesville, Florida</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* TIMELINE SECTION - Starts after hero */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 text-white overflow-hidden py-16">
        {/* Gradient overlap at the top to blend with hero section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/78 to-slate-890 z-10 pointer-events-none" />
        
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-20 px-4 relative z-20">
          <h2 className="text-5xl font-bold mb-4">My Journey</h2>
          <p className="text-xl text-blue-300">
            A timeline of experiences, growth, and achievements
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-7xl mx-auto px-8 pb-32">
          {/* Vertical Timeline Line (fixed at 1/4 from left) */}
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-white-200 via-blue-400 to-blue-500 opacity-30 z-10" style={{ left: 'calc(25% + 2rem)' }} />

          {/* Scroll Progress Indicator */}
          <div 
            className="fixed w-1 bg-gradient-to-b from-white-400 to-blue-400 z-40"
            style={{
              left: 'calc(25% + 2rem)',
              top: '0',
              height: `${scrollProgress}vh`,
              opacity: scrollProgress > 0 ? 1 : 0,
              transition: 'opacity 0.3s'
            }}
          />

          {/* Scroll Indicator Anchor */}
          <div 
            className="fixed bg-gradient-to-br from-white-200 to-blue-400 rounded-full shadow-lg shadow-blue-500/50 z-50 flex items-center justify-center"
            style={{
              width: '40px',
              height: '40px',
              left: 'calc(25.17% + 2rem)',
              top: `${Math.min(scrollProgress, 90)}vh`,
              transform: 'translate(-50%, -50%)',
              opacity: scrollProgress > 0 ? 1 : 0,
              transition: 'opacity 0.3s'
            }}
          >
            <Anchor className="text-white relative z-10" size={24} />
            <div className="absolute inset-0 w-full h-full bg-blue-400 rounded-full animate-ping opacity-75" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative flex items-center mb-32"
              >
                {/* Anchor icon on the line */}
                <div className="absolute transform -translate-x-1/2" style={{ left: 'calc(30% + 2rem)' }}>
                  <div 
                    className={`w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-4 shadow-lg shadow-blue-500/50 transition-transform duration-300 flex items-center justify-center ${
                      hoveredIndex === index ? 'scale-125' : 'scale-100'
                    }`}
                    style={{ borderColor: '#011128' }}
                  >
                    <Anchor className="text-white" size={20} />
                  </div>
                </div>

                {/* Card on the right */}
                <div className="ml-[40%] w-[%] pl-12">
                  <div
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`bg-slate-800/90 backdrop-blur-sm rounded-xl border-2 border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 shadow-xl ${
                      hoveredIndex === index ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                      maxHeight: hoveredIndex === index ? '1000px' : `${cardHeights[index] || 200}px`,
                      overflow: 'hidden'
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="p-8">
                      <div className="card-header">
                        <div className="text-sm text-blue-400 font-semibold mb-3">{exp.date}</div>
                        <h3 className="text-3xl font-bold mb-2">{exp.title}</h3>
                        <div className="text-blue-300 text-lg">{exp.company}</div>
                      </div>
                      <div 
                        className="transition-all duration-500"
                        style={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          maxHeight: hoveredIndex === index ? '1000px' : '0px',
                          overflow: 'hidden'
                        }}
                      >
                        <p className="text-gray-300 text-base mb-6 leading-relaxed mt-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span
                              key={`${index}-skill-${i}`}
                              className="px-4 py-2 bg-blue-500/20 rounded-full text-sm text-blue-200 border border-blue-400/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End Marker */}
          <div className="relative mt-32 flex items-center">
            <div className="absolute transform -translate-x-1/2" style={{ left: 'calc(30% + 2rem)' }}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-4 border-slate-950 shadow-lg shadow-blue-500/50" />
            </div>
            <div className="ml-[40%] w-[45%] pl-12">
              <div className="text-center bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border-2 border-blue-500/30">
                <h3 className="text-2xl font-bold mb-2">Present Day</h3>
                <p className="text-gray-300">Ready for new challenges and opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioTimeline;