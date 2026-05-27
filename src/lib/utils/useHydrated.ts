'use client';

import { useEffect, useState } from 'react';

/** True only after client mount — guards persisted store reads from SSR mismatch. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
