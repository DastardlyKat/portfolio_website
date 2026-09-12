'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Custom cursor dot with spring-based follow and a scale-up on
// interactive elements. Hidden automatically on touch devices via CSS.
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    function move(e: PointerEvent) {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    }
    function over(e: PointerEvent) {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest('a, button, [data-cursor-hover]'));
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-5 w-5 rounded-full border border-accent md:block"
      style={{ x: springX, y: springY }}
      animate={{ scale: hovering ? 2.2 : 1, backgroundColor: hovering ? 'rgba(110,86,207,0.15)' : 'transparent' }}
      transition={{ duration: 0.2 }}
    />
  );
}
