// components/editor/TextareaControl.jsx
// Multi-line text input for longer text props like subheadings.

'use client';

import styles from './Controls.module.css';

export default function TextareaControl({ label, value, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        value={value || ''}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
