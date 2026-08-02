'use client';

import { useEffect } from 'react';
import { useReadingStore } from '@/lib/store/useReadingStore';

export function ArticleReadTracker({ articleId }: { articleId: string }) {
  const markRead = useReadingStore((state) => state.markRead);

  useEffect(() => {
    markRead(articleId);
  }, [articleId, markRead]);

  return null;
}
