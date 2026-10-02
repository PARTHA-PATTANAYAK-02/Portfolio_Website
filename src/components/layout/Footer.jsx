import { motion as Motion } from "framer-motion";
import {
  ArrowUp,
  Heart,
  Mail,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
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
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/iampartha02/",
    label: "LinkedIn",
    color: "text-[#0A66C2]",
  },
  {
    icon: TwitterIcon,
    href: "https://twitter.com/YOUR_HANDLE",
    label: "Twitter / X",
    color: "text-foreground",
  },
  {
    icon: InstagramIcon,
    href: "https://instagram.com/YOUR_HANDLE",
    label: "Instagram",
    color: "text-[#E1306C]",
  },
  {
    icon: FacebookIcon,
    href: "https://facebook.com/YOUR_HANDLE",
    label: "Facebook",
    color: "text-[#1877F2]",
  },
  {
    icon: LeetCodeIcon,
    href: "https://leetcode.com/u/PARTHA_PATTANAYAK/",
    label: "LeetCode",
    color: "text-amber-500",
  },
  {
    icon: GeeksForGeeksIcon,
    href: "https://www.geeksforgeeks.org/profile/parthapatta6brh",
    label: "GeeksForGeeks",
    color: "text-emerald-500",
  },
  {
    icon: HackerRankIcon,
    href: "https://www.hackerrank.com/profile/YOUR_HANDLE",
    label: "HackerRank",
    color: "text-emerald-400",
  },
];

/* ─────── Smooth scroll helper ─────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-border/60 overflow-hidden">
      {/* Background grid + glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(262 83% 58%) 1px, transparent 1px), linear-gradient(90deg, hsl(262 83% 58%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(262 83% 58%), transparent 70%)",
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* ─────── Top — Big CTA ─────── */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="py-14 sm:py-16 border-b border-border/40"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            {/* Left — Brand */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Let's build together
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                Have an idea?{" "}
                <span className="gradient-text">Let's make it real.</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                I'm open to full-time roles, freelance projects, and
                collaborations. If you're building something interesting — I'd
                love to hear about it.
              </p>

              {/* Email + location chips */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="mailto:pattanayakp2002@gmail.com"
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 bg-card/40 backdrop-blur-md hover:border-primary/50 transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    pattanayakp2002@gmail.com
                  </span>
                </a>

                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 bg-card/40 backdrop-blur-md text-xs">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-muted-foreground">Kolkata, India</span>
                </span>
              </div>
            </div>

            {/* Right — CTA */}
            <Motion.button
              onClick={() => scrollTo("contact")}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative shrink-0 inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-fuchsia-500 text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/60 transition-shadow"
            >
              {/* pulse ring */}
              <span className="absolute inset-0 rounded-2xl bg-primary/40 animate-ping opacity-30" />

              <div className="relative flex items-center gap-2">
                <span>Start a conversation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Motion.button>
          </div>
        </Motion.div>

        {/* ─────── Middle — Grid ─────── */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Column 1 — Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 shadow-lg shadow-primary/40 group-hover:shadow-primary/70 transition-shadow" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="relative w-5 h-5 text-white"
                >
                  <path
                    d="M4 20V4h8a5 5 0 0 1 0 10H8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Partha Pattanayak
              </span>
            </button>

            <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Full Stack Developer building fast, clean, and scalable web
              applications with modern tech. Currently open to work — passionate
              about MERN, Java, and GenAI.
            </p>

            {/* Status badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              Open to opportunities
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              {NAV.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-px bg-primary/0 group-hover:bg-primary group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — More */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {NAV.slice(4).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-px bg-primary/0 group-hover:bg-primary group-hover:w-3 transition-all duration-300" />
                    {item.label}
                  </button>
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
          className="py-8 border-t border-border/40"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Find me online
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <Motion.a
                    key={s.label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative p-2.5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-md hover:border-primary/50 transition-colors"
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${s.color}`}
                    />

                    {/* tooltip */}
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-foreground text-background text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                      {s.label}
                    </span>
                  </Motion.a>
                );
              })}
            </div>
          </div>
        </Motion.div>

        {/* ─────── Bottom — copyright + back to top ─────── */}
        <div className="py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground text-center sm:text-left">
            <span>© {year} Partha Pattanayak. All rights reserved.</span>
            <span className="hidden sm:inline text-border">·</span>
            <span className="inline-flex items-center gap-1">
              Built with
              <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" />
              React & Tailwind
            </span>
          </div>

          <Motion.button
            onClick={() => scrollTo("home")}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/60 bg-card/40 backdrop-blur-md hover:border-primary/50 text-xs font-medium transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5 text-primary group-hover:-translate-y-0.5 transition-transform" />
          </Motion.button>
        </div>
      </div>
    </footer>
  );
}
