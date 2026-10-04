'use client';

import { useRef, useState } from 'react';
import { Move } from 'lucide-react';
import { useBuilder } from '@/context/BuilderContext';
import styles from './ElementWrapper.module.css';

const MIN_WIDTH = 60;
const MIN_HEIGHT = 24;

const CORNERS = [
  { key: 'TopLeft', x: -1, y: -1 },
  { key: 'TopRight', x: 1, y: -1 },
  { key: 'BottomLeft', x: -1, y: 1 },
  { key: 'BottomRight', x: 1, y: 1 },
];

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
  const resizeRef = useRef(null);

  // Resize চলার সময় live size (শুধু local state)
  const [liveSize, setLiveSize] = useState(null);

  const isSelected = selectedElementId === element?.id;

  const savedWidth = element?.styles?.width;
  const savedHeight = element?.styles?.height;

  const appliedWidth = liveSize ? `${liveSize.width}px` : savedWidth;
  const appliedHeight = liveSize ? `${liveSize.height}px` : savedHeight;

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
    openContextMenu(sectionId, element.id, rect.right + 8, rect.top);
  }

  // --------------------------------------------------
  // DRAG HANDLE
  // --------------------------------------------------

  function handleDragPointerDown(e) {
    if (!element?.id) return;
    selectElement(sectionId, element.id);
    dragHandleProps.listeners?.onPointerDown?.(e);
  }

  // --------------------------------------------------
  // RESIZE (4 corners, width + height)
  // --------------------------------------------------
  // Element center-aligned (margin: auto), তাই width দুই পাশে
  // সমানভাবে বাড়ে। cursor আর handle মেলাতে width delta ×2 করা হয়েছে।

  function calcSize(e) {
    const s = resizeRef.current;

    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;

    return {
      width: Math.max(
        MIN_WIDTH,
        Math.round(s.startWidth + dx * s.corner.x * 2)
      ),
      height: Math.max(
        MIN_HEIGHT,
        Math.round(s.startHeight + dy * s.corner.y)
      ),
    };
  }

  function handleResizePointerDown(e, corner) {
    e.preventDefault();
    e.stopPropagation(); // dnd-kit-এর সাথে conflict আটকায়

    if (!element?.id || !wrapperRef.current) return;

    selectElement(sectionId, element.id);

    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = wrapperRef.current.getBoundingClientRect();

    resizeRef.current = {
      corner,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
    };

    setLiveSize({ width: rect.width, height: rect.height });
  }

  function handleResizePointerMove(e) {
    if (!resizeRef.current) return;
    setLiveSize(calcSize(e));
  }

  function handleResizePointerUp(e) {
    if (!resizeRef.current) return;

    e.currentTarget.releasePointerCapture?.(e.pointerId);

    const finalSize = calcSize(e);

    resizeRef.current = null;
    setLiveSize(null);

    // শেষে একবারই save হবে, autosave spam হবে না
    updateElement(sectionId, element.id, {
      styles: {
        width: `${finalSize.width}px`,
        height: `${finalSize.height}px`,
      },
    });
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  const wrapperStyle = {};

  if (appliedWidth) {
    wrapperStyle.width = appliedWidth;
    wrapperStyle.maxWidth = '100%';
    wrapperStyle.marginLeft = 'auto';
    wrapperStyle.marginRight = 'auto';
  }

  if (appliedHeight) {
    wrapperStyle.minHeight = appliedHeight;
  }

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${isSelected ? styles.selected : ''}`}
      style={wrapperStyle}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      id={`element-${element?.id}`}
    >
      <span className={styles.badge}>{element?.type || 'element'}</span>

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

      {isSelected &&
        CORNERS.map((corner) => (
          <span
            key={corner.key}
            role="presentation"
            className={`${styles.resizeHandle} ${
              styles[`resize${corner.key}`]
            }`}
            onPointerDown={(e) => handleResizePointerDown(e, corner)}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
            onPointerCancel={handleResizePointerUp}
          />
        ))}
    </div>
  );
}