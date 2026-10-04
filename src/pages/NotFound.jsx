import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  Home,
  ArrowLeft,
  Compass,
  Sparkles,
  FolderKanban,
  Mail,
} from "lucide-react";
import GlitchText from "../components/ui/GlitchText";

const MESSAGES = [
  "This page went to get coffee ☕",
  "Lost in the matrix 🟢",
  "404 — even Google can't find this 🔍",
  "You broke the internet 💥",
  "This URL is on vacation 🏖️",
  "Houston, we have a problem 🚀",
];

const QUICK_LINKS = [
  { label: "Home", path: "/", icon: Home },
  { label: "Projects", path: "/#projects", icon: FolderKanban },
  { label: "Contact", path: "/#contact", icon: Mail },
];

export default function NotFound() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((p) => (p + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32 lg:pb-16">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, hsl(262 83% 58%), transparent 70%)",
          }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <Motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, hsl(190 90% 55%), transparent 70%)",
          }}
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-custom text-center relative z-10">
        {/* Floating compass */}
        <Motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-8"
        >
          <Motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Compass className="w-8 h-8 text-primary" />
          </Motion.div>
        </Motion.div>

        {/* 404 glitch */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <GlitchText
            text="404"
            className="font-display font-bold text-[120px] sm:text-[180px] lg:text-[220px] leading-none tracking-tighter gradient-text"
          />
        </Motion.div>

        {/* Rotating message */}
        <div className="h-8 mb-4 relative">
          <Motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-xl font-medium text-foreground absolute inset-x-0"
          >
            {MESSAGES[msgIndex]}
          </Motion.p>
        </div>

        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground max-w-md mx-auto mb-10"
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </Motion.p>

        {/* Buttons */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <MagneticButton to="/">
            <Home className="w-4 h-4" />
            Take me home
          </MagneticButton>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border glass hover:border-primary/50 text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </Motion.div>

        {/* Quick links */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            Try these instead
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background/40 hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}

function MagneticButton({ to, children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  return (
    <Motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.5 }}
    >
      <Link
        to={to}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/60 transition-shadow"
      >
        {children}
      </Link>
    </Motion.div>
  );
}
