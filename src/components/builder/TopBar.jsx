// components/builder/TopBar.jsx
// The top bar of the builder — shows page title and Save button.

'use client';

import Link from 'next/link';
import { useBuilder } from '@/context/BuilderContext';
import styles from './TopBar.module.css';

export default function TopBar() {
  const {
    sections,
    pageName,
    isLoading,
    saveStatus,
    saveCurrentPage,
    loadCurrentPage,
  } = useBuilder();

  async function handleSave() {
    try {
      await saveCurrentPage();
      alert('Page saved to database!');
    } catch {
      alert('Failed to save page to database.');
    }
  }

  async function handleLoad() {
    try {
      const page = await loadCurrentPage();
      if (page) {
        alert('Page loaded from database!');
      } else {
        alert('No saved page found.');
      }
    } catch {
      alert('Failed to load page from database.');
    }
  }

  // Determine status badge text and class
  let statusText = '';
  let statusClass = '';
  if (saveStatus === 'saving') {
    statusText = 'Saving...';
    statusClass = styles.statusSaving;
  } else if (saveStatus === 'saved') {
    statusText = 'Saved ✓';
    statusClass = styles.statusSaved;
  } else if (saveStatus === 'error') {
    statusText = 'Save failed';
    statusClass = styles.statusError;
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>⚡ WebScale</Link>
        <span className={styles.separator}>|</span>
        <span className={styles.pageLabel}>{pageName || 'Page Builder'}</span>
      </div>

      <div className={styles.right}>
        {statusText && (
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {statusText}
          </span>
        )}
        <span className={styles.sectionCount}>{sections.length} section{sections.length !== 1 ? 's' : ''}</span>
        <button
          onClick={handleLoad}
          disabled={isLoading}
          className={styles.loadBtn}
          id="load-page-btn"
        >
          Load
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading || saveStatus === 'saving'}
          className={styles.saveBtn}
          id="save-page-btn"
        >
          {saveStatus === 'saving' ? 'Saving...' : 'Save Page'}
        </button>
      </div>
    </header>
  );
}
