import { skills } from '@/lib/projects';

export function SkillsMarquee() {
  const items = [...skills, ...skills];

  return (
    <div className="overflow-hidden border-y border-ink/10 py-6">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((skill, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-wide text-muted">
            {skill} <span className="text-accent">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
