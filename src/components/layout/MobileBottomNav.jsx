import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Home, Code2, FolderKanban, Route, Mail } from "lucide-react";

const MOBILE_ITEMS = [
  { label: "Home", id: "home", icon: Home },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Projects", id: "projects", icon: FolderKanban },
  { label: "Journey", id: "journey", icon: Route },
  { label: "Contact", id: "contact", icon: Mail },
];

export default function MobileBottomNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = [];
    MOBILE_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
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
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 lg:hidden">
      <div className="glass rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl shadow-black/40">
        {MOBILE_ITEMS.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl"
            >
              {isActive && (
                <Motion.div
                  layoutId="mobile-active"
                  className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Motion.div
                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </Motion.div>
              <span
                className={`relative text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <Motion.span
                  layoutId="mobile-dot"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary shadow-[0_0_8px_2px] shadow-primary/60"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
