import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Image as ImageIcon, Heart } from "lucide-react";
import { DrawingCanvas } from "../components/DrawingCanvas";

interface PolaroidItem {
  id: string;
  caption: string;
  rotation: string;
  floatDelay: number;
}

export const MemoryWall: React.FC = () => {
  const polaroids: PolaroidItem[] = [
    {
      id: "painting",
      caption: "Our First Painting",
      rotation: "rotate-[-4deg]",
      floatDelay: 0,
    },
    {
      id: "coffee",
      caption: "Our Favorite Coffee",
      rotation: "rotate-[3deg]",
      floatDelay: 1.5,
    },
    {
      id: "memories",
      caption: "Our Future Memories",
      rotation: "rotate-[-2deg]",
      floatDelay: 0.8,
    },
    {
      id: "laugh",
      caption: "Our Best Laugh",
      rotation: "rotate-[5deg]",
      floatDelay: 2.2,
    },
  ];

  // Store custom drawings per polaroid ID
  const [savedDrawings, setSavedDrawings] = useState<Record<string, string>>({});
  const [activeCanvas, setActiveCanvas] = useState<PolaroidItem | null>(null);

  const handleSaveDrawing = (dataUrl: string) => {
    if (activeCanvas) {
      setSavedDrawings((prev) => ({
        ...prev,
        [activeCanvas.id]: dataUrl,
      }));
      setActiveCanvas(null);
    }
  };

  return (
    <section className="relative w-full py-20 px-6 bg-cream-light overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-15%] w-[300px] h-[300px] rounded-full watercolor-blob-2 pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[320px] h-[320px] rounded-full watercolor-blob-4 pointer-events-none blur-3xl" />

      <div className="max-w-md mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-extrabold text-cocoa leading-tight">
            Memory Wall
          </h2>
          <div className="w-16 h-1 bg-clay mx-auto my-4 rounded-full" />
          <p className="font-sans text-base text-cocoa/80 leading-relaxed px-4">
            Four polaroids waiting for us. Click on any frame to paint or doodle what you think it will look like!
          </p>
        </motion.div>
      </div>

      {/* Polaroids Grid */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-6 px-2">
        {polaroids.map((item) => {
          const hasDrawing = !!savedDrawings[item.id];
          return (
            <motion.div
              key={item.id}
              animate={{ 
                y: [0, -8, 0],
                rotate: item.id === "painting" || item.id === "memories" ? [-3, -4, -3] : [3, 4, 3]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: item.floatDelay
              }}
              onClick={() => setActiveCanvas(item)}
              className={`bg-white border border-cocoa/20 p-3 pb-6 rounded-md shadow-lg ${item.rotation} hover:scale-105 hover:z-20 transition-transform cursor-pointer relative group`}
            >
              {/* Polaroid Photo slot */}
              <div className="aspect-square w-full bg-cream-dark rounded border border-cocoa/10 flex flex-col items-center justify-center relative overflow-hidden">
                {hasDrawing ? (
                  <img 
                    src={savedDrawings[item.id]} 
                    alt={item.caption} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center text-cocoa/40">
                    <ImageIcon size={28} className="stroke-1 group-hover:scale-110 group-hover:text-clay transition-all duration-300" />
                    <span className="text-[10px] mt-2 font-sans font-bold uppercase tracking-wider group-hover:text-cocoa/60">Tap to Sketch</span>
                  </div>
                )}

                {/* Edit Pencil icon overlay */}
                {hasDrawing && (
                  <div className="absolute inset-0 bg-cocoa/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="p-2 bg-white rounded-full border border-cocoa text-cocoa shadow-md">
                      <Paintbrush size={14} />
                    </div>
                  </div>
                )}
              </div>

              {/* Tape deco */}
              <div className="absolute top-[-10px] left-[calc(50%-18px)] w-9 h-4 bg-amber-100/50 border border-cocoa/10 rotate-[-4deg] opacity-70" />

              {/* Caption */}
              <p className="mt-4 text-center font-serif text-xs font-bold text-cocoa italic tracking-tight">
                {item.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Floating heart on bottom right of the section */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 right-8 text-blush opacity-40 pointer-events-none"
      >
        <Heart size={36} fill="currentColor" />
      </motion.div>

      {/* Inline drawing canvas modal */}
      <AnimatePresence>
        {activeCanvas && (
          <DrawingCanvas
            title={activeCanvas.caption}
            onClose={() => setActiveCanvas(null)}
            onSave={handleSaveDrawing}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
