import {
  Code2,
  Brain,
  Briefcase,
  GraduationCap,
  Trophy,
  Rocket,
} from "lucide-react";

export const JOURNEY = [
  {
    id: "foundation",
    year: "2022",
    title: "Programming Foundation",
    description:
      "Started programming with C during my second semester, then explored Python in the third semester.",
    icon: Code2,
    accent: "primary",
  },
  {
    id: "core-cs",
    year: "2022–2023",
    title: "Core Programming & CS Fundamentals",
    description:
      "Learned Java, DSA, OOP, DAA, DBMS and MySQL — building a strong foundation in problem solving and system design concepts.",
    icon: Brain,
    accent: "cyan",
  },
  {
    id: "internship",
    year: "2024",
    title: "Data Analysis Internship",
    description:
      "Completed a Data Analysis internship at DST InfoSolutions Pvt. Ltd. using Python, Pandas, NumPy and Matplotlib — 100 hours of coursework with certification.",
    icon: Briefcase,
    accent: "emerald",
  },
  {
    id: "graduation",
    year: "2025",
    title: "B.Tech IT Graduation",
    description:
      "Completed B.Tech in Information Technology from College of Engineering & Management, Kolaghat.",
    icon: GraduationCap,
    accent: "fuchsia",
  },
  {
    id: "ghci",
    year: "2025",
    title: "GHCI 2025 Hackathon",
    description:
      "Participated in GHCI 2025 — collaborating with developers to solve real-world problems under time constraints.",
    icon: Trophy,
    accent: "amber",
  },
  {
    id: "fullstack",
    year: "2025–Present",
    title: "Full Stack Development",
    description:
      "Building full-stack applications with MERN, strengthening Java and DSA, exploring backend architecture and Generative AI integration.",
    icon: Rocket,
    accent: "primary",
  },
];

export const ACCENT_STYLES = {
  primary: {
    dot: "bg-primary",
    dotGlow: "shadow-[0_0_20px_6px_hsl(262_83%_58%_/_0.45)]",
    icon: "text-primary",
    ring: "ring-primary/30",
    border: "border-primary/40",
    bg: "bg-primary/10",
  },
  cyan: {
    dot: "bg-cyan-400",
    dotGlow: "shadow-[0_0_20px_6px_hsl(190_90%_55%_/_0.45)]",
    icon: "text-cyan-400",
    ring: "ring-cyan-500/30",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
  },
  emerald: {
    dot: "bg-emerald-400",
    dotGlow: "shadow-[0_0_20px_6px_hsl(160_84%_45%_/_0.45)]",
    icon: "text-emerald-400",
    ring: "ring-emerald-500/30",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
  },
  fuchsia: {
    dot: "bg-fuchsia-400",
    dotGlow: "shadow-[0_0_20px_6px_hsl(292_91%_73%_/_0.45)]",
    icon: "text-fuchsia-400",
    ring: "ring-fuchsia-500/30",
    border: "border-fuchsia-500/40",
    bg: "bg-fuchsia-500/10",
  },
  amber: {
    dot: "bg-amber-400",
    dotGlow: "shadow-[0_0_20px_6px_hsl(43_96%_56%_/_0.45)]",
    icon: "text-amber-400",
    ring: "ring-amber-500/30",
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
  },
};
