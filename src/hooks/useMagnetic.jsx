import { useEffect, useRef } from 'react';

export function useMagnetic(strength = 20) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const bounding = element.getBoundingClientRect();
      const button = element.querySelector('a') || element.querySelector('button');
      
      if (!button) return;

      const newX = (e.clientX - bounding.left) / element.offsetWidth - 0.5;
      const newY = (e.clientY - bounding.top) / element.offsetHeight - 0.5;

      button.style.transform = `translate(${newX * strength}px, ${newY * strength}px)`;
    };

    const handleMouseLeave = () => {
      const button = element.querySelector('a') || element.querySelector('button');
      if (button) {
        button.style.transform = 'translate(0px, 0px)';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
