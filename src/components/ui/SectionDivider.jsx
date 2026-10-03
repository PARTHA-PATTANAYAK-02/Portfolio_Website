import { motion as Motion } from "framer-motion";

export default function SectionDivider({ label }) {
  return (
    <div className="relative py-2 sm:py-3">
      <div className="container-custom">
        <div className="relative flex items-center gap-4">
          <Motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "right" }}
            className="flex-1 h-px bg-gradient-to-l from-primary/50 via-border to-transparent"
          />

          <div className="relative flex items-center gap-2 shrink-0">
            {label ? (
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/70 px-3 leading-none">
                {label}
              </span>
            ) : (
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            )}
          </div>

          <Motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="flex-1 h-px bg-gradient-to-r from-primary/50 via-border to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
