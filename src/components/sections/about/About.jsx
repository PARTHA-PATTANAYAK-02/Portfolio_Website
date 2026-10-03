import { motion as Motion } from "framer-motion";
import {
  MapPin,
  Languages,
  Briefcase,
  Sparkles,
  Code2,
  Brain,
  Rocket,
  Gamepad2,
  Music,
  Trophy,
  Plane,
  ArrowRight,
  Download,
  Award,
  Zap,
  Mail,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../../ui/BrandIcons";
import PhotoTilt from "./PhotoTilt";

/* ---------------- Data ---------------- */
const EDUCATION = [
  {
    year: "2021–2025",
    title: "B.Tech · Information Technology",
    place: "College of Engineering & Management, Kolaghat",
    highlight: true,
  },
  {
    year: "2020",
    title: "Higher Secondary",
    place: "Tilkhoja Baikuntha Bidyayatan",
  },
  {
    year: "2018",
    title: "Secondary",
    place: "Tilkhoja Baikuntha Bidyayatan",
  },
];

const FOCUS = [
  { icon: Code2, text: "Full-stack apps with MERN & Java" },
  { icon: Brain, text: "DSA & backend development" },
  { icon: Rocket, text: "GenAI integration" },
];

const HOBBIES = [
  { icon: Gamepad2, label: "Gaming", color: "text-violet-400" },
  { icon: Music, label: "Music", color: "text-pink-400" },
  { icon: Trophy, label: "Cricket", color: "text-emerald-400" },
  { icon: Plane, label: "Travel", color: "text-cyan-400" },
];

const ACHIEVEMENTS = [
  {
    title: "GHCI 2025",
    sub: "Hackathon Participant",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    title: "NCET",
    sub: "Grade A · Very Good",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    title: "HP LIFE",
    sub: "AI for Beginners",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    title: "500+ DSA",
    sub: "Problems Solved",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
  },
];

const FACTS = [
  { icon: MapPin, label: "Location", value: "Kolkata, India" },
  { icon: Languages, label: "Languages", value: "English · Hindi · Bengali" },
  { icon: Briefcase, label: "Status", value: "Open to work" },
];

const STATS = [
  { value: "10+", label: "Projects" },
  { value: "15+", label: "Tech Stack" },
  { value: "500+", label: "DSA Solved" },
  { value: "4+", label: "Years Coding" },
];

/* ---------------- Smooth scroll helper ---------------- */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------------- Tile ---------------- */
function Tile({ children, className = "", delay = 0, glow = "primary" }) {
  const glowColors = {
    primary: "hsl(262 83% 58%)",
    fuchsia: "hsl(292 91% 73%)",
    cyan: "hsl(190 90% 55%)",
    emerald: "hsl(160 84% 45%)",
    amber: "hsl(43 96% 56%)",
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-2xl p-4 sm:p-5 overflow-hidden group transition-all duration-300 bg-card/40 backdrop-blur-md border border-border/60 hover:border-primary/50 hover:bg-card/60 ${className}`}
    >
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColors[glow]}, transparent 70%)`,
        }}
      />
      <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-primary/60 to-transparent" />
      <div className="relative z-10 h-full">{children}</div>
    </Motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2.5 font-mono">
      <span className="w-3 h-px bg-primary" />
      {children}
    </div>
  );
}

