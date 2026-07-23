/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AppView } from '../types';

interface LoginPageProps {
  setView: (view: AppView) => void;
  setUserRole: (role: 'guest' | 'student' | 'admin') => void;
  onLoginAttempt: (email: string, password: string, isAdmin: boolean) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
  successMessage?: string;
}

export default function LoginPage({ setView, setUserRole, onLoginAttempt, successMessage }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await onLoginAttempt(email, password, isAdmin);
      if (result && !result.success) {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-xs max-w-md w-full relative overflow-hidden border-t-4 border-t-purple-600">

        <div className="text-center mb-8">
          <div className="inline-flex p-2.5 bg-indigo-50 text-purple-600 rounded-md mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">Access your personalized MCQ examination portal</p>
        </div>

        {successMessage && !error && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-md border border-emerald-200 font-medium flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-md border border-rose-100 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoComplete="new-email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset links can be configured via administrative settings.')}
                className="text-xs text-purple-600 hover:underline font-semibold"
              >
                Forgot Password
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{isSubmitting ? 'Verifying...' : 'Log In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => setView('register')}
              className="text-purple-600 hover:underline font-bold"
            >
              Register as Student
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
