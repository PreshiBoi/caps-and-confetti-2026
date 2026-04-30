import { GraduationCap, User } from "lucide-react";

const grads = [
  { name: "Mike", quote: "Graduated with honors in surviving deadlines." },
  { name: "Alex", quote: "Professional overthinker, certified graduate." },
  { name: "Manith", quote: "My GPA may vary, but my confidence is HD." },
  { name: "Nithpotism", quote: "From student mode to unemployed legend mode." },
];

export const Graduates = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-pixel text-[10px] text-sky tracking-[0.3em] mb-5">★  THE GRADUATES  ★</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink">
            Meet the <span className="gold-underline">Graduates</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {grads.map((g) => (
            <article
              key={g.name}
              className="group relative card-elegant p-7 text-center transition-all duration-300 hover:-translate-y-2"
              style={{ transition: "var(--tr-bounce)" }}
            >
              {/* tiny pixel star accents */}
              <div className="absolute top-3 right-4 text-sky text-xs group-hover:text-gold transition-colors">★</div>
              <div className="absolute bottom-3 left-4 text-gold/50 text-xs">✦</div>

              {/* photo placeholder */}
              <div className="relative mx-auto mb-5 w-28 h-28">
                <div className="absolute inset-0 rounded-full bg-gold-glow blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                <div
                  className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    background: "var(--gradient-gold-soft)",
                    border: "2.5px solid hsl(var(--gold))",
                  }}
                >
                  <User className="w-12 h-12 text-gold" strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-gold" />
                <h3 className="font-display text-2xl text-ink">{g.name}</h3>
              </div>

              <div className="h-px w-10 bg-sky mx-auto mb-4" />

              <p className="text-sm text-ink-soft italic leading-relaxed">"{g.quote}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
