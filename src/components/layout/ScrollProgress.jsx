import {
  motion as Motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <Motion.div
      style={{ scaleX, opacity }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] rounded-r-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]"
    />
  );
}
