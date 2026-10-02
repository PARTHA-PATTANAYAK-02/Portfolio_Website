import { useRef } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import ImageCarousel from "./ImageCarousel";

export default function ProjectCard({
  project,
  index,
  onOpen,
  size = "standard",
}) {
  const isLarge = size === "large";
  const draggedRef = useRef(false);

  const handleClick = () => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    onOpen(project);
  };

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-card/40 backdrop-blur-sm border border-border/60 hover:border-primary/50 transition-colors duration-300 hover:shadow-xl hover:shadow-primary/20"
    >
      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none bg-primary" />

      <div
        className={`relative ${isLarge ? "aspect-[16/10]" : "aspect-[16/11]"}`}
      >
        <ImageCarousel
          images={project.images || []}
          alt={project.title}
          category={project.category}
          size="compact"
          className="w-full h-full"
          onUserSwipe={() => {
            draggedRef.current = true;
          }}
        />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
              {project.category}
            </span>
            {project.inProgress && (
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                In Progress
              </span>
            )}
          </div>

          {project.featured && (
            <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/15 backdrop-blur-sm border border-primary/40 rounded-full px-2.5 py-1">
              <Star className="w-2.5 h-2.5 fill-current" />
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest text-white/60 pointer-events-none">
          {project.number}
        </div>

        <div className="absolute bottom-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      <div className={`${isLarge ? "p-4 sm:p-5" : "p-3.5 sm:p-4"}`}>
        <h3
          className={`font-display font-bold tracking-tight group-hover:text-primary transition-colors ${
            isLarge ? "text-lg sm:text-xl" : "text-base"
          }`}
        >
          {project.title}
        </h3>

        {isLarge && project.tagline && (
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
            {project.tagline}
          </p>
        )}

        <p
          className={`text-muted-foreground mt-2 leading-relaxed line-clamp-2 ${
            isLarge ? "text-xs sm:text-[13px]" : "text-[12px]"
          }`}
        >
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.slice(0, isLarge ? 4 : 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-1 rounded-md border border-border/60 bg-background/40 text-foreground/80"
            >
              {t}
            </span>
          ))}
          {project.tech.length > (isLarge ? 4 : 3) && (
            <span className="text-[10px] font-medium px-2 py-1 rounded-md text-muted-foreground">
              +{project.tech.length - (isLarge ? 4 : 3)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-border/60">
          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            View details
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {project.category.split(" ")[0]}
          </span>
        </div>
      </div>
    </Motion.div>
  );
}
