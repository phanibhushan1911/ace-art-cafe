import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, HelpCircle, Mail, Sparkles } from "lucide-react";
import { triggerSingleHugeBurst, triggerRoseConfetti } from "../utils/confetti";

interface InvitationProps {
  onResponse: (response: "yes" | "think") => void;
  response: "yes" | "think" | null;
}

interface FloatingHeart {
  id: number;
  x: number; // percentage left
  delay: number;
  size: number;
}

export const Invitation: React.FC<InvitationProps> = ({ onResponse, response }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleYes = () => {
    onResponse("yes");
    triggerSingleHugeBurst();
    triggerRoseConfetti();
    
    // Spawn floating hearts
    const hearts: FloatingHeart[] = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10, // 10% to 90%
      delay: Math.random() * 2,
      size: Math.random() * 24 + 12,
    }));
    setFloatingHearts(hearts);
  };

  const handleThinkMove = () => {
    if (!hasMoved) {
      // Calculate a random displacement
      const displacements = [
        { x: -110, y: -40 },
        { x: 110, y: -40 },
        { x: -90, y: 60 },
        { x: 90, y: 60 },
      ];
      const selected = displacements[Math.floor(Math.random() * displacements.length)];
      setBtnOffset(selected);
      setHasMoved(true);
    }
  };

  const handleThinkClick = () => {
    if (hasMoved) {
      onResponse("think");
    }
  };

  return (
    <section className="relative w-full py-24 px-6 bg-cream overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20 min-h-[90vh] flex flex-col justify-center">
      
      {/* Background blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[320px] h-[320px] rounded-full watercolor-blob-4 pointer-events-none blur-3xl animate-pulse" />
      <div className="absolute bottom-[10%] left-[-15%] w-[300px] h-[300px] rounded-full watercolor-blob-1 pointer-events-none blur-3xl" />

      {/* Floating Hearts Animation overlay */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: "100vh", scale: 0.5, x: `${heart.x}vw` }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: "-10vh",
              scale: [0.5, 1.2, 1, 0.8],
              rotate: [0, Math.random() * 45 - 22] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, delay: heart.delay, ease: "easeOut" }}
            className="fixed bottom-0 text-clay pointer-events-none z-40"
            style={{ fontSize: `${heart.size}px` }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-md mx-auto w-full text-center relative z-20">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope State */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ type: "spring", stiffness: 100 }}
              onClick={() => setIsOpen(true)}
              className="clay-card bg-[#FCFAF6] p-8 border-2 border-cocoa cursor-pointer hover:translate-y-[-4px] active:translate-y-[0px] transition-all flex flex-col items-center justify-center space-y-6 aspect-[4/3] relative group"
            >
              <div className="absolute inset-0 border-8 border-double border-cocoa/10 rounded-2xl m-2 pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-blush-light border-2 border-cocoa flex items-center justify-center text-clay group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-black text-cocoa">
                  For Priya
                </h3>
                <p className="font-serif text-sm italic text-clay font-bold mt-1">
                  From Phani ✉️
                </p>
                <p className="font-sans text-[10px] text-cocoa/50 uppercase tracking-widest font-bold pt-2">
                  Tap to Break Wax Seal
                </p>
              </div>

              {/* Heart Seal wax mark representation */}
              <div className="absolute bottom-[-16px] w-10 h-10 rounded-full bg-clay border-2 border-cocoa flex items-center justify-center text-white shadow-md animate-bounce">
                <Heart size={16} fill="currentColor" />
              </div>
            </motion.div>
          ) : (
            /* Opened Invitation Letter State */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="clay-card bg-[#FDFDFB] p-8 border-2 border-cocoa relative overflow-hidden"
            >
              {/* Corner decorative designs */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cocoa/30 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-cocoa/30 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-cocoa/30 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cocoa/30 rounded-br-lg" />

              <AnimatePresence mode="wait">
                {response === null && (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8 py-6"
                  >
                    <div className="space-y-3">
                      <p className="font-serif text-lg italic text-clay font-bold">So Priya...</p>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-cocoa leading-tight">
                        Would you like to go on an Art Cafe Date with me?
                      </h3>
                    </div>

                    <div className="w-16 h-0.5 bg-cocoa/20 mx-auto" />

                    {/* Action buttons wrapper */}
                    <div className="relative h-32 flex flex-col items-center justify-center space-y-4 max-w-[280px] mx-auto">
                      
                      {/* YES button */}
                      <button
                        onClick={handleYes}
                        className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full border-2 border-cocoa bg-clay text-white font-bold text-base shadow-[3px_3px_0px_#4A3525] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#4A3525] active:translate-y-[1px] active:shadow-[1px_1px_0px_#4A3525] transition-all cursor-pointer"
                      >
                        <Heart size={16} fill="currentColor" />
                        <span>Yes, I'd Love To</span>
                      </button>

                      {/* THINK button */}
                      <motion.button
                        style={{
                          transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                        }}
                        onMouseEnter={handleThinkMove}
                        onTouchStart={handleThinkMove}
                        onClick={handleThinkClick}
                        transition={{ type: "spring", stiffness: 150, damping: 12 }}
                        className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-full border-2 border-cocoa bg-white text-cocoa font-bold text-base shadow-[3px_3px_0px_#4A3525] hover:bg-cream-light cursor-pointer select-none"
                      >
                        <HelpCircle size={16} />
                        <span>Let Me Think</span>
                      </motion.button>

                    </div>
                  </motion.div>
                )}

                {response === "yes" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 space-y-6 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-16 h-16 rounded-full bg-clay border-2 border-cocoa flex items-center justify-center text-white mx-auto shadow-md"
                    >
                      <Heart size={32} fill="currentColor" />
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl font-extrabold text-clay">
                        Yay!
                      </h3>
                      <p className="font-serif text-lg font-bold text-cocoa leading-relaxed max-w-[280px] mx-auto">
                        I can't wait to create memories with you. ❤️
                      </p>
                    </div>

                    <p className="text-xs text-cocoa/60 font-sans italic">
                      Proceed below to send your answer via WhatsApp!
                    </p>
                  </motion.div>
                )}

                {response === "think" && (
                  <motion.div
                    key="think-screen"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 space-y-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-ochre border-2 border-cocoa flex items-center justify-center text-white mx-auto shadow-md">
                      <Sparkles size={32} fill="currentColor" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-extrabold text-cocoa">
                        Take your time.
                      </h3>
                      <p className="font-serif text-lg font-bold text-clay leading-relaxed max-w-[280px] mx-auto">
                        Good art is never rushed. 🎨
                      </p>
                    </div>

                    <p className="text-xs text-cocoa/60 font-sans italic">
                      You can still send your answer below to let me know!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
