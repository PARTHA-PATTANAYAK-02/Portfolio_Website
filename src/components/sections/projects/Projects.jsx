import { useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, FolderKanban } from "lucide-react";

import { GithubIcon } from "../../ui/BrandIcons";
import { PROJECTS, CATEGORIES } from "../../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [openProject, setOpenProject] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const showFeaturedLayout = filter === "All";
  const featured = showFeaturedLayout ? filtered.filter((p) => p.featured) : [];
  const standard = showFeaturedLayout
    ? filtered.filter((p) => !p.featured)
    : filtered;

  return (
    <section id="projects" className="relative pt-2 pb-10 sm:pb-14 scroll-mt-20">
      <div className="container-custom">
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs text-primary flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Selected work
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <FolderKanban className="w-3.5 h-3.5 text-primary" />
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <Motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </Motion.div>

        {showFeaturedLayout && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-4 lg:mb-5">
            {featured.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                size="large"
                onOpen={setOpenProject}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {(showFeaturedLayout ? standard : filtered).map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={featured.length + i}
              size="standard"
              onOpen={setOpenProject}
            />
          ))}

          {showFeaturedLayout && standard.length === 2 && (
            <a
              href="https://github.com/PARTHA-PATTANAYAK-02/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-dashed border-border hover:border-primary/50 bg-card/20 backdrop-blur-sm transition-all flex flex-col items-center justify-center text-center p-6 min-h-[260px]"
            >
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity bg-primary pointer-events-none" />

              <div className="relative w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <GithubIcon className="w-5 h-5 text-primary" />
              </div>

              <h3 className="font-display font-semibold text-base tracking-tight">
                More on GitHub
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-[200px] leading-relaxed">
                Explore additional projects, experiments and open-source work
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mt-4 group-hover:gap-2.5 transition-all">
                Visit profile
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          )}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </div>
        )}
      </div>

      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
}
