// components/renderer/ElementRenderer.jsx
// Renders an individual element based on its type from elementRegistry.
// In the builder, wraps each element with ElementWrapper for interactive selection.

'use client';

import { elementRegistry } from '@/lib/elementRegistry';
import ElementWrapper from '@/components/elements/ElementWrapper/ElementWrapper';

export default function ElementRenderer({ element, sectionId }) {
  if (!element) return null;

  const config = elementRegistry[element.type];

  if (!config) {
    return (
      <div style={{ padding: '8px', color: '#ef4444', fontSize: '0.8rem', border: '1px dashed #ef4444' }}>
        Unknown element type: <strong>{element.type}</strong>
      </div>
    );
  }

  const Component = config.component;

  return (
    <ElementWrapper element={element} sectionId={sectionId}>
      <Component content={element.content} styles={element.styles} />
    </ElementWrapper>
  );
}
