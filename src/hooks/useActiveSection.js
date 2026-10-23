import { useEffect, useState } from "react";

export function useActiveSection(activeIds) {
  const [active, setActive] = useState(activeIds[0] ?? "home");

  useEffect(() => {
    let frame = null;

    const updateActiveSection = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(() => {
        frame = null;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // At very top of page
        if (scrollY < 120) {
          setActive(activeIds[0] ?? "home");
          return;
        }

        // At very bottom of page
        if (scrollY + windowHeight >= docHeight - 80 && activeIds.length > 0) {
          setActive(activeIds[activeIds.length - 1]);
          return;
        }

        // Focal line is ~36% from the top of the viewport (just below header)
        const focalLine = windowHeight * 0.36;
        let currentId = null;

        for (const id of activeIds) {
          const section = document.getElementById(id);
          if (!section) continue;

          const rect = section.getBoundingClientRect();
          // Check if this section encloses the focal line
          if (rect.top <= focalLine && rect.bottom >= focalLine) {
            currentId = id;
            break;
          }
        }

        // If not directly enclosing (e.g. between dividers), pick closest visible section
        if (!currentId) {
          let minDistance = Infinity;
          for (const id of activeIds) {
            const section = document.getElementById(id);
            if (!section) continue;
            const rect = section.getBoundingClientRect();
            const dist = Math.abs(rect.top - focalLine);
            if (dist < minDistance && rect.top <= windowHeight * 0.75) {
              minDistance = dist;
              currentId = id;
            }
          }
        }

        if (currentId) {
          setActive((curr) => (curr === currentId ? curr : currentId));
        }
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
