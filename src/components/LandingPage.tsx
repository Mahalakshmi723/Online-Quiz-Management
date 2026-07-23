/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Clock, Zap, BarChart2, Trophy, ArrowRight, Star, GraduationCap } from 'lucide-react';
import { AppView } from '../types';

interface LandingPageProps {
  setView: (view: AppView) => void;
  setUserRole: (role: 'guest' | 'student' | 'admin') => void;
  isLoggedIn?: boolean;
}

export default function LandingPage({ setView, setUserRole, isLoggedIn }: LandingPageProps) {
  const handleGetStarted = () => {
    if (isLoggedIn) {
      setView('student-dashboard');
    } else {
      setView('login');
    }
  };

  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      title: 'Subject-wise Quizzes',
      description: 'Choose from 11 specialized technical and aptitude categories, ranging from core Java to web development and database normalized theory.',
      badge: '11 Subjects'
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: 'Timed MCQ Tests',
      description: 'Practice under real exam pressure with dynamic timers, review flags, and a streamlined navigation controller designed for exam success.',
      badge: 'Live Timer'
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: 'Instant Results',
      description: 'Get immediate score breakdowns, itemized accuracy percentages, and instant access to correct answers right after submission.',
      badge: 'Real-time'
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-emerald-600" />,
      title: 'Performance Analytics',
      description: 'Analyze your learning progress through visually engaging custom analytics, subject breakdowns, and score progress line charts.',
      badge: 'Interactive Charts'
    },
    {
      icon: <Trophy className="h-6 w-6 text-rose-500" />,
      title: 'Leaderboard',
      description: 'Track high scores and stack up against peers in core subjects. Build confidence while achieving continuous streak medals.',
      badge: 'Global Ranking'
    }
  ];

  const popularSubjects = [
    { name: 'Java', level: 'Intermediate', color: 'from-amber-500 to-red-500' },
    { name: 'Python', level: 'Beginner', color: 'from-blue-400 to-indigo-600' },
    { name: 'React', level: 'Intermediate', color: 'from-cyan-400 to-blue-600' },
    { name: 'Spring Boot', level: 'Advanced', color: 'from-green-400 to-emerald-600' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-gray-200">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1.5 rounded-md border border-indigo-100 text-purple-700 text-xs font-bold mb-6">
            <Star className="h-3.5 w-3.5 fill-current text-purple-600" />
            <span>Premium MCQ Examination Platform</span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 leading-tight max-w-4xl mx-auto">
            Test Your Knowledge <br />
            <span className="text-purple-600">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Enhance your conceptual understanding in technical programming languages, databases, framework structures, and quantitative aptitude through our professional, high-fidelity MCQ platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setView('categories')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Browse Categories</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-gray-900">11+</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Core Subjects</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-gray-900">100%</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">MCQ-Based</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-gray-900">Instant</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Detailed Explanation</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-gray-900">FREE</p>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Interactive Analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-sans font-bold text-3xl text-gray-900 tracking-tight">
            Designed for Exam Success
          </h2>
          <p className="mt-3 text-gray-500">
            Our platform contains specialized features designed in line with modern learning structures to help you track performance, review concepts, and achieve higher grades.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-2.5 bg-indigo-50 rounded-md">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular subjects visual teaser */}
      <section className="bg-purple-600 py-16 text-white relative overflow-hidden rounded-2xl max-w-7xl mx-auto mb-16 px-6 sm:px-12 lg:px-16">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center space-x-2 bg-purple-700 border border-purple-500 px-3 py-1 rounded text-purple-100 text-xs font-semibold mb-4">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Academically Verified Content</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to challenge your limits?
            </h2>
            <p className="mt-4 text-purple-100 text-sm sm:text-base leading-relaxed">
              Explore meticulously curated questions covering standard industrial domains. No coding editors, no complex code writing—purely concepts, syntax evaluation, output prediction, and standard theory.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setView('categories')}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-purple-700 font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Browse All 11 Categories
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:max-w-md">
            {popularSubjects.map((sub, i) => (
              <div key={i} className="bg-purple-700/40 p-5 rounded-lg border border-purple-500/30 flex flex-col justify-between h-36">
                <div>
                  <div className="h-2 w-2 rounded-full bg-white mb-3" />
                  <p className="font-bold text-lg">{sub.name}</p>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-purple-200 uppercase tracking-wider font-semibold font-mono text-[10px]">{sub.level}</span>
                  <span className="text-white font-bold hover:underline cursor-pointer" onClick={() => setView('categories')}>Take Quiz →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
