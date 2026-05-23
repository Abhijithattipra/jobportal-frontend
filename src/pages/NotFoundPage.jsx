import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
        Page not found
      </p>
      <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        <Home className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
