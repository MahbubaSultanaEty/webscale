// lib/sectionRegistry.js
// This is the "master list" of all available section types.
// When you want to add a new section to the builder, you register it here.
//
// Each entry maps a type name (e.g. "Hero") to:
//  - label:        displayed in the sidebar
//  - icon:         emoji shown in the section picker
//  - defaultProps: the starting values when a new section is added
//  - fields:       what controls appear in the EditorPanel for this section
//
// Field types supported: 'text', 'color', 'select', 'slider', 'image', 'textarea'

import { Hero } from '@/components/sections/Hero/Hero';
import { FAQ } from '@/components/sections/FAQ/FAQ';
import { Gallery } from '@/components/sections/Gallery/Gallery';
import { Features } from '@/components/sections/Features/Features';
import { Testimonials } from '@/components/sections/Testimonials/Testimonials';
import { CTABanner } from '@/components/sections/CTABanner/CTABanner';

export const sectionRegistry = {
  Hero: {
    label: 'Hero Section',
    icon: '🚀',
    component: Hero,
    defaultProps: {
      heading: 'Build Something Amazing',
      subheading: 'A fast and flexible visual builder for modern websites.',
      buttonText: 'Get Started',
      buttonLink: '#',
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff',
      headingSize: '52px',
      headingWeight: '700',
      subheadingSize: '18px',
      textAlign: 'center',
      paddingTop: '80',
      paddingBottom: '80',
      buttonBg: '#6c63ff',
      buttonColor: '#ffffff',
      buttonRadius: '8',
    },
    fields: [
      { section: 'Content' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'subheading', label: 'Subheading', type: 'textarea' },
      { key: 'buttonText', label: 'Button Text', type: 'text' },
      { key: 'buttonLink', label: 'Button Link', type: 'text' },
      { section: 'Typography' },
      { key: 'headingSize', label: 'Heading Size (px)', type: 'slider', min: 24, max: 96 },
      { key: 'headingWeight', label: 'Heading Weight', type: 'select', options: ['400', '500', '600', '700', '800'] },
      { key: 'subheadingSize', label: 'Subheading Size (px)', type: 'slider', min: 14, max: 36 },
      { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
      { section: 'Colors' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Button' },
      { key: 'buttonBg', label: 'Button Background', type: 'color' },
      { key: 'buttonColor', label: 'Button Text Color', type: 'color' },
      { key: 'buttonRadius', label: 'Border Radius (px)', type: 'slider', min: 0, max: 50 },
      { section: 'Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  Features: {
    label: 'Features',
    icon: '✨',
    component: Features,
    defaultProps: {
      heading: 'Why Choose Us',
      subheading: 'Everything you need to build and ship faster.',
      backgroundColor: '#ffffff',
      textColor: '#111111',
      textAlign: 'center',
      paddingTop: '80',
      paddingBottom: '80',
      columns: '3',
      items: [
        { icon: '⚡', title: 'Fast', description: 'Optimized for speed and performance.' },
        { icon: '🎨', title: 'Beautiful', description: 'Stunning designs out of the box.' },
        { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built in.' },
      ],
    },
    fields: [
      { section: 'Content' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'subheading', label: 'Subheading', type: 'textarea' },
      { section: 'Layout' },
      { key: 'columns', label: 'Columns', type: 'select', options: ['2', '3', '4'] },
      { key: 'textAlign', label: 'Align', type: 'select', options: ['left', 'center'] },
      { section: 'Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  Testimonials: {
    label: 'Testimonials',
    icon: '💬',
    component: Testimonials,
    defaultProps: {
      heading: 'What People Say',
      backgroundColor: '#f9f9f9',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
      items: [
        { name: 'Sarah K.', role: 'CEO, Acme Corp', text: 'Absolutely love this tool. Saved us weeks of work!' },
        { name: 'James L.', role: 'Designer', text: 'The best visual builder I have ever used. Period.' },
        { name: 'Maria T.', role: 'Startup Founder', text: 'Launched our landing page in an afternoon. Incredible.' },
      ],
    },
    fields: [
      { section: 'Content' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { section: 'Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  FAQ: {
    label: 'FAQ',
    icon: '❓',
    component: FAQ,
    defaultProps: {
      heading: 'Frequently Asked Questions',
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
      items: [
        { question: 'Is this free to use?', answer: 'Yes! The basic plan is completely free.' },
        { question: 'Do I need to know how to code?', answer: 'No coding required at all.' },
        { question: 'Can I export my site?', answer: 'Yes, you can export clean HTML/CSS anytime.' },
      ],
    },
    fields: [
      { section: 'Content' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { section: 'Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  Gallery: {
    label: 'Gallery',
    icon: '🖼️',
    component: Gallery,
    defaultProps: {
      heading: 'Our Gallery',
      backgroundColor: '#ffffff',
      textColor: '#111111',
      paddingTop: '80',
      paddingBottom: '80',
      columns: '3',
      borderRadius: '8',
      items: [
        { src: 'https://picsum.photos/seed/1/600/400', alt: 'Gallery image 1' },
        { src: 'https://picsum.photos/seed/2/600/400', alt: 'Gallery image 2' },
        { src: 'https://picsum.photos/seed/3/600/400', alt: 'Gallery image 3' },
        { src: 'https://picsum.photos/seed/4/600/400', alt: 'Gallery image 4' },
        { src: 'https://picsum.photos/seed/5/600/400', alt: 'Gallery image 5' },
        { src: 'https://picsum.photos/seed/6/600/400', alt: 'Gallery image 6' },
      ],
    },
    fields: [
      { section: 'Content' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { section: 'Layout' },
      { key: 'columns', label: 'Columns', type: 'select', options: ['2', '3', '4'] },
      { key: 'borderRadius', label: 'Image Radius (px)', type: 'slider', min: 0, max: 32 },
      { section: 'Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { section: 'Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },

  CTABanner: {
    label: 'CTA Banner',
    icon: '📣',
    component: CTABanner,
    defaultProps: {
      heading: 'Ready to get started?',
      subheading: 'Join thousands of users building with WebScale today.',
      buttonText: 'Start for Free',
      buttonLink: '#',
      backgroundColor: '#6c63ff',
      textColor: '#ffffff',
      buttonBg: '#ffffff',
      buttonColor: '#6c63ff',
      buttonRadius: '8',
      paddingTop: '80',
      paddingBottom: '80',
    },
    fields: [
      { section: 'Content' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'subheading', label: 'Subheading', type: 'textarea' },
      { key: 'buttonText', label: 'Button Text', type: 'text' },
      { key: 'buttonLink', label: 'Button Link', type: 'text' },
      { section: 'Colors' },
      { key: 'backgroundColor', label: 'Background', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'buttonBg', label: 'Button Background', type: 'color' },
      { key: 'buttonColor', label: 'Button Text Color', type: 'color' },
      { key: 'buttonRadius', label: 'Button Radius (px)', type: 'slider', min: 0, max: 50 },
      { section: 'Spacing' },
      { key: 'paddingTop', label: 'Padding Top (px)', type: 'slider', min: 0, max: 200 },
      { key: 'paddingBottom', label: 'Padding Bottom (px)', type: 'slider', min: 0, max: 200 },
    ],
  },
};
