import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Heart, Mail, MapPin } from "lucide-react";
import {
  LinkedinIcon,
  GithubIcon,
  LeetCodeIcon,
  GeeksForGeeksIcon,
  HackerRankIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../ui/BrandIcons";

/* ─────── Nav links ─────── */
const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

/* ─────── Socials ─────── */
const SOCIALS = [
  {
    icon: GithubIcon,
    href: "https://github.com/PARTHA-PATTANAYAK-02/",
    label: "GitHub",
    color: "text-foreground",
    glow: "rgba(148,163,184,0.55)",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/iampartha02/",
    label: "LinkedIn",
    color: "text-[#0A66C2]",
    glow: "rgba(10,102,194,0.55)",
  },
  {
    icon: TwitterIcon,
    href: "https://twitter.com/YOUR_HANDLE",
    label: "Twitter / X",
    color: "text-foreground",
    glow: "rgba(148,163,184,0.55)",
  },
  {
    icon: InstagramIcon,
    href: "https://instagram.com/YOUR_HANDLE",
    label: "Instagram",
    color: "text-[#E1306C]",
    glow: "rgba(225,48,108,0.55)",
  },
  {
    icon: FacebookIcon,
    href: "https://facebook.com/YOUR_HANDLE",
    label: "Facebook",
    color: "text-[#1877F2]",
    glow: "rgba(24,119,242,0.55)",
  },
  {
    icon: LeetCodeIcon,
    href: "https://leetcode.com/u/PARTHA_PATTANAYAK/",
    label: "LeetCode",
    color: "text-amber-500",
    glow: "rgba(245,158,11,0.55)",
  },
  {
    icon: GeeksForGeeksIcon,
    href: "https://www.geeksforgeeks.org/profile/parthapatta6brh",
    label: "GeeksForGeeks",
    color: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16,185,129,0.55)",
  },
  {
    icon: HackerRankIcon,
    href: "https://www.hackerrank.com/profile/YOUR_HANDLE",
    label: "HackerRank",
    color: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(16,185,129,0.55)",
  },
];

/* ─────── Smooth scroll helper ─────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ─────── Footer link with sliding gold-violet dash ─────── */
function FooterLink({ item }) {
  return (
    <button
      type="button"
      onClick={() => scrollTo(item.id)}
      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="h-px w-1 bg-gradient-to-r from-amber-300 to-primary opacity-0 transition-all duration-300 group-hover:w-3 group-hover:opacity-100" />
      {item.label}
    </button>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();

  return (
    // pb-24 on mobile keeps the bottom dock from covering the copyright row
    <footer className="relative mt-8 overflow-hidden pb-24 lg:pb-0">
      {/* animated gold-violet hairline on top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-border/60">
        <Motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-300 to-transparent"
          animate={reduce ? undefined : { x: ["-100%", "300%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background grid + glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(262 83% 58%) 1px, transparent 1px), linear-gradient(90deg, hsl(262 83% 58%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsl(262 83% 58%), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 right-0 h-[300px] w-[400px] rounded-full opacity-[0.12] blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsl(40 90% 60%), transparent 70%)",
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* ─────── Middle — Grid ─────── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 gap-8 pb-12 pt-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="lg:col-span-2">
            <Motion.button
              type="button"
              onClick={() => scrollTo("home")}
              whileHover="hover"
              className="group flex items-center gap-2.5"
              style={{ perspective: 600 }}
            >
              {/* same monogram as the navbar */}
              <Motion.span
                variants={{ hover: reduce ? {} : { rotateY: 360 } }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid h-10 w-10 place-items-center rounded-[0.9rem] border border-amber-200/40 bg-gradient-to-br from-violet-500 via-primary to-fuchsia-500 text-white shadow-[0_7px_22px_rgba(139,92,246,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-[1px] rounded-[0.85rem] bg-gradient-to-br from-white/30 to-transparent"
                />
                <span className="relative font-display text-lg font-bold">
                  P
                </span>
              </Motion.span>
              <span className="font-display text-lg font-bold tracking-tight">
                Partha Pattanayak
              </span>
            </Motion.button>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Full Stack Developer building fast, clean, and scalable web
              applications with modern tech. Passionate about MERN, Java, and
              GenAI.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href="mailto:pattanayakp2002@gmail.com"
                className="group inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3.5 py-2 text-xs backdrop-blur-md transition-colors hover:border-primary/50"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span className="break-all text-muted-foreground transition-colors group-hover:text-foreground">
                  pattanayakp2002@gmail.com
                </span>
              </a>

              <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-3.5 py-2 text-xs backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                <span className="text-muted-foreground">Kolkata, India</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h4>
            <ul className="space-y-2">
              {NAV.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </h4>
            <ul className="space-y-2">
              {NAV.slice(4).map((item) => (
                <li key={item.id}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </div>
        </Motion.div>

        {/* ─────── Socials strip ─────── */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="border-t border-border/40 py-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Find me online
            </span>

            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <Motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ y: -6, rotateX: 12, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      transformPerspective: 600,
                      "--social-glow": s.glow,
                    }}
                    className="group relative rounded-xl border border-border/60 bg-card/40 p-2.5 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-transparent hover:shadow-[0_14px_26px_-8px_var(--social-glow)]"
                  >
                    <Icon
                      className={`h-4 w-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${s.color}`}
                    />
                    <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] text-background opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                      {s.label}
                    </span>
                  </Motion.a>
                );
              })}
            </div>
          </div>
        </Motion.div>

        {/* ─────── Bottom — copyright + back to top ─────── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 py-6 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] text-muted-foreground sm:text-left">
            <span>© {year} Partha Pattanayak. All rights reserved.</span>
            <span className="hidden text-border sm:inline">·</span>
            <span className="inline-flex items-center gap-1">
              Built with
              <Heart className="h-3 w-3 animate-pulse fill-primary text-primary" />
              React &amp; Tailwind
            </span>
          </div>

          <Motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-4 py-2 text-xs font-medium backdrop-blur-md transition-colors hover:border-primary/50"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 text-primary transition-transform group-hover:-translate-y-0.5" />
          </Motion.button>
        </div>
      </div>
    </footer>
  );
}
