import React from "react";
import { motion } from "framer-motion";
import { Paintbrush } from "lucide-react";

interface HeroProps {
  onNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNext }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-6 overflow-hidden bg-cream-light z-10">
      
      {/* Background Watercolor Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full watercolor-blob-1 pointer-events-none blur-2xl" />
      <div className="absolute bottom-[20%] left-[-20%] w-[350px] h-[350px] rounded-full watercolor-blob-2 pointer-events-none blur-3xl" />
      
      {/* Floating Paint Strokes / SVG Shapes */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] opacity-20 pointer-events-none"
      >
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 25C25 10 70 5 115 15C115 15 80 35 40 30C15 27 5 25 5 25Z" fill="#BF583B" />
        </svg>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[8%] bottom-[35%] opacity-20 pointer-events-none"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 5C55 5 70 20 75 35C80 50 60 70 40 75C20 80 5 60 5 40C5 20 25 5 40 5Z" fill="#E8C5C8" />
        </svg>
      </motion.div>

      {/* Top Header Label */}
      <div className="pt-8 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-full border border-cocoa/30 bg-cream/50 backdrop-blur-sm shadow-sm"
        >
          <Paintbrush size={14} className="text-clay" />
          <span className="text-xs font-bold tracking-widest text-cocoa uppercase">A Creative Invitation</span>
        </motion.div>
      </div>

      {/* Hero Body Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-lg mx-auto py-12 px-2">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-cocoa leading-[1.15] font-extrabold tracking-tight"
        >
          Priya, <br />
          <span className="text-clay relative">
            I Have A Little
            <svg className="absolute left-0 bottom-[-8px] w-full h-[12px] text-blush pointer-events-none" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                d="M2 10C50 3 120 2 198 8" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </svg>
          </span> <br />
          Creative Idea...
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-base sm:text-lg text-cocoa/80 leading-relaxed font-sans max-w-[340px]"
        >
          What if we traded ordinary plans for colors, laughter, coffee, and a canvas?
        </motion.p>
      </div>

      {/* Bottom Button Action */}
      <div className="pb-12 flex justify-center">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={onNext}
          className="group relative flex items-center justify-center space-x-3 py-4 px-8 rounded-full border-2 border-cocoa bg-clay text-white font-bold text-lg shadow-[4px_4px_0px_#4A3525] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#4A3525] active:translate-y-[2px] active:shadow-[2px_2px_0px_#4A3525] transition-all cursor-pointer overflow-hidden"
        >
          {/* Subtle reflection overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          <span>See My Idea</span>
          <motion.span 
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
};
