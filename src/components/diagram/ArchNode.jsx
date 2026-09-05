// components/diagram/ArchNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';
import {NODE_TYPE_CONFIG} from '../../constant';
export default function ArchNode({ data }) {
  const config = NODE_TYPE_CONFIG[data.type] || NODE_TYPE_CONFIG.external;
  const Icon = config.icon;

  return (
    <div
      className="neu-raised-sm"
      style={{
        width: 200,
        padding: '0.75rem 1rem',
        borderRadius: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <div
        style={{
          width: 32, height: 32, borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: `${config.color}1a`, flexShrink: 0,
        }}
      >
        <Icon size={16} color={config.color} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {data.name}
        </div>
        <div style={{ fontSize: '0.625rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          {data.type.replace('_', ' ')}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}