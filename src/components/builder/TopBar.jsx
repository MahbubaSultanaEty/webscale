// components/builder/TopBar.jsx
// The top bar of the builder — shows page title and Save button.

'use client';

import Link from 'next/link';
import { useBuilder } from '@/context/BuilderContext';
import { savePage, loadPage } from '@/lib/storage';
import styles from './TopBar.module.css';

export default function TopBar() {
  const { sections, setSections } = useBuilder();

  function handleSave() {
    savePage({ sections });
    alert('Page saved!');
  }

  function handleLoad() {
    const page = loadPage();
    if (page) {
      setSections(page.sections);
      alert('Page loaded!');
    } else {
      alert('No saved page found.');
    }
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>⚡ WebScale</Link>
        <span className={styles.separator}>|</span>
        <span className={styles.pageLabel}>Page Builder</span>
      </div>

      <div className={styles.right}>
        <span className={styles.sectionCount}>{sections.length} section{sections.length !== 1 ? 's' : ''}</span>
        <button onClick={handleLoad} className={styles.loadBtn} id="load-page-btn">Load</button>
        <button onClick={handleSave} className={styles.saveBtn} id="save-page-btn">Save Page</button>
      </div>
    </header>
  );
}
