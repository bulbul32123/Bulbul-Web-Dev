import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function Curve({ onComplete }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        if (onComplete) onComplete();
      },
    });

    tl.to("#curveOverlay", {
      duration: 0.7,
      scaleY: 1,
      transformOrigin: "bottom center",
      ease: "power2.inOut",
    }).to("#curveOverlay", {
      duration: 0.7,
      scaleY: 0,
      transformOrigin: "top center",
      delay: 0.3,
      ease: "power2.inOut",
    });
  }, [onComplete]);

  return (
    <div
      id="curveOverlay"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        transform: "scaleY(0)",
        transformOrigin: "bottom center",
        zIndex: 9999,
        pointerEvents: isAnimating ? "auto" : "none",
      }}
    />
  );
}
