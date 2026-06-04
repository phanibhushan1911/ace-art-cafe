import confetti from "canvas-confetti";

export const triggerRoseConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Warm, romantic shades: pinks, reds, golds
    const colors = ["#E8C5C8", "#D96B43", "#BF583B", "#FAF6F0", "#E5A93C"];

    // Left side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors,
    });
    
    // Right side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors,
    });
  }, 250);
};

export const triggerSingleHugeBurst = () => {
  const colors = ["#E8C5C8", "#D96B43", "#BF583B", "#E5A93C", "#8EA885"];
  
  // Center main blast
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.65 },
    colors,
  });

  // Secondary delayed sparkles
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
  }, 150);

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
  }, 150);
};
