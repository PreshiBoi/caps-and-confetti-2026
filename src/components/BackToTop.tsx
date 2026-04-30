import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export const BackToTop = () => {
  const [show, setShow] = useState(false);
  const { playClick } = useAudio();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
      aria-label="Back to top"
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-0.5 animate-fade-up"
      style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
