// components/renderer/SectionRenderer.jsx
// Reads a section's "type" and renders the matching section component.
// Passes the complete section object (with elements and styles) plus legacy props.

'use client';

import { sectionRegistry } from '@/lib/sectionRegistry';

export default function SectionRenderer({ section }) {
  const config = sectionRegistry[section.type];

  if (!config) {
    return (
      <div style={{ padding: '2rem', background: '#fee', color: '#c00', textAlign: 'center' }}>
        Unknown section type: <strong>{section.type}</strong>
      </div>
    );
  }

  const Component = config.component;
  return <Component section={section} {...(section.props || {})} />;
}
