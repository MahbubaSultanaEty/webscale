// context/BuilderContext.js
// This is the global state for the entire builder.
// ANY component can read or update the page by calling useBuilder().
//
// What it stores:
//  - sections: the list of sections on the canvas (the "page schema")
//  - selectedId: which section is currently selected (to show in editor panel)
//
// What it provides:
//  - addSection(type)         → add a new section to the canvas
//  - removeSection(id)        → remove a section
//  - updateSection(id, props) → update one or more props of a section
//  - selectSection(id)        → set which section is selected
//  - moveSection(id, dir)     → move a section up or down

'use client';

import { createContext, useContext, useState } from 'react';
import { generateId } from '@/lib/generateId';
import { sectionRegistry } from '@/lib/sectionRegistry';

// 1. Create the context
const BuilderContext = createContext(null);

// 2. The Provider component — wrap the builder UI with this
export function BuilderProvider({ children }) {
  // The page is just an array of section objects
  const [sections, setSections] = useState([]);
  // Which section is selected right now (by its id)
  const [selectedId, setSelectedId] = useState(null);

  // Add a new section to the bottom of the canvas
  function addSection(type) {
    const config = sectionRegistry[type];
    if (!config) return;

    const newSection = {
      id: generateId(),
      type,
      // Start with the default props defined in the section's config
      props: { ...config.defaultProps },
    };

    setSections((prev) => [...prev, newSection]);
    setSelectedId(newSection.id); // auto-select the new section
  }

  // Remove a section by id
  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
    setSelectedId(null);
  }

  // Update specific props of a section
  // Example: updateSection('abc', { heading: 'New text', color: '#fff' })
  function updateSection(id, newProps) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, props: { ...s.props, ...newProps } } : s
      )
    );
  }

  // Select a section (shows its fields in the EditorPanel)
  function selectSection(id) {
    setSelectedId(id);
  }

  // Move a section up or down in the list
  function moveSection(id, direction) {
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const updated = [...prev];
      // Swap the two sections
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }

  // The selected section object (used by EditorPanel)
  const selectedSection = sections.find((s) => s.id === selectedId) || null;

  return (
    <BuilderContext.Provider
      value={{
        sections,
        selectedId,
        selectedSection,
        addSection,
        removeSection,
        updateSection,
        selectSection,
        moveSection,
        setSections, // exposed for save/load
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

// 3. Custom hook — makes it easy to use the context in any component
// Usage: const { sections, addSection } = useBuilder();
export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used inside <BuilderProvider>');
  }
  return context;
}
