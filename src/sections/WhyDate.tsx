import React from "react";
import { motion } from "framer-motion";
import { Palette, Coffee, Sparkles, Smile } from "lucide-react";

interface CardItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  colorClass: string;
  borderColor: string;
}

export const WhyDate: React.FC = () => {
  const cards: CardItem[] = [
    {
      icon: <Palette className="text-clay" size={28} />,
      title: "Paint Something Fun",
      desc: "Splash colors on canvas and express ourselves, no rules attached.",
      colorClass: "bg-[#FDF6F0]",
      borderColor: "border-clay",
    },
    {
      icon: <Coffee className="text-ochre" size={28} />,
      title: "Enjoy Coffee Together",
      desc: "Sip warm lattes and let conversation flow as naturally as paint strokes.",
      colorClass: "bg-[#FCFAF2]",
      borderColor: "border-ochre",
    },
    {
      icon: <Sparkles className="text-blush text-[#d3a4a7]" size={28} fill="currentColor" />,
      title: "Make Beautiful Memories",
      desc: "Craft a unique day that is different from every other regular outing.",
      colorClass: "bg-[#FAF2F3]",
      borderColor: "border-blush",
    },
    {
      icon: <Smile className="text-sage" size={28} />,
      title: "Laugh At Our Art Skills",
      desc: "Doodle, scribble, make mistakes, and playfully judge each other's masterpieces.",
      colorClass: "bg-[#F5F8F4]",
      borderColor: "border-sage",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 80,
        damping: 15
      } 
    },
  };

  return (
    <section className="relative w-full py-20 px-6 bg-cream overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute bottom-[-10%] right-[-15%] w-[320px] h-[320px] rounded-full watercolor-blob-3 pointer-events-none blur-3xl" />
      
      <div className="max-w-md mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-extrabold text-cocoa leading-tight">
            Why This Date?
          </h2>
          <div className="w-16 h-1 bg-clay mx-auto my-4 rounded-full" />
          <p className="font-sans text-base text-cocoa/80 leading-relaxed px-4">
            Instead of another ordinary outing, I thought we could create something together.
          </p>
        </motion.div>
      </div>

      {/* Grid of Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-md mx-auto grid grid-cols-1 gap-6 px-2"
      >
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
            className={`clay-card p-6 flex items-start space-x-4 ${card.colorClass} border-2 border-cocoa`}
          >
            <div className="text-3xl p-3 bg-white rounded-2xl border border-cocoa/30 shadow-sm flex items-center justify-center">
              {card.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-serif text-lg font-bold text-cocoa">
                {card.title}
              </h3>
              <p className="mt-1 font-sans text-sm text-cocoa/70 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
