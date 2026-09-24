import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { getFailureImpact } from '../../utils/simulation';

export default function FailureSimulator({ nodes, edges, onSimulate, onClear }) {
  const [selectedId, setSelectedId] = useState('');
  const [activeFailure, setActiveFailure] = useState(null);

  const handleSimulate = () => {
    if (!selectedId) return;
    const failedNode = nodes.find((n) => n.id === selectedId);
    const impactedIds = getFailureImpact(selectedId, nodes, edges);

    setActiveFailure({ node: failedNode, impactedIds });
    onSimulate(selectedId, impactedIds);
  };

  const handleClear = () => {
    setActiveFailure(null);
    setSelectedId('');
    onClear();
  };

  return (
    <div className="neu-raised-sm" style={{ padding: '0.85rem 1rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div className="d-flex flex-column flex-sm-row align-items-stretch gap-2 w-100">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="neu-inset w-100 text-truncate"
          style={{ padding: '0.5rem 0.6rem', borderRadius: '8px', fontSize: '0.75rem', minWidth: 0 }}
        >
          <option value="" disabled>Pick a component to fail...</option>
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>

        <div className="d-flex gap-2" style={{ flexShrink: 0 }}>
          <button
            onClick={handleSimulate}
            disabled={!selectedId}
            className="neu-primary-btn text-truncate flex-fill flex-sm-grow-0"
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.75rem', gap: '0.4rem', background: '#ef4444', whiteSpace: 'nowrap' }}
          >
            <AlertTriangle size={14} />
            Simulate Failure
          </button>

          {activeFailure && (
            <button onClick={handleClear} className="neu-button flex-shrink-0 d-flex align-items-center justify-content-center" style={{ color: '#94a3b8', width: '2.2rem' }}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {activeFailure && (
        <div className="neu-inset" style={{ padding: '0.7rem 0.9rem', borderRadius: '10px', borderLeft: '3px solid #ef4444' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b91c1c' }}>
            {activeFailure.node.name} is down
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.3rem' }}>
            <strong>Impact:</strong> {activeFailure.node.details?.failureHandling || 'Downstream services lose access to this component.'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.3rem' }}>
            {activeFailure.impactedIds.length} connected component(s) affected: {activeFailure.impactedIds.map((id) => nodes.find((n) => n.id === id)?.name).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}