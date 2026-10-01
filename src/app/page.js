// app/page.js — The home/dashboard page (route: /)
// This is a Server Component. It just renders a link to the builder.
// Later we can expand this to list saved pages.

import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.badge}>Visual Website Builder</div>
        <h1 className={styles.title}>
          Build pages.<br />Ship fast.
        </h1>
        <p className={styles.subtitle}>
          Drag, drop, and customize sections to build your perfect website — no code needed.
        </p>
        <Link href="/builder" className={styles.ctaButton} id="open-builder-btn">
          Open Builder →
        </Link>
      </div>
    </main>
  );
}
