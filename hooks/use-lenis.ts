'use client';

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export const LenisContext = createContext<Lenis | null>(null);

/**
 * Access the shared Lenis instance (e.g. `lenis.stop()` before opening a modal,
 * or `lenis.scrollTo('#section')` for programmatic scrolling).
 * Returns null when smooth scrolling is disabled (reduced motion).
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
