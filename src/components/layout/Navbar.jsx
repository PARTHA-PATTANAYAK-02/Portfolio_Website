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
  Boxes,
  BriefcaseBusiness,
  Code2,
  Grid2X2,
  Home,
  Mail,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useTheme } from "../providers/ThemeContext";

const NAV_ITEMS = [
  { label: "Home", id: "home", icon: Home },
  { label: "About", id: "about", icon: UserRound },
  { label: "Skills", id: "skills", icon: Code2 },
  { label: "Projects", id: "projects", icon: Grid2X2 },
  { label: "Journey", id: "journey", icon: BriefcaseBusiness },
  { label: "Certifications", id: "certifications", icon: Award },
  { label: "Contact", id: "contact", icon: Mail },
];

const SPRING = { stiffness: 360, damping: 24, mass: 0.55 };

export default function Navbar() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const rootRef = useRef(null);
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const smoothX = useSpring(cursorX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(cursorY, { stiffness: 180, damping: 24 });

  const ambientX = useTransform(smoothX, [0, 1], [-18, 18]);
  const ambientY = useTransform(smoothY, [0, 1], [-8, 8]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileOpen(false);
  };

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  const onPointerMove = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorX.set((event.clientX - rect.left) / rect.width);
    cursorY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <>
      <style>{styles}</style>
      <header
        className="partha-nav-shell"
        ref={rootRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          cursorX.set(0.5);
          cursorY.set(0.5);
        }}
      >
        <div
          className={`partha-nav ${isDark ? "is-dark" : "is-light"} ${scrolled ? "is-scrolled" : ""}`}
        >
          <div className="nav-liquid-border" aria-hidden="true" />
          <div className="nav-ribbon-glow" aria-hidden="true" />
          <ParticleField reduce={reduce} />

          <Motion.div
            className="nav-content"
            style={{ x: reduce ? 0 : ambientX, y: reduce ? 0 : ambientY }}
            transition={{ type: "spring", ...SPRING }}
          >
            <Brand3D onClick={() => scrollTo("home")} reduce={reduce} />

            <nav className="nav-links" aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => (
                <MagneticNavItem
                  key={item.id}
                  item={item}
                  active={active === item.id}
                  hovered={hovered === item.id}
                  onHover={() => setHovered(item.id)}
                  onLeave={() => setHovered(null)}
                  onClick={() => scrollTo(item.id)}
                  reduce={reduce}
                />
              ))}
            </nav>

            <div className="nav-actions">
              <MagneticButton
                onClick={openPalette}
                reduce={reduce}
                className="search-btn"
                ariaLabel="Open command palette"
              >
                <Search size={17} />
                <span>Search</span>
                <kbd>Ctrl K</kbd>
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollTo("contact")}
                reduce={reduce}
                className="talk-btn"
                ariaLabel="Contact me"
              >
                <Sparkles size={15} />
                <span>Let's talk</span>
                <ArrowUpRight size={15} />
              </MagneticButton>
            </div>

            <button
              className="mobile-trigger"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </Motion.div>
        </div>

        {mobileOpen && (
          <Motion.div
            className={`mobile-panel ${isDark ? "is-dark" : "is-light"}`}
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", ...SPRING }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={
                    active === item.id ? "mobile-link active" : "mobile-link"
                  }
                  onClick={() => scrollTo(item.id)}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </Motion.div>
        )}
      </header>
    </>
  );
}

function Brand3D({ onClick, reduce }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 210, damping: 20 });
  const ry = useSpring(0, { stiffness: 210, damping: 20 });
  const x = useSpring(0, { stiffness: 230, damping: 22 });
  const y = useSpring(0, { stiffness: 230, damping: 22 });

  const move = (event) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
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
  };

  return (
    <Motion.button
      ref={ref}
      className="brand-3d"
      onClick={onClick}
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

function MagneticNavItem({
  item,
  active,
  hovered,
  onHover,
  onLeave,
  onClick,
  reduce,
}) {
  const ref = useRef(null);
  const mx = useSpring(0, { stiffness: 330, damping: 23, mass: 0.45 });
  const my = useSpring(0, { stiffness: 330, damping: 23, mass: 0.45 });
  const rx = useSpring(0, { stiffness: 280, damping: 22 });
  const ry = useSpring(0, { stiffness: 280, damping: 22 });
  const z = useSpring(0, { stiffness: 300, damping: 22 });

  const move = (event) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (event.clientX - (r.left + r.width / 2)) / r.width;
    const py = (event.clientY - (r.top + r.height / 2)) / r.height;
    mx.set(px * 10);
    my.set(py * 7);
    ry.set(px * 13);
    rx.set(-py * 10);
    z.set(16);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
    rx.set(0);
    ry.set(0);
    z.set(0);
    onLeave();
  };
  const Icon = item.icon;

  return (
    <Motion.button
      ref={ref}
      type="button"
      className={`nav-item ${active ? "active" : ""} ${hovered ? "hovered" : ""}`}
      onClick={onClick}
      onPointerEnter={onHover}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x: mx, y: my, rotateX: rx, rotateY: ry, z }}
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
  const rx = useSpring(0, { stiffness: 260, damping: 22 });
  const ry = useSpring(0, { stiffness: 260, damping: 22 });
  const ref = useRef(null);

  const move = (event) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const px = (event.clientX - (r.left + r.width / 2)) / r.width;
    const py = (event.clientY - (r.top + r.height / 2)) / r.height;
    x.set(px * 8);
    y.set(py * 6);
    ry.set(px * 8);
    rx.set(-py * 7);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
    rx.set(0);
    ry.set(0);
  };

  return (
    <Motion.button
      ref={ref}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x, y, rotateX: rx, rotateY: ry }}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Motion.button>
  );
}

