'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 backdrop-blur-sm md:px-12">
      <Link href="/" className="font-display text-lg text-ink" data-cursor-hover>
        Swakshar Bora
      </Link>
      <nav className="flex items-center gap-6">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="relative font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              <span className={cn(active && 'text-ink')}>{link.label}</span>
              {active && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
