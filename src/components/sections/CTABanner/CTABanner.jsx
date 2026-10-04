// components/sections/CTABanner/CTABanner.jsx
// CTA Banner composed of individual, editable elements (heading, paragraph, button).

'use client';

import ElementRenderer from '@/components/renderer/ElementRenderer';

export function CTABanner({ section, ...fallbackProps }) {
  const styles = section?.styles || {};
  const backgroundColor = styles.backgroundColor || fallbackProps.backgroundColor || '#6c63ff';
  const textColor = styles.textColor || fallbackProps.textColor || '#ffffff';
  const paddingTop = styles.paddingTop ? `${parseInt(styles.paddingTop)}px` : '80px';
  const paddingBottom = styles.paddingBottom ? `${parseInt(styles.paddingBottom)}px` : '80px';
  const textAlign = styles.textAlign || 'center';

  const elements = section?.elements;

  return (
    <section
      style={{
        backgroundColor,
        color: textColor,
        paddingTop,
        paddingBottom,
        textAlign,
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem' }}>
        {elements && elements.length > 0 ? (
          elements.map((element) => (
            <ElementRenderer
              key={element.id}
              element={element}
              sectionId={section.id}
            />
          ))
        ) : (
          <>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              {fallbackProps.heading}
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '2rem', lineHeight: 1.6 }}>
              {fallbackProps.subheading}
            </p>
            {fallbackProps.buttonText && (
              <a
                href={fallbackProps.buttonLink || '#'}
                style={{
                  display: 'inline-block',
                  padding: '14px 36px',
                  backgroundColor: fallbackProps.buttonBg || '#ffffff',
                  color: fallbackProps.buttonColor || '#6c63ff',
                  borderRadius: fallbackProps.buttonRadius ? `${parseInt(fallbackProps.buttonRadius)}px` : '8px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                }}
              >
                {fallbackProps.buttonText}
              </a>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default CTABanner;
