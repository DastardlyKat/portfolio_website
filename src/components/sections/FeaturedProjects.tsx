import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <span className="eyebrow">Selected Work</span>
          <AnimatedText
            as="h2"
            text="A few things I've built."
            className="mt-3 font-display text-3xl text-ink md:text-5xl"
          />
        </div>
        <div className="hidden md:block">
          <MagneticButton href="/projects">All Projects</MagneticButton>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} index={i} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
