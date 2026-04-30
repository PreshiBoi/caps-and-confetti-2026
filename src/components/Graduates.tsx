import { GraduationCap, User } from "lucide-react";

const grads = [
  { name: "Mike", quote: "Graduated with honors in surviving deadlines." },
  { name: "Alex", quote: "Professional overthinker, certified graduate." },
  { name: "Manith", quote: "My GPA may vary, but my confidence is HD." },
  { name: "Nithpotism", quote: "From student mode to unemployed legend mode." },
];

export const Graduates = () => {
  return (
    <section className="relative py-24 px-4 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-pixel text-[10px] text-sky tracking-widest mb-4">★ THE GRADUATES ★</p>
          <h2 className="text-4xl md:text-5xl font-display text-ink">
            Meet the <span className="gold-underline">Graduates</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {grads.map((g, i) => (
            <article
              key={g.name}
              className="group relative card-elegant p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_hsl(43_79%_46%/0.5)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Pixel star corner */}
              <div className="absolute top-2 right-3 font-pixel text-[10px] text-sky group-hover:text-gold transition-colors">★</div>
              <div className="absolute bottom-2 left-3 font-pixel text-[10px] text-gold/60">✦</div>

              {/* Photo placeholder */}
              <div
                className="mx-auto mb-5 w-24 h-24 rounded-full overflow-hidden bg-cream-deep flex items-center justify-center"
                style={{ border: "2px solid hsl(var(--gold))" }}
              >
                <User className="w-10 h-10 text-gold/60" strokeWidth={1.5} />
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-gold" />
                <h3 className="font-display text-2xl text-ink">{g.name}</h3>
              </div>

              <div className="h-px w-12 bg-sky mx-auto my-3" />

              <p className="text-sm text-ink-soft italic leading-relaxed">"{g.quote}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
