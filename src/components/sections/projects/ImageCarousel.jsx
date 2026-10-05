import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectImage from "./ProjectImage";

const AUTO_SLIDE_MS = 4500;

export default function ImageCarousel({
  images = [],
  alt,
  category,
  size = "full",
  className = "",
  onUserSwipe,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const carouselRef = useRef(null);

  const hasMultiple = images.length > 1;
  const isCompact = size === "compact";

  useEffect(() => {
    setIndex(0);
  }, [images.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  /* Keyboard (modal only) */
  useEffect(() => {
    if (isCompact || !hasMultiple) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompact, hasMultiple, images.length]);

  /* Auto-slide */
  useEffect(() => {
    if (!hasMultiple || hovered || !isVisible) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % images.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timerRef.current);
  }, [hasMultiple, hovered, images.length, isVisible]);

  const goNext = (e) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setIndex((p) => (p + 1) % images.length);
  };
  const goPrev = (e) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setIndex((p) => (p - 1 + images.length) % images.length);
  };
  const goTo = (i) => (e) => {
    e.stopPropagation();
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) < 40) return;
    if (info.offset.x < 0) goNext();
    else goPrev();
    onUserSwipe?.();
  };

  return (
    <div
      ref={carouselRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence initial={false}>
        <Motion.div
          key={index}
          initial={{ opacity: 0, x: direction * (isCompact ? 30 : 60) }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * (isCompact ? -30 : -60) }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          drag={hasMultiple ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          className="absolute inset-0"
        >
          <ProjectImage src={images[index]} alt={alt} category={category} />
        </Motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 pointer-events-none" />

      {hasMultiple && (
        <>
          <Motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goPrev}
            aria-label="Previous image"
            className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/80 transition-colors z-10 ${
              isCompact ? "p-1.5" : "p-2.5"
            }`}
          >
            <ChevronLeft className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
          </Motion.button>

          <Motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goNext}
            aria-label="Next image"
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/80 transition-colors z-10 ${
              isCompact ? "p-1.5" : "p-2.5"
            }`}
          >
            <ChevronRight className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
          </Motion.button>
        </>
      )}

      {hasMultiple && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 flex items-center ${
            isCompact ? "bottom-2 gap-1" : "bottom-20 sm:bottom-24 gap-2"
          }`}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={isCompact ? "p-0.5" : "p-1"}
            >
              <div
                style={{
                  width:
                    i === index ? (isCompact ? 14 : 22) : isCompact ? 4 : 6,
                  opacity: i === index ? 1 : 0.5,
                  transition: "width 0.25s, opacity 0.25s",
                }}
                className={`h-1.5 rounded-full ${
                  i === index ? "bg-primary" : "bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {hasMultiple && !isCompact && (
        <div className="absolute top-3 right-14 z-20 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
