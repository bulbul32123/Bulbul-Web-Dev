// context/TransitionContext.js
import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children, navigate }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const startTransition = (to, currentPath) => {
    if (to === currentPath) return; // 🚫 Prevent transition if same route

    setIsAnimating(true);

    // Wait for animation duration, then navigate
    setTimeout(() => {
      navigate(to);
      setIsAnimating(false);
    }, 1400); // Match your GSAP total duration (0.7 in + 0.3 delay + 0.7 out)
  };

  return (
    <TransitionContext.Provider value={{ isAnimating, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
