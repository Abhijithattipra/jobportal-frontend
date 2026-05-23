import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ApplicationBarChart({ jobs }) {
  const monthCounts = {};
  (jobs || []).forEach((job) => {
    const date = job.appliedDate || job.createdAt;
    if (!date) return;
    const d = new Date(date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthCounts[key] = (monthCounts[key] || 0) + 1;
  });

  const data = Object.entries(monthCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, count]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      }),
      applications: count,
    }));

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="applications" fill="#4F46E5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
