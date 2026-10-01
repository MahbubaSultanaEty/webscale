// components/editor/TextControl.jsx
// A simple text input for editing a single text prop.

'use client';

import styles from './Controls.module.css';

export default function TextControl({ label, value, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        className={styles.input}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
