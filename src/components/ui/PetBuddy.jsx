import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

/* ---------- Message pools ---------- */
const CLICK_REACTIONS = [
  "Meow! 🐱",
  "Purr... 😽",
  "Hey human! 👋",
  "Stop poking! 😾",
  "Prrrr 😺",
  "Nya! 🐾",
  "Busy napping! 💤",
  "What do you need? 🙀",
];

const DRAG_REACTIONS = [
  "Nyaaa! 😹",
  "Put me down! 😿",
  "Where to? 🗺️",
  "Weee! 🐈",
  "Gentle paws! 🐾",
];

const IDLE_MESSAGES = [
  "Fish? 🐟",
  "Nap time 💤",
  "Meow 🐱",
  "Pet me! 🐾",
  "I'm watching 👀",
  "Purr purr 😽",
  "Sunbeam? ☀️",
  "Yarn ball? 🧶",
];

const SLEEP_MESSAGE = "Zzz... 💤";
const WAKE_MESSAGE = "Mew! 🐱";
const LAND_MESSAGE = "Mew! 🐱";
const EMOJI_BURST = ["🐾", "💜", "✨", "🐱", "🐟", "💖", "🎉", "⭐"];

const SIZE = 76;
const SAFE_MARGIN = 14;
const IDLE_MSG_INTERVAL = 14000;
const SLEEP_TIMEOUT = 28000;
const CLICK_DRAG_THRESHOLD = 5;
const STORAGE_KEY = "petBuddyPos-v2";
const FALL_SESSION_KEY = "petBuddyFell-v2";

