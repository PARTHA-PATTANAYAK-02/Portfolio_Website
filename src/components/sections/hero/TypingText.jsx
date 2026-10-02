import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";

export default function TypingText({
  words,
  typeSpeed = 75,
  deleteSpeed = 40,
  pauseTime = 1600,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reserve space using the longest word (invisible)
  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const current = words[index];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((p) => (p + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.substring(0, text.length - 1)
              : current.substring(0, text.length + 1),
          );
        },
        isDeleting ? deleteSpeed : typeSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      {/* Invisible placeholder — reserves width & height */}
      <span className="invisible gradient-text">{longest}</span>

      {/* Real animated text — absolutely positioned over placeholder */}
      <span className="absolute left-0 top-0 flex items-center h-full">
        <span className="gradient-text">{text}</span>
        <Motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[3px] h-[0.9em] ml-1 bg-primary rounded-sm"
        />
      </span>
    </span>
  );
}
