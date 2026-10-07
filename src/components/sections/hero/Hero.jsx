import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, MapPin } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  GeeksForGeeksIcon,
  HackerRankIcon,
} from "../../ui/BrandIcons";
import TypingText from "./TypingText";
import StatsRow from "./StatsRow";

const HeroScene = lazy(() => import("./HeroScene"));

const TYPING_WORDS = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Java Developer",
  "Problem Solver",
];
const RESUME_URL =
  "https://drive.google.com/drive/folders/1rawC4WT_wXNY7aiTJYWIVnhXPCbBSGD1?usp=sharing";

const SOCIALS = [
  {
    icon: GithubIcon,
    href: "https://github.com/PARTHA-PATTANAYAK-02/",
    label: "GitHub",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/iampartha02/",
    label: "LinkedIn",
  },
  {
    icon: LeetCodeIcon,
    href: "https://leetcode.com/u/PARTHA_PATTANAYAK/",
    label: "LeetCode",
  },
  {
    icon: GeeksForGeeksIcon,
    href: "https://www.geeksforgeeks.org/profile/parthapatta6brh",
    label: "GeeksForGeeks",
  },
  {
    icon: HackerRankIcon,
    href: "https://www.hackerrank.com/profile/YOUR_HANDLE",
    label: "HackerRank",
  },
];

export default function Hero({ onReady }) {
  const [sceneReady, setSceneReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = (event) => setIsDesktop(event.matches);
    updateDesktop(mediaQuery);
    mediaQuery.addEventListener("change", updateDesktop);
    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return undefined;

    let timeout;
    let idleCallback;

    if ("requestIdleCallback" in window) {
      idleCallback = window.requestIdleCallback(
        () => setSceneReady(true),
        { timeout: 2500 },
      );
    } else {
      timeout = window.setTimeout(() => setSceneReady(true), 1200);
    }

    return () => {
      window.clearTimeout(timeout);
      if (idleCallback !== undefined) {
        window.cancelIdleCallback(idleCallback);
      }
    };
  }, [isDesktop]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-14 sm:pt-28 sm:pb-20 overflow-hidden">
      {/* Background gradient orbs — subtle, static-ish */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(262 83% 58%), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full blur-[140px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(190 90% 55%), transparent 70%)",
          }}
        />
      </div>

      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-8 items-center">
          {/* LEFT — Content */}
          <div className="relative z-10 order-1 lg:order-1">
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              Open to work
              <span className="text-muted-foreground">·</span>
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">Kolkata, India</span>
            </Motion.div>

            <Motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-6 text-sm sm:text-base font-mono text-primary flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Hello, I'm
            </Motion.p>

            <Motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-2 font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
            >
              Partha <span className="gradient-text">Pattanayak</span>
            </Motion.h1>

            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl"
            >
              <TypingText words={TYPING_WORDS} />
            </Motion.div>

            <Motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              I build <span className="text-foreground font-medium">fast</span>,{" "}
              <span className="text-foreground font-medium">beautiful</span>,
              and <span className="text-foreground font-medium">scalable</span>{" "}
              web applications. Passionate about clean code, smooth UX, and
              turning complex problems into simple solutions.
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticLink to="/#contact">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/60 transition-all">
                  Hire Me
                  <ArrowRight className="w-4 h-4" />
                </span>
              </MagneticLink>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border glass text-sm font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View CV
              </a>
            </Motion.div>

            {/* Socials — simple, no tilt */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 flex items-center gap-3 flex-wrap"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Find me
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-border" />
              <div className="flex items-center gap-2 flex-wrap">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group relative flex items-center justify-center p-2.5 rounded-xl glass hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-foreground text-background text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                        {s.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </Motion.div>

            <StatsRow />
          </div>

          {/* RIGHT — 3D Scene — simple, no tilt */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block order-2 w-full h-[560px] overflow-visible"
          >
            {sceneReady ? (
              <Suspense fallback={null}>
                <HeroScene isActive={isDesktop} />
              </Suspense>
            ) : isDesktop ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_68%)]"
              />
            ) : null}
          </Motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-border flex justify-center pt-1.5">
          <Motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-primary"
          />
        </div>
      </Motion.div>
    </section>
  );
}

function MagneticLink({ to, children }) {
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
      <Link to={to}>{children}</Link>
    </Motion.div>
  );
}
