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
      trend: 12.6,
      chartData: [180, 190, 195, 210, 220, 230, 247],
      chartType: 'line'
    },
    {
      id: 2,
      title: 'Project Investment',
      value: '$700',
      subtitle: 'Higgsfield & Sora 2',
      icon: IconCurrencyDollar,
      trend: -8,
      chartData: [100, 250, 350, 450, 550, 650, 700],
      chartType: 'bar'
    },
    {
      id: 3,
      title: 'Carbon Footprint',
      value: '42 kg',
      subtitle: 'CO₂ emissions',
      icon: IconLeaf,
      trend: 15,
      chartData: [30, 32, 35, 37, 38, 40, 42],
      chartType: 'line'
    },
    {
      id: 4,
      title: 'Development Iterations',
      value: '156',
      subtitle: 'Script revisions',
      icon: IconRefresh,
      trend: 24,
      chartData: [85],
      chartType: 'progress'
    },
    {
      id: 5,
      title: 'AI Models Explored',
      value: '8',
      subtitle: 'Platforms tested',
      icon: IconBrain,
      trend: 0,
      chartData: [1, 2, 3, 4, 5, 7, 8],
      chartType: 'bar'
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

