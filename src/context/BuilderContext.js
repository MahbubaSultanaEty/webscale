
// context/BuilderContext.js
// Global state for the WebScale visual builder.
//
// Stores:
// - sections
// - selectedSectionId
// - selectedElementId
// - contextMenu
//
// Provides:
// - addSection(type)
// - removeSection(id)
// - updateSection(id, updates)
// - selectSection(id)
// - selectElement(sectionId, elementId)
// - clearSelection()
// - updateElement(sectionId, elementId, updates)
// - deleteElement(sectionId, elementId)
// - duplicateElement(sectionId, elementId)
// - reorderElements(sectionId, oldIndex, newIndex)
// - openContextMenu(sectionId, elementId, x, y)
// - closeContextMenu()
// - moveSection(id, direction)

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

import { generateId } from '@/lib/generateId';
import { sectionRegistry } from '@/lib/sectionRegistry';
import {
  getPages,
  getPage,
  createPage,
  updatePage,
} from '@/lib/api';
import {
  savePageToLocalStorage,
  loadPageFromLocalStorage,
} from '@/lib/storage';

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedElementId, setSelectedElementId] = useState(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState(null);

  // Persistence state
  const [pageId, setPageId] = useState(null);
  const [pageName, setPageName] = useState('My Page');
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'

  // Ref to prevent initial empty state from overwriting database
  const isLoadedRef = useRef(false);

  // --------------------------------------------------
  // INITIAL LOAD FROM MONGODB
  // --------------------------------------------------

  useEffect(() => {
    let isMounted = true;

    async function initializePage() {
      setIsLoading(true);

      try {
        const pages = await getPages();

        if (!isMounted) return;

        if (pages && pages.length > 0) {
          const currentPage = pages[0];

          setPageId(currentPage._id);
          setPageName(currentPage.name || 'My Page');
          setSections(currentPage.sections || []);
        } else {
          // If no page exists in MongoDB, create default page
          const newPage = await createPage({
            name: 'My Page',
            sections: [],
          });

          if (!isMounted) return;

          setPageId(newPage._id);
          setPageName(newPage.name || 'My Page');
          setSections(newPage.sections || []);
        }
      } catch (err) {
        console.error('Failed to load page from API:', err);

        // Fallback to local storage if API is not available
        const local = loadPageFromLocalStorage();

        if (local && local.sections) {
          setSections(local.sections);

          if (local.name) {
            setPageName(local.name);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);

          // Wait 300ms before enabling autosave
          // so initial state setter doesn't trigger save
          setTimeout(() => {
            isLoadedRef.current = true;
          }, 300);
        }
      }
    }

    initializePage();

    return () => {
      isMounted = false;
    };
  }, []);

  // --------------------------------------------------
  // AUTO-SAVE TO MONGODB (DEBOUNCED)
  // --------------------------------------------------

  useEffect(() => {
    // Only auto-save once initial load is completed and pageId is known
    if (!isLoadedRef.current || !pageId) {
      return;
    }

    setSaveStatus('saving');

    const debounceTimer = setTimeout(async () => {
      try {
        await updatePage(pageId, {
          name: pageName,
          sections,
        });

        savePageToLocalStorage({
          name: pageName,
          sections,
        });

        setSaveStatus('saved');
      } catch (err) {
        console.error('Auto-save failed:', err);
        setSaveStatus('error');
      }
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [sections, pageName, pageId]);

  // --------------------------------------------------
  // MANUAL SAVE / LOAD HELPERS
  // --------------------------------------------------

  async function saveCurrentPage() {
    if (!pageId) return;

    setSaveStatus('saving');

    try {
      const updated = await updatePage(pageId, {
        name: pageName,
        sections,
      });

      savePageToLocalStorage({
        name: pageName,
        sections,
      });

      setSaveStatus('saved');

      return updated;
    } catch (err) {
      console.error('Manual save failed:', err);
      setSaveStatus('error');
      throw err;
    }
  }

  async function loadCurrentPage() {
    setIsLoading(true);

    try {
      let pageData = null;

      if (pageId) {
        pageData = await getPage(pageId);
      } else {
        const pages = await getPages();

        if (pages.length > 0) {
          pageData = pages[0];
          setPageId(pageData._id);
        }
      }

      if (pageData) {
        setSections(pageData.sections || []);
        setPageName(pageData.name || 'My Page');
        setSaveStatus('saved');

        return pageData;
      }

      return null;
    } catch (err) {
      console.error('Manual load failed:', err);
      throw err;
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        isLoadedRef.current = true;
      }, 200);
    }
  }

  // --------------------------------------------------
  // ADD SECTION
  // --------------------------------------------------

  function addSection(type) {
    const config = sectionRegistry[type];

    if (!config) return;

    const initialElements =
      typeof config.createDefaultElements === 'function'
        ? config.createDefaultElements()
        : config.defaultElements
          ? JSON.parse(JSON.stringify(config.defaultElements))
          : [];

    const newSection = {
      id: generateId('sec'),
      type,

      styles: {
        ...(config.defaultStyles || {}),
      },

      props: {
        ...(config.defaultProps || {}),
      },

      elements: initialElements,
    };

    setSections((prev) => [...prev, newSection]);

    setSelectedSectionId(newSection.id);
    setSelectedElementId(null);
    setContextMenu(null);
  }

  // --------------------------------------------------
  // REMOVE SECTION
  // --------------------------------------------------

  function removeSection(id) {
    setSections((prev) =>
      prev.filter((section) => section.id !== id)
    );

    if (selectedSectionId === id) {
      setSelectedSectionId(null);
      setSelectedElementId(null);
      setContextMenu(null);
    }
  }

  // --------------------------------------------------
  // UPDATE SECTION
  // --------------------------------------------------

  function updateSection(id, updates) {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== id) return section;

        return {
          ...section,
          ...updates,

          styles: updates.styles
            ? {
                ...(section.styles || {}),
                ...updates.styles,
              }
            : section.styles || {},

          props: updates.props
            ? {
                ...(section.props || {}),
                ...updates.props,
              }
            : {
                ...(section.props || {}),
                ...updates,
              },
        };
      })
    );
  }

  // --------------------------------------------------
  // UPDATE ELEMENT
  // --------------------------------------------------

  function updateElement(sectionId, elementId, updates) {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const updatedElements = (section.elements || []).map(
          (element) => {
            if (element.id !== elementId) return element;

            return {
              ...element,
              ...updates,

              content: updates.content
                ? {
                    ...(element.content || {}),
                    ...updates.content,
                  }
                : element.content || {},

              styles: updates.styles
                ? {
                    ...(element.styles || {}),
                    ...updates.styles,
                  }
                : element.styles || {},
            };
          }
        );

        return {
          ...section,
          elements: updatedElements,
        };
      })
    );
  }

  // --------------------------------------------------
  // DELETE ELEMENT
  // --------------------------------------------------

  function deleteElement(sectionId, elementId) {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        return {
          ...section,
          elements: (section.elements || []).filter(
            (element) => element.id !== elementId
          ),
        };
      })
    );

    if (selectedElementId === elementId) {
      setSelectedElementId(null);
    }

    setContextMenu(null);
  }

  // --------------------------------------------------
  // DUPLICATE ELEMENT
  // --------------------------------------------------

  function duplicateElement(sectionId, elementId) {
    let duplicatedElementId = null;

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const elements = section.elements || [];

        const elementIndex = elements.findIndex(
          (element) => element.id === elementId
        );

        if (elementIndex === -1) {
          return section;
        }

        const originalElement = elements[elementIndex];

        const duplicatedElement = {
          ...originalElement,

          id: generateId('el'),

          content: {
            ...(originalElement.content || {}),
          },

          styles: {
            ...(originalElement.styles || {}),
          },
        };

        duplicatedElementId = duplicatedElement.id;

        const updatedElements = [...elements];

        updatedElements.splice(
          elementIndex + 1,
          0,
          duplicatedElement
        );

        return {
          ...section,
          elements: updatedElements,
        };
      })
    );

    if (duplicatedElementId) {
      setSelectedSectionId(sectionId);
      setSelectedElementId(duplicatedElementId);
    }

    setContextMenu(null);
  }

  // --------------------------------------------------
  // REORDER ELEMENTS
  // --------------------------------------------------
  // Moves an element from oldIndex to newIndex
  // inside the same section.
  //
  // This is called after a drag-and-drop operation
  // finishes in @dnd-kit.

  function reorderElements(sectionId, oldIndex, newIndex) {
    // Nothing to do if the element stays in the same position.
    if (oldIndex === newIndex) return;

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        const elements = [...(section.elements || [])];

        // Make sure both indexes are valid.
        if (
          oldIndex < 0 ||
          oldIndex >= elements.length ||
          newIndex < 0 ||
          newIndex >= elements.length
        ) {
          return section;
        }

        // Remove the dragged element from its old position.
        const [movedElement] = elements.splice(oldIndex, 1);

        // Insert it into the new position.
        elements.splice(newIndex, 0, movedElement);

        return {
          ...section,
          elements,
        };
      })
    );
  }

  // --------------------------------------------------
  // OPEN CONTEXT MENU
  // --------------------------------------------------

  function openContextMenu(
    sectionId,
    elementId,
    x,
    y
  ) {
    setSelectedSectionId(sectionId);
    setSelectedElementId(elementId);

    setContextMenu({
      x,
      y,
      sectionId,
      elementId,
    });
  }

  // --------------------------------------------------
  // CLOSE CONTEXT MENU
  // --------------------------------------------------

  function closeContextMenu() {
    setContextMenu(null);
  }

  // --------------------------------------------------
  // SELECT SECTION
  // --------------------------------------------------

  function selectSection(id) {
    setSelectedSectionId(id);
    setSelectedElementId(null);
    setContextMenu(null);
  }

  // --------------------------------------------------
  // SELECT ELEMENT
  // --------------------------------------------------

  function selectElement(sectionId, elementId) {
    setSelectedSectionId(sectionId);
    setSelectedElementId(elementId);
    setContextMenu(null);
  }

  // --------------------------------------------------
  // CLEAR SELECTION
  // --------------------------------------------------

  function clearSelection() {
    setSelectedSectionId(null);
    setSelectedElementId(null);
    setContextMenu(null);
  }

  // --------------------------------------------------
  // MOVE SECTION
  // --------------------------------------------------

  function moveSection(id, direction) {
    setSections((prev) => {
      const index = prev.findIndex(
        (section) => section.id === id
      );

      if (index === -1) return prev;

      const newIndex =
        direction === 'up'
          ? index - 1
          : index + 1;

      if (
        newIndex < 0 ||
        newIndex >= prev.length
      ) {
        return prev;
      }

      const updated = [...prev];

      [updated[index], updated[newIndex]] = [
        updated[newIndex],
        updated[index],
      ];

      return updated;
    });
  }

  // --------------------------------------------------
  // SELECTED SECTION
  // --------------------------------------------------

  const selectedSection =
    sections.find(
      (section) =>
        section.id === selectedSectionId
    ) || null;

  // --------------------------------------------------
  // SELECTED ELEMENT
  // --------------------------------------------------

  const selectedElement =
    selectedSection && selectedElementId
      ? (
          selectedSection.elements || []
        ).find(
          (element) =>
            element.id === selectedElementId
        ) || null
      : null;

  // --------------------------------------------------
  // PROVIDER
  // --------------------------------------------------

  return (
    <BuilderContext.Provider
      value={{
        // State
        sections,

        selectedId: selectedSectionId,
        selectedSectionId,
        selectedElementId,

        selectedSection,
        selectedElement,

        // Context menu
        contextMenu,

        // Section actions
        addSection,
        removeSection,
        updateSection,
        selectSection,
        moveSection,

        // Element actions
        selectElement,
        updateElement,
        deleteElement,
        duplicateElement,
        reorderElements,

        // Context menu actions
        openContextMenu,
        closeContextMenu,

        // Persistence
        pageId,
        pageName,
        setPageName,
        isLoading,
        saveStatus,
        saveCurrentPage,
        loadCurrentPage,

        // General
        clearSelection,
        setSections,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

// --------------------------------------------------
// HOOK
// --------------------------------------------------

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error(
      'useBuilder must be used inside <BuilderProvider>'
    );
  }

  return context;
}
