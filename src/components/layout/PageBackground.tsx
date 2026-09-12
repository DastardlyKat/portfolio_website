'use client';

import { usePathname } from 'next/navigation';
import { GradientGlow } from '@/components/ui/GradientGlow';
import { ParticleField } from '@/components/ui/ParticleField';

// Routes that already render their own page-scoped ParticleField +
// GradientGlow (Home/Hero, About, Projects, Contact). Rendering this
// global ambient layer underneath those too meant two full canvases
// running independent O(n^2) particle physics every frame, forever,
// on every page — the single biggest cost in the whole animation
// stack. This component now only supplies the ambient layer for
// routes that don't bring their own (e.g. individual project pages),
// while every route still gets the shared solid backdrop color.
const ROUTES_WITH_OWN_BACKGROUND = ['/', '/about', '/projects', '/contact'];

export function PageBackground() {
  const pathname = usePathname();
  const hasOwnBackground = ROUTES_WITH_OWN_BACKGROUND.includes(pathname);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      {!hasOwnBackground && (
        <>
          <GradientGlow />
          <ParticleField
            className="pointer-events-none absolute inset-0 opacity-70"
            color="110,86,207"
            density={0.55}
            maxDistance={120}
            interactive={false}
          />
        </>
      )}
    </div>
  );
}
