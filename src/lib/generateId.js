// lib/generateId.js
// Simple utility to create a unique ID for each section.
// We use this when adding a new section to the canvas.
// Example output: "section_k7f3m2"

export function generateId(prefix = 'section') {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}
