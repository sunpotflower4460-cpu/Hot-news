import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-bg px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-4xl">
        🌥️
      </div>
      <h1 className="text-h1 font-bold text-text">お話が見つかりませんでした</h1>
      <p className="max-w-xs text-body text-muted">
        ページが移動したか、なくなったようです。ホームから、またゆっくりどうぞ。
      </p>
      <Link href="/home">
        <Button variant="soft">ホームへもどる</Button>
      </Link>
    </div>
  );
}
