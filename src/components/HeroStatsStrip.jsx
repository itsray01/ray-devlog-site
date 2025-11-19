import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

/**
 * HeroStatsStrip - Custom neon/cyberpunk stats strip with Recharts
 * Displays 5 key project statistics with proper chart visualizations
 */
const HeroStatsStrip = () => {
  // Hardcoded data
  const totalClips = 247;
  const soraSpend = 450;
  const higgsfieldSpend = 250;
  const totalSpend = 700;
  const carbonKg = 42;
  const iterations = 156;
  const modelsUsed = 5;

  // Chart data arrays
  const sparklineData = [
    { value: 180 },
    { value: 190 },
    { value: 195 },
    { value: 210 },
    { value: 220 },
    { value: 230 },
    { value: 240 },
    { value: 247 }
  ];

  const investmentData = [
    { name: 'Spend', sora: soraSpend, higgsfield: higgsfieldSpend }
  ];

  const iterationData = [
    { value: 120 },
    { value: 140 },
    { value: 135 },
    { value: 156 }
  ];

  const donutData = [
    { name: 'Model 1', value: 1 },
    { name: 'Model 2', value: 1 },
    { name: 'Model 3', value: 1 },
    { name: 'Model 4', value: 1 },
    { name: 'Model 5', value: 1 }
  ];

  const donutColors = ['#a855f7', '#22d3ee', '#ec4899', '#8b5cf6', '#06b6d4'];

  // Custom tooltip for minimal styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 border border-purple-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
          <p className="text-white text-sm font-medium">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full mb-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Tile 1: Total Clips Generated - Sparkline Area Chart */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-purple-500/30 rounded-3xl p-6 flex flex-col"
          whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)', transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs uppercase tracking-wider text-purple-300/70 mb-2">
            Total Clips Generated
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            {totalClips}
          </div>
          <div className="flex-1 min-h-[60px]">
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#sparklineGradient)"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tile 2: Project Investment - Stacked Horizontal Bar */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-cyan-500/30 rounded-3xl p-6 flex flex-col"
          whileHover={{ borderColor: 'rgba(34, 211, 238, 0.6)', transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="text-xs uppercase tracking-wider text-cyan-300/70 mb-2">
            Project Investment
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            ${totalSpend}
          </div>
          <div className="flex-1 flex items-end min-h-[60px]">
            <ResponsiveContainer width="100%" height={40}>
              <BarChart
                data={investmentData}
                layout="horizontal"
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="sora" stackId="a" fill="#a855f7" radius={[4, 0, 0, 4]} />
                <Bar dataKey="higgsfield" stackId="a" fill="#22d3ee" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tile 3: Carbon Footprint - Simple SVG Ring */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-emerald-500/30 rounded-3xl p-6 flex flex-col items-center justify-center"
          whileHover={{ borderColor: 'rgba(16, 185, 129, 0.6)', transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xs uppercase tracking-wider text-emerald-300/70 mb-2 w-full">
            Carbon Footprint
          </div>
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(16, 185, 129, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray={`${(carbonKg / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="relative z-10 text-center">
              <div className="text-3xl font-bold text-white">{carbonKg}</div>
              <div className="text-sm text-emerald-300/70">kg CO₂</div>
            </div>
          </div>
        </motion.div>

        {/* Tile 4: Development Iterations - Vertical Bar Chart */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-pink-500/30 rounded-3xl p-6 flex flex-col"
          whileHover={{ borderColor: 'rgba(236, 72, 153, 0.6)', transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="text-xs uppercase tracking-wider text-pink-300/70 mb-2">
            Development Iterations
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            {iterations}
          </div>
          <div className="flex-1 min-h-[60px]">
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={iterationData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tile 5: AI Models Used - Donut Chart */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-purple-500/30 rounded-3xl p-6 flex flex-col items-center justify-center"
          whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)', transition: { duration: 0.2 } }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs uppercase tracking-wider text-purple-300/70 mb-2 w-full">
            AI Models Used
          </div>
          <div className="relative flex items-center justify-center w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={1000}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={donutColors[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{modelsUsed}</div>
                <div className="text-xs text-purple-300/70">models</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroStatsStrip;
