import React, { useState } from 'react';
import { Anchor } from 'lucide-react';


const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap');
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
    date: 'Jan 2024',
    title: 'Senior Developer',
    company: 'Tech Corp',
    description: 'Led a team building cloud-native apps and CI/CD pipelines, improving deployment speed by 40%.',
    skills: ['React', 'Node.js', 'AWS'],
    position: 'left',
  },
  {
    date: 'Jun 2023',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    description: 'Built scalable web apps serving 100k+ users. Optimized DB queries reducing load times by 60%.',
    skills: ['TypeScript', 'PostgreSQL', 'Docker'],
    position: 'right',
  },
  {
    date: 'Mar 2022',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    description: 'Developed responsive websites. Improved accessibility to AAA standards. Mirah Mirah Mirah Mirah',
    skills: ['Vue.js', 'Tailwind', 'Figma'],
    position: 'left',
  },
  {
    date: 'Sep 2021',
    title: 'Junior Developer',
    company: 'Innovation Labs',
    description: 'Contributed to open-source projects and internal tools. Learned modern dev practices.',
    skills: ['JavaScript', 'Git', 'REST APIs'],
    position: 'right',
  },
  {
    date: 'May 2021',
    title: 'Computer Science Degree',
    company: 'University',
    description: 'Graduated with honors. Focused on algorithms, software engineering, and web development.',
    skills: ['Data Structures', 'Algorithms', 'OOP'],
    position: 'left',
  },
];

// Positions along the curve for each experience
const positions = [
  { left: '48%', top: '8%' },
  { left: '56%', top: '28%' },
  { left: '44%', top: '48%' },
  { left: '52%', top: '68%' },
  { left: '48%', top: '88%' },
];

const PortfolioTimeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = React.useRef<HTMLDivElement>(null);  // <-- ADD THIS LINE


  React.useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // BUFFER: Adjust this value to control when progress bar starts (in pixels)
      // 0 = starts immediately after hero, 200 = starts 200px into timeline section, etc.
      const BUFFER = 230;
      const timelineStart = heroHeight + BUFFER;
      
      if (scrollY < timelineStart) {
        setScrollProgress(0);
        return;
      }
      
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const timelineEnd = scrollableHeight - 100; // Stop 100px before document end
      const timelineScrollable = timelineEnd - timelineStart;
      const currentScrollInTimeline = Math.min(scrollY - timelineStart, timelineScrollable);
      
      const progress = Math.min(90, Math.max(0, (currentScrollInTimeline / timelineScrollable) * 90));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full" style={{ fontFamily: 'Quicksand, sans-serif' }}>
      {/* HERO/LANDING PAGE - Full Screen */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        {/* Background Image - Replace the URL with your image path */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("qQiC7Ug5pQuX5B8Di7PchL-1200-80.jpg")',
            filter: 'blur(0px)'
            // Or use a gradient as placeholder:
            // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />

        {/* Glassmorphism Window Container */}
        <div className="relative z-10 w-1/ max-w-6xl h-4/5 rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-md bg-white/10">
          {/* Content inside the glass window */}
          <div className="relative w-full h-full flex items-center justify-center p-12">
            {/* Optional: Split layout like the example */}
            <div className="flex w-full h-full">
              {/* Left side - frosted */}

              {/* Right side - main content */}
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
                  Explore My Journey
                </button>
              </div>
            </div>

            {/* Navigation at top right */}
            <div className="absolute top-8 flex gap-8 text-sm text-white/80">
              <a href="#" className="hover:text-white transition-colors">HOME</a>
              <a href="#" className="hover:text-white transition-colors">ABOUT</a>
              <a href="#" className="hover:text-white transition-colors">CONTACT</a>
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
      <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-1000 via-slate-900 to-slate-950 text-white overflow-hidden py-16">
        {/* Gradient overlap at the top to blend with hero section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
        
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

          {/* Scroll Indicator Dot */}
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
                    className={`bg-slate-800/90 backdrop-blur-sm rounded-xl p-8 border-2 border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 shadow-xl ${
                      hoveredIndex === index ? 'scale-105' : 'scale-100'
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="text-sm text-blue-400 font-semibold mb-3">{exp.date}</div>
                    <h3 className="text-3xl font-bold mb-2">{exp.title}</h3>
                    <div className="text-blue-300 text-lg mb-4">{exp.company}</div>
                    <p className="text-gray-300 text-base mb-6 leading-relaxed">{exp.description}</p>
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