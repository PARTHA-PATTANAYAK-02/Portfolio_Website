import { useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  Timer,
} from "lucide-react";
import { LinkedinIcon, GithubIcon, LeetCodeIcon } from "../../ui/BrandIcons";

/* ---------- Social icons ---------- */

function FacebookIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.25l-4.9-6.4L6.45 22H3.34l7.24-8.28L2.8 2h6.4l4.43 5.86L18.9 2Zm-1.1 17.9h1.73L8.36 4h-1.85L17.8 19.9Z" />
    </svg>
  );
}

const EMAIL = "pattanayakp2002@gmail.com";

const SOCIALS = [
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/iampartha02/",
    label: "LinkedIn",
    accent: "text-[#0A66C2]",
    glow: "rgba(10, 102, 194, 0.55)",
  },
  {
    icon: GithubIcon,
    href: "https://github.com/PARTHA-PATTANAYAK-02/",
    label: "GitHub",
    accent: "text-slate-800 dark:text-white",
    glow: "rgba(148, 163, 184, 0.55)",
  },
  {
    icon: LeetCodeIcon,
    href: "https://leetcode.com/u/PARTHA_PATTANAYAK/",
    label: "LeetCode",
    accent: "text-amber-500",
    glow: "rgba(245, 158, 11, 0.55)",
  },
  {
    icon: FacebookIcon,
    href: "https://facebook.com/",
    label: "Facebook",
    accent: "text-[#1877F2]",
    glow: "rgba(24, 119, 242, 0.55)",
  },
  {
    icon: InstagramIcon,
    href: "https://instagram.com/",
    label: "Instagram",
    accent: "text-[#E1306C]",
    glow: "rgba(225, 48, 108, 0.55)",
  },
  {
    icon: XIcon,
    href: "https://x.com/",
    label: "X",
    accent: "text-slate-900 dark:text-white",
    glow: "rgba(148, 163, 184, 0.55)",
  },
];

/* ---------- Glow card: soft 3D tilt + animated border + cursor light ---------- */

function GlowCard({
  children,
  intensity = 3,
  innerClassName = "p-5 sm:p-8",
  className = "",
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useMotionValue(-400);
  const sy = useMotionValue(-400);

  const spring = { stiffness: 160, damping: 20, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [intensity, -intensity]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-intensity, intensity]),
    spring,
  );
  const spot = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(232,200,135,0.14), rgba(139,92,246,0.12) 45%, transparent 70%)`;

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1400,
      }}
      className={`group relative transform-gpu rounded-3xl p-px shadow-xl shadow-slate-900/10 dark:shadow-black/40 ${className}`}
    >
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
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-slate-200/80 dark:bg-white/10" />
      </div>

      <div
        className={`relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-white/85 backdrop-blur-xl dark:bg-slate-950/80 ${innerClassName}`}
      >
        <Motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: spot }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </Motion.div>
  );
}

/* ---------- Background ---------- */

function ContactBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Motion.div
        animate={{ x: [0, 60, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-[120px] dark:opacity-[0.2]"
        style={{
          background:
            "radial-gradient(circle, hsl(262 83% 58%), transparent 70%)",
        }}
      />
      <Motion.div
        animate={{ x: [0, -50, 0], y: [0, 35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.06] blur-[120px] dark:opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, hsl(40 90% 60%), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
    </div>
  );
}

/* ---------- Inline field: sits inside a sentence ---------- */

function InlineField({ id, label, placeholder, className = "", ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full border-b-2 border-slate-300 bg-transparent px-1 pb-0.5 font-display font-semibold text-primary outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 disabled:opacity-60 dark:border-white/20"
        {...rest}
      />
      <Motion.span
        aria-hidden="true"
        animate={{ scaleX: focus ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-amber-300 via-primary to-fuchsia-400"
      />
    </span>
  );
}

/* ---------- Social tile ---------- */

function SocialTile({ s, index }) {
  const Icon = s.icon;
  return (
    <Motion.a
      href={s.href}
      target="_blank"
      rel="noreferrer"
      aria-label={s.label}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -10, rotateX: 14, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      style={{ transformPerspective: 700, "--social-glow": s.glow }}
      className="group/tile relative flex flex-col items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/80 px-3 py-4 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_22px_40px_-12px_var(--social-glow)] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100 dark:from-white/10" />
      <Icon
        className={`relative h-5 w-5 transition-transform duration-500 group-hover/tile:scale-110 group-hover/tile:-rotate-6 ${s.accent}`}
      />
      <span className="relative text-xs font-medium text-slate-600 dark:text-slate-400">
        {s.label}
      </span>
    </Motion.a>
  );
}

/* ---------- Success sparkle burst ---------- */

function Burst() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return (
          <Motion.span
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(a) * 90,
              y: Math.sin(a) * 36,
              scale: [0, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`absolute h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-amber-300" : "bg-fuchsia-300"}`}
          />
        );
      })}
    </span>
  );
}

/* ---------- Main ---------- */

const COOLDOWN_SECONDS = 60;
const COOLDOWN_KEY = "portfolio_contact_last_sent";

