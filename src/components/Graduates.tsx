import { GraduationCap, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GRAD_PHOTOS } from "@/assets/graduates/photos";
import { useBlurUp } from "@/hooks/useBlurUp.ts";

const grads = [
  { name: "Tey Tey", quote: "Graduated with honors in surviving deadlines." },
  { name: "Mak Oun Orn Jit", quote: "Professional overthinker, certified graduate." },
  { name: "Nithpotiser", quote: "My GPA may vary, but my confidence is HD." },
  { name: "Manon", quote: "From student mode to unemployed legend mode." },
];

interface GraduateCardProps {
  name: string;
  quote: string;
  photo: string | null;
}

const GraduateCard = ({ name, quote, photo }: GraduateCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const blurDataUrl = useBlurUp(isVisible ? photo : undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="group relative card-elegant p-7 text-center transition-all duration-300 hover:-translate-y-2"
      style={{ transition: "var(--tr-bounce)" }}
    >
      <div className="absolute top-3 right-4 text-sky text-xs group-hover:text-gold transition-colors">★</div>
      <div className="absolute bottom-3 left-4 text-gold/50 text-xs">✦</div>

      <div className="relative mx-auto mb-5 w-44 aspect-[3/4]">
        <div className="absolute inset-0 rounded-lg bg-gold-glow blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
        <div
          className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            background: "var(--gradient-gold-soft)",
            border: "2.5px solid hsl(var(--gold))",
          }}
        >
          {photo ? (
            <div className="relative w-full h-full">
              {/* Blur-up placeholder */}
              {blurDataUrl && !imageLoaded && (
                <img
                  src={blurDataUrl}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-md"
                  style={{ willChange: "filter" }}
                />
              )}
              {/* Full resolution image */}
              <img
                src={isVisible ? photo : undefined}
                alt={`Portrait of ${name}, Class of 2026 Graduate`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <User className="w-12 h-12 text-gold" strokeWidth={1.5} />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-3">
        <GraduationCap className="w-4 h-4 text-gold" />
        <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-tight">{name}</h3>
      </div>

      <div className="h-px w-10 bg-sky mx-auto mb-4" />

      <p className="text-sm text-ink-soft italic leading-relaxed font-body" style={{ fontFamily: "'Nunito', sans-serif" }}>"{quote}"</p>
    </article>
  );
};

export const Graduates = () => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-pixel text-[18px] text-sky tracking-[0.3em] mb-5">★  THE GRADUATES  ★</p>
          <h2 className="section-heading leading-tight">
            Meet the <span className="text-gold">Graduates</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {grads.map((g) => {
            const photo = GRAD_PHOTOS[g.name];
            return (
              <GraduateCard key={g.name} name={g.name} quote={g.quote} photo={photo} />
            );
          })}
        </div>
      </div>
    </section>
  );
};
