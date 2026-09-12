import { Hero } from '@/components/sections/Hero';
import { SkillsMarquee } from '@/components/sections/SkillsMarquee';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ContactForm } from '@/components/sections/ContactCTA';
import { GradientGlow } from '@/components/ui/GradientGlow';

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <FeaturedProjects />  
      <ContactForm />
    </>
  );
}
