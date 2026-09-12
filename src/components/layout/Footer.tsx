import Link from 'next/link';

const socials = [
  { label: 'GitHub', href: 'https://github.com/DastardlyKat' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/swakshar-bora-1b96b7275/' },
  { label: 'Email', href: 'mailto:swaksharbora@gmail.com' }
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10 md:px-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Swakshar Bora. Built with Next.js & Framer Motion.
        </p>
        <div className="flex gap-6">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              data-cursor-hover
              className="font-mono text-xs uppercase tracking-wide text-muted hover:text-accent"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
