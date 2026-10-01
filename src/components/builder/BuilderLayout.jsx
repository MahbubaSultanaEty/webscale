// components/builder/BuilderLayout.jsx
// The master layout of the builder.
// It arranges the three panels: Sidebar | Canvas | EditorPanel
// Think of it as the shell that holds everything together.

'use client';

import Sidebar from './Sidebar';
import Canvas from './Canvas';
import EditorPanel from './EditorPanel';
import TopBar from './TopBar';
import styles from './BuilderLayout.module.css';

export default function BuilderLayout() {
  return (
    <div className={styles.wrapper}>
      <TopBar />
      <div className={styles.body}>
        <Sidebar />
        <Canvas />
        <EditorPanel />
      </div>
    </div>
  );
}
