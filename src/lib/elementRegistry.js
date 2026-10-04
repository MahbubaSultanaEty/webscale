// lib/elementRegistry.js
// The master registry for all editable elements.
//
// Each element defines:
//  - label: display name in UI
//  - icon: Lucide React icon component for editor headers and badges
//  - component: React component that renders the element
//  - defaultContent: initial content data (text, URLs, etc.)
//  - defaultStyles: initial styling data (fontSize, colors, padding, etc.)
//  - fields: what controls appear in EditorPanel when this element is selected

import Heading from '@/components/elements/Heading/Heading';
import Paragraph from '@/components/elements/Paragraph/Paragraph';
import Button from '@/components/elements/Button/Button';
import Image from '@/components/elements/Image/Image';
import Card from '@/components/elements/Card/Card';

import {
  Gamepad2,
  Heading as HeadingIcon,
  Text,
  Image as ImageIcon,
  GalleryVertical,
} from 'lucide-react';

export const elementRegistry = {
  heading: {
    label: 'Heading',
    icon: HeadingIcon,
    component: Heading,

    defaultContent: {
      text: 'Build your website',
    },

    defaultStyles: {
      fontSize: 48,
      fontWeight: '700',
      color: '#111111',
      textAlign: 'center',
      marginBottom: 16,
    },

    fields: [
      { section: 'Content' },
      {
        group: 'content',
        key: 'text',
        label: 'Heading Text',
        type: 'text',
      },

      { section: 'Typography' },
      {
        group: 'styles',
        key: 'fontSize',
        label: 'Font Size (px)',
        type: 'slider',
        min: 18,
        max: 96,
      },
      {
        group: 'styles',
        key: 'fontWeight',
        label: 'Font Weight',
        type: 'select',
        options: ['400', '500', '600', '700', '800'],
      },
      {
        group: 'styles',
        key: 'textAlign',
        label: 'Alignment',
        type: 'select',
        options: ['left', 'center', 'right'],
      },

      { section: 'Color' },
      {
        group: 'styles',
        key: 'color',
        label: 'Text Color',
        type: 'color',
      },

      { section: 'Spacing' },
      {
        group: 'styles',
        key: 'marginBottom',
        label: 'Bottom Margin (px)',
        type: 'slider',
        min: 0,
        max: 64,
      },
    ],
  },

  paragraph: {
    label: 'Paragraph',
    icon: Text,
    component: Paragraph,

    defaultContent: {
      text: 'A fast, flexible visual builder for modern web pages.',
    },

    defaultStyles: {
      fontSize: 18,
      fontWeight: '400',
      color: '#4b5563',
      textAlign: 'center',
      marginBottom: 24,
      opacity: 0.9,
    },

    fields: [
      { section: 'Content' },
      {
        group: 'content',
        key: 'text',
        label: 'Paragraph Text',
        type: 'textarea',
      },

      { section: 'Typography' },
      {
        group: 'styles',
        key: 'fontSize',
        label: 'Font Size (px)',
        type: 'slider',
        min: 12,
        max: 36,
      },
      {
        group: 'styles',
        key: 'fontWeight',
        label: 'Font Weight',
        type: 'select',
        options: ['300', '400', '500', '600'],
      },
      {
        group: 'styles',
        key: 'textAlign',
        label: 'Alignment',
        type: 'select',
        options: ['left', 'center', 'right'],
      },

      { section: 'Color' },
      {
        group: 'styles',
        key: 'color',
        label: 'Text Color',
        type: 'color',
      },

      { section: 'Spacing' },
      {
        group: 'styles',
        key: 'marginBottom',
        label: 'Bottom Margin (px)',
        type: 'slider',
        min: 0,
        max: 64,
      },
    ],
  },

  button: {
    label: 'Button',
    icon: Gamepad2,
    component: Button,

    defaultContent: {
      text: 'Get Started',
      link: '#',
    },

    defaultStyles: {
      backgroundColor: '#16a34a',
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      borderRadius: 8,
      paddingX: 32,
      paddingY: 14,
    },

    fields: [
      { section: 'Content' },
      {
        group: 'content',
        key: 'text',
        label: 'Button Text',
        type: 'text',
      },
      {
        group: 'content',
        key: 'link',
        label: 'Button Link',
        type: 'text',
      },

      { section: 'Colors' },
      {
        group: 'styles',
        key: 'backgroundColor',
        label: 'Background Color',
        type: 'color',
      },
      {
        group: 'styles',
        key: 'color',
        label: 'Text Color',
        type: 'color',
      },

      { section: 'Style & Sizing' },
      {
        group: 'styles',
        key: 'borderRadius',
        label: 'Border Radius (px)',
        type: 'slider',
        min: 0,
        max: 40,
      },
      {
        group: 'styles',
        key: 'fontSize',
        label: 'Font Size (px)',
        type: 'slider',
        min: 12,
        max: 24,
      },
      {
        group: 'styles',
        key: 'fontWeight',
        label: 'Font Weight',
        type: 'select',
        options: ['400', '500', '600', '700'],
      },
      {
        group: 'styles',
        key: 'paddingX',
        label: 'Horizontal Padding (px)',
        type: 'slider',
        min: 10,
        max: 60,
      },
      {
        group: 'styles',
        key: 'paddingY',
        label: 'Vertical Padding (px)',
        type: 'slider',
        min: 6,
        max: 30,
      },
    ],
  },

  image: {
    label: 'Image',
    icon: ImageIcon,
    component: Image,

    defaultContent: {
      src: 'https://picsum.photos/seed/webscale/600/400',
      alt: 'Visual image',
    },

    defaultStyles: {
      width: '100%',
      maxWidth: '600px',
      borderRadius: 8,
      objectFit: 'cover',
      marginBottom: 0,
    },

    fields: [
      { section: 'Source' },
      {
        group: 'content',
        key: 'src',
        label: 'Image URL',
        type: 'text',
      },
      {
        group: 'content',
        key: 'alt',
        label: 'Alt Text',
        type: 'text',
      },

      { section: 'Appearance' },
      {
        group: 'styles',
        key: 'maxWidth',
        label: 'Max Width (px or %)',
        type: 'text',
      },
      {
        group: 'styles',
        key: 'borderRadius',
        label: 'Border Radius (px)',
        type: 'slider',
        min: 0,
        max: 40,
      },
      {
        group: 'styles',
        key: 'objectFit',
        label: 'Object Fit',
        type: 'select',
        options: ['cover', 'contain', 'fill'],
      },
      {
        group: 'styles',
        key: 'marginBottom',
        label: 'Bottom Margin (px)',
        type: 'slider',
        min: 0,
        max: 64,
      },
    ],
  },

  card: {
    label: 'Card',
    icon: GalleryVertical,
    component: Card,

    defaultContent: {
      icon: '⚡',
      title: 'Supercharged Performance',
      description: 'Built for speed and modern web experiences.',
    },

    defaultStyles: {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      borderColor: 'rgba(0, 0, 0, 0.08)',
      borderRadius: 12,
      padding: 24,
      textColor: '#111111',
      textAlign: 'left',
    },

    fields: [
      { section: 'Content' },
      {
        group: 'content',
        key: 'icon',
        label: 'Icon (Emoji)',
        type: 'text',
      },
      {
        group: 'content',
        key: 'title',
        label: 'Card Title',
        type: 'text',
      },
      {
        group: 'content',
        key: 'description',
        label: 'Card Description',
        type: 'textarea',
      },

      { section: 'Colors' },
      {
        group: 'styles',
        key: 'backgroundColor',
        label: 'Card Background',
        type: 'color',
      },
      {
        group: 'styles',
        key: 'borderColor',
        label: 'Border Color',
        type: 'color',
      },
      {
        group: 'styles',
        key: 'textColor',
        label: 'Text Color',
        type: 'color',
      },

      { section: 'Layout & Spacing' },
      {
        group: 'styles',
        key: 'borderRadius',
        label: 'Border Radius (px)',
        type: 'slider',
        min: 0,
        max: 32,
      },
      {
        group: 'styles',
        key: 'padding',
        label: 'Padding (px)',
        type: 'slider',
        min: 10,
        max: 50,
      },
      {
        group: 'styles',
        key: 'textAlign',
        label: 'Alignment',
        type: 'select',
        options: ['left', 'center', 'right'],
      },
    ],
  },
};