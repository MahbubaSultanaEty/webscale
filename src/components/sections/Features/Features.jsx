// components/sections/Features/Features.jsx
// Renders a grid of feature cards.

'use client';

export function Features({
  heading,
  subheading,
  backgroundColor,
  textColor,
  paddingTop,
  paddingBottom,
  textAlign,
  columns,
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
        <div style={{ textAlign, marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            {heading}
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '600px', margin: textAlign === 'center' ? '0 auto' : 0 }}>
            {subheading}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns || 3}, 1fr)`,
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
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.6 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
