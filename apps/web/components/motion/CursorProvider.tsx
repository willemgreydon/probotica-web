'use client';

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(
  () => import('@/components/motion/CustomCursor').then((m) => m.CustomCursor),
  { ssr: false }
);

export function CursorProvider() {
  return <CustomCursor />;
}
