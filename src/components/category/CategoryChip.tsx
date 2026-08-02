'use client';

import Link from 'next/link';
import { Chip } from '@/components/ui/Chip';
import { localizeCategory } from '@/lib/i18n/content';
import { useI18n } from '@/lib/i18n/useI18n';
import { getCategory } from '@/mock/categories';
import type { CategoryId } from '@/types/article';

interface CategoryChipProps {
  id: CategoryId;
  asLink?: boolean;
}

export function CategoryChip({ id, asLink = true }: CategoryChipProps) {
  const { locale } = useI18n();
  const meta = localizeCategory(getCategory(id), locale);
  const chip = (
    <Chip accent={meta.accent}>
      <span aria-hidden>{meta.glyph}</span>
      {meta.labelJa}
    </Chip>
  );

  if (!asLink) return chip;

  return (
    <Link
      href={`/browse/${id}`}
      aria-label={
        locale === 'ja'
          ? `${meta.labelJa}の明るいニュースを見る`
          : `View bright stories about ${meta.labelJa}`
      }
      className="inline-flex min-h-11 items-center rounded-pill transition-transform active:scale-95"
    >
      {chip}
    </Link>
  );
}
