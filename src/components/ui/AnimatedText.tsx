'use client';

import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
};

// Splits text into words and reveals them with a staggered upward slide.
// Reuse this for any headline that should feel intentional on load/scroll.
export function AnimatedText({ text, className = '', delay = 0, as = 'h1' }: Props) {
  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
