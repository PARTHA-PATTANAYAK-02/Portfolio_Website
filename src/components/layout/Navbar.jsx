import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion as Motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Grid2X2,
  Home,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "../providers/ThemeContext";
import { useActiveSection } from "../../hooks/useActiveSection";

const NAV_ITEMS = [
  { label: "Home", id: "home", icon: Home },
  { label: "About", id: "about", icon: UserRound },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Projects", id: "projects", icon: Grid2X2 },
  { label: "Journey", id: "journey", icon: BriefcaseBusiness },
  { label: "Certifications", id: "certifications", icon: Award },
  { label: "Contact", id: "contact", icon: Mail },
];
const NAV_ACTIVE_IDS = NAV_ITEMS.map((item) => item.id);

const SPRING = { stiffness: 360, damping: 24, mass: 0.55 };
const NAV_OFFSET = 80; // Exactly matches scroll-mt-20 (5rem = 80px)

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 900px)").matches
      : false,
  );
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useActiveSection(NAV_ACTIVE_IDS);

  const isMac = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform),
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const updateViewport = (event) => setIsMobile(event.matches);
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  return (
    <>
      <style>{styles}</style>
      <header className="partha-nav-shell">
        <div
          className={`partha-nav ${isDark ? "is-dark" : "is-light"} ${scrolled ? "is-scrolled" : ""}`}
        >
          <div className="nav-liquid-border" aria-hidden="true" />
          <div className="nav-ribbon-glow" aria-hidden="true" />
          <ParticleField reduce={reduce || isMobile} />

          <div className="nav-content">
            <Brand3D
              onClick={() => scrollTo("home")}
              reduce={reduce || isMobile}
            />

            {/* Desktop Navigation Links (Handled by MobileBottomNav on screens <= 900px) */}
            <nav className="nav-links" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <MagneticNavItem
                  key={item.id}
                  item={item}
                  active={active === item.id}
                  onClick={() => scrollTo(item.id)}
                  reduce={reduce || isMobile}
                />
              ))}
            </nav>

            {/* Actions: Search, Theme Toggle, Let's talk */}
            <div className="nav-actions">
              <MagneticButton
                onClick={openPalette}
                reduce={reduce || isMobile}
                className="search-btn"
                ariaLabel="Open command palette"
              >
                <Search size={16} />
                <span>Search</span>
                <kbd>{isMac ? "⌘ K" : "Ctrl K"}</kbd>
              </MagneticButton>

              <MagneticButton
                onClick={toggleTheme}
                reduce={reduce || isMobile}
                className="theme-btn"
                ariaLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
              >
                {isDark ? (
                  <Sun size={17} className="text-amber-400" />
                ) : (
                  <Moon size={17} className="text-violet-600" />
                )}
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo("contact")}
                reduce={reduce || isMobile}
                className="talk-btn"
                ariaLabel="Contact me"
              >
                <Sparkles size={15} />
                <span>Let's talk</span>
                <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function Brand3D({ onClick, reduce }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const rx = useSpring(0, { stiffness: 210, damping: 20 });
  const ry = useSpring(0, { stiffness: 210, damping: 20 });
  const x = useSpring(0, { stiffness: 230, damping: 22 });
  const y = useSpring(0, { stiffness: 230, damping: 22 });

  const onPointerEnter = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    rectRef.current = ref.current?.getBoundingClientRect();
  };

  const move = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    if (!rectRef.current) {
      rectRef.current = ref.current?.getBoundingClientRect();
    }
    const r = rectRef.current;
    if (!r) return;
    const px = (event.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (event.clientY - (r.top + r.height / 2)) / (r.height / 2);
    ry.set(px * 14);
    rx.set(-py * 12);
    x.set(px * 8);
    y.set(py * 5);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <Motion.button
      ref={ref}
      type="button"
      className="brand-3d"
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerMove={move}
      onPointerLeave={reset}
      whileTap={{ scale: 0.96 }}
      style={{ x, y }}
      aria-label="Go home"
    >
      <div className="brand-aura" />
      <Motion.div
        className="brand-orbit orbit-one"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <Motion.div
        className="brand-orbit orbit-two"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      />
      <div className="brand-core">
        <Motion.span className="brand-p" style={{ rotateX: rx, rotateY: ry }}>
          P
        </Motion.span>
        <span className="brand-depth depth-1">P</span>
        <span className="brand-depth depth-2">P</span>
      </div>
      <div className="brand-name">
        <strong>Partha</strong>
        <small>FULL-STACK DEVELOPER</small>
      </div>
    </Motion.button>
  );
}

