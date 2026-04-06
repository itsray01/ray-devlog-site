import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const GLOW = {
  start:   { border: '#00e5ff', shadow: '0 0 14px rgba(0,229,255,.55), inset 0 0 8px rgba(0,229,255,.15)' },
  branch:  { border: '#bf5af2', shadow: '0 0 14px rgba(191,90,242,.55), inset 0 0 8px rgba(191,90,242,.15)' },
  ending:  { border: '#ff453a', shadow: '0 0 14px rgba(255,69,58,.55), inset 0 0 8px rgba(255,69,58,.15)' },
  path:    { border: '#a78bfa', shadow: '0 0 12px rgba(167,139,250,.4), inset 0 0 6px rgba(167,139,250,.1)' },
};

const TAG = {
  start:  'INIT',
  branch: 'BRANCH',
  ending: 'END',
  path:   null,
};

const CyberNode = ({ data, selected }) => {
  const { label, subtitle, category = 'path', direction = 'TB' } = data;
  const glow = GLOW[category] || GLOW.path;
  const tag = TAG[category];

  const isLR = direction === 'LR';
  const targetPos = isLR ? Position.Left : Position.Top;
  const sourcePos = isLR ? Position.Right : Position.Bottom;

  return (
    <div
      className={`cyber-node cyber-node--${category}${selected ? ' cyber-node--selected' : ''}${isLR ? ' cyber-node--lr' : ''}`}
      style={{
        borderColor: glow.border,
        boxShadow: selected
          ? `${glow.shadow}, 0 0 24px ${glow.border}`
          : glow.shadow,
      }}
    >
      <Handle type="target" position={targetPos} className="cyber-handle" />

      <div className="cyber-node__header">
        {tag && <span className="cyber-node__tag" style={{ color: glow.border }}>{tag}</span>}
        <span className="cyber-node__pid">PID {data.pid}</span>
      </div>

      <div className="cyber-node__title">{label}</div>

      {subtitle && (
        <div className="cyber-node__subtitle">{subtitle}</div>
      )}

      <Handle type="source" position={sourcePos} className="cyber-handle" />
    </div>
  );
};

export default memo(CyberNode);
