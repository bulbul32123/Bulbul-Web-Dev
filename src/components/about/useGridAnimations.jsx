// hooks/useGridAnimations.js
import { useCallback } from 'react';
import gsap from 'gsap';

export const useGridAnimations = () => {
  const animateCountdown = useCallback((element, targetNumber) => {
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
  }, []);

  const animatePlus = useCallback((element, delay = 0) => {
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
  }, []);

  const handleMouseEnter = useCallback((index, numberRefs, plusRefs, gridBoxData) => {
    const numberEl = numberRefs.current[index];
    const plusEl = plusRefs.current[index];

    if (numberEl) {
      animateCountdown(numberEl, gridBoxData[index].number);
    }
    if (plusEl) {
      animatePlus(plusEl, 0.8);
    }
  }, [animateCountdown, animatePlus]);

  const handleMouseLeave = useCallback((index, plusRefs) => {
    const plusEl = plusRefs.current[index];

    if (plusEl) {
      animatePlus(plusEl, 0.2);
    }
  }, [animatePlus]);

  return { handleMouseEnter, handleMouseLeave };
};
