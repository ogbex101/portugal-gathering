import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ChevronDown, X, ArrowUpRight, Plane, Sunrise, Utensils, Waves, Moon, Sparkles,
  Quote, ChevronLeft, ChevronRight,
} from "lucide-react";
import community from "@/assets/community-story.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import finalCta from "@/assets/final-cta.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

function SectionHeading({ eyebrow, title, lead, em }: { eyebrow: string; title: string; lead?: string; em?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-olive">{eyebrow}</p>
      <h2 className="text-balance font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
        {title}{" "}
        {em && <em className="italic text-earth">{em}</em>}
      </h2>
      {lead && (
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          {lead}
        </p>
      )}
    </motion.div>
  );
}

/* ───────────────────────── Community Story ───────────────────────── */
export function CommunityStory() {
  return (
    <section id="about" className="relative bg-background py-28 sm:py-36">
      <div className="container mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-olive">
            Our Story
          </p>
          <h2 className="text-balance font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
            Built around the table, not the stage. <em className="italic text-earth">Quiet by design.</em>
          </h2>
          <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground">
            <p>
              Encontro began in 2022 as a dinner for twelve in a stone house
              outside Lisbon. There were no speakers, no agenda — only long
              evenings, hand-rolled bread, and the slow recognition that we
              had been missing this kind of company.
            </p>
            <p>
              Four years later, it is still the same dinner. We just set a
              longer table.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["7", "days together"],
              ["40", "fellow travelers"],
              ["1", "long table"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-serif text-4xl text-forest">{n}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 lg:order-2"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <img
              src={community}
              alt="Guests sharing dinner under lantern light in a Portuguese olive grove"
              width={1280}
              height={1600}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl bg-card p-5 shadow-lift sm:block">
            <p className="font-serif text-lg leading-snug">
              &ldquo;The kind of week you measure in conversations, not photographs.&rdquo;
            </p>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
              Guest, 2024
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */
const galleryItems = [
  { src: g1, caption: "The farmhouse, Alentejo", aspect: "aspect-[4/5]" },
  { src: g3, caption: "Cliffs at Vicentina", aspect: "aspect-[4/3]" },
  { src: g2, caption: "Morning bread, hands at work", aspect: "aspect-square" },
  { src: g4, caption: "Fire on the dunes", aspect: "aspect-[4/5]" },
  { src: g5, caption: "First light, the deck", aspect: "aspect-square" },
  { src: g6, caption: "Azulejos, in the chapel hall", aspect: "aspect-[4/5]" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="relative bg-secondary/40 py-28 sm:py-36">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Six days, photographed only when no one was looking."
          em="Fragments."
        />
        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${item.aspect} overflow-hidden rounded-2xl bg-muted shadow-soft transition-all hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
              aria-label={`Open image: ${item.caption}`}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-4 bottom-4 translate-y-3 text-left font-serif text-base text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-lg">
                {item.caption}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute right-6 top-6 rounded-full glass p-2 text-cream"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <motion.img
              key={open}
              src={galleryItems[open].src}
              alt={galleryItems[open].caption}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-lift"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────────── Experience Highlights ───────────────────────── */
const experiences = [
  { img: g5, title: "Slow Mornings", desc: "Sunrise on the deck, coffee, no schedule until 10." },
  { img: g2, title: "Hands & Fire", desc: "Bread baked at dawn, fish grilled over driftwood." },
  { img: g3, title: "Wild Coastline", desc: "Long walks along the cliffs of the Vicentine coast." },
  { img: g4, title: "Long Nights", desc: "Bonfires under the stars and conversations that linger." },
];

export function Experience() {
  return (
    <section id="experience" className="relative bg-background py-28 sm:py-36">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="What the week feels like, in"
          em="four chapters."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={e.img}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl leading-snug">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              </div>
              <span className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-500 group-hover:border-accent/50" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Testimonials ───────────────────────── */
const testimonials = [
  { img: t1, quote: "I came for the food. I left with seven new friends and a different idea of what a week could be.", name: "Mariana Costa", role: "Architect · Lisbon" },
  { img: t2, quote: "Encontro has the rare quality of feeling both effortless and deeply considered. Every detail breathes.", name: "James Holloway", role: "Writer · London" },
  { img: t3, quote: "I have been to many retreats. None of them felt like coming home. This one does.", name: "Sigrid Wallin", role: "Therapist · Stockholm" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, []);

  const cur = testimonials[i];
  return (
    <section className="relative bg-forest py-28 text-cream sm:py-36">
      <div className="container mx-auto max-w-5xl px-6">
        <p className="mb-12 text-center text-[10px] uppercase tracking-[0.32em] text-cream/60">
          Voices
        </p>
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.name + "-img"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto size-44 overflow-hidden rounded-full ring-1 ring-cream/20 sm:size-56"
            >
              <img src={cur.img} alt={cur.name} loading="lazy" className="size-full object-cover" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.figure
              key={cur.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Quote className="size-6 text-gold" aria-hidden />
              <blockquote className="mt-4 text-balance font-serif text-2xl leading-snug sm:text-3xl md:text-[2.1rem]">
                {cur.quote}
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-serif text-lg">{cur.name}</div>
                <div className="text-xs uppercase tracking-wider text-cream/60">{cur.role}</div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          <button onClick={prev} aria-label="Previous" className="rounded-full border border-cream/20 p-2 transition hover:bg-cream/10">
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-3 bg-cream/30"}`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="rounded-full border border-cream/20 p-2 transition hover:bg-cream/10">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Event Journey ───────────────────────── */
const journey = [
  { icon: Plane, day: "Day 01", title: "Arrival & Welcome Supper", desc: "Driver pickup in Lisbon, drive to the farm, dinner outside." },
  { icon: Sunrise, day: "Day 02", title: "First Light on the Coast", desc: "Sunrise hike to the cliffs, then a long, lazy breakfast." },
  { icon: Utensils, day: "Day 03", title: "Hands in the Kitchen", desc: "Bread, fish, and wine — cooked together, eaten together." },
  { icon: Waves, day: "Day 04", title: "A Day at the Sea", desc: "Open ocean swim, secret beach, almost nothing planned." },
  { icon: Moon, day: "Day 05", title: "Stories Around the Fire", desc: "An evening of music, words, and the kind of dark you forget exists." },
  { icon: Sparkles, day: "Day 06", title: "Quiet, Then Goodbye", desc: "A morning of stillness. A last lunch. A reluctant departure." },
];

export function Journey() {
  return (
    <section id="journey" className="relative bg-background py-28 sm:py-36">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="The Week" title="A loose map of" em="seven days." />
        <ol className="relative mt-16 border-l border-border pl-8 sm:pl-12">
          {journey.map((j, idx) => {
            const Icon = j.icon;
            return (
              <motion.li
                key={j.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative pb-12 last:pb-0"
              >
                <span className="absolute -left-[42px] sm:-left-[58px] flex size-9 items-center justify-center rounded-full bg-card text-forest shadow-soft ring-1 ring-border">
                  <Icon className="size-4" />
                </span>
                <p className="text-[10px] uppercase tracking-[0.3em] text-olive">{j.day}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug">{j.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{j.desc}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */
const faqs = [
  { q: "Who attends Encontro?", a: "Forty curious people from a range of fields and backgrounds — writers, founders, doctors, artists, parents on sabbatical. The thread is intention, not industry." },
  { q: "What is included?", a: "Six nights of accommodation, all meals and drinks, ground transport from Lisbon, and every experience on the schedule. You only book the flight." },
  { q: "Is there an application?", a: "Yes. We read every request. It is gentle, not selective — we simply want the room to balance well." },
  { q: "What is the investment?", a: "From €3,400 per person, shared. Private rooms and partner pricing are available on request." },
  { q: "Can I come alone?", a: "Most guests do. By the second night, no one is alone anymore." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-secondary/40 py-28 sm:py-36">
      <div className="container mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Questions" title="The things most people" em="ask first." />
        <div className="mt-14 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-serif text-xl leading-snug sm:text-2xl">{f.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="c"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pr-10 text-base leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <img
        src={finalCta}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/55 to-charcoal/80" />
      <div className="relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-[10px] uppercase tracking-[0.32em] text-cream/70"
        >
          June 14 — 21, 2026
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Some weeks change very little.
          <br />
          <em className="italic text-gold">This one might.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Forty seats. One table. We open requests on a rolling basis until
          the room feels right.
        </motion.p>
        <motion.a
          href="mailto:hello@encontro.example"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm font-medium text-charcoal shadow-lift transition-all hover:-translate-y-0.5 hover:shadow-glow"
        >
          Request an invitation
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-gold" aria-hidden />
            <span className="font-serif text-2xl">Encontro</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            A gathering for forty people on the Atlantic coast of Portugal.
            One week each June.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex max-w-sm items-center rounded-full border border-cream/20 p-1 pl-4"
          >
            <label htmlFor="news" className="sr-only">Email</label>
            <input
              id="news"
              type="email"
              placeholder="Stay quietly in touch"
              className="flex-1 bg-transparent py-2 text-sm text-cream outline-none placeholder:text-cream/40"
            />
            <button className="rounded-full bg-cream px-4 py-2 text-xs font-medium text-charcoal transition hover:bg-gold">
              Join
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Navigate</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {["About", "Experience", "Gallery", "FAQ", "Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-cream/80 transition hover:text-gold">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-cream/50">Elsewhere</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {["Instagram", "Substack", "Press"].map((l) => (
              <li key={l}>
                <a href="#" className="text-cream/80 transition hover:text-gold">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© 2026 Encontro. Made slowly in Lisbon.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-cream">Privacy</a>
            <a href="#" className="hover:text-cream">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}