import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Pillars, Footer } from "@/components/landing/Sections";
import { DivineMessage } from "@/components/landing/Divine";
import { MemoryCardSection } from "@/components/landing/MemoryCard";
import { LanguageBridge } from "@/components/landing/LanguageBridge";
import { RoadmapTimeline } from "@/components/landing/RoadmapTimeline";
import { Feedback } from "@/components/landing/Feedback";
import { ArchiveModal, useArchive } from "@/components/landing/ArchiveModal";
import { RegistrationForm } from "@/components/landing/RegistrationForm";
import { SolidarityWall } from "@/components/landing/SolidarityWall";
import { useLang } from "@/components/landing/shared";
import type { Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruhulqudus Travel Companion | Free Program by Dr. Jehan Ziad" },
      {
        name: "description",
        content:
          "A free trilingual (AR/EN/TR) spiritual and linguistic companion for the Global Land Caravan for Palestine. Reserve your seat.",
      },
      { property: "og:title", content: "Ruhulqudus Travel Companion — روح القدس رفيق السفر" },
      {
        property: "og:description",
        content:
          "A bridge of good words and certainty: films, verses, seerah lessons and prayers in Arabic, English and Turkish. Free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, setLang } = useLang();
  const [selected, setSelected] = useState<Lang>("ar");
  const archive = useArchive();

  const pick = (l: Lang) => {
    setSelected(l);
    setLang(l);
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader lang={lang} setLang={setLang} />
      <Hero lang={lang} onPick={pick} />
      <MemoryCardSection lang={lang} />
      <DivineMessage lang={lang} />
      <Pillars lang={lang} onBrowse={archive.openAt} />
      <LanguageBridge lang={lang} />
      <RegistrationForm lang={lang} selected={selected} setSelected={setSelected} />
      <SolidarityWall lang={lang} />
      <RoadmapTimeline lang={lang} />
      <Feedback lang={lang} />
      <Footer lang={lang} />
      {archive.open && (
        <ArchiveModal lang={lang} tab={archive.tab} setTab={archive.setTab} onClose={archive.close} />
      )}
    </main>
  );
}