function MagneticNavItem({ item, active, onClick, reduce }) {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const mx = useSpring(0, { stiffness: 380, damping: 26, mass: 0.4 });
  const my = useSpring(0, { stiffness: 380, damping: 26, mass: 0.4 });

  const onPointerEnter = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    rectRef.current = ref.current?.getBoundingClientRect();
  };

  const move = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    if (!rectRef.current) {
      rectRef.current = ref.current?.getBoundingClientRect();
    }
    const r = rectRef.current;
    if (!r) return;
    const px = (event.clientX - (r.left + r.width / 2)) / r.width;
    const py = (event.clientY - (r.top + r.height / 2)) / r.height;
    mx.set(px * 8);
    my.set(py * 5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    rectRef.current = null;
  };

  const Icon = item.icon;

  return (
    <Motion.button
      ref={ref}
      type="button"
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x: mx, y: my }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="nav-item-surface" />
      <span className="nav-item-icon">
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <span className="nav-item-label">{item.label}</span>
      {active && <span className="active-dot" />}
    </Motion.button>
  );
}

function MagneticButton({
  children,
  onClick,
  reduce,
  className = "",
  ariaLabel,
}) {
  const x = useSpring(0, { stiffness: 340, damping: 22 });
  const y = useSpring(0, { stiffness: 340, damping: 22 });
  const ref = useRef(null);
  const rectRef = useRef(null);

  const onPointerEnter = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    rectRef.current = ref.current?.getBoundingClientRect();
  };

  const move = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    if (!rectRef.current) {
      rectRef.current = ref.current?.getBoundingClientRect();
    }
    const r = rectRef.current;
    if (!r) return;
    const px = (event.clientX - (r.left + r.width / 2)) / r.width;
    const py = (event.clientY - (r.top + r.height / 2)) / r.height;
    x.set(px * 8);
    y.set(py * 6);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <Motion.button
      ref={ref}
      type="button"
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerMove={move}
      onPointerLeave={reset}
      whileTap={{ scale: 0.95 }}
      style={{ x, y }}
      aria-label={ariaLabel}
    >
      {children}
    </Motion.button>
  );
}

