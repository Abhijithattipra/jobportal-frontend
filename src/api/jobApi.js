import { jobApi } from './axios';

export const createJob = (data) =>
  jobApi.post('/api/jobs', data);

export const getJobs = () =>
  jobApi.get('/api/jobs');

export const getJobById = (id) =>
  jobApi.get(`/api/jobs/${id}`);

export const updateJob = (id, data) =>
  jobApi.put(`/api/jobs/${id}`, data);

export const deleteJob = (id) =>
  jobApi.delete(`/api/jobs/${id}`);

export const getJobsByStatus = (status) =>
  jobApi.get(`/api/jobs/status/${status}`);

export const getDashboardStats = () =>
  jobApi.get('/api/jobs/stats');
