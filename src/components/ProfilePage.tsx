/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Mail, Phone, BookOpen, GraduationCap, Lock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UserProfile, AppView } from '../types';

interface ProfilePageProps {
  profile: UserProfile;
  setView: (view: AppView) => void;
  onUpdateProfile: (updated: UserProfile) => void;
}

export default function ProfilePage({
  profile,
  setView,
  onUpdateProfile
}: ProfilePageProps) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phoneNumber);
  const [college, setCollege] = useState(profile.college);
  const [department, setDepartment] = useState(profile.department);
  
  // Password state fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [notif, setNotif] = useState({ show: false, text: '', isError: false });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !college || !department) {
      setNotif({ show: true, text: 'Please fill out all personal details.', isError: true });
      return;
    }

    onUpdateProfile({
      fullName,
      email,
      phoneNumber: phone,
      college,
      department,
      avatarUrl: profile.avatarUrl
    });

    setNotif({ show: true, text: 'Personal details updated successfully!', isError: false });
    setTimeout(() => setNotif({ show: false, text: '', isError: false }), 4000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setNotif({ show: true, text: 'Please fill in all password fields.', isError: true });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setNotif({ show: true, text: 'New passwords do not match.', isError: true });
      return;
    }

    setNotif({ show: true, text: 'Password successfully changed!', isError: false });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setNotif({ show: false, text: '', isError: false }), 4000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Title row */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Student Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your student registration, college credentials, and platform password.</p>
        </div>

        {/* Status notification */}
        {notif.show && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 text-sm font-medium ${
            notif.isError
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            {notif.isError ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            <span>{notif.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Profile Photo Summary CARD */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs text-center">
              <div className="relative inline-block">
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-28 h-28 rounded-full object-cover ring-2 ring-purple-100 mx-auto"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-2 p-1.5 bg-purple-600 rounded-full text-white cursor-pointer hover:bg-purple-700 transition-colors shadow-xs" title="Change Photo">
                  <User className="h-3.5 w-3.5" />
                </span>
              </div>

              <h3 className="font-sans font-bold text-gray-900 text-base mt-4">{profile.fullName}</h3>
              <p className="text-xs font-semibold text-gray-400 mt-0.5">{profile.email}</p>

              <div className="mt-6 pt-5 border-t border-gray-100 text-left space-y-3.5 text-xs text-gray-400">
                <div className="flex items-center space-x-2.5">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <span className="font-medium truncate">{profile.college}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{profile.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details Form */}
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 shadow-xs">
              <h2 className="font-sans font-bold text-gray-900 text-base mb-6 border-b border-gray-100 pb-3">
                Personal Credentials
              </h2>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
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
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Academic Department
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <BookOpen className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
                      />
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
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xs text-xs cursor-pointer transition-colors"
                  >
                    Update Profile Details
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 shadow-xs">
              <h2 className="font-sans font-bold text-gray-900 text-base mb-6 border-b border-gray-100 pb-3">
                Change Profile Password
              </h2>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Lock className="h-4 w-4" />
                      </span>
                      <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg text-sm transition-colors outline-none text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xs text-xs cursor-pointer transition-colors"
                  >
                    Change Platform Password
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
