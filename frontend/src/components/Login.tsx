'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  confirmPassword: z.string(),
  risk_tolerance: z.enum(['low', 'medium', 'high']).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string>('');
  const { login, register, isLoading } = useAuthStore();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: any) => {
    setError('');
    try {
      if (isRegistering) {
        const { confirmPassword, ...registerData } = data as RegisterFormData;
        await register(registerData as RegisterCredentials);
      } else {
        await login(data as LoginCredentials);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred');
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Personal Investment Assistant
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                {...registerField('email')}
                type="email"
                className="input mt-1"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{String(errors.email?.message || '')}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...registerField('password')}
                type="password"
                className="input mt-1"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{String(errors.password?.message || '')}</p>
              )}
            </div>

            {isRegistering && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    {...registerField('confirmPassword')}
                    type="password"
                    className="input mt-1"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{String(errors.confirmPassword?.message || '')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="risk_tolerance" className="block text-sm font-medium text-gray-700">
                    Risk Tolerance
                  </label>
                  <select {...registerField('risk_tolerance')} className="input mt-1">
                    <option value="low">Conservative (Low Risk)</option>
                    <option value="medium">Moderate (Medium Risk)</option>
                    <option value="high">Aggressive (High Risk)</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-2 px-4"
            >
              {isLoading
                ? 'Please wait...'
                : isRegistering
                ? 'Create Account'
                : 'Sign In'
              }
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary-600 hover:text-primary-500 text-sm"
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}