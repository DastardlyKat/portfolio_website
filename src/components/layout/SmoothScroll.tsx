'use client';

import { useLenis } from '@/hooks/useLenis';

// Tiny client component whose only job is to invoke the smooth-scroll
// hook once at the root, keeping layout.tsx a server component otherwise.
export function SmoothScroll() {
  useLenis();
  return null;
}
