import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler
);

/**
 * StatisticsCardChartJS - Chart.js powered metric card with beautiful charts
 * Cyberpunk-themed with purple gradients and glow effects
 */
const StatisticsCardChartJS = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  chartData = [],
  chartType = 'line'
}) => {
  const chartRef = useRef(null);

  // Create gradient for line chart
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(138, 43, 226, 0.4)');
    gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.2)');
    gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
    return gradient;
  };

  // Line Chart Configuration
  const renderLineChart = () => {
    if (!chartData || chartData.length === 0) return null;

    const data = {
      labels: chartData.map((_, i) => `M${i + 1}`),
      datasets: [
        {
          data: chartData,
          fill: true,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            return createGradient(ctx);
          },
          borderColor: '#8a2be2',
          borderWidth: 3,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#8a2be2',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          tension: 0.4,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 10,
          shadowColor: 'rgba(138, 43, 226, 0.5)',
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15, 18, 22, 0.95)',
          titleColor: '#8a2be2',
          bodyColor: '#cbd5e1',
          borderColor: '#8a2be2',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          titleFont: {
            family: "'Iceberg', sans-serif",
            size: 13,
            weight: 'bold',
          },
          bodyFont: {
            family: "'Rajdhani', sans-serif",
            size: 12,
          },
          callbacks: {
            title: (context) => `Month ${context[0].dataIndex + 1}`,
            label: (context) => `${context.parsed.y} clips`,
          },
        },
      },
      scales: {
        x: {
          display: false,
          grid: { display: false },
        },
        y: {
          display: false,
          grid: { display: false },
          beginAtZero: true,
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart',
      },
    };

    return (
      <div style={{ height: '90px', position: 'relative' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    );
  };

  // Doughnut Chart Configuration
  const renderDonutChart = () => {
    if (!chartData || chartData.length === 0) return null;

    // Determine if this is investment or models based on title
    const isInvestmentChart = title?.toLowerCase().includes('investment');
    const total = isInvestmentChart 
      ? chartData.reduce((sum, item) => sum + item.value, 0)
      : chartData.length;

    const data = {
      labels: chartData.map((item) => item.label),
      datasets: [
        {
          data: chartData.map((item) => item.value),
          backgroundColor: chartData.map((item) => item.color),
          borderColor: '#0f1216',
          borderWidth: 3,
          hoverOffset: 8,
          hoverBorderColor: '#fff',
          hoverBorderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15, 18, 22, 0.95)',
          titleColor: '#8a2be2',
          bodyColor: '#cbd5e1',
          borderColor: '#8a2be2',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          boxWidth: 12,
          boxHeight: 12,
          titleFont: {
            family: "'Iceberg', sans-serif",
            size: 13,
            weight: 'bold',
          },
          bodyFont: {
            family: "'Rajdhani', sans-serif",
            size: 12,
          },
          callbacks: {
            label: (context) => {
              if (isInvestmentChart) {
                return ` ${context.label}: $${context.parsed}`;
              }
              return ` ${context.label}: ${context.parsed} clips`;
            },
          },
        },
      },
      animation: {
        duration: 1200,
        easing: 'easeOutCubic',
      },
    };

    return (
      <div style={{ height: '150px', position: 'relative' }}>
        <Doughnut data={data} options={options} />
        {/* Center text overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: 'var(--ink)',
              fontFamily: "'Iceberg', sans-serif",
              textShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
            }}
          >
            {isInvestmentChart ? chartData.length : total}
          </div>
          <div
            style={{
              fontSize: '0.65rem',
              color: 'var(--muted)',
              fontWeight: '500',
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.5px',
            }}
          >
            {isInvestmentChart ? 'SOURCES' : 'MODELS'}
          </div>
        </div>
      </div>
    );
  };

  // Animated Counter Component
  const AnimatedValue = ({ value, prefix = '', suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayValue(Math.round(v))
      });
      return () => controls.stop();
    }, [value]);

    return <>{prefix}{displayValue}{suffix}</>;
  };

  // Split Bars with Animated Progress
  const renderSplitBar = () => {
    if (!chartData || chartData.length === 0) return null;

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
      <div style={{ width: '100%', marginTop: '1rem' }}>
        {chartData.map((item, index) => {
          const percentage = (item.value / total) * 100;

          return (
            <div
              key={index}
              style={{ marginBottom: index < chartData.length - 1 ? '1.25rem' : 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.6rem',
                  fontSize: '0.8rem',
                  color: 'var(--muted)',
                  fontWeight: '500',
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}88`
                    }}
                  />
                  {item.label}
                </span>
                <span
                  style={{
                    color: item.color,
                    fontWeight: '700',
                    fontFamily: "'Iceberg', sans-serif",
                    fontSize: '0.85rem',
                    textShadow: `0 0 10px ${item.color}44`
                  }}
                >
                  <AnimatedValue value={item.value} prefix="$" /> ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '12px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                }}
              >
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: `${percentage}%`, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.15 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${item.color}cc, ${item.color})`,
                    borderRadius: '6px',
                    boxShadow: `0 0 15px ${item.color}55, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    position: 'relative',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.15 + 0.8,
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      borderRadius: '6px',
                    }}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Progress Circle with enhanced glow effects
  const renderProgressCircle = () => {
    if (!chartData || chartData.length === 0) return null;

    const percentage = chartData[0] || 0;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color based on percentage (green for low carbon, yellow for medium, red for high)
    const getColor = (pct) => {
      if (pct < 50) return '#10b981'; // green
      if (pct < 75) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    };
    const progressColor = getColor(percentage);

    return (
      <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0.5rem auto 0' }}>
        <svg
          className="stat-chart-progress"
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <filter id="progress-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={progressColor} stopOpacity="1" />
              <stop offset="100%" stopColor={progressColor} stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(138, 43, 226, 0.1)"
            strokeWidth="8"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            filter="url(#progress-glow)"
          />
          {/* Center percentage */}
          <text
            x="50"
            y="46"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--ink)"
            fontSize="18"
            fontWeight="700"
            fontFamily="'Iceberg', sans-serif"
            style={{ textShadow: `0 0 10px ${progressColor}66` }}
          >
            {Math.round(percentage)}%
          </text>
          <text
            x="50"
            y="60"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--muted)"
            fontSize="7"
            fontWeight="500"
            fontFamily="'Rajdhani', sans-serif"
            letterSpacing="0.5"
          >
            OF BUDGET
          </text>
        </svg>
      </div>
    );
  };

  // Clean stat display for environmental data
  const renderCleanStat = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          padding: '1.25rem 1rem 1rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04), rgba(16, 185, 129, 0.02))',
          borderRadius: '10px',
          border: '1px solid rgba(16, 185, 129, 0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12), transparent)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Comparison text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              fontSize: '0.8rem',
              color: 'var(--muted)',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: '500',
              lineHeight: '1.6',
              marginBottom: '0.75rem',
            }}
          >
            ≈ <span style={{ color: '#10b981', fontWeight: '600' }}>165 km</span> by car
          </motion.div>

          {/* CO2 savings indicator */}
          {trend && trend < 0 && (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                padding: '0.4rem 0.85rem',
                background: 'rgba(16, 185, 129, 0.08)',
                borderRadius: '6px',
                display: 'inline-block',
                border: '1px solid rgba(16, 185, 129, 0.15)',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  color: '#10b981',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: '700',
                  letterSpacing: '0.3px',
                }}
              >
                ↓ {Math.abs(trend)}% vs traditional
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderChart = () => {
    if (chartType === 'line') return renderLineChart();
    if (chartType === 'split') return renderSplitBar();
    if (chartType === 'donut') return renderDonutChart();
    if (chartType === 'progress') return renderProgressCircle();
    if (chartType === 'stat') return renderCleanStat();
    return null;
  };

  return (
    <motion.div
      className="statistics-card glass-hover chartjs-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="stat-header">
        {Icon && (
          <motion.div
            className="stat-icon"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Icon size={24} />
          </motion.div>
        )}
        <div className="stat-title-group">
          <h4 className="stat-title">{title}</h4>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="stat-body">
        <div className="stat-value-group">
          <motion.div
            className="stat-value"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {value}
          </motion.div>
          {trend && (
            <motion.div
              className={`stat-trend ${
                trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="stat-trend-icon">
                {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
              </span>
              <span className="stat-trend-value">{Math.abs(trend)}%</span>
            </motion.div>
          )}
        </div>

        <div className="stat-chart-container">{renderChart()}</div>
      </div>
    </motion.div>
  );
};

StatisticsCardChartJS.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  chartData: PropTypes.array,
  chartType: PropTypes.oneOf(['line', 'split', 'donut', 'progress', 'stat']),
};

export default StatisticsCardChartJS;

