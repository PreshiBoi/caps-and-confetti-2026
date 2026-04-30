import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { burstConfetti } from "@/lib/confetti";
import { Heart, CheckCircle2 } from "lucide-react";

type Rel = "Friend" | "Family" | "Classmate" | "Teacher" | "Other";

export const Wishes = () => {
  const { playClick, playVictory } = useAudio();
  const [name, setName] = useState("");
  const [rel, setRel] = useState<Rel>("Friend");
  const [wish, setWish] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return; // bot
    const n = name.trim();
    const w = wish.trim();
    if (!n) { setErr("Please tell us your name."); return; }
    if (!w) { setErr("Please share a wish."); return; }
    if (w.length > 500) { setErr("Wish too long (max 500)."); return; }
    setErr("");

    try {
      const list = JSON.parse(localStorage.getItem("wishes") || "[]");
      list.push({ name: n, relationship: rel, wish: w, at: new Date().toISOString() });
      localStorage.setItem("wishes", JSON.stringify(list));
    } catch {}

    playClick();
    setDone(true);
    burstConfetti();
    playVictory();
  };

  return (
    <section id="wishes" className="relative py-24 px-4 bg-white/40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-pixel text-[10px] text-sky tracking-widest mb-4">★ WISHES ★</p>
          <h2 className="text-4xl md:text-5xl font-display text-ink">
            Leave Us a <span className="gold-underline">Wish</span>
          </h2>
        </div>

        <div className="card-elegant p-8 md:p-10">
          {done ? (
            <div className="text-center py-6 animate-fade-up">
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl text-ink mb-2">Your wish has been sent.</h3>
              <p className="text-ink-soft">Thank you for celebrating with us!</p>
              <button
                onClick={() => { setDone(false); setName(""); setWish(""); }}
                className="mt-6 font-pixel text-[10px] text-sky tracking-widest hover:text-gold"
              >
                + LEAVE ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              {/* honeypot */}
              <input
                type="text"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
              />

              <div>
                <label className="font-pixel text-[10px] text-ink-soft tracking-widest mb-2 block">YOUR NAME</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 focus:border-gold outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-pixel text-[10px] text-ink-soft tracking-widest mb-2 block">RELATIONSHIP</label>
                <select
                  value={rel}
                  onChange={(e) => setRel(e.target.value as Rel)}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 focus:border-gold outline-none"
                >
                  {["Friend", "Family", "Classmate", "Teacher", "Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className="font-pixel text-[10px] text-ink-soft tracking-widest mb-2 block">YOUR WISH</label>
                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-cream border border-gold/30 focus:border-gold outline-none resize-none"
                  placeholder="Share a kind word, memory, or blessing..."
                  required
                />
                <p className="text-xs text-ink-soft mt-1 text-right">{wish.length}/500</p>
              </div>

              {err && <p className="text-sm text-destructive">{err}</p>}

              <button
                type="submit"
                className="w-full px-7 py-4 rounded-full font-semibold text-white inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
              >
                <Heart className="w-4 h-4" />
                Send Wish
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
