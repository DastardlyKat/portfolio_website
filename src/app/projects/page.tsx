import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { ParticleField } from '@/components/ui/ParticleField';
import { GradientGlow } from '@/components/ui/GradientGlow';

export default function Projects() {
  return (
    <section className="relative min-h-screen pb-24">
      <ParticleField
          className="absolute inset-0 opacity-70"
          color="110,86,207"
          density={0.8}
          maxDistance={120}
        />
        <GradientGlow />
      <div className="relative overflow-hidden px-6 pb-16 pt-36 md:px-12">
        
        <div className="relative z-10">
          <span className="eyebrow">All Work</span>
          <AnimatedText
            as="h1"
            text="Projects."
            className="mt-4 font-display text-4xl text-ink md:text-6xl"
          />
        </div>
      </div>

      <div className="grid gap-6 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-3">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard project={project} index={i} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}