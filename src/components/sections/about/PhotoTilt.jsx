import { useRef } from "react";
import {
  motion as Motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

const TILT = { stiffness: 170, damping: 18, mass: 0.7 };
const SHIFT = { stiffness: 150, damping: 20 };
const FLOAT = { duration: 3, repeat: Infinity, ease: "easeInOut" };

export default function PhotoTilt({ src, alt = "Portrait" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // main 3D rotation
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [14, -14]), TILT);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-14, 14]), TILT);

  // parallax layers
  const imageX = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), SHIFT);
  const imageY = useSpring(useTransform(mouseY, [0, 1], [-12, 12]), SHIFT);
  const innerX = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), SHIFT);
  const innerY = useSpring(useTransform(mouseY, [0, 1], [-6, 6]), SHIFT);

  // cursor light (champagne + violet)
  const lightX = useTransform(mouseX, (v) => `${v * 100}%`);
  const lightY = useTransform(mouseY, (v) => `${v * 100}%`);
  const cursorLight = useMotionTemplate`radial-gradient(circle 230px at ${lightX} ${lightY}, rgba(255,255,255,0.26), rgba(232,200,135,0.18) 25%, rgba(168,85,247,0.1) 45%, transparent 72%)`;

  // holographic edge follows the pointer
  const angle = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `${x * 360 + y * 45}deg`,
  );
  const edgeLight = useMotionTemplate`linear-gradient(${angle}, rgba(168,85,247,0.85), rgba(232,200,135,0.75), rgba(217,70,239,0.7), rgba(168,85,247,0.85))`;

  const handleMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ perspective: "1800px" }}
    >
      {/* ambient back glow */}
      <Motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.42, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute h-[65%] w-[65%] rounded-full bg-primary/25 blur-[110px]"
      />

      {/* orbit 1 (violet) */}
      <Motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute h-[112%] w-[112%] rounded-full border border-primary/20"
      >
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_22px_hsl(262_83%_58%)]" />
      </Motion.div>

      {/* orbit 2 (dashed, gold) */}
      <Motion.div
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute h-[101%] w-[101%] rounded-full border border-dashed border-amber-300/25"
      >
        <div className="absolute right-[9%] top-[15%] h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,.9)]" />
      </Motion.div>

      {/* main 3D world */}
      <Motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-[84%] w-[84%] cursor-pointer"
      >
        {/* deep back plane */}
        <div
          style={{ transform: "translateZ(-70px) rotateZ(-2deg)" }}
          className="absolute inset-[-18px] rounded-[2.4rem] border border-primary/10 bg-primary/[0.03] shadow-[0_45px_100px_rgba(0,0,0,.5)]"
        />

        {/* holographic edge */}
        <Motion.div
          style={{ translateZ: -30, background: edgeLight }}
          className="absolute inset-[-7px] rounded-[2.1rem] opacity-60 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* glass back panel */}
        <div
          style={{ transform: "translateZ(-10px)" }}
          className="absolute inset-[-2px] rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-sm"
        />

        {/* photo */}
        <Motion.div
          style={{
            x: imageX,
            y: imageY,
            translateZ: 35,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-black shadow-[0_35px_90px_rgba(0,0,0,.55)] ring-1 ring-white/10"
        >
          <img
            src={src}
            alt={alt}
            draggable="false"
            className="h-full w-full select-none object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.055] group-hover:grayscale-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.style.background =
                  "linear-gradient(135deg, hsl(262 83% 58%), hsl(40 90% 60%))";
              }
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

          {/* cursor light */}
          <Motion.div
            style={{ background: cursorLight }}
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* hologram scan */}
          {!reduce && (
            <Motion.div
              animate={{ y: ["-120%", "120%"] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1.5,
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-md"
            />
          )}

          {/* glass shine */}
          {!reduce && (
            <Motion.div
              animate={{ x: ["-150%", "150%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute top-[-20%] h-[140%] w-[22%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md"
            />
          )}

          <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/15" />

          {/* corner HUD */}
          <div className="absolute left-5 top-5 h-6 w-6 border-l border-t border-amber-200/60" />
          <div className="absolute bottom-5 right-5 h-6 w-6 border-b border-r border-amber-200/60" />

          {/* caption */}
          <Motion.div
            style={{ x: innerX, y: innerY, translateZ: 80 }}
            className="absolute bottom-6 left-6"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60">
              Partha Pattanayak
            </p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-white">
              Full Stack Developer
            </p>
          </Motion.div>
        </Motion.div>

        {/* floating status */}
        <Motion.div
          style={{ x: innerX, y: innerY, translateZ: 130 }}
          className="absolute -right-2 top-[9%] sm:-right-5"
        >
          <Motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={FLOAT}
            className="rounded-full border border-emerald-400/30 bg-black/60 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-300 shadow-[0_15px_35px_rgba(16,185,129,.2)] backdrop-blur-xl"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Open to work
          </Motion.div>
        </Motion.div>

        {/* floating location */}
        <Motion.div
          style={{ x: innerX, y: innerY, translateZ: 105 }}
          className="absolute -bottom-4 -left-2 sm:-left-5"
        >
          <Motion.div
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ ...FLOAT, duration: 3.7 }}
            className="rounded-full border border-amber-300/30 bg-black/60 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-200 shadow-[0_15px_35px_rgba(252,211,77,.18)] backdrop-blur-xl"
          >
            Kolkata
          </Motion.div>
        </Motion.div>

        {/* light nodes */}
        <Motion.div
          style={{ translateZ: 150 }}
          animate={
            reduce ? undefined : { scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-3 top-[35%] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_25px_hsl(262_83%_58%)]"
        />
        <Motion.div
          style={{ translateZ: 120 }}
          animate={reduce ? undefined : { y: [0, -10, 0], x: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 bottom-[30%] h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,.9)]"
        />
      </Motion.div>
    </div>
  );
}
