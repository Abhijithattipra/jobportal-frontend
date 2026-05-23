export const formatDate = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const statusColors = {
  WISHLIST: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  APPLIED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  INTERVIEW: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  OFFER: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export const statusChartColors = {
  WISHLIST: '#9CA3AF',
  APPLIED: '#3B82F6',
  INTERVIEW: '#F59E0B',
  OFFER: '#10B981',
  REJECTED: '#EF4444',
};
