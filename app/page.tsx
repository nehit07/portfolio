import { NavBar } from "@/components/NavBar";
import { HeroTerminal } from "@/components/HeroTerminal";
import { ArchitectureMap } from "@/components/ArchitectureMap";
import { DeployedSystems } from "@/components/DeployedSystems";
import { SkillMatrix } from "@/components/SkillMatrix";
import { TechMarquee } from "@/components/TechMarquee";
import { OperationalLog } from "@/components/OperationalLog";
import { ContactNode } from "@/components/ContactNode";
import { ChatWidget } from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080810] overflow-x-hidden">
      {/* Fixed Navigation */}
      <NavBar />

      {/* SECTION 1 — Hero Terminal */}
      <HeroTerminal />

      {/* SECTION 2 — Architecture Map / Capabilities */}
      <ArchitectureMap />

      {/* DIVIDER — Tech Marquee */}
      <div className="border-t border-b border-white/[0.04]">
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
      <footer className="border-t border-white/[0.04] py-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">SYSTEM STATUS</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-emerald-500">All systems operational</span>
          </div>
          <p className="font-mono text-xs text-zinc-700 mt-2">
            © 2026 Nehit D. Vasavada
          </p>
        </div>
      </footer>
      {/* Floating AI Chat Widget */}
      <ChatWidget />
    </main>
  );
}
