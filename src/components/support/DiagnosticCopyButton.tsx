'use client';

import { useState } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { commercialConfig } from '@/config/commercial';

export function DiagnosticCopyButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const details = [
      `App: ${commercialConfig.app.displayName}`,
      `Version: ${commercialConfig.app.version}`,
      `Stage: ${commercialConfig.releaseStage}`,
      `Page: ${window.location.pathname}`,
      `Online: ${navigator.onLine ? 'yes' : 'no'}`,
      `Language: ${navigator.language}`,
      `User agent: ${navigator.userAgent}`,
      `Time: ${new Date().toISOString()}`,
    ].join('\n');

    await navigator.clipboard.writeText(details);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Button type="button" variant="outline" className="w-full" onClick={copy}>
      {copied ? <Check aria-hidden size={17} /> : <ClipboardCopy aria-hidden size={17} />}
      {copied ? '診断情報をコピーしました' : '問い合わせ用の診断情報をコピー'}
    </Button>
  );
}
