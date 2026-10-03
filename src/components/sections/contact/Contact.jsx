import { useEffect, useRef, useState } from "react";

import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import emailjs from "@emailjs/browser";

import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Download,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

import { LinkedinIcon, GithubIcon, LeetCodeIcon } from "../../ui/BrandIcons";

/* =========================================================
   SOCIAL ICONS — Facebook / Instagram / X
========================================================= */

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

/* =========================================================
   SOCIAL LINKS
========================================================= */

const SOCIALS = [
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/iampartha02/",
    label: "LinkedIn",
    accent: "text-[#0A66C2]",
    glow: "rgba(10, 102, 194, 0.32)",
  },

  {
    icon: GithubIcon,
    href: "https://github.com/PARTHA-PATTANAYAK-02/",
    label: "GitHub",
    accent: "text-slate-800 dark:text-white",
    glow: "rgba(148, 163, 184, 0.28)",
  },

  {
    icon: LeetCodeIcon,
    href: "https://leetcode.com/u/PARTHA_PATTANAYAK/",
    label: "LeetCode",
    accent: "text-amber-500",
    glow: "rgba(245, 158, 11, 0.32)",
  },

  {
    icon: FacebookIcon,
    href: "https://facebook.com/",
    label: "Facebook",
    accent: "text-[#1877F2]",
    glow: "rgba(24, 119, 242, 0.30)",
  },

  {
    icon: InstagramIcon,
    href: "https://instagram.com/",
    label: "Instagram",
    accent: "text-[#E1306C]",
    glow: "rgba(225, 48, 108, 0.30)",
  },

  {
    icon: XIcon,
    href: "https://x.com/",
    label: "X",
    accent: "text-slate-900 dark:text-white",
    glow: "rgba(148, 163, 184, 0.28)",
  },
];

/* =========================================================
   3D TILT CARD
========================================================= */

function TiltCard({ children, className = "", intensity = 6 }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [intensity, -intensity]),
    {
      stiffness: 180,
      damping: 18,
      mass: 0.6,
    },
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-intensity, intensity]),
    {
      stiffness: 180,
      damping: 18,
      mass: 0.6,
    },
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <Motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`relative transform-gpu ${className}`}
    >
      {children}
    </Motion.div>
  );
}

/* =========================================================
   CARD GLOW
========================================================= */

function CardGlow() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        absolute
        -inset-px
        rounded-[inherit]
        opacity-0
        transition-opacity
        duration-500
        group-hover:opacity-100
      "
      style={{
        background:
          "radial-gradient(circle at 50% 0%, hsl(262 83% 58% / 0.15), transparent 48%)",
      }}
    />
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function ContactBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      <Motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-32
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          blur-[120px]
          opacity-[0.08]
          dark:opacity-[0.20]
        "
        style={{
          background:
            "radial-gradient(circle, hsl(262 83% 58%), transparent 70%)",
        }}
      />

      <Motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 35, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-32
          -right-32
          h-[400px]
          w-[400px]
          rounded-full
          blur-[120px]
          opacity-[0.06]
          dark:opacity-[0.15]
        "
        style={{
          background:
            "radial-gradient(circle, hsl(190 90% 55%), transparent 70%)",
        }}
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          dark:opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
    </div>
  );
}

/* =========================================================
   MAIN CONTACT
========================================================= */

