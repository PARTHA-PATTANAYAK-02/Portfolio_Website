import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import CommandPalette from "./components/layout/CommandPalette";
import DotField from "./components/ui/DotField";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PetBuddy = lazy(() => import("./components/ui/PetBuddy"));

export default function App() {
  const [loadPetBuddy, setLoadPetBuddy] = useState(false);
  const [routeReady, setRouteReady] = useState(false);
  const [minimumSplashElapsed, setMinimumSplashElapsed] = useState(false);

  const markRouteReady = useCallback(() => setRouteReady(true), []);

  useEffect(() => {
    const splashTimer = window.setTimeout(
      () => setMinimumSplashElapsed(true),
      700,
    );
    let timeout;
    let idleCallback;

    if ("requestIdleCallback" in window) {
      idleCallback = window.requestIdleCallback(
        () => setLoadPetBuddy(true),
        { timeout: 6000 },
      );
    } else {
      timeout = window.setTimeout(() => setLoadPetBuddy(true), 4500);
    }

    return () => {
      window.clearTimeout(splashTimer);
      window.clearTimeout(timeout);
      if (idleCallback !== undefined) {
        window.cancelIdleCallback(idleCallback);
      }
    };
  }, []);

  useEffect(() => {
    if (!routeReady || !minimumSplashElapsed) return undefined;

    const splash = document.getElementById("app-splash");
    if (!splash) return undefined;

    splash.classList.add("is-hidden");
    const removeTimer = window.setTimeout(() => splash.remove(), 450);
    return () => window.clearTimeout(removeTimer);
  }, [routeReady, minimumSplashElapsed]);

  return (
    <div className="relative min-h-screen text-foreground">
      {/* DotField Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotField
          dotRadius={1.5}
          dotSpacing={22}
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
        <Navbar />
        <CommandPalette />

        <main className="pb-28 lg:pb-0">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home onReady={markRouteReady} />} />
              <Route
                path="/contact"
                element={<Navigate to="/#contact" replace />}
              />
              <Route
                path="/projects"
                element={<Navigate to="/#projects" replace />}
              />
              <Route
                path="*"
                element={<NotFound onReady={markRouteReady} />}
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>

      <Suspense fallback={null}>
        {loadPetBuddy && <PetBuddy />}
      </Suspense>
    </div>
  );
}
