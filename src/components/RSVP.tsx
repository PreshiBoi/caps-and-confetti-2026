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
    <section id="rsvp" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-pixel text-[10px] text-sky tracking-[0.3em] mb-5">★  RSVP  ★</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink">
            Will You <span className="gold-underline">Join Us?</span>
          </h2>
        </div>

        <div className="relative card-invitation p-8 sm:p-12">
          <div className="pixel-corner-tl" />
          <div className="pixel-corner-tr" />
          <div className="pixel-corner-bl" />
          <div className="pixel-corner-br" />

          {submitted ? (
            <div className="text-center py-8 animate-fade-up">
              <div className="mx-auto mb-5 w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-gold-soft)" }}>
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-display text-3xl text-ink mb-2">Thank you!</h3>
              <p className="text-ink-soft">Your RSVP has been saved.</p>
              <button
                onClick={() => { setSubmitted(false); setName(""); setMessage(""); }}
                className="mt-7 font-pixel text-[10px] text-sky tracking-[0.2em] hover:text-gold transition-colors"
              >
                + ADD ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="label-pixel">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="input-field"
                  placeholder="e.g. Sokha"
                  required
                />
              </div>

              <div>
                <label className="label-pixel">Will You Attend?</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="input-field appearance-none cursor-pointer"
                >
                  <option value="yes">Yes, I'll be there! 🎉</option>
                  <option value="maybe">Maybe</option>
                  <option value="no">Sorry, I can't join</option>
                </select>
              </div>

              <div>
                <label className="label-pixel">Message (optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Anything you'd like to share?"
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button type="submit" className="btn-primary w-full">
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
