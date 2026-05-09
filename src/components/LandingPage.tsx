import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Users, 
  MessageSquare, 
  Code, 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  Check, 
  Star, 
  Zap, 
  Layers, 
  Target, 
  ChevronDown,
  X,
  Heart,
  Globe
} from "lucide-react";

interface MockDev {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tech: string[];
  bio: string;
  status: string;
}

const mockDevs: MockDev[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Full Stack Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    tech: ["TypeScript", "Next.js", "GraphQL", "Docker"],
    bio: "Ex-Stripe staff engineer. Building a high-performance Web3 developer match engine. Swipe right to co-found!",
    status: "Looking for Co-founder"
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "ML Research Engineer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    tech: ["Python", "PyTorch", "FastAPI", "Transformers"],
    bio: "AI researcher. Building custom agents that write code. Swipe right if you want to learn machine learning!",
    status: "Seeking Mentee"
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Lead Frontend Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    bio: "Passionate about micro-animations and spatial interfaces. Looking to help startup founders build slick MVPs.",
    status: "Open to Collaborating"
  }
];

function LandingPage(): React.ReactElement {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("co-founder");

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === "right") {
        setMatches((prev) => [...prev, mockDevs[activeCardIndex].name]);
      }
      setActiveCardIndex((prev) => (prev + 1) % mockDevs.length);
      setSwipeDirection(null);
    }, 300);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="bg-[#0B1120] text-slate-100 min-h-screen overflow-x-hidden selection:bg-indigo-500 selection:text-white relative font-sans">
      
      {/* Aurora mesh background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-violet-600 blur-[130px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500 blur-[150px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-pink-500 blur-[120px] animate-bounce duration-[10s]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero copy text */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Announcement badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-semibold text-violet-300 mb-8 backdrop-blur-md shadow-lg shadow-violet-500/5 hover:border-violet-500/50 transition-all cursor-default"
            >
              <Sparkles size={13} className="animate-spin text-pink-400" />
              <span>Now connecting 10,000+ developers worldwide</span>
            </motion.div>

            {/* Powerful headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6"
            >
              Connect with Developers Who{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent font-extrabold relative">
                Build the Future
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-gradient-to-r from-violet-400/40 via-indigo-400/40 to-pink-500/40 blur-sm"></span>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl mb-10"
            >
              Swipe right on your next coding partner. DevTinder is the ultimate platform for developers to collaborate on side projects, discover technical mentors, recruit founders, and build solid networks.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link 
                to="/signup" 
                className="btn btn-primary bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:opacity-90 border-none px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-indigo-500/25 text-white flex items-center justify-center gap-2 group transition-all"
              >
                Get Started Free
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button 
                onClick={() => document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })}
                className="btn btn-outline border-white/10 hover:border-white/30 hover:bg-white/5 px-8 py-4 rounded-xl text-base font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Explore Developers
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Trusted by builders at</p>
              <div className="flex flex-wrap gap-6 items-center opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-200">
                  <Globe size={16} /> GitHub Open Source
                </div>
                <div className="text-sm font-bold tracking-tight text-slate-200">
                  ⚡️ Vercel
                </div>
                <div className="text-sm font-bold tracking-tight text-slate-200">
                  ✦ Linear Community
                </div>
              </div>
            </motion.div>

          </div>

          {/* Hero interactive card swipes simulator */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Background glowing rings */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-indigo-500/10 pointer-events-none scale-90"></div>
            <div className="absolute w-[500px] h-[500px] rounded-full border border-violet-500/5 pointer-events-none scale-100"></div>

            <div className="relative w-full max-w-[340px] h-[480px]">
              
              {/* Swipe trigger animations */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCardIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    x: swipeDirection === "left" ? -250 : swipeDirection === "right" ? 250 : 0,
                    rotate: swipeDirection === "left" ? -15 : swipeDirection === "right" ? 15 : 0
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-white/10 rounded-2xl p-5 shadow-2xl shadow-indigo-950/50 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    {/* Header profile details */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50 relative">
                        <img 
                          src={mockDevs[activeCardIndex].avatar} 
                          alt={mockDevs[activeCardIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-white">{mockDevs[activeCardIndex].name}</h3>
                        <p className="text-xs text-indigo-400 font-semibold">{mockDevs[activeCardIndex].role}</p>
                      </div>
                    </div>

                    {/* Developer Status badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[11px] font-bold text-indigo-300 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                      <span>{mockDevs[activeCardIndex].status}</span>
                    </div>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {mockDevs[activeCardIndex].tech.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bio text */}
                    <p className="text-xs text-slate-300 leading-relaxed text-left font-sans bg-slate-900/40 p-3 rounded-xl border border-white/5">
                      "{mockDevs[activeCardIndex].bio}"
                    </p>
                  </div>

                  {/* Swipe controllers directly on card */}
                  <div className="flex items-center justify-around mt-4 pt-3 border-t border-white/5">
                    <button 
                      onClick={() => handleSwipe("left")}
                      className="w-11 h-11 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-all shadow-lg active:scale-90"
                    >
                      <X size={18} />
                    </button>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Swipe Right To Match</div>
                    <button 
                      onClick={() => handleSwipe("right")}
                      className="w-11 h-11 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/20 hover:bg-green-500 hover:text-white text-green-400 transition-all shadow-lg active:scale-90"
                    >
                      <Heart size={18} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Match Feed simulator output toast popup */}
            <div className="absolute bottom-[-60px] h-[40px] flex items-center justify-center">
              <AnimatePresence>
                {matches.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-xs font-bold shadow-lg border border-white/10 flex items-center gap-2"
                  >
                    <Heart size={12} className="text-pink-300 fill-pink-300" />
                    <span>Matched with {matches[matches.length - 1]}! Check your inbox!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Social Proof (Metrics Section) */}
      <section className="bg-slate-950/40 border-y border-white/5 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">10,000+</h3>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Registered Developers</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-l border-white/5">
              <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent mb-2">50,000+</h3>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Successful Swipes</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-l border-white/5">
              <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">1,200+</h3>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Side Projects Built</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-l border-white/5">
              <h3 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">95%</h3>
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Collaboration Match Rate</p>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <Zap size={12} />
            <span>Premium Core Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Code, Swipe, Connect, Build</h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We've stripped away unnecessary corporate hurdles to let engineers find, review, and collaborate with other developers as easily as checking out a new repository.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-slate-900/50 border border-white/5 hover:border-violet-500/30 p-8 rounded-2xl text-left transition-all hover:scale-[1.02] hover:bg-slate-900 duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-500 group-hover:text-white transition-all">
                <Users size={22} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Smart Developer Discovery</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Filter and discover developers by frameworks, programming languages, age, and professional experience.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-violet-400 hover:text-white transition-colors cursor-pointer">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 p-8 rounded-2xl text-left transition-all hover:scale-[1.02] hover:bg-slate-900 duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <MessageSquare size={22} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Real-Time Chat</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Start dynamic technical discussions or share code snippets once you match. Coordinate workflows instantly.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-indigo-400 hover:text-white transition-colors cursor-pointer">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/50 border border-white/5 hover:border-pink-500/30 p-8 rounded-2xl text-left transition-all hover:scale-[1.02] hover:bg-slate-900 duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all">
                <Code size={22} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Project Collaboration</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Post side project descriptions, specify technology requirements, and invite collaborators to write clean code together.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-pink-400 hover:text-white transition-colors cursor-pointer">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 p-8 rounded-2xl text-left transition-all hover:scale-[1.02] hover:bg-slate-900 duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <GraduationCap size={22} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Mentor Matching</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect with highly experienced developers from premium tech hubs. Learn best architectural practices.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-cyan-400 hover:text-white transition-colors cursor-pointer">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-slate-900/50 border border-white/5 hover:border-violet-500/30 p-8 rounded-2xl text-left transition-all hover:scale-[1.02] hover:bg-slate-900 duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-500 group-hover:text-white transition-all">
                <Briefcase size={22} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Recruiter Networking</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Allow tech recruiters and startup founders to discover your profile, look over projects, and send interview matches.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-violet-400 hover:text-white transition-colors cursor-pointer">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 p-8 rounded-2xl text-left transition-all hover:scale-[1.02] hover:bg-slate-900 duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Layers size={22} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">Skill-Based Recommendations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our smart engine matches profile compatibility by aligning complementary tech stacks automatically.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-indigo-400 hover:text-white transition-colors cursor-pointer">
              Learn More <ArrowRight size={12} className="ml-1" />
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-950/25 border-y border-white/5 relative z-10 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Three Steps to Great Connections</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Get signed up in minutes, show off what you build, and start swiping to discover matches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-slate-900/40 border border-white/5 rounded-2xl relative">
              <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-extrabold text-lg mb-6 shadow-lg shadow-violet-500/5">
                01
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">Create Your Profile</h3>
              <p className="text-sm text-slate-400">
                Sign up and upload a premium avatar. Complete fields detailing your skills, experiences, and open repository projects.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-slate-900/40 border border-white/5 rounded-2xl relative">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-extrabold text-lg mb-6 shadow-lg shadow-indigo-500/5">
                02
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">Discover Developers</h3>
              <p className="text-sm text-slate-400">
                Swipe right to connect or left to skip. Filter listings based on active stacks, mentorship preferences, or job positions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-slate-900/40 border border-white/5 rounded-2xl relative">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center font-extrabold text-lg mb-6 shadow-lg shadow-pink-500/5">
                03
              </div>
              <h3 className="font-bold text-xl mb-2 text-white">Build Side-by-Side</h3>
              <p className="text-sm text-slate-400">
                Start chats immediately upon a match. Collaborate on shared repositories, launch side startups, and learn together.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Developer Cards */}
      <section id="showcase" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-300 mb-4">
            <Star size={12} className="fill-pink-400 text-pink-400" />
            <span>Top Featured Developers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Meet Premium Innovators</h2>
          <p className="text-slate-400 text-sm sm:text-base">
            These developers are swiping right and seeking technical partners. Create your profile to match!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#161B22] border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:scale-[1.01] shadow-2xl">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" 
                alt="Elena" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 text-left">
                <h3 className="font-bold text-lg text-white">Elena Rostova</h3>
                <p className="text-xs text-slate-300">Senior Rust Architect</p>
              </div>
            </div>
            <div className="p-6 text-left">
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">Rust</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">WebAssembly</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">Solidity</span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Building secure, blazingly fast decentralised systems. Looking to connect with advanced React core engineers.
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Active 5m ago</span>
                <Link to="/signup" className="text-xs font-bold text-indigo-400 hover:text-white flex items-center gap-1 transition-colors">
                  Match Now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#161B22] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.01] shadow-2xl">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" 
                alt="David" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 text-left">
                <h3 className="font-bold text-lg text-white">David Miller</h3>
                <p className="text-xs text-slate-300">AI Tooling Engineer</p>
              </div>
            </div>
            <div className="p-6 text-left">
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">Python</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">LangChain</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">OpenAI</span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Creating autonomous AI agents that debug enterprise code. Looking for a frontend specialist for mock designs.
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Active 12m ago</span>
                <Link to="/signup" className="text-xs font-bold text-indigo-400 hover:text-white flex items-center gap-1 transition-colors">
                  Match Now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#161B22] border border-white/5 rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.01] shadow-2xl">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" 
                alt="Maya" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 text-left">
                <h3 className="font-bold text-lg text-white">Maya Patel</h3>
                <p className="text-xs text-slate-300">UX & Lead Architect</p>
              </div>
            </div>
            <div className="p-6 text-left">
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">React Native</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">Figma</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">GraphQL</span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Designer-turned-developer. Building mobile SaaS apps. Looking to connect with Node/PostgreSQL back-end engineers.
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Active 1h ago</span>
                <Link to="/signup" className="text-xs font-bold text-indigo-400 hover:text-white flex items-center gap-1 transition-colors">
                  Match Now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-950/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Success Stories</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              See how developers connected on DevTinder to build startups, scale products, and discover mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="p-8 rounded-2xl bg-[#161B22]/60 border border-white/5 text-left relative">
              <div className="flex gap-1 text-pink-400 mb-6">
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "I was searching for a back-end engineer to build a React Native prototype. I met Lucas on DevTinder within 3 days. We matched, shared a GitHub repository, and launched our beta MVP in two weeks!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                  <img src="https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=100&q=80" alt="Sarah" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Sarah Jenkins</h4>
                  <p className="text-xs text-slate-400">Co-founder, Codemates</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-2xl bg-[#161B22]/60 border border-white/5 text-left relative">
              <div className="flex gap-1 text-pink-400 mb-6">
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "As a junior developer, I struggled with system design. On DevTinder, I matched with a Principal Engineer from Amazon. His guidance and weekly technical code review completely leveled up my design patterns."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Tanaka" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Kenji Tanaka</h4>
                  <p className="text-xs text-slate-400">Full Stack Engineer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 rounded-2xl bg-[#161B22]/60 border border-white/5 text-left relative">
              <div className="flex gap-1 text-pink-400 mb-6">
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
                <Star size={16} className="fill-pink-400" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                "We sourced our first technical lead directly on DevTinder. Swiping right lets you bypass standard recruitment spam and immediately coordinate directly on key repos and technical requirements."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="Amanda" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Amanda Cross</h4>
                  <p className="text-xs text-slate-400">CTO, CloudScale</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
              <Target size={12} />
              <span>Target Use Cases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Designed For Every Career Stage</h2>
            <p className="text-slate-400 text-sm sm:text-base mb-8">
              Whether you want to build a unicorn startup, find experienced guidance, or source top-tier technical developers, DevTinder maps perfectly to your objectives.
            </p>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("co-founder")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeTab === "co-founder" 
                    ? "bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                }`}
              >
                <h4 className={`font-bold ${activeTab === "co-founder" ? "text-indigo-400" : "text-white"}`}>Find Co-founders</h4>
                <p className="text-xs text-slate-400 mt-1">Match with engineers whose skills complement yours and start building technical startups.</p>
              </button>

              <button 
                onClick={() => setActiveTab("mentor")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeTab === "mentor" 
                    ? "bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                }`}
              >
                <h4 className={`font-bold ${activeTab === "mentor" ? "text-indigo-400" : "text-white"}`}>Learn from Mentors</h4>
                <p className="text-xs text-slate-400 mt-1">Acquire system architecture and design pattern knowledge directly from industry experts.</p>
              </button>

              <button 
                onClick={() => setActiveTab("projects")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeTab === "projects" 
                    ? "bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                }`}
              >
                <h4 className={`font-bold ${activeTab === "projects" ? "text-indigo-400" : "text-white"}`}>Build Side Projects</h4>
                <p className="text-xs text-slate-400 mt-1">Create side mvps, open-source modules, and portfolio assets alongside dedicated coding peers.</p>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden min-h-[300px] flex items-center justify-center">
            
            {/* Visual background blurred orb inside container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 blur-[80px] pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {activeTab === "co-founder" && (
                <motion.div 
                  key="co-founder"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-left relative z-10"
                >
                  <h3 className="text-2xl font-black text-white">Find Your Technical Match</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Most startups fail because of founder misalignment. On DevTinder, you see exactly what developers build, their tech preferences, and core methodologies before matching. 
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400"><Check size={12} /></div>
                      <span>Filter Complementary Skills</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400"><Check size={12} /></div>
                      <span>Sync Developer Workflows</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "mentor" && (
                <motion.div 
                  key="mentor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-left relative z-10"
                >
                  <h3 className="text-2xl font-black text-white">Expert Guidance, On Demand</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Don't let architectural bottlenecks stall your development. Connect directly with senior and principal software developers who can validate your database configurations and design paths.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400"><Check size={12} /></div>
                      <span>Verify DB Architectures</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400"><Check size={12} /></div>
                      <span>Direct 1:1 Engineering Guidance</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div 
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-4 text-left relative z-10"
                >
                  <h3 className="text-2xl font-black text-white">Launch MVPs and Side Products</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Stop building in isolation. Match with other enthusiastic builders, distribute project task backlogs, share repository workflows, and launch gorgeous side projects that stand out.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400"><Check size={12} /></div>
                      <span>Share Repository Backlogs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400"><Check size={12} /></div>
                      <span>Collaborative GitHub Workflows</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-24 bg-slate-950/25 border-t border-white/5 relative z-10 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Got questions? We've got clear technical answers.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* FAQ 1 */}
            <div className="border border-white/5 rounded-xl bg-slate-900/50 backdrop-blur-md overflow-hidden text-left">
              <button 
                onClick={() => toggleFaq(0)}
                className="w-full p-6 flex justify-between items-center text-base font-bold text-white hover:bg-white/5 transition-colors"
              >
                <span>How is DevTinder structured for developers?</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${faqOpen === 0 ? "rotate-180 text-indigo-400" : ""}`} />
              </button>
              <AnimatePresence>
                {faqOpen === 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-6 text-sm text-slate-300 leading-relaxed">
                      DevTinder allows engineers to declare their framework specializations, repositories, and preferences. You get matches via right swipes, allowing you to bypass recruiting agencies and spam directly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 2 */}
            <div className="border border-white/5 rounded-xl bg-slate-900/50 backdrop-blur-md overflow-hidden text-left">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full p-6 flex justify-between items-center text-base font-bold text-white hover:bg-white/5 transition-colors"
              >
                <span>Can I search for mentors or mentees?</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${faqOpen === 1 ? "rotate-180 text-indigo-400" : ""}`} />
              </button>
              <AnimatePresence>
                {faqOpen === 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-6 text-sm text-slate-300 leading-relaxed">
                      Yes! You can specify your mentor/mentee preferences inside your profile bio and find experienced developers from leading global tech companies.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* FAQ 3 */}
            <div className="border border-white/5 rounded-xl bg-slate-900/50 backdrop-blur-md overflow-hidden text-left">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full p-6 flex justify-between items-center text-base font-bold text-white hover:bg-white/5 transition-colors"
              >
                <span>Is DevTinder free for standard developers?</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${faqOpen === 2 ? "rotate-180 text-indigo-400" : ""}`} />
              </button>
              <AnimatePresence>
                {faqOpen === 2 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-6 text-sm text-slate-300 leading-relaxed">
                      Absolutely. Creating profiles, swiping, establishing matches, and talking inside standard real-time chats is 100% free with no limits.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-16 text-center shadow-2xl">
          
          {/* Glowing gradient orbs in background of conversion block */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/20 blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Ready to Meet Your{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent font-extrabold">
                Next Coding Partner?
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10">
              Join thousands of developers matching and launching side projects. Signup takes less than 2 minutes. Start swiping right today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/signup" 
                className="btn btn-primary bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:opacity-90 border-none px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25 text-white flex items-center justify-center gap-2 group transition-all w-full sm:w-auto"
              >
                Create Free Profile
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/login" 
                className="btn btn-outline border-white/10 hover:border-white/30 hover:bg-white/5 px-8 py-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all w-full sm:w-auto"
              >
                Log In
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-2 font-bold text-lg text-white">
              <span>👩‍💻</span>
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-extrabold">
                devTinder
              </span>
            </div>

            <p className="text-xs text-slate-400 tracking-wide font-medium">
              &copy; {new Date().getFullYear()} devTinder. Built for engineers, by engineers. All rights reserved.
            </p>

            <div className="flex gap-4 items-center">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Globe size={18} />
              </a>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