/* ---------------- Main ---------------- */
export default function About() {
  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14">
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
              Get to know me
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              About <span className="gradient-text">Me</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </div>
        </Motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4">
          {/* Photo */}
          <div className="md:col-span-5 lg:col-span-4 md:row-span-3 min-h-[400px] md:min-h-0">
            <Tile delay={0.05} glow="fuchsia" className="!p-2 h-full">
              <div className="w-full h-full min-h-[400px]">
                <PhotoTilt src="/partha.jpeg" alt="Partha Pattanayak" />
              </div>
            </Tile>
          </div>

          {/* Bio */}
          <Tile
            delay={0.1}
            glow="primary"
            className="md:col-span-7 lg:col-span-8"
          >
            <SectionLabel>Who am I</SectionLabel>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              A{" "}
              <span className="text-foreground font-semibold">
                B.Tech IT graduate
              </span>{" "}
              who enjoys building things with code. From frontend interfaces to
              backend APIs, I like understanding how applications work{" "}
              <span className="gradient-text font-semibold">end-to-end</span>{" "}
              and continuously improving through projects and problem solving.
            </p>
          </Tile>

          {/* Currently Focused */}
          <Tile
            delay={0.15}
            glow="cyan"
            className="md:col-span-7 lg:col-span-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
              <SectionLabel>Currently Focused</SectionLabel>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 -mt-1">
                <Zap className="w-3 h-3" />
                Job hunting
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FOCUS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.18 + i * 0.05 }}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border border-border/60 bg-background/30 hover:border-primary/40 transition-all"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/30 shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-xs text-foreground/85 leading-snug">
                      {item.text}
                    </span>
                  </Motion.div>
                );
              })}
            </div>
          </Tile>

          {/* Quick Facts */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FACTS.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <Tile
                  key={fact.label}
                  delay={0.2 + i * 0.04}
                  glow="primary"
                  className="!p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/15 border border-primary/30 shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono">
                        {fact.label}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold mt-0.5 truncate">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                </Tile>
              );
            })}
          </div>

          {/* Education */}
          <Tile
            delay={0.3}
            glow="fuchsia"
            className="md:col-span-12 lg:col-span-5"
          >
            <SectionLabel>Education</SectionLabel>
            <div className="relative mt-2 pl-5">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

              <div className="space-y-3.5">
                {EDUCATION.map((edu, i) => (
                  <Motion.div
                    key={edu.title}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.32 + i * 0.06 }}
                    className="relative"
                  >
                    <div
                      className={`absolute -left-5 top-1.5 w-3 h-3 rounded-full bg-background border-2 flex items-center justify-center ${
                        edu.highlight
                          ? "border-primary shadow-[0_0_10px_hsl(262_83%_58%_/_0.5)]"
                          : "border-border"
                      }`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${
                          edu.highlight ? "bg-primary" : "bg-muted-foreground"
                        }`}
                      />
                    </div>

                    <div
                      className={`font-mono text-[10px] tracking-wide ${
                        edu.highlight ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {edu.year}
                    </div>
                    <div
                      className={`text-sm mt-0.5 ${
                        edu.highlight
                          ? "font-semibold text-foreground"
                          : "font-medium text-foreground/80"
                      }`}
                    >
                      {edu.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug">
                      {edu.place}
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>
          </Tile>

          {/* Achievements */}
          <Tile
            delay={0.35}
            glow="amber"
            className="md:col-span-12 lg:col-span-7"
          >
            <SectionLabel>Achievements</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACHIEVEMENTS.map((a, i) => (
                <Motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.38 + i * 0.04 }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border ${a.bg} ${a.border} hover:scale-[1.02] transition-transform`}
                >
                  <div
                    className={`p-1.5 rounded-lg bg-background/50 border ${a.border}`}
                  >
                    <Award className={`w-3.5 h-3.5 ${a.color}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{a.title}</div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {a.sub}
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </Tile>

          {/* Hobbies */}
          <Tile
            delay={0.4}
            glow="fuchsia"
            className="md:col-span-12 lg:col-span-5"
          >
            <SectionLabel>Hobbies</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              {HOBBIES.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-background/30 hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <Icon className={`w-4 h-4 ${h.color}`} />
                    <span className="text-xs font-medium">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </Tile>

          {/* Stats */}
          <Tile
            delay={0.45}
            glow="primary"
            className="md:col-span-12 lg:col-span-7"
          >
            <SectionLabel>By the numbers</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STATS.map((s, i) => (
                <Motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.48 + i * 0.05 }}
                  className="relative p-3 rounded-xl border border-border/60 bg-background/30 text-center overflow-hidden group/stat"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover/stat:from-primary/10 group-hover/stat:to-fuchsia-500/5 transition-all duration-300" />
                  <div className="relative font-display font-bold text-xl sm:text-2xl gradient-text">
                    {s.value}
                  </div>
                  <div className="relative text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">
                    {s.label}
                  </div>
                </Motion.div>
              ))}
            </div>
          </Tile>

          {/* CTA */}
          <Tile delay={0.5} glow="fuchsia" className="md:col-span-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                  <Zap className="w-3 h-3 text-primary" />
                  Let's work together
                </div>
                <div className="font-display font-semibold text-base sm:text-lg">
                  Looking for a developer?{" "}
                  <span className="gradient-text">Let's talk.</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-fuchsia-500 text-white font-semibold text-xs shadow-lg shadow-primary/30 hover:shadow-primary/60 hover:scale-[1.03] active:scale-95 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Hire Me
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border glass text-xs font-semibold hover:border-primary/50 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Resume
                </a>

                <a
                  href="https://www.linkedin.com/in/iampartha02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-lg glass hover:border-primary/50 transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                </a>

                <a
                  href="https://github.com/PARTHA-PATTANAYAK-02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg glass hover:border-primary/50 transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
