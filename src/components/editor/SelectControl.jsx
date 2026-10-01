// components/editor/SelectControl.jsx
// A dropdown for choosing from a fixed list of options.
// Used for font weight, text alignment, number of columns, etc.

'use client';

import styles from './Controls.module.css';

export default function SelectControl({ label, value, options, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.select}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
