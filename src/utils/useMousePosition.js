import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [hoveredElement, setHoveredElement] = useState(null);

  const updateMousePosition = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setHoveredElement(e.target);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return { ...mousePosition, hoveredElement };
};

export default useMousePosition;
