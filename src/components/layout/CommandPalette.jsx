import { useState, useEffect } from "react";
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

  return (
    <AnimatePresence>
      {open && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[80] w-[92%] max-w-xl"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, projects, commands..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 max-h-80 overflow-y-auto">
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
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:border-primary/30 border border-transparent text-left transition-all"
                      >
                        <Icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{c.label}</span>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                <span>↑↓ navigate · ↵ select</span>
                <span>ESC close</span>
              </div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
