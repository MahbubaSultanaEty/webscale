'use client';

import { useBuilder } from '@/context/BuilderContext';
import { sectionRegistry } from '@/lib/sectionRegistry';
import { elementRegistry } from '@/lib/elementRegistry';
import TextControl from '@/components/editor/TextControl';
import TextareaControl from '@/components/editor/TextareaControl';
import ColorControl from '@/components/editor/ColorControl';
import SelectControl from '@/components/editor/SelectControl';
import SliderControl from '@/components/editor/SliderControl';
import styles from './EditorPanel.module.css';

export default function EditorPanel() {
  const {
    selectedSection,
    selectedElement,
    updateSection,
    updateElement,
    selectSection,
    selectElement,
  } = useBuilder();

  if (!selectedSection) {
    return (
      <aside className={styles.panel}>
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>☜</p>
          <p className={styles.emptyText}>
            Click any element or section on the canvas to edit its properties
          </p>
        </div>
      </aside>
    );
  }

  function renderControl({ field, value, onChange, index }) {
    if (field.section) {
      return (
        <div key={`divider-${index}`} className={styles.sectionDivider}>
          {field.section}
        </div>
      );
    }

    const controlKey = field.key || index;

    const commonProps = {
      label: field.label,
      value: value ?? '',
      onChange,
    };

    switch (field.type) {
      case 'text':
        return <TextControl key={controlKey} {...commonProps} />;

      case 'textarea':
        return <TextareaControl key={controlKey} {...commonProps} />;

      case 'color':
        return <ColorControl key={controlKey} {...commonProps} />;

      case 'select':
        return (
          <SelectControl
            key={controlKey}
            {...commonProps}
            options={field.options}
          />
        );

      case 'slider':
        return (
          <SliderControl
            key={controlKey}
            {...commonProps}
            min={field.min}
            max={field.max}
          />
        );

      default:
        return <TextControl key={controlKey} {...commonProps} />;
    }
  }

  // ==========================================
  // CASE 1: AN INDIVIDUAL ELEMENT IS SELECTED
  // ==========================================
  if (selectedElement) {
    const elConfig = elementRegistry[selectedElement.type];

    if (!elConfig) return null;

    const ElementIcon = elConfig.icon;

    const handleElementFieldChange = (field, newVal) => {
      const group = field.group || 'content';

      updateElement(selectedSection.id, selectedElement.id, {
        [group]: {
          ...(selectedElement[group] || {}),
          [field.key]: newVal,
        },
      });
    };

    return (
      <aside className={styles.panel}>
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={() => selectSection(selectedSection.id)}
            title="Go back to section settings"
          >
            ← Back to {selectedSection.type}
          </button>

          <div className={styles.headerMain}>
            <span className={styles.icon}>
              <ElementIcon />
            </span>

            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>
                {elConfig.label}
                <span className={styles.badge}>Element</span>
              </h2>

              <p className={styles.subtitle}>
                Edit element properties
              </p>
            </div>
          </div>
        </div>

        <div className={styles.fields}>
          {elConfig.fields.map((field, index) => {
            const group = field.group || 'content';
            const value = selectedElement[group]?.[field.key];

            return renderControl({
              field,
              value,
              onChange: (val) => handleElementFieldChange(field, val),
              index,
            });
          })}
        </div>
      </aside>
    );
  }

  // ==========================================
  // CASE 2: AN ENTIRE SECTION IS SELECTED
  // ==========================================
  const secConfig = sectionRegistry[selectedSection.type];

  if (!secConfig) return null;

  const SectionIcon = secConfig.icon;

  const handleSectionFieldChange = (key, newVal) => {
    updateSection(selectedSection.id, {
      styles: { [key]: newVal },
      props: { [key]: newVal },
    });
  };

  const hasElements =
    selectedSection.elements &&
    selectedSection.elements.length > 0;

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <span className={styles.icon}>
            <SectionIcon />
          </span>

          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              {secConfig.label}
              <span className={styles.badge}>Section</span>
            </h2>

            <p className={styles.subtitle}>
              Edit section layout & elements
            </p>
          </div>
        </div>
      </div>

      {/* Quick Element Picker Chips */}
      {hasElements && (
        <div className={styles.elementsBox}>
          <div className={styles.elementsBoxTitle}>
            Elements inside this section:
          </div>

          <div className={styles.elementChips}>
            {selectedSection.elements.map((el) => {
              const elConf = elementRegistry[el.type];

              const ChipIcon = elConf?.icon;

              return (
                <button
                  key={el.id}
                  className={styles.elementChip}
                  onClick={() =>
                    selectElement(selectedSection.id, el.id)
                  }
                  title={`Edit ${elConf?.label || el.type}`}
                >
                  <span>
                    {ChipIcon ? <ChipIcon /> : '•'}
                  </span>

                  <span>
                    {elConf?.label || el.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Section level fields */}
      <div className={styles.fields}>
        {(secConfig.fields || []).map((field, index) => {
          const value =
            selectedSection.styles?.[field.key] ??
            selectedSection.props?.[field.key];

          return renderControl({
            field,
            value,
            onChange: (val) =>
              handleSectionFieldChange(field.key, val),
            index,
          });
        })}
      </div>
    </aside>
  );
}