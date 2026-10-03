import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeContext";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredId, setHoveredId] = useState(null);
  const [themeWave, setThemeWave] = useState(null);
  const tiltX = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 24,
  });
  const tiltY = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 24,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  const trackNavPointer = (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    event.currentTarget.style.setProperty("--spot-x", `${x}px`);
    event.currentTarget.style.setProperty("--spot-y", `${y}px`);
    tiltX.set(((y / bounds.height) - 0.5) * -2.2);
    tiltY.set(((x / bounds.width) - 0.5) * 2.8);
  };

  const resetNavPointer = () => {
    setHoveredId(null);
    tiltX.set(0);
    tiltY.set(0);
  };

  const changeTheme = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setThemeWave({
      id: Date.now(),
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
      color: theme === "dark" ? "rgba(255, 208, 78, 0.22)" : "rgba(139, 92, 246, 0.24)",
    });
    toggleTheme();
  };

  return (
    <>
      <Motion.header
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className="container-custom">
          <Motion.nav
            onPointerMove={trackNavPointer}
            onMouseLeave={resetNavPointer}
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformPerspective: 1400,
              "--spot-x": "50%",
              "--spot-y": "50%",
            }}
            className={`relative isolate flex items-center justify-between gap-2 overflow-hidden rounded-[1.35rem] border px-3 py-2.5 backdrop-blur-2xl transition-all duration-500 sm:px-4 ${
              theme === "dark"
                ? "border-white/10 bg-slate-950/75 shadow-[0_12px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "border-white/70 bg-white/75 shadow-[0_12px_48px_rgba(92,66,150,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]"
            } ${scrolled ? "shadow-[0_16px_52px_rgba(0,0,0,0.34)]" : ""}`}
          >
            <Motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent"
              animate={{ opacity: scrolled ? 0.45 : 0.9, scaleX: [0.72, 1, 0.72] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <Motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(300px circle at var(--spot-x) var(--spot-y), rgba(139,92,246,0.18), transparent 72%)",
              }}
              animate={{ opacity: hoveredId ? 1 : 0.32 }}
              transition={{ duration: 0.3 }}
            />

            <BrandMark onClick={() => scrollTo("home")} />

            <ul className="relative hidden items-center gap-0 lg:flex xl:gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                const isHovered = hoveredId === item.id;
                return (
                  <li key={item.id}>
                    <Motion.button
                      onClick={() => scrollTo(item.id)}
                      onMouseEnter={() => setHoveredId(item.id)}
                      whileHover={{ y: -2, scale: 1.045 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative rounded-xl px-2 py-2 text-xs font-medium transition-colors duration-200 xl:px-3 xl:text-[13px] ${
                        isActive
                          ? "text-foreground"
                          : isHovered
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {isActive && (
                        <Motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-xl border border-primary/25 bg-gradient-to-b from-primary/15 to-primary/[0.04] shadow-[0_0_24px_rgba(139,92,246,0.12)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {isHovered && !isActive && (
                        <Motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 rounded-xl border border-border/70 bg-muted/60"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {isActive && (
                        <Motion.span
                          layoutId="nav-active-dot"
                          className="absolute -bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Motion.button>
                  </li>
                );
              })}
            </ul>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 xl:ml-0">
              <Motion.button
                type="button"
                onClick={openPalette}
                whileHover={{ y: -1, scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Open command palette"
                className="group inline-flex h-10 items-center gap-2 rounded-xl border border-border/80 bg-background/55 px-2.5 text-muted-foreground shadow-inner transition-all hover:border-primary/45 hover:text-foreground sm:px-3"
              >
                <Search className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                <span className="hidden text-xs font-medium sm:inline">Search</span>
                <kbd className="hidden rounded-md border border-border/80 bg-muted/70 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground lg:inline-block">
                  Ctrl K
                </kbd>
              </Motion.button>

              <ThemeToggle theme={theme} toggle={changeTheme} />

              <Motion.button
                type="button"
                onClick={() => scrollTo("contact")}
                whileHover={{ y: -2, scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                className="group hidden h-10 items-center gap-2 rounded-xl border border-white/15 bg-gradient-to-br from-primary via-violet-600 to-fuchsia-500 px-4 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(139,92,246,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] transition-shadow hover:shadow-[0_10px_30px_rgba(139,92,246,0.52)] sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Motion.button>
            </div>
          </Motion.nav>
        </div>
      </Motion.header>

      {themeWave &&
        createPortal(
          <AnimatePresence>
            <Motion.div
              key={themeWave.id}
              aria-hidden="true"
              initial={{
                clipPath: `circle(0px at ${themeWave.x}px ${themeWave.y}px)`,
                opacity: 0.9,
              }}
              animate={{
                clipPath: `circle(${Math.hypot(window.innerWidth, window.innerHeight)}px at ${themeWave.x}px ${themeWave.y}px)`,
                opacity: 0,
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => setThemeWave(null)}
              className="pointer-events-none fixed inset-0 z-[110] mix-blend-screen"
              style={{
                background: `radial-gradient(circle at ${themeWave.x}px ${themeWave.y}px, ${themeWave.color}, transparent 64%)`,
              }}
            />,
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function ThemeToggle({ theme, toggle }) {
  return (
    <Motion.button
      type="button"
      onClick={toggle}
      whileHover={{ rotate: 8, y: -1 }}
      whileTap={{ scale: 0.9, rotate: -10 }}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-border/80 bg-background/55 shadow-inner transition-colors hover:border-primary/45"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Motion.span
        aria-hidden="true"
        className={`absolute inset-0 rounded-xl ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_70%_20%,rgba(250,204,21,0.22),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.2),transparent_60%)]"
        }`}
        animate={{ rotate: theme === "dark" ? 0 : 180, scale: [0.92, 1.08, 1] }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <Motion.span
          key={theme}
          initial={{ y: 16, opacity: 0, rotate: -100, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: -16, opacity: 0, rotate: 100, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
          className="relative z-10"
        >
          {theme === "dark" ? (
            <Sun className="h-[17px] w-[17px] text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.55)]" />
          ) : (
            <Moon className="h-[17px] w-[17px] text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]" />
          )}
        </Motion.span>
      </AnimatePresence>
    </Motion.button>
  );
}

function BrandMark({ onClick }) {
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      className="group flex shrink-0 items-center gap-2.5 text-left"
    >
      <span className="relative z-10 grid h-10 w-10 place-items-center rounded-[0.9rem] border border-white/20 bg-gradient-to-br from-violet-500 via-primary to-fuchsia-500 text-white shadow-[0_7px_22px_rgba(139,92,246,0.38),inset_0_1px_0_rgba(255,255,255,0.35)]">
        <Motion.span
          aria-hidden="true"
          className="absolute inset-[1px] rounded-[0.85rem] bg-gradient-to-br from-white/25 to-transparent"
          animate={{ opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative font-display text-lg font-bold tracking-tight">
          P
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-foreground sm:text-base">
          Partha
        </span>
        <span className="mt-1 hidden font-mono text-[8px] font-medium tracking-[0.22em] text-muted-foreground xl:block">
          FULL-STACK DEVELOPER
        </span>
      </span>
    </Motion.button>
  );
}
