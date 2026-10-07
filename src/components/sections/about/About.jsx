import { useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  animate,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
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
  ExternalLink,
  Award,
  Zap,
  Mail,
  GraduationCap,
  RotateCw,
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
  { year: "2018", title: "Secondary", place: "Tilkhoja Baikuntha Bidyayatan" },
];

const FOCUS = [
  { icon: Code2, text: "Full-stack apps with MERN & Java" },
  { icon: Brain, text: "DSA & backend development" },
  { icon: Rocket, text: "GenAI integration" },
];

const HOBBIES = [
  {
    icon: Gamepad2,
    label: "Gaming",
    color: "text-violet-500 dark:text-violet-400",
  },
  { icon: Music, label: "Music", color: "text-pink-500 dark:text-pink-400" },
  {
    icon: Trophy,
    label: "Cricket",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  { icon: Plane, label: "Travel", color: "text-cyan-600 dark:text-cyan-400" },
];

const ACHIEVEMENTS = [
  {
    title: "GHCI 2025",
    sub: "Hackathon Participant",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    title: "NCET",
    sub: "Grade A · Very Good",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    title: "HP LIFE",
    sub: "AI for Beginners",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    title: "500+ DSA",
    sub: "Problems Solved",
    color: "text-fuchsia-600 dark:text-fuchsia-400",
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
  { to: 10, suffix: "+", label: "Projects" },
  { to: 15, suffix: "+", label: "Tech Stack" },
  { to: 500, suffix: "+", label: "DSA Solved" },
  { to: 4, suffix: "+", label: "Years Coding" },
];

/* ---------------- Helpers ---------------- */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------------- 3D glow card: tilt + animated border + cursor light ----------------
   Children can pop out of the card with  [transform:translateZ(30px)]  */
function GlowCard({
  children,
  intensity = 6,
  className = "",
  innerClassName = "p-5 sm:p-7",
  delay = 0,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useMotionValue(-400);
  const sy = useMotionValue(-400);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [intensity, -intensity]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-intensity, intensity]),
    spring,
  );
  const spot = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, rgba(232,200,135,0.16), rgba(139,92,246,0.13) 45%, transparent 70%)`;

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    sx.set(x);
    sy.set(y);
    px.set(x / r.width);
    py.set(y / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    sx.set(-400);
    sy.set(-400);
  };

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      }}
      className={`group relative transform-gpu rounded-3xl shadow-xl shadow-slate-900/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/20 dark:shadow-black/40 ${className}`}
    >
      {/* animated champagne-violet border */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-50 transition-opacity duration-500 group-hover:opacity-100">
        <Motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 aspect-square w-[150%]"
          style={{
            x: "-50%",
            y: "-50%",
            background:
              "conic-gradient(from 0deg, transparent 0 55%, rgba(232,200,135,0.9) 74%, rgba(139,92,246,0.9) 88%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-slate-200/80 dark:bg-white/10" />
      </div>

      {/* glass body + cursor light */}
      <div className="pointer-events-none absolute inset-px overflow-hidden rounded-[calc(1.5rem-1px)] bg-white/85 backdrop-blur-xl dark:bg-slate-950/80">
        <Motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: spot }}
        />
      </div>

      <div
        className={`relative h-full [transform-style:preserve-3d] ${innerClassName}`}
      >
        {children}
      </div>
    </Motion.div>
  );
}

function Label({ children }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
      <span className="h-px w-3 bg-gradient-to-r from-amber-300 to-primary" />
      {children}
    </div>
  );
}

/* ---------------- 3D flip card (hover on desktop, tap on touch) ---------------- */
function FlipCard({
  icon: Icon,
  title,
  teaser,
  tag,
  chips = [],
  back,
  delay = 0,
}) {
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef("mouse");
  const face =
    "absolute inset-0 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/95 via-white/90 to-violet-100/70 p-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:from-slate-950/90 dark:via-slate-950/90 dark:to-[#1b1146]/90 dark:shadow-black/40 [backface-visibility:hidden]";

  return (
    <Motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1400 }}
      className="h-[250px]"
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${title}. Flip card for details`}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        onClick={() => lastPointer.current !== "mouse" && setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        className="group/flip h-full w-full cursor-pointer rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <Motion.div
          animate={{ rotateY: flipped ? 180 : 0, y: flipped ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 16 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* FRONT */}
          <div className={face}>
            {/* background layers: dot grid, glows, giant watermark icon */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
              style={{
                backgroundImage:
                  "radial-gradient(hsl(262 83% 58% / 0.45) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
                maskImage:
                  "linear-gradient(to bottom left, black, transparent 70%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom left, black, transparent 70%)",
              }}
            />
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/35 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-amber-300/25 blur-3xl" />
            <Icon
              aria-hidden="true"
              strokeWidth={1.2}
              className="pointer-events-none absolute -bottom-5 -right-3 h-36 w-36 -rotate-12 text-primary/15 transition-transform duration-700 group-hover/flip:rotate-0"
            />

            <div className="relative flex h-full flex-col justify-between">
              {/* top: icon + tag */}
              <div className="flex items-start justify-between gap-3">
                <Motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-amber-300/40 bg-gradient-to-br from-violet-500 via-primary to-fuchsia-500 text-white shadow-[0_14px_32px_-8px_rgba(139,92,246,0.7),inset_0_1px_0_rgba(255,255,255,0.4)]"
                >
                  <Icon className="h-5 w-5" />
                </Motion.div>
                {tag && (
                  <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                    {tag}
                  </span>
                )}
              </div>

              {/* middle: quick-glance chips */}
              <div className="flex flex-wrap gap-1.5">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg border border-border/70 bg-background/60 px-2 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* bottom: title, teaser, hint */}
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                  {teaser}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-primary">
                  <RotateCw className="h-3 w-3" />
                  <span className="hidden sm:inline">Hover to flip</span>
                  <span className="sm:hidden">Tap to flip</span>
                </p>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className={face} style={{ transform: "rotateY(180deg)" }}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-300/10" />
            <div className="relative h-full overflow-auto">
              <Label>{title}</Label>
              {back}
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.div>
  );
}

