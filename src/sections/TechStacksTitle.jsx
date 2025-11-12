import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TechStacksTitle() {
  const titleRef = useRef(null);
  const titleFrontRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleFrontRef.current) {
        gsap.fromTo(
          titleFrontRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-10 pl-5">
      <h1
        ref={titleRef}
        className="text-6xl md:text-9xl font-bold uppercase relative inline-block overflow-hidden"
      >
        <span className="dark:text-gray-600 text-gray-700 opacity-0">
          tech stacks
        </span>

        <span
          ref={titleFrontRef}
          className="absolute top-0 left-0 dark:text-black text-white whitespace-nowrap overflow-hidden"
          
          style={{ width: "0%" }}
        >
          tech stacks
        </span>
      </h1>
    </div>
  );
}
