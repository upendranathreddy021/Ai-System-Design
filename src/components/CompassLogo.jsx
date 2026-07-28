import React from 'react';

export const CompassLogo = ({ size = 'md', className = '', showText = true }) => {
  const iconPx = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
  const containerPx = size === 'sm' ? 32 : size === 'lg' ? 56 : 44;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <div
        className="neu-button"
        style={{
          width: `${containerPx}px`,
          height: `${containerPx}px`,
          borderRadius: size === 'lg' ? '18px' : '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4f46e5',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Architectural Compass Icon */}
          <path d="M12 2v4" />
          <path d="M12 6L6 20" />
          <path d="M12 6l6 14" />
          <path d="M8 15h8" />
          <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {showText && (
        <span
          style={{
            fontWeight: 800,
            fontSize: '1.5rem',
            letterSpacing: '-0.025em',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          SystemDesign<span style={{ color: '#4f46e5' }}>.ai</span>
        </span>
      )}
    </div>
  );
};
