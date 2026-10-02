import { useState } from "react";

const CATEGORY_GRADIENTS = {
  "Full Stack": "linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)",
  Frontend: "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)",
  AI: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
};

export default function ProjectImage({ src, alt, category, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
        style={{
          background:
            CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS["Full Stack"],
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <span className="relative font-display font-bold text-3xl sm:text-5xl text-white/90 tracking-tight drop-shadow-lg">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
