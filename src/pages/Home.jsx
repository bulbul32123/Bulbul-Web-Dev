import React from "react";
import About from "../sections/About";
import Hero from "../sections/Hero";
import TechStacks from "../sections/TechStacks";
import Projects from "../sections/Projects";
import Game from "../sections/Game";
import Services from "../sections/Service/Service";
import { TestimonialsSection } from "../sections/Testimonials/Testimonials";
import Footer from "../components/Footer";

export default function Home() {

  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        <Hero />
        <div className="w-full h-full">
          <About />
          <TechStacks />
        </div>
        <div className="h-full w-full">
          <Projects />
        </div>
        <div className="h-full w-full relative">
          <Game />
          <Services />
          <TestimonialsSection />
          <Footer />
        </div>
      </div>
    </div>

  );
}