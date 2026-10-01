// app/builder/page.js — The builder route (/builder)
// This just renders the BuilderLayout component.
// We mark it 'use client' because the entire builder needs interactivity.

'use client';

import BuilderLayout from '@/components/builder/BuilderLayout';
import { BuilderProvider } from '@/context/BuilderContext';

export default function BuilderPage() {
  return (
    // BuilderProvider wraps the whole builder so all child components
    // can access and modify the page state via useBuilder() hook.
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  );
}
