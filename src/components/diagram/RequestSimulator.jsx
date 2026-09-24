import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { buildRequestPath } from '../../utils/simulation';

const STEP_DURATION = 1800;

export default function RequestSimulator({ nodes, edges, onStepChange, onStop }) {
  const path = useMemo(() => buildRequestPath(nodes, edges), [nodes, edges]);
  const [playing, setPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!playing) return;

    if (stepIndex >= path.length - 1) {
      setPlaying(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setStepIndex((i) => i + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [playing, stepIndex, path.length]);

  useEffect(() => {
    if (stepIndex >= 0 && stepIndex < path.length) {
      onStepChange(path[stepIndex]);
    }
  }, [stepIndex]); // eslint-disable-line react-hooks/exhaustive-deps
const isComplete = stepIndex === path.length - 1 && !playing;
 const handlePlay = () => {
  if (stepIndex === -1 || stepIndex >= path.length - 1) {
    setStepIndex(0);
  }
  setPlaying(true);
};

const handleReset = () => {
  setPlaying(false);
  setStepIndex(-1);
  onStop();
};
const buttonLabel = playing
  ? 'Pause'
  : isComplete
  ? 'Simulate Again'
  : stepIndex >= 0
  ? 'Resume'
  : 'Simulate Request';

  const currentStep = stepIndex >= 0 ? path[stepIndex] : null;

  return (
    <div className="neu-raised-sm" style={{ padding: '0.85rem 1rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <button
  onClick={playing ? () => setPlaying(false) : handlePlay}
  className="neu-primary-btn w-100"
  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem', gap: '0.4rem' }}
>
  {playing ? <Pause size={14} /> : <Play size={14} />}
  <span className="text-truncate">{buttonLabel}</span>
</button>
      {isComplete && (
        <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>✓ Complete</span>
      )}
        {stepIndex >= 0 && (
          <button onClick={handleReset} style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
            <RotateCcw size={14} />
          </button>
        )}
        {path.length > 0 && stepIndex >= 0 && (
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
            Step {stepIndex + 1} / {path.length}
          </span>
        )}
      </div>

      {currentStep && (
        <div className="neu-inset" style={{ padding: '0.7rem 0.9rem', borderRadius: '10px', borderLeft: '3px solid #4f46e5' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b' }}>{currentStep.node.name}</div>
          <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.2rem' }}>
            {currentStep.edge?.description || currentStep.node.description}
          </div>
        </div>
      )}
    </div>
  );
}