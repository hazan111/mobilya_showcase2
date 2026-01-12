import React from 'react';
import { useScroll } from '../../hooks/useScroll';

function ScrollProgress() {
  const { scrollProgress } = useScroll();

  return (
    <div
      className="scroll-progress"
      style={{ width: `${scrollProgress}%` }}
    ></div>
  );
}

export default ScrollProgress;
