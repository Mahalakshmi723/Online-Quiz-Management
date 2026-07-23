/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, User, LogOut, Shield, Menu, X, Layers, LayoutDashboard, Settings } from 'lucide-react';
import { AppView, UserProfile } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  userRole: 'guest' | 'student' | 'admin';
  setUserRole: (role: 'guest' | 'student' | 'admin') => void;
  profile: UserProfile;
  onLogout: () => void;
  isLoggedIn?: boolean;
}

export default function Header({
  currentView,
  setView,
  userRole,
  setUserRole,
  profile,
  onLogout,
  isLoggedIn
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getRoleBadgeColor = () => {
    if (userRole === 'admin') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (userRole === 'student') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const handleNavClick = (view: AppView) => {
    setView(view);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('landing')}>
            <div className="p-2 bg-purple-600 rounded-lg text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-lg tracking-tight text-gray-900">
                QuizMaster
              </span>
              <span className="block text-[10px] font-mono tracking-wider uppercase text-gray-400 font-bold">
                MCQ Platform
              </span>
            </div>
          </div>

          {/* Role Switcher Hub (Always visible to let users test all 13 screens easily) */}
          <div className="hidden md:flex items-center space-x-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
            <span className="text-xs font-medium text-gray-400 px-2 uppercase font-mono">Test Role:</span>
            <button
              onClick={() => {
                setUserRole('guest');
                setView('landing');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                userRole === 'guest'
                  ? 'bg-white text-gray-800 font-bold border border-gray-200 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setUserRole('student');
                  setView('student-dashboard');
                } else {
                  setView('login');
                }
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                userRole === 'student'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setView('admin-dashboard');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                userRole === 'admin'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Admin (12,13)
            </button>
          </div>

          {/* Navigation Links for standard navbar */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick('landing')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'landing' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'categories' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Categories
            </button>
            {userRole === 'student' && (
              <>
                <button
                  onClick={() => handleNavClick('student-dashboard')}
                  className={`text-sm font-medium transition-colors ${
                    currentView === 'student-dashboard' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('performance')}
                  className={`text-sm font-medium transition-colors ${
                    currentView === 'performance' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Performance
                </button>
              </>
            )}
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`text-sm font-medium transition-colors ${
                    currentView === 'admin-dashboard' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Admin Panels
                </button>
              </>
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-4">
            {userRole === 'guest' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Register
                </button>
              </div>
            ) : (
              /* User Profile Widget */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 transition-all focus:outline-none"
                >
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-bold text-gray-800 leading-tight">{profile.fullName}</p>
                    <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider border ${getRoleBadgeColor()}`}>
                      {userRole}
                    </span>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-sm py-1.5 text-sm z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="font-bold text-gray-800 truncate">{profile.email}</p>
                    </div>

                    {userRole === 'student' && (
                      <>
                        <button
                          onClick={() => handleNavClick('student-dashboard')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                        >
                          <LayoutDashboard className="h-4 w-4 text-gray-400" />
                          <span>Student Dashboard</span>
                        </button>
                        <button
                          onClick={() => handleNavClick('profile')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                        >
                          <User className="h-4 w-4 text-gray-400" />
                          <span>Student Profile</span>
                        </button>
                      </>
                    )}

                    {userRole === 'admin' && (
                      <>
                        <button
                          onClick={() => handleNavClick('admin-dashboard')}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-gray-700"
                        >
                          <Shield className="h-4 w-4 text-gray-400" />
                          <span>Admin Control Panel</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => {
                        onLogout();
                        handleNavClick('landing');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 text-red-600 border-t border-gray-100 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {/* Quick role switches in mobile */}
          <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 mb-3">
            <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase font-mono tracking-wider">Test Role Selector:</p>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => {
                  setUserRole('guest');
                  handleNavClick('landing');
                }}
                className={`py-1 text-center text-xs font-semibold rounded-md ${
                  userRole === 'guest' ? 'bg-gray-200 text-gray-800' : 'text-gray-500'
                }`}
              >
                Guest
              </button>
              <button
                onClick={() => {
                  setUserRole('student');
                  handleNavClick('student-dashboard');
                }}
                className={`py-1 text-center text-xs font-semibold rounded-md ${
                  userRole === 'student' ? 'bg-purple-600 text-white' : 'text-gray-500'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setUserRole('admin');
                  handleNavClick('admin-dashboard');
                }}
                className={`py-1 text-center text-xs font-semibold rounded-md ${
                  userRole === 'admin' ? 'bg-purple-600 text-white' : 'text-gray-500'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('landing')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Categories
          </button>
          {userRole === 'student' && (
            <>
              <button
                onClick={() => handleNavClick('student-dashboard')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavClick('performance')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Performance
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Profile
              </button>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Admin Dashboard
              </button>
            </>
          )}

          {userRole === 'guest' && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => handleNavClick('login')}
                className="py-2 text-center text-sm font-medium text-gray-700 border border-gray-200 rounded-lg"
              >
                Login
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="py-2 text-center text-sm font-semibold text-white bg-purple-600 rounded-lg"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
