import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun } from "lucide-react";
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

  /* --- scroll detection --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- active section via IntersectionObserver --- */
  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const NAV_OFFSET = 90;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 transition-all duration-300">
      <div className="container-custom">
        <nav
          onMouseLeave={() => setHoveredId(null)}
          className={`flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2.5 glass transition-all duration-500 ${
            scrolled
              ? "shadow-2xl shadow-black/30"
              : "shadow-lg shadow-black/10"
          }`}
        >
          <MagneticLogo onClick={() => scrollTo("home")} />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredId === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : isHovered
                          ? "text-foreground"
                          : "text-muted-foreground"
                    }`}
                  >
                    {isHovered && !isActive && (
                      <Motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-lg bg-muted/70 border border-border"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}

                    {isActive && (
                      <>
                        <Motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/40 shadow-[0_0_20px_hsl(262_83%_58%_/_0.2)]"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                        <Motion.span
                          layoutId="nav-active-dot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_3px] shadow-primary/60"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                      </>
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={openPalette}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border bg-background/40 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.5 text-[10px] rounded border border-border bg-muted font-mono">
                ⌘ + K
              </kbd>
            </button>

            <ThemeToggle theme={theme} toggle={toggleTheme} />

            <button
              onClick={() => scrollTo("contact")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/25 hover:shadow-primary/60 hover:scale-[1.03] active:scale-95 transition-all"
            >
              Hire Me
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Theme Toggle ---------- */
function ThemeToggle({ theme, toggle }) {
  return (
    <Motion.button
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
      className="relative p-2 rounded-lg border border-border hover:border-primary/50 transition-all overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -180, scale: 0 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 20, opacity: 0, rotate: 180, scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-primary" />
          )}
        </Motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <Motion.span
          key={theme + "-burst"}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 rounded-full ${
            theme === "dark" ? "bg-yellow-400/40" : "bg-primary/40"
          }`}
        />
      </AnimatePresence>
    </Motion.button>
  );
}

/* ---------- Magnetic Logo ---------- */
function MagneticLogo({ onClick }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  return (
    <Motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      <button onClick={onClick} className="flex items-center gap-2 group">
        <div className="relative w-9 h-9 flex items-center justify-center">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 shadow-lg shadow-primary/40 group-hover:shadow-primary/70 transition-shadow duration-300" />
          <Motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="relative w-5 h-5 text-white"
            >
              <path
                d="M4 20V4h8a5 5 0 0 1 0 10H8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Motion.div>
        </div>
        <span className="font-display font-bold text-lg tracking-tight">
          Partha
        </span>
      </button>
    </Motion.div>
  );
}
