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

  // Section-এর পুরো element list। যখন elements filter করা subset হয়
  // (যেমন শুধু card), তখন index পুরো list থেকে বের করতে এটা লাগে।
  allElements,

  // Vertical list-এর জন্য default, grid-এর জন্য rectSortingStrategy দিন।
  strategy = verticalListSortingStrategy,
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

    const source = allElements || elements;

    const oldIndex = source.findIndex((el) => el.id === active.id);
    const newIndex = source.findIndex((el) => el.id === over.id);

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
        strategy={strategy}
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