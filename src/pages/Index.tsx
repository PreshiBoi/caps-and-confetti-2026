import { AudioProvider } from "@/contexts/AudioContext";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { CeremonyDetails } from "@/components/CeremonyDetails";
import { GroupPhoto } from "@/components/GroupPhoto";
import { Graduates } from "@/components/Graduates";
import { RSVP } from "@/components/RSVP";
import { Wishes } from "@/components/Wishes";
import { SoundButton } from "@/components/SoundButton";
import { BackToTop } from "@/components/BackToTop";
import { ConfettiRain } from "@/components/ConfettiRain";

const Index = () => {
  return (
    <AudioProvider>
      <ConfettiRain />
      <main className="relative z-10 min-h-screen overflow-x-hidden">
        <Hero />
        <Countdown />
        <CeremonyDetails />
        <GroupPhoto />
        <Graduates />
        <RSVP />
        <Wishes />

        <footer className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="font-pixel text-[18px] text-sky tracking-[0.3em] mb-4">★  CLASS OF 2026  ★</div>
            <p className="text-ink-soft italic text-base sm:text-lg">
              Made with luvvvvv, friendship, deadlines, and more international trips to come!
            </p>
            <p className="text-ink-soft italic text-base sm:text-lg">
              Honorable Mentions: SomaVatey, Kolney, chhy. See you on ur graudation, class of 2027 ;3
            </p>
          </div>
        </footer>

        <SoundButton />
        <BackToTop />
      </main>
    </AudioProvider>
  );
};

export default Index;
