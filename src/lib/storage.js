// lib/storage.js
// Simple save/load using localStorage.
// The whole page schema is one JSON object stored under the key 'webscale_page'.
//
// Later you can replace this with an API call to a database — 
// just change these two functions and nothing else needs to change.

const STORAGE_KEY = 'webscale_page';

export function savePage(pageData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
  } catch (err) {
    console.error('Failed to save page:', err);
  }
}

export function loadPage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Failed to load page:', err);
    return null;
  }
}
