import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import ScrollProgress from "./components/layout/ScrollProgress";
import CommandPalette from "./components/layout/CommandPalette";
import DotField from "./components/ui/DotField";
import PetBuddy from "./components/ui/PetBuddy";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="relative min-h-screen text-foreground">
      {/* DotField Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={16}
          bulgeStrength={80}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={450}
          cursorForce={0.12}
          bulgeOnly
          gradientFrom="rgba(168, 85, 247, 0.35)"
          gradientTo="rgba(180, 151, 207, 0.2)"
          glowColor="#120F17"
        />
      </div>

      <div className="relative z-10">
        <ScrollProgress />
        <Navbar />
        <CommandPalette />

        <main className="pb-28 lg:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>

      <PetBuddy />
    </div>
  );
}
