import { NavBar } from "@/components/NavBar";
import { HeroTerminal } from "@/components/HeroTerminal";
import { AboutSection } from "@/components/AboutSection";
import { ArchitectureMap } from "@/components/ArchitectureMap";
import { DeployedSystems } from "@/components/DeployedSystems";
import { SkillMatrix } from "@/components/SkillMatrix";
import { TechMarquee } from "@/components/TechMarquee";
import { OperationalLog } from "@/components/OperationalLog";
import { ContactNode } from "@/components/ContactNode";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Fixed Navigation */}
      <NavBar />

      {/* SECTION 1 — Hero Terminal */}
      <HeroTerminal />

      {/* SECTION 2 — About */}
      <AboutSection />

      {/* SECTION 3 — Architecture Map / Capabilities */}
      <ArchitectureMap />

      {/* DIVIDER — Tech Marquee */}
      <div style={{ borderTop: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}>
        <TechMarquee />
      </div>

      {/* SECTION 3 — Deployed Systems (Projects) */}
      <DeployedSystems />

      {/* SECTION 4 — Technical Stack Matrix */}
      <SkillMatrix />

      {/* SECTION 5 — Operational Log (Experience) */}
      <OperationalLog />

      {/* SECTION 6 — Contact Node */}
      <ContactNode />

      {/* Footer */}
      <Footer />

      {/* Floating AI Chat Widget */}
      <ChatWidget />
    </main>
  );
}
