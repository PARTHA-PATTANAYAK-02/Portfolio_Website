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

const SPRING = { type: "spring", stiffness: 380, damping: 28 };

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
    setActive(id);
    if (navigator.vibrate) navigator.vibrate(8);
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <Motion.nav
      initial={{ opacity: 0, y: 60, rotateX: 30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transformPerspective: 900,
        bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
      className="fixed inset-x-3 z-50 lg:hidden"
      aria-label="Mobile navigation"
    >
      {/* shell with animated champagne-violet border */}
      <div
        className={`relative rounded-[1.6rem] p-px ${
          isDark
            ? "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]"
            : "shadow-[0_20px_50px_-12px_rgba(92,66,150,0.4)]"
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

        {/* everything stays inside this clipped container */}
        <div
          className={`relative flex items-center justify-around overflow-hidden rounded-[calc(1.6rem-1px)] px-1.5 py-2 backdrop-blur-2xl ${
            isDark
              ? "bg-slate-950/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "bg-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]"
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
                whileTap={{ scale: 0.88 }}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="relative flex w-[19%] flex-col items-center gap-1 py-1"
                style={{ perspective: 500 }}
              >
                {/* icon tile */}
                <span className="relative grid h-9 w-9 place-items-center">
                  {isActive && (
                    <Motion.span
                      layoutId="dock-tile"
                      transition={SPRING}
                      className="absolute inset-0 overflow-hidden rounded-[0.9rem] border border-amber-200/50 bg-gradient-to-br from-violet-500 via-primary to-fuchsia-500 shadow-[0_6px_16px_rgba(139,92,246,0.55),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(60,20,120,0.35)]"
                    >
                      <Motion.span
                        aria-hidden="true"
                        className="absolute inset-[1px] rounded-[0.85rem] bg-gradient-to-br from-white/35 to-transparent"
                        animate={
                          reduce ? undefined : { opacity: [0.35, 0.8, 0.35] }
                        }
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {!reduce && (
                        <Motion.span
                          aria-hidden="true"
                          className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          animate={{ left: ["-60%", "160%"] }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            repeatDelay: 1.6,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </Motion.span>
                  )}
                  <Motion.span
                    className="relative"
                    animate={
                      isActive
                        ? { y: 0, scale: 1.08, rotateY: [90, 0] }
                        : { y: 0, scale: 1, rotateY: 0 }
                    }
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isActive
                          ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                          : "text-muted-foreground"
                      }`}
                      strokeWidth={isActive ? 2.4 : 2}
                    />
                  </Motion.span>
                </span>

                {/* label */}
                <span
                  className={`text-[10px] leading-none transition-colors duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 via-primary to-fuchsia-400 bg-clip-text font-semibold text-transparent"
                      : "font-medium text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>

                {/* gem under the active label */}
                <span className="h-[3px] w-5">
                  {isActive && (
                    <Motion.span
                      layoutId="dock-gem"
                      transition={SPRING}
                      className="block h-full w-full rounded-full bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400 shadow-[0_0_10px_rgba(232,200,135,0.85)]"
                    />
                  )}
                </span>
              </Motion.button>
            );
          })}
        </div>
      </div>
    </Motion.nav>
  );
}
