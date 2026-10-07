import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion as Motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useTheme } from "../providers/ThemeContext";
import { PROJECTS } from "../../data/projects";
import { JOURNEY } from "../../data/journey";
import { ACHIEVEMENT, CERTIFICATES } from "../../data/certificates";

/* ================= Config ================= */
const W = 170;
const H = 190;
const CW = 380;
const CH = 420;
const MARGIN = 8;
const SLEEP_MS = 120000;
const LOAF_MS = 30000;
const DRAG_PX = 5;
const HOLD_MS = 480;
const KEY = "petBuddyPos-v8";
const FALL_KEY = "petBuddyFell-v8";
const STREAK_KEY = "petBuddyStreak-v8";
const SPRING = { stiffness: 210, damping: 22, mass: 0.9 };
const LOOK = { stiffness: 110, damping: 16 };

/* ================= Messages ================= */
const CLICK = [
  "Meow! 🐱",
  "Purr... 😽",
  "Hey human! 👋",
  "Stop poking! 😾",
  "Nya! 🐾",
  "Busy napping! 💤",
  "What do you need? 🙀",
  "Mrrrow? 😺",
  "Boop! 👃",
  "Ki korcho? 😺",
  "Yes, yes, I'm cute 😼",
  "That tickles! 😹",
];
const DBL = [
  "Nyaaa!! 😻",
  "Wheee! 🌀",
  "Backflip! 🤸",
  "Ta-da! ✨",
  "Do it again! 😹",
  "Ninja cat! 🥷",
];
const TRIPLE = [
  "HISS! 😾",
  "Enough poking!! 💢",
  "I will scratch you 🙀",
  "Hmph! 😤",
  "Ask nicely! 😠",
];
const DRAG = [
  "Where are you taking me? 😹",
  "Put me down! 😿",
  "Weee! 🐈",
  "Gentle paws! 🐾",
  "I'm flying! 🪽",
  "Hold me tight! 🙀",
  "Are we there yet? 🚗",
  "Wheeeee! 🌪️",
];
const DROP = [
  "Landed! 😼",
  "New spot, nice 😸",
  "Mine now 🐾",
  "Smooth! 😺",
  "Cozy here 🛋️",
];
const PET = [
  "Purrrrr... 😽",
  "So good... 💖",
  "Mrrrrr 😻",
  "Don't stop! 🥰",
  "Ador koro amake 🥰",
];
const IDLE = [
  "Fish? 🐟",
  "Nap time 💤",
  "Pet me! 🐾",
  "I'm watching 👀",
  "Sunbeam? ☀️",
  "Yarn ball? 🧶",
  "Treats? 🍗",
  "Is that a bird? 🐦",
  "Alt + click = treat 🐟",
  "Tail is right there... 😼",
  "Zoomies soon 💨",
  "Pet me or else 😼",
];
const BANGLISH = [
  "Khide peyeche! 🍽️",
  "Mach de! 🐟",
  "Ador koro amake 🥰",
  "Ghum asche 😴",
  "Ki korcho? 🤔",
  "Bhalo achhi 😸",
];
const SCROLL = [
  "Whoa, scrolling! 🌀",
  "Are you reading? 📖",
  "Down we go ⬇️",
  "So much page! 📜",
  "Slow down! 😵",
];
const TYPE = [
  "Typing? So fast! ⌨️",
  "Click clack 🐾",
  "Writing code? 💻",
  "I can help (by sitting on it) 😼",
];
const YUM = [
  "Yum! 😋",
  "Nom nom nom 🐟",
  "Delicious! 😻",
  "More please! 🙏",
  "Best fish ever! 🐟",
];
const BURST = ["🐾", "💜", "✨", "🐱", "🐟", "💖", "⭐"];
const CONFETTI = ["🎉", "🎊", "✨", "💖", "⭐", "🌟", "💜", "🥳"];

const HOUR_MSGS = {
  6: "Wake up! ☀️",
  7: "Breakfast time? 🥞",
  8: "Breakfast! 🥞",
  11: "Hungry yet? 🍕",
  12: "Lunch time! 🍱",
  13: "Lunch time! 🍱",
  15: "Tea time? 🍵",
  16: "Snack o'clock 🍪",
  17: "Tea time ☕",
  18: "Sunset vibes 🌅",
  19: "Dinner time! 🍽️",
  20: "Dinner? Fish please 🐟",
  21: "Sleep soon... 💤",
  22: "Bed time 🌙",
  23: "It's late... sleep soon 😴",
  0: "Go to bed! 🛏️",
  1: "Why are you awake? 🦉",
};

const MILESTONES = [
  { ms: 3 * 60 * 1000, msg: "3 minutes together! 🎉" },
  { ms: 10 * 60 * 1000, msg: "10 min! Best friends 💖" },
  { ms: 30 * 60 * 1000, msg: "30 min! Take a break ☕" },
  { ms: 60 * 60 * 1000, msg: "1 hour together! ☕" },
  { ms: 2 * 60 * 60 * 1000, msg: "2 hrs! Break time ☕" },
];

const PORTFOLIO_FACTS = [
  { section: "home", text: "Partha Pattanayak is a Full Stack Developer, MERN Stack Developer, Java Developer, and problem solver based in Kolkata, India. He is open to work." },
  { section: "home", text: "Portfolio statistics: 10+ projects, 15+ technologies, 500+ DSA problems solved, and 4+ years coding." },
  { section: "about", text: "Education and graduation: Partha completed a B.Tech in Information Technology from College of Engineering & Management, Kolaghat, in 2025 (2021–2025)." },
  { section: "about", text: "Languages: English, Hindi, and Bengali. Location: Kolkata, India. Status: Open to work." },
  { section: "about", text: "Current focus: full-stack apps with MERN and Java, DSA and backend development, and Generative AI integration." },
  { section: "about", text: "Experience: Partha completed a 100-hour Data Analysis internship at DST InfoSolutions Pvt. Ltd. and participated in the GHCI 2025 hackathon." },
  { section: "about", text: "Interests: gaming, music, cricket, and travel." },
  { section: "skills", text: "Tech stack — frontend skills: HTML, CSS, JavaScript, React.js, Tailwind CSS, Bootstrap, React Router, and Vite." },
  { section: "skills", text: "Tech stack — backend and database skills: Node.js, Express.js, REST APIs, MongoDB, and MySQL." },
  { section: "skills", text: "Programming languages and CS fundamentals: JavaScript, Java, Python, C, DSA, OOP, and DBMS." },
  { section: "skills", text: "Developer tools: Git, GitHub, VS Code, Postman, and npm. Currently learning Java and DSA, Generative AI, and backend architecture." },
  { section: "contact", text: "Contact Partha by email at pattanayakp2002@gmail.com. He is available for opportunities and project discussions." },
];

const HELPER_QUESTIONS = [
  { label: "Who is Partha?", question: "Who is Partha?" },
  { label: "Skills & tech stack", question: "What skills does Partha have?" },
  { label: "Projects", question: "What projects has Partha built?" },
  { label: "Education", question: "Where did Partha graduate?" },
  { label: "Experience", question: "What experience does Partha have?" },
  { label: "Certifications", question: "What certificates does Partha have?" },
  { label: "Currently learning", question: "What is Partha currently learning?" },
  { label: "Contact", question: "What is Partha's email?" },
];

function renderHelperAnswer(text) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const url = part.replace(/[.,;!?]+$/, "");
    const trailing = part.slice(url.length);
    return (
      <span key={`${index}-${part}`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#8b5cf6", textDecoration: "underline" }}
        >
          {url}
        </a>
        {trailing}
      </span>
    );
  });
}

const pick = (a) => a[Math.floor(Math.random() * a.length)];

