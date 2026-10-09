import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

/**
 * DESIGN.md motion easing curve, exposed as a GSAP ease id.
 * cubic-bezier(0.22, 1, 0.36, 1)
 */
export const DESIGN_EASE = 'design';

/** Same curve as an array, for Framer Motion transitions. */
export const DESIGN_EASE_ARRAY: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Central GSAP entry point.
 *
 * Import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap' everywhere instead
 * of importing gsap directly. This module is a singleton, so plugins are
 * registered a single time (registerPlugin is idempotent).
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create(DESIGN_EASE, 'M0,0 C0.22,1 0.36,1 1,1');
}

export { gsap, ScrollTrigger, SplitText, CustomEase };
