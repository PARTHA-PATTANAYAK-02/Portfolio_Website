import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionDivider from "../components/ui/SectionDivider";

const Hero = lazy(() => import("../components/sections/hero/Hero"));
const About = lazy(() => import("../components/sections/about/About"));
const Skills = lazy(() => import("../components/sections/skills/Skills"));
const Projects = lazy(() => import("../components/sections/projects/Projects"));
const Journey = lazy(() => import("../components/sections/journey/Journey"));
const Certifications = lazy(
  () => import("../components/sections/certifications/Certifications"),
);
const Contact = lazy(() => import("../components/sections/contact/Contact"));

function DeferredSection({ id, component: Component, minHeight = "40rem" }) {
  const sectionRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={sectionRef}
      className="scroll-mt-20"
      style={{ minHeight: isNearViewport ? undefined : minHeight }}
    >
      {isNearViewport && (
        <Suspense fallback={<div aria-hidden style={{ minHeight }} />}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = decodeURIComponent(location.hash.slice(1));
    if (!sectionId) return;

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    });
  }, [location.hash]);

  return (
    <>
      <div id="home" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>
      </div>

      <SectionDivider label="About" />
      <DeferredSection id="about" component={About} minHeight="52rem" />

      <SectionDivider label="Skills" />
      <DeferredSection id="skills" component={Skills} minHeight="44rem" />

      <SectionDivider label="Projects" />
      <DeferredSection id="projects" component={Projects} minHeight="48rem" />

      <SectionDivider label="Journey" />
      <DeferredSection id="journey" component={Journey} minHeight="40rem" />

      <SectionDivider label="Certifications" />
      <DeferredSection
        id="certifications"
        component={Certifications}
        minHeight="40rem"
      />

      <SectionDivider label="Contact" />
      <DeferredSection id="contact" component={Contact} minHeight="44rem" />
    </>
  );
}
