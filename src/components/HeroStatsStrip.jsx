import { motion } from 'framer-motion';

/**
 * HeroStatsStrip - Custom neon/cyberpunk stats strip with minimal SVG charts
 * Displays 5 key project statistics with pure SVG/CSS visualizations
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
  const sparklinePoints = [180, 190, 195, 210, 220, 230, 240, 247];
  const iterationBars = [120, 140, 135, 156];
  const donutColors = ['#a855f7', '#22d3ee', '#ec4899', '#8b5cf6', '#06b6d4'];

  // Generate sparkline path
  const generateSparkline = (data) => {
    const width = 200;
    const height = 60;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const step = width / (data.length - 1);
    
    const points = data.map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return points;
  };

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
            <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,60 ${generateSparkline(sparklinePoints)} 200,60`}
                fill="url(#sparklineGradient)"
              />
              <polyline
                points={generateSparkline(sparklinePoints)}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
              />
            </svg>
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
          <div className="flex-1 min-h-[60px] flex items-end gap-2">
            {iterationBars.map((value, index) => {
              const maxValue = Math.max(...iterationBars);
              const heightPercent = (value / maxValue) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 bg-pink-500 rounded-t"
                  style={{ height: `${heightPercent}%`, minHeight: '20%' }}
                />
              );
            })}
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
            <svg width="128" height="128" viewBox="0 0 128 128">
              {donutColors.map((color, index) => {
                const angle = (360 / modelsUsed) * index;
                const nextAngle = (360 / modelsUsed) * (index + 1);
                const startAngle = (angle - 90) * (Math.PI / 180);
                const endAngle = (nextAngle - 90) * (Math.PI / 180);
                const innerRadius = 45;
                const outerRadius = 60;
                
                const x1 = 64 + innerRadius * Math.cos(startAngle);
                const y1 = 64 + innerRadius * Math.sin(startAngle);
                const x2 = 64 + outerRadius * Math.cos(startAngle);
                const y2 = 64 + outerRadius * Math.sin(startAngle);
                const x3 = 64 + outerRadius * Math.cos(endAngle);
                const y3 = 64 + outerRadius * Math.sin(endAngle);
                const x4 = 64 + innerRadius * Math.cos(endAngle);
                const y4 = 64 + innerRadius * Math.sin(endAngle);
                
                return (
                  <path
                    key={index}
                    d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
                    fill={color}
                  />
                );
              })}
            </svg>
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

