// components/diagram/EdgeDetailsPanel.jsx
import React from 'react';
import { X } from 'lucide-react';

export default function EdgeDetailsPanel({ edge, onClose }) {
  const { source, target, protocol, communication, description, dataFormat, failureBehavior } = edge;

  return (
    <div
      className="neu-raised-lg"
      style={{
        position: 'absolute', top: 0, right: 0, width: '320px', height: '100%',
        padding: '1.5rem', overflowY: 'auto', zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>
          {source} → {target}
        </h3>
        <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={18} /></button>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <span className="neu-pill" style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', color: '#4f46e5' }}>{protocol}</span>
        <span className="neu-pill" style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', color: communication === 'asynchronous' ? '#f59e0b' : '#10b981' }}>
          {communication}
        </span>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '1rem' }}>{description}</p>

      {dataFormat && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Data Format</div>
          <div style={{ fontSize: '0.8rem', color: '#334155' }}>{dataFormat}</div>
        </div>
      )}
      {failureBehavior && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Failure Behavior</div>
          <div style={{ fontSize: '0.8rem', color: '#334155' }}>{failureBehavior}</div>
        </div>
      )}
    </div>
  );
}