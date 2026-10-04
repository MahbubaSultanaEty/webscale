// lib/sectionRegistry.js
// Master registry of section templates.
//
// In this new architecture, sections are compositions of reusable elements!
// Each section template defines:
//  - label: display name in sidebar
//  - icon: emoji shown in picker
//  - component: React section component
//  - defaultStyles: section container styles (background, padding, etc.)
//  - createDefaultElements(): creates fresh, editable elements with unique IDs
//  - fields: controls shown in EditorPanel when the section itself is selected

import { Hero } from '@/components/sections/Hero/Hero';
import { FAQ } from '@/components/sections/FAQ/FAQ';
import { Gallery } from '@/components/sections/Gallery/Gallery';
import { Features } from '@/components/sections/Features/Features';
import { Testimonials } from '@/components/sections/Testimonials/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner/CTABanner';
import { generateId } from '@/lib/generateId';
import { MessageSquareDotIcon, Sparkles, ScanText, ImageIcon, Megaphone, ShieldQuestionMark } from 'lucide-react';

export const sectionRegistry = {
  Hero: {
    label: 'Hero Section',
    icon: ScanText,
    component: Hero,
    defaultStyles: {
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff',
      paddingTop: 80,
      paddingBottom: 80,
    },
    defaultProps: {
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff',
      paddingTop: '80',
      paddingBottom: '80',
    },
    createDefaultElements: () => [
      {
        id: generateId('el'),
        type: 'heading',
        content: {
          text: 'Build Something Amazing',
        },
        styles: {
          fontSize: 52,
          fontWeight: '700',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: 16,
        },
      },
      {
        id: generateId('el'),
        type: 'paragraph',
        content: {
          text: 'A fast, flexible visual builder for modern websites. Click any element to edit it.',
        },
        styles: {
          fontSize: 18,
          fontWeight: '400',
          color: '#cbd5e1',
          textAlign: 'center',
          marginBottom: 32,
        },
      },
      {
        id: generateId('el'),
        type: 'button',
        content: {
          text: 'Get Started',
          link: '#',
        },
        styles: {
          backgroundColor: '#6c63ff',
          color: '#ffffff',
          borderRadius: 8,
          paddingX: 32,
          paddingY: 14,
          fontSize: 16,
          fontWeight: '600',
        },
      },
    ],
    fields: [
      { section: 'Section Background' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Default Text Color', type: 'color' },
      { section: 'Section Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  Features: {
    label: 'Features',
    icon: Sparkles,
    component: Features,
    defaultStyles: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: 80,
      paddingBottom: 80,
      columns: '3',
    },
    defaultProps: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
      columns: '3',
    },
    createDefaultElements: () => [
      {
        id: generateId('el'),
        type: 'heading',
        content: {
          text: 'Why Choose Us',
        },
        styles: {
          fontSize: 36,
          fontWeight: '700',
          color: '#111111',
          textAlign: 'center',
          marginBottom: 12,
        },
      },
      {
        id: generateId('el'),
        type: 'paragraph',
        content: {
          text: 'Everything you need to build and ship high-converting pages faster.',
        },
        styles: {
          fontSize: 18,
          fontWeight: '400',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: 0,
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'Flame',
          title: 'Lightning Fast',
          description: 'Optimized for speed and fluid performance on every screen.',
        },
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 12,
          padding: 24,
          textColor: '#111111',
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'Palette',
          title: 'Visual Editing',
          description: 'Click any element to instantly customize text, colors, and layout.',
        },
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 12,
          padding: 24,
          textColor: '#111111',
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'Lock',
          title: 'Production Ready',
          description: 'Clean JavaScript architecture designed to scale with your project.',
        },
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 12,
          padding: 24,
          textColor: '#111111',
        },
      },
    ],
    fields: [
      { section: 'Section Layout' },
      { key: 'columns', label: 'Columns', type: 'select', options: ['2', '3', '4'] },
      { section: 'Section Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Section Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  Testimonials: {
    label: 'Testimonials',
    icon: MessageSquareDotIcon,
    component: Testimonials,
    defaultStyles: {
      backgroundColor: '#f9f9f9',
      textColor: '#111111',
      paddingTop: 80,
      paddingBottom: 80,
    },
    defaultProps: {
      backgroundColor: '#f9f9f9',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
    },
    createDefaultElements: () => [
      {
        id: generateId('el'),
        type: 'heading',
        content: {
          text: 'Loved by Creators',
        },
        styles: {
          fontSize: 36,
          fontWeight: '700',
          color: '#111111',
          textAlign: 'center',
          marginBottom: 16,
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'Star',
          title: 'Sarah K. — CEO',
          description: 'WebScale saved us weeks of design and development work. The element-level editing is phenomenal.',
        },
        styles: {
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
          borderRadius: 12,
          padding: 24,
          textColor: '#111111',
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: '⭐️⭐️⭐️⭐️⭐️',
          title: 'James L. — Lead Designer',
          description: 'The best visual builder I have used. Being able to click every element makes all the difference.',
        },
        styles: {
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
          borderRadius: 12,
          padding: 24,
          textColor: '#111111',
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: '⭐️⭐️⭐️⭐️⭐️',
          title: 'Maria T. — Startup Founder',
          description: 'Launched our high-converting landing page in a single afternoon. Amazing tool!',
        },
        styles: {
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
          borderRadius: 12,
          padding: 24,
          textColor: '#111111',
        },
      },
    ],
    fields: [
      { section: 'Section Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Section Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  FAQ: {
    label: 'FAQ',
    icon: ShieldQuestionMark,
    component: FAQ,
    defaultStyles: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: 80,
      paddingBottom: 80,
    },
    defaultProps: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
    },
    createDefaultElements: () => [
      {
        id: generateId('el'),
        type: 'heading',
        content: {
          text: 'Frequently Asked Questions',
        },
        styles: {
          fontSize: 36,
          fontWeight: '700',
          color: '#111111',
          textAlign: 'center',
          marginBottom: 16,
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'CreditCard',
          title: 'Is WebScale free to use?',
          description: 'Yes! The starter plan gives you complete access to visual page building.',
        },
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 10,
          padding: 20,
          textColor: '#111111',
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'Rocket',
          title: 'Do I need to know how to code?',
          description: 'No coding required at all. Click any element on canvas to customize it.',
        },
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 10,
          padding: 20,
          textColor: '#111111',
        },
      },
      {
        id: generateId('el'),
        type: 'card',
        content: {
          icon: 'Package',
          title: 'Can I export my designs?',
          description: 'Yes, your page schema is stored as clean JSON and can be saved or loaded anytime.',
        },
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 10,
          padding: 20,
          textColor: '#111111',
        },
      },
    ],
    fields: [
      { section: 'Section Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Section Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  Gallery: {
    label: 'Gallery',
    icon: ImageIcon,
    component: Gallery,
    defaultStyles: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: 80,
      paddingBottom: 80,
      columns: '3',
    },
    defaultProps: {
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
      columns: '3',
    },
    createDefaultElements: () => [
      {
        id: generateId('el'),
        type: 'heading',
        content: {
          text: 'Our Gallery',
        },
        styles: {
          fontSize: 36,
          fontWeight: '700',
          color: '#111111',
          textAlign: 'center',
          marginBottom: 16,
        },
      },
      {
        id: generateId('el'),
        type: 'image',
        content: {
          src: 'https://picsum.photos/seed/gallery1/600/400',
          alt: 'Gallery image 1',
        },
        styles: {
          width: '100%',
          borderRadius: 8,
          objectFit: 'cover',
        },
      },
      {
        id: generateId('el'),
        type: 'image',
        content: {
          src: 'https://picsum.photos/seed/gallery2/600/400',
          alt: 'Gallery image 2',
        },
        styles: {
          width: '100%',
          borderRadius: 8,
          objectFit: 'cover',
        },
      },
      {
        id: generateId('el'),
        type: 'image',
        content: {
          src: 'https://picsum.photos/seed/gallery3/600/400',
          alt: 'Gallery image 3',
        },
        styles: {
          width: '100%',
          borderRadius: 8,
          objectFit: 'cover',
        },
      },
      {
        id: generateId('el'),
        type: 'image',
        content: {
          src: 'https://picsum.photos/seed/gallery4/600/400',
          alt: 'Gallery image 4',
        },
        styles: {
          width: '100%',
          borderRadius: 8,
          objectFit: 'cover',
        },
      },
      {
        id: generateId('el'),
        type: 'image',
        content: {
          src: 'https://picsum.photos/seed/gallery5/600/400',
          alt: 'Gallery image 5',
        },
        styles: {
          width: '100%',
          borderRadius: 8,
          objectFit: 'cover',
        },
      },
      {
        id: generateId('el'),
        type: 'image',
        content: {
          src: 'https://picsum.photos/seed/gallery6/600/400',
          alt: 'Gallery image 6',
        },
        styles: {
          width: '100%',
          borderRadius: 8,
          objectFit: 'cover',
        },
      },
    ],
    fields: [
      { section: 'Section Layout' },
      { key: 'columns', label: 'Columns', type: 'select', options: ['2', '3', '4'] },
      { section: 'Section Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Section Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  CTABanner: {
    label: 'CTA Banner',
    icon: Megaphone,
    component: CTABanner,
    defaultStyles: {
      backgroundColor: '#6c63ff',
      textColor: '#ffffff',
      paddingTop: 80,
      paddingBottom: 80,
    },
    defaultProps: {
      backgroundColor: '#6c63ff',
      textColor: '#ffffff',
      paddingTop: '80',
      paddingBottom: '80',
    },
    createDefaultElements: () => [
      {
        id: generateId('el'),
        type: 'heading',
        content: {
          text: 'Ready to get started?',
        },
        styles: {
          fontSize: 40,
          fontWeight: '700',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: 16,
        },
      },
      {
        id: generateId('el'),
        type: 'paragraph',
        content: {
          text: 'Join thousands of users building with WebScale today.',
        },
        styles: {
          fontSize: 18,
          fontWeight: '400',
          color: '#f8fafc',
          textAlign: 'center',
          marginBottom: 32,
        },
      },
      {
        id: generateId('el'),
        type: 'button',
        content: {
          text: 'Start for Free',
          link: '#',
        },
        styles: {
          backgroundColor: '#ffffff',
          color: '#6c63ff',
          borderRadius: 8,
          paddingX: 36,
          paddingY: 14,
          fontSize: 16,
          fontWeight: '700',
        },
      },
    ],
    fields: [
      { section: 'Section Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Section Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },
};
