// hooks/useTextReveal.js
import { useEffect } from 'react';
import gsap from 'gsap';
// Its for Text animations

export const useTextReveal = (targetRef, options = {}) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const defaultOptions = {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.1,
    };

    gsap.fromTo(
      targetRef.current.children || targetRef.current,
      { y: options.fromY || defaultOptions.y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: options.duration || defaultOptions.duration,
        ease: options.ease || defaultOptions.ease,
        stagger: options.stagger || defaultOptions.stagger,
      }
    );
  }, []);
};
