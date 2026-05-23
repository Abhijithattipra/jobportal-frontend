import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  jobUrl: z.string().optional(),
  salaryRange: z.string().optional(),
  status: z.enum(['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']),
  source: z.enum(['LINKEDIN', 'NAUKRI', 'MANUAL']),
  appliedDate: z.string().optional(),
  jobDescription: z.string().optional(),
  notes: z.string().optional(),
});

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';
const labelClass = 'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300';

export default function JobModal({ isOpen, onClose, onSubmit, job, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      jobUrl: '',
      salaryRange: '',
      status: 'WISHLIST',
      source: 'MANUAL',
      appliedDate: '',
      jobDescription: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (job) {
      reset({
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        jobUrl: job.jobUrl || '',
        salaryRange: job.salaryRange || '',
        status: job.status || 'WISHLIST',
        source: job.source || 'MANUAL',
        appliedDate: job.appliedDate || '',
        jobDescription: job.jobDescription || '',
        notes: job.notes || '',
      });
    } else {
      reset({
        title: '',
        company: '',
        location: '',
        jobUrl: '',
        salaryRange: '',
        status: 'WISHLIST',
        source: 'MANUAL',
        appliedDate: '',
        jobDescription: '',
        notes: '',
      });
    }
  }, [job, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {job ? 'Edit Job' : 'Add Job'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title *</label>
              <input {...register('title')} className={inputClass} />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Company *</label>
              <input {...register('company')} className={inputClass} />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input {...register('location')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Job URL</label>
              <input {...register('jobUrl')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Salary Range</label>
              <input {...register('salaryRange')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Applied Date</label>
              <input type="date" {...register('appliedDate')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status *</label>
              <select {...register('status')} className={inputClass}>
                <option value="WISHLIST">Wishlist</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Source *</label>
              <select {...register('source')} className={inputClass}>
                <option value="MANUAL">Manual</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="NAUKRI">Naukri</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Job Description</label>
            <textarea
              {...register('jobDescription')}
              rows={3}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea {...register('notes')} rows={2} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading && <LoadingSpinner size="sm" />}
              {job ? 'Update' : 'Add'} Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
