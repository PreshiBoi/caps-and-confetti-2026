import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-09T12:30:00+07:00").getTime();

const calc = () => {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export const Countdown = () => {
  const [t, setT] = useState(calc());

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-pixel text-[10px] text-sky tracking-[0.3em] mb-5">★  COUNTDOWN  ★</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-4 leading-tight">
          Countdown to <span className="text-gold">Our Big Day</span>
        </h2>
        <p className="text-ink-soft text-base sm:text-lg mb-14 max-w-xl mx-auto">
          Every second counts when caps are about to fly.
        </p>

        {t ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { v: t.days, l: "DAYS" },
              { v: t.hours, l: "HOURS" },
              { v: t.minutes, l: "MIN" },
              { v: t.seconds, l: "SEC" },
            ].map((u) => (
              <div
                key={u.l}
                className="relative card-elegant p-6 sm:p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="pixel-corner-tl !bg-sky" style={{ boxShadow: "8px 0 0 hsl(var(--gold)), 0 8px 0 hsl(var(--gold))" }} />
                <div className="pixel-corner-br !bg-sky" style={{ boxShadow: "-8px 0 0 hsl(var(--gold)), 0 -8px 0 hsl(var(--gold))" }} />

                <div className="font-pixel text-3xl sm:text-4xl md:text-5xl text-gold leading-none mb-4 tabular-nums">
                  {String(u.v).padStart(2, "0")}
                </div>
                <div className="font-pixel text-[9px] sm:text-[10px] text-ink-soft tracking-[0.25em]">{u.l}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-invitation p-12 animate-pulse-glow">
            <h3 className="font-display text-lg sm:text-2xl text-gold leading-tight">🎓 Graduation Day is Here!</h3>
          </div>
        )}
      </div>
    </section>
  );
};
