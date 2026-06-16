'use client';

import dynamic from 'next/dynamic';

const ShaderField = dynamic(
  () => import('@/components/visual/ShaderField').then((m) => m.ShaderField),
  { ssr: false }
);

export function HomeClientFx() {
  return <ShaderField />;
}
