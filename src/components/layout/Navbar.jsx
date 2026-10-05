import { useEffect, useState } from "react";
import {
  motion as Motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
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

const SPRING = { type: "spring", stiffness: 420, damping: 34 };
const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);

  /* ---- cursor-tracked light (motion values = zero re-renders) ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const lit = useSpring(0, { stiffness: 150, damping: 22 });

  const rim = useMotionTemplate`radial-gradient(200px circle at ${mx}px ${my}px, rgba(232,200,135,0.95), rgba(139,92,246,0.85) 42%, transparent 72%)`;
  const halo = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(139,92,246,0.20), rgba(232,200,135,0.10) 38%, transparent 68%)`;

  /* ---- scroll progress ---- */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
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

  const point = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const handleEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    point(e);
    lit.set(1);
  };
  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    point(e);
  };
  const handleLeave = () => {
    lit.set(0);
    setHovered(null);
  };

  return (
    <Motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      className="fixed inset-x-0 top-0 z-[60]"
    >
      {/* full-width scroll progress hairline */}
      <Motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400"
      />

      <div className="container-custom">
        <Motion.div
          animate={{ paddingTop: scrolled ? 8 : 18 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Motion.div
            onPointerEnter={handleEnter}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            animate={{ scale: scrolled ? 0.985 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "top center" }}
            className="relative"
          >
            {/* glowing rim that follows the cursor */}
            <Motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[1.5px] rounded-full blur-[3px]"
              style={{ background: rim, opacity: lit }}
            />

            <nav
              className={`relative flex items-center gap-2 overflow-hidden rounded-full border px-2 py-1.5 backdrop-blur-2xl ${
                isDark
                  ? "border-white/10 bg-slate-950/70 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.07)]"
                  : "border-black/5 bg-white/70 shadow-[0_24px_60px_-28px_rgba(76,45,140,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]"
              }`}
            >
              {/* slow aurora wash inside the bar */}
              <Motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-24 -top-24 h-44 opacity-30 blur-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(232,200,135,0.55), rgba(139,92,246,0.7), rgba(217,70,239,0.5))",
                }}
                animate={reduce ? undefined : { x: ["-12%", "12%", "-12%"] }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* cursor halo */}
              <Motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: halo, opacity: lit }}
              />

              <BrandMark onClick={() => scrollTo("home")} reduce={reduce} />

              <ul className="relative hidden flex-1 items-center justify-center gap-0.5 lg:flex">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <NavItem
                      item={item}
                      isActive={active === item.id}
                      isHovered={hovered === item.id}
                      onHover={setHovered}
                      onLeave={() => setHovered(null)}
                      onClick={() => scrollTo(item.id)}
                    />
                  </li>
                ))}
              </ul>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <Motion.button
                  type="button"
                  onClick={openPalette}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open command palette"
                  className="group relative flex h-9 items-center gap-2 overflow-hidden rounded-full border border-border/70 bg-background/40 px-2.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:px-3"
                >
                  <Search className="h-4 w-4 text-primary transition-transform duration-500 group-hover:rotate-90" />
                  <span className="hidden text-[12px] font-medium sm:inline">
                    Search
                  </span>
                  <kbd className="hidden rounded-md border border-border/70 bg-muted/60 px-1.5 py-0.5 font-mono text-[9px] leading-none md:inline-block">
                    Ctrl K
                  </kbd>
                </Motion.button>

                <TalkButton
                  onClick={() => scrollTo("contact")}
                  reduce={reduce}
                />
              </div>
            </nav>
          </Motion.div>
        </Motion.div>
      </div>
    </Motion.header>
  );
}

/* ---------------- nav item: vertical rolling label + morphing pill ---------------- */
function NavItem({ item, isActive, isHovered, onHover, onLeave, onClick }) {
  const roll = isHovered && !isActive;

  return (
    <Motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover(item.id)}
      onFocus={() => onHover(item.id)}
      onBlur={onLeave}
      whileTap={{ scale: 0.94 }}
      className="relative rounded-full px-3 py-2 text-[12.5px] font-medium leading-none"
    >
      {isActive && (
        <Motion.span
          layoutId="nav-active-pill"
          transition={SPRING}
          className="absolute inset-0 rounded-full border border-amber-200/25 bg-gradient-to-b from-primary/25 to-primary/[0.06] shadow-[0_0_26px_-6px_rgba(139,92,246,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]"
        />
      )}
      {!isActive && isHovered && (
        <Motion.span
          layoutId="nav-hover-pill"
          transition={SPRING}
          className="absolute inset-0 rounded-full border border-border/70 bg-muted/50"
        />
      )}

      <span className="relative z-10 block h-[1.2em] overflow-hidden">
        <Motion.span
          className={`block leading-[1.2em] ${
            isActive
              ? "bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400 bg-clip-text text-transparent"
              : "text-muted-foreground"
          }`}
          animate={{ y: roll ? "-100%" : "0%" }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {item.label}
        </Motion.span>
        <Motion.span
          aria-hidden="true"
          className="absolute inset-x-0 top-full block bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400 bg-clip-text leading-[1.2em] text-transparent"
          animate={{ y: roll ? "-100%" : "0%" }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {item.label}
        </Motion.span>
      </span>
    </Motion.button>
  );
}

/* ---------------- brand: rotating conic ring monogram ---------------- */
function BrandMark({ onClick, reduce }) {
  return (
    <Motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="group relative flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
    >
      <span className="relative grid h-9 w-9 place-items-center">
        <Motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(232,200,135,0.95), rgba(139,92,246,0.95), rgba(217,70,239,0.9), rgba(232,200,135,0.95))",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <span className="absolute inset-[1.5px] rounded-full bg-background/90 backdrop-blur" />
        <Motion.span
          className="relative font-display text-[15px] font-bold tracking-tight"
          animate={reduce ? undefined : { scale: [1, 1.09, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="bg-gradient-to-br from-amber-300 via-primary to-fuchsia-400 bg-clip-text text-transparent">
            P
          </span>
        </Motion.span>
      </span>

      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-[14px] font-semibold tracking-tight text-foreground">
          Partha
        </span>
        <span className="mt-[3px] text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Full-stack dev
        </span>
      </span>
    </Motion.button>
  );
}

/* ---------------- magnetic CTA with shine sweep ---------------- */
function TalkButton({ onClick, reduce }) {
  const x = useSpring(0, { stiffness: 280, damping: 20 });
  const y = useSpring(0, { stiffness: 280, damping: 20 });

  const handleMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 16);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 10);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Motion.button
      type="button"
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.95 }}
      className="group relative hidden h-9 shrink-0 items-center overflow-hidden rounded-full border border-white/25 bg-gradient-to-br from-primary via-violet-600 to-fuchsia-500 px-3.5 text-[12px] font-semibold text-white shadow-[0_10px_26px_-10px_rgba(139,92,246,0.95),inset_0_1px_0_rgba(255,255,255,0.35)] sm:inline-flex"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      <Motion.span
        style={{ x, y }}
        className="relative flex items-center gap-1.5"
      >
        Let&apos;s talk
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Motion.span>
    </Motion.button>
  );
}
