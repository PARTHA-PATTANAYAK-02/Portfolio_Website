import { useEffect, useState } from "react";

export function useActiveSection(activeIds) {
  const [active, setActive] = useState(activeIds[0] ?? "home");

  useEffect(() => {
    if (!activeIds || activeIds.length === 0) return;

    const visibleMap = new Map();

    const handleScrollEdge = () => {
      const scrollY = window.scrollY;
      if (scrollY < 120) {
        setActive((curr) => (curr === activeIds[0] ? curr : activeIds[0]));
        return;
      }
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        const lastId = activeIds[activeIds.length - 1];
        setActive((curr) => (curr === lastId ? curr : lastId));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.intersectionRatio);
        });

        const scrollY = window.scrollY;
        if (scrollY < 120) {
          setActive((curr) => (curr === activeIds[0] ? curr : activeIds[0]));
          return;
        }
        if (
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 80
        ) {
          const lastId = activeIds[activeIds.length - 1];
          setActive((curr) => (curr === lastId ? curr : lastId));
          return;
        }

        let bestId = null;
        let bestRatio = 0;
        for (const id of activeIds) {
          const ratio = visibleMap.get(id) || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId && bestRatio > 0.05) {
          setActive((curr) => (curr === bestId ? curr : bestId));
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    let retryTimer = null;
    const attachObservers = () => {
      let count = 0;
      activeIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          count++;
        }
      });
      return count;
    };

    if (attachObservers() < activeIds.length) {
      retryTimer = setTimeout(attachObservers, 400);
    }

    handleScrollEdge();
    window.addEventListener("scroll", handleScrollEdge, { passive: true });

    return () => {
      if (retryTimer) clearTimeout(retryTimer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollEdge);
    };
  }, [activeIds]);

  return [active, setActive];
}
