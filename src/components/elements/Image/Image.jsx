// components/elements/Image/Image.jsx
// Reusable image element.
// Receives content (src, alt) and styles (width, maxWidth, borderRadius, etc.)

'use client';

export function Image({ content = {}, styles = {} }) {
  const {
    src = 'https://picsum.photos/seed/webscale/600/400',
    alt = 'Visual element',
  } = content;

  const {
    width = '100%',
    maxWidth = '100%',
    height = 'auto',
    borderRadius = 8,
    objectFit = 'cover',
    aspectRatio = 'auto',
    marginBottom = 0,
  } = styles;

  return (
    <img
      src={src}
      alt={alt}
      style={{
        display: 'block',
        width: typeof width === 'number' ? `${width}px` : width,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        objectFit,
        aspectRatio,
        marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
      }}
    />
  );
}

export default Image;
