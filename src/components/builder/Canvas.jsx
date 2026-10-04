// components/builder/Canvas.jsx
// The center panel — the live preview of the page being built.
// It loops through all sections in the builder context and renders each one.
// Clicking a section selects it (highlights it + opens it in EditorPanel).

'use client';

import { useBuilder } from '@/context/BuilderContext';
import SectionWrapper from './SectionWrapper';
import SectionRenderer from '@/components/renderer/SectionRenderer';
import ElementActionMenu from './ElementActionMenu';
import styles from './Canvas.module.css';

export default function Canvas() {
  const {
    sections,
    isLoading,
    contextMenu,
    closeContextMenu,
    duplicateElement,
    deleteElement,
  } = useBuilder();

  if (isLoading) {
    return (
      <main className={styles.canvas}>
        <div className={styles.empty}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            ⏳
          </div>
          <h3 className={styles.emptyTitle}>Loading page...</h3>
          <p className={styles.emptyText}>
            Connecting to database and loading sections...
          </p>
        </div>
      </main>
    );
  }

  if (sections.length === 0) {
    return (
      <main className={styles.canvas}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🖼️</div>
          <h3 className={styles.emptyTitle}>Your canvas is empty</h3>
          <p className={styles.emptyText}>
            Click any section from the left panel to add it here.
          </p>
        </div>
      </main>
    );
  }

  function handleDuplicate() {
    if (!contextMenu) return;

    duplicateElement(
      contextMenu.sectionId,
      contextMenu.elementId
    );
  }

  function handleDelete() {
    if (!contextMenu) return;

    deleteElement(
      contextMenu.sectionId,
      contextMenu.elementId
    );
  }

  function handleCopy() {
    if (!contextMenu) return;

    // Copy functionality can be connected later.
    // For now, just close the menu.
    closeContextMenu();
  }

  return (
    <main
      className={styles.canvas}
      onClick={closeContextMenu}
    >
      <div className={styles.page}>
        {sections.map((section) => (
          <SectionWrapper
            key={section.id}
            section={section}
          >
            <SectionRenderer section={section} />
          </SectionWrapper>
        ))}
      </div>

      <ElementActionMenu
        position={contextMenu}
        onDuplicate={handleDuplicate}
        onCopy={handleCopy}
        onDelete={handleDelete}
      />
    </main>
  );
}