import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

// Event: May 9, 2026, 12:30 PM – 5:00 PM Cambodia time (Asia/Phnom_Penh)
const GOOGLE_CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Graduation Ceremony: Vatey, Channeath, Manith, Piseth",
    dates: "20260509T123000/20260509T170000",
    ctz: "Asia/Phnom_Penh",
    location: "Sokha Hotel Phnom Penh",
    details: "You're invited to our Graduation Ceremony!\n\nDate: May 9, 2026\nTime: 12:30 PM – 5:00 PM\nLocation: Sokha Hotel Phnom Penh\n\nReminders: Please set reminders 1 day before, 5 hours before, and at the start of the event.",
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
})();

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
          <p className="font-pixel text-[18px] text-sky tracking-[0.3em] mb-5">★  DETAILS  ★</p>
          <h2 className="section-heading leading-tight">
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
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="btn-primary"
          >
            <CalendarPlus className="w-5 h-5" />
            Add to Google Calendar
          </a>
          <p className="mt-4 text-9px text-ink-soft" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Opens Google Calendar. Tap Save to add the event.
          </p>
        </div>
      </div>
    </section>
  );
};

