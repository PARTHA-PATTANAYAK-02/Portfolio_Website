import { motion as Motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiReactrouter,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPython,
  SiOpenjdk,
  SiC,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
} from "react-icons/si";
import {
  Globe,
  Binary,
  Boxes,
  Database,
  Code2,
  Layout,
  Server,
  Layers,
  Wrench,
  Terminal,
  Sparkles,
  Rocket,
  Brain,
  Zap,
} from "lucide-react";

import TechMarquee from "./TechMarquee";
import CategoryCard from "./CategoryCard";

/* ---------- Category data ---------- */
const CATEGORIES = [
  {
    title: "Frontend",
    icon: Layout,
    items: [
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#E5E5E5" },
      { name: "REST API", icon: Globe, color: "#A855F7" },
    ],
  },
  {
    title: "Database",
    icon: Database,
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "Languages",
    icon: Code2,
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Java", icon: SiOpenjdk, color: "#F89820" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
    ],
  },
  {
    title: "CS Fundamentals",
    icon: Binary,
    items: [
      { name: "DSA", icon: Binary, color: "#E879F9" },
      { name: "OOP", icon: Boxes, color: "#22D3EE" },
      { name: "DBMS", icon: Database, color: "#34D399" },
    ],
  },
  {
    title: "Tools & Dev",
    icon: Wrench,
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#E5E5E5" },
      { name: "VS Code", icon: Terminal, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
    ],
  },
];

/* ---------- Currently learning ---------- */
const LEARNING = [
  {
    icon: SiOpenjdk,
    color: "#F89820",
    title: "Java & DSA",
    sub: "Strengthening core problem solving",
  },
  {
    icon: Brain,
    color: "#A855F7",
    title: "Generative AI",
    sub: "LLM integration & GenAI patterns",
  },
  {
    icon: Layers,
    color: "#22D3EE",
    title: "Backend Architecture",
    sub: "API design & scalable systems",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative pt-24 pb-20 scroll-mt-24">
      <div className="container-custom">
        {/* Header */}
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
              Tech I work with
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              Skills & <span className="gradient-text">Stack</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Zap className="w-3.5 h-3.5 text-primary" />
            {CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)}{" "}
            technologies
          </div>
        </Motion.div>

        {/* Marquee */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <TechMarquee />
        </Motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              icon={cat.icon}
              items={cat.items}
              delay={0.05 + i * 0.05}
            />
          ))}
        </div>

        {/* Currently Learning */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 relative rounded-2xl p-5 sm:p-6 bg-card/40 backdrop-blur-md border border-border/60 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br from-primary to-fuchsia-500" />

          <div className="relative flex items-center gap-2.5 mb-4">
            <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/30">
              <Rocket className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-sm tracking-tight">
              Currently Learning
            </h3>
            <div className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              In progress
            </div>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEARNING.map((item, i) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border/60 bg-background/40 hover:border-primary/40 transition-all"
                >
                  <div className="p-2 rounded-lg bg-background/60 border border-border/60 shrink-0">
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                      {item.sub}
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
