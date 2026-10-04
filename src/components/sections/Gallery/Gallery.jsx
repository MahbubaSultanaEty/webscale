// components/sections/Gallery/Gallery.jsx
// Gallery section composed of heading and individual image elements.

'use client';

import { rectSortingStrategy } from '@dnd-kit/sortable';
import SortableElementList from '@/components/renderer/SortableElementList';

export function Gallery({ section, ...fallbackProps }) {
  const styles = section?.styles || {};
  const backgroundColor = styles.backgroundColor || fallbackProps.backgroundColor || '#ffffff';
  const textColor = styles.textColor || fallbackProps.textColor || '#111111';
  const paddingTop = styles.paddingTop ? `${parseInt(styles.paddingTop)}px` : '80px';
  const paddingBottom = styles.paddingBottom ? `${parseInt(styles.paddingBottom)}px` : '80px';
  const columns = styles.columns || fallbackProps.columns || 3;

  const elements = section?.elements;

  if (elements && elements.length > 0) {
    const headingElements = elements.filter((el) => el.type === 'heading');
    const imageElements = elements.filter((el) => el.type === 'image');

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
          <div style={{ marginBottom: '2rem' }}>
            <SortableElementList
              elements={headingElements}
              allElements={elements}
              sectionId={section.id}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: '1rem',
            }}
          >
            <SortableElementList
              elements={imageElements}
              allElements={elements}
              sectionId={section.id}
              strategy={rectSortingStrategy}
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
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
          {fallbackProps.heading}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
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
                borderRadius: fallbackProps.borderRadius ? `${parseInt(fallbackProps.borderRadius)}px` : '8px',
                display: 'block',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;