import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

/**
 * HeroStatsStrip - Custom neon/cyberpunk stats strip with minimal charts
 * Displays 5 key project statistics with Recharts visualizations
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

  // Chart data
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

  const spendData = [
    { name: 'Sora 2', value: soraSpend },
    { name: 'Higgsfield', value: higgsfieldSpend }
  ];

  const iterationBars = [
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full mb-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Tile 1: Total Clips Generated */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-purple-500/30 rounded-3xl p-6 flex flex-col"
          whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)', transition: { duration: 0.2 } }}
        >
          <div className="text-xs uppercase tracking-wider text-purple-300/70 mb-2">
            Total Clips Generated
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            {totalClips}
          </div>
          <div className="flex-1 min-h-[60px]">
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
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

        {/* Tile 2: Project Investment */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-cyan-500/30 rounded-3xl p-6 flex flex-col"
          whileHover={{ borderColor: 'rgba(34, 211, 238, 0.6)', transition: { duration: 0.2 } }}
        >
          <div className="text-xs uppercase tracking-wider text-cyan-300/70 mb-2">
            Project Investment
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            ${totalSpend}
          </div>
          <div className="flex-1 flex flex-col justify-end min-h-[60px]">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Sora 2</span>
                <span>${soraSpend}</span>
              </div>
              <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600"
                  style={{ width: `${(soraSpend / totalSpend) * 100}%` }}
                />
                <div
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600"
                  style={{ width: `${(higgsfieldSpend / totalSpend) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Higgsfield</span>
                <span>${higgsfieldSpend}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 3: Carbon Footprint */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-emerald-500/30 rounded-3xl p-6 flex flex-col items-center justify-center relative"
          whileHover={{ borderColor: 'rgba(16, 185, 129, 0.6)', transition: { duration: 0.2 } }}
        >
          <div className="text-xs uppercase tracking-wider text-emerald-300/70 mb-2 w-full">
            Carbon Footprint
          </div>
          <div className="relative flex items-center justify-center w-32 h-32">
            {/* Circular ring SVG */}
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
                stroke="rgba(16, 185, 129, 0.5)"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
                strokeLinecap="round"
              />
            </svg>
            <div className="relative z-10 text-center">
              <div className="text-3xl font-bold text-white">{carbonKg}</div>
              <div className="text-sm text-emerald-300/70">kg CO₂</div>
            </div>
          </div>
        </motion.div>

        {/* Tile 4: Development Iterations */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-magenta-500/30 rounded-3xl p-6 flex flex-col"
          whileHover={{ borderColor: 'rgba(236, 72, 153, 0.6)', transition: { duration: 0.2 } }}
        >
          <div className="text-xs uppercase tracking-wider text-pink-300/70 mb-2">
            Development Iterations
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            {iterations}
          </div>
          <div className="flex-1 min-h-[60px]">
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={iterationBars}>
                <Bar
                  dataKey="value"
                  fill="#ec4899"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tile 5: AI Models Used */}
        <motion.div
          className="backdrop-blur-sm bg-slate-950/60 border border-purple-500/30 rounded-3xl p-6 flex flex-col items-center justify-center relative"
          whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)', transition: { duration: 0.2 } }}
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
                    <Cell key={`cell-${index}`} fill={donutColors[index % donutColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
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

