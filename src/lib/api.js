// lib/api.js
// Client API utility for communicating with the WebScale Express + MongoDB backend

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all pages from MongoDB
 * @returns {Promise<Array>} List of pages
 */
export async function getPages() {
  const res = await fetch(`${API_BASE_URL}/pages`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch pages (HTTP ${res.status})`
    );
  }

  const result = await res.json();
  return result.data || [];
}

/**
 * Fetch a single page by its MongoDB _id
 * @param {string} id - The MongoDB _id of the page
 * @returns {Promise<Object>} The page document
 */
export async function getPage(id) {
  const res = await fetch(`${API_BASE_URL}/pages/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch page (HTTP ${res.status})`
    );
  }

  const result = await res.json();
  return result.data;
}

/**
 * Create a new page in MongoDB
 * @param {Object} pageData - { name, sections }
 * @returns {Promise<Object>} The created page document
 */
export async function createPage(pageData) {
  const res = await fetch(`${API_BASE_URL}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to create page (HTTP ${res.status})`
    );
  }

  const result = await res.json();
  return result.data;
}

/**
 * Update an existing page in MongoDB
 * @param {string} id - The MongoDB _id of the page
 * @param {Object} pageData - Updated page fields (name, sections)
 * @returns {Promise<Object>} The updated page document
 */
export async function updatePage(id, pageData) {
  const res = await fetch(`${API_BASE_URL}/pages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pageData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to update page (HTTP ${res.status})`
    );
  }

  const result = await res.json();
  return result.data;
}

/**
 * Delete a page by its MongoDB _id
 * @param {string} id - The MongoDB _id of the page
 * @returns {Promise<Object>} The deleted page document
 */
export async function deletePage(id) {
  const res = await fetch(`${API_BASE_URL}/pages/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to delete page (HTTP ${res.status})`
    );
  }

  const result = await res.json();
  return result.data;
}

/**
 * Check if the backend API is up and healthy
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}
