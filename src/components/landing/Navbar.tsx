import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Primary"
        className={`glass flex items-center gap-2 rounded-full px-3 py-2 shadow-soft transition-all duration-500 sm:gap-6 sm:px-4 ${
          scrolled ? "scale-[0.98] shadow-lift" : ""
        }`}
      >
        <a href="#top" className="flex items-center pl-3 pr-1" aria-label="Innate — home">
          <Logo className="text-xl text-foreground" />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-3 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/60 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="ml-1 rounded-full bg-primary px-4 py-2 text-xs font-medium tracking-wide text-primary-foreground uppercase transition-all hover:shadow-glow hover:-translate-y-px sm:text-sm"
        >
          Reserve a Spot
        </a>
      </nav>
    </motion.header>
  );
}