import { useEffect, useState } from "react";

const TARGET = new Date("2027-05-09T12:30:00+07:00").getTime();

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
    <section id="countdown" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-pixel text-[10px] text-sky tracking-widest mb-4">★ COUNTDOWN ★</p>
        <h2 className="text-4xl md:text-5xl font-display mb-3 text-ink">
          Countdown to <span className="gold-underline">Our Big Day</span>
        </h2>
        <p className="text-ink-soft mb-12 text-lg">Every second counts when caps are about to fly.</p>

        {t ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { v: t.days, l: "DAYS" },
              { v: t.hours, l: "HOURS" },
              { v: t.minutes, l: "MIN" },
              { v: t.seconds, l: "SEC" },
            ].map((u) => (
              <div
                key={u.l}
                className="relative card-elegant pixel-corners p-6 md:p-8 hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                <div className="font-pixel text-3xl md:text-5xl text-gold leading-none mb-3 tabular-nums">
                  {String(u.v).padStart(2, "0")}
                </div>
                <div className="font-pixel text-[10px] text-ink-soft tracking-widest">{u.l}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-elegant p-12 animate-pulse-glow">
            <h3 className="text-3xl md:text-5xl font-display text-gold">🎓 Graduation Day is Here!</h3>
          </div>
        )}
      </div>
    </section>
  );
};
