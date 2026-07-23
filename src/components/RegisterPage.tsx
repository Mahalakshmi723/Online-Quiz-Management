/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, GraduationCap, Lock, ArrowRight } from 'lucide-react';
import { AppView } from '../types';

interface RegisterPageProps {
  setView: (view: AppView) => void;
  setUserRole: (role: 'guest' | 'student' | 'admin') => void;
  onRegisterSuccess: (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    college: string;
    department: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }> | void;
}

export default function RegisterPage({ setView, setUserRole, onRegisterSuccess }: RegisterPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone || !college || !department || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await onRegisterSuccess({
        fullName,
        email,
        phoneNumber: phone,
        college,
        department,
        password
      });

      if (res && !res.success) {
        setError(res.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-xs max-w-lg w-full relative overflow-hidden border-t-4 border-t-purple-600">

        <div className="text-center mb-8">
          <div className="inline-flex p-2.5 bg-indigo-50 text-purple-600 rounded-md mb-3">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">Create Student Account</h2>
          <p className="text-gray-400 text-sm mt-1">Register today to start taking timed concept MCQ examinations</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-md border border-rose-100 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
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
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Phone className="h-4 w-4" />
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Department
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <BookOpen className="h-4 w-4" />
                </span>
                <select
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Management Studies">Management Studies</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              College / University
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <GraduationCap className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Enter college / university name"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm transition-all outline-none text-slate-800"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 mt-4 cursor-pointer"
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Register & Start Quizzing'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => setView('login')}
              className="text-purple-600 hover:underline font-bold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
