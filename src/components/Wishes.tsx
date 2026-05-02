import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { burstConfetti } from "@/lib/confetti";
import { sendToGoogleSheet } from "@/lib/googleSheets";
import { Heart, CheckCircle2, Loader2 } from "lucide-react";

export const Wishes = () => {
  const { playClick, playVictory } = useAudio();
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [hp, setHp] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    const n = name.trim();
    const w = wish.trim();
    if (!n) { setErr("Please tell us your name."); return; }
    if (!w) { setErr("Please share a wish."); return; }
    if (w.length > 500) { setErr("Wish too long (max 500)."); return; }
    setErr("");
    setSending(true);
    try {
      try {
        const list = JSON.parse(localStorage.getItem("wishes") || "[]");
        list.push({ name: n, wish: w, at: new Date().toISOString() });
        localStorage.setItem("wishes", JSON.stringify(list));
      } catch { }

      await sendToGoogleSheet({
        type: "WISH",
        guestName: n,
        attendance: "",
        relationship: "",
        message: w,
        userAgent: navigator.userAgent,
      });

      playClick();
      setDone(true);
      burstConfetti();
      playVictory();
    } catch {
      setErr("Sorry, we couldn't send your wish. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="wishes" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-pixel text-[10px] text-sky tracking-[0.3em] mb-5">★  WISHES  ★</p>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-ink leading-tight">
            Leave Us a <span className="text-gold">Wish</span>
          </h2>
        </div>

        <div className="relative card-invitation p-8 sm:p-12">
          <div className="pixel-corner-tl" />
          <div className="pixel-corner-tr" />
          <div className="pixel-corner-bl" />
          <div className="pixel-corner-br" />

          {done ? (
            <div className="text-center py-8 animate-fade-up">
              <div className="mx-auto mb-5 w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-gold-soft)" }}>
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-ink mb-2 leading-tight">Your wish has been sent.</h3>
              <p className="text-ink-soft">Thank you for celebrating with us!</p>
              <button
                onClick={() => { setDone(false); setName(""); setWish(""); }}
                className="mt-7 font-pixel text-[10px] text-sky tracking-[0.2em] hover:text-gold transition-colors"
              >
                + LEAVE ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <input
                type="text" value={hp} onChange={(e) => setHp(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
              />

              <div>
                <label className="label-pixel">Your Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className="input-field" required />
              </div>

              <div>
                <label className="label-pixel">Your Wish</label>
                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Share a kind word, memory, or blessing..."
                  required
                />
                <p className="text-xs text-ink-soft mt-1.5 text-right font-pixel tracking-wider">{wish.length}/500</p>
              </div>

              {err && <p className="text-sm text-destructive">{err}</p>}

              <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4" />}
                {sending ? "Sending..." : "Send Wish"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