function ParticleField({ reduce }) {
  if (reduce) return null;
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className="particle-dot"
          style={{
            left: `${(i * 37 + 10) % 94}%`,
            top: `${(i * 53 + 12) % 80}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            animationDelay: `${i * 0.28}s`,
            animationDuration: `${3.6 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
}

const styles = `
.partha-nav-shell{position:fixed;top:0;left:0;right:0;z-index:60;padding:14px 14px 0;}
.partha-nav{position:relative;width:100%;height:78px;border-radius:28px;overflow:hidden;background:rgba(222,225,255,.52);border:1px solid rgba(124,58,237,.22);box-shadow:0 28px 80px -35px rgba(76,29,149,.48),inset 0 1px 0 rgba(255,255,255,.95);backdrop-filter:blur(24px) saturate(150%);transition:height .35s ease,border-radius .35s ease,background .35s ease,box-shadow .35s ease;}
.partha-nav.is-dark{background:linear-gradient(180deg,rgba(15,11,35,.78),rgba(10,8,25,.66));border-color:rgba(167,139,250,.22);box-shadow:0 30px 90px -40px rgba(109,40,217,.7),inset 0 1px 0 rgba(255,255,255,.08);}
.partha-nav.is-light{color:hsl(222 47% 11%);}
.partha-nav.is-dark{color:hsl(210 40% 98%);}
.partha-nav.is-scrolled{height:68px;border-radius:23px;}
.nav-liquid-border{position:absolute;inset:0;padding:1px;border-radius:inherit;background:linear-gradient(100deg,rgba(139,92,246,.15),rgba(124,58,237,.85),rgba(59,130,246,.65),rgba(217,70,239,.75),rgba(139,92,246,.15));background-size:260% 100%;animation:borderFlow 7s ease-in-out infinite;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;}
@keyframes borderFlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.nav-ribbon-glow{position:absolute;width:48%;height:120px;left:26%;top:-60px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.34),rgba(59,130,246,.12) 42%,transparent 72%);filter:blur(18px);pointer-events:none;}
.nav-content{height:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 20px;position:relative;z-index:2;}
.particle-field{position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:.9;}
.particle-dot{position:absolute;border-radius:50%;background:hsl(262 83% 70%);box-shadow:0 0 8px hsl(262 83% 65%);animation:particleFloat 4s ease-in-out infinite;will-change:transform,opacity;pointer-events:none;}
@keyframes particleFloat{0%,100%{transform:translate3d(0,0,0);opacity:.25;}50%{transform:translate3d(3px,-8px,0);opacity:.85;}}
.brand-3d{position:relative;display:flex;align-items:center;gap:11px;flex:0 0 auto;border:0;background:transparent;padding:0 10px 0 0;cursor:pointer;transform-style:preserve-3d;user-select:none;}
.brand-core{position:relative;width:54px;height:54px;display:grid;place-items:center;transform-style:preserve-3d;}
.brand-aura{position:absolute;width:62px;height:62px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.34),transparent 68%);filter:blur(5px);}
.brand-orbit{position:absolute;border:1px solid rgba(167,139,250,.52);border-radius:50%;pointer-events:none;}
.orbit-one{width:61px;height:25px;transform:rotateX(66deg) rotateZ(20deg);}
.orbit-two{width:52px;height:20px;transform:rotateX(68deg) rotateY(55deg);border-color:rgba(96,165,250,.48);}
.brand-core:before{content:"";position:absolute;inset:5px;border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.22),rgba(124,58,237,.18));border:1px solid rgba(167,139,250,.28);box-shadow:inset 0 1px 1px rgba(255,255,255,.2),0 12px 30px -14px rgba(124,58,237,.9);transform:translateZ(0);}
.brand-p,.brand-depth{position:absolute;font-family:"Space Grotesk","Inter",sans-serif;font-size:31px;font-weight:800;line-height:1;color:#c4b5fd;transform-style:preserve-3d;}
.brand-p{z-index:3;text-shadow:0 0 18px rgba(139,92,246,.95),1px 1px 0 #8b5cf6,2px 2px 0 #7c3aed,3px 3px 0 #6d28d9,0 10px 24px rgba(76,29,149,.55);}
.brand-depth{z-index:1;color:#4c1d95;transform:translate3d(3px,3px,-3px);opacity:.85;}
.depth-2{transform:translate3d(5px,5px,-6px);opacity:.55;}
.brand-name{display:flex;flex-direction:column;text-align:left;line-height:1;}
.brand-name strong{font:700 15px "Space Grotesk","Inter",sans-serif;letter-spacing:-.03em;}
.brand-name small{margin-top:5px;font:600 8px "Inter",sans-serif;letter-spacing:.16em;opacity:.52;}
.nav-links{display:flex;align-items:center;justify-content:center;gap:clamp(2px,0.35vw,5px);flex:1 1 auto;min-width:0;transform-style:preserve-3d;}
.nav-item{position:relative;height:44px;padding:0 clamp(7px,0.7vw,12px);border:0;background:transparent;color:inherit;opacity:.68;border-radius:16px;display:flex;align-items:center;gap:6px;cursor:pointer;white-space:nowrap;flex-shrink:0;transform-style:preserve-3d;perspective:800px;transition:opacity .2s ease;user-select:none;}
.nav-item:hover,.nav-item.hovered,.nav-item.active{opacity:1;}

/* GPU-accelerated surface crossfade to eliminate background transition lag */
.nav-item-surface{position:absolute;inset:0;border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(124,58,237,.03));border:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.06);transform:translateZ(-8px);transition:transform .2s ease;will-change:transform;}
.nav-item-surface::before{content:"";position:absolute;inset:-1px;border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(124,58,237,.16));border:1px solid rgba(167,139,250,.3);box-shadow:0 15px 35px -20px rgba(124,58,237,.9),inset 0 1px 0 rgba(255,255,255,.13);opacity:0;transition:opacity .2s ease;pointer-events:none;}
.nav-item-surface::after{content:"";position:absolute;inset:-1px;border-radius:16px;background:linear-gradient(145deg,rgba(139,92,246,.3),rgba(124,58,237,.1));border:1px solid rgba(167,139,250,.55);box-shadow:0 14px 36px -18px rgba(124,58,237,.9),inset 0 1px 0 rgba(255,255,255,.16);opacity:0;transition:opacity .22s ease;pointer-events:none;}

.nav-item:hover .nav-item-surface,.nav-item.hovered .nav-item-surface{transform:translateZ(-2px);}
.nav-item:hover .nav-item-surface::before,.nav-item.hovered .nav-item-surface::before{opacity:1;}
.nav-item.active .nav-item-surface{transform:translateZ(0);}
.nav-item.active .nav-item-surface::after{opacity:1;}

.nav-item-icon,.nav-item-label,.active-dot{position:relative;z-index:2;}
.nav-item-icon{display:grid;place-items:center;color:hsl(262 83% 67%);filter:drop-shadow(0 0 6px rgba(139,92,246,.35));}
.nav-item-label{font:600 12px "Inter",sans-serif;}
.active-dot{width:4px;height:4px;border-radius:50%;background:#a78bfa;box-shadow:0 0 10px #8b5cf6;margin-left:1px;}

.nav-actions{display:flex;align-items:center;gap:7px;flex:0 0 auto;margin-left:auto;}
.magnetic-btn{height:40px;border-radius:14px;padding:0 11px;display:flex;align-items:center;gap:6px;border:1px solid rgba(139,92,246,.25);cursor:pointer;color:inherit;flex-shrink:0;white-space:nowrap;transform-style:preserve-3d;box-shadow:0 10px 30px -20px rgba(124,58,237,.7),inset 0 1px 0 rgba(255,255,255,.1);transition:border-color .15s ease,background .15s ease;}
.search-btn{background:rgba(255,255,255,.06);}
.search-btn svg{color:hsl(262 83% 65%);}
.magnetic-btn span{font:600 11px "Inter",sans-serif;}
.magnetic-btn kbd{font:500 8px "JetBrains Mono",monospace;opacity:.5;border:1px solid currentColor;padding:3px 5px;border-radius:5px;}

.theme-btn{background:rgba(255,255,255,.06);width:40px;height:40px;justify-content:center;padding:0;}
.partha-nav.is-light .theme-btn{background:rgba(0,0,0,.04);border-color:rgba(124,58,237,.2);}
.partha-nav.is-light .search-btn{background:rgba(0,0,0,.04);border-color:rgba(124,58,237,.2);}

.talk-btn{background:linear-gradient(135deg,hsl(262 83% 58%),hsl(272 72% 52%));color:white;border-color:rgba(255,255,255,.22);box-shadow:0 14px 34px -15px rgba(124,58,237,.95),inset 0 1px 0 rgba(255,255,255,.32);}

@media(max-width:1360px){
  .search-btn span,.search-btn kbd{display:none}
  .search-btn{width:40px;justify-content:center;padding:0}
  .brand-name small{display:none}
  .nav-item{padding:0 8px;font-size:11.5px}
  .nav-content{gap:10px}
}

@media(max-width:1180px){
  .brand-name{display:none}
  .nav-item{padding:0 7px;gap:4px;font-size:11px}
  .talk-btn span{display:none}
  .talk-btn{width:40px;justify-content:center;padding:0}
  .nav-actions{gap:5px;}
}

@media(max-width:900px){
  .nav-links{display:none}
  .nav-actions{display:flex;gap:6px;margin-left:auto;}
  .search-btn span,.search-btn kbd{display:none}
  .search-btn{width:38px;height:38px;justify-content:center;padding:0}
  .theme-btn{width:38px;height:38px;}
  .talk-btn{width:38px;height:38px;justify-content:center;padding:0}
  .talk-btn span{display:none}
  .partha-nav{height:66px}
  .nav-content{padding:0 14px}
  .brand-name{display:flex;}
  .brand-name small{display:none}
  .nav-liquid-border{animation:none}
  .nav-ribbon-glow{filter:none}
}

@media(max-width:520px){
  .brand-name strong{font-size:14px}
  .brand-core{width:46px;height:46px}
  .brand-p,.brand-depth{font-size:26px}
  .brand-orbit{transform:scale(.85) rotateX(66deg) rotateZ(20deg)}
}
`;
