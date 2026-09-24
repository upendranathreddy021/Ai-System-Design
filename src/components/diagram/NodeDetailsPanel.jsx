import React from 'react';
import { X } from 'lucide-react';

export default function NodeDetailsPanel({ node, mode, onClose }) {
  const { name, technology, description, details, learning } = node;

  if (mode === 'beginner') {
    const rows = [
      ['What is it?', learning.whatIsIt],
      ['Why do we need it?', learning.whyNeeded],
      ['What does it do?', learning.whatItDoes],
      ['What data does it store?', learning.dataStored?.join(', ')],
      ['Simple example', learning.simpleExample],
      ['How it works', learning.howItWorks?.join(' → ')],
    ].filter(([, v]) => v);

    return (
      <div className="neu-raised-lg" style={{ position: 'absolute', top: 0, right: 0, width: '340px', height: '100%', padding: '1.5rem', overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b' }}>{name}</h3>
          <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={18} /></button>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {rows.map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8' }}>{label}</div>
              <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>{value}</div>
            </div>
          ))}
        </div>

        <div
          className="neu-inset"
          style={{ marginTop: '1.25rem', padding: '0.9rem 1rem', borderRadius: '12px', borderLeft: '3px solid #4f46e5' }}
        >
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase' }}>Beginner takeaway</div>
          <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.3rem' }}>{learning.beginnerTakeaway}</div>
        </div>
      </div>
    );
  }

  // intermediate + advanced fall back to your existing technical details view
  const rows = [
    ['Purpose', details.purpose],
    ['Why', details.why],
    ['Scaling', details.scaling],
    ['Failure Handling', details.failureHandling],
    ['Security', details.security],
    ['Monitoring', details.monitoring],
    ['Cost', details.cost],
    ['Alternatives', details.alternatives?.join(', ')],
  ].filter(([, v]) => v);

  return (
    <div className="neu-raised-lg" style={{ position: 'absolute', top: 0, right: 0, width: '340px', height: '100%', padding: '1.5rem', overflowY: 'auto', zIndex: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b' }}>{name}</h3>
          <p style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600 }}>{technology}</p>
        </div>
        <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={18} /></button>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.75rem' }}>{description}</p>
      <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: '0.625rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.2rem' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}