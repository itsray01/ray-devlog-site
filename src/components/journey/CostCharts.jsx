import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DollarSign, CheckCircle, Star, Clock } from 'lucide-react';
import journeyLogs from '../../content/journeyLogs';
import { calculateCost } from '../../content/creditsCost';

/**
 * CostCharts - Visualize costs, scores, and metrics from journey logs
 * Uses Recharts for bar and line charts with summary statistics
 */
const CostCharts = ({ logs = journeyLogs }) => {
  // Prepare chart data (sorted by date)
  const chartData = useMemo(() => {
    return [...logs]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((log, index) => ({
        index: index + 1,
        date: log.date,
        tool: log.tool,
        credits: log.creditsSpent,
        cost: parseFloat(calculateCost(log).toFixed(2)),
        score: log.resultScore,
        usable: log.usable ? 1 : 0,
        timeSpent: log.timeSpentMin
      }));
  }, [logs]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalCredits = logs.reduce((sum, log) => sum + log.creditsSpent, 0);
    const totalCost = logs.reduce((sum, log) => sum + calculateCost(log), 0);
    const usableCount = logs.filter(log => log.usable).length;
    const avgScore = (logs.reduce((sum, log) => sum + log.resultScore, 0) / logs.length).toFixed(1);
    const totalTime = logs.reduce((sum, log) => sum + log.timeSpentMin, 0);

    return {
      totalCredits,
      totalCost: totalCost.toFixed(2),
      usableCount,
      avgScore,
      totalTime: Math.floor(totalTime / 60) // Convert to hours
    };
  }, [logs]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="cost-charts__tooltip">
          <p className="cost-charts__tooltip-date">{data.date}</p>
          <p className="cost-charts__tooltip-tool">{data.tool}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '0.25rem 0' }}>
              {entry.name}: {entry.dataKey === 'cost' ? `$${entry.value}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cost-charts">
      {/* Summary Stats */}
      <div className="cost-charts__stats">
        <div className="cost-charts__stat">
          <div className="cost-charts__stat-icon">
            <DollarSign size={20} />
          </div>
          <div className="cost-charts__stat-content">
            <span className="cost-charts__stat-value">${stats.totalCost}</span>
            <span className="cost-charts__stat-label">Total Cost (USD)</span>
          </div>
        </div>

        <div className="cost-charts__stat">
          <div className="cost-charts__stat-icon cost-charts__stat-icon--success">
            <CheckCircle size={20} />
          </div>
          <div className="cost-charts__stat-content">
            <span className="cost-charts__stat-value">{stats.usableCount}</span>
            <span className="cost-charts__stat-label">Usable Outputs</span>
          </div>
        </div>

        <div className="cost-charts__stat">
          <div className="cost-charts__stat-icon cost-charts__stat-icon--warning">
            <Star size={20} />
          </div>
          <div className="cost-charts__stat-content">
            <span className="cost-charts__stat-value">{stats.avgScore}</span>
            <span className="cost-charts__stat-label">Avg Score</span>
          </div>
        </div>

        <div className="cost-charts__stat">
          <div className="cost-charts__stat-icon cost-charts__stat-icon--info">
            <Clock size={20} />
          </div>
          <div className="cost-charts__stat-content">
            <span className="cost-charts__stat-value">{stats.totalTime}h</span>
            <span className="cost-charts__stat-label">Time Spent</span>
          </div>
        </div>
      </div>

      {/* USD Cost Bar Chart */}
      <div className="cost-charts__chart-panel">
        <h4 className="cost-charts__chart-title">USD Cost Per Experiment</h4>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(167, 139, 250, 0.1)" />
            <XAxis
              dataKey="index"
              stroke="rgba(224, 231, 255, 0.5)"
              tick={{ fill: 'rgba(224, 231, 255, 0.7)', fontSize: 12 }}
              height={60}
            />
            <YAxis
              stroke="rgba(224, 231, 255, 0.5)"
              tick={{ fill: 'rgba(224, 231, 255, 0.7)', fontSize: 12 }}
              label={{
                value: 'USD Cost ($)',
                angle: -90,
                position: 'insideLeft',
                fill: 'rgba(224, 231, 255, 0.7)',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(167, 139, 250, 0.1)' }} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
            />
            <Bar
              dataKey="cost"
              fill="#a78bfa"
              name="USD Cost"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="cost-charts__chart-label">Experiment #</div>
      </div>

      {/* Result Score Line Chart */}
      <div className="cost-charts__chart-panel">
        <h4 className="cost-charts__chart-title">Result Score Over Time</h4>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(167, 139, 250, 0.1)" />
            <XAxis
              dataKey="index"
              stroke="rgba(224, 231, 255, 0.5)"
              tick={{ fill: 'rgba(224, 231, 255, 0.7)', fontSize: 12 }}
              height={60}
            />
            <YAxis
              domain={[0, 5]}
              stroke="rgba(224, 231, 255, 0.5)"
              tick={{ fill: 'rgba(224, 231, 255, 0.7)', fontSize: 12 }}
              label={{
                value: 'Score (1-5)',
                angle: -90,
                position: 'insideLeft',
                fill: 'rgba(224, 231, 255, 0.7)',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(167, 139, 250, 0.3)' }} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#0a0e27' }}
              activeDot={{ r: 7 }}
              name="Result Score"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="cost-charts__chart-label">Experiment #</div>
      </div>
    </div>
  );
};

export default CostCharts;
