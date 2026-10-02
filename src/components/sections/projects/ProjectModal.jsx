import { useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "../../ui/BrandIcons";
import ImageCarousel from "./ImageCarousel";

export default function ProjectModal({ project, onClose }) {
  /* Escape + scroll lock + DotField pause */
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("modal-open");
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop — NO blur, faster */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/85"
          />

          {/* Scroll wrapper */}
          <div className="fixed inset-0 z-[95] overflow-y-auto">
            <div
              onClick={onClose}
              className="min-h-full flex items-start justify-center p-3 sm:p-6 lg:p-8"
            >
              <Motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl lg:max-w-5xl rounded-3xl bg-card border border-border shadow-2xl shadow-black/50 overflow-hidden my-auto"
              >
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Carousel */}
                <div className="relative aspect-[16/9] lg:aspect-[21/9]">
                  <ImageCarousel
                    images={project.images || []}
                    alt={project.title}
                    category={project.category}
                    size="full"
                    className="w-full h-full"
                  />

                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/50 border border-white/10 rounded-full px-2.5 py-1">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/20 border border-primary/40 rounded-full px-2.5 py-1">
                        ✦ Featured
                      </span>
                    )}
                    {project.inProgress && (
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-500/20 border border-amber-500/30 rounded-full px-2.5 py-1">
                        In Progress
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8 pointer-events-none">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1">
                      Project {project.number}
                    </div>
                    <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white drop-shadow-lg">
                      {project.title}
                    </h2>
                    {project.tagline && (
                      <p className="text-sm lg:text-base text-white/80 mt-1">
                        {project.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-7 lg:p-8 space-y-6">
                  <div>
                    <SectionHeading icon={Sparkles} label="Overview" />
                    <p className="text-sm lg:text-[15px] text-foreground/85 leading-relaxed mt-2">
                      {project.fullDescription}
                    </p>
                  </div>

                  {project.highlights && (
                    <div className="relative rounded-2xl p-4 lg:p-5 border border-primary/20 bg-primary/5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1.5">
                        What I built
                      </div>
                      <p className="text-xs sm:text-sm lg:text-[15px] text-foreground/90 leading-relaxed italic">
                        "{project.highlights}"
                      </p>
                    </div>
                  )}

                  <div>
                    <SectionHeading label="Key Features" />
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-3">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs sm:text-[13px] lg:text-sm text-foreground/85"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <SectionHeading label="Tech Stack" />
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] lg:text-xs font-medium px-2.5 py-1 rounded-lg border border-border bg-background/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-border">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/60 transition-shadow hover:-translate-y-0.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-border text-muted-foreground font-medium text-sm">
                        Live Demo Unavailable
                      </span>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background/40 hover:border-primary/50 text-sm font-semibold transition-colors hover:-translate-y-0.5"
                      >
                        <GithubIcon className="w-4 h-4" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionHeading({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-mono">
      {Icon ? (
        <Icon className="w-3 h-3 text-primary" />
      ) : (
        <span className="w-3 h-px bg-primary" />
      )}
      {label}
    </div>
  );
}
