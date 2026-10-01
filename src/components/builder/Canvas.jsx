// components/builder/Canvas.jsx
// The center panel — the live preview of the page being built.
// It loops through all sections in the builder context and renders each one.
// Clicking a section selects it (highlights it + opens it in EditorPanel).

'use client';

import { useBuilder } from '@/context/BuilderContext';
import SectionWrapper from './SectionWrapper';
import SectionRenderer from '@/components/renderer/SectionRenderer';
import styles from './Canvas.module.css';

export default function Canvas() {
  const { sections } = useBuilder();

  if (sections.length === 0) {
    return (
      <main className={styles.canvas}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🖼️</div>
          <h3 className={styles.emptyTitle}>Your canvas is empty</h3>
          <p className={styles.emptyText}>Click any section from the left panel to add it here.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.canvas}>
      <div className={styles.page}>
        {sections.map((section) => (
          // SectionWrapper handles the selection highlight + move/delete controls
          <SectionWrapper key={section.id} section={section}>
            <SectionRenderer section={section} />
          </SectionWrapper>
        ))}
      </div>
    </main>
  );
}
