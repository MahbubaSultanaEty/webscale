// components/builder/SectionWrapper.jsx
// Wraps every section on the canvas with:
//  - A click handler to select it
//  - A highlight outline when selected
//  - Move up / Move down / Delete buttons (shown on hover)
//
// This keeps Canvas.jsx clean — it doesn't need to know about selection UI.

'use client';

import { useBuilder } from '@/context/BuilderContext';
import styles from './SectionWrapper.module.css';

export default function SectionWrapper({ section, children }) {
  const { selectedId, selectSection, removeSection, moveSection } = useBuilder();

  const isSelected = selectedId === section.id;

  return (
    <div
      className={`${styles.wrapper} ${isSelected ? styles.selected : ''}`}
      onClick={() => selectSection(section.id)}
    >
      {/* Controls — visible on hover or when selected */}
      <div className={styles.controls}>
        <span className={styles.typeLabel}>{section.type}</span>
        <div className={styles.actions}>
          <button
            title="Move Up"
            onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }}
            className={styles.actionBtn}
            id={`move-up-${section.id}`}
          >↑</button>
          <button
            title="Move Down"
            onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }}
            className={styles.actionBtn}
            id={`move-down-${section.id}`}
          >↓</button>
          <button
            title="Delete Section"
            onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            id={`delete-${section.id}`}
          >✕</button>
        </div>
      </div>

      {/* The actual section content */}
      {children}
    </div>
  );
}
