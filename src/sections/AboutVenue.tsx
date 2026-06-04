import React from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Brush, CupSoda, Users, Sparkles } from "lucide-react";

export const AboutVenue: React.FC = () => {
  const features = [
    {
      icon: <Brush className="text-clay" size={18} />,
      title: "Artistic Ambiance",
      desc: "Every corner is designed to inspire, with easels, lights, and color.",
    },
    {
      icon: <Sparkles className="text-ochre" size={18} />,
      title: "Creative Activities",
      desc: "Choose from painting canvases, clay modeling, tufting, and more.",
    },
    {
      icon: <Users className="text-sage" size={18} />,
      title: "Cozy Workshops",
      desc: "Guided sessions if we need inspiration, or we can just wing it.",
    },
    {
      icon: <CupSoda className="text-blush" size={18} />,
      title: "Cozy Cafe Vibes",
      desc: "Warm coffee, delicious snacks, and relaxing music in the background.",
    },
  ];

  return (
    <section className="relative w-full py-20 px-6 bg-cream overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full watercolor-blob-1 pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full watercolor-blob-2 pointer-events-none blur-3xl" />

      <div className="max-w-md mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-extrabold text-cocoa leading-tight">
            About The Place
          </h2>
          <div className="w-16 h-1 bg-clay mx-auto my-4 rounded-full" />
          <h3 className="font-serif text-lg font-bold text-clay mb-2">Ace Art Cafe, Hyderabad</h3>
          <p className="font-sans text-sm text-cocoa/80 leading-relaxed px-2">
            One of Hyderabad's most charming creative spaces where art, coffee, and conversations come together.
          </p>
        </motion.div>
      </div>

      <div className="max-w-md mx-auto space-y-8 px-2">
        {/* Visual Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="clay-card overflow-hidden bg-white p-3 border-2 border-cocoa shadow-md"
        >
          <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-cocoa/20">
            <img 
              src="/art_cafe_interior.png" 
              alt="Ace Art Cafe ambiance and activities" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-cocoa/30 py-1 px-3 rounded-full flex items-center space-x-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-cocoa font-sans uppercase tracking-wider">Hyderabad, Jubilee Hills</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-4">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex items-start space-x-3 p-4 rounded-2xl bg-white/50 border border-cocoa/10"
            >
              <div className="p-2 bg-white rounded-xl border border-cocoa/20 shadow-sm shrink-0">
                {feat.icon}
              </div>
              <div className="text-left">
                <h4 className="font-serif text-sm font-bold text-cocoa">{feat.title}</h4>
                <p className="mt-0.5 font-sans text-xs text-cocoa/70 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button to Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-4 flex flex-col items-center space-y-2"
        >
          <a
            href="https://maps.app.goo.gl/bpFgo852QMp679oUA?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 py-3.5 px-6 rounded-full border-2 border-cocoa bg-white text-cocoa font-bold text-sm shadow-[3px_3px_0px_#4A3525] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#4A3525] active:translate-y-[1px] active:shadow-[1px_1px_0px_#4A3525] transition-all"
          >
            <MapPin size={16} className="text-clay" />
            <span>Get Directions</span>
            <ExternalLink size={14} className="text-cocoa/60" />
          </a>
          <span className="text-[10px] text-cocoa/50 font-sans">Opens in Google Maps</span>
        </motion.div>
      </div>
    </section>
  );
};