/* ---------------- Main ---------------- */
export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative scroll-mt-20 pb-10 pt-8 sm:pb-14 sm:pt-12"
    >
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
            <p className="mb-2 flex items-center gap-2 font-mono text-xs text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Get to know me
            </p>
            <h2 className="font-display text-3xl font-bold leading-none tracking-tight sm:text-4xl lg:text-5xl">
              About <span className="gradient-text">Me</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
          </div>
        </Motion.div>

        {/* ===== 1. Hero: photo + story ===== */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <PhotoTilt src="/partha.jpeg" alt="Partha Pattanayak" />
          </Motion.div>

          <GlowCard intensity={4} delay={0.1} innerClassName="p-6 sm:p-9">
            <Label>Who am I</Label>
            <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
              A{" "}
              <span className="font-semibold text-foreground">
                B.Tech IT graduate
              </span>{" "}
              who enjoys building things with code. From frontend interfaces to
              backend APIs, I like understanding how applications work{" "}
              <span className="gradient-text font-semibold">end-to-end</span>{" "}
              and continuously improving through projects and problem solving.
            </p>

            {/* focus */}
            <div className="mt-7 flex items-center justify-between gap-3">
              <Label>Currently focused</Label>
              <span className="-mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Zap className="h-3 w-3" />
                Job hunting
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {FOCUS.map((item) => {
                const Icon = item.icon;
                return (
                  <Motion.div
                    key={item.text}
                    whileHover={
                      reduce ? undefined : { y: -8, rotateX: 14, scale: 1.04 }
                    }
                    style={{ transformPerspective: 700, translateZ: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/50 p-3 shadow-sm hover:border-primary/50 hover:shadow-[0_18px_30px_-12px_rgba(139,92,246,0.5)]"
                  >
                    <span className="shrink-0 rounded-lg border border-primary/30 bg-primary/15 p-1.5">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-xs leading-snug text-foreground/85">
                      {item.text}
                    </span>
                  </Motion.div>
                );
              })}
            </div>

            {/* facts */}
            <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {FACTS.map((f) => {
                const Icon = f.icon;
                return (
                  <Motion.div
                    key={f.label}
                    whileHover={reduce ? undefined : { y: -6, rotateX: 10 }}
                    style={{ transformPerspective: 700, translateZ: 24 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-3 hover:border-primary/50"
                  >
                    <span className="shrink-0 rounded-lg border border-primary/30 bg-primary/15 p-2">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                        {f.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-semibold sm:text-sm">
                        {f.value}
                      </span>
                    </span>
                  </Motion.div>
                );
              })}
            </div>

            {/* actions */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Motion.button
                type="button"
                onClick={() => scrollTo("contact")}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ translateZ: 40 }}
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-primary via-violet-600 to-fuchsia-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_10px_28px_-8px_rgba(139,92,246,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
                <Mail className="relative h-3.5 w-3.5" />
                <span className="relative">Hire Me</span>
                <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Motion.button>

              <Motion.a
                href="https://drive.google.com/drive/folders/1rawC4WT_wXNY7aiTJYWIVnhXPCbBSGD1?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ translateZ: 40 }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card/50 px-5 py-2.5 text-xs font-semibold backdrop-blur-md hover:border-primary/50"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View resume
              </Motion.a>

              {[
                {
                  href: "https://www.linkedin.com/in/iampartha02/",
                  label: "LinkedIn",
                  Icon: LinkedinIcon,
                },
                {
                  href: "https://github.com/PARTHA-PATTANAYAK-02/",
                  label: "GitHub",
                  Icon: GithubIcon,
                },
              ].map(({ href, label, Icon }) => (
                <Motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -5, rotateX: 14, scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  style={{ transformPerspective: 600, translateZ: 40 }}
                  className="group rounded-xl border border-border bg-card/50 p-2.5 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_14px_26px_-8px_rgba(139,92,246,0.55)]"
                >
                  <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </Motion.a>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* ===== 2. Count-up stats ===== */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <GlowCard
              key={s.label}
              intensity={12}
              delay={0.05 * i}
              innerClassName="p-3.5 text-center sm:p-4"
            >
              <div className="[transform:translateZ(30px)]">
                <div className="gradient-text font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* ===== 3. 3D flip deck ===== */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <FlipCard
            icon={GraduationCap}
            title="Education"
            teaser="B.Tech in Information Technology."
            tag="2021–2025"
            chips={["B.Tech", "Information Technology", "Kolaghat"]}
            delay={0}
            back={
              <div className="relative pl-5">
                <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                <div className="space-y-2.5">
                  {EDUCATION.map((edu) => (
                    <div key={edu.title} className="relative">
                      <span
                        className={`absolute -left-5 top-1.5 h-3 w-3 rounded-full border-2 bg-background ${
                          edu.highlight
                            ? "border-primary shadow-[0_0_10px_hsl(262_83%_58%_/_0.6)]"
                            : "border-border"
                        }`}
                      />
                      <div
                        className={`font-mono text-[10px] ${edu.highlight ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {edu.year}
                      </div>
                      <div
                        className={`mt-0.5 text-xs ${edu.highlight ? "font-semibold" : "font-medium text-foreground/80"}`}
                      >
                        {edu.title}
                      </div>
                      <div className="text-[10px] leading-snug text-muted-foreground">
                        {edu.place}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          <FlipCard
            icon={Award}
            title="Achievements"
            teaser="Hackathons, certifications and DSA."
            tag="4 highlights"
            chips={["GHCI 2025", "NCET", "HP LIFE", "500+ DSA"]}
            delay={0.1}
            back={
              <div className="space-y-1.5">
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.title}
                    className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${a.bg} ${a.border}`}
                  >
                    <span
                      className={`rounded-md border bg-background/50 p-1 ${a.border}`}
                    >
                      <Award className={`h-3.5 w-3.5 ${a.color}`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold">
                        {a.title}
                      </span>
                      <span className="block truncate text-[10px] text-muted-foreground">
                        {a.sub}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            }
          />

          <FlipCard
            icon={Gamepad2}
            title="Hobbies"
            teaser="What I do away from the keyboard."
            tag="4 interests"
            chips={["Gaming", "Music", "Cricket", "Travel"]}
            delay={0.2}
            back={
              <div className="grid grid-cols-2 gap-2">
                {HOBBIES.map((h) => {
                  const Icon = h.icon;
                  return (
                    <div
                      key={h.label}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-background/50 px-3 py-3"
                    >
                      <Icon className={`h-5 w-5 ${h.color}`} />
                      <span className="text-xs font-medium">{h.label}</span>
                    </div>
                  );
                })}
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
