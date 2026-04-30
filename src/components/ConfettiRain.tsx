import { useEffect, useMemo, useState } from "react";

type Piece = {
  id: number;
  left: number;       // %
  size: number;       // px
  duration: number;   // s
  delay: number;      // s
  drift: number;      // px (horizontal end-drift)
  rot: number;        // deg
  opacity: number;
  color: string;
  shape: "square" | "rect" | "circle" | "star";
};

const COLORS = ["#D4A017", "#7EC8E3", "#FFF7E6", "#F0D78C", "#FFFFFF", "#B5E0F0"];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const makePieces = (count: number): Piece[] =>
  Array.from({ length: count }, (_, i) => {
    const shapes: Piece["shape"][] = ["square", "rect", "circle", "circle", "star"];
    return {
      id: i,
      left: rand(0, 100),
      size: rand(6, 12),
      duration: rand(9, 16),
      delay: rand(-12, 0),
      drift: rand(-80, 80),
      rot: rand(180, 720) * (Math.random() > 0.5 ? 1 : -1),
      opacity: rand(0.55, 0.95),
      color: COLORS[i % COLORS.length],
      shape: shapes[i % shapes.length],
    };
  });

export const ConfettiRain = () => {
  const pieces = useMemo(() => makePieces(36), []);
  const [scrollBoost, setScrollBoost] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const dy = Math.abs(window.scrollY - lastY);
        lastY = window.scrollY;
        // brief speed-up tied to scroll velocity
        setScrollBoost(Math.min(dy / 30, 1.2));
        setTimeout(() => setScrollBoost(0), 400);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {pieces.map((p) => {
        const dur = Math.max(4, p.duration - scrollBoost * 4);
        const style: React.CSSProperties = {
          position: "absolute",
          top: 0,
          left: `${p.left}%`,
          width: p.shape === "rect" ? p.size * 0.5 : p.size,
          height: p.shape === "rect" ? p.size * 1.4 : p.size,
          backgroundColor: p.shape === "star" ? "transparent" : p.color,
          color: p.color,
          borderRadius: p.shape === "circle" ? "9999px" : p.shape === "square" ? "2px" : "1px",
          animation: `fall ${dur}s linear ${p.delay}s infinite`,
          ["--cf-drift" as any]: `${p.drift}px`,
          ["--cf-rot" as any]: `${p.rot}deg`,
          ["--cf-opacity" as any]: p.opacity,
          opacity: 0,
          willChange: "transform, opacity",
          fontSize: `${p.size + 2}px`,
          lineHeight: 1,
          textAlign: "center",
        };
        return (
          <span key={p.id} style={style}>
            {p.shape === "star" ? "★" : ""}
          </span>
        );
      })}
    </div>
  );
};
