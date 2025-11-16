import { createContext, useContext, useState } from "react";
const TransitionContext = createContext();

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children, navigate }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const startTransition = (to, currentPath) => {
    if (to === currentPath) return;

    setIsAnimating(true);
    setTimeout(() => {
      navigate(to);
      setIsAnimating(false);
    }, 1400);
  };

  return (
    <TransitionContext.Provider value={{ isAnimating, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
