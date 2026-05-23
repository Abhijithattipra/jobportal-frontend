import { useState, useEffect, useCallback } from 'react';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getDashboardStats,
} from '../api/jobApi';

export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getJobs();
      setJobs(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getJobById(id);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch job');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addJob = useCallback(async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createJob(jobData);
      setJobs((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const editJob = useCallback(async (id, jobData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await updateJob(id, jobData);
      setJobs((prev) => prev.map((j) => (j.id === id ? data : j)));
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeJob = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jobs,
    stats,
    loading,
    error,
    fetchJobs,
    fetchStats,
    fetchJobById,
    addJob,
    editJob,
    removeJob,
  };
}
