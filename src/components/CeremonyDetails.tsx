import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

// Event: May 9, 2026, 12:30 PM – 5:00 PM Cambodia time (ICT, UTC+7)
// In UTC: 05:30 → 10:00 on 2026-05-09
const ICS_CONTENT = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Graduation Invitation//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "BEGIN:VEVENT",
  "UID:graduation-2026-05-09@invitation",
  "DTSTAMP:20260101T000000Z",
  "DTSTART:20260509T053000Z",
  "DTEND:20260509T100000Z",
  "SUMMARY:Graduation Ceremony",
  "DESCRIPTION:Class of 2026 graduation ceremony — Tey Tey\\, Mak Oun Orn Jit\\, Nithpotiser & Manon.",
  "LOCATION:Sokha Hotel Phnom Penh",
  // Reminder 1: 1 day before
  "BEGIN:VALARM",
  "ACTION:DISPLAY",
  "DESCRIPTION:Graduation Ceremony tomorrow!",
  "TRIGGER:-P1D",
  "END:VALARM",
  // Reminder 2: 5 hours before
  "BEGIN:VALARM",
  "ACTION:DISPLAY",
  "DESCRIPTION:Graduation Ceremony in 5 hours!",
  "TRIGGER:-PT5H",
  "END:VALARM",
  // Reminder 3: at start (event day)
  "BEGIN:VALARM",
  "ACTION:DISPLAY",
  "DESCRIPTION:Graduation Ceremony starting now!",
  "TRIGGER:PT0M",
  "END:VALARM",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

const ICS_DATA_URL =
  "data:text/calendar;charset=utf-8," + encodeURIComponent(ICS_CONTENT);

const items = [
  { icon: Calendar, label: "Date", value: "May 9, 2026" },
  { icon: Clock, label: "Time", value: "12:30 – 5:00 PM" },
  { icon: MapPin, label: "Location", value: "Sokha Hotel Phnom Penh" },
];

export const CeremonyDetails = () => {
  const { playClick } = useAudio();
  return (
    <section id="details" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-pixel text-[10px] text-sky tracking-[0.3em] mb-5">★  DETAILS  ★</p>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink leading-tight">
            Ceremony <span className="text-gold">Details</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {items.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="relative card-elegant p-8 sm:p-10 text-center hover:-translate-y-1.5 transition-all duration-300"
            >
              <div
                className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "var(--gradient-gold-soft)", border: "1.5px solid hsl(var(--gold) / 0.4)" }}
              >
                <Icon className="w-7 h-7 text-gold" strokeWidth={2} />
              </div>
              <div className="font-pixel text-[10px] text-sky tracking-[0.25em] mb-3">{label.toUpperCase()}</div>
              <div className="font-display text-base sm:text-lg font-bold text-ink leading-snug">{value}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={ICS_DATA_URL}
            download="graduation-ceremony.ics"
            onClick={playClick}
            className="btn-primary"
          >
            <CalendarPlus className="w-5 h-5" />
            Add to Calendar
          </a>
          <p className="mt-4 text-xs text-ink-soft" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Includes reminders 1 day before, 5 hours before, and at start.
          </p>
        </div>
      </div>
    </section>
  );
};
