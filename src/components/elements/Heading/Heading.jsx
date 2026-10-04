// components/elements/Heading/Heading.jsx
// Reusable heading element.
// Receives content (text) and styles (fontSize, color, textAlign, etc.)

'use client';

export function Heading({ content = {}, styles = {} }) {
  const { text = 'Heading Text' } = content;
  const {
    fontSize = 36,
    fontWeight = '700',
    color = '#111111',
    textAlign = 'left',
    marginBottom = 16,
    lineHeight = 1.2,
  } = styles;

  return (
    <h2
      style={{
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        fontWeight,
        color,
        textAlign,
        marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
        lineHeight,
        margin: 0,
        marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
      }}
    >
      {text}
    </h2>
  );
}

export default Heading;
