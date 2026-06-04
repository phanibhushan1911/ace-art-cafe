import React from "react";
import { motion } from "framer-motion";
import { Heart, Palette, Sparkles, Coffee } from "lucide-react";

interface NoteItem {
  icon: React.ReactNode;
  text: string;
  bgClass: string;
  rotate: string;
}

export const Reasons: React.FC = () => {
  const notes: NoteItem[] = [
    {
      icon: <Heart className="text-ochre" size={24} fill="currentColor" />,
      text: "You make ordinary moments feel special",
      bgClass: "bg-[#FCFAF2] border-ochre/40",
      rotate: "rotate-[-2deg]",
    },
    {
      icon: <Palette className="text-clay" size={24} />,
      text: "You're someone I'd love to create memories with",
      bgClass: "bg-[#FDF6F0] border-clay/40",
      rotate: "rotate-[3deg]",
    },
    {
      icon: <Sparkles className="text-blush text-[#d3a4a7]" size={24} fill="currentColor" />,
      text: "I think we'd have a lot of fun together",
      bgClass: "bg-[#FAF2F3] border-blush/40",
      rotate: "rotate-[-1.5deg]",
    },
    {
      icon: <Coffee className="text-sage" size={24} />,
      text: "Coffee is better with good company",
      bgClass: "bg-[#F5F8F4] border-sage/40",
      rotate: "rotate-[2.5deg]",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const noteVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 }
    },
  };

  return (
    <section className="relative w-full py-20 px-6 bg-cream-light overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute bottom-[10%] left-[-15%] w-[300px] h-[300px] rounded-full watercolor-blob-3 pointer-events-none blur-3xl" />

      <div className="max-w-md mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-extrabold text-cocoa leading-tight">
            Reasons I Thought Of You
          </h2>
          <div className="w-16 h-1 bg-clay mx-auto my-4 rounded-full" />
          <p className="font-sans text-base text-cocoa/80 leading-relaxed px-4">
            Just a few simple details that made me immediately think of you for this art date.
          </p>
        </motion.div>
      </div>

      {/* Interactive Sticky Notes Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-md mx-auto grid grid-cols-2 gap-4 px-2"
      >
        {notes.map((note, idx) => (
          <motion.div
            key={idx}
            variants={noteVariants}
            whileHover={{ scale: 1.05, zIndex: 20, rotate: 0 }}
            className={`relative p-5 border border-cocoa/20 rounded-2xl shadow-md flex flex-col justify-between text-left aspect-square ${note.bgClass} ${note.rotate} cursor-default`}
          >
            {/* Small absolute pin tape on top of sticky note */}
            <div className="absolute top-[-8px] left-[calc(50%-16px)] w-8 h-4 bg-white/60 border border-cocoa/10 rotate-[2deg] shadow-sm pointer-events-none" />

            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl border border-cocoa/10 shadow-sm shrink-0">
              {note.icon}
            </div>
            
            <p className="font-serif text-sm font-bold text-cocoa/90 leading-normal mt-4">
              {note.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