export default function Contact() {
  const formRef = useRef(null);
  const timers = useRef([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Restore cooldown after refresh (timestamp lives in localStorage)
  useEffect(() => {
    const tick = () => {
      let lastSent = null;
      try {
        lastSent = localStorage.getItem(COOLDOWN_KEY);
      } catch {
        /* storage unavailable */
      }
      if (!lastSent) return setCooldown(0);
      const remaining =
        COOLDOWN_SECONDS - Math.floor((Date.now() - Number(lastSent)) / 1000);
      if (remaining > 0) setCooldown(remaining);
      else {
        setCooldown(0);
        try {
          localStorage.removeItem(COOLDOWN_KEY);
        } catch {
          /* ignore */
        }
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      later(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cooldown > 0 || status === "submitting") return;

    setStatus("submitting");
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          try {
            localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
          } catch {
            /* ignore */
          }
          setCooldown(COOLDOWN_SECONDS);
          later(() => setStatus("idle"), 4500);
        },
        (error) => {
          console.error("EmailJS error:", error?.text || error);
          setStatus("error"); // no cooldown on failure
          later(() => setStatus("idle"), 4500);
        },
      );
  };

  const busy = status === "submitting";
  const locked = busy || cooldown > 0;

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden pb-28 pt-4 sm:pb-32 lg:pb-14"
    >
      <ContactBackground />

      <div className="container-custom relative z-10">
        <div className="w-full">
          {/* ===== 1. Centered header ===== */}
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </div>

            <h2 className="font-display text-3xl font-bold leading-none tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
              Have an opportunity, project, or idea? Write me a few lines below
              or copy my email.
            </p>
          </Motion.div>

          {/* ===== 2. Big copyable email ===== */}
          <GlowCard intensity={2.5} innerClassName="p-0" className="mb-6">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={`Copy email address ${EMAIL}`}
              className="group/mail flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-8 sm:py-5"
            >
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  {copied ? "Copied to clipboard" : "Click to copy my email"}
                </span>
                <span className="mt-1.5 block break-all font-display text-base font-bold tracking-tight text-slate-950 transition-colors duration-300 group-hover/mail:text-primary dark:text-white sm:text-xl md:text-2xl">
                  {EMAIL}
                </span>
              </span>

              <Motion.span
                whileHover={{ rotateY: 180 }}
                style={{ transformPerspective: 500 }}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-amber-300/40 bg-gradient-to-br from-primary/20 to-fuchsia-500/10 text-primary shadow-[0_8px_24px_-8px_rgba(139,92,246,0.5)]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <Motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 40 }}
                    transition={{ duration: 0.2 }}
                    className={copied ? "text-emerald-500" : ""}
                  >
                    {copied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Motion.span>
                </AnimatePresence>
              </Motion.span>
            </button>
          </GlowCard>

          {/* ===== 3. Letter-style form ===== */}
          <GlowCard intensity={2} className="mb-8">
            <form ref={formRef} onSubmit={handleSubmit}>
              <p className="text-base font-medium leading-[2.4rem] text-slate-700 dark:text-slate-300 sm:text-lg sm:leading-[2.9rem]">
                Hi Partha, I&apos;m{" "}
                <InlineField
                  id="name"
                  label="Your name"
                  placeholder="your name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={busy}
                  className="w-36 sm:w-52"
                />
                . You can reach me at{" "}
                <InlineField
                  id="email"
                  label="Your email"
                  placeholder="you@example.com"
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={busy}
                  className="w-full sm:w-72"
                />
                . I&apos;d like to talk about:
              </p>

              <div className="relative mt-4">
                <label htmlFor="message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  maxLength={1000}
                  disabled={busy}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:focus:bg-white/[0.06] sm:text-[15px]"
                />
                <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] text-slate-400">
                  {formData.message.length}/1000
                </span>
              </div>

              <div aria-live="polite" className="mt-4">
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <Motion.div
                      key="ok"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Message sent successfully!
                    </Motion.div>
                  )}
                  {status === "error" && (
                    <Motion.div
                      key="err"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                    >
                      <XCircle className="h-4 w-4" />
                      Something went wrong. Please try again.
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-5 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-xs font-medium text-slate-400 sm:text-left">
                  {cooldown > 0
                    ? "You can send another message after the cooldown ends."
                    : "Your message goes straight to my inbox."}
                </p>

                <div className="relative sm:w-64">
                  <Motion.button
                    type="submit"
                    disabled={locked}
                    whileHover={locked ? undefined : { y: -2, scale: 1.02 }}
                    whileTap={locked ? undefined : { scale: 0.97 }}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-primary via-violet-600 to-fuchsia-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(139,92,246,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] transition-shadow duration-300 hover:shadow-[0_16px_38px_-8px_rgba(139,92,246,0.7)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />

                    {cooldown > 0 && (
                      <Motion.span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-full origin-left bg-black/20"
                        animate={{ scaleX: cooldown / COOLDOWN_SECONDS }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    )}

                    <span className="relative flex items-center gap-2">
                      {busy ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : cooldown > 0 ? (
                        <>
                          <Timer className="h-4 w-4" />
                          Send another in {cooldown}s
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          Send Message
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </span>
                  </Motion.button>
                  <AnimatePresence>
                    {status === "success" && <Burst key="burst" />}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </GlowCard>

          {/* ===== 4. Social tiles row ===== */}
          <p className="mb-4 text-center text-xs font-semibold text-slate-400">
            Or find me online
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {SOCIALS.map((s, i) => (
              <SocialTile key={s.label} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
