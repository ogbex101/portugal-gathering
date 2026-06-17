import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import heroPoster from "@/assets/hero-portugal.jpg";
import { useMouseParallax } from "./use-parallax";

const HLS_SRC =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { x, y } = useMouseParallax();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: { destroy: () => void } | null = null;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    } else {
      import("hls.js")
        .then(({ default: Hls }) => {
          if (Hls.isSupported()) {
            const instance = new Hls({ enableWorker: true, lowLatencyMode: false });
            instance.loadSource(HLS_SRC);
            instance.attachMedia(video);
            hls = instance;
          }
        })
        .catch(() => {});
    }
    return () => hls?.destroy();
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-charcoal text-cream"
    >
      {/* Video layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: x * -20, y: y * -20, scale: 1.08 }}
      >
        <img
          src={heroPoster}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-90"
        />
      </motion.div>

      {/* Gradients */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,oklch(0.22_0.012_75/0.55)_0%,oklch(0.22_0.012_75/0.25)_35%,oklch(0.22_0.012_75/0.55)_70%,oklch(0.22_0.012_75/0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,oklch(0.22_0.012_75/0.35)_0%,oklch(0.22_0.012_75/0.65)_100%)]" />

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

      {/* Floating cards */}
      <motion.div
        style={{ x: x * 18, y: y * 12 }}
        className="pointer-events-none absolute left-[6%] top-[22%] z-10 hidden rounded-2xl glass px-4 py-3 text-xs text-charcoal shadow-soft lg:block"
      >
        <div className="font-serif text-base">14 — 21 June 2026</div>
        <div className="opacity-70">Comporta, Portugal</div>
      </motion.div>
      <motion.div
        style={{ x: x * -22, y: y * -10 }}
        className="pointer-events-none absolute right-[6%] top-[28%] z-10 hidden rounded-2xl glass px-4 py-3 text-xs text-charcoal shadow-soft lg:block"
      >
        <div className="font-serif text-base">40 guests</div>
        <div className="opacity-70">Intentionally small</div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ x: x * 6, y: y * 6 }}
        className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-cream/70"
        >
          Portugal · June 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
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
          className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Encontro is a gathering for forty curious people on the Atlantic
          coast — built around quiet conversation, hand-made food, and the
          particular light of a Portuguese June.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex justify-center"
        >
          <EmailCapture />
        </motion.div>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-cream/60"
      >
        Scroll
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