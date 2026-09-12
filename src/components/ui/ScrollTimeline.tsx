'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export type TimelineItem = {
  year: string;
  title: string;
  description?: string;
};

type Props = {
  items: TimelineItem[];
};

// Vertical, alternating timeline with a center line that visually "fills
// in" with scroll progress — same idea as the year-dot reference design,
// adapted to the dark theme. Kept as a standalone component (rather than
// baked into the About page) so it can be dropped onto its own route
// later without a rewrite.
export function ScrollTimeline({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4']
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 70,
    damping: 22,
    mass: 0.4
  });

  return (
    <div ref={containerRef} className="relative py-2">
      {/* static track */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/10" />
      {/* progress fill that grows as the section scrolls into view */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent to-accent2 shadow-[0_0_14px_2px_rgba(110,86,207,0.55)]"
      />

      <div className="flex flex-col gap-10 md:gap-14">
        {items.map((item, i) => {
          const onRight = i % 2 === 1;
          return (
            <div
              key={`${item.year}-${i}`}
              className="grid grid-cols-[1fr_auto_1fr] items-start gap-3 md:gap-8"
            >
              <div>{!onRight && <TimelineCard item={item} align="right" />}</div>
              <TimelineDot index={i} />
              <div>{onRight && <TimelineCard item={item} align="left" />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineDot({ index }: { index: number }) {
  return (
    <motion.div
      className="relative mt-1.5 flex h-3 w-3 items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: (index % 6) * 0.03 }}
    >
      <span
        className="absolute h-full w-full animate-ping rounded-full bg-accent/40"
        style={{ animationDuration: '2.4s' }}
      />
      <span className="relative h-3 w-3 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(110,86,207,0.7)]" />
    </motion.div>
  );
}

function TimelineCard({ item, align }: { item: TimelineItem; align: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'right' ? 24 : -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={align === 'right' ? 'text-right' : 'text-left'}
    >
      <span className="inline-block rounded-full border border-ink/10 bg-surface px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-accent">
        {item.year}
      </span>
      <p className="mt-2 font-display text-lg text-ink md:text-xl">{item.title}</p>
      {item.description && <p className="mt-1 text-sm text-muted">{item.description}</p>}
    </motion.div>
  );
}
