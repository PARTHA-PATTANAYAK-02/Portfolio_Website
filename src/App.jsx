import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Project from "./components/Project";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <>
      <Navbar />
      <Home />
      <Skills />
      <Project />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
