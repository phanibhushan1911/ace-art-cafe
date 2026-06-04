import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setUserMuted: (muted: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  setIsPlaying,
  setUserMuted,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        // Safe catch for browser autoplays blocks
        console.log("Audio play blocked by browser autoplay rules: ", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setIsPlaying(false);
      setUserMuted(true);
    } else {
      setIsPlaying(true);
      setUserMuted(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <audio
        ref={audioRef}
        src="/windswept.mp3"
        loop
      />
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full border-2 border-cocoa flex items-center justify-center shadow-lg transition-colors cursor-pointer ${
          isPlaying 
            ? "bg-[#25D366] text-white" 
            : "bg-[#FCFAF6] text-cocoa hover:bg-blush-light"
        }`}
        title={isPlaying ? "Mute Background Music" : "Play Romantic Music"}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Music size={18} />
            <span className="absolute top-[-4px] right-[-4px] w-2 h-2 rounded-full bg-red-400 animate-ping" />
          </motion.div>
        ) : (
          <VolumeX size={18} />
        )}
      </motion.button>
      
      {/* Soft tooltip bubble pointing out the music */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2 }}
            className="absolute left-14 bottom-1 bg-white border border-cocoa/20 py-1.5 px-3 rounded-xl shadow-md whitespace-nowrap text-[10px] font-bold text-cocoa pointer-events-none"
          >
            🎵 Play music?
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Quick import of AnimatePresence for the player tooltip
import { AnimatePresence } from "framer-motion";
