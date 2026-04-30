import { useAudio } from "@/contexts/AudioContext";
import { Volume2, VolumeX } from "lucide-react";

export const SoundButton = () => {
  const { soundOn, toggleSound } = useAudio();

  return (
    <button
      onClick={toggleSound}
      aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border-2 border-gold transition-all hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-gold)" }}
    >
      {soundOn ? <Volume2 className="w-4 h-4 text-gold" /> : <VolumeX className="w-4 h-4 text-ink-soft" />}
      <span className="font-pixel text-[9px] tracking-widest text-ink">
        SOUND: {soundOn ? "ON" : "OFF"}
      </span>
    </button>
  );
};
