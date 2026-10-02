import { motion as Motion } from "framer-motion";

export default function CategoryCard({ title, icon, items, delay = 0 }) {
  const Icon = icon;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl p-4 sm:p-5 bg-card/40 backdrop-blur-md border border-border/60 hover:border-primary/40 overflow-hidden group transition-all duration-300"
    >
      {/* corner glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none bg-primary" />

      {/* top accent */}
      <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-primary/70 to-transparent" />

      {/* header */}
      <div className="relative flex items-center gap-2.5 mb-3.5">
        <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/30">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-sm tracking-tight">
          {title}
        </h3>
        <span className="ml-auto text-[10px] font-mono text-muted-foreground">
          {items.length}
        </span>
      </div>

      {/* chips */}
      <div className="relative flex flex-wrap gap-1.5">
        {items.map((item, i) => {
          const ChipIcon = item.icon;
          return (
            <Motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.05 + i * 0.03 }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background/40 hover:border-primary/50 hover:bg-primary/5 transition-all group/chip"
            >
              <ChipIcon
                className="w-3 h-3 shrink-0 transition-transform duration-300 group-hover/chip:scale-125"
                style={{ color: item.color }}
              />
              <span className="text-[11px] font-medium">{item.name}</span>
            </Motion.div>
          );
        })}
      </div>
    </Motion.div>
  );
}
