// components/renderer/SectionRenderer.jsx
// This component reads a section's "type" and renders the correct component.
//
// How it works:
//  1. Look up the type (e.g. "Hero") in the sectionRegistry
//  2. Get the React component for that type
//  3. Render it with the section's current props
//
// This is the glue between the data (the page schema) and the UI.

'use client';

import { sectionRegistry } from '@/lib/sectionRegistry';

export default function SectionRenderer({ section }) {
  const config = sectionRegistry[section.type];

  if (!config) {
    // Gracefully handle unknown section types
    return (
      <div style={{ padding: '2rem', background: '#fee', color: '#c00', textAlign: 'center' }}>
        Unknown section type: <strong>{section.type}</strong>
      </div>
    );
  }

  // Get the component from the registry and render it with the section's props
  const Component = config.component;
  return <Component {...section.props} />;
}
