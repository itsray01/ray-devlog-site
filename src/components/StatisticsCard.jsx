import { motion } from 'framer-motion';
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
  chartType = 'line' // 'line', 'bar', 'progress'
}) => {
  
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
  
  const renderChart = () => {
    if (chartType === 'line') return renderLineChart();
    if (chartType === 'bar') return renderBarChart();
    if (chartType === 'progress') return renderProgressCircle();
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

