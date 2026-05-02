import { Camera } from "lucide-react";
import { GROUP_PHOTO } from "@/assets/graduates/photos";

export const GroupPhoto = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-pixel text-[18px] text-sky tracking-[0.3em] mb-5">★  THE SQUAD  ★</p>
        <h2 className="section-heading mb-12 leading-tight">
          Our Graduation <span className="text-gold">Squad</span>
        </h2>

        <div className="relative inline-block w-full">
          <div className="absolute -top-8 -left-4 text-gold text-xl animate-sparkle">✦</div>
          <div className="absolute -top-4 right-2 text-sky text-lg animate-sparkle" style={{ animationDelay: "0.6s" }}>★</div>
          <div className="absolute -bottom-4 left-8 text-sky text-lg animate-sparkle" style={{ animationDelay: "1.1s" }}>✦</div>
          <div className="absolute -bottom-8 -right-4 text-gold text-xl animate-sparkle" style={{ animationDelay: "0.3s" }}>★</div>

          <div
            className="relative aspect-[16/10] rounded-[2rem] overflow-hidden flex items-center justify-center"
            style={{
              background: "var(--gradient-gold-soft)",
              border: "3px solid hsl(var(--gold))",
              boxShadow: "var(--shadow-invitation)",
            }}
          >
            <div className="absolute inset-3 rounded-[1.5rem] border border-white/60 pointer-events-none z-10" />
            {GROUP_PHOTO ? (
              <img src={GROUP_PHOTO} alt="Graduation squad group photo - Class of 2026" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8 relative">
                <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-white/70 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-pixel text-[9px] text-ink tracking-[0.25em] mb-2">GROUP PHOTO PLACEHOLDER</p>
                <p className="text-sm text-ink-soft" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Add your photo in <code>src/assets/graduates/photos.ts</code>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 text-base sm:text-lg text-ink-soft italic max-w-xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" } italic text-sky tracking-[0.3em] mb-4">★  Built from chaos, powered by memories, finished with caps & honors  ★</div>
        {/* <p className="mt-10 text-base sm:text-lg text-ink-soft italic max-w-xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
          ✦ Built from chaos, powered by memories, finished with caps & honors ✦ */}
        </p>
      </div>
    </section>
  );
};
