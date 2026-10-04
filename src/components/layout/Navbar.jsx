import { useEffect, useState } from "react";
import {
  motion as Motion,
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
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredId, setHoveredId] = useState(null);

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
