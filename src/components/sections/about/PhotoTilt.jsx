import { useRef } from "react";
import {
  motion as Motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function PhotoTilt({ src, alt = "Portrait" }) {
  const ref = useRef(null);

  /* =====================================================
     MOUSE
  ===================================================== */

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  /* =====================================================
     MAIN 3D ROTATION
  ===================================================== */

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [16, -16]), {
    stiffness: 170,
    damping: 18,
    mass: 0.7,
  });

  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-16, 16]), {
    stiffness: 170,
    damping: 18,
    mass: 0.7,
  });

  /* =====================================================
     EXTRA PARALLAX
  ===================================================== */

  const imageX = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const imageY = useSpring(useTransform(mouseY, [0, 1], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const innerX = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 180,
    damping: 22,
  });

  const innerY = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), {
    stiffness: 180,
    damping: 22,
  });

  /* =====================================================
     CURSOR LIGHT
  ===================================================== */

  const lightX = useTransform(mouseX, (value) => `${value * 100}%`);

  const lightY = useTransform(mouseY, (value) => `${value * 100}%`);

  const cursorLight = useMotionTemplate`
    radial-gradient(
      circle 220px at ${lightX} ${lightY},
      rgba(255,255,255,0.25),
      rgba(168,85,247,0.16) 25%,
      rgba(34,211,238,0.08) 45%,
      transparent 72%
    )
  `;

  /* =====================================================
     DYNAMIC EDGE LIGHT
  ===================================================== */

  const edgeLight = useMotionTemplate`
    linear-gradient(
      ${useTransform([mouseX, mouseY], ([x, y]) => `${x * 360 + y * 45}deg`)},
      rgba(168,85,247,0.8),
      rgba(34,211,238,0.5),
      rgba(217,70,239,0.7),
      rgba(168,85,247,0.8)
    )
  `;

  /* =====================================================
     MOUSE HANDLER
  ===================================================== */

  const handleMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;

    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  /* =====================================================
     RESET
  ===================================================== */

  const reset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        perspective: "1800px",
      }}
    >
      {/* ==================================================
          AMBIENT BACK GLOW
      ================================================== */}

      <Motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          h-[65%]
          w-[65%]
          rounded-full
          bg-primary/20
          blur-[110px]
        "
      />

      {/* ==================================================
          ORBIT 1
      ================================================== */}

      <Motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          h-[112%]
          w-[112%]
          rounded-full
          border
          border-primary/20
        "
      >
        <div
          className="
            absolute
            -top-1.5
            left-1/2
            h-3
            w-3
            -translate-x-1/2
            rounded-full
            bg-primary
            shadow-[0_0_22px_hsl(262_83%_58%)]
          "
        />
      </Motion.div>

      {/* ==================================================
          ORBIT 2
      ================================================== */}

      <Motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          h-[101%]
          w-[101%]
          rounded-full
          border
          border-dashed
          border-fuchsia-500/20
        "
      >
        <div
          className="
            absolute
            right-[9%]
            top-[15%]
            h-2
            w-2
            rounded-full
            bg-fuchsia-400
            shadow-[0_0_16px_rgba(217,70,239,.9)]
          "
        />
      </Motion.div>

      {/* ==================================================
          MAIN 3D WORLD
      ================================================== */}

      <Motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="
          group
          relative
          h-[84%]
          w-[84%]
          cursor-pointer
        "
      >
        {/* ==================================================
            DEEP BACK PLANE
        ================================================== */}

        <Motion.div
          style={{
            translateZ: -70,
            rotateZ: -2,
          }}
          className="
            absolute
            inset-[-18px]
            rounded-[2.4rem]
            border
            border-primary/10
            bg-primary/[0.025]
            shadow-[0_45px_100px_rgba(0,0,0,.5)]
          "
        />

        {/* ==================================================
            HOLOGRAPHIC EDGE
        ================================================== */}

        <Motion.div
          style={{
            translateZ: -30,
            background: edgeLight,
          }}
          className="
            absolute
            inset-[-7px]
            rounded-[2.1rem]
            opacity-60
            blur-[1px]
          "
        />

        {/* ==================================================
            GLASS BACK PANEL
        ================================================== */}

        <Motion.div
          style={{
            translateZ: -10,
          }}
          className="
            absolute
            inset-[-2px]
            rounded-[2rem]
            border
            border-white/10
            bg-black/20
            backdrop-blur-sm
          "
        />

        {/* ==================================================
            MAIN PHOTO
        ================================================== */}

        <Motion.div
          style={{
            translateX: imageX,
            translateY: imageY,
            translateZ: 35,
            transformStyle: "preserve-3d",
          }}
          className="
            relative
            h-full
            w-full
            overflow-hidden
            rounded-[1.8rem]
            bg-black
            shadow-[0_35px_90px_rgba(0,0,0,.55)]
            ring-1
            ring-white/10
          "
        >
          <img
            src={src}
            alt={alt}
            draggable="false"
            className="
              h-full
              w-full
              select-none
              object-cover
              grayscale
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.055]
            "
            onError={(e) => {
              e.currentTarget.style.display = "none";

              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.style.background =
                  "linear-gradient(135deg, hsl(262 83% 58%), hsl(190 90% 55%))";
              }
            }}
          />

          {/* ==================================================
              CINEMATIC SHADOW
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/80
              via-black/10
              to-black/20
            "
          />

          {/* ==================================================
              CURSOR LIGHT
          ================================================== */}

          <Motion.div
            style={{
              background: cursorLight,
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-0
              mix-blend-screen
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />

          {/* ==================================================
              HOLOGRAM SCAN
          ================================================== */}

          <Motion.div
            animate={{
              y: ["-120%", "120%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1.5,
            }}
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              h-[25%]
              bg-gradient-to-b
              from-transparent
              via-primary/10
              to-transparent
              blur-md
            "
          />

          {/* ==================================================
              GLASS SHINE
          ================================================== */}

          <Motion.div
            animate={{
              x: ["-150%", "150%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              top-[-20%]
              h-[140%]
              w-[22%]
              rotate-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              blur-md
            "
          />

          {/* ==================================================
              INNER BORDER
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[1.8rem]
              ring-1
              ring-inset
              ring-white/15
            "
          />

          {/* ==================================================
              CORNER HUD
          ================================================== */}

          <div
            className="
              absolute
              left-5
              top-5
              h-6
              w-6
              border-l
              border-t
              border-white/40
            "
          />

          <div
            className="
              absolute
              bottom-5
              right-5
              h-6
              w-6
              border-b
              border-r
              border-white/40
            "
          />

          {/* ==================================================
              PHOTO INFORMATION
          ================================================== */}

          <Motion.div
            style={{
              translateX: innerX,
              translateY: innerY,
              translateZ: 80,
            }}
            className="
              absolute
              bottom-6
              left-6
            "
          >
            <p
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/50
              "
            >
              PARTHA PATTANAYAK
            </p>

            <p
              className="
                mt-1
                text-xs
                font-semibold
                tracking-wide
                text-white
              "
            >
              Full Stack Developer
            </p>
          </Motion.div>
        </Motion.div>

        {/* ==================================================
            3D FLOATING STATUS
        ================================================== */}

        <Motion.div
          style={{
            translateZ: 130,
            translateX: innerX,
            translateY: innerY,
          }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-5
            top-[9%]
            rounded-full
            border
            border-emerald-400/30
            bg-black/55
            px-3
            py-1.5
            font-mono
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-emerald-300
            shadow-[0_15px_35px_rgba(16,185,129,.18)]
            backdrop-blur-xl
          "
        >
          <span
            className="
              mr-1.5
              inline-block
              h-1.5
              w-1.5
              animate-pulse
              rounded-full
              bg-emerald-400
            "
          />
          Open to work
        </Motion.div>

        {/* ==================================================
            3D LOCATION
        ================================================== */}

        <Motion.div
          style={{
            translateZ: 105,
            translateX: innerX,
            translateY: innerY,
          }}
          animate={{
            y: [0, 7, 0],
          }}
          transition={{
            duration: 3.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-4
            -left-5
            rounded-full
            border
            border-fuchsia-500/30
            bg-black/55
            px-3
            py-1.5
            font-mono
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-fuchsia-300
            shadow-[0_15px_35px_rgba(217,70,239,.18)]
            backdrop-blur-xl
          "
        >
          Kolkata
        </Motion.div>

        {/* ==================================================
            FLOATING LIGHT NODE
        ================================================== */}

        <Motion.div
          style={{
            translateZ: 150,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-3
            top-[35%]
            h-2.5
            w-2.5
            rounded-full
            bg-primary
            shadow-[0_0_25px_hsl(262_83%_58%)]
          "
        />

        {/* ==================================================
            FLOATING MINI DOT
        ================================================== */}

        <Motion.div
          style={{
            translateZ: 120,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, 4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-2
            bottom-[30%]
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-300
            shadow-[0_0_18px_rgba(34,211,238,.9)]
          "
        />
      </Motion.div>
    </div>
  );
}
