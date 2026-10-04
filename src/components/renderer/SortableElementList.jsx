'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { useBuilder } from '@/context/BuilderContext';
import ElementRenderer from './ElementRenderer';

export default function SortableElementList({
  elements = [],
  sectionId,
}) {
  const { reorderElements } = useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;

    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    reorderElements(sectionId, oldIndex, newIndex);
  }

  if (!elements.length) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={elements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        {elements.map((element) => (
          <ElementRenderer
            key={element.id}
            element={element}
            sectionId={sectionId}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}