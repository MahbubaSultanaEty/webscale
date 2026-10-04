'use client';

import { useBuilder } from '@/context/BuilderContext';
import styles from './ElementWrapper.module.css';

export default function ElementWrapper({
  element,
  sectionId,
  children,
}) {
  const {
    selectedElementId,
    selectElement,
    openContextMenu,
  } = useBuilder();

  const isSelected = selectedElementId === element?.id;

  function handleClick(e) {
    e.stopPropagation();

    if (element?.id) {
      selectElement(sectionId, element.id);
    }
  }

  function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!element?.id) return;

    // Select the element
    selectElement(sectionId, element.id);

    // Open action menu exactly where user right-clicked
    openContextMenu(
      sectionId,
      element.id,
      e.clientX,
      e.clientY
    );
  }

  return (
    <div
      className={`${styles.wrapper} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      id={`element-${element?.id}`}
    >
      <span className={styles.badge}>
        {element?.type || 'element'}
      </span>

      {children}
    </div>
  );
}