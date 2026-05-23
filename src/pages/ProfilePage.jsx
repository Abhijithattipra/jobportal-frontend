import { LogOut, User } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProfilePage() {
  const { logout, loading } = useAuth();

  const token = localStorage.getItem('accessToken');
  let email = 'User';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      email = payload.sub || payload.email || 'User';
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <User className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {email}
            </p>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <button
          onClick={logout}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : <LogOut className="h-4 w-4" />}
          Logout
        </button>
      </div>
    </div>
  );
}
