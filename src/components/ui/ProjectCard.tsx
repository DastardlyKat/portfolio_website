'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  function handleEnter() {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  }

  function handleLeave() {
    setHovering(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  return (
    <Link href={`/projects/${project.slug}`} data-cursor-hover className="block h-full">
      <motion.div
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {project.previewVideo && (
            <motion.video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovering ? 1 : 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />

          {project.previewVideo && (
            <span
              className={`absolute right-3 top-3 rounded-full border border-ink/20 bg-bg/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted backdrop-blur-sm transition-opacity duration-300 ${
                hovering ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Hover to preview
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{String(index + 1).padStart(2, '0')} — {project.year}</span>
            <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
          </div>
          <h3 className="mt-2 font-display text-2xl text-ink">{project.title}</h3>
          <p className="mt-1 text-sm text-muted">{project.description}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[11px] text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}