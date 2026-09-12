'use client';

import { motion } from 'framer-motion';

// Two soft, slow-drifting blurred blobs for ambient depth behind the
// particle field. Pure CSS/transform animation, cheap to run.
export function GradientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[110px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-[360px] w-[360px] rounded-full bg-accent2/20 blur-[110px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
