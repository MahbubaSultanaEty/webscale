// components/editor/SliderControl.jsx
// A range slider for numeric props like font size, padding, border-radius.
// Shows the current value next to the label.

'use client';

import styles from './Controls.module.css';

export default function SliderControl({ label, value, min = 0, max = 100, onChange }) {
  const numValue = parseInt(value, 10) || 0;

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label} <span className={styles.sliderValue}>{numValue}px</span>
      </label>
      <input
        type="range"
        className={styles.slider}
        value={numValue}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value + 'px')}
      />
    </div>
  );
}
