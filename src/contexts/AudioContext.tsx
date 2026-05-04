import { createContext, useContext, useEffect, useRef, useState, ReactNode, useCallback } from "react";

type AudioCtx = {
  soundOn: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playVictory: () => void;
  showAutoplayPrompt: boolean;
  dismissAutoplayPrompt: () => void;
};

const Ctx = createContext<AudioCtx | null>(null);

// Path for user to drop their music file later
const MUSIC_SRC = "/audio/live-while-we-are-young.mp3";

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  // Init background audio element
  useEffect(() => {
    const a = new Audio(MUSIC_SRC);
    a.loop = true;
    a.volume = 0.14;
    a.preload = "auto";
    (a as any).playsInline = true;
    audioRef.current = a;

    let started = false;
    const start = async () => {
      if (started) return;
      try {
        await a.play();
        started = true;
        setSoundOn(true);
        cleanup();
      } catch {
        // still blocked — wait for next interaction
      }
    };

    const events: (keyof DocumentEventMap)[] = [
      "pointerdown", "click", "touchstart", "keydown", "scroll",
    ];
    const onInteract = () => start();
    const cleanup = () => events.forEach(ev => document.removeEventListener(ev, onInteract));
    events.forEach(ev => document.addEventListener(ev, onInteract, { once: false, passive: true }));

    // Try immediately (works if browser permits)
    start();

    return () => {
      cleanup();
      a.pause();
      a.src = "";
    };
  }, []);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = (window.AudioContext || (window as any).webkitAudioContext);
      if (AC) ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const playClick = useCallback(() => {
    if (!soundOn) return;
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(1320, t + 0.06);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.14);
  }, [soundOn]);

  const playVictory = useCallback(() => {
    if (!soundOn) return;
    const ctx = getCtx();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C - cheerful 8-bit chime
    const start = ctx.currentTime;
    notes.forEach((freq, i) => {
      const t = start + i * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.1, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.27);
    });
    // sparkle tail
    const tailT = start + notes.length * 0.12;
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(1568, tailT);
    o2.frequency.exponentialRampToValueAtTime(2093, tailT + 0.4);
    g2.gain.setValueAtTime(0.0001, tailT);
    g2.gain.exponentialRampToValueAtTime(0.07, tailT + 0.05);
    g2.gain.exponentialRampToValueAtTime(0.0001, tailT + 0.5);
    o2.connect(g2).connect(ctx.destination);
    o2.start(tailT);
    o2.stop(tailT + 0.55);
  }, [soundOn]);

  const toggleSound = useCallback(() => {
    setSoundOn(prev => {
      const next = !prev;
      const a = audioRef.current;
      if (a) {
        if (next) {
          a.play().catch(() => {});
        } else {
          a.pause();
        }
      }
      return next;
    });
  }, []);

  const dismissAutoplayPrompt = useCallback(() => {
    setShowAutoplayPrompt(false);
    const a = audioRef.current;
    if (a) {
      a.play().then(() => setSoundOn(true)).catch(() => setSoundOn(false));
    }
    // Resume audio ctx for chimes
    getCtx()?.resume?.();
  }, []);

  return (
    <Ctx.Provider value={{ soundOn, toggleSound, playClick, playVictory, showAutoplayPrompt, dismissAutoplayPrompt }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAudio = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAudio must be used within AudioProvider");
  return c;
};
