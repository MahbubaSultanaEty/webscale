// components/sections/Gallery/Gallery.jsx

'use client';

export function Gallery({
  heading,
  backgroundColor,
  textColor,
  paddingTop,
  paddingBottom,
  columns,
  borderRadius,
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
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
          {heading}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns || 3}, 1fr)`,
            gap: '1rem',
          }}
        >
          {items.map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt={item.alt}
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
                borderRadius: borderRadius ? `${parseInt(borderRadius)}px` : '8px',
                display: 'block',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
