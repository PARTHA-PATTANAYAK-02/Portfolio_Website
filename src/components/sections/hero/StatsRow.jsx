import { useEffect, useRef, useState } from "react";
import { motion as Motion, useInView } from "framer-motion";

const STATS = [
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 15, suffix: "+", label: "Tech Stack" },
  { value: 500, suffix: "+", label: "DSA Problems" },
  { value: 4, suffix: "+ yrs", label: "Coding Journey" },
];

function Counter({ value, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    let raf;
    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12">
      {STATS.map((stat, i) => (
        <Motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
          className="glass rounded-2xl p-4 text-center transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 group"
        >
          <div className="font-display font-bold text-2xl sm:text-3xl gradient-text leading-tight">
            <Counter value={stat.value} />
            <span>{stat.suffix}</span>
          </div>
          <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
            {stat.label}
          </div>
        </Motion.div>
      ))}
    </div>
  );
}
