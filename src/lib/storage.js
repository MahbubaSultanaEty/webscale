// lib/storage.js
// Persistence layer that connects to the backend API with localStorage backup support.
// This preserves backwards compatibility while routing persistence to MongoDB.

import * as api from './api';

const STORAGE_KEY = 'webscale_page';

// Re-export core API functions for convenience
export const { createPage, getPage, updatePage, deletePage, getPages } = api;

// Local storage backup utilities
export function savePageToLocalStorage(pageData) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
    }
  } catch (err) {
    console.error('Failed to save page to localStorage:', err);
  }
}

export function loadPageFromLocalStorage() {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    }
    return null;
  } catch (err) {
    console.error('Failed to load page from localStorage:', err);
    return null;
  }
}

// Backwards-compatible savePage: updates MongoDB via API and keeps a local backup
export async function savePage(pageData, pageId) {
  savePageToLocalStorage(pageData);

  if (pageId) {
    try {
      return await api.updatePage(pageId, pageData);
    } catch (err) {
      console.error('Failed to persist page to API:', err);
    }
  }
  return null;
}

// Backwards-compatible loadPage: loads from MongoDB via API, with fallback to localStorage
export async function loadPage(pageId) {
  if (pageId) {
    try {
      const page = await api.getPage(pageId);
      if (page) return page;
    } catch (err) {
      console.warn('Failed to load page from API, falling back to localStorage:', err);
    }
  }
  return loadPageFromLocalStorage();
}
