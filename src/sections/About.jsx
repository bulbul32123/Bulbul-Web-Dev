import React, { useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutText from '../components/about/AboutText';
import GridBox from '../components/about/GridBox';
import { GRID_BOX_DATA } from '../components/about/gridData';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const titleFrontRef = useRef(null);
  const gridBgRef = useRef(null);

  const gridBoxRefs = useRef([]);
  const numberRefs = useRef([]);
  const plusRefs = useRef([]);

  const [showGridBg, setShowGridBg] = useState(false);

  const animateCountdown = (element, targetNumber) => {
    gsap.fromTo(element,
      { textContent: 0 },
      {
        textContent: targetNumber,
        duration: 1.2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function () {
          element.textContent = Math.floor(this.targets()[0].textContent);
        }
      }
    );
  };

  const animatePlus = (element, delay = 0) => {
    gsap.fromTo(element,
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: delay
      }
    );
  };

  const handleMouseEnter = (index) => {
    const numberEl = numberRefs.current[index];
    const plusEl = plusRefs.current[index];

    if (numberEl) {
      animateCountdown(numberEl, GRID_BOX_DATA[index].number);
    }
    if (plusEl) {
      animatePlus(plusEl, 0.8); 
    }
  };

  const handleMouseLeave = (index) => {
    const plusEl = plusRefs.current[index];

    if (plusEl) {
      animatePlus(plusEl, 0.2); 
    }
  };

  useEffect(() => {
    if (!boxRef.current || !sectionRef.current || !textRef.current) return;

    const timer = setTimeout(() => {
      setShowGridBg(true);
      if (gridBgRef.current) {
        gsap.fromTo(
          gridBgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
      }
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 44.1%',
            end: '+=100%',
            scrub: true,
            pin: true,
            pinSpacing: true, // Ensure proper spacing after pin
            anticipatePin: 1,
            refreshPriority: 1 
          },
        });

        tl.to(boxRef.current, {
          width: '100%',
          opacity: "1",
          height: '110vh',
          borderRadius: '0',
          ease: 'none',
        });

        if (titleFrontRef.current) {
          tl.fromTo(
            titleFrontRef.current,
            { width: '0%' },
            { width: '100%', ease: 'none' },
            '-=0.1'
          );
        }

        const paraSplit1 = new SplitType(para1Ref.current, { types: 'words' });
        const textTl1 = gsap.timeline({ paused: true });
        textTl1.from(paraSplit1.words, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          ease: 'power3.out',
          duration: 0.3,
        });
        tl.add(textTl1.play());

        const paraSplit2 = new SplitType(para2Ref.current, { types: 'words' });
        const textTl2 = gsap.timeline({ paused: true });
        textTl2.from(paraSplit2.words, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          ease: 'power3.out',
          duration: 0.3,
        });
        tl.add(textTl2.play(), '+=0.2');

        tl.fromTo(
          '.up',
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          '+=0.5'
        );
        gsap.utils.toArray('.grid-box').forEach((box, i) => {
          gsap.fromTo(
            box,
            {
              opacity: 0,
              rotate: 8,
              skewY: 8,
              y: 80,
              scale: 0.95,
            },
            {
              opacity: 1,
              rotate: 0,
              skewY: 0,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: box,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                refreshPriority: 0 // Lower priority
              },
              delay: i * 0.1,
            }
          );
        });

        // Cleanup function to revert SplitType
        return () => {
          paraSplit1.revert();
          paraSplit2.revert();
        };
      }, sectionRef);

      // Return cleanup function
      return () => {
        ctx.revert();
      };
    }, 1000); // wait 1 second for Hero to fully play

    return () => clearTimeout(timer);
  }, []);

  // Refresh ScrollTrigger when component mounts/unmounts
  useEffect(() => {
    return () => {
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <div className="w-full h-full -mt-28 xl:-mt-20 relative">
        {/* Pinned Section */}
        <AboutText sectionRef={sectionRef} boxRef={boxRef} textRef={textRef} titleRef={titleRef} titleFrontRef={titleFrontRef} para1Ref={para1Ref} para2Ref={para2Ref} />
      </div>

      <GridBox
        gridBgRef={gridBgRef}
        showGridBg={showGridBg}
        gridBoxRefs={gridBoxRefs}
        numberRefs={numberRefs}
        plusRefs={plusRefs}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </>
  );
}