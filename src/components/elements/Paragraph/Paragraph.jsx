// components/elements/Paragraph/Paragraph.jsx
// Reusable paragraph element.
// Receives content (text) and styles (fontSize, color, textAlign, etc.)

'use client';

export function Paragraph({ content = {}, styles = {} }) {
  const { text = 'Add your description or text here...' } = content;
  const {
    fontSize = 16,
    fontWeight = '400',
    color = '#4b5563',
    textAlign = 'left',
    lineHeight = 1.6,
    marginBottom = 16,
    opacity = 1,
  } = styles;

  return (
    <p
      style={{
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        fontWeight,
        color,
        textAlign,
        lineHeight,
        opacity,
        margin: 0,
        marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
      }}
    >
      {text}
    </p>
  );
}

export default Paragraph;
