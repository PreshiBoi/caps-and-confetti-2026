import { useAudio } from "@/contexts/AudioContext";
import { Volume2, VolumeX, X } from "lucide-react";

export const SoundButton = () => {
  const { soundOn, toggleSound, showAutoplayPrompt, dismissAutoplayPrompt } = useAudio();

  return (
    <>
      {showAutoplayPrompt && (
        <div className="fixed bottom-24 right-4 z-50 max-w-xs animate-fade-up">
          <div className="card-elegant p-4 pr-10 relative" style={{ boxShadow: "var(--shadow-gold)" }}>
            <button
              onClick={() => dismissAutoplayPrompt()}
              aria-label="dismiss"
              className="absolute top-2 right-2 text-ink-soft hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm text-ink mb-3">Tap to start the celebration music 🎓</p>
            <button
              onClick={dismissAutoplayPrompt}
              className="w-full font-pixel text-[9px] tracking-widest text-white py-2 rounded-full"
              style={{ background: "var(--gradient-gold)" }}
            >
              ▶ PLAY MUSIC
            </button>
          </div>
        </div>
      )}

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
    </>
  );
};
