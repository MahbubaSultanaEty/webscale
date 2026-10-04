'use client';

// Floating action menu for the selected canvas element.
// Provides Duplicate, Copy, and Delete actions.

import { Copy, CopyPlus, Trash2 } from 'lucide-react';
import styles from './ElementActionMenu.module.css';

export default function ElementActionMenu({
  onDuplicate,
  onCopy,
  onDelete,
  position,
}) {
  if (!position) return null;

  return (
    <div
      className={styles.menu}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      {/* Duplicate */}
      <button
        type="button"
        onClick={onDuplicate}
        className={styles.button}
      >
        <CopyPlus className={styles.icon} />
        <span>Duplicate</span>
      </button>

      {/* Copy */}
      {/* <button
        type="button"
        onClick={onCopy}
        className={styles.button}
      >
        <Copy className={styles.icon} />
        <span>Copy</span>
      </button> */}

      <div className={styles.divider} />

      {/* Delete */}
      <button
        type="button"
        onClick={onDelete}
        className={`${styles.button} ${styles.deleteButton}`}
      >
        <Trash2 className={styles.icon} />
        <span>Delete</span>
      </button>
    </div>
  );
}