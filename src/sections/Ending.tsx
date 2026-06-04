import React from "react";
import { motion } from "framer-motion";
import { Send, Heart } from "lucide-react";

interface EndingProps {
  response: "yes" | "think" | null;
}

export const Ending: React.FC<EndingProps> = ({ response }) => {
  const getWhatsAppLink = () => {
    let message = "Hey! I'm checking out your creative art date invitation! 🎨✨";
    
    if (response === "yes") {
      message = "Hey! I just saw your beautiful art date invitation. Yes, I would love to go on an art date with you to Ace Art Cafe! 🎨☕❤️";
    } else if (response === "think") {
      message = "Hey! I saw your beautiful art date invitation. Let me think about it! Good art is never rushed. 😉🎨✨";
    }

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-6 bg-cream overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full watercolor-blob-1 pointer-events-none blur-3xl" />
      <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] rounded-full watercolor-blob-3 pointer-events-none blur-3xl animate-pulse" />

      {/* Top spacing */}
      <div className="pt-12" />

      {/* Center typography block */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Heart icon floating */}
          <motion.div 
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-clay flex justify-center"
          >
            <Heart size={44} fill="currentColor" className="drop-shadow-sm" />
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl text-cocoa leading-[1.3] font-bold italic">
            "Some masterpieces begin with a single brush stroke."
          </h2>

          <h3 className="font-serif text-xl sm:text-2xl text-clay leading-relaxed font-black">
            Maybe ours begins with a simple yes.
          </h3>
        </motion.div>

        {/* WhatsApp Send RSVP Button */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 w-full"
        >
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full flex items-center justify-center space-x-3 py-4 px-8 rounded-full border-2 border-cocoa bg-[#25D366] text-white font-bold text-lg shadow-[4px_4px_0px_#4A3525] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#4A3525] active:translate-y-[2px] active:shadow-[2px_2px_0px_#4A3525] transition-all cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            <Send size={18} />
            <span>
              {response === "yes" 
                ? "Send Your 'Yes' Response" 
                : response === "think" 
                  ? "Send Your 'Think' Response" 
                  : "Send Your Answer"}
            </span>
          </a>
          
          <p className="mt-3 text-xs text-cocoa/50 font-sans">
            Clicking will draft a WhatsApp message to share with me.
          </p>
        </motion.div>
      </div>

      {/* Footer credits */}
      <div className="pb-8 text-center text-xs font-serif text-cocoa/50 italic">
        <p>Made with courage, creativity, and a little hope by Phani. ❤️</p>
      </div>
    </section>
  );
};
