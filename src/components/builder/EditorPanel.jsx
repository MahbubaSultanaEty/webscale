// components/builder/EditorPanel.jsx
// The right-side property editor.
//
// How it works:
//  1. Read selectedSection from BuilderContext
//  2. Look up its config (the "fields" array) from sectionRegistry
//  3. Loop through fields and render the right control for each field type
//  4. When a control changes, call updateSection() to update the live canvas
//
// Adding a new control type? Just add a case to the renderField switch below.

'use client';

import { useBuilder } from '@/context/BuilderContext';
import { sectionRegistry } from '@/lib/sectionRegistry';
import TextControl from '@/components/editor/TextControl';
import TextareaControl from '@/components/editor/TextareaControl';
import ColorControl from '@/components/editor/ColorControl';
import SelectControl from '@/components/editor/SelectControl';
import SliderControl from '@/components/editor/SliderControl';
import styles from './EditorPanel.module.css';

export default function EditorPanel() {
  const { selectedSection, updateSection } = useBuilder();

  // Nothing selected — show a prompt
  if (!selectedSection) {
    return (
      <aside className={styles.panel}>
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>☜</p>
          <p className={styles.emptyText}>Click any section on the canvas to edit its properties</p>
        </div>
      </aside>
    );
  }

  const config = sectionRegistry[selectedSection.type];
  if (!config) return null;

  // Helper: when a field changes, update just that prop
  function handleChange(key, value) {
    updateSection(selectedSection.id, { [key]: value });
  }

  // Render the right control based on the field type
  function renderField(field, index) {
    // Section header (not a field, just a label divider)
    if (field.section) {
      return (
        <div key={`section-${index}`} className={styles.sectionDivider}>
          {field.section}
        </div>
      );
    }

    const value = selectedSection.props[field.key];
    const commonProps = {
      key: field.key,
      label: field.label,
      value,
      onChange: (val) => handleChange(field.key, val),
    };

    switch (field.type) {
      case 'text':
        return <TextControl {...commonProps} />;
      case 'textarea':
        return <TextareaControl {...commonProps} />;
      case 'color':
        return <ColorControl {...commonProps} />;
      case 'select':
        return <SelectControl {...commonProps} options={field.options} />;
      case 'slider':
        return (
          <SliderControl
            {...commonProps}
            min={field.min}
            max={field.max}
          />
        );
      default:
        return <TextControl {...commonProps} />;
    }
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.icon}>{config.icon}</span>
        <div>
          <h2 className={styles.title}>{config.label}</h2>
          <p className={styles.subtitle}>Edit properties</p>
        </div>
      </div>

      <div className={styles.fields}>
        {config.fields.map((field, index) => renderField(field, index))}
      </div>
    </aside>
  );
}
