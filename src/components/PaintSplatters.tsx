import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Splat {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  pathIndex: number;
}

const SPLAT_PATHS = [
  // Paint Splat Shape 1
  "M20,10 C25,2 35,5 38,12 C40,18 48,22 45,28 C42,35 32,38 25,35 C15,32 10,25 12,18 C14,12 15,18 20,10 Z",
  // Paint Splat Shape 2
  "M25,15 C35,10 40,25 35,32 C30,38 15,45 8,35 C2,25 8,10 18,8 C22,6 20,15 25,15 Z",
  // Paint Splat Shape 3 (Splattery with tiny drops)
  "M15,15 C22,8 28,12 30,18 C32,25 40,22 38,30 C35,38 25,38 18,35 C10,32 5,28 8,20 C10,12 12,18 15,15 Z",
];

const COLORS = [
  "rgba(217, 107, 67, 0.45)", // Clay
  "rgba(232, 197, 200, 0.6)",  // Blush
  "rgba(229, 169, 60, 0.45)", // Ochre
  "rgba(142, 168, 133, 0.5)",  // Sage
];

export const PaintSplatters: React.FC = () => {
  const [splats, setSplats] = useState<Splat[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Avoid splatters if clicked on drawing canvas or interactive buttons
      const target = e.target as HTMLElement;
      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest("canvas") || 
        target.closest(".clay-card") && !target.classList.contains("clay-card")
      ) {
        return;
      }

      const newSplat: Splat = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 50 + 40, // 40px to 90px
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        pathIndex: Math.floor(Math.random() * SPLAT_PATHS.length),
      };

      setSplats((prev) => [...prev, newSplat]);

      // Remove splat after 1.5 seconds
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== newSplat.id));
      }, 1500);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {splats.map((splat) => (
          <motion.div
            key={splat.id}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ 
              opacity: [0, 1, 0.8, 0], 
              scale: [0.1, 1, 1.05, 0.9],
              y: [0, 15, 30] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: splat.x - splat.size / 2,
              top: splat.y - splat.size / 2,
              width: splat.size,
              height: splat.size,
              transform: `rotate(${splat.rotation}deg)`,
            }}
          >
            <svg
              viewBox="0 0 50 50"
              width="100%"
              height="100%"
              fill={splat.color}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={SPLAT_PATHS[splat.pathIndex]} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
