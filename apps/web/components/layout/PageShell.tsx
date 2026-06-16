import Link from 'next/link';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  cards?: Array<{ title: string; text: string }>;
}

export function PageShell({ eyebrow, title, description, status = 'Active', cards = [] }: PageShellProps) {
  return (
    <main style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '5rem' }}>
      <section className="container-x">
        <p className="label-eyebrow">{eyebrow}</p>
        <h1 className="text-hero text-balance" style={{ marginTop: '1rem' }}>{title}</h1>
        <p className="text-lead" style={{ maxWidth: '760px', marginTop: '1.25rem' }}>{description}</p>
        <div className="surface-glass mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
          <span className="text-caption">{status}</span>
        </div>
      </section>

      {cards.length > 0 && (
        <section className="container-x mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="surface-glass rounded-2xl p-5">
              <h2 className="text-section" style={{ fontSize: '1.2rem' }}>{card.title}</h2>
              <p className="text-body mt-2">{card.text}</p>
            </article>
          ))}
        </section>
      )}

      <section className="container-x mt-12">
        <Link href="/#contact" className="btn btn-primary">Talk To ProBotica</Link>
      </section>
    </main>
  );
}
