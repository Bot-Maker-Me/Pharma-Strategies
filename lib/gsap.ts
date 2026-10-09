import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Central GSAP entry point.
 *
 * Import { gsap, ScrollTrigger } from '@/lib/gsap' everywhere instead of
 * importing gsap directly. This module is a singleton, so the plugin is
 * registered a single time (registerPlugin is idempotent).
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
