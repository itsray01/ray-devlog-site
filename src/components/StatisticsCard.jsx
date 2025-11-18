import { motion } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * StatisticsCard - Individual metric card with optional chart/visualization
 * Displays a single statistic with title, value, trend, and optional chart data
 */
const StatisticsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  chartData = [],
  chartType = 'line' // 'line', 'bar', 'progress', 'donut'
}) => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, label: '', value: '', isVeo: false });
  
  // Render mini line chart
  const renderLineChart = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    const range = max - min || 1;
    
    const points = chartData.map((value, index) => {
      const x = (index / (chartData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg className="stat-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${title})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };
  
  // Render mini bar chart
  const renderBarChart = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const max = Math.max(...chartData);
    
    return (
      <div className="stat-chart-bars">
        {chartData.map((value, index) => (
          <div key={index} className="stat-bar-container">
            <div 
              className="stat-bar"
              style={{ 
                height: `${(value / max) * 100}%`,
                animationDelay: `${index * 0.05}s`
              }}
            />
          </div>
        ))}
      </div>
    );
  };
  
  // Render progress circle
  const renderProgressCircle = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const percentage = chartData[0] || 0;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <svg className="stat-chart-progress" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(138, 43, 226, 0.1)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontSize="20"
          fontWeight="600"
        >
          {Math.round(percentage)}%
        </text>
      </svg>
    );
  };
  
  // Render donut chart
  const renderDonutChart = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90; // Start from top
    
    const segments = chartData.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // Calculate arc path
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const outerRadius = 45;
      const innerRadius = 28;
      
      const x1 = 50 + outerRadius * Math.cos(startRad);
      const y1 = 50 + outerRadius * Math.sin(startRad);
      const x2 = 50 + outerRadius * Math.cos(endRad);
      const y2 = 50 + outerRadius * Math.sin(endRad);
      const x3 = 50 + innerRadius * Math.cos(endRad);
      const y3 = 50 + innerRadius * Math.sin(endRad);
      const x4 = 50 + innerRadius * Math.cos(startRad);
      const y4 = 50 + innerRadius * Math.sin(startRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${x1} ${y1}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');
      
      currentAngle = endAngle;
      
      const colors = [
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)',
        'var(--accent-pink)'
      ];
      
      return {
        path: pathData,
        color: item.color || colors[index % colors.length],
        label: item.label,
        value: item.value,
        percentage: percentage.toFixed(1)
      };
    });
    
    const handleMouseEnter = (e, segment) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const isVeo = segment.label.includes('Veo');
      setTooltip({
        show: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        label: segment.label,
        value: `${segment.value} clips (${segment.percentage}%)`,
        isVeo: isVeo
      });
    };
    
    const handleMouseLeave = () => {
      setTooltip({ show: false, x: 0, y: 0, label: '', value: '', isVeo: false });
    };
    
    return (
      <div style={{ position: 'relative' }}>
        <svg className="stat-chart-donut" viewBox="0 0 100 100">
          <defs>
            <filter id="donut-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="center-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Background circle for depth */}
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="url(#center-gradient)"
            opacity="0.5"
          />
          
          {/* Donut segments */}
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              className="donut-segment"
              filter="url(#donut-glow)"
              onMouseEnter={(e) => handleMouseEnter(e, segment)}
              onMouseLeave={handleMouseLeave}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip(prev => ({
                  ...prev,
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                }));
              }}
            />
          ))}
          
          {/* Center text */}
          <text
            x="50"
            y="47"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--ink)"
            fontSize="16"
            fontWeight="700"
            fontFamily="'Iceberg', sans-serif"
            style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}
          >
            {chartData.length}
          </text>
          <text
            x="50"
            y="57"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--muted)"
            fontSize="7"
            fontWeight="500"
            fontFamily="'Rajdhani', sans-serif"
            letterSpacing="0.5"
          >
            MODELS
          </text>
        </svg>
        {tooltip.show && (
          <div 
            className="donut-tooltip"
            style={{
              left: tooltip.isVeo ? `${tooltip.x + 10}px` : 'auto',
              right: tooltip.isVeo ? 'auto' : `${100 - tooltip.x + 10}px`,
              top: `${tooltip.y - 10}px`
            }}
          >
            <div className="donut-tooltip-label">{tooltip.label}</div>
            <div className="donut-tooltip-value">{tooltip.value}</div>
          </div>
        )}
      </div>
    );
  };
  
  // Render split bar chart (for showing breakdown like Higgsfield vs Sora 2)
  const renderSplitBar = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {chartData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const colors = [
            'var(--accent-primary)',
            'var(--accent-secondary)',
            'var(--accent-tertiary)',
            'var(--accent-pink)'
          ];
          
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: '0.65rem',
                color: 'var(--muted)',
                fontWeight: '500'
              }}>
                <span>{item.label}</span>
                <span style={{ color: item.color || colors[index % colors.length] }}>
                  ${item.value}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${item.color || colors[index % colors.length]}, ${item.color || colors[index % colors.length]}dd)`,
                    borderRadius: '4px',
                    transition: 'width 0.6s ease-out',
                    animation: 'splitBarGrow 0.8s ease-out forwards',
                    boxShadow: `0 0 8px ${item.color || colors[index % colors.length]}66`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderChart = () => {
    if (chartType === 'line') return renderLineChart();
    if (chartType === 'bar') return renderBarChart();
    if (chartType === 'progress') return renderProgressCircle();
    if (chartType === 'donut') return renderDonutChart();
    if (chartType === 'split') return renderSplitBar();
    return null;
  };
  
  return (
    <motion.div
      className="statistics-card glass-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: 'var(--glow-purple)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="stat-header">
        {Icon && (
          <div className="stat-icon">
            <Icon size={24} />
          </div>
        )}
        <div className="stat-title-group">
          <h4 className="stat-title">{title}</h4>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
      </div>
      
      <div className="stat-body">
        <div className="stat-value-group">
          <div className="stat-value">{value}</div>
          {trend && (
            <div className={`stat-trend ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'}`}>
              <span className="stat-trend-icon">{trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}</span>
              <span className="stat-trend-value">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        <div className="stat-chart-container">
          {renderChart()}
        </div>
      </div>
    </motion.div>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  chartData: PropTypes.arrayOf(PropTypes.number),
  chartType: PropTypes.oneOf(['line', 'bar', 'progress'])
};

export default StatisticsCard;

