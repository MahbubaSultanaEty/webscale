// components/sections/Features/Features.jsx
// Features section composed of header elements (heading, paragraph) and card elements.

'use client';

import ElementRenderer from '@/components/renderer/ElementRenderer';

export function Features({ section, ...fallbackProps }) {
  const styles = section?.styles || {};
  const backgroundColor = styles.backgroundColor || fallbackProps.backgroundColor || '#ffffff';
  const textColor = styles.textColor || fallbackProps.textColor || '#111111';
  const paddingTop = styles.paddingTop ? `${parseInt(styles.paddingTop)}px` : '80px';
  const paddingBottom = styles.paddingBottom ? `${parseInt(styles.paddingBottom)}px` : '80px';
  const columns = styles.columns || fallbackProps.columns || 3;

  const elements = section?.elements;

  if (elements && elements.length > 0) {
    const headerElements = elements.filter(
      (el) => el.type === 'heading' || el.type === 'paragraph'
    );
    const cardElements = elements.filter((el) => el.type === 'card');

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
          {/* Header elements (Title, subtitle) */}
          <div style={{ maxWidth: '640px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            {headerElements.map((element) => (
              <ElementRenderer
                key={element.id}
                element={element}
                sectionId={section.id}
              />
            ))}
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: '1.5rem',
            }}
          >
            {cardElements.map((element) => (
              <ElementRenderer
                key={element.id}
                element={element}
                sectionId={section.id}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback for legacy format
  const items = fallbackProps.items || [];
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
        <div style={{ textAlign: fallbackProps.textAlign || 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            {fallbackProps.heading}
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            {fallbackProps.subheading}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
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

export default Features;
