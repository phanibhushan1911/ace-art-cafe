import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { InteractiveStars } from "./components/InteractiveStars";
import { MusicPlayer } from "./components/MusicPlayer";
import { PaintSplatters } from "./components/PaintSplatters";
import { ScratchCard } from "./components/ScratchCard";
import { Hero } from "./sections/Hero";
import { WhyDate } from "./sections/WhyDate";
import { Adventure } from "./sections/Adventure";
import { AboutVenue } from "./sections/AboutVenue";
import { Reasons } from "./sections/Reasons";
import { Invitation } from "./sections/Invitation";
import { MemoryWall } from "./sections/MemoryWall";
import { Ending } from "./sections/Ending";

function App() {
  const [response, setResponse] = useState<"yes" | "think" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMuted, setUserMuted] = useState(false);
  
  // Ref for Section 2 smooth scrolling
  const whyDateRef = useRef<HTMLDivElement | null>(null);

  // Top progress bar linked to scroll position
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  // Autoplay music when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80 && !isPlaying && !userMuted) {
        setIsPlaying(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying, userMuted]);

  const handleScrollToWhy = () => {
    whyDateRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!userMuted) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-cream-light text-cocoa overflow-x-hidden selection:bg-blush selection:text-cocoa select-none">
      
      {/* Handcrafted Paper texture grain overlay */}
      <div className="grain-overlay" />

      {/* Floating stars particle background */}
      <InteractiveStars />

      {/* Floating cassette lofi music player */}
      <MusicPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setUserMuted={setUserMuted}
      />

      {/* Interactive global paint click splatter effect */}
      <PaintSplatters />

      {/* Scroll indicator paint line */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-1.5 bg-clay origin-left z-50 rounded-r-full"
      />

      {/* Main Single Page Layout */}
      <main className="w-full flex flex-col relative z-10">
        
        {/* SECTION 1: Hero */}
        <Hero onNext={handleScrollToWhy} />

        {/* SECTION 2: Why This Date? */}
        <div ref={whyDateRef}>
          <WhyDate />
        </div>

        {/* SECTION 3: Creative Adventure */}
        <Adventure />

        {/* SECTION 4: About The Place */}
        <AboutVenue />

        {/* SECTION 5: Reasons I Thought Of You */}
        <Reasons />

        {/* SECTION: Secret Message Scratch Card */}
        <ScratchCard />

        {/* SECTION 6: The Invitation */}
        <Invitation onResponse={setResponse} response={response} />

        {/* SECTION 7: Memory Wall */}
        <MemoryWall />

        {/* SECTION 8: Final Romantic Ending */}
        <Ending response={response} />

      </main>
    </div>
  );
}

export default App;
