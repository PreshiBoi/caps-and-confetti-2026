import { Camera } from "lucide-react";

export const GroupPhoto = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-pixel text-[10px] text-sky tracking-widest mb-4">★ THE SQUAD ★</p>
        <h2 className="text-4xl md:text-5xl font-display text-ink mb-12">
          Our Graduation <span className="gold-underline">Squad</span>
        </h2>

        <div className="relative inline-block w-full">
          {/* Decorative sparkles */}
          <div className="absolute -top-6 -left-4 font-pixel text-gold text-sm animate-sparkle">★</div>
          <div className="absolute -top-4 -right-2 font-pixel text-sky text-sm animate-sparkle" style={{ animationDelay: "0.6s" }}>✦</div>
          <div className="absolute -bottom-4 left-8 font-pixel text-sky text-sm animate-sparkle" style={{ animationDelay: "1.1s" }}>✦</div>
          <div className="absolute -bottom-6 -right-4 font-pixel text-gold text-sm animate-sparkle" style={{ animationDelay: "0.3s" }}>★</div>

          <div
            className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-cream-deep flex items-center justify-center"
            style={{
              border: "3px solid hsl(var(--gold))",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            {/* Placeholder content — easy to replace with an <img src="..." /> */}
            <div className="text-center p-8">
              <Camera className="w-20 h-20 text-gold/60 mx-auto mb-4" strokeWidth={1.5} />
              <p className="font-pixel text-[10px] text-ink-soft tracking-widest">GROUP PHOTO PLACEHOLDER</p>
              <p className="text-sm text-ink-soft mt-2">Replace with your squad photo</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-lg text-ink-soft italic">
          Together we survived deadlines, exams, and group projects.
        </p>
      </div>
    </section>
  );
};
