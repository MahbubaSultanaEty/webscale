// layout.js — The root layout wraps EVERY page in the app.
// It loads the font and applies global styles.
// Since this is a Server Component (no 'use client'), it renders on the server.

import './globals.css';

export const metadata = {
  title: 'WebScale — Visual Website Builder',
  description: 'Build beautiful websites visually, no code required.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
