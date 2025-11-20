import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Card, Text, Metric, LineChart, DonutChart, ProgressBar } from '@tremor/react';

/**
 * StatisticsCard - Tremor-powered metric card with charts
 * Displays a single statistic with title, value, and Tremor chart visualization
 */
const StatisticsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  chartData = [],
  chartType = 'line' // 'line', 'bar', 'progress', 'donut', 'split'
}) => {
  
  // Transform line chart data from array to Tremor format
  const renderLineChart = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const transformedData = chartData.map((value, index) => ({
      month: months[index] || `M${index + 1}`,
      value: value
    }));
    
    return (
      <LineChart
        className="h-20 mt-4"
        data={transformedData}
        index="month"
        categories={["value"]}
        colors={["violet"]}
        showAnimation={true}
        animationDuration={1500}
        showXAxis={false}
        showYAxis={false}
        showGridLines={false}
        showLegend={false}
        curveType="natural"
      />
    );
  };
  
  // Render split bar chart (investment breakdown)
  const renderSplitBar = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    
    const colorMap = {
      '#8b5cf6': 'violet',
      '#06b6d4': 'cyan',
      '#f59e0b': 'amber',
      '#ec4899': 'pink'
    };
    
    return (
      <div className="mt-4 space-y-3">
        {chartData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const tremorColor = colorMap[item.color] || 'violet';
          
          return (
            <div key={index}>
              <div className="flex justify-between items-center text-sm mb-1">
                <Text>{item.label}</Text>
                <Text className="font-semibold" style={{ color: item.color }}>
                  ${item.value}
                </Text>
              </div>
              <ProgressBar 
                value={percentage} 
                color={tremorColor}
                className="h-2"
                showAnimation={true}
              />
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render donut chart
  const renderDonutChart = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const transformedData = chartData.map(item => ({
      name: item.label,
      value: item.value
    }));
    
    const colorMap = {
      '#8b5cf6': 'violet',
      '#06b6d4': 'cyan',
      '#f59e0b': 'amber',
      '#ec4899': 'pink',
      '#ef4444': 'red'
    };
    
    const colors = chartData.map(item => colorMap[item.color] || 'violet');
    
    return (
      <div className="relative mt-4">
        <DonutChart
          className="h-32"
          data={transformedData}
          category="value"
          index="name"
          colors={colors}
          showAnimation={true}
          animationDuration={1200}
          showLabel={false}
          valueFormatter={(value) => `${value} clips`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-2xl font-bold text-white font-['Iceberg']" style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}>
            {chartData.length}
          </div>
          <div className="text-xs text-gray-400 tracking-wider" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            MODELS
          </div>
        </div>
      </div>
    );
  };
  
  // Render progress circle (simple percentage - keeping original SVG for consistency)
  const renderProgressCircle = () => {
    if (!chartData || chartData.length === 0) return null;
    
    const percentage = chartData[0] || 0;
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <svg className="stat-chart-progress mx-auto mt-4" viewBox="0 0 100 100">
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
  
  // Determine decoration color based on chart type or data
  const getDecorationColor = () => {
    if (chartType === 'line') return 'violet';
    if (chartType === 'split') return 'cyan';
    if (chartType === 'donut') return 'purple';
    return 'violet';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="statistics-card glass-hover tremor-card-custom" 
        decoration="top" 
        decorationColor={getDecorationColor()}
      >
        <div className="stat-header">
          {Icon && (
            <div className="stat-icon">
              <Icon size={24} />
            </div>
          )}
          <div className="stat-title-group">
            <Text className="stat-title">{title}</Text>
            {subtitle && <Text className="stat-subtitle">{subtitle}</Text>}
          </div>
        </div>
        
        <div className="stat-body">
          <div className="stat-value-group">
            <Metric className="stat-value">{value}</Metric>
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
      </Card>
    </motion.div>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  chartData: PropTypes.array,
  chartType: PropTypes.oneOf(['line', 'bar', 'progress', 'donut', 'split'])
};

export default StatisticsCard;
