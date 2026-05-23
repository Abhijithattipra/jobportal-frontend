import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function PasswordStrength({ password }) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  if (!password) return null;
  const strength = getStrength();
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="mt-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < strength ? colors[strength - 1] : 'bg-gray-200 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
      <p className="mt-0.5 text-xs text-gray-500">{labels[strength - 1] || ''}</p>
    </div>
  );
}

export default function RegisterPage() {
  const { register: registerUser, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const password = watch('password', '');

  const onSubmit = (data) => {
    const { confirmPassword, firstName, lastName, ...rest } = data;
    registerUser({ name: `${firstName} ${lastName}`, ...rest });
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              JobTracker
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create your account
          </p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input {...register('firstName')} className={inputClass} />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input {...register('lastName')} className={inputClass} />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input type="email" {...register('email')} className={inputClass} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input type="password" {...register('password')} className={inputClass} />
            <PasswordStrength password={password} />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={inputClass}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading && <LoadingSpinner size="sm" />}
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
