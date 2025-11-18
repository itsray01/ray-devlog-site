import { motion } from 'framer-motion';
import StatisticsCard from './StatisticsCard';
import { IconVideo, IconCurrencyDollar, IconLeaf, IconRefresh, IconBrain } from '@tabler/icons-react';

/**
 * StatisticsDashboard - Container for project statistics cards
 * Displays key metrics about the project development
 */
const StatisticsDashboard = () => {
  // Statistics data - can be updated dynamically later
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
      value: '$700',
      subtitle: 'Higgsfield & Sora 2',
      icon: IconCurrencyDollar,
      trend: null,
      chartData: [],
      chartType: 'bar'
    },
    {
      id: 3,
      title: 'Carbon Footprint',
      value: '42 kg',
      subtitle: 'CO₂ emissions',
      icon: IconLeaf,
      trend: null,
      chartData: [],
      chartType: 'line'
    },
    {
      id: 4,
      title: 'Development Iterations',
      value: '156',
      subtitle: 'Script revisions',
      icon: IconRefresh,
      trend: null,
      chartData: [],
      chartType: 'progress'
    },
    {
      id: 5,
      title: 'AI Models Used',
      value: '8',
      subtitle: 'Platforms tested',
      icon: IconBrain,
      trend: null,
      chartData: [
        { label: 'Sora 2', value: 147, color: '#8b5cf6' },
        { label: 'Veo 3.1', value: 100, color: '#06b6d4' },
        { label: 'Runway Gen-3', value: 45, color: '#f59e0b' },
        { label: 'Pika', value: 30, color: '#ec4899' },
        { label: 'Kling AI', value: 20, color: '#10b981' },
        { label: 'Luma Dream', value: 15, color: '#8b5cf6' },
        { label: 'Higgsfield', value: 12, color: '#06b6d4' },
        { label: 'Others', value: 8, color: '#6b7280' }
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
        {statistics.map((stat) => (
          <motion.div key={stat.id} variants={cardVariants}>
            <StatisticsCard
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
              trend={stat.trend}
              chartData={stat.chartData}
              chartType={stat.chartType}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StatisticsDashboard;

