import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Home,
  User,
  Code2,
  FolderKanban,
  Route,
  Award,
  Mail,
} from "lucide-react";

const COMMANDS = [
  { id: "home", label: "Go to Home", icon: Home, keywords: "hero start top" },
  { id: "about", label: "Go to About", icon: User, keywords: "bio me who" },
  { id: "skills", label: "Go to Skills", icon: Code2, keywords: "tech stack" },
  {
    id: "projects",
    label: "Go to Projects",
    icon: FolderKanban,
    keywords: "work portfolio",
  },
  {
    id: "journey",
    label: "Go to Journey",
    icon: Route,
    keywords: "education timeline",
  },
  {
    id: "certifications",
    label: "Go to Certifications",
    icon: Award,
    keywords: "achievements",
  },
  {
    id: "contact",
    label: "Go to Contact",
    icon: Mail,
    keywords: "hire email reach",
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const openHandler = () => {
      setOpen(true);
      setQuery("");
    };
    const keyHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("open-command-palette", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("open-command-palette", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  const filtered = COMMANDS.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q)
    );
  });

  const runCommand = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[10000] bg-slate-950/68 backdrop-blur-md"
          />
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-[12%] z-[10001] w-[92%] max-w-xl -translate-x-1/2"
          >
            <div className="glass relative overflow-hidden rounded-[1.35rem] border border-primary/25 shadow-[0_32px_100px_rgba(0,0,0,0.52),0_0_45px_rgba(139,92,246,0.16)]">
              <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="flex items-center gap-3 border-b border-border/80 px-4 py-4 sm:px-5">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/20 bg-primary/10">
                  <Search className="h-4 w-4 text-primary" />
                </span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, projects, commands..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border/70 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2.5">
                {filtered.length === 0 ? (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No results for "{query}"
                  </div>
                ) : (
                  filtered.map((c) => {
                    const Icon = c.icon;
                    return (
                      <button
                        key={c.id}
                        onClick={() => runCommand(c.id)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-all hover:border-primary/20 hover:bg-primary/[0.08]"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted/80 transition-colors group-hover:bg-primary/15">
                          <Icon className="h-4 w-4 text-primary" />
                        </span>
                        <span className="text-sm font-medium">{c.label}</span>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border/80 px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
                <span>↑↓ navigate · ↵ select</span>
                <span>ESC close</span>
              </div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
