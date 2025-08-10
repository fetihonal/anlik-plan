'use client';

import dynamic from 'next/dynamic';

// Dynamically import EnvChecker with no SSR to avoid hydration issues
const EnvChecker = dynamic(() => import('@/components/EnvChecker'), { ssr: false });

export default function ClientEnvWrapper() {
  return <EnvChecker />;
}