function answerPortfolioQuestion(question) {
  const query = question.toLowerCase();
  const factAnswer = (section, predicate = () => true) => {
    const match = PORTFOLIO_FACTS.find(
      (fact) => fact.section === section && predicate(fact.text.toLowerCase()),
    );
    return match?.text || null;
  };

  if (/\b(who are you|what are you|your name)\b/.test(query))
    return "I'm Partha's portfolio cat and helper! I can tell you about his skills, projects, education, experience, certifications, and contact details.";
  if (/\b(who is partha|about partha|tell me about partha)\b/.test(query))
    return factAnswer("home", (text) => text.includes("partha pattanayak"));
  if (/\b(learn|learning|currently working|current focus)\b/.test(query))
    return factAnswer("skills", (text) => text.includes("currently learning"));

  const asksEducation =
    /\b(education|educated|study|studied|studying|school|college|degree|graduate|graduated)\b|porashona|college|graduate/.test(
      query,
    );
  if (asksEducation)
    return factAnswer("about", (text) => text.includes("education and graduation"));
  if (
    /\b(where|location|located|city|based|live|lives|hometown)\b|kothay|thake|thako/.test(
      query,
    )
  )
    return factAnswer("about", (text) => text.includes("location:"));
  if (/\b(email|contact|reach|hire)\b/.test(query))
    return factAnswer("contact");
  if (/\b(experience|internship|intern|hackathon)\b/.test(query))
    return factAnswer("about", (text) => text.includes("experience:"));
  if (/\b(language|speak|languages)\b/.test(query))
    return factAnswer("about", (text) => text.startsWith("languages:"));
  if (/\b(hobby|hobbies|interest|interests|cricket|gaming|music|travel)\b/.test(query))
    return factAnswer("about", (text) => text.startsWith("interests:"));
  if (/\b(open to work|job|role|developer|what does partha do)\b/.test(query))
    return factAnswer("home", (text) => text.includes("full stack developer"));
  if (/\b(dsa|problems solved|coding years|statistics|stats)\b/.test(query))
    return factAnswer("home", (text) => text.includes("portfolio statistics"));

  const normalizeWord = (word) =>
    word.endsWith("ies")
      ? `${word.slice(0, -3)}y`
      : word.length > 4 && word.endsWith("s")
        ? word.slice(0, -1)
        : word;
  const ignored = new Set([
    "about", "and", "are", "can", "did", "does", "do", "for", "from", "he",
    "him", "his", "how", "i", "is", "it", "me", "my", "of", "on", "or",
    "please", "tell", "that", "the", "this", "to", "was", "were", "what",
    "where", "which", "who", "with", "you",
    "ache", "bolo", "gulo", "ki", "koro", "sommondhe", "tar",
  ]);
  const synonyms = {
    graduated: "graduation",
    graduate: "graduation",
    studying: "education",
    studied: "education",
    located: "location",
    lives: "location",
    worked: "experience",
    work: "experience",
    built: "project",
    made: "project",
    technologies: "technology",
    porashona: "education",
    kothay: "location",
    thake: "location",
    thako: "location",
  };
  const terms = [
    ...new Set(
      (question.toLowerCase().match(/[a-z0-9+#.]+/g) || [])
        .map((word) => synonyms[word] || normalizeWord(word))
        .filter((word) => word.length > 1 && !ignored.has(word)),
    ),
  ];
  if (!terms.length) return null;
  const namedProject = PROJECTS.find((project) => {
      const titleWords = project.title
        .toLowerCase()
        .match(/[a-z0-9+#.]+/g)
        .map(normalizeWord);
      return titleWords.every((word) => terms.includes(word));
  });
  if (
    namedProject &&
    terms.some((term) => ["github", "live", "demo", "source", "repo"].includes(term))
  ) {
    return `${namedProject.title} GitHub: ${namedProject.githubUrl}. Live demo: ${namedProject.liveUrl}.`;
  }
  if (namedProject) {
    return `${namedProject.title} (${namedProject.tagline}) — ${namedProject.shortDescription} Tech stack: ${namedProject.tech.join(", ")}. Key features: ${namedProject.features.slice(0, 4).join(", ")}.`;
  }
  if (terms.includes("project")) {
    if (!namedProject) {
      return `Partha's projects: ${PROJECTS.map(
        (project) => `${project.title} (${project.category}) — ${project.shortDescription}`,
      ).join(" ")}`;
    }
  }
  if (terms.some((term) => ["certificate", "certification"].includes(term))) {
    const namedCertificate = CERTIFICATES.find((certificate) =>
      terms.some((term) =>
        certificate.title
          .toLowerCase()
          .split(/\s+/)
          .some((word) => normalizeWord(word) === term),
      ),
    );
    if (!namedCertificate) {
      return `Partha's certifications: ${CERTIFICATES.map(
        (certificate) => `${certificate.title} (${certificate.issuer}, ${certificate.year})`,
      ).join("; ")}. ${ACHIEVEMENT.title}.`;
    }
    return `${namedCertificate.title} — ${namedCertificate.description} Issued by ${namedCertificate.issuer} in ${namedCertificate.year}.${namedCertificate.verifyUrl ? ` Verify it here: ${namedCertificate.verifyUrl}` : ""}`;
  }
  if (terms.includes("journey") || terms.includes("timeline")) {
    return `Partha's journey: ${JOURNEY.map(
      (milestone) => `${milestone.year}: ${milestone.title}`,
    ).join("; ")}.`;
  }
  if (
    terms.some((term) =>
      ["skill", "technology", "stack", "tech"].includes(term),
    ) &&
    !terms.some((term) =>
      PORTFOLIO_FACTS.some(
        (fact) =>
          fact.section === "skills" &&
          fact.text.toLowerCase().includes(term) &&
          !["skill", "technology", "stack", "tech"].includes(term),
      ),
    )
  ) {
    return `Partha's skills: ${PORTFOLIO_FACTS.filter((fact) => fact.section === "skills")
      .map((fact) => fact.text)
      .join(" ")}`;
  }

  const records = [];
  records.push(...PORTFOLIO_FACTS);
  [...new Set(PORTFOLIO_FACTS.map((fact) => fact.section))].forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.querySelectorAll("h1, h2, h3, h4, p, li, dt, dd").forEach((node) => {
      const text = node.textContent?.replace(/\s+/g, " ").trim();
      if (text && text.length > 12) records.push({ section: id, text });
    });
  });

  PROJECTS.forEach((project) => {
    records.push({
      section: "projects",
      text: `Project ${project.title} (${project.tagline}): ${project.shortDescription} ${project.fullDescription} Tech stack: ${project.tech.join(", ")}. Key features: ${project.features.join(", ")}. GitHub: ${project.githubUrl}. Live demo: ${project.liveUrl}.`,
    });
  });
  JOURNEY.forEach((milestone) =>
    records.push({
      section: "journey",
      text: `${milestone.year}: ${milestone.title}. ${milestone.description}`,
    }),
  );
  CERTIFICATES.forEach((certificate) =>
    records.push({
      section: "certifications",
      text: `Certificate / Certification: ${certificate.title}, ${certificate.issuer}, ${certificate.year}. ${certificate.description}${certificate.verifyUrl ? ` Verify: ${certificate.verifyUrl}.` : ""}`,
    }),
  );
  records.push({
    section: "certifications",
    text: `${ACHIEVEMENT.title}, ${ACHIEVEMENT.issuer}`,
  });

  const ranked = records
    .map((record) => {
      const content = new Set(
        (record.text.toLowerCase().match(/[a-z0-9+#.]+/g) || []).map(normalizeWord),
      );
      const matched = terms.filter((term) => content.has(term));
      return {
        ...record,
        score: matched.length / terms.length + matched.length * 0.2,
      };
    })
    .filter((record) => record.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!ranked.length) return null;

  const topScore = ranked[0].score;
  const relevant = ranked
    .filter((record) => record.score >= Math.max(0.35, topScore * 0.68))
    .filter(
      (record, index, all) =>
        all.findIndex(
          (candidate) =>
            candidate.section === record.section &&
            candidate.text === record.text,
        ) === index,
    )
    .slice(0, 3);
  const facts = relevant
    .map((record) => record.text)
    .join(" ");
  const maxLength = 430;
  const clippedFacts = facts.slice(0, maxLength);
  const answerText =
    facts.length > maxLength
      ? `${clippedFacts.slice(0, clippedFacts.lastIndexOf(" "))}…`
      : facts;
  return answerText;
}

function ThemeToggle({ isDark, toggle }) {
  return (
    <Motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggle}
      initial={false}
      whileHover={{ y: -1.5, scale: 1.04 }}
      whileTap="press"
      className="relative h-10 w-[72px] shrink-0 overflow-hidden rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/25"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-amber-200" />
      <Motion.span
        className="absolute inset-0 bg-gradient-to-br from-[#0a0f2e] via-[#1e1b4b] to-[#3b1f6e]"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
      {[
        { left: 10, top: 9, size: 3 },
        { left: 20, top: 22, size: 2 },
        { left: 29, top: 11, size: 2 },
        { left: 14, top: 28, size: 2 },
      ].map((star, index) => (
        <Motion.span
          key={index}
          aria-hidden="true"
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={
            isDark
              ? { opacity: [0.3, 1, 0.3], scale: 1 }
              : { opacity: 0, scale: 0 }
          }
          transition={
            isDark
              ? {
                  duration: 2 + index * 0.4,
                  repeat: Infinity,
                  delay: index * 0.25,
                }
              : { duration: 0.3 }
          }
        />
      ))}
      <Motion.span
        aria-hidden="true"
        className="absolute bottom-1.5 right-2 h-3 w-7 rounded-full bg-white/90"
        animate={{ y: isDark ? 26 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <Motion.span
        aria-hidden="true"
        className="absolute bottom-3 right-5 h-3 w-5 rounded-full bg-white/80"
        animate={{ y: isDark ? 26 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      />
      <Motion.span
        className="absolute left-1 top-1 h-8 w-8"
        animate={{ x: isDark ? 32 : 0 }}
        variants={{ press: { scaleX: 1.2 } }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Motion.span
          className="absolute inset-0"
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -120 : 0,
            scale: isDark ? 0.3 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Motion.span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full border-2 border-dashed border-amber-300/80"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-orange-500 shadow-[0_0_18px_rgba(251,191,36,0.9),inset_0_-3px_5px_rgba(234,88,12,0.5)]" />
        </Motion.span>
        <Motion.span
          className="absolute inset-0"
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 140,
            scale: isDark ? 1 : 0.3,
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 shadow-[0_0_16px_rgba(196,181,253,0.7),inset_-3px_-3px_6px_rgba(100,116,139,0.5)]" />
          <span className="absolute left-[7px] top-[8px] h-2.5 w-2.5 rounded-full bg-slate-400/60" />
          <span className="absolute bottom-[7px] right-[8px] h-2 w-2 rounded-full bg-slate-400/60" />
          <span className="absolute right-[7px] top-[7px] h-1 w-1 rounded-full bg-slate-400/60" />
        </Motion.span>
      </Motion.span>
    </Motion.button>
  );
}

/* ---------- time awareness ---------- */
function greetingForNow(dark = false) {
  const d = new Date();
  const h = d.getHours();
  const day = d.getDay();
  const timeOfDay =
    h >= 5 && h < 12
      ? "morning"
      : h < 17
        ? "afternoon"
        : h < 21
          ? "evening"
          : "night";
  const greetings = dark
    ? {
        morning: "Good morning! The stars are fading 🌙",
        afternoon: "Good afternoon, starlight keeper ✨",
        evening: "Good evening! The sky looks cozy 🌌",
        night: "Good night... let's watch the stars 🌙💤",
      }
    : {
        morning: "Good morning, sunshine! ☀️",
        afternoon: "Good afternoon! Hope your day is bright 🌤️",
        evening: "Good evening! Golden-hour vibes 🌇",
        night: "Good night... sweet dreams 🌙💤",
      };
  let base = greetings[timeOfDay];
  if (h < 5) {
    base = dark ? "Still up under the stars? 🦉✨" : "It's late, night owl! 🦉";
  }
  if (day === 1) base += " Happy Monday! 💪";
  else if (day === 5) base += " TGIF! 🎉";
  else if (day === 0 || day === 6) base += " Weekend! 🎈";
  return base;
}
const hourLine = (h, dark) => HOUR_MSGS[h] || greetingForNow(dark);
const dayLine = () => {
  const d = new Date().getDay();
  if (d === 1) return "Monday again... 😾";
  if (d === 5) return "It's Friday! 🎉";
  if (d === 0 || d === 6) return "Weekend vibes 😸";
  return null;
};

/* ================= 3D themes ================= */
const THEME3 = {
  light: {
    fur: "#e9a45d",
    belly: "#fff2dd",
    muzzle: "#fff0dc",
    earIn: "#f4a7a1",
    stripe: "#b9631f",
    eye: "#8cc63f",
    nose: "#e9788c",
    collar: "#e5533d",
    bell: "#f6c445",
    blush: "#ff9a8b",
    line: "#4a2c14",
    whisker: "#a88660",
    orb: "#ff9ec4",
    sheen: "#ffe2b8",
    sky: "#fff4e0",
    ground: "#d9a066",
    hemiI: 0.7,
    key: "#fff2d8",
    keyI: 2.3,
    rim: "#ffb86b",
    rimI: 1.4,
    eyeGlow: 0,
  },
  dark: {
    fur: "#33364a",
    belly: "#454a63",
    muzzle: "#4a4f68",
    earIn: "#9a5a7d",
    stripe: "#1b1c28",
    eye: "#ffd01f",
    nose: "#e48bb4",
    collar: "#6a5cff",
    bell: "#ffe9a8",
    blush: "#a35c9c",
    line: "#07070b",
    whisker: "#f0f2ff",
    orb: "#ffe27a",
    sheen: "#6d79c0",
    sky: "#5560a8",
    ground: "#14151f",
    hemiI: 0.55,
    key: "#9aa8ff",
    keyI: 1.6,
    rim: "#7b6cff",
    rimI: 3.2,
    eyeGlow: 0.9,
  },
};
const UI = {
  light: {
    glow: "rgba(255,190,100,0.55)",
    glowO: 0.4,
    bg: "#fffaf1",
    text: "#4a3320",
    border: "#ecd2a8",
    ring: "#e9a45c",
    dum: "#e5533d",
    dust: "rgba(150,115,80,.5)",
    stroke: "#fff",
  },
  dark: {
    glow: "rgba(105,118,255,0.65)",
    glowO: 0.65,
    bg: "#1c1e2a",
    text: "#ecebff",
    border: "#3b3f5c",
    ring: "#7a86ff",
    dum: "#ffd43b",
    dust: "rgba(160,165,200,.5)",
    stroke: "#09090c",
  },
};

/* ================= 3D cat (three.js) — bell now hangs from collar ================= */
function buildCat() {
  const root = new THREE.Group();
  const yaw = new THREE.Group();
  root.add(yaw);
  const flip = new THREE.Group();
  flip.position.y = 1.6;
  yaw.add(flip);
  const cat = new THREE.Group();
  cat.position.y = -1.6;
  flip.add(cat);

  const SPH = new THREE.SphereGeometry(1, 30, 22);
  const mats = {};
  const furLike = (name) =>
    (mats[name] = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      roughness: 0.88,
      metalness: 0,
      sheen: 0.6,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color("#ffffff"),
    }));
  const mk = (name, extra = {}) =>
    (mats[name] = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.82,
      metalness: 0,
      ...extra,
    }));
  ["fur", "belly", "muzzle", "earIn"].forEach(furLike);
  ["stripe", "nose", "whisker"].forEach((n) => mk(n));
  mk("collar", { roughness: 0.4, emissive: "#000000" });
  mats.iris = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    emissive: "#000000",
  });
  mk("pupil", { roughness: 0.2 });
  mk("line", { roughness: 0.6 });
  mk("bell", { roughness: 0.25, metalness: 0.7, emissive: "#000000" });
  mk("orb", { roughness: 0.4, emissive: "#000000" });
  mk("blush", { transparent: true, opacity: 0.55, depthWrite: false });
  mats.tongue = new THREE.MeshStandardMaterial({
    color: "#ef7f95",
    roughness: 0.6,
  });
  mats.white = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  mats.gold = new THREE.MeshStandardMaterial({
    color: "#ffd34d",
    roughness: 0.25,
    metalness: 0.8,
  });
  mats.ao = new THREE.MeshBasicMaterial({
    color: "#000000",
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });

  const ell = (mat, rx, ry, rz, x, y, z, parent) => {
    const m = new THREE.Mesh(SPH, mat);
    m.scale.set(rx, ry, rz);
    m.position.set(x, y, z);
    (parent || cat).add(m);
    return m;
  };

  const cv = document.createElement("canvas");
  cv.width = cv.height = 64;
  const cx = cv.getContext("2d");
  const gr = cx.createRadialGradient(32, 32, 2, 32, 32, 32);
  gr.addColorStop(0, "rgba(0,0,0,0.85)");
  gr.addColorStop(1, "rgba(0,0,0,0)");
  cx.fillStyle = gr;
  cx.fillRect(0, 0, 64, 64);
  const shTex = new THREE.CanvasTexture(cv);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: shTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.5,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.01, 0.2);
  shadow.scale.set(3.6, 1.8, 1);
  yaw.add(shadow);

  const body = new THREE.Group();
  cat.add(body);
  ell(mats.fur, 0.95, 1.2, 0.85, 0, 0.95, 0, body);
  ell(mats.belly, 0.5, 0.72, 0.25, 0, 0.85, 0.66, body);
  ell(mats.ao, 0.8, 0.32, 0.5, 0, 1.5, 0.55, body);
  [-1, 1].forEach((s) => {
    ell(mats.fur, 0.6, 0.62, 0.75, s * 0.8, 0.52, 0.1, body);
    ell(mats.fur, 0.4, 0.2, 0.52, s * 0.95, 0.18, 0.6, body);
    for (let i = -1; i <= 1; i++)
      ell(
        mats.stripe,
        0.012,
        0.07,
        0.012,
        s * 0.95 + i * 0.13,
        0.17,
        1.1,
        body,
      );
    [0.55, 0.85, 1.15].forEach((y) => {
      const st = ell(mats.stripe, 0.04, 0.26, 0.05, s * 0.9, y, 0.2, body);
      st.rotation.z = s * 0.35;
    });
    for (let i = 0; i < 2; i++) {
      const hs = ell(
        mats.stripe,
        0.04,
        0.2,
        0.05,
        s * (1.2 - i * 0.03),
        0.45 + i * 0.3,
        0.2,
        body,
      );
      hs.rotation.z = s * 0.3;
    }
  });
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.1, 14, 40),
    mats.collar,
  );
  collar.position.set(0, 1.62, 0.06);
  collar.rotation.x = Math.PI / 2 - 0.22;
  body.add(collar);

  // ★ Small bell hanging from the collar front (golay thakbe)
  const bellGroup = new THREE.Group();
  bellGroup.position.set(0, 1.48, 0.72);
  body.add(bellGroup);
  ell(mats.bell, 0.095, 0.095, 0.095, 0, 0, 0, bellGroup);
  // tiny slit to look like a bell
  const bellSlit = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.012, 0.02),
    mats.line,
  );
  bellSlit.position.set(0, -0.02, 0.08);
  bellGroup.add(bellSlit);
  // small hanging loop
  const bellLoop = new THREE.Mesh(
    new THREE.TorusGeometry(0.03, 0.008, 6, 12),
    mats.bell,
  );
  bellLoop.position.set(0, 0.09, 0);
  bellLoop.rotation.x = Math.PI / 2;
  bellGroup.add(bellLoop);

  const legF = {};
  [-1, 1].forEach((s) => {
    const g = new THREE.Group();
    g.position.set(s * 0.34, 1.3, 0.62);
    ell(mats.fur, 0.24, 0.62, 0.26, 0, -0.6, 0, g);
    ell(mats.fur, 0.3, 0.17, 0.36, 0, -1.18, 0.2, g);
    for (let i = -1; i <= 1; i += 2)
      ell(mats.stripe, 0.011, 0.06, 0.011, i * 0.08, -1.2, 0.55, g);
    body.add(g);
    legF[s] = g;
  });

  const head = new THREE.Group();
  head.position.set(0, 2.2, 0.15);
  cat.add(head);
  const sz = (x, y) =>
    1.05 * Math.sqrt(Math.max(0, 1 - (x / 1.25) ** 2 - (y / 1.0) ** 2));
  ell(mats.fur, 1.25, 1.0, 1.05, 0, 0, 0, head);
  [-1, 1].forEach((s) => {
    const r1 = ell(mats.fur, 0.42, 0.3, 0.42, s * 1.1, -0.3, 0.2, head);
    r1.rotation.z = s * -0.6;
    const r2 = ell(mats.fur, 0.3, 0.2, 0.3, s * 0.9, -0.55, 0.3, head);
    r2.rotation.z = s * -0.4;
    ell(mats.blush, 0.24, 0.15, 0.05, s * 0.85, -0.28, sz(0.85, -0.28), head);
    for (let i = 0; i < 2; i++) {
      const cs = ell(
        mats.stripe,
        0.22,
        0.034,
        0.03,
        s * 1.1,
        -0.02 - i * 0.16,
        sz(1.1, -0.02 - i * 0.16) - 0.05,
        head,
      );
      cs.rotation.y = s * 1.05;
      cs.rotation.z = s * -0.15;
    }
    ell(mats.muzzle, 0.22, 0.16, 0.2, s * 0.17, -0.38, 0.88, head);
  });
  [
    [-0.45, 0.55, 0.5],
    [-0.22, 0.68, 0.15],
    [0, 0.72, 0],
    [0.22, 0.68, -0.15],
    [0.45, 0.55, -0.5],
  ].forEach(([x, y, r]) => {
    const st = ell(mats.stripe, 0.045, 0.2, 0.03, x, y, sz(x, y), head);
    st.rotation.x = -0.6;
    st.rotation.z = r;
  });
  ell(mats.nose, 0.1, 0.07, 0.07, 0, -0.2, 0.99, head);

  const eyes = [];
  const arcGeo = new THREE.TorusGeometry(0.26, 0.045, 8, 22, Math.PI);
  [-1, 1].forEach((s) => {
    const x = s * 0.5,
      y = 0.12,
      z = sz(x, y) - 0.07;
    const eye = new THREE.Group();
    eye.position.set(x, y, z);
    ell(mats.line, 0.34, 0.37, 0.08, 0, 0, -0.01, eye);
    ell(mats.iris, 0.3, 0.33, 0.1, 0, 0, 0.02, eye);
    const pupilG = new THREE.Group();
    eye.add(pupilG);
    const pupil = ell(mats.pupil, 0.17, 0.22, 0.06, 0, 0, 0.09, pupilG);
    ell(mats.white, 0.085, 0.09, 0.04, -0.1, 0.12, 0.13, eye);
    ell(mats.white, 0.05, 0.05, 0.03, 0.1, -0.12, 0.12, eye);
    head.add(eye);
    const arc = new THREE.Mesh(arcGeo, mats.line);
    arc.position.set(x, y - 0.02, z + 0.08);
    arc.visible = false;
    head.add(arc);
    const brow = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.1, 0.07),
      mats.line,
    );
    brow.position.set(x, y + 0.45, z);
    brow.rotation.z = s * -0.4;
    brow.visible = false;
    head.add(brow);
    eyes.push({ eye, pupilG, pupil, arc, brow, s, y });
  });

  const mouth = new THREE.Group();
  mouth.position.set(0, -0.42, 0.97);
  head.add(mouth);
  const arc = (r, x, g) => {
    const a = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.025, 6, 16, Math.PI),
      mats.line,
    );
    a.rotation.z = Math.PI;
    a.position.set(x, 0, 0);
    g.add(a);
  };
  const mv = {
    idle: new THREE.Group(),
    smile: new THREE.Group(),
    open: new THREE.Group(),
    grr: new THREE.Group(),
    lick: new THREE.Group(),
  };
  arc(0.11, -0.11, mv.idle);
  arc(0.11, 0.11, mv.idle);
  arc(0.17, -0.17, mv.smile);
  arc(0.17, 0.17, mv.smile);
  arc(0.14, -0.14, mv.lick);
  arc(0.14, 0.14, mv.lick);
  ["idle", "smile", "lick"].forEach((n) => {
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, 0.14, 0.025),
      mats.line,
    );
    line.position.y = 0.07;
    mv[n].add(line);
  });
  ell(mats.line, 0.13, 0.16, 0.06, 0, -0.08, 0, mv.open);
  ell(mats.tongue, 0.09, 0.055, 0.04, 0, -0.15, 0.03, mv.open);
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.11, 0.025, 0.035),
      mats.line,
    );
    b.position.set(-0.27 + i * 0.11, i % 2 ? 0.04 : -0.04, 0);
    b.rotation.z = i % 2 ? 0.9 : -0.9;
    mv.grr.add(b);
  }
  const tongue = ell(mats.tongue, 0.07, 0.1, 0.04, 0.1, -0.2, 0.02, mv.lick);
  Object.values(mv).forEach((g) => {
    g.visible = false;
    mouth.add(g);
  });

  const whiskers = [];
  [-1, 1].forEach((s) => {
    for (let i = 0; i < 3; i++) {
      const g = new THREE.Group();
      g.position.set(s * 0.7, -0.33 + (i - 1) * 0.1, 0.85);
      g.rotation.set(0, -s * (0.4 + i * 0.08), s * (1 - i) * 0.28);
      const c = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.008, 1.6, 6),
        mats.whisker,
      );
      c.rotation.z = Math.PI / 2;
      c.position.x = s * 0.8;
      g.add(c);
      head.add(g);
      whiskers.push(g);
    }
  });

  const earShape = (w, h) => {
    const sh = new THREE.Shape();
    sh.moveTo(-w + 0.12, 0);
    sh.lineTo(w - 0.12, 0);
    sh.quadraticCurveTo(w, 0, w - 0.06, 0.16);
    sh.lineTo(0.1, h - 0.14);
    sh.quadraticCurveTo(0, h + 0.05, -0.1, h - 0.14);
    sh.lineTo(-w + 0.06, 0.16);
    sh.quadraticCurveTo(-w, 0, -w + 0.12, 0);
    return sh;
  };
  const earGeo = new THREE.ExtrudeGeometry(earShape(0.56, 1.25), {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.09,
    bevelSegments: 5,
    curveSegments: 14,
  });
  earGeo.translate(0, 0, -0.06);
  const earInGeo = new THREE.ExtrudeGeometry(earShape(0.34, 0.88), {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.05,
    bevelSegments: 4,
    curveSegments: 12,
  });
  const mkEar = (s) => {
    const g = new THREE.Group();
    g.position.set(s * 0.8, 0.66, -0.05);
    const outer = new THREE.Mesh(earGeo, mats.fur);
    const inner = new THREE.Mesh(earInGeo, mats.earIn);
    inner.position.set(0, 0.12, 0.13);
    g.add(outer, inner);
    head.add(g);
    return g;
  };
  const earL = mkEar(-1);
  const earR = mkEar(1);

  const tailRoot = new THREE.Group();
  tailRoot.position.set(0.8, 0.4, -0.3);
  cat.add(tailRoot);
  const tailSegs = [];
  const SEG = 0.34;
  let prev = tailRoot;
  for (let i = 0; i < 7; i++) {
    const g = new THREE.Group();
    if (i > 0) g.position.x = SEG;
    prev.add(g);
    const r = 0.17 - i * 0.011;
    const m = new THREE.Mesh(
      new THREE.CapsuleGeometry(r, SEG - 2 * r + 0.04, 6, 14),
      i === 6 ? mats.stripe : mats.fur,
    );
    m.rotation.z = Math.PI / 2;
    m.position.x = SEG / 2;
    g.add(m);
    if (i % 2 === 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r + 0.008, 0.04, 8, 20),
        mats.stripe,
      );
      ring.rotation.y = Math.PI / 2;
      ring.position.x = SEG / 2;
      g.add(ring);
    }
    tailSegs.push(g);
    prev = g;
  }

  const orbs = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.1), mats.orb);
    root.add(m);
    return { m, i };
  });

  const hemi = new THREE.HemisphereLight("#ffffff", "#444444", 1);
  const key = new THREE.DirectionalLight("#ffffff", 2);
  key.position.set(3, 6, 6);
  const rim = new THREE.DirectionalLight("#ffffff", 1);
  rim.position.set(-4, 3, -4);
  root.add(hemi, key, rim);

  const COLORS = [
    "fur",
    "belly",
    "muzzle",
    "earIn",
    "stripe",
    "nose",
    "collar",
    "whisker",
    "blush",
    "line",
    "orb",
    "iris",
    "bell",
    "pupil",
  ];
  const targets = {};
  COLORS.forEach((k) => (targets[k] = new THREE.Color("#ffffff")));
  const L = {
    hemiSky: new THREE.Color(),
    hemiGround: new THREE.Color(),
    key: new THREE.Color(),
    rim: new THREE.Color(),
    sheen: new THREE.Color(),
    hemiI: 1,
    keyI: 2,
    rimI: 1,
    eyeGlow: 0,
  };
  let first = true;
  let appliedTheme = null;
  const applyTheme = (T3) => {
    [
      "fur",
      "belly",
      "muzzle",
      "earIn",
      "stripe",
      "nose",
      "collar",
      "whisker",
      "blush",
      "line",
      "orb",
    ].forEach((k) => targets[k].set(T3[k]));
    targets.iris.set(T3.eye);
    targets.bell.set(T3.bell);
    targets.pupil.set("#0a0a0c");
    L.hemiSky.set(T3.sky);
    L.hemiGround.set(T3.ground);
    L.key.set(T3.key);
    L.rim.set(T3.rim);
    L.sheen.set(T3.sheen);
    L.hemiI = T3.hemiI;
    L.keyI = T3.keyI;
    L.rimI = T3.rimI;
    L.eyeGlow = T3.eyeGlow;
    appliedTheme = T3;
    if (first) {
      COLORS.forEach((k) => mats[k].color.copy(targets[k]));
      ["fur", "belly", "muzzle", "earIn"].forEach((k) =>
        mats[k].sheenColor.copy(L.sheen),
      );
      hemi.color.copy(L.hemiSky);
      hemi.groundColor.copy(L.hemiGround);
      key.color.copy(L.key);
      rim.color.copy(L.rim);
      hemi.intensity = L.hemiI;
      key.intensity = L.keyI;
      rim.intensity = L.rimI;
      mats.iris.emissiveIntensity = L.eyeGlow;
      first = false;
    }
  };

  const lerp = (a, b, k) => a + (b - a) * k;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const envMats = Object.values(mats).filter((m) => m.isMeshStandardMaterial);
  const F = { dir: 1, yaw: 0 };
  const Wk = { phase: 0, amp: 0 };
  const cur = {
    sy: 1,
    sx: 1,
    headY: 2.2,
    headZ: 0.15,
    headX: 0,
    roll: 0,
    legS: 1,
    lean: 0,
    tailA: 0.2,
    wrap: 0,
    puff: 1,
    sBell: 1,
    blink: 1,
    earL: 0.28,
    earR: -0.28,
    tailAmp: 0.1,
    legL: 0,
    legR: 0,
  };

  const poseTarget = (S) => {
    const p = {
      sy: 1,
      sx: 1,
      headY: 2.2,
      headZ: 0.15,
      headX: 0,
      roll: 0,
      legS: 1,
      lean: 0,
      tailA: 0.2,
      wrap: 0,
      puff: 1,
    };
    switch (S.pose) {
      case "loaf":
        Object.assign(p, {
          sy: 0.82,
          headY: 1.85,
          legS: 0.4,
          tailA: 0.1,
          wrap: -0.3,
        });
        break;
      case "sleep":
        Object.assign(p, {
          sy: 0.45,
          sx: 1.15,
          headY: 1.0,
          headZ: 0.85,
          headX: 0.35,
          roll: 0.5,
          legS: 0.15,
          tailA: 0.04,
          wrap: -0.45,
        });
        break;
      case "groom":
        Object.assign(p, { headY: 2.1, roll: -0.2 });
        break;
      case "stretch":
        Object.assign(p, { lean: 0.42, sy: 0.9, headY: 2.15, tailA: 0.32 });
        break;
      case "hang":
        Object.assign(p, { sy: 1.1, headY: 2.45, tailA: 0.02 });
        break;
      default:
        break;
    }
    if (S.petting) {
      p.headY -= 0.08;
      p.roll += 0.15;
      p.tailA = 0.3;
    }
    if (S.mood === "angry") {
      p.puff = 1.1;
      p.tailA = 0.3;
    }
    if (S.mood === "happy" || S.mood === "love" || S.mood === "shock")
      p.tailA = 0.3;
    return p;
  };

  const update = (S, t, dt) => {
    if (S.T3 !== appliedTheme) applyTheme(S.T3);
    const kc = 1 - Math.exp(-dt * 5);
    const k = 1 - Math.exp(-dt * 10);
    const kp = 1 - Math.exp(-dt * 6);
    envMats.forEach((m) => {
      m.envMapIntensity = lerp(m.envMapIntensity, S.dark ? 0.45 : 0.6, kc);
    });
    COLORS.forEach((n) => mats[n].color.lerp(targets[n], kc));
    ["fur", "belly", "muzzle", "earIn"].forEach((n) =>
      mats[n].sheenColor.lerp(L.sheen, kc),
    );
    hemi.color.lerp(L.hemiSky, kc);
    hemi.groundColor.lerp(L.hemiGround, kc);
    key.color.lerp(L.key, kc);
    rim.color.lerp(L.rim, kc);
    hemi.intensity = lerp(hemi.intensity, L.hemiI, kc);
    key.intensity = lerp(key.intensity, L.keyI, kc);
    rim.intensity = lerp(rim.intensity, L.rimI, kc);
    mats.iris.emissive.copy(mats.iris.color);
    mats.iris.emissiveIntensity = lerp(
      mats.iris.emissiveIntensity,
      L.eyeGlow,
      kc,
    );
    mats.collar.emissive.copy(mats.collar.color);
    mats.collar.emissiveIntensity = lerp(
      mats.collar.emissiveIntensity,
      S.dark ? 0.6 : 0,
      kc,
    );
    mats.orb.emissive.copy(mats.orb.color);
    mats.orb.emissiveIntensity = S.dark ? 0.9 : 0.25;
    mats.bell.emissive.copy(mats.bell.color);
    mats.bell.emissiveIntensity = S.dark ? 0.6 : 0.05;

    const { mood, sleeping, petting, dragging, hovered, eyeMode } = S;
    const shock = mood === "shock",
      angry = mood === "angry",
      happy = mood === "happy" || mood === "love" || petting;
    const speed = Math.abs(S.speed);
    const moving = speed > 25 && S.pose === "stand" && !dragging;
    const breath = Math.sin(t * (sleeping ? 1.4 : 2.4));

    if (speed > 25) F.dir = Math.sign(S.speed);
    const yawT = moving
      ? F.dir * 0.45
      : S.pose === "sleep"
        ? 0
        : S.lookX * 0.25;
    F.yaw = lerp(F.yaw, yawT, 1 - Math.exp(-dt * 5));
    yaw.rotation.y = F.yaw + S.turn;
    flip.rotation.z = S.spin;

    const pt = poseTarget(S);
    Object.keys(pt).forEach((n) => {
      cur[n] = lerp(cur[n], pt[n], kp);
    });

    const ampT = moving
      ? Math.min(1, speed / 60) * (speed > 240 ? 1.5 : 1) * 0.7
      : 0;
    Wk.amp = lerp(Wk.amp, ampT, 1 - Math.exp(-dt * 8));
    if (moving) Wk.phase += dt * Math.min(speed, 400) * 0.11;
    const ph = Wk.phase,
      A = Wk.amp;

    cat.position.y = -1.6 + Math.abs(Math.sin(ph)) * A * 0.55;
    cat.position.x = petting ? Math.sin(t * 50) * 0.012 : 0;
    cat.rotation.z =
      Math.sin(ph) * A * 0.22 + (mood === "dizzy" ? Math.sin(t * 5) * 0.1 : 0);
    cat.rotation.x = cur.lean;

    body.scale.set(
      cur.sx * cur.puff,
      cur.sy * (1 + breath * 0.012),
      cur.sx * cur.puff,
    );

    let lL = Math.sin(ph) * A * 1.0,
      lR = Math.sin(ph + Math.PI) * A * 1.0;
    if (S.pose === "groom") lR = -2.3 + Math.sin(t * 9) * 0.2;
    if (dragging) {
      lL = 0.2 + Math.sin(t * 6) * 0.25;
      lR = 0.2 + Math.sin(t * 6 + 1.5) * 0.25;
    }
    cur.legL = lerp(cur.legL, lL, k);
    cur.legR = lerp(cur.legR, lR, k);
    legF[-1].rotation.x = cur.legL;
    legF[1].rotation.x = cur.legR;
    legF[-1].scale.y = cur.legS;
    legF[1].scale.y = S.pose === "groom" ? 1 : cur.legS;

    let hx = S.lookY * 0.3,
      hy = S.lookX * 0.5,
      hz = cur.roll;
    if (sleeping) {
      hx = 0.35;
      hy = 0;
    }
    if (petting) hz += Math.sin(t * 3) * 0.1;
    if (mood === "sneeze") hx = -0.35 * Math.max(0, Math.sin(t * 16)) + 0.15;
    if (dragging) hz += Math.sin(t * 6) * 0.1;
    if (S.pose === "groom") hx = 0.3;
    head.position.set(
      cur.headX + (petting ? Math.sin(t * 50) * 0.015 : 0),
      cur.headY + breath * 0.012 + Math.abs(Math.sin(ph)) * A * 0.12,
      cur.headZ,
    );
    head.rotation.x = lerp(head.rotation.x, hx, k);
    head.rotation.y = lerp(head.rotation.y, hy, k);
    head.rotation.z = lerp(head.rotation.z, hz, k);

    let eL = 0.28,
      eR = -0.28;
    if (sleeping || petting) {
      eL = 0.9;
      eR = -0.9;
    } else if (angry || dragging) {
      eL = 1.2;
      eR = -1.2;
    } else if (hovered || shock) {
      eL = 0.1;
      eR = -0.1;
    }
    if (S.twitch === "l") eL += Math.sin(t * 40) * 0.2;
    if (S.twitch === "r") eR += Math.sin(t * 40) * 0.2;
    cur.earL = lerp(cur.earL, eL, k);
    cur.earR = lerp(cur.earR, eR, k);
    earL.rotation.z = cur.earL;
    earR.rotation.z = cur.earR;

    cur.blink = lerp(cur.blink, S.blinking ? 0.08 : 1, 1 - Math.exp(-dt * 40));
    const open = eyeMode === "open" || eyeMode === "dizzy";
    eyes.forEach((e) => {
      e.eye.visible = open;
      e.arc.visible = eyeMode === "joy" || eyeMode === "sleep";
      e.arc.rotation.z = eyeMode === "sleep" ? Math.PI : 0;
      e.arc.position.y = e.y + (eyeMode === "sleep" ? 0.12 : -0.08);
      e.brow.visible = angry;
      const s2 = shock ? 1.1 : 1;
      e.eye.scale.set(s2, s2 * cur.blink, s2);
      e.pupil.scale.set(
        shock ? 0.09 : S.dark ? 0.2 : 0.17,
        shock ? 0.13 : S.dark ? 0.25 : 0.22,
        0.06,
      );
      if (eyeMode === "dizzy")
        e.pupilG.position.set(Math.cos(t * 9) * 0.1, Math.sin(t * 9) * 0.1, 0);
      else e.pupilG.position.set(S.lookX * 0.08, -S.lookY * 0.08, 0);
    });

    Object.entries(mv).forEach(([n, g]) => (g.visible = n === S.mouth));
    tongue.position.y = -0.2 + Math.sin(t * 14) * 0.03;
    whiskers.forEach((w, i) => {
      w.rotation.x = happy ? Math.sin(t * 6 + i) * 0.08 : 0;
    });

    let tAmp = 0.12,
      tF = 1.3;
    if (sleeping) tAmp = 0.02;
    else if (dragging) {
      tAmp = 0.5;
      tF = 5;
    } else if (angry) {
      tAmp = 0.6;
      tF = 14;
    } else if (petting) {
      tAmp = 0.45;
      tF = 3;
    } else if (happy || hovered) {
      tAmp = 0.35;
      tF = 3.2;
    } else if (moving) {
      tAmp = 0.22;
      tF = 2.2;
    }
    cur.tailAmp = lerp(cur.tailAmp, tAmp, kp);
    tailSegs.forEach((g, i) => {
      g.rotation.z = cur.tailA * (0.8 + i * 0.05);
      g.rotation.y =
        cur.wrap + Math.sin(t * tF - i * 0.55) * cur.tailAmp * (0.3 + i * 0.1);
      const ts = lerp(g.scale.y, angry ? 1.7 : 1, kc);
      g.scale.y = ts;
      g.scale.z = ts;
    });

    // bell hangs from collar — always on, subtle sway
    cur.sBell = lerp(cur.sBell, 1, kc);
    bellGroup.scale.setScalar(Math.max(0.001, cur.sBell));
    bellGroup.rotation.z = Math.sin(t * 1.4) * 0.08 + Math.sin(ph) * A * 0.25;
    bellGroup.rotation.x = Math.sin(t * 1.1) * 0.05;

    orbs.forEach(({ m, i }) => {
      const a = t * (S.dark ? 0.7 : 0.5) + (i * Math.PI * 2) / 3;
      m.position.set(
        Math.cos(a) * 2.1,
        2.5 + Math.sin(t * 1.3 + i) * 0.4 + i * 0.25,
        Math.sin(a) * 1.0,
      );
      m.rotation.y = t * 2;
      m.rotation.x = t;
      m.scale.setScalar(sleeping ? 0.5 : 1 + Math.sin(t * 3 + i) * 0.2);
    });

    const lifted = clamp(1 + S.lift / 320, 0.45, 1);
    shadow.scale.set(3.6 * lifted * cur.sx, 1.8 * lifted, 1);
    shadow.material.opacity = (S.dark ? 0.6 : 0.4) * lifted;
    return F.dir;
  };

  const dispose = () => {
    root.traverse((o) => {
      if (o.geometry && o.geometry !== SPH) o.geometry.dispose();
    });
    SPH.dispose();
    shTex.dispose();
    Object.values(mats).forEach((m) => m.dispose());
  };

  return { root, hitTarget: cat, update, dispose };
}

