import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { Home, Code2, FolderKanban, Route, Mail } from "lucide-react";
import { useTheme } from "../providers/ThemeContext";

const MOBILE_ITEMS = [
  { label: "Home", id: "home", icon: Home },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Projects", id: "projects", icon: FolderKanban },
  { label: "Journey", id: "journey", icon: Route },
  { label: "Contact", id: "contact", icon: Mail },
];

const SPRING = { type: "spring", stiffness: 420, damping: 34 };
const EASE = [0.16, 1, 0.3, 1];

export default function MobileBottomNav() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = [];
    MOBILE_ITEMS.forEach(({ id }) => {
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
    setActive(id);
    if (navigator.vibrate) navigator.vibrate(8);
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <Motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      style={{
        bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
      className="fixed inset-x-3 z-50 lg:hidden"
      aria-label="Mobile navigation"
    >
      {/* glow border */}
      <div className="relative rounded-full p-px">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <Motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[150%]"
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
            className={`absolute inset-0 ${
              isDark ? "bg-white/10" : "bg-black/[0.07]"
            }`}
          />
        </div>

        {/* main bar */}
        <div
          className={`relative flex items-center justify-around gap-1 overflow-hidden rounded-full px-2 py-2 backdrop-blur-2xl ${
            isDark
              ? "bg-slate-950/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]"
          }`}
        >
          {MOBILE_ITEMS.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            return (
              <Motion.button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                whileTap={{ scale: 0.9 }}
                layout
                transition={SPRING}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-medium ${
                  isActive ? "px-4" : "px-3"
                }`}
              >
                {isActive && (
                  <Motion.span
                    layoutId="mobile-active-pill"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full border border-amber-200/30 bg-gradient-to-r from-primary/20 via-primary/10 to-fuchsia-500/20 shadow-[0_0_24px_-6px_rgba(139,92,246,0.9)]"
                  />
                )}
                <Motion.span
                  className="relative z-10"
                  animate={
                    isActive
                      ? { scale: 1.1, rotate: [0, -8, 8, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-300 ${
                      isActive
                        ? "text-primary drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]"
                        : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </Motion.span>
                {isActive && (
                  <Motion.span
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={SPRING}
                    className="relative z-10 overflow-hidden whitespace-nowrap bg-gradient-to-r from-amber-400 via-primary to-fuchsia-400 bg-clip-text text-[11px] font-semibold text-transparent"
                  >
                    {item.label}
                  </Motion.span>
                )}
              </Motion.button>
            );
          })}
        </div>
      </div>
    </Motion.nav>
  );
}
