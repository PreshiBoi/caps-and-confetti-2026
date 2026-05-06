import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { GROUP_PHOTO } from "@/assets/graduates/photos";
import { useBlurUp } from "@/hooks/useBlurUp";

export const GroupPhoto = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const blurDataUrl = useBlurUp(isVisible ? GROUP_PHOTO : undefined);

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

    const section = document.getElementById("group-photo-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="group-photo-section" className="relative py-24 sm:py-32 px-4 sm:px-6">
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
              <div className="absolute inset-0 w-full h-full">
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
                  src={isVisible ? GROUP_PHOTO : undefined}
                  alt="Graduation squad group photo - Class of 2026"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                  decoding="async"
                />
              </div>
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

        <p className="mt-10 text-base sm:text-lg text-ink-soft italic max-w-xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Built from chaos, powered by 4.0 gpa, finished with caps & honors ★
        </p>
      </div>
    </section>
  );
};
