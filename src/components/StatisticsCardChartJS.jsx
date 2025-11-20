import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
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
            label: (context) => ` ${context.label}: ${context.parsed} clips`,
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
            {chartData.length}
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
            MODELS
          </div>
        </div>
      </div>
    );
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
              style={{ marginBottom: index < chartData.length - 1 ? '1rem' : 0 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  fontWeight: '500',
                }}
              >
                <span>{item.label}</span>
                <span
                  style={{
                    color: item.color,
                    fontWeight: '600',
                  }}
                >
                  ${item.value} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}dd)`,
                    borderRadius: '5px',
                    boxShadow: `0 0 10px ${item.color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Progress Circle (keep existing SVG)
  const renderProgressCircle = () => {
    if (!chartData || chartData.length === 0) return null;

    const percentage = chartData[0] || 0;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg
        className="stat-chart-progress"
        viewBox="0 0 100 100"
        style={{ width: '80px', height: '80px', margin: '1rem auto 0', display: 'block' }}
      >
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
    if (chartType === 'split') return renderSplitBar();
    if (chartType === 'donut') return renderDonutChart();
    if (chartType === 'progress') return renderProgressCircle();
    return null;
  };

  return (
    <motion.div
      className="statistics-card glass-hover chartjs-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
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
            <div
              className={`stat-trend ${
                trend > 0 ? 'positive' : trend < 0 ? 'negative' : 'neutral'
              }`}
            >
              <span className="stat-trend-icon">
                {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
              </span>
              <span className="stat-trend-value">{Math.abs(trend)}%</span>
            </div>
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
  chartType: PropTypes.oneOf(['line', 'split', 'donut', 'progress']),
};

export default StatisticsCardChartJS;

