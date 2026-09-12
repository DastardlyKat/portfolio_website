'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

// A button that gently pulls toward the cursor when hovered.
// Cheap, high-impact detail — use for primary CTAs only, not everywhere.
//
// Position is driven through Framer motion values (the same pattern as
// Cursor.tsx) instead of React state: mousemove now updates x/y directly
// on the compositor thread and never triggers a component re-render.
// The old version called setState on every pixel of mouse movement,
// which re-ran React's reconciliation for this whole subtree dozens of
// times a second while hovering — the main source of on-hover jank.
export function MagneticButton({ children, href, onClick, className, disabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.2 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3',
        'font-mono text-sm uppercase tracking-wide hover:border-accent hover:text-accent',
        'transition-colors cursor-pointer select-none',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }
  return content;
}
