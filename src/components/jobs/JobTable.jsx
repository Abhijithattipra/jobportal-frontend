import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Eye } from 'lucide-react';
import JobStatusBadge from './JobStatusBadge';
import { formatDate } from '../../utils/formatters';

export default function JobTable({ jobs, onEdit, onDelete }) {
  const navigate = useNavigate();

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-16 dark:border-gray-600">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No jobs found
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          Add your first job application to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {['Title', 'Company', 'Location', 'Status', 'Source', 'Applied Date', 'Actions'].map(
              (header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                {job.title}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {job.company}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {job.location || '—'}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <JobStatusBadge status={job.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {job.source}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {formatDate(job.appliedDate)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-600"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(job)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-600"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(job.id)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
