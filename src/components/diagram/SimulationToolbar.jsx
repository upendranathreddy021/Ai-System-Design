import React from 'react';
import ExplainMode from './ExplainMode';
import RequestSimulator from './RequestSimulator';
import FailureSimulator from './FailureSimulator';

export default function SimulationToolbar({ nodes, edges, mode, onModeChange, onRequestStep, onRequestStop, onFailureSimulate, onFailureClear }) {
  return (
    <div className="neu-raised-sm p-3 rounded-4 mb-3">
      <div className="row g-3">
        <div className="col-12 col-md-4 col-lg-3">
          <span className="d-block mb-1" style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Explanation level
          </span>
          <ExplainMode mode={mode} onChange={onModeChange} />
        </div>

        <div className="col-12 col-md-4 col-lg-5">
          <span className="d-block mb-1" style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Request flow
          </span>
          <RequestSimulator nodes={nodes} edges={edges} onStepChange={onRequestStep} onStop={onRequestStop} />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <span className="d-block mb-1" style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Failure scenario
          </span>
          <FailureSimulator nodes={nodes} edges={edges} onSimulate={onFailureSimulate} onClear={onFailureClear} />
        </div>
      </div>
    </div>
  );
}