import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { statusChartColors } from '../../utils/formatters';

export default function StatusPieChart({ statusCounts }) {
  const data = Object.entries(statusCounts || {})
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={statusChartColors[entry.name] || '#9CA3AF'}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
