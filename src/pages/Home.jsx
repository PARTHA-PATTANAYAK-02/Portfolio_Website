import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionDivider from "../components/ui/SectionDivider";

import Hero from "../components/sections/hero/Hero";
import About from "../components/sections/about/About";
import Skills from "../components/sections/skills/Skills";
import Projects from "../components/sections/projects/Projects";
import Journey from "../components/sections/journey/Journey";
import Certifications from "../components/sections/certifications/Certifications";
import Contact from "../components/sections/contact/Contact";

export default function Home({ onReady }) {
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
        <Hero onReady={onReady} />
      </div>

      <SectionDivider label="About" />
      <About />

      <SectionDivider label="Skills" />
      <Skills />

      <SectionDivider label="Projects" />
      <Projects />

      <SectionDivider label="Journey" />
      <Journey />

      <SectionDivider label="Certifications" />
      <Certifications />

      <SectionDivider label="Contact" />
      <Contact />
    </>
  );
}
