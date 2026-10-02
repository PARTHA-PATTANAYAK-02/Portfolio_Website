// import { motion as Motion } from "framer-motion";

// export default function GlitchText({ text, className = "" }) {
//   return (
//     <div className={`relative inline-block ${className}`}>
//       {/* Base text */}
//       <span className="relative z-10">{text}</span>

//       {/* Red glitch layer */}
//       <Motion.span
//         aria-hidden
//         className="absolute inset-0 z-0 text-red-500 select-none"
//         animate={{
//           x: [0, -2, 2, -1, 0],
//           y: [0, 1, -1, 2, 0],
//         }}
//         transition={{
//           duration: 0.4,
//           repeat: Infinity,
//           repeatDelay: 2,
//         }}
//         style={{ clipPath: "inset(0 0 60% 0)" }}
//       >
//         {text}
//       </Motion.span>

//       {/* Cyan glitch layer */}
//       <Motion.span
//         aria-hidden
//         className="absolute inset-0 z-0 text-cyan-400 select-none"
//         animate={{
//           x: [0, 2, -2, 1, 0],
//           y: [0, -1, 1, -2, 0],
//         }}
//         transition={{
//           duration: 0.4,
//           repeat: Infinity,
//           repeatDelay: 2,
//         }}
//         style={{ clipPath: "inset(60% 0 0 0)" }}
//       >
//         {text}
//       </Motion.span>

//       {/* Purple glow behind */}
//       <span
//         aria-hidden
//         className="absolute inset-0 z-0 blur-2xl opacity-60 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent select-none"
//       >
//         {text}
//       </span>
//     </div>
//   );
// }

import { motion as Motion } from "framer-motion";

export default function GlitchText({ text, className = "" }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Red glitch layer — continuous */}
      <Motion.span
        aria-hidden
        className="absolute inset-0 z-0 text-red-500 select-none"
        animate={{
          x: [0, -3, 3, -2, 2, 0, -1, 1, 0],
          y: [0, 2, -2, 1, -1, 0, 1, -1, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ clipPath: "inset(0 0 55% 0)" }}
      >
        {text}
      </Motion.span>

      {/* Cyan glitch layer — continuous, opposite direction */}
      <Motion.span
        aria-hidden
        className="absolute inset-0 z-0 text-cyan-400 select-none"
        animate={{
          x: [0, 3, -3, 2, -2, 0, 1, -1, 0],
          y: [0, -2, 2, -1, 1, 0, -1, 1, 0],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ clipPath: "inset(55% 0 0 0)" }}
      >
        {text}
      </Motion.span>

      {/* Purple glow behind */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 blur-2xl opacity-60 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent select-none"
      >
        {text}
      </span>
    </div>
  );
}
