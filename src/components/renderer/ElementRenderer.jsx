'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { elementRegistry } from '@/lib/elementRegistry';
import ElementWrapper from '@/components/elements/ElementWrapper/ElementWrapper';

export default function ElementRenderer({ element, sectionId }) {
  // Hooks সবসময় সবার আগে, কোনো early return-এর আগে
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element?.id ?? 'unknown' });

  if (!element) return null;

  const config = elementRegistry[element.type];

  if (!config) {
    return (
      <div
        style={{
          padding: '8px',
          color: '#ef4444',
          fontSize: '0.8rem',
          border: '1px dashed #ef4444',
        }}
      >
        Unknown element type: <strong>{element.type}</strong>
      </div>
    );
  }

  const Component = config.component;

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={sortableStyle}>
      <ElementWrapper
        element={element}
        sectionId={sectionId}
        dragHandleProps={{
          attributes,
          listeners,
          setActivatorNodeRef,
        }}
      >
        <Component
          content={element.content}
          styles={element.styles}
        />
      </ElementWrapper>
    </div>
  );
}