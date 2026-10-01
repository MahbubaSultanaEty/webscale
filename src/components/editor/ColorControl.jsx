// components/editor/ColorControl.jsx
// A color picker input for background/text color props.

'use client';

import styles from './Controls.module.css';

export default function ColorControl({ label, value, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.colorRow}>
        <input
          type="color"
          className={styles.colorSwatch}
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          className={styles.colorText}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