export default function PetBuddy() {
  const [ready, setReady] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const bubbleX = useTransform(x, (v) => v + SIZE / 2);
  const bubbleY = useTransform(y, (v) => v - 12);
  const burstX = useTransform(x, (v) => v + SIZE / 2);
  const burstY = useTransform(y, (v) => v + SIZE / 2);
  const shadowX = useTransform(x, (v) => v + SIZE / 2);
  const shadowY = useTransform(y, (v) => v + SIZE + 4);

  const [message, setMessage] = useState(null);
  const [burst, setBurst] = useState([]);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const [landing, setLanding] = useState(false);
  const [dustPuff, setDustPuff] = useState(false);

  const buddyRef = useRef(null);
  const cursorRef = useRef({ x: -9999, y: -9999 });
  const lastInteraction = useRef(Date.now());
  const messageTimer = useRef(null);
  const clickTimer = useRef(null);

  const safeTarget = useCallback((rawX, rawY) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const maxX = w - SIZE - SAFE_MARGIN;
    const maxY = h - SIZE - SAFE_MARGIN;
    return {
      x: Math.max(SAFE_MARGIN, Math.min(maxX, rawX)),
      y: Math.max(SAFE_MARGIN, Math.min(maxY, rawY)),
    };
  }, []);

  const showMessage = useCallback((msg, duration = 2200) => {
    clearTimeout(messageTimer.current);
    setMessage(msg);
    messageTimer.current = setTimeout(() => setMessage(null), duration);
  }, []);

  /* Init + fall */
  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouch(touch);

    let init = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) init = JSON.parse(saved);
    } catch {
      ("");
    }

    if (!init || typeof init.x !== "number" || typeof init.y !== "number") {
      const w = window.innerWidth;
      const h = window.innerHeight;
      init = { x: w - SIZE - 40, y: h - SIZE - 140 };
    }

    const clamped = safeTarget(init.x, init.y);
    x.set(clamped.x);
    setReady(true);

    const hasFallen = sessionStorage.getItem(FALL_SESSION_KEY) === "1";

    if (hasFallen) {
      y.set(clamped.y);
      return;
    }

    const START_Y = -SIZE - 80;
    const DURATION = 950;

    const easeOutBounce = (t) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) {
        t -= 1.5 / d1;
        return n1 * t * t + 0.75;
      }
      if (t < 2.5 / d1) {
        t -= 2.25 / d1;
        return n1 * t * t + 0.9375;
      }
      t -= 2.625 / d1;
      return n1 * t * t + 0.984375;
    };

    y.set(START_Y);
    setLanding(true);

    let rafId = null;
    let startTime = null;
    let cancelled = false;

    const step = (timestamp) => {
      if (cancelled) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = easeOutBounce(progress);
      y.set(START_Y + (clamped.y - START_Y) * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        try {
          sessionStorage.setItem(FALL_SESSION_KEY, "1");
        } catch {
          ("");
        }

        setDustPuff(true);
        setTimeout(() => setDustPuff(false), 550);
        showMessage(LAND_MESSAGE, 2200);
        setTimeout(() => setLanding(false), 500);
      }
    };

    const deferId = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, 80);

    return () => {
      cancelled = true;
      clearTimeout(deferId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [x, y, safeTarget, showMessage]);

  /* Cursor tracking */
  useEffect(() => {
    if (isTouch) return;
    const onMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  /* Eye tracking */
  useEffect(() => {
    if (isTouch || landing) return;
    const id = setInterval(() => {
      if (!buddyRef.current || sleeping) return;
      const rect = buddyRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cursorRef.current.x - cx;
      const dy = cursorRef.current.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 3.5;
      const intensity = Math.min(1, dist / 260);
      setEyeOffset({
        x: (dx / dist) * max * intensity,
        y: (dy / dist) * max * intensity,
      });
    }, 55);
    return () => clearInterval(id);
  }, [isTouch, sleeping, landing]);

  /* Clamp on resize */
  useEffect(() => {
    const onResize = () => {
      const clamped = safeTarget(x.get(), y.get());
      x.set(clamped.x);
      y.set(clamped.y);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [x, y, safeTarget]);

  /* Blink */
  useEffect(() => {
    let t;
    const loop = () => {
      if (!sleeping && !landing) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 140);
      }
      t = setTimeout(loop, 2200 + Math.random() * 3800);
    };
    t = setTimeout(loop, 1500);
    return () => clearTimeout(t);
  }, [sleeping, landing]);

  /* Idle sparkles */
  useEffect(() => {
    if (sleeping || isTouch || landing) return;
    const id = setInterval(() => {
      if (Math.random() < 0.5) {
        setSparkle(true);
        setTimeout(() => setSparkle(false), 1400);
      }
    }, 7000);
    return () => clearInterval(id);
  }, [sleeping, isTouch, landing]);

  /* Idle messages */
  useEffect(() => {
    if (sleeping || dragging || landing) return;
    const id = setInterval(() => {
      if (Date.now() - lastInteraction.current < IDLE_MSG_INTERVAL) return;
      if (Math.random() < 0.55) {
        const msg =
          IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)];
        showMessage(msg);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [sleeping, dragging, showMessage, landing]);

  /* Sleep detection */
  useEffect(() => {
    if (landing) return;
    const id = setInterval(() => {
      if (dragging || hovered) {
        lastInteraction.current = Date.now();
        if (sleeping) setSleeping(false);
        return;
      }
      if (Date.now() - lastInteraction.current > SLEEP_TIMEOUT && !sleeping) {
        setSleeping(true);
        showMessage(SLEEP_MESSAGE, 4000);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [dragging, hovered, sleeping, showMessage, landing]);

  const wake = useCallback(() => {
    lastInteraction.current = Date.now();
    if (sleeping) {
      setSleeping(false);
      showMessage(WAKE_MESSAGE, 1600);
    }
  }, [sleeping, showMessage]);

  /* Drag */
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (landing) return;
    e.stopPropagation();
    wake();

    const rect = buddyRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    dragStart.current = { x: e.clientX, y: e.clientY };
    didDrag.current = false;
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.hypot(dx, dy) > CLICK_DRAG_THRESHOLD) didDrag.current = true;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      const clamped = safeTarget(newX, newY);
      x.set(clamped.x);
      y.set(clamped.y);
    };
    const onUp = () => {
      setDragging(false);
      if (didDrag.current) {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ x: x.get(), y: y.get() }),
          );
        } catch {
          ("");
        }
        const msg =
          DRAG_REACTIONS[Math.floor(Math.random() * DRAG_REACTIONS.length)];
        showMessage(msg, 1500);
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, x, y, safeTarget, showMessage]);

  /* Click */
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (didDrag.current || landing) return;

      const reaction =
        CLICK_REACTIONS[Math.floor(Math.random() * CLICK_REACTIONS.length)];
      showMessage(reaction, 1400);
      setClicked(true);

      const newBurst = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        emoji: EMOJI_BURST[Math.floor(Math.random() * EMOJI_BURST.length)],
        angle: (i / 8) * Math.PI * 2 + Math.random() * 0.6,
        distance: 55 + Math.random() * 45,
      }));
      setBurst(newBurst);

      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        setClicked(false);
        setBurst([]);
      }, 1200);
    },
    [showMessage, landing],
  );

  if (!ready) return null;

  return (
    <div className="pet-buddy-root">
      {/* Ground shadow */}
      <Motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: shadowX,
          y: shadowY,
          translateX: "-50%",
          zIndex: 44,
          pointerEvents: "none",
        }}
      >
        <Motion.div
          animate={{
            scaleX: landing ? 0.4 : clicked ? 1.2 : hovered ? 1.1 : 1,
            opacity: landing ? 0.05 : dragging ? 0.15 : 0.35,
          }}
          transition={{ duration: 0.4 }}
          className="w-10 h-1.5 rounded-full bg-black blur-[3px]"
        />
      </Motion.div>

      {/* Dust puff */}
      <AnimatePresence>
        {dustPuff && (
          <Motion.div
            key="dust"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              x: shadowX,
              y: shadowY,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 44,
              pointerEvents: "none",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0.7, x: 0, y: 0, scale: 0.6 }}
                animate={{
                  opacity: 0,
                  x: (i - 2.5) * 14,
                  y: -8 - Math.random() * 8,
                  scale: 1.4,
                }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full bg-slate-500/50"
                style={{ left: 0, top: 0 }}
              />
            ))}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Sparkle */}
      <AnimatePresence>
        {sparkle && (
          <Motion.div
            key="sparkle"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              x: bubbleX,
              y: bubbleY,
              translateX: "-50%",
              translateY: "-100%",
              zIndex: 46,
              pointerEvents: "none",
            }}
          >
            <Motion.div
              initial={{ opacity: 0, y: 8, scale: 0.4 }}
              animate={{ opacity: 1, y: -6, scale: 1 }}
              exit={{ opacity: 0, y: -22, scale: 0.4 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-[18px]"
            >
              ✨
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Cat */}
      <Motion.div
        data-pet-buddy
        ref={buddyRef}
        onPointerDown={onPointerDown}
        onClick={handleClick}
        onMouseEnter={() => {
          if (landing) return;
          setHovered(true);
          wake();
        }}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: SIZE,
          height: SIZE,
          x,
          y,
          zIndex: 45,
          cursor: landing ? "default" : dragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
          willChange: "transform",
        }}
      >
        <Motion.div
          animate={{
            opacity: sleeping ? 0.25 : hovered ? 0.75 : 0.55,
            scale: sleeping ? 0.9 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, hsl(262 83% 65% / 0.9), transparent 70%)",
          }}
        />

        <Motion.div
          animate={{
            rotate: dragging
              ? [-30, 30, -30]
              : hovered
                ? [-25, 25, -25]
                : [-12, 12, -12],
          }}
          transition={{
            duration: dragging ? 0.5 : hovered ? 0.7 : 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "left center" }}
          className="absolute right-[-22px] top-[58%] w-8 h-2 rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-fuchsia-400 shadow-sm"
        />

        <Motion.div
          animate={{
            y: landing ? 0 : sleeping ? [0, -1, 0] : [0, -3, 0],
            scaleX: landing ? [0.85, 1.15, 0.95, 1] : 1,
            scaleY: landing ? [1.15, 0.85, 1.05, 1] : 1,
          }}
          transition={{
            y: {
              duration: sleeping ? 3.2 : 2.2,
              repeat: landing ? 0 : Infinity,
              ease: "easeInOut",
            },
            scaleX: { duration: 0.55, times: [0, 0.35, 0.7, 1] },
            scaleY: { duration: 0.55, times: [0, 0.35, 0.7, 1] },
          }}
          className="relative w-full h-full"
        >
          <div className="absolute -top-1 left-3 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-primary drop-shadow-sm z-10" />
          <div className="absolute -top-1 right-3 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] border-b-primary drop-shadow-sm z-10" />

          <div className="absolute top-1 left-[15px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[9px] border-b-pink-300/80 z-20" />
          <div className="absolute top-1 right-[15px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[9px] border-b-pink-300/80 z-20" />

          <div className="relative w-full h-full rounded-[48%_48%_46%_46%] bg-gradient-to-br from-primary via-fuchsia-500 to-violet-600 shadow-lg shadow-primary/40 flex flex-col items-center justify-center overflow-visible">
            <div className="absolute top-2 left-3 w-5 h-3 rounded-full bg-white/30 blur-[2px]" />

            <div className="relative flex items-center gap-3 mb-1">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="relative w-4 h-4 rounded-full bg-white shadow-inner flex items-center justify-center"
                >
                  {sleeping ? (
                    <div className="w-3 h-[2px] rounded-full bg-slate-900/80" />
                  ) : (
                    <Motion.div
                      animate={{
                        x: eyeOffset.x,
                        y: eyeOffset.y,
                        scaleY: blinking ? 0.1 : 1,
                        width: hovered ? 10 : 8,
                        height: hovered ? 10 : 8,
                      }}
                      transition={{
                        x: { type: "spring", stiffness: 500, damping: 25 },
                        y: { type: "spring", stiffness: 500, damping: 25 },
                        scaleY: { duration: 0.08 },
                        width: { duration: 0.2 },
                        height: { duration: 0.2 },
                      }}
                      className="rounded-full bg-slate-900"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-pink-500" />

            <div className="w-2.5 h-1 mt-0.5 border-b border-slate-900/60 rounded-b-full" />

            <div className="absolute top-[62%] left-0 flex flex-col gap-[3px] pointer-events-none">
              <div className="w-2.5 h-px bg-slate-900/40 -rotate-[15deg]" />
              <div className="w-3 h-px bg-slate-900/40" />
              <div className="w-2.5 h-px bg-slate-900/40 rotate-[15deg]" />
            </div>
            <div className="absolute top-[62%] right-0 flex flex-col gap-[3px] items-end pointer-events-none">
              <div className="w-2.5 h-px bg-slate-900/40 rotate-[15deg]" />
              <div className="w-3 h-px bg-slate-900/40" />
              <div className="w-2.5 h-px bg-slate-900/40 -rotate-[15deg]" />
            </div>

            <div className="absolute bottom-[22%] left-[10%] w-2 h-1.5 rounded-full bg-pink-300/60 blur-[1px]" />
            <div className="absolute bottom-[22%] right-[10%] w-2 h-1.5 rounded-full bg-pink-300/60 blur-[1px]" />
          </div>
        </Motion.div>
      </Motion.div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {message && (
          <Motion.div
            key="bubble"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              x: bubbleX,
              y: bubbleY,
              translateX: "-50%",
              translateY: "-100%",
              zIndex: 47,
              pointerEvents: "none",
            }}
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -4 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
              className="relative px-3 py-1.5 rounded-2xl text-xs font-semibold shadow-xl whitespace-nowrap max-w-[220px] text-center border bg-card/95 backdrop-blur-md text-foreground border-border"
            >
              {message}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b bg-card border-border" />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Burst */}
      <AnimatePresence>
        {burst.length > 0 && (
          <Motion.div
            key="burst-layer"
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              x: burstX,
              y: burstY,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 46,
              pointerEvents: "none",
            }}
          >
            {burst.map((b) => (
              <Motion.div
                key={b.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(b.angle) * b.distance,
                  y: Math.sin(b.angle) * b.distance,
                  scale: 1.3,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute text-[20px]"
                style={{ left: 0, top: 0 }}
              >
                {b.emoji}
              </Motion.div>
            ))}
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
