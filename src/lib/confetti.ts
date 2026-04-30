import confetti from "canvas-confetti";

const COLORS = ["#FFF7E6", "#D4A017", "#7EC8E3", "#FFFFFF", "#F0D78C"];

export const burstConfetti = () => {
  const defaults = { spread: 70, ticks: 80, gravity: 0.9, decay: 0.94, startVelocity: 32, colors: COLORS };
  confetti({ ...defaults, particleCount: 80, origin: { y: 0.7 } });
  setTimeout(() => confetti({ ...defaults, particleCount: 60, angle: 60, origin: { x: 0, y: 0.8 } }), 150);
  setTimeout(() => confetti({ ...defaults, particleCount: 60, angle: 120, origin: { x: 1, y: 0.8 } }), 300);
};