export default function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const [copied, setCopied] = useState(false);

  /* =======================================================
     COOLDOWN
     
     User can send only once every 60 seconds.
     Timestamp is stored in localStorage so reload won't
     reset the timer.
  ======================================================= */

  const COOLDOWN_SECONDS = 60;

  const COOLDOWN_KEY = "portfolio_contact_last_sent";

  const [cooldown, setCooldown] = useState(0);

  /* =======================================================
     RESTORE COOLDOWN AFTER PAGE LOAD / REFRESH
  ======================================================= */

  useEffect(() => {
    const updateCooldown = () => {
      const lastSent = localStorage.getItem(COOLDOWN_KEY);

      if (!lastSent) {
        setCooldown(0);
        return;
      }

      const elapsed = Math.floor((Date.now() - Number(lastSent)) / 1000);

      const remaining = COOLDOWN_SECONDS - elapsed;

      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        setCooldown(0);
        localStorage.removeItem(COOLDOWN_KEY);
      }
    };

    // Check immediately when component loads
    updateCooldown();

    // Update every second
    const interval = setInterval(updateCooldown, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     INPUT
  ======================================================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =======================================================
     COPY EMAIL
  ======================================================= */

  const handleCopyEmail = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText("pattanayakp2002@gmail.com");

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  /* =======================================================
     SEND EMAIL
  ======================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    /* -----------------------------------------------
       STOP SUBMISSION IF COOLDOWN IS ACTIVE
    ----------------------------------------------- */

    if (cooldown > 0) {
      return;
    }

    /* -----------------------------------------------
       PREVENT DOUBLE CLICK WHILE SUBMITTING
    ----------------------------------------------- */

    if (status === "submitting") {
      return;
    }

    setStatus("submitting");

    const serviceId = import.meta.env.VITE_SERVICE_ID;

    const templateId = import.meta.env.VITE_TEMPLATE_ID;

    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
      () => {
        /* -----------------------------------------
             EMAIL SENT SUCCESSFULLY
          ----------------------------------------- */

        setStatus("success");

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        /* -----------------------------------------
             START 60 SECOND COOLDOWN

             IMPORTANT:
             We store the exact timestamp, not
             simply "60", so page reload will still
             know how much time remains.
          ----------------------------------------- */

        const now = Date.now();

        localStorage.setItem(COOLDOWN_KEY, String(now));

        setCooldown(COOLDOWN_SECONDS);

        setTimeout(() => {
          setStatus("idle");
        }, 4500);
      },

      (error) => {
        /* -----------------------------------------
             EMAIL FAILED

             Cooldown DOES NOT start if EmailJS
             fails.
          ----------------------------------------- */

        console.error("EmailJS error:", error?.text || error);

        setStatus("error");

        setTimeout(() => {
          setStatus("idle");
        }, 4500);
      },
    );
  };

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        scroll-mt-24
        pt-4
        pb-20
      "
    >
      <ContactBackground />

      <div className="container-custom relative z-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <Motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-10
            flex
            flex-wrap
            items-end
            justify-between
            gap-5
          "
        >
          <div>
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
                font-mono
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-primary
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              Let's talk
            </div>

            <h2
              className="
                font-display
                text-4xl
                font-bold
                leading-none
                tracking-tight
                text-slate-950
                dark:text-white
                sm:text-5xl
              "
            >
              Get in <span className="gradient-text">Touch</span>
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                font-medium
                leading-6
                text-slate-600
                dark:text-slate-400
                sm:text-base
              "
            >
              Have an opportunity, project, or idea? Send me a message and let's
              connect.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/30
              bg-emerald-500/10
              px-3
              py-1.5
              text-xs
              font-medium
              text-emerald-600
              dark:text-emerald-400
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-emerald-400
                  opacity-75
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
              />
            </span>
            Available for opportunities
          </div>
        </Motion.div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[0.85fr_1.15fr]
          "
        >
          {/* =================================================
              LEFT CARD
          ================================================= */}

          <TiltCard intensity={5} className="h-full">
            <div
              className="
                group
                relative
                h-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white/70
                p-6
                shadow-xl
                shadow-slate-900/5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.035]
                dark:shadow-black/20
                sm:p-8
              "
            >
              <CardGlow />

              <div className="relative z-10">
                <div
                  className="
                    mb-6
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-primary/20
                    bg-primary/10
                    text-primary
                  "
                >
                  <Mail className="h-5 w-5" />
                </div>

                <h3
                  className="
                    text-xl
                    font-bold
                    text-slate-950
                    dark:text-white
                  "
                >
                  Let's build something
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  I'm always open to discussing new projects, opportunities,
                  collaborations, and interesting ideas.
                </p>

                {/* EMAIL */}

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="
                    mt-7
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-left
                    transition-all
                    hover:border-primary/30
                    hover:bg-primary/5
                    dark:border-white/10
                    dark:bg-white/[0.025]
                    dark:hover:bg-white/[0.05]
                  "
                >
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-slate-400
                      "
                    >
                      Email
                    </p>

                    <p
                      className="
                        mt-1
                        break-all
                        text-sm
                        font-medium
                        text-slate-800
                        dark:text-slate-200
                      "
                    >
                      pattanayakp2002@gmail.com
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {copied ? (
                      <Motion.div
                        key="copied"
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        className="text-emerald-500"
                      >
                        <Check className="h-4 w-4" />
                      </Motion.div>
                    ) : (
                      <Motion.div
                        key="copy"
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        className="
                          text-slate-400
                          transition-colors
                          group-hover:text-primary
                        "
                      >
                        <Copy className="h-4 w-4" />
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* SOCIALS */}

                <div className="mt-7">
                  <p
                    className="
                      mb-3
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                    "
                  >
                    Find me online
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {SOCIALS.map((social) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={social.label}
                          className="
                            group/social
                            relative
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:scale-105
                            hover:border-transparent
                            dark:border-white/10
                            dark:bg-white/[0.035]
                          "
                          style={{
                            "--social-glow": social.glow,
                          }}
                        >
                          <Icon
                            className={`
                              h-4
                              w-4
                              transition-transform
                              duration-300
                              group-hover/social:scale-110
                              ${social.accent}
                            `}
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <TiltCard intensity={4} className="h-full">
            <div
              className="
                relative
                h-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white/80
                p-6
                shadow-xl
                shadow-slate-900/5
                backdrop-blur-xl
                dark:border-white/10
                dark:bg-white/[0.035]
                dark:shadow-black/20
                sm:p-8
              "
            >
              <div className="relative z-10">
                <div className="mb-7">
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-primary
                    "
                  >
                    Send a message
                  </p>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      text-slate-950
                      dark:text-white
                    "
                  >
                    Start a conversation
                  </h3>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      disabled={status === "submitting"}
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-primary/50
                        focus:ring-4
                        focus:ring-primary/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/[0.025]
                        dark:text-white
                      "
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      disabled={status === "submitting"}
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-primary/50
                        focus:ring-4
                        focus:ring-primary/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/[0.025]
                        dark:text-white
                      "
                    />
                  </div>

                  {/* MESSAGE */}

                  <div>
                    <label
                      htmlFor="message"
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={6}
                      disabled={status === "submitting"}
                      className="
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition-all
                        placeholder:text-slate-400
                        focus:border-primary/50
                        focus:ring-4
                        focus:ring-primary/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-white/10
                        dark:bg-white/[0.025]
                        dark:text-white
                      "
                    />
                  </div>

                  {/* STATUS */}

                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <Motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                        }}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-2xl
                          border
                          border-emerald-500/20
                          bg-emerald-500/10
                          px-4
                          py-3
                          text-sm
                          text-emerald-600
                          dark:text-emerald-400
                        "
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Message sent successfully!
                      </Motion.div>
                    )}

                    {status === "error" && (
                      <Motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                        }}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-2xl
                          border
                          border-red-500/20
                          bg-red-500/10
                          px-4
                          py-3
                          text-sm
                          text-red-600
                          dark:text-red-400
                        "
                      >
                        <XCircle className="h-4 w-4" />
                        Something went wrong. Please try again.
                      </Motion.div>
                    )}
                  </AnimatePresence>

                  {/* =================================================
                      SEND BUTTON
                  ================================================= */}

                  <button
                    type="submit"
                    disabled={status === "submitting" || cooldown > 0}
                    className="
                      group
                      relative
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      overflow-hidden
                      rounded-2xl
                      bg-primary
                      px-5
                      py-3.5
                      text-sm
                      font-semibold
                      text-primary-foreground
                      shadow-lg
                      shadow-primary/20
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-xl
                      hover:shadow-primary/25
                      disabled:cursor-not-allowed
                      disabled:translate-y-0
                      disabled:opacity-60
                    "
                  >
                    {/* Shine */}

                    <span
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        -translate-x-full
                        bg-gradient-to-r
                        from-transparent
                        via-white/20
                        to-transparent
                        transition-transform
                        duration-700
                        group-hover:translate-x-full
                      "
                    />

                    {/* SUBMITTING */}

                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : cooldown > 0 ? (
                      <>
                        <Loader2 className="h-4 w-4" />
                        Please wait {cooldown}s
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send Message
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>

                  {/* COOLDOWN INFO */}

                  {cooldown > 0 && (
                    <p
                      className="
                        text-center
                        text-[11px]
                        font-medium
                        text-slate-400
                      "
                    >
                      You can send another message after the cooldown ends.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
