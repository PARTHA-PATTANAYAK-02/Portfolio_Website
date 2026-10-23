import { useRef } from "react";
import {
  motion as Motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MapPin } from "lucide-react";

const SPRING = { stiffness: 280, damping: 22, mass: 0.5 };

export default function PhotoTilt({ src, alt = "Portrait" }) {
  const cardRef = useRef(null);
  const reduce = useReducedMotion();

  // Normalized mouse coords (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D rotation
  const smoothX = useSpring(mouseX, SPRING);
  const smoothY = useSpring(mouseY, SPRING);

  // 3D Tilt: rotateX is driven by mouseY (inverted), rotateY by mouseX
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Holographic reflection coordinates
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);
  const rectRef = useRef(null);

  const handlePointerEnter = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    rectRef.current = cardRef.current?.getBoundingClientRect();
  };

  const handlePointerMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    if (!rectRef.current) {
      rectRef.current = cardRef.current?.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    rectRef.current = null;
  };

  return (
    <div
      className="group relative flex h-full w-full items-center justify-center"
      style={{ perspective: 1200 }}
    >
      {/* Ambient background glow (outside 3D plane for GPU efficiency) */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 via-fuchsia-500/25 to-cyan-500/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-95"
        aria-hidden="true"
      />

      {/* Main 3D Tilted Card */}
      <Motion.div
        ref={cardRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.3 }}
        className="relative h-[88%] w-[88%] cursor-pointer rounded-[2rem] border border-primary/35 bg-card/80 p-2 shadow-2xl shadow-primary/15 transition-colors duration-300 group-hover:border-primary/65 group-hover:shadow-primary/30"
      >
        {/* Subtle decorative border gradient */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-primary/25 via-transparent to-fuchsia-500/25 opacity-50 transition-opacity group-hover:opacity-90"
          style={{ transform: "translateZ(1px)" }}
        />

        {/* Photo Container */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-black"
          style={{ transform: "translateZ(10px)" }}
        >
          <img
            src={src}
            alt={alt}
            draggable="false"
            className="h-full w-full select-none object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.style.background =
                  "linear-gradient(135deg, hsl(262 83% 58%), hsl(40 90% 60%))";
              }
            }}
          />

          {/* Vignette dark gradient for text readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Holographic light sheen following cursor */}
          <Motion.div
            className="pointer-events-none absolute -inset-[50%] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "radial-gradient(circle 280px at center, rgba(255,255,255,0.28), rgba(168,85,247,0.18) 40%, transparent 70%)",
              x: glareX,
              y: glareY,
              transform: "translateZ(15px)",
            }}
          />

          {/* Tech HUD corner accents */}
          <div
            className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-amber-300/70"
            style={{ transform: "translateZ(20px)" }}
          />
          <div
            className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-amber-300/70"
            style={{ transform: "translateZ(20px)" }}
          />

          {/* 3D Pop Badge: Open to work */}
          <div
            className="absolute right-3 top-3 pointer-events-none"
            style={{ transform: "translateZ(32px)" }}
          >
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-black/75 px-3 py-1 text-[10px] font-mono font-medium text-emerald-300 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Open to work</span>
            </div>
          </div>

          {/* 3D Pop Caption: Name & Title */}
          <div
            className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none"
            style={{ transform: "translateZ(28px)" }}
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/70">
                Partha Pattanayak
              </p>
              <h4 className="mt-0.5 text-sm font-bold tracking-tight text-white drop-shadow-md">
                Full Stack Developer
              </h4>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[10px] font-mono text-white/90 shadow-lg">
              <MapPin className="h-3 w-3 text-primary" />
              <span>Kolkata</span>
            </div>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
