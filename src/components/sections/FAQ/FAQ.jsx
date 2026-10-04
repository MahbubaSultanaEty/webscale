// components/sections/FAQ/FAQ.jsx
// FAQ section composed of heading and Q&A card elements.

'use client';

import { useState } from 'react';
import SortableElementList from '@/components/renderer/SortableElementList';

export function FAQ({ section, ...fallbackProps }) {
  const [openIndex, setOpenIndex] = useState(null);

  const styles = section?.styles || {};
  const backgroundColor = styles.backgroundColor || fallbackProps.backgroundColor || '#ffffff';
  const textColor = styles.textColor || fallbackProps.textColor || '#111111';
  const paddingTop = styles.paddingTop ? `${parseInt(styles.paddingTop)}px` : '80px';
  const paddingBottom = styles.paddingBottom ? `${parseInt(styles.paddingBottom)}px` : '80px';

  const elements = section?.elements;

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  if (elements && elements.length > 0) {
    return (
      <section
        style={{
          backgroundColor,
          color: textColor,
          paddingTop,
          paddingBottom,
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SortableElementList
              elements={elements}
              sectionId={section.id}
            />
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
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem' }}>
          {fallbackProps.heading}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  background: 'rgba(0,0,0,0.02)',
                  border: 'none',
                  color: textColor,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {item.question}
                <span style={{ fontSize: '1.2rem', flexShrink: 0, marginLeft: '1rem' }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>

              {openIndex === i && (
                <div
                  style={{
                    padding: '0 1.25rem 1rem',
                    fontSize: '0.9rem',
                    opacity: 0.75,
                    lineHeight: 1.7,
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;