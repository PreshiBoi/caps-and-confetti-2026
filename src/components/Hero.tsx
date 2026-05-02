import { GraduationCap, Sparkles } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const Hero = () => {
  const { playClick } = useAudio();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24">
      {/* soft glow orbs */}
      <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-gold-glow/45 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-soft/45 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl w-full">
        {/* floating decorative sparkles */}
        <div className="absolute -top-8 left-6 text-gold text-lg animate-sparkle">✦</div>
        <div className="absolute -top-2 right-10 text-sky text-base animate-sparkle" style={{ animationDelay: "0.7s" }}>★</div>
        <div className="absolute -bottom-6 left-16 text-sky text-lg animate-sparkle" style={{ animationDelay: "1.3s" }}>✦</div>
        <div className="absolute -bottom-3 -right-2 text-gold text-base animate-sparkle" style={{ animationDelay: "0.4s" }}>★</div>

        <div className="relative card-invitation px-6 py-14 sm:px-12 sm:py-16 md:px-20 md:py-20 text-center animate-fade-up">
          {/* pixel corners */}
          <div className="pixel-corner-tl" />
          <div className="pixel-corner-tr" />
          <div className="pixel-corner-bl" />
          <div className="pixel-corner-br" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream-warm/90 border border-gold/40 mb-10">
            <Sparkles className="w-3 h-3 text-gold" />
            <span className="font-pixel text-[10px] text-ink tracking-[0.18em]">CLASS OF 2026</span>
            <Sparkles className="w-3 h-3 text-gold" />
          </div>

          {/* Cap icon — large gold circle */}
          <div className="relative mx-auto mb-8 w-24 h-24 sm:w-28 sm:h-28">
            <div className="absolute inset-0 rounded-full bg-gold-glow blur-xl opacity-60" />
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center animate-pulse-glow"
              style={{ background: "var(--gradient-gold)" }}
            >
              <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14 text-white" strokeWidth={2} />
            </div>
          </div>

          <h1 className="font-display text-xl sm:text-3xl md:text-4xl leading-[1.5] text-ink mb-6">
            You're Invited to Our<br />
            <span className="text-gold">Graduation</span> Ceremony
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ink-soft mb-12 max-w-xl mx-auto leading-relaxed">
            Four friends. One journey. One unforgettable graduation day.
          </p>

          {/* Info chips */}
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-12">
            {[
              { l: "Date", v: "May 9, 2026" },
              { l: "Time", v: "12:30 – 5:00 PM" },
              { l: "Where", v: "Cambodia" },
            ].map((c) => (
              <div key={c.l} className="rounded-2xl bg-cream-warm/70 border border-gold/25 px-4 py-4">
                <div className="font-pixel text-[8px] text-sky tracking-[0.2em] mb-1.5">{c.l.toUpperCase()}</div>
                <div className="font-display text-xs sm:text-sm text-ink leading-snug">{c.v}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button onClick={() => { playClick(); scrollTo("rsvp"); }} className="btn-primary w-full sm:w-auto">
              <GraduationCap className="w-5 h-5" />
              Join the Celebration
            </button>
            <button onClick={() => { playClick(); scrollTo("countdown"); }} className="btn-secondary w-full sm:w-auto">
              See Countdown
            </button>
          </div>
        </div>

        {/* Bottom caption */}
        <p className="mt-8 text-center font-pixel text-[9px] text-ink-soft tracking-[0.25em]">
          ✦  A DIGITAL INVITATION  ✦
        </p>
      </div>
    </section>
  );
};
