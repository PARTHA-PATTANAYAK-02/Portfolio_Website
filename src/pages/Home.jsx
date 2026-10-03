import Hero from "../components/sections/hero/Hero";
import About from "../components/sections/about/About";
import Skills from "../components/sections/skills/Skills";
import Projects from "../components/sections/projects/Projects";
import Journey from "../components/sections/journey/Journey";
import Certifications from "../components/sections/certifications/Certifications";
import Contact from "../components/sections/contact/Contact";
import SectionDivider from "../components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <div id="home" className="scroll-mt-20">
        <Hero />
      </div>

      <SectionDivider label="About" />
      <div id="about" className="scroll-mt-20">
        <About />
      </div>

      <SectionDivider label="Skills" />
      <div id="skills" className="scroll-mt-20">
        <Skills />
      </div>

      <SectionDivider label="Projects" />
      <div id="projects" className="scroll-mt-20">
        <Projects />
      </div>

      <SectionDivider label="Journey" />
      <div id="journey" className="scroll-mt-20">
        <Journey />
      </div>

      <SectionDivider label="Certifications" />
      <div id="certifications" className="scroll-mt-20">
        <Certifications />
      </div>

      <SectionDivider label="Contact" />
      <div id="contact" className="scroll-mt-20">
        <Contact />
      </div>
    </>
  );
}
