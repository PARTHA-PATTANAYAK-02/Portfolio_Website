import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  Home,
  UserRound,
  Code2,
  FolderKanban,
  Route,
  Award,
  Mail,
} from "lucide-react";
import { useTheme } from "../providers/ThemeContext";
import { useActiveSection } from "../../hooks/useActiveSection";

const MOBILE_ITEMS = [
  { label: "Home", id: "home", icon: Home },
  { label: "About", id: "about", icon: UserRound },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Projects", id: "projects", icon: FolderKanban },
  { label: "Journey", id: "journey", icon: Route },
  { label: "Certs", id: "certifications", icon: Award },
  { label: "Contact", id: "contact", icon: Mail },
];
const MOBILE_ACTIVE_IDS = MOBILE_ITEMS.map((item) => item.id);

const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
};

const EASE = [0.16, 1, 0.3, 1];

export default function MobileBottomNav() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 900px)").matches,
  );
  const [active, setActive] = useActiveSection(MOBILE_ACTIVE_IDS);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const updateViewport = (event) => setIsMobile(event.matches);
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);

    if (navigator.vibrate && !reduce) navigator.vibrate(8);

    const y = el.getBoundingClientRect().top + window.scrollY - 90;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
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
      <div className="relative mx-auto max-w-[520px] rounded-full p-px">
        {/* Purple animated border. Only this layer rotates. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <Motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_55%,rgba(139,92,246,.9)_72%,rgba(217,70,239,.75)_88%,rgba(59,130,246,.65)_96%,transparent_100%)]"
            animate={reduce || isMobile ? undefined : { rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div
            className={[
              "absolute inset-0 rounded-full",
              isDark ? "bg-white/10" : "bg-black/[0.06]",
            ].join(" ")}
          />
        </div>

        {/* Same compact pill structure as the earlier version */}
        <div
          className={[
            "relative flex items-center justify-between gap-0.5 overflow-hidden rounded-full px-1 py-2 backdrop-blur-2xl",
            isDark
              ? "bg-slate-950/85 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_50px_-25px_rgba(0,0,0,.9)]"
              : "bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.95),0_18px_50px_-25px_rgba(76,29,149,.3)]",
          ].join(" ")}
        >
          {MOBILE_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

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
                className={[
                  "relative flex min-w-0 flex-1 items-center justify-center gap-1 rounded-full py-2.5 text-xs font-medium",
                  isActive ? "px-2" : "px-1.5",
                ].join(" ")}
              >
                {isActive && (
                  <Motion.span
                    layoutId="mobile-active-pill"
                    transition={SPRING}
                    className={[
                      "absolute inset-0 rounded-full border",
                      isDark
                        ? "border-primary/35 bg-gradient-to-r from-primary/25 via-primary/10 to-fuchsia-500/20"
                        : "border-primary/25 bg-gradient-to-r from-primary/15 via-primary/5 to-fuchsia-500/10",
                      "shadow-[0_0_24px_-6px_rgba(139,92,246,.85),inset_0_1px_0_rgba(255,255,255,.12)]",
                    ].join(" ")}
                  />
                )}

                <Motion.span
                  className="relative z-10"
                  animate={
                    isActive
                      ? { scale: 1.1, rotate: [0, -8, 8, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{
                    duration: 0.35,
                    ease: EASE,
                  }}
                >
                  <Icon
                    className={[
                      "h-5 w-5 transition-colors duration-300",
                      isActive
                        ? "text-primary drop-shadow-[0_0_6px_rgba(139,92,246,.8)]"
                        : "text-muted-foreground",
                    ].join(" ")}
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                </Motion.span>

                {isActive && (
                  <Motion.span
                    layout
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={SPRING}
                    className="relative z-10 overflow-hidden whitespace-nowrap bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-[11px] font-semibold text-transparent"
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
