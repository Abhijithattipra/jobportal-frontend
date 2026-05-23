import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Send, CalendarCheck, Trophy, Plus } from 'lucide-react';
import useJobs from '../hooks/useJobs';
import StatsCard from '../components/dashboard/StatsCard';
import StatusPieChart from '../components/dashboard/StatusPieChart';
import ApplicationBarChart from '../components/dashboard/ApplicationBarChart';
import JobStatusBadge from '../components/jobs/JobStatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate } from '../utils/formatters';

export default function DashboardPage() {
  const { jobs, stats, loading, error, fetchJobs, fetchStats } = useJobs();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [fetchJobs, fetchStats]);

  if (loading && !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statusCounts = stats?.statusCounts || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </button>
      </div>

      <ErrorMessage message={error} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Jobs"
          value={stats?.totalJobs || 0}
          icon={Briefcase}
          color="indigo"
        />
        <StatsCard
          title="Applied This Month"
          value={stats?.appliedThisMonth || 0}
          icon={Send}
          color="blue"
        />
        <StatsCard
          title="Interviews"
          value={statusCounts.INTERVIEW || 0}
          icon={CalendarCheck}
          color="yellow"
        />
        <StatsCard
          title="Offers"
          value={statusCounts.OFFER || 0}
          icon={Trophy}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Jobs by Status
          </h2>
          <StatusPieChart statusCounts={statusCounts} />
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Applications Over Time
          </h2>
          <ApplicationBarChart jobs={jobs} />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Recent Jobs
        </h2>
        {jobs.length === 0 ? (
          <p className="text-sm text-gray-400">No jobs yet. Start tracking your applications!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  {['Title', 'Company', 'Status', 'Applied Date'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {jobs.slice(0, 5).map((job) => (
                  <tr
                    key={job.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {job.company}
                    </td>
                    <td className="px-4 py-3">
                      <JobStatusBadge status={job.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(job.appliedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
