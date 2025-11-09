import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, as: Component = 'span', className = '', allowOverflow = false, }) => {
  const textRef = useRef();

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { y: '100%', opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 95%', 
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <span className={`relative inline-block ${allowOverflow ? '' : 'overflow-hidden'}`}>
      <Component ref={textRef} className={`inline-block translate-y-full ${className}`}>
        {children}
      </Component>
    </span>
  );
};

export default TextReveal;
