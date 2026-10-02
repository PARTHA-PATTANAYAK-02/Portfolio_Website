import { useRef, useState } from "react";

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
   No extra package required
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
   👉 Later only change the href values
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

    setStatus("submitting");

    const serviceId = import.meta.env.VITE_SERVICE_ID;

    const templateId = import.meta.env.VITE_TEMPLATE_ID;

    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
      () => {
        setStatus("success");

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setStatus("idle");
        }, 4500);
      },

      (error) => {
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
              px-3.5
              py-2
              font-mono
              text-[10px]
              font-semibold
              uppercase
              tracking-widest
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
            grid-cols-1
            items-stretch
            gap-5
            lg:grid-cols-12
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <Motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              flex
              h-full
              flex-col
              gap-4
              lg:col-span-5
            "
          >
            {/* =================================================
                EMAIL
            ================================================= */}

            <TiltCard intensity={6}>
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white/80
                  p-5
                  shadow-xl
                  shadow-slate-900/[0.06]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-primary/40
                  hover:shadow-2xl
                  hover:shadow-primary/10

                  dark:border-slate-800/80
                  dark:bg-slate-950/65
                  dark:shadow-black/20
                "
              >
                <CardGlow />

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-primary/20
                      bg-primary/10
                      shadow-lg
                      shadow-primary/10
                      transition-all
                      duration-500
                      group-hover:rotate-3
                      group-hover:scale-110
                    "
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        font-mono
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Email
                    </p>

                    <a
                      href="mailto:pattanayakp2002@gmail.com"
                      className="
                        mt-1
                        block
                        truncate
                        text-sm
                        font-bold
                        text-slate-950
                        transition-colors
                        hover:text-primary
                        dark:text-white
                        sm:text-base
                      "
                    >
                      pattanayakp2002@gmail.com
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-primary/40
                      hover:bg-primary/10
                      hover:text-primary

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-400
                    "
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {copied && (
                  <Motion.p
                    initial={{
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      relative
                      z-10
                      mt-3
                      pl-16
                      font-mono
                      text-[9px]
                      font-medium
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  >
                    Copied to clipboard
                  </Motion.p>
                )}
              </div>
            </TiltCard>

            {/* =================================================
                LET'S CONNECT
            ================================================= */}

            <TiltCard intensity={7} className="flex-1">
              <div
                className="
                  group
                  relative
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white/80
                  p-5
                  shadow-xl
                  shadow-slate-900/[0.06]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-primary/40
                  hover:shadow-2xl
                  hover:shadow-primary/10

                  dark:border-slate-800/80
                  dark:bg-slate-950/65
                  dark:shadow-black/20

                  sm:p-6
                "
              >
                <CardGlow />

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                  "
                >
                  {/* HEADER */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          font-mono
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.2em]
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        Find me online
                      </p>

                      <h3
                        className="
                          mt-1
                          text-xl
                          font-bold
                          tracking-tight
                          text-slate-950
                          dark:text-white
                        "
                      >
                        Let's connect
                      </h3>
                    </div>

                    <ArrowUpRight
                      className="
                        h-5
                        w-5
                        text-slate-400
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-primary
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-3
                      max-w-md
                      text-xs
                      font-medium
                      leading-5
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    Follow my work, coding journey, and professional updates
                    across the platforms below.
                  </p>

                  {/* =================================================
                      SOCIAL GRID — 6 CARDS
                  ================================================= */}

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-3
                      sm:grid-cols-3
                    "
                  >
                    {SOCIALS.map((social) => {
                      const Icon = social.icon;

                      return (
                        <Motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          whileHover={{
                            y: -6,
                            scale: 1.025,
                          }}
                          whileTap={{
                            scale: 0.97,
                          }}
                          className="
                            group/social
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-slate-50/80
                            px-3
                            py-4
                            text-center
                            shadow-sm
                            transition-all
                            duration-300
                            hover:border-primary/30
                            hover:bg-white
                            hover:shadow-xl
                            hover:shadow-primary/10

                            dark:border-slate-800
                            dark:bg-slate-900/60
                            dark:hover:bg-slate-900
                          "
                        >
                          {/* Glow */}

                          <div
                            aria-hidden
                            className="
                              absolute
                              inset-0
                              opacity-0
                              transition-opacity
                              duration-300
                              group-hover/social:opacity-100
                            "
                            style={{
                              background: `radial-gradient(
                                circle at 50% 0%,
                                ${social.glow},
                                transparent 68%
                              )`,
                            }}
                          />

                          {/* Shine */}

                          <div
                            aria-hidden
                            className="
                              absolute
                              -left-10
                              top-0
                              h-full
                              w-8
                              rotate-[20deg]
                              bg-white/30
                              opacity-0
                              blur-sm
                              transition-all
                              duration-500
                              group-hover/social:left-[120%]
                              group-hover/social:opacity-100
                            "
                          />

                          <div
                            className="
                              relative
                              z-10
                            "
                          >
                            <div
                              className="
                                mx-auto
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                shadow-sm
                                transition-all
                                duration-300
                                group-hover/social:scale-110
                                group-hover/social:rotate-3

                                dark:border-slate-700
                                dark:bg-slate-950
                              "
                            >
                              <Icon
                                className={`
                                  h-5
                                  w-5
                                  ${social.accent}
                                  transition-transform
                                  duration-300
                                  group-hover/social:scale-110
                                `}
                              />
                            </div>

                            <span
                              className="
                                mt-2.5
                                block
                                text-[10px]
                                font-bold
                                text-slate-700
                                transition-colors
                                group-hover/social:text-slate-950

                                dark:text-slate-400
                                dark:group-hover/social:text-white
                              "
                            >
                              {social.label}
                            </span>

                            <span
                              className="
                                mt-1
                                block
                                font-mono
                                text-[8px]
                                uppercase
                                tracking-wider
                                text-slate-400
                                opacity-0
                                transition-all
                                duration-300
                                group-hover/social:opacity-100
                                dark:text-slate-600
                              "
                            >
                              Visit
                            </span>
                          </div>
                        </Motion.a>
                      );
                    })}
                  </div>

                  {/* SMALL FOOTER */}

                  <div
                    className="
                      mt-auto
                      flex
                      items-center
                      gap-3
                      pt-5
                    "
                  >
                    <span
                      className="
                        h-px
                        flex-1
                        bg-slate-200
                        dark:bg-slate-800
                      "
                    />

                    <span
                      className="
                        whitespace-nowrap
                        font-mono
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-slate-400
                        dark:text-slate-500
                      "
                    >
                      Let's build something
                    </span>

                    <span
                      className="
                        h-px
                        flex-1
                        bg-slate-200
                        dark:bg-slate-800
                      "
                    />
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* =================================================
                RESUME
            ================================================= */}

            <Motion.a
              href="/Partha_Resume.pdf"
              download
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-primary/30
                bg-gradient-to-r
                from-primary
                to-fuchsia-500
                p-5
                text-white
                shadow-xl
                shadow-primary/20
                transition-all
                duration-500
                hover:shadow-2xl
                hover:shadow-primary/40
              "
            >
              <Motion.div
                animate={{
                  x: ["-120%", "220%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  top-0
                  h-full
                  w-16
                  rotate-[20deg]
                  bg-white/20
                  blur-md
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/10
                      backdrop-blur-md
                      transition-all
                      duration-300
                      group-hover:rotate-3
                      group-hover:scale-110
                    "
                  >
                    <Download className="h-5 w-5" />
                  </div>

                  <div>
                    <p
                      className="
                        font-mono
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-white/70
                      "
                    >
                      Want to know more?
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-sm
                        font-bold
                      "
                    >
                      Download my resume
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  className="
                    h-5
                    w-5
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </div>
            </Motion.a>
          </Motion.div>

          {/* =================================================
              RIGHT — FORM
          ================================================= */}

          <Motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              flex
              h-full
              lg:col-span-7
            "
          >
            <TiltCard intensity={3} className="h-full w-full">
              <div
                className="
                  group
                  relative
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white/80
                  p-5
                  shadow-2xl
                  shadow-slate-900/[0.07]
                  backdrop-blur-2xl

                  dark:border-slate-800/80
                  dark:bg-slate-950/65
                  dark:shadow-black/25

                  sm:p-6
                  lg:p-7
                "
              >
                <div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-64
                    w-64
                    rounded-full
                    bg-primary/[0.07]
                    blur-[90px]
                    transition-all
                    duration-700
                    group-hover:bg-primary/[0.12]
                  "
                />

                <div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -left-32
                    h-64
                    w-64
                    rounded-full
                    bg-cyan-500/[0.05]
                    blur-[100px]
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                  "
                >
                  {/* FORM HEADER */}

                  <div
                    className="
                      mb-6
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-2xl
                          border
                          border-primary/20
                          bg-primary/10
                          shadow-lg
                          shadow-primary/10
                          transition-all
                          duration-500
                          group-hover:rotate-3
                          group-hover:scale-105
                        "
                      >
                        <Send className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <p
                          className="
                            font-mono
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          Contact form
                        </p>

                        <h3
                          className="
                            mt-0.5
                            text-lg
                            font-bold
                            tracking-tight
                            text-slate-950
                            dark:text-white
                          "
                        >
                          Send a message
                        </h3>
                      </div>
                    </div>

                    <div
                      className="
                        hidden
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-emerald-500/30
                        bg-emerald-500/10
                        px-3
                        py-1.5
                        font-mono
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-widest
                        text-emerald-600
                        dark:text-emerald-400
                        sm:flex
                      "
                    >
                      <span
                        className="
                          h-1.5
                          w-1.5
                          animate-pulse
                          rounded-full
                          bg-emerald-500
                        "
                      />
                      Secure
                    </div>
                  </div>

                  {/* FORM */}

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="
                      flex
                      flex-1
                      flex-col
                      gap-4
                    "
                  >
                    {/* NAME */}

                    <div>
                      <label
                        htmlFor="name"
                        className="
                          mb-2
                          block
                          font-mono
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-widest
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        Your name
                      </label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="John Doe"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50/70
                          px-4
                          py-3.5
                          text-sm
                          font-medium
                          text-slate-950
                          outline-none
                          placeholder:text-slate-400
                          transition-all
                          duration-300
                          hover:border-slate-300
                          focus:border-primary/60
                          focus:bg-white
                          focus:shadow-[0_0_0_4px_hsl(262_83%_58%_/_0.10)]

                          dark:border-slate-800
                          dark:bg-slate-900/60
                          dark:text-white
                          dark:placeholder:text-slate-600
                          dark:hover:border-slate-700
                          dark:focus:bg-slate-900
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
                          font-mono
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-widest
                          text-slate-600
                          dark:text-slate-400
                        "
                      >
                        Your email
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="john@example.com"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50/70
                          px-4
                          py-3.5
                          text-sm
                          font-medium
                          text-slate-950
                          outline-none
                          placeholder:text-slate-400
                          transition-all
                          duration-300
                          hover:border-slate-300
                          focus:border-primary/60
                          focus:bg-white
                          focus:shadow-[0_0_0_4px_hsl(262_83%_58%_/_0.10)]

                          dark:border-slate-800
                          dark:bg-slate-900/60
                          dark:text-white
                          dark:placeholder:text-slate-600
                          dark:hover:border-slate-700
                          dark:focus:bg-slate-900
                        "
                      />
                    </div>

                    {/* MESSAGE */}

                    <div className="flex flex-1 flex-col">
                      <div
                        className="
                          mb-2
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <label
                          htmlFor="message"
                          className="
                            font-mono
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-widest
                            text-slate-600
                            dark:text-slate-400
                          "
                        >
                          Message
                        </label>

                        <span
                          className="
                            font-mono
                            text-[9px]
                            font-medium
                            text-slate-400
                            dark:text-slate-600
                          "
                        >
                          {formData.message.length}/500
                        </span>
                      </div>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        maxLength={500}
                        placeholder="Tell me about your project or opportunity..."
                        className="
                          min-h-[180px]
                          w-full
                          flex-1
                          resize-none
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50/70
                          px-4
                          py-3.5
                          text-sm
                          font-medium
                          leading-6
                          text-slate-950
                          outline-none
                          placeholder:text-slate-400
                          transition-all
                          duration-300
                          hover:border-slate-300
                          focus:border-primary/60
                          focus:bg-white
                          focus:shadow-[0_0_0_4px_hsl(262_83%_58%_/_0.10)]

                          dark:border-slate-800
                          dark:bg-slate-900/60
                          dark:text-white
                          dark:placeholder:text-slate-600
                          dark:hover:border-slate-700
                          dark:focus:bg-slate-900
                        "
                      />
                    </div>

                    {/* SEND */}

                    <Motion.button
                      whileHover={
                        status === "idle"
                          ? {
                              y: -3,
                              scale: 1.01,
                            }
                          : {}
                      }
                      whileTap={
                        status === "idle"
                          ? {
                              scale: 0.98,
                            }
                          : {}
                      }
                      type="submit"
                      disabled={status !== "idle"}
                      className={`
                        group/button
                        relative
                        w-full
                        overflow-hidden
                        rounded-2xl
                        px-6
                        py-4
                        text-sm
                        font-bold
                        shadow-xl
                        transition-all
                        duration-300

                        ${
                          status === "idle"
                            ? "bg-gradient-to-r from-primary via-primary to-fuchsia-500 text-white shadow-primary/20 hover:shadow-2xl hover:shadow-primary/35"
                            : status === "submitting"
                              ? "cursor-wait bg-primary/70 text-white"
                              : status === "success"
                                ? "bg-emerald-500 text-white shadow-emerald-500/30"
                                : "bg-red-500 text-white shadow-red-500/30"
                        }
                      `}
                    >
                      {status === "idle" && (
                        <Motion.div
                          animate={{
                            x: ["-120%", "220%"],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                          }}
                          className="
                            pointer-events-none
                            absolute
                            top-0
                            h-full
                            w-16
                            rotate-[20deg]
                            bg-white/20
                            blur-md
                          "
                        />
                      )}

                      <AnimatePresence mode="wait" initial={false}>
                        <Motion.span
                          key={status}
                          initial={{
                            opacity: 0,
                            y: 7,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -7,
                          }}
                          className="
                            relative
                            z-10
                            flex
                            items-center
                            justify-center
                            gap-2.5
                          "
                        >
                          {status === "idle" && (
                            <>
                              <Send
                                className="
                                  h-4
                                  w-4
                                  transition-transform
                                  duration-300
                                  group-hover/button:-rotate-6
                                "
                              />
                              Send Message
                              <ArrowUpRight
                                className="
                                  h-3.5
                                  w-3.5
                                  opacity-70
                                  transition-transform
                                  duration-300
                                  group-hover/button:-translate-y-0.5
                                  group-hover/button:translate-x-0.5
                                "
                              />
                            </>
                          )}

                          {status === "submitting" && (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          )}

                          {status === "success" && (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Message sent successfully
                            </>
                          )}

                          {status === "error" && (
                            <>
                              <XCircle className="h-4 w-4" />
                              Something went wrong
                            </>
                          )}
                        </Motion.span>
                      </AnimatePresence>
                    </Motion.button>
                  </form>

                  {/* FOOTER */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-center
                      gap-2
                      font-mono
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-widest
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    Straight to my inbox
                    <span className="h-1 w-1 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
