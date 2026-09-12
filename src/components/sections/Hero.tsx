'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ParticleField } from '@/components/ui/ParticleField';
import { ArrowDown } from 'lucide-react';
import { GradientGlow } from '../ui/GradientGlow';

export function Hero() {
  // The rest of the hero content waits for the headline to finish typing
  // before it reveals, so the eye has one thing to focus on at a time.
  const [typed, setTyped] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12">
      {/* Extra, denser interactive layer on top of the global ambient
          background — gives the homepage a bit more presence on load
          without every other page having to render the heavier version. */}
      <ParticleField
        className="absolute inset-0"
        color="110,86,207"
        density={0.7}
        maxDistance={130}
      />

      <GradientGlow />

      <div className="relative z-10">
        <motion.span
          className="eyebrow mb-6 block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          ENGINEER — ROBOTICS, EMBEDDED SYSTEMS & AI
          {/* Software Engineer — Building for the web */}
        </motion.span>

        <TypewriterText
          as="h1"
          // text="I build fast, thoughtful products."
          text="I build systems that see, move, and act."
          startDelay={400}
          speed={35}
          onComplete={() => setTyped(true)}
          className="max-w-4xl font-display text-5xl leading-[1.05] text-ink md:text-7xl"
        />

        <motion.p
          className="mt-6 max-w-xl text-base text-muted md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={typed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          I'm Swakshar Bora, a developer focused on clean architecture and interfaces
          that feel alive. Currently open to new opportunities.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={typed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton href="/projects">View Work</MagneticButton>
          <MagneticButton href="/contact">Get in Touch</MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-6 z-10 flex items-center gap-2 md:left-12"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="h-4 w-4 text-muted" />
        <span className="font-mono text-xs uppercase tracking-wide text-muted">Scroll</span>
      </motion.div>
    </section>
  );
}