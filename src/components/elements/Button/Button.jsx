// components/elements/Button/Button.jsx
// Reusable button/link element.
// Receives content (text, link) and styles (backgroundColor, color, borderRadius, etc.)

'use client';

export function Button({ content = {}, styles = {} }) {
  const { text = 'Click Here', link = '#' } = content;
  const {
    backgroundColor = '#6c63ff',
    color = '#ffffff',
    fontSize = 16,
    fontWeight = '600',
    borderRadius = 8,
    paddingX = 28,
    paddingY = 12,
  } = styles;

  return (
    <a
      href={link || '#'}
      onClick={(e) => {
        // Prevent accidental link navigation while in visual editor
        if (link === '#' || !link) {
          e.preventDefault();
        }
      }}
      style={{
        display: 'inline-block',
        backgroundColor,
        color,
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        fontWeight,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        padding: `${paddingY}px ${paddingX}px`,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, opacity 0.15s ease',
        boxSizing: 'border-box',
      }}
    >
      {text}
    </a>
  );
}

export default Button;
