import { GraduationCap, Sparkles } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export const Hero = () => {
  const { playClick } = useAudio();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* background sparkles */}
      <div className="confetti-bg">
        {Array.from({ length: 28 }).map((_, i) => {
          const colors = ["#D4A017", "#7EC8E3", "#F0D78C", "#FFFFFF"];
          return (
            <span
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                background: colors[i % colors.length],
                animationDelay: `${(i % 9) * 0.4}s`,
              }}
            />
          );
        })}
      </div>

      {/* glow orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gold-glow/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-sky-soft/50 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl w-full">
        {/* Pixel star corners floating */}
        <div className="absolute -top-6 -left-6 font-pixel text-gold text-xs animate-sparkle">★</div>
        <div className="absolute -top-4 right-4 font-pixel text-sky text-xs animate-sparkle" style={{ animationDelay: "0.6s" }}>✦</div>
        <div className="absolute -bottom-6 left-12 font-pixel text-gold text-xs animate-sparkle" style={{ animationDelay: "1.2s" }}>★</div>
        <div className="absolute -bottom-4 -right-6 font-pixel text-sky text-xs animate-sparkle" style={{ animationDelay: "0.3s" }}>✦</div>

        <div
          className="relative bg-card rounded-[2rem] px-6 py-12 md:px-14 md:py-16 text-center animate-fade-up"
          style={{
            border: "2px solid hsl(var(--gold) / 0.55)",
            boxShadow: "var(--shadow-lift)",
          }}
        >
          {/* Pixel corner squares */}
          {[
            "top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"
          ].map((pos, i) => (
            <div key={i} className={`absolute ${pos} flex gap-0.5`}>
              <div className="w-1.5 h-1.5 bg-gold" />
              <div className="w-1.5 h-1.5 bg-sky" />
            </div>
          ))}

          {/* Cap icon circle */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center animate-pulse-glow"
               style={{ background: "var(--gradient-gold)" }}>
            <GraduationCap className="w-10 h-10 text-white" strokeWidth={2.2} />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-soft/60 border border-sky/40 mb-8">
            <Sparkles className="w-3 h-3 text-gold" />
            <span className="font-pixel text-[10px] text-ink tracking-widest">CLASS OF 2027</span>
            <Sparkles className="w-3 h-3 text-gold" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-ink leading-tight mb-6">
            You're Invited to Our<br />
            <span className="gold-underline">Graduation</span> Ceremony!
          </h1>

          <p className="text-lg md:text-xl text-ink-soft mb-10 max-w-xl mx-auto">
            Four friends. One journey. One graduation day.
          </p>

          {/* Info chips */}
          <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10">
            {[
              { l: "Date", v: "May 9, 2027" },
              { l: "Time", v: "12:30 – 5:00 PM" },
              { l: "Where", v: "Cambodia" },
            ].map((c) => (
              <div key={c.l} className="rounded-2xl bg-cream border border-gold/30 px-4 py-3">
                <div className="font-pixel text-[9px] text-sky tracking-wider mb-1">{c.l.toUpperCase()}</div>
                <div className="font-display text-lg text-ink">{c.v}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { playClick(); scrollTo("rsvp"); }}
              className="px-7 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
            >
              🎓 Join the Celebration
            </button>
            <button
              onClick={() => { playClick(); scrollTo("countdown"); }}
              className="px-7 py-4 rounded-full font-semibold text-ink bg-white border-2 border-sky hover:bg-sky-soft/40 transition-all hover:-translate-y-0.5"
            >
              See Countdown
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