function ParticleField({ reduce }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        size: 2 + (i % 3),
      })),
    [],
  );
  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p, i) => (
        <Motion.i
          key={p.id}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, i % 2 ? -10 : 10, 0],
                  x: [0, i % 3 ? 5 : -5, 0],
                  opacity: [0.18, 0.65, 0.18],
                }
          }
          transition={{
            duration: 3.5 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

const styles = `
.partha-nav-shell{position:fixed;top:0;left:0;right:0;z-index:60;padding:14px 14px 0;perspective:1400px;}
.partha-nav{position:relative;width:100%;height:78px;border-radius:28px;overflow:hidden;background:rgba(222,225,255,.52);border:1px solid rgba(124,58,237,.22);box-shadow:0 28px 80px -35px rgba(76,29,149,.48),inset 0 1px 0 rgba(255,255,255,.95);backdrop-filter:blur(24px) saturate(150%);transition:height .45s ease,border-radius .45s ease,background .45s ease,box-shadow .45s ease;}
.partha-nav.is-dark{background:linear-gradient(180deg,rgba(15,11,35,.78),rgba(10,8,25,.66));border-color:rgba(167,139,250,.22);box-shadow:0 30px 90px -40px rgba(109,40,217,.7),inset 0 1px 0 rgba(255,255,255,.08);}
.partha-nav.is-light{color:hsl(222 47% 11%);}
.partha-nav.is-dark{color:hsl(210 40% 98%);}
.partha-nav.is-scrolled{height:68px;border-radius:23px;}
.nav-liquid-border{position:absolute;inset:0;padding:1px;border-radius:inherit;background:linear-gradient(100deg,rgba(139,92,246,.15),rgba(124,58,237,.85),rgba(59,130,246,.65),rgba(217,70,239,.75),rgba(139,92,246,.15));background-size:260% 100%;animation:borderFlow 7s ease-in-out infinite;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;pointer-events:none;}
@keyframes borderFlow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.nav-ribbon-glow{position:absolute;width:48%;height:120px;left:26%;top:-60px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.34),rgba(59,130,246,.12) 42%,transparent 72%);filter:blur(18px);pointer-events:none;}
.nav-content{height:100%;display:flex;align-items:center;gap:18px;padding:0 20px;position:relative;z-index:2;transform-style:preserve-3d;}
.particle-field{position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:.9;}
.particle-field i{position:absolute;border-radius:50%;background:hsl(262 83% 70%);box-shadow:0 0 12px hsl(262 83% 65%);}
.brand-3d{position:relative;display:flex;align-items:center;gap:11px;flex:0 0 auto;border:0;background:transparent;padding:0 10px 0 0;cursor:pointer;transform-style:preserve-3d;}
.brand-core{position:relative;width:54px;height:54px;display:grid;place-items:center;transform-style:preserve-3d;}
.brand-aura{position:absolute;width:62px;height:62px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.34),transparent 68%);filter:blur(5px);}
.brand-orbit{position:absolute;border:1px solid rgba(167,139,250,.52);border-radius:50%;pointer-events:none;transform-style:preserve-3d;}
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
.nav-links{display:flex;align-items:center;justify-content:center;gap:5px;flex:1;min-width:0;transform-style:preserve-3d;}
.nav-item{position:relative;height:46px;padding:0 13px;border:0;background:transparent;color:inherit;opacity:.68;border-radius:16px;display:flex;align-items:center;gap:8px;cursor:pointer;white-space:nowrap;transform-style:preserve-3d;perspective:800px;transition:opacity .25s ease;}
.nav-item:hover,.nav-item.hovered,.nav-item.active{opacity:1;}
.nav-item-surface{position:absolute;inset:0;border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(124,58,237,.03));border:1px solid transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.06);transform:translateZ(-8px);transition:background .25s ease,border-color .25s ease,box-shadow .25s ease,transform .25s ease;}
.nav-item:hover .nav-item-surface,.nav-item.hovered .nav-item-surface{background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(124,58,237,.16));border-color:rgba(167,139,250,.3);box-shadow:0 15px 35px -20px rgba(124,58,237,.9),inset 0 1px 0 rgba(255,255,255,.13);transform:translateZ(-2px);}
.nav-item.active .nav-item-surface{background:linear-gradient(145deg,rgba(139,92,246,.3),rgba(124,58,237,.1));border-color:rgba(167,139,250,.55);box-shadow:0 14px 36px -18px rgba(124,58,237,.9),inset 0 1px 0 rgba(255,255,255,.16);}
.nav-item-icon,.nav-item-label,.active-dot{position:relative;z-index:2;}
.nav-item-icon{display:grid;place-items:center;color:hsl(262 83% 67%);filter:drop-shadow(0 0 6px rgba(139,92,246,.35));}
.nav-item-label{font:600 12px "Inter",sans-serif;}
.active-dot{width:4px;height:4px;border-radius:50%;background:#a78bfa;box-shadow:0 0 10px #8b5cf6;margin-left:1px;}
.nav-actions{display:flex;align-items:center;gap:8px;flex:0 0 auto;}
.magnetic-btn{height:40px;border-radius:14px;padding:0 12px;display:flex;align-items:center;gap:7px;border:1px solid rgba(139,92,246,.25);cursor:pointer;color:inherit;transform-style:preserve-3d;box-shadow:0 10px 30px -20px rgba(124,58,237,.7),inset 0 1px 0 rgba(255,255,255,.1);}
.search-btn{background:rgba(255,255,255,.06);}
.search-btn svg{color:hsl(262 83% 65%);}
.magnetic-btn span{font:600 11px "Inter",sans-serif;}
.magnetic-btn kbd{font:500 8px "JetBrains Mono",monospace;opacity:.5;border:1px solid currentColor;padding:3px 5px;border-radius:5px;}
.talk-btn{background:linear-gradient(135deg,hsl(262 83% 58%),hsl(272 72% 52%));color:white;border-color:rgba(255,255,255,.22);box-shadow:0 14px 34px -15px rgba(124,58,237,.95),inset 0 1px 0 rgba(255,255,255,.32);}
.mobile-trigger{display:none;border:0;background:transparent;color:inherit;width:42px;height:42px;border-radius:13px;cursor:pointer;}
.mobile-trigger span{display:block;width:19px;height:1.5px;background:currentColor;margin:4px auto;border-radius:2px;}
.mobile-panel{display:none;position:absolute;top:88px;left:14px;right:14px;padding:10px;border-radius:22px;border:1px solid rgba(139,92,246,.24);backdrop-filter:blur(25px);box-shadow:0 30px 80px -30px rgba(76,29,149,.65);}
.mobile-panel.is-dark{background:rgba(12,9,27,.92);}.mobile-panel.is-light{background:rgba(255,255,255,.92);}
.mobile-link{width:100%;height:48px;display:flex;align-items:center;gap:11px;border:0;background:transparent;border-radius:14px;padding:0 15px;color:inherit;cursor:pointer;opacity:.7;font:600 13px "Inter",sans-serif;}.mobile-link.active{opacity:1;background:rgba(124,58,237,.13);color:hsl(262 83% 58%);}
@media(max-width:1150px){.nav-item{padding:0 9px}.nav-item-label{font-size:11px}.brand-name{display:none}.nav-content{gap:10px}.magnetic-btn span,.magnetic-btn kbd{display:none}.magnetic-btn{width:40px;justify-content:center;padding:0}.nav-actions{gap:5px;}}
@media(max-width:900px){.nav-links,.nav-actions{display:none}.mobile-trigger{display:block;margin-left:auto}.mobile-panel{display:block}.partha-nav{height:68px}.nav-content{padding:0 13px}.brand-name{display:flex;}}
@media(max-width:520px){.brand-name small{display:none}.brand-name strong{font-size:14px}.brand-core{width:48px;height:48px}.brand-p,.brand-depth{font-size:28px}.brand-orbit{transform:scale(.9) rotateX(66deg) rotateZ(20deg)} }
`;
