import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <section className="min-h-screen px-6 pb-24 pt-36 md:px-12">
      <Link
        href="/projects"
        data-cursor-hover
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted hover:text-accent"
      >
        <ArrowLeft className="h-3 w-3" /> Back to Projects
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">{project.year} — {project.role}</span>
          <AnimatedText
            as="h1"
            text={project.title}
            className="mt-3 font-display text-4xl text-ink md:text-6xl"
          />
        </div>
        <div className="flex gap-3">
          {project.liveUrl && <MagneticButton href={project.liveUrl}>Live Site</MagneticButton>}
          {project.githubUrl && <MagneticButton href={project.githubUrl}>GitHub</MagneticButton>}
        </div>
      </div>

      <RevealOnScroll className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-ink/10">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </RevealOnScroll>

      <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
        <RevealOnScroll>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{project.longDescription}</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <span className="eyebrow">Stack</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-ink/10 px-3 py-1 font-mono text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}