'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/50 via-background to-background">
      {/* Hexagon molecular pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230A1F44' fill-rule='evenodd'%3E%3Cpath d='M28 0L56 16v32L28 64 0 48V16zM28 72l28 16v32L28 136 0 120V88z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '56px 100px',
        }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-navy-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 ring-1 ring-teal-200">
            <span className="flex h-2 w-2 rounded-full bg-teal-500" />
            The pharmaceutical compliance marketplace
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
            Compliance Software for{' '}
            <span className="gradient-text">Modern Pharma</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-navy-600">
            Subscribe to the compliance tools you need — narcotics tracking,
            cold chain monitoring, batch management, and more. One platform,
            modular apps, zero friction.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/20"
              asChild
            >
              <Link href="/apps">
                Browse Apps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                <Calendar className="mr-2 h-4 w-4" />
                Book Demo
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-navy-500"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              GxP-ready
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              SOC 2 Type II
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              99.99% uptime
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
