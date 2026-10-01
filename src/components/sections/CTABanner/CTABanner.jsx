// components/sections/CTABanner/CTABanner.jsx

'use client';

export function CTABanner({
  heading,
  subheading,
  buttonText,
  buttonLink,
  backgroundColor,
  textColor,
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
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem' }}>
          {heading}
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '2rem', lineHeight: 1.6 }}>
          {subheading}
        </p>
        {buttonText && (
          <a
            href={buttonLink || '#'}
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              backgroundColor: buttonBg,
              color: buttonColor,
              borderRadius: buttonRadius ? `${parseInt(buttonRadius)}px` : '8px',
              fontWeight: 700,
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
