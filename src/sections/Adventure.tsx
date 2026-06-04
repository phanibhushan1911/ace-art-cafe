import React from "react";
import { motion } from "framer-motion";
import { MapPin, Palette, Paintbrush, Coffee, Smile } from "lucide-react";

interface TimelineStep {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  bgLight: string;
}

export const Adventure: React.FC = () => {
  const steps: TimelineStep[] = [
    {
      icon: <MapPin className="text-clay" size={20} />,
      title: "Step 1: Arrive at Ace Art Cafe",
      desc: "Meet at this beautiful creative space in Hyderabad. Cozy vibes and artistic energy will greet us.",
      color: "bg-clay",
      bgLight: "bg-[#FDF6F0]",
    },
    {
      icon: <Palette className="text-ochre" size={20} />,
      title: "Step 2: Choose Our Activity",
      desc: "From canvas painting to clay art, tufting, or crafting. We pick whatever catches our eye.",
      color: "bg-ochre",
      bgLight: "bg-[#FCFAF2]",
    },
    {
      icon: <Paintbrush className="text-terracotta" size={20} />,
      title: "Step 3: Create Something Together",
      desc: "Sit side by side, splash colors, shape clay, share brushes, and let our creativity run wild.",
      color: "bg-terracotta",
      bgLight: "bg-[#FAF2F2]",
    },
    {
      icon: <Coffee className="text-sage" size={20} />,
      title: "Step 4: Coffee & Conversations",
      desc: "Take a break, sip on warm cups of coffee/tea, chat about everything, and enjoy the cozy cafe ambiance.",
      color: "bg-sage",
      bgLight: "bg-[#F5F8F4]",
    },
    {
      icon: <Smile className="text-blush" size={20} />,
      title: "Step 5: Leave with Handmade Art",
      desc: "Head back home carrying our unique handcrafted masterpieces and memories of a beautiful day.",
      color: "bg-blush",
      bgLight: "bg-[#FAF2F3]",
    },
  ];

  return (
    <section className="relative w-full py-20 px-6 bg-cream-light overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[-15%] w-[300px] h-[300px] rounded-full watercolor-blob-4 pointer-events-none blur-3xl" />

      <div className="max-w-md mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-extrabold text-cocoa leading-tight">
            The Creative Adventure
          </h2>
          <div className="w-16 h-1 bg-clay mx-auto my-4 rounded-full" />
          <p className="font-sans text-base text-cocoa/80 leading-relaxed px-4">
            A simple walkthrough of how our perfect art date would unfold.
          </p>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-md mx-auto relative px-2">
        
        {/* Central vertical line */}
        <div className="absolute left-[29px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-cocoa/20" />

        {/* Steps */}
        <div className="space-y-10">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-start space-x-4 relative"
            >
              {/* Left timeline dot with icon */}
              <div className={`w-[48px] h-[48px] shrink-0 rounded-full border-2 border-cocoa bg-white flex items-center justify-center shadow-[2px_2px_0px_#4A3525] z-10`}>
                {step.icon}
              </div>

              {/* Step Detail Card */}
              <div className="flex-1 clay-card p-5 border-2 border-cocoa text-left bg-white">
                <h3 className="font-serif text-base font-bold text-cocoa">
                  {step.title}
                </h3>
                <p className="mt-1.5 font-sans text-sm text-cocoa/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
