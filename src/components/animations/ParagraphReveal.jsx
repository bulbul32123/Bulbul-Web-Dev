import React from 'react';
import TextReveal from './TextReveal';

export default function ParagraphReveal({
  text,
  duration = 0.8,
  delay = 0,
  stagger = 0.06, // <== new prop
  className,
}) {
  const words = text.split(' ').map((word, i) => (
    <TextReveal
      key={i}
      duration={duration}
      delay={delay + i * stagger} // ⬅ stagger each word based on index
      className="mr-1 inline-block translate-y-full"
    >
      {word}
    </TextReveal>
  ));

  return (
    <p className={`${className}`}>
      {words}
    </p>
  );
}
