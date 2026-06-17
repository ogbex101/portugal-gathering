import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import {
  CommunityStory,
  Gallery,
  Experience,
  Testimonials,
  Journey,
  FAQ,
  FinalCTA,
  Footer,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Encontro — A Gathering in Portugal, June 2026" },
      { name: "description", content: "Seven days of quiet conversation, slow meals, and salt air on the Atlantic coast. Forty travelers, one long table." },
      { property: "og:title", content: "Encontro — A Gathering in Portugal, June 2026" },
      { property: "og:description", content: "Seven days of quiet conversation, slow meals, and salt air on the Atlantic coast." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Encontro 2026 — A Gathering in Portugal",
          startDate: "2026-06-14",
          endDate: "2026-06-21",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Comporta, Portugal",
            address: { "@type": "PostalAddress", addressCountry: "PT", addressLocality: "Comporta" },
          },
          description: "A seven-day gathering for forty travelers on the Atlantic coast of Portugal.",
          organizer: { "@type": "Organization", name: "Encontro" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main id="main">
        <Hero />
        <CommunityStory />
        <Experience />
        <Gallery />
        <Testimonials />
        <Journey />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
