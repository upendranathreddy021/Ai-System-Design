import React from 'react';

const MODES = ['beginner', 'intermediate', 'advanced'];

export default function ExplainMode({ mode, onChange }) {
  return (
    <div
      className="neu-inset d-flex w-100"
      style={{ padding: '0.25rem', borderRadius: '12px', gap: '0.2rem' }}
    >
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`flex-fill text-truncate ${mode === m ? 'neu-button-active' : ''}`}
          style={{
            padding: '0.4rem 0.4rem',
            borderRadius: '9px',
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'capitalize',
            color: mode === m ? '#4f46e5' : '#64748b',
            minWidth: 0, // required for flex-fill + text-truncate to actually shrink
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}