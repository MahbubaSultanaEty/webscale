
// components/elements/Card/Card.jsx
// Reusable card element (often used in features, testimonials, info boxes).
// Receives content (icon, title, description) and styles (backgroundColor, padding, borderRadius, etc.)

'use client';

import { iconMap } from '@/lib/iconMap';

export function Card({ content = {}, styles = {} }) {
  const {
    icon = '⚡',
    title = 'Feature Title',
    description = 'Highlight key benefits and descriptions here.',
  } = content;

  const {
    backgroundColor = 'rgba(0, 0, 0, 0.03)',
    borderColor = 'rgba(0, 0, 0, 0.08)',
    borderRadius = 12,
    padding = 24,
    textColor = 'inherit',
    textAlign = 'left',
  } = styles;

  // Render icon safely: supports Lucide icon name strings, emojis, or component objects
  function renderIcon() {
    if (!icon) return null;

    if (typeof icon === 'string') {
      const LucideIcon = iconMap[icon];
      if (LucideIcon) {
        return <LucideIcon size={32} strokeWidth={2} />;
      }
      return icon; // Emoji or text string
    }

    if (typeof icon === 'function') {
      const CustomIcon = icon;
      return <CustomIcon size={32} strokeWidth={2} />;
    }

    return null;
  }

  return (
    <div
      style={{
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius:
          typeof borderRadius === 'number'
            ? `${borderRadius}px`
            : borderRadius,
        padding:
          typeof padding === 'number'
            ? `${padding}px`
            : padding,
        color: textColor,
        textAlign,
        boxSizing: 'border-box',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {icon && (
        <div
          style={{
            fontSize: '2rem',
            marginBottom: '0.75rem',
            lineHeight: 1,
          }}
        >
          {renderIcon()}
        </div>
      )}

      {title && (
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            margin: '0 0 0.5rem 0',
          }}
        >
          {title}
        </h3>
      )}

      {description && (
        <p
          style={{
            fontSize: '0.92rem',
            opacity: 0.75,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default Card;
