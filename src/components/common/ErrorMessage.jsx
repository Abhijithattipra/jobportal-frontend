import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
