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
import { Globe, Binary, Boxes, Database, Code2 } from "lucide-react";

const ROW_ONE = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
];

const ROW_TWO = [
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Java", icon: SiOpenjdk, color: "#F89820" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "REST API", icon: Globe, color: "#A855F7" },
  { name: "DSA", icon: Binary, color: "#E879F9" },
  { name: "OOP", icon: Boxes, color: "#22D3EE" },
  { name: "DBMS", icon: Database, color: "#34D399" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "VS Code", icon: Code2, color: "#007ACC" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "npm", icon: SiNpm, color: "#CB3837" },
];

function Chip({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-md shrink-0 hover:border-primary/50 hover:bg-card/70 transition-all group">
      <Icon
        className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ color: item.color }}
      />
      <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
    </div>
  );
}

function MarqueeRow({ items, direction }) {
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-3 w-max ${animationClass}`}>
        {items.map((item, i) => (
          <Chip key={item.name + i} item={item} />
        ))}
        {items.map((item, i) => (
          <Chip key={item.name + "-dup-" + i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="relative space-y-3 marquee-mask marquee-pause">
      <MarqueeRow items={ROW_ONE} direction="left" />
      <MarqueeRow items={ROW_TWO} direction="right" />
    </div>
  );
}
