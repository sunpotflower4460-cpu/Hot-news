'use client';

import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { useI18n } from '@/lib/i18n/useI18n';
import type { TranslationKey } from '@/lib/i18n/messages';

type Props<T extends ElementType> = {
  id: TranslationKey;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'children'>;

export function T<TElement extends ElementType = 'span'>({
  id,
  as,
  ...props
}: Props<TElement>) {
  const { t } = useI18n();
  const Component = as ?? 'span';
  return <Component {...props}>{t(id)}</Component>;
}
