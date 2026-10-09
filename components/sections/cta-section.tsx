'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Reveal } from '@/components/shared/reveal';

export function CtaSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      } else {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to modernize your compliance?
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Tell us about your needs and we&apos;ll get back to you within one
            business day. No sales pressure, just a conversation.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl rounded-2xl bg-white/5 p-6 backdrop-blur-xl ring-1 ring-white/10 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-navy-200">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="bg-white/10 border-white/10 text-white placeholder:text-navy-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-navy-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@pharma.com"
                  className="bg-white/10 border-white/10 text-white placeholder:text-navy-400"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="company" className="text-navy-200">
                Company <span className="text-navy-400">(optional)</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Pharma"
                className="bg-white/10 border-white/10 text-white placeholder:text-navy-400"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="message" className="text-navy-200">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us about your compliance needs..."
                className="bg-white/10 border-white/10 text-white placeholder:text-navy-400"
              />
            </div>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 rounded-lg bg-teal-500/20 px-4 py-3 text-sm text-teal-200"
              >
                Thanks! We&apos;ll be in touch shortly.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-200"
              >
                {errorMsg}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 w-full bg-teal-500 text-white hover:bg-teal-600"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
