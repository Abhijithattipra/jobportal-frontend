import { useEffect, useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import useJobs from '../hooks/useJobs';
import { useToast } from '../App';
import JobTable from '../components/jobs/JobTable';
import JobFilters from '../components/jobs/JobFilters';
import JobModal from '../components/jobs/JobModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const PAGE_SIZE = 10;

export default function JobsPage() {
  const { jobs, loading, error, fetchJobs, addJob, editJob, removeJob } = useJobs();
  const addToast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    let result = jobs;
    if (activeStatus !== 'ALL') {
      result = result.filter((j) => j.status === activeStatus);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)
      );
    }
    return result;
  }, [jobs, activeStatus, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [activeStatus, searchQuery]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingJob) {
        await editJob(editingJob.id, data);
        addToast('Job updated successfully');
      } else {
        await addJob(data);
        addToast('Job added successfully');
      }
      setModalOpen(false);
      setEditingJob(null);
    } catch {
      addToast('Something went wrong', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await removeJob(id);
      addToast('Job deleted successfully');
    } catch {
      addToast('Failed to delete job', 'error');
    }
  };

  const openAdd = () => {
    setEditingJob(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jobs</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </button>
      </div>

      <ErrorMessage message={error} />

      <JobFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading && jobs.length === 0 ? (
        <div className="flex h-48 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <JobTable
            jobs={paginatedJobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {filteredJobs.length > PAGE_SIZE && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filteredJobs.length)} of{' '}
                {filteredJobs.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <JobModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingJob(null);
        }}
        onSubmit={handleSubmit}
        job={editingJob}
        loading={submitting}
      />
    </div>
  );
}
