import React, { useRef, useState, useEffect } from "react";
import { Undo, Trash2, Check, X } from "lucide-react";

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
  onClose: () => void;
  title: string;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSave, onClose, title }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [color, setColor] = useState("#BF583B"); // Default terracotta
  const [lineWidth, setLineWidth] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Mixer states
  const [showMixer, setShowMixer] = useState(false);
  const [mixA, setMixA] = useState("#BF583B");
  const [mixB, setMixB] = useState("#E8C5C8");
  const [customMixedColor, setCustomMixedColor] = useState<string | null>(null);

  const blendColors = (color1: string, color2: string, percentage: number = 0.5) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    const r = Math.round(r1 * percentage + r2 * (1 - percentage));
    const g = Math.round(g1 * percentage + g2 * (1 - percentage));
    const b = Math.round(b1 * percentage + b2 * (1 - percentage));

    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  };

  const colors = [
    { name: "Terracotta", value: "#BF583B" },
    { name: "Blush", value: "#E8C5C8" },
    { name: "Ochre", value: "#E5A93C" },
    { name: "Sage", value: "#8EA885" },
    { name: "Cocoa", value: "#4A3525" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas display at high quality
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial background color (warm cream)
    ctx.fillStyle = "#FCFAF6";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw placeholder sketch texture or grid lines faintly
    ctx.strokeStyle = "rgba(74, 53, 37, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 20; i < rect.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, rect.height);
      ctx.stroke();
    }
    for (let i = 20; i < rect.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(rect.width, i);
      ctx.stroke();
    }

    // Save initial state
    setHistory([canvas.toDataURL()]);
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Check if touch event
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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Save current state to history
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => [...prev, dataUrl]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    setHistory(newHistory);

    const img = new Image();
    img.src = newHistory[newHistory.length - 1];
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rect = canvas.getBoundingClientRect();
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FCFAF6";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Redraw faint lines
    ctx.strokeStyle = "rgba(74, 53, 37, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 20; i < rect.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, rect.height);
      ctx.stroke();
    }
    for (let i = 20; i < rect.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(rect.width, i);
      ctx.stroke();
    }

    const dataUrl = canvas.toDataURL();
    setHistory((prev) => [...prev, dataUrl]);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL());
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/30 backdrop-blur-md p-4 animate-fade-in"
    >
      <div className="w-full max-w-md bg-cream border-2 border-cocoa shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-cocoa bg-cream-dark px-5 py-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-cocoa">{title}</h4>
            <p className="text-xs text-cocoa/70 font-sans">Doodle something beautiful...</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full border border-cocoa bg-white text-cocoa hover:bg-blush transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="relative flex-1 bg-white p-4 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full aspect-square max-w-[340px] border-2 border-cocoa/50 rounded-2xl cursor-crosshair touch-none shadow-inner"
          />
        </div>

        {/* Colors & Brush Controls */}
        <div className="bg-cream-dark border-t-2 border-cocoa p-4 space-y-4">
          
          {/* Colors Selection Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cocoa/80 uppercase tracking-wide">Colors</span>
            <div className="flex space-x-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setColor(c.value);
                    setShowMixer(false);
                  }}
                  style={{ backgroundColor: c.value }}
                  className={`w-6 h-6 rounded-full border-2 border-cocoa transition-transform ${
                    color === c.value && !showMixer ? "scale-125 ring-2 ring-cream" : "hover:scale-110"
                  }`}
                  title={c.name}
                />
              ))}
              {customMixedColor && (
                <button
                  onClick={() => {
                    setColor(customMixedColor);
                    setShowMixer(false);
                  }}
                  style={{ backgroundColor: customMixedColor }}
                  className={`w-6 h-6 rounded-full border-2 border-dashed border-clay transition-all ${
                    color === customMixedColor && !showMixer ? "scale-125 ring-2 ring-cream" : "hover:scale-110"
                  } animate-pulse`}
                  title="My Custom Mixed Color"
                />
              )}
            </div>
          </div>

          {/* Color Mixer Panel Toggle and Brush Size */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMixer(!showMixer)}
              className={`py-1.5 px-3 rounded-lg border text-xs font-bold transition-all ${
                showMixer 
                  ? "bg-clay text-white border-cocoa" 
                  : "bg-white text-cocoa border-cocoa/30 hover:bg-cream-light"
              }`}
            >
              🎨 {showMixer ? "Close Mixer" : "Mix Colors"}
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cocoa/80 uppercase tracking-wide">Size</span>
              <input
                type="range"
                min="2"
                max="16"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-24 accent-clay"
              />
            </div>
          </div>

          {/* Color Mixer Collapsible Interface */}
          {showMixer && (
            <div className="p-3 bg-white/70 border border-cocoa/20 rounded-xl space-y-3 animate-fade-in">
              <div className="flex justify-between items-center text-[10px] font-bold text-cocoa/70 uppercase">
                <span>Color A</span>
                <span>Color B</span>
                <span>Blend</span>
              </div>

              <div className="flex items-center justify-between">
                {/* Mix A select */}
                <div className="flex space-x-1">
                  {colors.map((c) => (
                    <button
                      key={`mixA-${c.name}`}
                      onClick={() => setMixA(c.value)}
                      style={{ backgroundColor: c.value }}
                      className={`w-4.5 h-4.5 rounded-full border border-cocoa transition-all ${
                        mixA === c.value ? "ring-2 ring-clay scale-110" : ""
                      }`}
                    />
                  ))}
                </div>

                {/* Plus */}
                <span className="text-xs font-bold text-cocoa/60">+</span>

                {/* Mix B select */}
                <div className="flex space-x-1">
                  {colors.map((c) => (
                    <button
                      key={`mixB-${c.name}`}
                      onClick={() => setMixB(c.value)}
                      style={{ backgroundColor: c.value }}
                      className={`w-4.5 h-4.5 rounded-full border border-cocoa transition-all ${
                        mixB === c.value ? "ring-2 ring-clay scale-110" : ""
                      }`}
                    />
                  ))}
                </div>

                {/* Equals */}
                <span className="text-xs font-bold text-cocoa/60">=</span>

                {/* Preview mixed color */}
                <div
                  style={{ backgroundColor: blendColors(mixA, mixB) }}
                  className="w-8 h-8 rounded-full border-2 border-cocoa shadow-inner shrink-0"
                />
              </div>

              <button
                onClick={() => {
                  const blended = blendColors(mixA, mixB);
                  setCustomMixedColor(blended);
                  setColor(blended);
                  setShowMixer(false);
                }}
                className="w-full py-1.5 rounded-lg bg-clay text-white text-xs font-bold border border-cocoa shadow-[1px_1px_0px_#4A3525] active:translate-y-[1px] active:shadow-none transition-all"
              >
                Use Blended Color
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-xl border-2 border-cocoa bg-white text-cocoa text-sm font-semibold hover:bg-cream-light disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <Undo size={16} />
              <span>Undo</span>
            </button>
            
            <button
              onClick={handleClear}
              className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-xl border-2 border-cocoa bg-white text-cocoa text-sm font-semibold hover:bg-blush-light transition-colors"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>

            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-xl border-2 border-cocoa bg-clay text-white text-sm font-bold shadow-[2px_2px_0px_#4A3525] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#4A3525] active:translate-y-[1px] active:shadow-[1px_1px_0px_#4A3525] transition-all"
            >
              <Check size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