/* ================= Component ================= */
export default function PetBuddy() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const UIt = dark ? UI.dark : UI.light;

  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(0.58);
  const [catHovered, setCatHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [webglFail, setWebglFail] = useState(false);
  const [mood, setMood] = useState("idle");
  const [message, setMessage] = useState(null);
  const [helperOpen, setHelperOpen] = useState(false);
  const [helperMessages, setHelperMessages] = useState([]);
  const [fx, setFx] = useState([]);
  const [impact, setImpact] = useState(null);
  const [sleeping, setSleeping] = useState(false);
  const [petting, setPetting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [twitch, setTwitch] = useState(null);
  const [yawn, setYawn] = useState(false);
  const [landing, setLanding] = useState(false);
  const [treat, setTreat] = useState(null);
  const [act, setAct] = useState("");
  const [confetti, setConfetti] = useState(null);

  const sc = useRef(0.58);
  const wasMobile = useRef(false);
  const safe = useCallback(
    (x, y) => {
      const mobile = sc.current < 0.5;
      const bottomInset = mobile ? 130 : MARGIN;
      return {
        x: Math.max(
          MARGIN + ((CW - W) / 2) * sc.current,
          Math.min(
            window.innerWidth - ((CW + W) / 2) * sc.current - MARGIN,
            x,
          ),
        ),
        y: Math.max(
          MARGIN + ((CH - H) / 2) * sc.current,
          Math.min(
            window.innerHeight - ((CH + H) / 2) * sc.current - bottomInset,
            y,
          ),
        ),
      };
    },
    [],
  );

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const sx = useSpring(tx, SPRING);
  const sy = useSpring(ty, SPRING);
  const fallY = useMotionValue(0);
  const hop = useMotionValue(0);
  const spin = useMotionValue(0);
  const turn = useMotionValue(0);
  const squash = useMotionValue(1);
  const squashX = useTransform(squash, (v) => 2 - v);
  const lift = useTransform([fallY, hop], ([a, b]) => a + b);
  const vxs = useVelocity(sx);
  const dragMV = useMotionValue(0);
  const swing = useSpring(
    useTransform(
      [vxs, dragMV],
      ([v, d]) => Math.max(-24, Math.min(24, (v / 1800) * 24)) * d,
    ),
    { stiffness: 190, damping: 11 },
  );
  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const lx = useSpring(lookX, LOOK);
  const ly = useSpring(lookY, LOOK);
  const helperX = useTransform(sx, (x) =>
    Math.max(12, Math.min(window.innerWidth - 372, x + (W * sc.current) / 2 - 180)),
  );
  const helperY = useTransform(sy, (y) => {
    const below = y + H * sc.current + 42;
    return below + 420 < window.innerHeight
      ? below
      : Math.max(12, y - 440);
  });

  const buddyRef = useRef(null);
  const helperLogRef = useRef(null);
  const canvasRef = useRef(null);
  const catHitTest = useRef(null);
  const lastAct = useRef(Date.now());
  const lastPointer = useRef(Date.now());
  const msgT = useRef(null);
  const moodT = useRef(null);
  const throttle = useRef({});
  const drag = useRef({
    active: false,
    moved: false,
    held: false,
    offX: 0,
    offY: 0,
    sx: 0,
    sy: 0,
    woke: false,
    samples: [],
    lastDx: 0,
    flips: [],
  });
  const tap = useRef({ n: 0, t: null });
  const pet = useRef({ acc: 0, lx: 0, ly: 0, t: null, hold: null });
  const keyBuf = useRef("");
  const flags = useRef({});
  const moveCtl = useRef(null);
  const faceDir = useRef(-1);
  const homeRef = useRef({ x: 0, y: 0 });
  const actT = useRef(null);
  const sessionStart = useRef(Date.now());
  const firedMilestones = useRef(new Set());
  const lastHour = useRef(new Date().getHours());

  const pose = sleeping ? "sleep" : dragging ? "hang" : act || "stand";
  const eyeMode = sleeping
    ? "sleep"
    : mood === "dizzy"
      ? "dizzy"
      : petting || mood === "love" || mood === "sneeze"
        ? "joy"
        : "open";
  const mouth = sleeping
    ? "idle"
    : act === "groom" || mood === "lick"
      ? "lick"
      : yawn || dragging || mood === "shock" || mood === "sneeze"
        ? "open"
        : petting || mood === "love" || mood === "happy"
          ? "smile"
          : mood === "angry"
            ? "grr"
            : "idle";

  flags.current = { sleeping, petting, hovered, dragging, landing, act };
  const S = useRef({});
  S.current = {
    T3: dark ? THEME3.dark : THEME3.light,
    dark,
    pose,
    eyeMode,
    mouth,
    mood,
    sleeping,
    petting,
    dragging,
    hovered,
    blinking,
    twitch,
  };

  /* ---------- helpers ---------- */
  const say = useCallback((m, d = 2200) => {
    clearTimeout(msgT.current);
    setMessage(m);
    msgT.current = setTimeout(() => setMessage(null), d);
  }, []);
  const askPortfolio = (question) => {
    const answer =
      answerPortfolioQuestion(question) ||
      "I couldn't find that in the portfolio. Try another question from the list below.";
    setHelperMessages((messages) =>
      [...messages, { from: "you", text: question }, { from: "cat", text: answer }].slice(-8),
    );
    lastAct.current = Date.now();
    setSleeping(false);
    feel("happy", 1000);
  };

  useEffect(() => {
    if (helperOpen && helperLogRef.current)
      helperLogRef.current.scrollTop = helperLogRef.current.scrollHeight;
  }, [helperMessages, helperOpen]);
  const feel = useCallback((m, d = 1400) => {
    clearTimeout(moodT.current);
    setMood(m);
    moodT.current = setTimeout(() => setMood("idle"), d);
  }, []);
  const once = useCallback((name, ms) => {
    const now = Date.now();
    if (now - (throttle.current[name] || 0) < ms) return false;
    throttle.current[name] = now;
    return true;
  }, []);
  const spawn = useCallback((emojis, n, { rise = false, spread = 80 } = {}) => {
    const base = Date.now() + Math.random();
    const items = Array.from({ length: n }, (_, i) => ({
      id: base + i,
      e: pick(emojis),
      a: (i / n) * Math.PI * 2 + Math.random() * 0.6,
      d: spread * (0.6 + Math.random() * 0.7),
      dx: (Math.random() - 0.5) * 70,
      rise,
    }));
    setFx((f) => [...f, ...items]);
    setTimeout(() => setFx((f) => f.filter((o) => !items.includes(o))), 1700);
  }, []);
  const boing = useCallback(
    (a = 0.86) =>
      animate(squash, [1, a, 1.07, 1], { duration: 0.45, ease: "easeOut" }),
    [squash],
  );
  const jump = useCallback(
    (h = 30) => {
      animate(hop, [0, -h, 0], { duration: 0.44, ease: ["easeOut", "easeIn"] });
      boing(0.9);
    },
    [hop, boing],
  );
  const wake = useCallback(() => {
    lastAct.current = Date.now();
    clearTimeout(actT.current);
    setAct("");
    if (flags.current.sleeping) {
      setSleeping(false);
      feel("shock", 700);
      say("Mew! 🐱", 1600);
      jump(16);
    }
  }, [feel, say, jump]);

  /* ---------- act (in-place) ---------- */
  const doAct = useCallback((name, ms) => {
    clearTimeout(actT.current);
    setAct(name);
    if (ms) actT.current = setTimeout(() => setAct(""), ms);
  }, []);

  /* ---------- walk to treat ---------- */
  const walkTo = useCallback(
    (px, py) => {
      const c = safe(px - (W * sc.current) / 2, py - H * sc.current * 0.7);
      wake();
      setSleeping(false);
      clearTimeout(actT.current);
      setAct("");
      moveCtl.current?.stop();
      const cx = tx.get();
      const cy = ty.get();
      const dx = c.x - cx;
      const dy = c.y - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 8) {
        setTreat(null);
        feel("happy", 1800);
        say(pick(YUM), 2000);
        spawn(["💖", "😋", "✨"], 6, { rise: true });
        jump(26);
        return;
      }
      const dur = Math.max(0.6, dist / 260);
      setMood("zoom");
      say("Fish!! 🐟", 1200);
      const ctlX = animate(tx, c.x, { duration: dur, ease: "easeInOut" });
      const ctlY = animate(ty, c.y, { duration: dur, ease: "easeInOut" });
      moveCtl.current = {
        stop: () => {
          ctlX.stop();
          ctlY.stop();
        },
      };
      ctlX.then(() => {
        setMood("idle");
        setTreat(null);
        setYawn(true);
        setTimeout(() => setYawn(false), 600);
        feel("happy", 1800);
        say(pick(YUM), 2000);
        spawn(["💖", "😋", "✨"], 6, { rise: true });
        jump(26);
        homeRef.current = { x: tx.get(), y: ty.get() };
        try {
          localStorage.setItem(
            KEY,
            JSON.stringify({ x: tx.get(), y: ty.get() }),
          );
        } catch {
          /* ignore */
        }
      });
    },
    [safe, tx, ty, wake, feel, say, jump, spawn],
  );

  const dropTreat = useCallback(
    (px, py) => {
      if (flags.current.dragging || flags.current.landing) return;
      setTreat({ id: Date.now(), x: px, y: py });
      walkTo(px, py);
    },
    [walkTo],
  );

  const randomTreat = useCallback(() => {
    const px = 80 + Math.random() * Math.max(80, window.innerWidth - 160);
    const py = 100 + Math.random() * Math.max(80, window.innerHeight - 200);
    dropTreat(px, py);
  }, [dropTreat]);

  const changeTheme = () => {
    toggleTheme();
    say(dark ? "Sunshine time! ☀️" : "Moonlight time! 🌙", 1800);
    feel("happy", 1200);
  };

  /* ---------- 3D renderer ---------- */
  useEffect(() => {
    if (!ready || !canvasRef.current) return;
    let renderer, raf = null, cat;
    let scrollTimer = null;
    let scrolling = false;
    let lastRender = 0;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
    } catch {
      setWebglFail(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setSize(CW, CH, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    const camera = new THREE.PerspectiveCamera(36, CW / CH, 0.1, 60);
    camera.position.set(0, 2.4, 9.2);
    camera.lookAt(0, 1.85, 0);
    cat = buildCat();
    cat.root.scale.setScalar(0.9);
    scene.add(cat.root);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    catHitTest.current = (clientX, clientY) => {
      const canvas = canvasRef.current;
      const rect = canvas?.getBoundingClientRect();
      if (
        !rect ||
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      )
        return false;
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObject(cat.hitTarget, true).length > 0;
    };
    let last = performance.now();
    const loop = (now) => {
      raf = null;
      if (
        document.hidden ||
        document.body.classList.contains("modal-open") ||
        scrolling
      )
        return;
      raf = requestAnimationFrame(loop);

      // The pet is decorative, so 30fps is enough and leaves more GPU time
      // for the page itself.
      if (now - lastRender < 1000 / 30) return;
      lastRender = now;

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      faceDir.current = cat.update(
        {
          ...S.current,
          lookX: lx.get(),
          lookY: ly.get(),
          speed: vxs.get(),
          lift: lift.get(),
          spin: (spin.get() * Math.PI) / 180,
          turn: (turn.get() * Math.PI) / 180,
        },
        now / 1000,
        dt,
      );
      renderer.render(scene, camera);
    };
    const resume = () => {
      if (
        document.hidden ||
        document.body.classList.contains("modal-open") ||
        scrolling
      ) {
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        return;
      }
      if (raf !== null)
        return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const pauseForScroll = () => {
      scrolling = true;
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        resume();
      }, 150);
    };
    const modalObserver = new MutationObserver(resume);
    modalObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("scroll", pauseForScroll, { passive: true });
    resume();
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      clearTimeout(scrollTimer);
      modalObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("scroll", pauseForScroll);
      catHitTest.current = null;
      envTex.dispose();
      pmrem.dispose();
      cat.dispose();
      renderer.dispose();
    };
  }, [ready, lx, ly, spin, turn, vxs, lift]);

  /* ---------- init + fall + welcome ---------- */
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    wasMobile.current = isMobile;
    sc.current = isMobile ? 0.34 : 0.58;
    setScale(sc.current);
    setIsTouch(window.matchMedia("(hover: none)").matches);

    let st = { day: "", count: 1 };
    try {
      st = { ...st, ...JSON.parse(localStorage.getItem(STREAK_KEY)) };
    } catch {
      /* ignore */
    }
    const today = new Date().toDateString();
    let streakMsg = null;
    if (st.day !== today) {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      st.count =
        st.day === y.toDateString() ? (st.count || 1) + 1 : st.day ? 1 : 1;
      st.day = today;
      if (st.count > 1) streakMsg = `Day ${st.count} together! 🔥`;
      else if (st.day) streakMsg = "I missed you 🥹";
    }
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(st));
    } catch {
      /* ignore */
    }

    let s = null;
    try {
      s = JSON.parse(localStorage.getItem(KEY));
    } catch {
      /* ignore */
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    const savedPositionMatchesViewport =
      s &&
      typeof s.x === "number" &&
      typeof s.y === "number" &&
      (typeof s.viewportWidth === "number"
        ? (s.viewportWidth < 1024) === isMobile
        : !isMobile);
    const pos = savedPositionMatchesViewport
      ? s
      : {
          x: w - W * sc.current - MARGIN,
          y: h - H * sc.current - 24,
        };
    const c = safe(pos.x, pos.y);
    tx.set(c.x);
    ty.set(c.y);
    sx.jump(c.x);
    sy.jump(c.y);
    homeRef.current = { x: c.x, y: c.y };
    setReady(true);

    let fell = false;
    try {
      fell = sessionStorage.getItem(FALL_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (fell || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTimeout(() => say(streakMsg || greetingForNow(dark), 3600), 900);
      return;
    }

    const dur = 1.25;
    const start = -(c.y + H + 160);
    fallY.set(start);
    setLanding(true);
    const t1 = setTimeout(() => {
      animate(fallY, [start, 0, -56, 0, -20, 0, -6, 0], {
        duration: dur,
        times: [0, 0.5, 0.64, 0.76, 0.86, 0.93, 0.97, 1],
        ease: [
          "easeIn",
          "easeOut",
          "easeIn",
          "easeOut",
          "easeIn",
          "easeOut",
          "easeIn",
        ],
      });
    }, 150);
    const t2 = setTimeout(
      () => {
        animate(squash, [1, 0.6, 1.14, 0.96, 1], { duration: 0.65 });
        setImpact(Date.now());
        feel("shock", 1000);
        say("DUM!! 💥", 1300);
        navigator.vibrate?.(40);
        try {
          sessionStorage.setItem(FALL_KEY, "1");
        } catch {
          /* ignore */
        }
      },
      150 + dur * 500,
    );
    const t3 = setTimeout(
      () => {
        setLanding(false);
        setImpact(null);
        say(streakMsg || greetingForNow(dark), 3400);
        feel("happy", 1500);
      },
      150 + dur * 1000 + 400,
    );
    const t4 = setTimeout(() => {
      const d = dayLine();
      if (d) say(d, 2600);
    }, 18000);
    const t5 = setTimeout(() => say("Tap 🐟 to feed me!", 3500), 42000);
    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- global listeners ---------- */
  useEffect(() => {
    let last = { x: 0, y: 0, t: 0 };
    const onMove = (e) => {
      const now = performance.now();
      lastPointer.current = Date.now();
      if (!buddyRef.current || flags.current.sleeping) return;
      const r = buddyRef.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 260);
      lookX.set((dx / dist) * k);
      lookY.set((dy / dist) * k);
      const dt = now - last.t;
      if (dt > 0 && dt < 80 && e.pointerType === "mouse") {
        const speed =
          (Math.hypot(e.clientX - last.x, e.clientY - last.y) / dt) * 1000;
        if (
          speed > 2600 &&
          dist < 230 &&
          !flags.current.dragging &&
          !flags.current.landing &&
          once("fast", 5000)
        ) {
          feel("shock", 900);
          say(pick(["Whoa! 🙀", "Too fast! 💨", "Pounce?! 🐾"]), 1500);
          jump(22);
        }
      }
      last = { x: e.clientX, y: e.clientY, t: now };
    };
    const onScroll = () => {
      if (flags.current.sleeping || flags.current.landing) return;
      if (!once("scroll", 7000)) return;
      lookY.set(Math.random() < 0.5 ? 0.9 : -0.9);
      say(pick(SCROLL), 1700);
      feel("shock", 700);
      setTwitch("l");
      setTimeout(() => setTwitch(null), 500);
    };
    const onKey = (e) => {
      if (e.key === "Escape" && helperOpen) {
        setHelperOpen(false);
        return;
      }
      if (e.target?.closest?.("[data-pet-helper]")) return;
      if (flags.current.sleeping || flags.current.landing) return;
      lastAct.current = Date.now();
      keyBuf.current = (keyBuf.current + (e.key || "").toLowerCase()).slice(-8);
      const kb = keyBuf.current;
      if (kb.endsWith("meow")) {
        keyBuf.current = "";
        say("MEOW!! 😻", 1800);
        feel("love", 1800);
        jump(36);
        spawn(["😻", "💖", "🐾"], 8);
        return;
      }
      if (kb.endsWith("party")) {
        keyBuf.current = "";
        say("Party time! 🥳", 3000);
        feel("love", 3000);
        animate(spin, [0, 720], { duration: 1.4, ease: "easeInOut" }).then(() =>
          spin.set(0),
        );
        setConfetti(Date.now());
        setTimeout(() => setConfetti(null), 2600);
        spawn(CONFETTI, 26, { spread: 150 });
        return;
      }
      if (kb.endsWith("fish")) {
        keyBuf.current = "";
        randomTreat();
        return;
      }
      if (once("type", 14000)) {
        say(pick(TYPE), 1800);
        setTwitch("l");
        setTimeout(() => setTwitch(null), 600);
      }
    };
    const onClick = (e) => {
      if (!e.altKey || e.target?.closest?.("[data-pet-buddy]")) return;
      e.preventDefault();
      dropTreat(e.clientX, e.clientY);
    };
    const onCopy = () => {
      if (once("copy", 8000)) {
        say("Copycat! 😼", 1600);
        feel("happy", 1200);
      }
    };
    const onResize = () => {
      const isMobile = window.innerWidth < 1024;
      const crossedBreakpoint = isMobile !== wasMobile.current;
      wasMobile.current = isMobile;
      sc.current = isMobile ? 0.34 : 0.58;
      setScale(sc.current);
      const c = crossedBreakpoint
        ? safe(
            window.innerWidth - W * sc.current - MARGIN,
            window.innerHeight - H * sc.current - 24,
          )
        : safe(tx.get(), ty.get());
      tx.set(c.x);
      ty.set(c.y);
      if (crossedBreakpoint) {
        homeRef.current = c;
        try {
          localStorage.setItem(
            KEY,
            JSON.stringify({
              ...c,
              viewportWidth: window.innerWidth,
              viewportHeight: window.innerHeight,
            }),
          );
        } catch {
          /* ignore */
        }
      }
    };
    const onVis = () => {
      if (document.visibilityState === "visible") {
        lastAct.current = Date.now();
        setSleeping(false);
        feel("happy", 1500);
        say(`You're back! ${greetingForNow(dark)}`, 2600);
      } else say("Where did you go? 🥺", 1500);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick, true);
    window.addEventListener("copy", onCopy);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("copy", onCopy);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [
    lookX,
    lookY,
    tx,
    ty,
    safe,
    say,
    feel,
    jump,
    once,
    spawn,
    spin,
    dropTreat,
    randomTreat,
    dark,
    helperOpen,
  ]);

  useEffect(() => {
    if (sleeping) {
      lookX.set(0);
      lookY.set(0.35);
    }
  }, [sleeping, lookX, lookY]);

  /* ---------- time awareness: hour + milestones ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      const f = flags.current;
      const h = new Date().getHours();
      if (h !== lastHour.current) {
        lastHour.current = h;
        if (!f.dragging && !f.landing) {
          setSleeping(false);
          say(hourLine(h, dark), 3200);
          feel("happy", 1600);
          jump(20);
        }
      }
      const elapsed = Date.now() - sessionStart.current;
      for (const m of MILESTONES) {
        if (elapsed >= m.ms && !firedMilestones.current.has(m.ms)) {
          firedMilestones.current.add(m.ms);
          if (!f.landing) {
            say(m.msg, 3500);
            feel("love", 2000);
            spawn(CONFETTI, 8, { spread: 100 });
          }
        }
      }
    }, 30000);
    return () => clearInterval(id);
  }, [say, feel, jump, spawn, dark]);

  /* ---------- blink ---------- */
  useEffect(() => {
    let t;
    const loop = () => {
      if (!flags.current.sleeping) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 130);
      }
      t = setTimeout(loop, 2000 + Math.random() * 3600);
    };
    t = setTimeout(loop, 1500);
    return () => clearTimeout(t);
  }, []);

  /* ---------- POSE PROGRESSION: sit → loaf → sleep ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      const f = flags.current;
      if (f.dragging || f.hovered || f.petting || f.landing) {
        lastAct.current = Date.now();
        return;
      }
      if (document.hidden) return;
      const idleFor = Date.now() - lastAct.current;
      if (f.act && f.act !== "loaf") return;
      if (!f.sleeping && idleFor > SLEEP_MS) {
        setSleeping(true);
        clearTimeout(actT.current);
        setAct("");
        const h = new Date().getHours();
        say(h >= 21 || h < 5 ? "Good night... Zzz 🌙💤" : "Zzz... 💤", 4000);
        return;
      }
      if (!f.sleeping && f.act !== "loaf" && idleFor > LOAF_MS) {
        doAct("loaf", 0);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [say, doAct]);

  /* ---------- in-place idle activities (NO walking) ---------- */
  useEffect(() => {
    const id = setInterval(() => {
      const f = flags.current;
      if (f.sleeping || f.dragging || f.petting || f.landing || document.hidden)
        return;
      const idleFor = Date.now() - lastAct.current;
      if (Math.random() < 0.5) {
        setTwitch(Math.random() < 0.5 ? "l" : "r");
        setTimeout(() => setTwitch(null), 600);
      }
      if (Date.now() - lastPointer.current > 5000 && Math.random() < 0.5) {
        lookX.set((Math.random() - 0.5) * 1.6);
        lookY.set((Math.random() - 0.5) * 0.8);
      }
      if (idleFor < 8000) return;
      if (f.act && f.act !== "loaf") return;
      if (f.act === "loaf" && Math.random() < 0.55) setAct("");
      const r = Math.random();
      if (r < 0.14) {
        doAct("groom", 4200);
        say("Grooming time 👅", 2200);
      } else if (r < 0.26) {
        doAct("stretch", 2600);
        say("Stretch~ 🐈", 1800);
      } else if (r < 0.36) {
        setYawn(true);
        say("Yaaawn 🥱", 1600);
        setTimeout(() => setYawn(false), 1500);
      } else if (r < 0.44) {
        feel("sneeze", 700);
        say("Achoo! 🤧", 1400);
        spawn(["💨", "💦"], 4, { spread: 50 });
      } else if (r < 0.52) {
        say("Brought you a gift! 🎁", 2200);
        spawn(["🎁", "🐭", "🐟"], 3, { rise: true });
        jump(18);
      } else if (r < 0.6) {
        say("Tail!! 😹", 1500);
        animate(turn, [0, 720], { duration: 1.4, ease: "easeInOut" }).then(() =>
          turn.set(0),
        );
      } else if (r < 0.72) {
        say(pick(BANGLISH), 2000);
      } else if (r < 0.86) {
        say(pick(IDLE));
      } else {
        say(hourLine(new Date().getHours(), dark), 2400);
      }
    }, 4500);
    return () => clearInterval(id);
  }, [say, jump, feel, spawn, turn, lookX, lookY, doAct, dark]);

  /* ---------- theme change ---------- */
  const firstTheme = useRef(true);
  useEffect(() => {
    if (firstTheme.current) {
      firstTheme.current = false;
      return;
    }
    lastAct.current = Date.now();
    setSleeping(false);
    feel("happy", 1800);
    say(
      dark
        ? "Starlight mode is on... cozy, isn't it? 🌌"
        : "Sunshine mode is on! Let's brighten things up ☀️",
      2800,
    );
    spawn(dark ? ["⭐", "✨"] : ["☀️", "✨", "🌼"], 8, { spread: 100 });
    animate(squash, [1, 0.88, 1.1, 1], { duration: 0.6 });
  }, [dark, feel, say, spawn, squash]);

  /* ---------- drag chatter / petting hearts ---------- */
  useEffect(() => {
    if (!dragging) return;
    say(pick(DRAG), 1700);
    const id = setInterval(() => {
      if (flags.current.dragging && S.current.mood !== "dizzy")
        say(pick(DRAG), 1700);
    }, 1800);
    const ctl = animate(squash, [1, 0.92, 1.05, 1], {
      duration: 0.8,
      repeat: Infinity,
    });
    return () => {
      clearInterval(id);
      ctl.stop();
      squash.set(1);
    };
  }, [dragging, say, squash]);

  useEffect(() => {
    if (!petting) return;
    const id = setInterval(() => {
      spawn(["💖", "💗", "✨", "💜"], 2, { rise: true });
      navigator.vibrate?.(12);
      if (Math.random() < 0.3) say(pick(PET), 1800);
    }, 650);
    return () => clearInterval(id);
  }, [petting, spawn, say]);

  const startPet = useCallback(() => {
    if (flags.current.petting || flags.current.dragging) return;
    flags.current.petting = true;
    setPetting(true);
    wake();
    say("Purrrrr... 😽", 2600);
    spawn(["💖", "💗", "✨"], 5, { rise: true });
  }, [wake, say, spawn]);
  const endPet = useCallback(() => {
    if (!flags.current.petting) return;
    flags.current.petting = false;
    setPetting(false);
    feel("happy", 1200);
    say("More? 😸", 1600);
  }, [feel, say]);

  /* ---------- pointer ---------- */
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (flags.current.landing) return;
    if (!catHitTest.current?.(e.clientX, e.clientY)) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    moveCtl.current?.stop();
    const wasAsleep = flags.current.sleeping;
    wake();
    drag.current = {
      active: true,
      moved: false,
      held: false,
      woke: wasAsleep,
      offX: e.clientX - sx.get(),
      offY: e.clientY - sy.get(),
      sx: e.clientX,
      sy: e.clientY,
      samples: [],
      lastDx: 0,
      flips: [],
    };
    clearTimeout(pet.current.hold);
    pet.current.hold = setTimeout(() => {
      if (drag.current.active && !drag.current.moved) {
        drag.current.held = true;
        startPet();
      }
    }, HOLD_MS);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active && e.pointerType === "mouse") {
      setCatHovered(catHitTest.current?.(e.clientX, e.clientY) ?? false);
    }
    if (d.active) {
      if (
        !d.moved &&
        Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > DRAG_PX
      ) {
        d.moved = true;
        clearTimeout(pet.current.hold);
        endPet();
        flags.current.dragging = true;
        dragMV.set(1);
        setDragging(true);
        feel("shock", 60000);
      }
      if (d.moved) {
        const now = performance.now();
        d.samples.push({ x: e.clientX, y: e.clientY, t: now });
        if (d.samples.length > 6) d.samples.shift();
        const dx = e.movementX || 0;
        if (Math.abs(dx) > 4) {
          const sign = Math.sign(dx);
          if (d.lastDx && sign !== d.lastDx) d.flips.push(now);
          d.lastDx = sign;
          d.flips = d.flips.filter((t) => now - t < 1200);
          if (d.flips.length >= 6 && once("dizzy", 4000)) {
            feel("dizzy", 2600);
            say("Too fast... 😵‍💫", 2400);
            spawn(["💫", "😵‍💫", "🌀"], 6, { spread: 60 });
          }
        }
        const c = safe(e.clientX - d.offX, e.clientY - d.offY);
        tx.set(c.x);
        ty.set(c.y);
      }
      return;
    }
    if (e.pointerType === "mouse" && !flags.current.landing) {
      const p = pet.current;
      p.acc += Math.hypot(e.clientX - p.lx, e.clientY - p.ly);
      p.lx = e.clientX;
      p.ly = e.clientY;
      if (p.acc > 170) startPet();
      clearTimeout(p.t);
      p.t = setTimeout(() => {
        p.acc = 0;
        endPet();
      }, 800);
    }
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    clearTimeout(pet.current.hold);
    e.currentTarget.releasePointerCapture?.(e.pointerId);

    if (d.moved) {
      flags.current.dragging = false;
      dragMV.set(0);
      setDragging(false);
      const s = d.samples;
      let bonk = false;
      if (s.length >= 2) {
        const a = s[0],
          b = s[s.length - 1];
        const dt = Math.max(1, b.t - a.t);
        const vx = ((b.x - a.x) / dt) * 1000;
        const vy = ((b.y - a.y) / dt) * 1000;
        if (Math.hypot(vx, vy) > 1000) {
          const raw = { x: tx.get() + vx * 0.22, y: ty.get() + vy * 0.22 };
          const c = safe(raw.x, raw.y);
          bonk = Math.hypot(raw.x - c.x, raw.y - c.y) > 30;
          tx.set(c.x);
          ty.set(c.y);
        }
      }
      homeRef.current = { x: tx.get(), y: ty.get() };
      try {
        localStorage.setItem(
          KEY,
          JSON.stringify({
            x: tx.get(),
            y: ty.get(),
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
          }),
        );
      } catch {
        /* ignore */
      }
      clearTimeout(moodT.current);
      if (bonk) {
        setMood("idle");
        setTimeout(() => {
          feel("shock", 900);
          say("Bonk! 💥", 1500);
          boing(0.7);
          spawn(["💥", "⭐", "💫"], 6, { spread: 60 });
          navigator.vibrate?.(30);
        }, 280);
      } else if (S.current.mood !== "dizzy") {
        feel("happy", 1200);
        say(pick(DROP), 1800);
        spawn(["🐾", "💨"], 4, { spread: 55 });
        boing(0.82);
      }
      lastAct.current = Date.now();
      return;
    }
    if (d.held) {
      endPet();
      return;
    }
    if (d.woke) return;

    const t = tap.current;
    t.n += 1;
    clearTimeout(t.t);
    t.t = setTimeout(() => {
      const n = t.n;
      t.n = 0;
      if (n === 1) {
        say(pick(CLICK), 1500);
        feel("happy", 1200);
        jump(30);
        spawn(BURST, 9);
      } else if (n === 2) {
        say(pick(DBL), 1800);
        feel("love", 1800);
        animate(spin, [0, 360], { duration: 0.8, ease: "easeInOut" }).then(() =>
          spin.set(0),
        );
        jump(54);
        spawn(["💖", "😻", "💕", "✨"], 14, { spread: 110 });
      } else {
        say(pick(TRIPLE), 2000);
        feel("angry", 2200);
        animate(squash, [1, 0.9, 1.1, 0.92, 1], { duration: 0.5 });
        spawn(["💢", "😾", "🙀"], 7, { spread: 70 });
      }
    }, 260);
  };

  if (!ready) return null;

  return (
    <div
      className="pet-buddy-root"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        cursor: "default",
      }}
    >
      <style>{`.pb-tail{transform:rotate(45deg)} @keyframes pbBob{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-6px)}}`}</style>

      <AnimatePresence>
        {treat && (
          <Motion.div
            key={treat.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "fixed",
              left: treat.x,
              top: treat.y,
              fontSize: 30,
              pointerEvents: "none",
              animation: "pbBob 1s ease-in-out infinite",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,.3))",
            }}
          >
            🐟
          </Motion.div>
        )}
      </AnimatePresence>

      <Motion.div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          x: sx,
          y: sy,
          width: W * scale,
          height: H * scale,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: W,
            height: H,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <Motion.div
            animate={{
              opacity: sleeping
                ? UIt.glowO * 0.35
                : hovered || petting
                  ? UIt.glowO * 1.3
                  : UIt.glowO,
              scale: sleeping ? 0.85 : petting ? 1.15 : 1,
            }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${UIt.glow}, transparent 68%)`,
              filter: "blur(14px)",
            }}
          />

          <AnimatePresence>
            {impact && (
              <Motion.div
                key={impact}
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 2,
                  width: 0,
                  height: 0,
                }}
              >
                <Motion.div
                  initial={{ opacity: 0.85, scale: 0.2 }}
                  animate={{ opacity: 0, scale: 4 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    left: -50,
                    top: -12,
                    width: 100,
                    height: 24,
                    borderRadius: "50%",
                    border: `4px solid ${UIt.ring}`,
                  }}
                />
                {Array.from({ length: 10 }).map((_, i) => (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0.8, x: 0, y: 0, scale: 0.6 }}
                    animate={{
                      opacity: 0,
                      x: (i - 4.5) * 20,
                      y: -12 - (i % 3) * 9,
                      scale: 2,
                    }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: UIt.dust,
                    }}
                  />
                ))}
                <Motion.div
                  initial={{ opacity: 0, scale: 0.2, rotate: -14, y: -90 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.2, 1.6, 1.3, 1.4],
                    rotate: [-14, 8, -4, 0],
                    y: -210,
                  }}
                  transition={{ duration: 1, times: [0, 0.2, 0.7, 1] }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    translateX: "-50%",
                    fontSize: 40,
                    fontWeight: 900,
                    letterSpacing: 1,
                    color: UIt.dum,
                    WebkitTextStroke: `2px ${UIt.stroke}`,
                    whiteSpace: "nowrap",
                    textShadow: "0 4px 12px rgba(0,0,0,.35)",
                  }}
                >
                  DUM!
                </Motion.div>
              </Motion.div>
            )}
          </AnimatePresence>

          <Motion.div
            ref={buddyRef}
            data-pet-buddy
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerEnter={(e) => {
              if (
                e.pointerType !== "mouse" ||
                flags.current.landing ||
                !catHitTest.current?.(e.clientX, e.clientY)
              )
                return;
              setHovered(true);
              wake();
            }}
            onPointerLeave={() => {
              setHovered(false);
              setCatHovered(false);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              say("Menu? Treats please! 🍣", 1800);
              feel("happy", 1200);
            }}
            style={{
              position: "absolute",
              inset: 0,
              y: lift,
              rotate: swing,
              scaleY: squash,
              scaleX: squashX,
              transformOrigin: "50% 60%",
              pointerEvents: "auto",
              touchAction: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              cursor: dragging ? "grabbing" : catHovered ? "grab" : "default",
            }}
          >
            {webglFail ? (
              <div
                style={{
                  fontSize: 90,
                  textAlign: "center",
                  lineHeight: `${H}px`,
                }}
              >
                🐱
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  left: (W - CW) / 2,
                  top: H - CH + 26,
                  width: CW,
                  height: CH,
                  pointerEvents: "auto",
                  cursor: catHovered ? "grab" : "default",
                }}
              />
            )}
          </Motion.div>

          {sleeping &&
            [0, 1, 2].map((i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: 24 + i * 10,
                  y: -30 - i * 20,
                  scale: 0.9 + i * 0.35,
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: i * 0.9,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  right: 8,
                  top: 16,
                  fontWeight: 800,
                  fontSize: 20,
                  color: UIt.ring,
                  pointerEvents: "none",
                }}
              >
                Z
              </Motion.div>
            ))}

          {fx.map((o) => (
            <Motion.div
              key={o.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
              animate={
                o.rise
                  ? {
                      opacity: 0,
                      x: o.dx,
                      y: -120 - Math.random() * 40,
                      scale: 1.3,
                    }
                  : {
                      opacity: 0,
                      x: Math.cos(o.a) * o.d,
                      y: Math.sin(o.a) * o.d - 20,
                      scale: 1.4,
                      rotate: Math.random() * 360,
                    }
              }
              transition={{ duration: o.rise ? 1.4 : 1, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: o.rise ? 40 : "45%",
                fontSize: 24,
                pointerEvents: "none",
              }}
            >
              {o.e}
            </Motion.div>
          ))}

          <AnimatePresence>
            {confetti && (
              <Motion.div
                key={confetti}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: 22 }).map((_, i) => (
                  <Motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                    animate={{
                      x: (Math.random() - 0.5) * 300,
                      y: -Math.random() * 200 - 60,
                      opacity: 0,
                      scale: 1.3,
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "40%",
                      fontSize: 20,
                    }}
                  >
                    {pick(CONFETTI)}
                  </Motion.div>
                ))}
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Pet actions */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "100%",
              transform: "translateX(-50%)",
              marginTop: 6,
              display: "flex",
              gap: 6,
              alignItems: "center",
              opacity: hovered || isTouch ? 1 : 0.85,
              transition: "opacity .25s",
              pointerEvents: "auto",
              whiteSpace: "nowrap",
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Ask the cat about this portfolio"
              aria-expanded={helperOpen}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                setHelperOpen((open) => !open);
                wake();
              }}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: `1px solid ${UIt.border}`,
                background: UIt.bg,
                color: UIt.text,
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,.22)",
              }}
            >
              💬
            </button>
            <button
              type="button"
              aria-label="Give a treat"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={randomTreat}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: `1px solid ${UIt.border}`,
                background: UIt.bg,
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                boxShadow: "0 4px 12px rgba(0,0,0,.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🐟
            </button>
            <ThemeToggle isDark={dark} toggle={changeTheme} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "100%",
              transform: "translateX(-50%)",
              marginBottom: 46,
              pointerEvents: "none",
            }}
          >
            <AnimatePresence>
              {message && (
                <Motion.div
                  key="bubble"
                  initial={{ opacity: 0, scale: 0.6, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                  style={{
                    position: "relative",
                    padding: "7px 14px",
                    borderRadius: 18,
                    fontSize: 13,
                    fontWeight: 700,
                    whiteSpace: "normal",
                    textAlign: "center",
                    background: UIt.bg,
                    color: UIt.text,
                    border: `1px solid ${UIt.border}`,
                    boxShadow: "0 10px 28px rgba(0,0,0,.28)",
                    maxWidth: "min(300px, calc(100vw - 28px))",
                    lineHeight: 1.4,
                    overflowWrap: "anywhere",
                  }}
                >
                  {message}
                  <div
                    className="pb-tail"
                    style={{
                      position: "absolute",
                      bottom: -5,
                      left: "50%",
                      marginLeft: -4,
                      width: 8,
                      height: 8,
                      background: UIt.bg,
                      borderRight: `1px solid ${UIt.border}`,
                      borderBottom: `1px solid ${UIt.border}`,
                    }}
                  />
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Motion.div>
      <AnimatePresence>
        {helperOpen && (
          <Motion.div
            data-pet-helper
            role="dialog"
            aria-label="Portfolio helper"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              x: helperX,
              y: helperY,
              width: "min(360px, calc(100vw - 24px))",
              maxHeight: "min(440px, calc(100vh - 24px))",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: 12,
              borderRadius: 18,
              background: UIt.bg,
              color: UIt.text,
              border: `1px solid ${UIt.border}`,
              boxShadow: "0 12px 36px rgba(0,0,0,.3)",
              pointerEvents: "auto",
              zIndex: 10001,
              transformOrigin: "bottom center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <strong style={{ fontSize: 14 }}>Portfolio helper 🐾</strong>
                <div style={{ fontSize: 11, opacity: 0.72, marginTop: 2 }}>
                  Quick answers from the full portfolio
                </div>
              </div>
              <button
                type="button"
                aria-label="Close portfolio helper"
                onClick={() => setHelperOpen(false)}
                style={{
                  border: 0,
                  background: "transparent",
                  color: "inherit",
                  fontSize: 20,
                  cursor: "pointer",
                  padding: "0 4px",
                }}
              >
                ×
              </button>
            </div>
            <div
              ref={helperLogRef}
              role="log"
              aria-live="polite"
              style={{
                minHeight: 100,
                maxHeight: 205,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 9,
                padding: 10,
                border: `1px solid ${UIt.border}`,
                borderRadius: 13,
                background: "rgba(127,127,127,.07)",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              {helperMessages.length === 0 ? (
                <p style={{ margin: 0, opacity: 0.78, alignSelf: "center" }}>
                  Pick any question to explore the whole portfolio.
                </p>
              ) : (
                helperMessages.map((entry, index) => (
                  <div
                    key={`${index}-${entry.from}`}
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.65 }}>
                      {entry.from === "you" ? "YOU ASKED" : "PARTHA'S CAT"}
                    </span>
                    <div
                      style={{
                        padding: "9px 11px",
                        borderRadius: 11,
                        background:
                          entry.from === "you"
                            ? "rgba(124,58,237,.16)"
                            : "rgba(127,127,127,.12)",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {renderHelperAnswer(entry.text)}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 7,
                overflowY: "auto",
              }}
            >
              {HELPER_QUESTIONS.map(({ label, question }) => (
                <Motion.button
                  key={question}
                  type="button"
                  data-pet-helper
                  onClick={() => askPortfolio(question)}
                  whileHover={{ backgroundColor: "rgba(124,58,237,.16)" }}
                  style={{
                    minHeight: 36,
                    padding: "7px 9px",
                    borderRadius: 10,
                    border: `1px solid ${UIt.border}`,
                    background: "rgba(127,127,127,.08)",
                    color: "inherit",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 650,
                    lineHeight: 1.25,
                    cursor: "pointer",
                    transition: "background .2s, border-color .2s",
                  }}
                >
                  {label}
                </Motion.button>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
