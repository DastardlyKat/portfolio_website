'use client';

import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  density?: number; // particles per 20,000px^2, roughly
  color?: string; // rgb triplet e.g. "110,86,207"
  maxDistance?: number; // px, connect lines under this distance
  interactive?: boolean; // particles react to mouse
};

// Lightweight canvas particle constellation for an ambient, premium
// hero background. Pure canvas (no React re-renders per frame), pauses
// automatically for prefers-reduced-motion and while the tab is hidden,
// and cleans up on unmount.
export function ParticleField({
  className = '',
  density = 1,
  color = '110,86,207',
  maxDistance = 140,
  interactive = true
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId: number;
    let resizeTimeout: ReturnType<typeof setTimeout>;
    let mouse = { x: -9999, y: -9999 };
    let paused = false;

    // Safety cap so very large / multi-monitor viewports (or an
    // accidentally unbounded container) can't blow the particle count
    // — and therefore the O(n^2) connection check below — way past
    // what's needed for the visual effect.
    const MAX_PARTICLES = 220;
    const maxDistanceSq = maxDistance * maxDistance;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        MAX_PARTICLES,
        Math.round((width * height) / (20000 / density))
      );
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6
      }));
    }

    function scheduleResize() {
      // Coalesce rapid resize events (window drag, orientation change)
      // into a single rebuild instead of re-seeding particles on every
      // intermediate frame.
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onVisibilityChange() {
      paused = document.hidden;
      if (!paused && !reduced) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(step);
      }
    }

    function step() {
      if (paused) return;

      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const force = (90 - dist) / 90;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color}, 0.55)`;
        ctx!.fill();
      }

      // Squared-distance culling first — sqrt() is only computed for
      // the pairs that are actually close enough to draw a line, not
      // for every single pair every frame.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${color}, ${0.12 * (1 - dist / maxDistance)})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', scheduleResize);
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (interactive) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    if (reduced) {
      // Draw a single static frame instead of animating continuously.
      step();
      cancelAnimationFrame(rafId!);
    } else {
      paused = document.hidden;
      if (!paused) rafId = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', scheduleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [density, color, maxDistance, interactive]);

  return <canvas ref={canvasRef} className={className} />;
}
