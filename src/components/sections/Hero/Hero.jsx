// components/sections/Hero/Hero.jsx
// The Hero section component.
// Receives all its visual properties as props — no internal state needed.
// The builder controls these props from outside via the EditorPanel.

'use client';

export function Hero({
  heading,
  subheading,
  buttonText,
  buttonLink,
  backgroundColor,
  textColor,
  headingSize,
  headingWeight,
  subheadingSize,
  textAlign,
  paddingTop,
  paddingBottom,
  buttonBg,
  buttonColor,
  buttonRadius,
}) {
  return (
    <section
      style={{
        backgroundColor,
        color: textColor,
        paddingTop,
        paddingBottom,
        textAlign,
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <h1
          style={{
            fontSize: headingSize,
            fontWeight: headingWeight,
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}
        >
          {heading}
        </h1>

        <p
          style={{
            fontSize: subheadingSize,
            opacity: 0.85,
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          {subheading}
        </p>

        {buttonText && (
          <a
            href={buttonLink || '#'}
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: buttonBg,
              color: buttonColor,
              borderRadius: buttonRadius ? `${parseInt(buttonRadius)}px` : '8px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
