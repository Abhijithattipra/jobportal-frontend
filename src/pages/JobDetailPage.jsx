import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, ExternalLink } from 'lucide-react';
import useJobs from '../hooks/useJobs';
import { useToast } from '../App';
import JobStatusBadge from '../components/jobs/JobStatusBadge';
import JobModal from '../components/jobs/JobModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatDate, formatDateTime } from '../utils/formatters';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchJobById, editJob, removeJob, loading, error } = useJobs();
  const addToast = useToast();
  const [job, setJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobById(id).then((data) => {
      if (data) setJob(data);
    });
  }, [id, fetchJobById]);

  const handleEdit = async (data) => {
    setSubmitting(true);
    try {
      const updated = await editJob(id, data);
      setJob(updated);
      setModalOpen(false);
      addToast('Job updated successfully');
    } catch {
      addToast('Failed to update job', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await removeJob(id);
      addToast('Job deleted successfully');
      navigate('/jobs');
    } catch {
      addToast('Failed to delete job', 'error');
    }
  };

  if (loading && !job) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !job) {
    return <ErrorMessage message={error} />;
  }

  if (!job) return null;

  const fields = [
    { label: 'Location', value: job.location },
    { label: 'Salary Range', value: job.salaryRange },
    { label: 'Source', value: job.source },
    { label: 'Applied Date', value: formatDate(job.appliedDate) },
    { label: 'Created', value: formatDateTime(job.createdAt) },
    { label: 'Updated', value: formatDateTime(job.updatedAt) },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </button>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {job.title}
            </h1>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
              {job.company}
            </p>
            <div className="mt-2">
              <JobStatusBadge status={job.status} />
            </div>
          </div>
          <div className="flex gap-2">
            {job.jobUrl && (
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ExternalLink className="h-4 w-4" />
                Job URL
              </a>
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                {label}
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {value || '—'}
              </p>
            </div>
          ))}
        </div>

        {job.jobDescription && (
          <div className="mt-6">
            <h3 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400">
              Job Description
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {job.jobDescription}
            </p>
          </div>
        )}

        {job.notes && (
          <div className="mt-6">
            <h3 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400">
              Notes
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {job.notes}
            </p>
          </div>
        )}
      </div>

      <JobModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleEdit}
        job={job}
        loading={submitting}
      />
    </div>
  );
}
