import { useRef } from "react";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import { Sparkles, Zap, History } from "lucide-react";
import { JOURNEY, ACCENT_STYLES } from "../../../data/journey";

export default function Journey() {
  const timelineRef = useRef(null);

  /* Scroll progress for the fill line */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const fillProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="relative pt-2 pb-20 scroll-mt-24">
      <div className="container-custom">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs text-primary flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              How I got here
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              My <span className="gradient-text">Journey</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <History className="w-3.5 h-3.5 text-primary" />
            {JOURNEY.length} milestones
          </div>
        </Motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line — background (subtle) */}
          <div
            aria-hidden
            className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-border/60"
          />

          {/* Vertical line — foreground fill (scroll-driven) */}
          <Motion.div
            aria-hidden
            style={{ scaleY: fillProgress, transformOrigin: "top" }}
            className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-fuchsia-500 to-primary shadow-[0_0_12px_hsl(262_83%_58%_/_0.7)]"
          />

          <div className="space-y-5 sm:space-y-6">
            {JOURNEY.map((item, i) => {
              const Icon = item.icon;
              const accent =
                ACCENT_STYLES[item.accent] || ACCENT_STYLES.primary;

              return (
                <Motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="relative flex gap-4 sm:gap-5 group"
                >
                  {/* Icon dot */}
                  <div className="relative shrink-0 z-10">
                    <div
                      className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl border ${accent.border} ${accent.bg} backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${accent.icon}`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-widest ${accent.icon}`}
                      >
                        {item.year}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        Milestone {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base sm:text-lg tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Right side decorative year (fills empty space on desktop) */}
                  <div className="hidden lg:flex items-start pt-1.5 shrink-0">
                    <span
                      className={`font-display font-bold text-xl tracking-tight opacity-10 group-hover:opacity-30 transition-opacity duration-300 ${accent.icon}`}
                    >
                      {item.year.split("–")[0]}
                    </span>
                  </div>
                </Motion.div>
              );
            })}
          </div>

          {/* Currently card — aligned with content (icon left offset) */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative ml-14 sm:ml-[68px] mt-6"
          >
            <div className="relative rounded-2xl p-4 sm:p-5 border border-primary/30 bg-primary/5 backdrop-blur-md overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none bg-gradient-to-br from-primary to-fuchsia-500" />

              <div className="relative flex items-center gap-2 mb-2">
                <div className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  Currently
                </span>
                <Zap className="w-3 h-3 text-primary ml-auto" />
              </div>

              <div className="relative">
                <div className="font-display font-semibold text-sm sm:text-base">
                  Full Stack Development · Java & DSA · GenAI
                </div>
                <p className="text-xs sm:text-[13px] text-muted-foreground mt-1.5 leading-relaxed max-w-2xl">
                  Building full-stack applications, strengthening Java and DSA,
                  and exploring Generative AI integration.
                </p>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
