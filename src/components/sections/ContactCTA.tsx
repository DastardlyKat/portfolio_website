'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialForm: FormData = { name: '', email: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  // Honeypot field — bots fill hidden inputs, humans never see this
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (honeypot) return; // silently drop bot submissions
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-xl">
        <span className="eyebrow">Get in Touch</span>
        <AnimatedText
          as="h2"
          text="Let's build something together."
          className="mt-3 mb-12 font-display text-3xl text-ink md:text-5xl"
        />

        <div className="relative w-full">
          {/* Honeypot — visually hidden, off-screen, not display:none (bots skip display:none checks less reliably) */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            tabIndex={-1}
            autoComplete="off"
          />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="py-16 text-center"
              >
                <p className="font-display text-3xl text-ink">Message sent.</p>
                <p className="mt-3 font-mono text-sm text-muted">
                  I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 font-mono text-xs uppercase tracking-widest text-muted underline underline-offset-4 hover:text-ink"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <Field
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  textarea
                />

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, x: 0 }}
                      animate={{
                        opacity: 1,
                        x: [0, -6, 6, -4, 4, 0],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="font-mono text-xs text-red-400"
                    >
                      Something went wrong — check the fields and try again.
                    </motion.p>
                  )}
                </AnimatePresence>

                <MagneticButton onClick={handleSubmit} disabled={status === 'loading'}>
                  <span className="font-mono text-sm uppercase tracking-widest">
                    {status === 'loading' ? 'Sending…' : 'Send message'}
                  </span>
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  textarea?: boolean;
}

function Field({ label, name, value, onChange, type = 'text', textarea }: FieldProps) {
  const [focused, setFocused] = useState(false);

  const sharedClasses = cn(
    'w-full bg-transparent border-b py-3 font-serif text-lg text-ink',
    'outline-none transition-colors duration-300 placeholder:text-muted',
    focused ? 'border-violet-400' : 'border-neutral-800'
  );

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={cn(
          'mb-2 block font-mono text-xs uppercase tracking-widest transition-colors duration-300',
          focused ? 'text-amber-400' : 'text-muted'
        )}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className={cn(sharedClasses, 'resize-none')}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={sharedClasses}
        />
      )}
    </div>
  );
}