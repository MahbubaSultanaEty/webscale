'use client';

import { useBuilder } from '@/context/BuilderContext';
import { sectionRegistry } from '@/lib/sectionRegistry';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { addSection } = useBuilder();

  const sectionTypes = Object.entries(sectionRegistry);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sections</h2>
        <p className={styles.hint}>Click to add</p>
      </div>

      <div className={styles.list}>
        {sectionTypes.map(([type, config]) => {
          const Icon = config.icon;

          return (
            <button
              key={type}
              className={styles.sectionBtn}
              onClick={() => addSection(type)}
              id={`add-${type.toLowerCase()}-btn`}
            >
              <span className={styles.icon}>
                <Icon />
              </span>

              <span className={styles.label}>{config.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}