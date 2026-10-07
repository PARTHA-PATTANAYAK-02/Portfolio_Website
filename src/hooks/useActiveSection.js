import { useEffect, useState } from "react";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "journey",
  "certifications",
  "contact",
];

export function useActiveSection(activeIds) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame = null;

    const updateActiveSection = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        frame = null;
        const activationLine = window.innerHeight * 0.38;
        let nextActive = activeIds[0] ?? "home";

        for (const id of SECTION_IDS) {
          const section = document.getElementById(id);
          if (
            section &&
            section.getBoundingClientRect().top <= activationLine &&
            activeIds.includes(id)
          ) {
            nextActive = id;
          }
        }

        const atPageBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2;
        if (atPageBottom && activeIds.length > 0) {
          nextActive = activeIds[activeIds.length - 1];
        }

        setActive((current) =>
          current === nextActive ? current : nextActive,
        );
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [activeIds]);

  return [active, setActive];
}
