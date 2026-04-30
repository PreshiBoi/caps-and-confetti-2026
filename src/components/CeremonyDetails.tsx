import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

const GCAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("Graduation Ceremony") +
  "&dates=20270509T053000Z/20270509T100000Z" + // 12:30-17:00 +07
  "&details=" + encodeURIComponent("Class of 2027 graduation ceremony — Mike, Alex, Manith & Nithpotism.") +
  "&location=" + encodeURIComponent("Cambodia") +
  "&ctz=Asia/Phnom_Penh";

const items = [
  { icon: Calendar, label: "Date", value: "May 9, 2027" },
  { icon: Clock, label: "Time", value: "12:30 PM – 5:00 PM" },
  { icon: MapPin, label: "Location", value: "Cambodia" },
];

export const CeremonyDetails = () => {
  const { playClick } = useAudio();
  return (
    <section id="details" className="relative py-24 px-4 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-pixel text-[10px] text-sky tracking-widest mb-4">★ DETAILS ★</p>
          <h2 className="text-4xl md:text-5xl font-display text-ink">
            Ceremony <span className="gold-underline">Details</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {items.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="card-elegant p-8 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div
                className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--gradient-sky)" }}
              >
                <Icon className="w-7 h-7 text-ink" strokeWidth={2} />
              </div>
              <div className="font-pixel text-[10px] text-gold tracking-widest mb-3">{label.toUpperCase()}</div>
              <div className="font-display text-2xl text-ink">{value}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={GCAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
          >
            <CalendarPlus className="w-5 h-5" />
            Add to Google Calendar
          </a>
        </div>
      </div>
    </section>
  );
};
