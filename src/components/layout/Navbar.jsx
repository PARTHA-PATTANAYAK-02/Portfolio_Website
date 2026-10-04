import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
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

const SPRING = { type: "spring", stiffness: 380, damping: 30 };

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredId, setHoveredId] = useState(null);
  const [themeWave, setThemeWave] = useState(null);

  // 3D tilt + cursor light (motion values => no re-render on mouse move)
  const rotX = useSpring(0, { stiffness: 160, damping: 20 });
  const rotY = useSpring(0, { stiffness: 160, damping: 20 });
  const mx = useMotionValue(300);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(232,200,135,0.20), rgba(139,92,246,0.12) 45%, transparent 75%)`;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  const trackPointer = (e) => {
    if (e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - b.left;
    const y = e.clientY - b.top;
    mx.set(x);
    my.set(y);
    if (reduce) return;
    rotX.set((y / b.height - 0.5) * -4);
    rotY.set((x / b.width - 0.5) * 5);
  };

  const resetPointer = () => {
    setHoveredId(null);
    rotX.set(0);
    rotY.set(0);
  };

  const changeTheme = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    setThemeWave({
      id: Date.now(),
      x: b.left + b.width / 2,
      y: b.top + b.height / 2,
      // wave colour = the theme we are switching TO
      color: isDark ? "rgba(255, 208, 78, 0.28)" : "rgba(139, 92, 246, 0.30)",
      ring: isDark ? "rgba(255, 208, 78, 0.7)" : "rgba(167, 139, 250, 0.8)",
    });
    toggleTheme();
  };

  const reach =
    typeof window !== "undefined"
      ? Math.hypot(window.innerWidth, window.innerHeight)
      : 2000;

  return (
    <>
      <Motion.header
        initial={{ opacity: 0, y: -40, rotateX: -25 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
        className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className="container-custom relative">
          {/* tilting shell with animated champagne-violet border */}
          <Motion.div
            onPointerMove={trackPointer}
            onPointerLeave={resetPointer}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
            animate={{ scale: scrolled ? 0.985 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-[1.7rem] p-px ${
              isDark
                ? "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)]"
                : "shadow-[0_24px_60px_-14px_rgba(92,66,150,0.35)]"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <Motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 aspect-square w-[130%]"
                style={{
                  x: "-50%",
                  y: "-50%",
                  background:
                    "conic-gradient(from 0deg, transparent 0 55%, rgba(232,200,135,0.95) 74%, rgba(139,92,246,0.95) 88%, transparent 100%)",
                }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div
                className={`absolute inset-0 ${isDark ? "bg-white/10" : "bg-black/[0.07]"}`}
              />
            </div>

            <nav
              className={`relative isolate flex items-center justify-between gap-2 rounded-[calc(1.7rem-1px)] px-3 py-2.5 backdrop-blur-2xl sm:px-4 ${
                isDark
                  ? "bg-slate-950/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <Motion.div
                  className="absolute inset-0"
                  style={{ background: spotlight }}
                />
              </div>

              {/* scroll progress hairline */}
              <Motion.div
                aria-hidden="true"
                style={{ scaleX: progress }}
                className="pointer-events-none absolute bottom-0 left-6 right-6 h-px origin-left bg-gradient-to-r from-amber-200 via-primary to-fuchsia-400"
              />

              <BrandMark onClick={() => scrollTo("home")} reduce={reduce} />

              <ul className="relative hidden items-center gap-0 lg:flex xl:gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      item={item}
                      isActive={activeSection === item.id}
                      isHovered={hoveredId === item.id}
                      onHover={setHoveredId}
                      onClick={() => scrollTo(item.id)}
                    />
                  </li>
                ))}
              </ul>

              <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 xl:ml-0">
                <Motion.button
                  type="button"
                  onClick={openPalette}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open command palette"
                  className="group inline-flex h-10 items-center gap-2 rounded-xl border border-border/80 bg-background/55 px-2.5 text-muted-foreground shadow-inner transition-colors hover:border-primary/45 hover:text-foreground sm:px-3"
                >
                  <Search className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                  <span className="hidden text-xs font-medium sm:inline">
                    Search
                  </span>
                  <kbd className="hidden rounded-md border border-border/80 bg-muted/70 px-1.5 py-0.5 font-mono text-[9px] lg:inline-block">
                    Ctrl K
                  </kbd>
                </Motion.button>

                <ThemeToggle isDark={isDark} toggle={changeTheme} />

                <Motion.button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative hidden h-10 items-center gap-2 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-primary via-violet-600 to-fuchsia-500 px-4 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(139,92,246,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] transition-shadow hover:shadow-[0_12px_34px_rgba(139,92,246,0.6)] sm:inline-flex"
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
                  <span className="relative">Let&apos;s talk</span>
                  <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Motion.button>
              </div>
            </nav>
          </Motion.div>
        </div>
      </Motion.header>

      {/* theme switch ripple */}
      {createPortal(
        <AnimatePresence>
          {themeWave && (
            <>
              <Motion.div
                key={`wave-${themeWave.id}`}
                aria-hidden="true"
                initial={{
                  clipPath: `circle(0px at ${themeWave.x}px ${themeWave.y}px)`,
                  opacity: 0.95,
                }}
                animate={{
                  clipPath: `circle(${reach}px at ${themeWave.x}px ${themeWave.y}px)`,
                  opacity: 0,
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => setThemeWave(null)}
                className="pointer-events-none fixed inset-0 z-[110] mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at ${themeWave.x}px ${themeWave.y}px, ${themeWave.color}, transparent 64%)`,
                }}
              />
              <Motion.div
                key={`ring-${themeWave.id}`}
                aria-hidden="true"
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: reach / 40, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none fixed z-[111] h-20 w-20 rounded-full border-2"
                style={{
                  left: themeWave.x - 40,
                  top: themeWave.y - 40,
                  borderColor: themeWave.ring,
                }}
              />
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

/* ---------- Nav link: 3D flip label + liquid active gem ---------- */
function NavLink({ item, isActive, isHovered, onHover, onClick }) {
  const flip = isHovered && !isActive;
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover(item.id)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{ perspective: 600 }}
      className={`relative rounded-xl px-2 py-2 text-xs font-medium xl:px-3 xl:text-[13px] ${
        isActive ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {isActive && (
        <Motion.span
          layoutId="nav-active"
          transition={SPRING}
          className="absolute inset-0 rounded-xl border border-amber-200/30 bg-gradient-to-b from-primary/20 to-primary/[0.04] shadow-[0_0_28px_rgba(139,92,246,0.22),inset_0_1px_0_rgba(255,255,255,0.12)]"
        />
      )}
      {isHovered && !isActive && (
        <Motion.span
          layoutId="nav-hover"
          transition={SPRING}
          className="absolute inset-0 rounded-xl border border-border/70 bg-muted/60 shadow-[0_8px_20px_-8px_rgba(139,92,246,0.45)]"
        />
      )}
      {isActive && (
        <Motion.span
          layoutId="nav-gem"
          transition={SPRING}
          className="absolute -bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400 shadow-[0_0_14px_rgba(232,200,135,0.8)]"
        />
      )}

      <span className="relative z-10 block [transform-style:preserve-3d]">
        <Motion.span
          className="block"
          style={{ transformOrigin: "50% 100%" }}
          animate={{
            rotateX: flip ? -85 : 0,
            y: flip ? -6 : 0,
            opacity: flip ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {item.label}
        </Motion.span>
        <Motion.span
          aria-hidden="true"
          className="absolute inset-0 block bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400 bg-clip-text text-transparent"
          style={{ transformOrigin: "50% 0%" }}
          animate={{
            rotateX: flip ? 0 : 85,
            y: flip ? 0 : 6,
            opacity: flip ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {item.label}
        </Motion.span>
      </span>
    </Motion.button>
  );
}

/* ---------- Day/Night switch: sky, stars, clouds, sun <-> moon ---------- */
function ThemeToggle({ isDark, toggle }) {
  return (
    <Motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggle}
      initial={false}
      whileHover={{ y: -1.5, scale: 1.04 }}
      whileTap="press"
      className="relative h-10 w-[72px] shrink-0 overflow-hidden rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/25"
    >
      {/* day sky */}
      <span className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-amber-200" />
      {/* night sky */}
      <Motion.span
        className="absolute inset-0 bg-gradient-to-br from-[#0a0f2e] via-[#1e1b4b] to-[#3b1f6e]"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* stars (night) */}
      {[
        { l: 10, t: 9, s: 3 },
        { l: 20, t: 22, s: 2 },
        { l: 29, t: 11, s: 2 },
        { l: 14, t: 28, s: 2 },
      ].map((st, i) => (
        <Motion.span
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          style={{ left: st.l, top: st.t, width: st.s, height: st.s }}
          animate={
            isDark
              ? { opacity: [0.3, 1, 0.3], scale: 1 }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isDark
              ? { duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.25 }
              : { duration: 0.3 }
          }
        />
      ))}

      {/* clouds (day) */}
      <Motion.span
        className="absolute bottom-1.5 right-2 h-3 w-7 rounded-full bg-white/90"
        animate={{ y: isDark ? 26 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <Motion.span
        className="absolute bottom-3 right-5 h-3 w-5 rounded-full bg-white/80"
        animate={{ y: isDark ? 26 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      />

      {/* knob */}
      <Motion.span
        className="absolute left-1 top-1 h-8 w-8"
        animate={{ x: isDark ? 32 : 0 }}
        variants={{ press: { scaleX: 1.2 } }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* sun */}
        <Motion.span
          className="absolute inset-0"
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -120 : 0,
            scale: isDark ? 0.3 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Motion.span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-300/80"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-500 shadow-[0_0_18px_rgba(251,191,36,0.9),inset_0_-3px_5px_rgba(234,88,12,0.5)]" />
        </Motion.span>
        {/* moon */}
        <Motion.span
          className="absolute inset-0"
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 140,
            scale: isDark ? 1 : 0.3,
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 shadow-[0_0_16px_rgba(196,181,253,0.7),inset_-3px_-3px_6px_rgba(100,116,139,0.5)]" />
          <span className="absolute left-[7px] top-[8px] h-2.5 w-2.5 rounded-full bg-slate-400/60" />
          <span className="absolute bottom-[7px] right-[8px] h-2 w-2 rounded-full bg-slate-400/60" />
          <span className="absolute right-[7px] top-[7px] h-1 w-1 rounded-full bg-slate-400/60" />
        </Motion.span>
      </Motion.span>
    </Motion.button>
  );
}

/* ---------- Brand: coin-spin monogram ---------- */
function BrandMark({ onClick, reduce }) {
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className="group flex shrink-0 items-center gap-2.5 text-left"
      style={{ perspective: 600 }}
    >
      <Motion.span
        variants={{ hover: reduce ? {} : { rotateY: 360 } }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 grid h-10 w-10 place-items-center rounded-[0.9rem] border border-amber-200/40 bg-gradient-to-br from-violet-500 via-primary to-fuchsia-500 text-white shadow-[0_7px_22px_rgba(139,92,246,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]"
      >
        <Motion.span
          aria-hidden="true"
          className="absolute inset-[1px] rounded-[0.85rem] bg-gradient-to-br from-white/30 to-transparent"
          animate={reduce ? undefined : { opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative font-display text-lg font-bold tracking-tight">
          P
        </span>
      </Motion.span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-foreground sm:text-base">
          Partha
        </span>
        <span className="mt-1 hidden bg-gradient-to-r from-amber-400 to-primary bg-clip-text text-[10px] font-medium tracking-[0.12em] text-transparent xl:block">
          Full-stack developer
        </span>
      </span>
    </Motion.button>
  );
}
