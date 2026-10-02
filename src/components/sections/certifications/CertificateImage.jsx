import { useState } from "react";
import { Award } from "lucide-react";
import { CATEGORY_STYLES } from "../../../data/certificates";

export default function CertificateImage({
  src,
  alt,
  category,
  className = "",
}) {
  const [errored, setErrored] = useState(false);
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.Programming;

  if (errored || !src) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ background: style.gradient }}
      >
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <Award
          className="relative w-12 h-12 text-white/80 mb-2"
          strokeWidth={1.5}
        />
        <span className="relative font-display font-bold text-sm text-white/90 uppercase tracking-widest">
          {category}
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
