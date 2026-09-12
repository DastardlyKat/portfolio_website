import { Code2, Compass, Rocket, Sparkles } from 'lucide-react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { ScrollTimeline } from '@/components/ui/ScrollTimeline';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GradientGlow } from '@/components/ui/GradientGlow';
import { ParticleField } from '@/components/ui/ParticleField';

// Experience + education combined into one chronological line. If this
// list grows past ~6-7 entries, it's a good sign to split it out to its
// own /experience route — ScrollTimeline is already self-contained, so
// that move is just: new page, same component, same `items` shape.
const timeline = [
  {
    year: 'Jun, 2026 — Now',
    title: 'Embedded Systems Intern',
    description: 'SVR ROBOTICS — shipping product features end to end.'
  },
  //   {
  //   year: 'Jan 2026 - Jan, 2026',
  //   title: 'ML Intern',
  //   description: 'DUIET — focused on systems and human-computer interaction.'
  // },
  {
    year: 'Apr, 2025 — Sept, 2025',
    title: 'UI/UX Designer',
    description: 'Serve14 — Designed intuitive web and mobile interfaces using Figma.'
  },
  {
    year: 'Jun, 2025 - Jun,2025',
    title: 'IoT Intern',
    description: 'NIELIT — focused on systems and human-computer interaction.'
  },
  {
    year: '2023 - 2027',
    title: 'B.Tech Electronics & Communications Engineering',
    description: 'Tezpur University'
  }
];

const values = [
  {
    icon: Code2,
    title: 'Systems that hold up',
    description: "A power rail that browns out or a control loop that lags is worse than ugly code."
  },
  {
    icon: Compass,
    title: 'Product sense',
    description: 'Every technical decision gets weighed against what it does for the person using it.'
  },
  {
    icon: Sparkles,
    title: 'Craft in the details',
    description: 'Tendon tensions and sensor noise matter as much as micro-interactions, nobody notices until it fails.'
  },
  {
    icon: Rocket,
    title: 'Ship, then refine',
    description: "I'd rather learn from a real version in front of users than perfect one in a vacuum."
  }
];

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden pb-32">
      {/* Local ambient background for this page — now spans the whole
          section (not just the intro block) so it doesn't hard-cut partway
          down the page. Lower density since it's covering a much taller
          area than a single hero block. */}
      
      <ParticleField
        className="absolute inset-0 opacity-60"
        color="110,86,207"
        density={0.45}
        maxDistance={120}
        interactive={false}
      />
      <GradientGlow />

      <div className="relative z-10 px-6 pt-36 md:px-12">

        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">About</span>
          <AnimatedText
            as="h1"
            text="A bit about how I got here."
            className="mt-4 font-display text-4xl text-ink md:text-6xl"
          />
          <RevealOnScroll className="mt-8 space-y-4 text-muted">
            <p>
              I enjoy problems that make you choose between the elegant solution and the one 
              that actually survives contact with hardware. That’s kept me comfortable across 
              the full stack a project like that needs, firmware and control loops on one end, 
              FastAPI or Flask backends and React dashboards on the other. A robot nobody can 
              monitor or command isn’t really finished.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Values */}
      <div className="relative z-10 mx-auto mt-8 max-w-4xl px-6 md:px-12">
        <RevealOnScroll>
          <span className="eyebrow">What I care about</span>
        </RevealOnScroll>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <RevealOnScroll key={v.title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-ink/10 bg-surface/40 p-6 transition-colors hover:border-accent/40">
                <v.icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5" />
                <p className="mt-4 font-display text-lg text-ink">{v.title}</p>
                <p className="mt-2 text-sm text-muted">{v.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 mx-auto mt-24 max-w-3xl px-6 md:px-12">
        <RevealOnScroll>
          <span className="eyebrow">Experience &amp; education</span>
        </RevealOnScroll>
        <div className="mt-8">
          <ScrollTimeline items={timeline} />
        </div>
      </div>

      {/* Closing CTA */}
      <RevealOnScroll className="relative z-10 mx-auto mt-24 max-w-3xl border-t border-ink/10 px-6 pt-12 text-center md:px-12">
        <p className="font-display text-2xl text-ink md:text-3xl">
          Want to know more, or just want to say hi?
        </p>
        <div className="mt-6 flex justify-center">
          <MagneticButton href="/contact">Get in touch</MagneticButton>
        </div>
      </RevealOnScroll>
    </section>
  );
}