import { Search } from 'lucide-react';

const statuses = ['ALL', 'WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];

export default function JobFilters({ activeStatus, onStatusChange, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-1">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeStatus === status
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-72"
        />
      </div>
    </div>
  );
}
