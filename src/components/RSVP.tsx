import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { burstConfetti } from "@/lib/confetti";
import { Send, CheckCircle2 } from "lucide-react";

type Status = "yes" | "maybe" | "no";

export const RSVP = () => {
  const { playClick, playVictory } = useAudio();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("yes");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) { setError("Please enter your name."); return; }
    if (n.length > 80) { setError("Name is too long."); return; }
    setError("");

    // Save to local state (ready to swap for Supabase / Sheets later)
    try {
      const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");
      existing.push({ name: n, status, message: message.trim().slice(0, 500), at: new Date().toISOString() });
      localStorage.setItem("rsvps", JSON.stringify(existing));
    } catch {}

    playClick();
    setSubmitted(true);
    burstConfetti();
    playVictory();
  };

  return (
    <section id="rsvp" className="relative py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-pixel text-[10px] text-sky tracking-widest mb-4">★ RSVP ★</p>
          <h2 className="text-4xl md:text-5xl font-display text-ink">
            Will You <span className="gold-underline">Join Us?</span>
          </h2>
        </div>

        <div className="card-elegant p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-6 animate-fade-up">
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl text-ink mb-2">Thank you!</h3>
              <p className="text-ink-soft">Your RSVP has been saved.</p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setMessage(""); }}
                className="mt-6 font-pixel text-[10px] text-sky tracking-widest hover:text-gold"
              >
                + ADD ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="font-pixel text-[10px] text-ink-soft tracking-widest mb-2 block">YOUR NAME</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 focus:border-gold outline-none transition-colors"
                  placeholder="e.g. Sokha"
                  required
                />
              </div>

              <div>
                <label className="font-pixel text-[10px] text-ink-soft tracking-widest mb-2 block">WILL YOU ATTEND?</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 focus:border-gold outline-none transition-colors"
                >
                  <option value="yes">Yes, I'll be there! 🎉</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">Sorry, I can't join</option>
                </select>
              </div>

              <div>
                <label className="font-pixel text-[10px] text-ink-soft tracking-widest mb-2 block">MESSAGE (OPTIONAL)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 focus:border-gold outline-none transition-colors resize-none"
                  placeholder="Anything you'd like to share?"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                className="w-full px-7 py-4 rounded-full font-semibold text-white inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
              >
                <Send className="w-4 h-4" />
                Send RSVP
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
