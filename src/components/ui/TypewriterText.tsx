'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
  onComplete?: () => void;
  as?: 'h1' | 'h2' | 'p';
};

// Types the text out character-by-character with a blinking cursor.
// Falls back to showing the full text instantly if the user prefers
// reduced motion.
export function TypewriterText({
  text,
  className = '',
  startDelay = 300,
  speed = 45,
  onComplete,
  as = 'h1'
}: Props) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const Tag = as;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplayed(text);
      setDone(true);
      onComplete?.();
      return;
    }

    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startTimer = setTimeout(function type() {
      timeout = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timeout);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag className={className}>
      {displayed}
      <span
        className={`ml-1 inline-block h-[0.85em] w-[0.5ch] translate-y-[0.08em] bg-accent align-middle ${
          done ? 'animate-pulse' : ''
        }`}
      />
    </Tag>
  );
}
