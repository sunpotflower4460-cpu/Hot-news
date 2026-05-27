import Link from 'next/link';
import { getCategory } from '@/mock/categories';
import type { CategoryId } from '@/types/article';
import { Chip } from '@/components/ui/Chip';

interface CategoryChipProps {
  id: CategoryId;
  asLink?: boolean;
}

export function CategoryChip({ id, asLink = true }: CategoryChipProps) {
  const meta = getCategory(id);
  const chip = (
    <Chip accent={meta.accent}>
      <span aria-hidden>{meta.glyph}</span>
      {meta.labelJa}
    </Chip>
  );

  if (!asLink) return chip;
  return (
    <Link href={`/browse/${id}`} className="transition-transform active:scale-95">
      {chip}
    </Link>
  );
}
