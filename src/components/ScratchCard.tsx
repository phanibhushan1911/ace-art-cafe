import React, { useRef, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 320 * dpr;
    canvas.height = 150 * dpr;
    canvas.style.width = "320px";
    canvas.style.height = "150px";
    ctx.scale(dpr, dpr);

    // Fill with gorgeous clay/gold gradient mask
    const gradient = ctx.createLinearGradient(0, 0, 320, 150);
    gradient.addColorStop(0, "#D96B43"); // clay
    gradient.addColorStop(0.5, "#E5A93C"); // gold
    gradient.addColorStop(1, "#BF583B"); // terracotta
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 320, 150);

    // Add decorative paint texture speckles
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 320, Math.random() * 150, Math.random() * 4 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add Instruction Text
    ctx.fillStyle = "#FCFAF6";
    ctx.font = "bold 16px 'Fraunces', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎨 Scratch with your finger...", 160, 65);
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("To reveal a secret message", 160, 95);
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startScratching = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e);
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const stopScratching = () => {
    setIsDrawing(false);
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const imgData = ctx.getImageData(0, 0, 320 * dpr, 150 * dpr);
    const pixels = imgData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = pixels.length / 4;
    const ratio = transparentPixels / totalPixels;

    // If 40% cleared, reveal everything automatically
    if (ratio > 0.4) {
      setIsScratched(true);
    }
  };

  return (
    <section className="relative w-full py-20 px-6 bg-cream overflow-hidden z-10 border-t-2 border-dashed border-cocoa/20">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[250px] h-[250px] rounded-full watercolor-blob-1 pointer-events-none blur-3xl" />
      
      <div className="max-w-md mx-auto text-center mb-10">
        <h2 className="font-serif text-3xl font-extrabold text-cocoa leading-tight">
          A Secret For You
        </h2>
        <div className="w-16 h-1 bg-clay mx-auto my-4 rounded-full" />
      </div>

      <div className="max-w-md mx-auto flex items-center justify-center p-2">
        <div className="relative w-[320px] h-[150px] rounded-2xl overflow-hidden border-2 border-cocoa shadow-md bg-white">
          
          {/* Revealed Secret Underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-[#FCFAF6]">
            <Sparkles className="text-ochre mb-2 animate-bounce" size={20} />
            <p className="font-serif text-sm font-bold text-cocoa leading-relaxed">
              "P.S. Even if our art turns out terrible, I know the conversation will be a masterpiece." 🎨
            </p>
          </div>

          {/* Canvas Scratch Overlay */}
          {!isScratched && (
            <canvas
              ref={canvasRef}
              onMouseDown={startScratching}
              onMouseMove={scratch}
              onMouseUp={stopScratching}
              onMouseLeave={stopScratching}
              onTouchStart={startScratching}
              onTouchMove={scratch}
              onTouchEnd={stopScratching}
              className="absolute inset-0 cursor-pointer touch-none z-10"
            />
          )}
        </div>
      </div>
    </section>
  );
};
