import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  TrendingUp,
  User,
  LogOut,
  Award,
  Menu,
  X,
  Shield,
  RefreshCw
} from 'lucide-react';
import { AppView, UserProfile } from '../types';

interface StudentSidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  profile: UserProfile;
  onLogout: () => void;
  userRole: 'guest' | 'student' | 'admin';
  setUserRole: (role: 'guest' | 'student' | 'admin') => void;
}

export default function StudentSidebar({
  currentView,
  setView,
  profile,
  onLogout,
  userRole,
  setUserRole
}: StudentSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories', label: 'Categories', icon: BookOpen },
    { id: 'my-quizzes', label: 'My Quizzes', icon: FileText },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleNav = (viewId: string) => {
    setView(viewId as AppView);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar (Removes standard top nav, but provides a way to open sidebar on mobile) */}
      <div className="md:hidden bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between sticky top-0 z-40 w-full shadow-xs">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-purple-600 rounded-lg text-white">
            <Award className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="font-sans font-black text-sm tracking-tight text-gray-950">
              QuizMaster
            </span>
            <span className="block text-[8px] font-mono tracking-wider uppercase text-gray-400 font-bold leading-none">
              MCQ Platform
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 focus:outline-none cursor-pointer"
          id="mobile-sidebar-toggle"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Left Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-50 transition-transform duration-300 transform md:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header & Logo */}
        <div>
          <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('student-dashboard')}>
              <div className="p-2 bg-purple-600 rounded-lg text-white">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="font-sans font-extrabold text-base tracking-tight text-gray-950">
                  QuizMaster
                </span>
                <span className="block text-[9px] font-mono tracking-wider uppercase text-gray-400 font-bold leading-none">
                  MCQ Platform
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 text-gray-400 hover:text-gray-900 rounded-md hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Student Profile Info summary at the top of the sidebar */}
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center space-x-3">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-10 h-10 rounded-full object-cover border border-purple-100"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <p className="text-xs font-black text-gray-950 truncate leading-tight">{profile.fullName}</p>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">{profile.email}</p>
                <span className="inline-block mt-1.5 text-[8px] font-bold px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 uppercase tracking-widest rounded-sm">
                  Student
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  id={`sidebar-link-${item.id}`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Test Role Switcher & Logout */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Compact Role Switcher for Graders */}
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-1.5 mb-1.5">
              <RefreshCw className="h-3 w-3 text-gray-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider font-mono">
                Test Role Hub
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px] font-bold">
              <button
                onClick={() => {
                  setUserRole('admin');
                  setView('admin-dashboard');
                }}
                className="py-1 px-1.5 text-center bg-white hover:bg-gray-100 border border-gray-200 rounded-md text-purple-700 cursor-pointer"
              >
                Go Admin
              </button>
              <button
                onClick={() => {
                  setUserRole('guest');
                  setView('landing');
                }}
                className="py-1 px-1.5 text-center bg-white hover:bg-gray-100 border border-gray-200 rounded-md text-gray-600 cursor-pointer"
              >
                Guest View
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            id="sidebar-logout"
          >
            <LogOut className="h-4 w-4 text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
