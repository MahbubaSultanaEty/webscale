// components/sections/Hero/Hero.jsx
// Hero section composed of individual, editable elements (heading, paragraph, button).

'use client';

import ElementRenderer from '@/components/renderer/ElementRenderer';
import SortableElementList from '@/components/renderer/SortableElementList';
export function Hero({ section, ...fallbackProps }) {
  const styles = section?.styles || {};
  const backgroundColor = styles.backgroundColor || fallbackProps.backgroundColor || '#a23fa1';
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
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        {elements && elements.length > 0 ? (
          elements.map((element) => (
            <SortableElementList
  elements={elements}
  sectionId={section.id}
/>
          ))
        ) : (
          <>
            <h1
              style={{
                fontSize: fallbackProps.headingSize || '52px',
                fontWeight: fallbackProps.headingWeight || '700',
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              {fallbackProps.heading}
            </h1>
            <p
              style={{
                fontSize: fallbackProps.subheadingSize || '18px',
                opacity: 0.85,
                lineHeight: 1.7,
                marginBottom: '2rem',
              }}
            >
              {fallbackProps.subheading}
            </p>
            {fallbackProps.buttonText && (
              <a
                href={fallbackProps.buttonLink || '#'}
                style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  backgroundColor: fallbackProps.buttonBg || '#ef63ff',
                  color: fallbackProps.buttonColor || '#ffffff',
                  borderRadius: fallbackProps.buttonRadius ? `${parseInt(fallbackProps.buttonRadius)}px` : '8px',
                  fontWeight: 600,
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

export default Hero;
