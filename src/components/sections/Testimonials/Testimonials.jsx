// components/sections/Testimonials/Testimonials.jsx

'use client';

export function Testimonials({
  heading,
  backgroundColor,
  textColor,
  paddingTop,
  paddingBottom,
  items = [],
}) {
  return (
    <section
      style={{
        backgroundColor,
        color: textColor,
        paddingTop,
        paddingBottom,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>
          {heading}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                background: 'rgba(0,0,0,0.04)',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem', opacity: 0.85 }}>
                "{item.text}"
              </p>
              <div>
                <strong style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</strong>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '2px' }}>{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
