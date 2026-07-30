
import React, {useState} from "react";
import { useAuth } from '../context/AuthContext';
import { INITIAL_NODES } from '../types.js';
import {
  Cpu,
  Server,
  Database,
  Zap,
  Activity,
  Plus,
  RefreshCw,    
  Share2,
  ShieldCheck,
  Globe,
  Radio,
  Sliders,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export default function Dashboard(){
const { authState, addToast } = useAuth();
 const [nodes, setNodes] = useState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState(INITIAL_NODES[1]);
  const [isDeploying, setIsDeploying] = useState(false);
 const handleAddNode = () => {
    const nodeTypes = ['microservice', 'redis', 'database', 'queue', 'ai-model'];
    const randomType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
    const newNode = {
      id: `node-${Date.now()}`,
      name: `New ${randomType.toUpperCase()} Node`,
      type: randomType,
      status: 'healthy',
      latency: Math.floor(Math.random() * 20) + 5,
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 40) + 30,
      x: Math.floor(Math.random() * 300) + 100,
      y: Math.floor(Math.random() * 100) + 50,
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode);
    addToast(`Added new ${randomType} node to system topology.`, 'success');
  };

  const handleRemoveNode = (id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
    addToast('Node removed from schematic.', 'info');
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    addToast('Initiating neural deployment pipeline...', 'info');
    setTimeout(() => {
      setIsDeploying(false);
      addToast('System topology successfully deployed to Cloud Run!', 'success');
    }, 1500);
  };

 return (
    <div className="dashboard-container">
      {/* Top Welcome Header */}
      <div className="neu-raised welcome-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 className="banner-title">System Architecture Board</h1>
            <span
              className="neu-pill"
              style={{
                padding: '0.25rem 0.625rem',
                fontSize: '0.625rem',
                fontWeight: 800,
                color: '#10b981',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                gap: '0.25rem',
              }}
            >
              <span
                className="animate-pulse"
                style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}
              />
              ONLINE
            </span>
          </div>
          <p className="banner-subtitle">
            Welcome back, <strong style={{ color: '#1e293b' }}>{authState.user?.firstName}</strong>. All system components are operating within normal telemetry thresholds.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <button
            onClick={handleAddNode}
            className="neu-button"
            style={{
              padding: '0.625rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              gap: '0.5rem',
              flex: 1,
            }}
          >
            <Plus size={16} style={{ color: '#4f46e5' }} />
            <span>Add Node</span>
          </button>

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="neu-primary-btn"
            style={{
              padding: '0.625rem 1.25rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              gap: '0.5rem',
              flex: 1,
            }}
          >
            {isDeploying ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : (
              <Zap size={16} />
            )}
            <span>Deploy Topology</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      {/* <div className="metrics-grid">
        <div className="neu-raised-sm metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Nodes
            </span>
            <Cpu size={16} style={{ color: '#4f46e5' }} />
          </div>
          <p className="metric-val">{nodes.length} Microservices</p>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#10b981' }}>100% HEALTHY</p>
        </div>

        <div className="neu-raised-sm metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              P99 Latency
            </span>
            <Activity size={16} style={{ color: '#4f46e5' }} />
          </div>
          <p className="metric-val">12.4 ms</p>
          <p style={{ fontSize: '0.6875rem', fontWeight: 500, color: '#64748b' }}>-2.1ms from baseline</p>
        </div>

        <div className="neu-raised-sm metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Cloud Budget
            </span>
            <Server size={16} style={{ color: '#4f46e5' }} />
          </div>
          <p className="metric-val">$1,240 / mo</p>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#4f46e5' }}>Optimized Tier</p>
        </div>

        <div className="neu-raised-sm metric-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#94a3b8' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Uptime SLA
            </span>
            <ShieldCheck size={16} style={{ color: '#4f46e5' }} />
          </div>
          <p className="metric-val">99.98%</p>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#10b981' }}>28 days incident-free</p>
        </div>
      </div> */}

      {/* Main Interactive Topology Canvas + Node Inspector */}
      <div className="topology-grid">
        {/* Interactive Schematic Board */}
        <div className="neu-raised canvas-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>
                Live Neural Mesh Canvas
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                Click any node to inspect telemetry or customize parameters
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => addToast('Architecture exported as SVG schematic', 'success')}
                className="neu-button"
                style={{ padding: '0.5rem', color: '#475569' }}
                title="Export Diagram"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Area */}
          <div className="neu-inset canvas-box">
            {/* Background Grid Lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.2,
                pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Connecting Connector Lines SVG */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <path
                d="M 120 120 L 320 80 M 120 120 L 320 190 M 380 80 L 530 80 M 380 190 L 530 190"
                stroke="#818cf8"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                fill="none"
                className="animate-pulse"
              />
            </svg>

            {/* Rendered Interactive Nodes */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      border: isSelected ? '2px solid #4f46e5' : 'none',
                      zIndex: isSelected ? 10 : 1,
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    }}
                    className={`node-btn ${isSelected ? 'neu-button-active' : 'neu-button'}`}
                  >
                    <div className="neu-raised node-icon-box">
                      {node.type === 'api-gateway' && <Globe size={20} />}
                      {node.type === 'ai-model' && <Zap size={20} style={{ color: '#4f46e5' }} />}
                      {node.type === 'microservice' && <Cpu size={20} />}
                      {node.type === 'redis' && <Radio size={20} style={{ color: '#d97706' }} />}
                      {node.type === 'database' && <Database size={20} style={{ color: '#10b981' }} />}
                      {node.type === 'queue' && <Sliders size={20} />}
                    </div>

                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                        {node.name}
                      </h4>
                      <p style={{ fontSize: '0.625rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                        {node.latency}ms • CPU {node.cpu}%
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Node Details Inspector */}
        <div className="neu-raised" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1e293b' }}>
                Node Inspector
              </h3>
              {selectedNode && (
                <button
                  onClick={() => handleRemoveNode(selectedNode.id)}
                  style={{ color: '#f43f5e', padding: '0.25rem' }}
                  title="Remove Node"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {selectedNode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="neu-inset" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    className="neu-button"
                    style={{ width: '2.5rem', height: '2.5rem', fontWeight: 700, color: '#4f46e5' }}
                  >
                    {selectedNode.type === 'database' ? <Database size={20} /> : <Cpu size={20} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>
                      {selectedNode.name}
                    </h4>
                    <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {selectedNode.type}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                      <span>CPU Utilization</span>
                      <span>{selectedNode.cpu}%</span>
                    </div>
                    <div className="neu-inset" style={{ width: '100%', height: '8px', overflow: 'hidden', padding: 0 }}>
                      <div
                        style={{ height: '100%', backgroundColor: '#4f46e5', borderRadius: '999px', width: `${selectedNode.cpu}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                      <span>Memory Usage</span>
                      <span>{selectedNode.memory}%</span>
                    </div>
                    <div className="neu-inset" style={{ width: '100%', height: '8px', overflow: 'hidden', padding: 0 }}>
                      <div
                        style={{ height: '100%', backgroundColor: '#10b981', borderRadius: '999px', width: `${selectedNode.memory}%` }}
                      />
                    </div>
                  </div>

                  <div className="neu-inset" style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>Response Latency:</span>
                    <span style={{ fontWeight: 800, color: '#1e293b' }}>{selectedNode.latency} ms</span>
                  </div>

                  <div className="neu-inset" style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>Status Check:</span>
                    <span style={{ fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={14} /> Healthy
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', padding: '2.5rem 0', textAlign: 'center' }}>
                Select a node on the canvas to view detailed telemetry metrics.
              </p>
            )}
          </div>

          <button
            onClick={() => addToast('Configured node autoscaling threshold', 'success')}
            className="neu-button"
            style={{ width: '100%', padding: '0.625rem', marginTop: '1.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}
          >
            Configure Autoscaling
          </button>
        </div>
      </div>

      {/* Telemetry Chart & Recent Audit Logs */}
      <div className="telemetry-grid">
        {/* Live Traffic SVG Chart */}
        <div className="neu-raised" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1e293b' }}>
              Traffic Telemetry (24h)
            </h3>
            <span
              className="neu-pill"
              style={{ padding: '0.25rem 0.625rem', fontSize: '0.625rem', fontWeight: 800, color: '#4f46e5' }}
            >
              Req/sec: 14,200
            </span>
          </div>

          <div className="neu-inset chart-box">
            {[35, 45, 30, 65, 80, 55, 90, 75, 60, 85, 95, 70, 88, 100].map((val, idx) => (
              <div key={idx} className="chart-bar" style={{ height: `${val}%` }} />
            ))}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="neu-raised" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(203, 213, 225, 0.5)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1e293b' }}>
              Recent System Logs
            </h3>
            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#64748b' }}>Live Stream</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { time: '10:42:15', event: 'Gemini Neural Model scale-out completed (+3 instances)', status: 'Success' },
              { time: '10:38:00', event: 'Postgres DB primary read replica synced', status: 'Success' },
              { time: '10:15:22', event: 'OAuth session key rotated for user Alex Rivera', status: 'Info' },
            ].map((log, idx) => (
              <div key={idx} className="neu-inset" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1e293b' }}>{log.event}</p>
                  <p style={{ fontSize: '0.625rem', color: '#94a3b8', marginTop: '2px' }}>{log.time}</p>
                </div>
                <span
                  className="neu-pill"
                  style={{ padding: '0.125rem 0.5rem', fontSize: '0.625rem', fontWeight: 800, color: '#4f46e5' }}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
