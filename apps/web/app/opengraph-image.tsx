import { ImageResponse } from 'next/og';

/**
 * Default Open Graph image (PB-020). Used for any page without its own OG image,
 * so shares render a branded card instead of a bare link. Per-route OG images
 * (e.g. articles) can override this with their own opengraph-image file.
 */
export const alt = 'ProBotica — AI Operating Systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #040506 0%, #0a141b 60%, #061018 100%)',
          color: '#d9e1e7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, letterSpacing: 8, color: '#91f2ff', fontWeight: 700 }}>
          PROBOTICA
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Teach the concept, then run the concept.
          </div>
          <div style={{ fontSize: 30, color: '#8f9baa' }}>
            AI bots, prompt packs & workflow automation — plus a Knowledge Universe that teaches them.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 24, color: '#8f9baa' }}>
          <span style={{ color: '#b7ff72' }}>probotica.at</span>
          <span>·</span>
          <span>Vienna, Austria</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
