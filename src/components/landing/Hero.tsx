import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, Volume2, VolumeX, CalendarDays, MapPin, Users } from "lucide-react";
import heroPoster from "@/assets/hero-portugal.jpg";
import heroVideo from "@/assets/hero-glimpses.mp4";
import { useMouseParallax } from "./use-parallax";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { x, y } = useMouseParallax();
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setMuted(next);
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh items-center overflow-hidden bg-charcoal text-cream"
    >
      {/* Video layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: x * -16, y: y * -16, scale: 1.1 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic gradients + vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,oklch(0.22_0.012_75/0.45)_0%,oklch(0.22_0.012_75/0.15)_30%,oklch(0.22_0.012_75/0.4)_62%,oklch(0.22_0.012_75/0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_90%_at_30%_40%,transparent_0%,oklch(0.22_0.012_75/0.55)_100%)]" />
      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative orbs */}
      <motion.div
        aria-hidden
        style={{ x: x * 30, y: y * 30 }}
        className="pointer-events-none absolute -left-24 top-1/3 z-[2] size-72 rounded-full bg-gold/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ x: x * -40, y: y * -20 }}
        className="pointer-events-none absolute -right-24 bottom-1/4 z-[2] size-96 rounded-full bg-forest/30 blur-3xl"
      />

      {/* Sound toggle */}
      <motion.button
        type="button"
        onClick={toggleSound}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-5 top-24 z-20 inline-flex items-center gap-2 rounded-full glass px-3.5 py-2 text-[11px] font-medium uppercase tracking-wider text-charcoal shadow-soft transition hover:shadow-lift sm:right-8"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        <span className="hidden sm:inline">{muted ? "Sound off" : "Sound on"}</span>
      </motion.button>

      {/* Content — editorial, anchored lower-left */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-32 sm:pb-32">
        <motion.div style={{ x: x * 6, y: y * 6 }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/70"
          >
            <span className="h-px w-10 bg-gold/70" />
            Portugal · June 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            A week of slow days,
            <br />
            long meals, and{" "}
            <em className="font-serif italic text-gold">something</em>
            <br className="hidden sm:block" />
            you can&apos;t quite name.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg"
          >
            Encontro is a gathering for forty curious people on the Atlantic
            coast — built around music, movement, quiet conversation, and the
            particular light of a Portuguese June.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10"
          >
            <EmailCapture />
          </motion.div>

          {/* Meta strip */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream/15 pt-6 text-sm"
          >
            {[
              { icon: CalendarDays, label: "Dates", value: "14 — 21 June 2026" },
              { icon: MapPin, label: "Where", value: "Comporta, Portugal" },
              { icon: Users, label: "Size", value: "40 guests" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="size-4 text-gold" aria-hidden />
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.25em] text-cream/50">{label}</dt>
                  <dd className="font-serif text-base text-cream">{value}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-cream/60"
      >
        Scroll
        <span className="h-8 w-px overflow-hidden bg-cream/20">
          <motion.span
            className="block h-3 w-px bg-gold"
            animate={{ y: [-12, 24] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function EmailCapture() {
  const [state, setState] = useState<"idle" | "open" | "loading" | "done">("idle");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "open") inputRef.current?.focus();
    if (state === "done") {
      const t = setTimeout(() => {
        setState("idle");
        setEmail("");
      }, 2600);
      return () => clearTimeout(t);
    }
  }, [state]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setState("loading");
    setTimeout(() => setState("done"), 1100);
  };

  return (
    <div className="relative w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" && (
          <motion.button
            key="cta"
            type="button"
            onClick={() => setState("open")}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-medium tracking-wide text-charcoal shadow-lift transition-all hover:shadow-glow hover:-translate-y-0.5"
          >
            Request an invitation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        )}

        {(state === "open" || state === "loading") && (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center overflow-hidden rounded-full bg-cream/95 p-1.5 pl-5 shadow-lift backdrop-blur"
          >
            <label htmlFor="hero-email" className="sr-only">
              Email address
            </label>
            <input
              ref={inputRef}
              id="hero-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@somewhere.world"
              className="flex-1 bg-transparent py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/40"
              disabled={state === "loading"}
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-all hover:shadow-glow disabled:opacity-70"
            >
              {state === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>Send <ArrowRight className="size-3.5" /></>
              )}
            </button>
          </motion.form>
        )}

        {state === "done" && (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-3 rounded-full bg-primary/90 px-7 py-4 text-sm font-medium text-primary-foreground shadow-lift"
          >
            <Check className="size-4" />
            We&apos;ll be in touch soon.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}