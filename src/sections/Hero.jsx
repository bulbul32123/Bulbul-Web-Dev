import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import useSound from 'use-sound';
import eggSound from '/sounds/succes.MP3';
import clickSound from '/sounds/click.MP3';
import { useEasterEgg } from '../context/EasterEggContext';

import TextReveal from '../components/animations/TextReveal';
import ParagraphReveal from '../components/animations/ParagraphReveal';
import Celebration from '../components/Celebration';
import ResumeButton from '../components/ResumeButton';

gsap.registerPlugin(TextPlugin);

const words = ["Interfaces", "Products", "Solutions"];

export default function Hero() {
  const dashRef = useRef(null);
  const [isResumeVisible, setIsResumeVisible] = useState(false);
  const { addEasterEgg } = useEasterEgg();
  const [show, setShow] = useState(false);
  const [play] = useSound(eggSound, { volume: 0.6, interrupt: true });

  const [playClick] = useSound(clickSound, { volume: 0.5, interrupt: true });
  const [wordIndex, setWordIndex] = useState(0);

  const handleDoubleClick = () => {
    const nextIndex = (wordIndex + 1) % words.length;
    setWordIndex(nextIndex);
    playClick();
    setShow(true)
    play()
    addEasterEgg("egg-cycle-word", `Discovered Hidden Meaning`);
  };


  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        isResumeVisible &&
        dashRef.current &&
        !dashRef.current.contains(event.target)
      ) {
        const tl = gsap.timeline();

        tl.to(dashRef.current, {
          scale: 0.6,
          duration: 0.2,
          ease: "power2.out",
        }).to(dashRef.current, {
          text: " ",
          scale: 1,
          duration: 0.3,
          color: "#ffffff",
          ease: "power2.out",
        });

        setIsResumeVisible(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isResumeVisible]);

  return (
    <>
      <Celebration show={show} />
      <div className="flex flex-col justify-center items-center h-screen w-full text-center" name={'home'}>
        <h1 className="md:text-[4rem] xl:text-[5rem] text-5xl sm:text-6xl font-bold mb-5 uppercase md:px-40 px-5 flex flex-wrap justify-center gap-x-2">
          <TextReveal>I Build</TextReveal>

          <TextReveal>
            <span
              className="bg-[#caef96]  text-black  px-3 select-none rounded-2xl cursor-pointer"
              onClick={handleDoubleClick}
            >
              {words[wordIndex]}
            </span>
          </TextReveal>

          <TextReveal>That Don’t Just</TextReveal>
          <TextReveal>Impress</TextReveal>
<div className="z-20">

          <ResumeButton dashRef={dashRef} playClick={playClick} setIsResumeVisible={setIsResumeVisible} isResumeVisible={isResumeVisible} play={play} addEasterEgg={addEasterEgg} />

</div>
          <TextReveal>They</TextReveal>
          <TextReveal>
            <span className="highlighted-text text-black ">Perform</span>
          </TextReveal>
        </h1>

        <ParagraphReveal
          text={`For SaaS innovators, e‑commerce rebels, and bold entrepreneurs — I transform ideas into seamless, interactive websites that captivate, convert, and evolve. If you’re looking for more than a page — you’re in the right place.`}
          delay={4}
          duration={6}
          stagger={0.004}
          className="md:w-[37rem] sm:w-[34rem] max-sm:px-10 2xl:text-base pb-5 text-sm text-gray-700 dark:text-gray-300 text-center"
        />
      </div>
    </>
  );
}
