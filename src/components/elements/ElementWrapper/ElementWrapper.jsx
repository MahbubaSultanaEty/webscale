'use client';

import { useRef, useState } from 'react';
import { Move, Maximize2 } from 'lucide-react';
import { useBuilder } from '@/context/BuilderContext';
import styles from './ElementWrapper.module.css';

const MIN_WIDTH = 60;

export default function ElementWrapper({
  element,
  sectionId,
  children,
  dragHandleProps = {},
}) {
  const {
    selectedElementId,
    selectElement,
    openContextMenu,
    updateElement,
  } = useBuilder();

  const wrapperRef = useRef(null);
  const resizeStartRef = useRef(null);

  // Resize চলার সময় live width (শুধু local state, context-এ না)
  const [liveWidth, setLiveWidth] = useState(null);

  const isSelected = selectedElementId === element?.id;

  // Saved width: element.styles.width (যেমন "320px")
  const savedWidth = element?.styles?.width;
  const appliedWidth =
    liveWidth !== null ? `${liveWidth}px` : savedWidth;

  // --------------------------------------------------
  // SELECT
  // --------------------------------------------------

  function handleClick(e) {
    e.stopPropagation();
    if (!element?.id) return;
    selectElement(sectionId, element.id);
  }

  // --------------------------------------------------
  // CONTEXT MENU
  // --------------------------------------------------

  function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!element?.id) return;

    selectElement(sectionId, element.id);

    const rect = e.currentTarget.getBoundingClientRect();
    openContextMenu(
      sectionId,
      element.id,
      rect.right + 8,
      rect.top
    );
  }

  // --------------------------------------------------
  // DRAG HANDLE
  // --------------------------------------------------
  // listeners spread করার পর নিজের onPointerDown দিলে
  // dnd-kit-এরটা overwrite হয়ে যায়, তাই ভেতর থেকে call করছি।

  function handleDragPointerDown(e) {
    if (!element?.id) return;
    selectElement(sectionId, element.id);
    dragHandleProps.listeners?.onPointerDown?.(e);
  }

  // --------------------------------------------------
  // RESIZE (width)
  // --------------------------------------------------

  function handleResizePointerDown(e) {
    e.preventDefault();
    e.stopPropagation(); // dnd-kit-এর সাথে conflict আটকায়

    if (!element?.id || !wrapperRef.current) return;

    selectElement(sectionId, element.id);

    e.currentTarget.setPointerCapture(e.pointerId);

    resizeStartRef.current = {
      startX: e.clientX,
      startWidth: wrapperRef.current.offsetWidth,
    };

    setLiveWidth(wrapperRef.current.offsetWidth);
  }

  function handleResizePointerMove(e) {
    const start = resizeStartRef.current;
    if (!start) return;

    const next = Math.max(
      MIN_WIDTH,
      Math.round(start.startWidth + (e.clientX - start.startX))
    );

    setLiveWidth(next);
  }

  function handleResizePointerUp(e) {
    const start = resizeStartRef.current;
    if (!start) return;

    e.currentTarget.releasePointerCapture?.(e.pointerId);

    const finalWidth = Math.max(
      MIN_WIDTH,
      Math.round(start.startWidth + (e.clientX - start.startX))
    );

    resizeStartRef.current = null;
    setLiveWidth(null);

    // শেষে একবারই context-এ save হবে (autosave spam হবে না)
    updateElement(sectionId, element.id, {
      styles: { width: `${finalWidth}px` },
    });
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${
        isSelected ? styles.selected : ''
      }`}
      style={
        appliedWidth
          ? {
              width: appliedWidth,
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }
          : undefined
      }
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      id={`element-${element?.id}`}
    >
      <span className={styles.badge}>
        {element?.type || 'element'}
      </span>

      {isSelected && (
        <button
          type="button"
          ref={dragHandleProps.setActivatorNodeRef}
          className={styles.dragHandle}
          title="Move element"
          aria-label="Move element"
          {...dragHandleProps.attributes}
          {...dragHandleProps.listeners}
          onPointerDown={handleDragPointerDown}
        >
          <Move size={14} strokeWidth={2.5} />
        </button>
      )}

      {children}

      {isSelected && (
        <button
          type="button"
          className={styles.resizeHandle}
          title="Resize element"
          aria-label="Resize element"
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={handleResizePointerUp}
        >
          <Maximize2 size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}