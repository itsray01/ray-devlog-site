import { motion } from 'framer-motion';
import StatisticsCard from './StatisticsCard';
import StatisticsCardChartJS from './StatisticsCardChartJS';
import { IconVideo, IconCurrencyDollar, IconRefresh, IconBrain } from '@tabler/icons-react';

// Toggle between SVG charts and Chart.js
// Enabled: Beautiful Chart.js with gradients and glow effects!
const USE_CHARTJS = true;

/**
 * StatisticsDashboard - Container for project statistics cards
 * Displays key metrics about the project development
 */
const StatisticsDashboard = () => {
  // Statistics data - 4 key metrics for the dashboard
  const statistics = [
    {
      id: 1,
      title: 'Total Clips Generated',
      value: '247',
      subtitle: 'AI-generated videos',
      icon: IconVideo,
      trend: null,
      chartData: [180, 190, 195, 210, 220, 230, 247],
      chartType: 'line'
    },
    {
      id: 2,
      title: 'Project Investment',
      value: '$500',
      subtitle: 'AI platforms + infrastructure',
      icon: IconCurrencyDollar,
      trend: null,
      chartData: [
        { label: 'Sora 2', value: 30, color: '#8b5cf6' },
        { label: 'Higgsfield', value: 460, color: '#06b6d4' },
        { label: 'VPN', value: 10, color: '#f59e0b' }
      ],
      chartType: 'donut'
    },
    {
      id: 3,
      title: 'Development Iterations',
      value: '156',
      subtitle: 'Script revisions',
      icon: IconRefresh,
      trend: null,
      chartData: [12, 28, 45, 72, 98, 130, 156], // iterations over time
      chartType: 'line'
    },
    {
      id: 4,
      title: 'AI Models Used',
      subtitle: 'Platforms tested',
      icon: IconBrain,
      trend: null,
      chartData: [
        { label: 'Veo 3.1', value: 150, color: '#8b5cf6' },
        { label: 'Sora 2', value: 97, color: '#06b6d4' },
        { label: 'Seedance', value: 40, color: '#f59e0b' },
        { label: 'Kling', value: 30, color: '#ec4899' },
        { label: 'Wan2.5', value: 10, color: '#ef4444' }
      ],
      chartType: 'donut'
    }
  ];

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.section
      className="statistics-dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="statistics-grid">
        {statistics.map((stat) => {
          const CardComponent = USE_CHARTJS ? StatisticsCardChartJS : StatisticsCard;
          return (
            <motion.div 
              key={stat.id} 
              variants={cardVariants}
              className={stat.id === 4 ? 'ai-models-card-wrapper' : ''}
            >
              <CardComponent
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                trend={stat.trend}
                chartData={stat.chartData}
                chartType={stat.chartType}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default StatisticsDashboard;

