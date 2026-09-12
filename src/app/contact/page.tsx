'use client';

import { motion } from 'framer-motion';
import { Clock3, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { GradientGlow } from '@/components/ui/GradientGlow';
import { ParticleField } from '@/components/ui/ParticleField';

const links = [
  { label: 'swaksharbora@gmail.com', href: 'mailto:swaksharbora@gmail.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/swakshar-bora-1b96b7275/', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/DastardlyKat', icon: Github }
];

const facts = [
  { label: 'Location', value: 'Assam, India', icon: MapPin },
  { label: 'Response time', value: 'Within 1–2 days', icon: Clock3 }
];

export default function Contact() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-32 md:px-12">
      {/* Local ambient background — same pattern as Home/Projects/About,
          so this page doesn't depend on the global fixed layer alone. */}
      <GradientGlow />
      <ParticleField
        className="absolute inset-0 opacity-60"
        color="110,86,207"
        density={0.7}
        maxDistance={120}
        interactive={false}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        {/* Left: primary content — stays left-aligned, unchanged in spirit */}
        <div>
          <span className="eyebrow">Contact</span>
          <AnimatedText
            as="h1"
            text="Let's build something."
            className="mt-4 font-display text-4xl text-ink md:text-6xl"
          />

          <RevealOnScroll className="mt-6 max-w-md text-muted">
            <p>The fastest way to reach me is email. I try to reply within a day or two.</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="mt-10 flex flex-wrap gap-4">
            {links.map((l) => (
              <MagneticButton key={l.label} href={l.href}>
                <l.icon className="h-4 w-4" />
                {l.label}
              </MagneticButton>
            ))}
          </RevealOnScroll>
        </div>

        {/* Right: status / quick-facts panel — fills the empty space
            instead of centering the whole layout, and keeps a bit of
            motion (orbiting rings + pulsing status dot) so it doesn't
            read as a static filler block. */}
        <RevealOnScroll delay={0.15}>
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-ink/10 bg-surface/40 p-8 backdrop-blur-sm">
            <OrbitRings />

            <div className="relative flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent2 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent2" />
              </span>
              <span className="font-mono text-xs uppercase tracking-wide text-muted">
                Available for work
              </span>
            </div>

            <p className="relative mt-5 font-display text-xl text-ink">
              Open to new roles and freelance projects.
            </p>

            <div className="relative mt-8 flex flex-col gap-4 border-t border-ink/10 pt-6">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <f.icon className="h-4 w-4 text-accent" />
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">
                      {f.label}
                    </p>
                    <p className="text-sm text-ink">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function OrbitRings() {
  return (
    <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 opacity-40">
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-5 rounded-full border border-accent2/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}