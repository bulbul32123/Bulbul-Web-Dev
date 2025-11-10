import React from "react";
import About from "../sections/About";
import Hero from "../sections/Hero";
import TechStacks from "../sections/TechStacks";
import Projects from "../sections/Projects";
import Game from "../sections/Game";
import Services from "../sections/Service/Service";
import { TestimonialsSection } from "../sections/Testimonials/Testimonials";
import Footer from "../components/Footer";
import { useEasterEgg } from "../context/EasterEggContext"
import Menu from "../components/Menu";

export default function Home() {
  const { setIsMenuOpen, isMenuOpen, handleMenuOpen } = useEasterEgg()

  return (
    <div className="">
      <Menu isMenuOpen={isMenuOpen} handleMenuOpen={handleMenuOpen} setIsMenuOpen={setIsMenuOpen} />

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