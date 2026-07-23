/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  Play
} from 'lucide-react';
import { QuizCategory, QuizAttempt, UserProfile, AppView } from '../types';
import * as Icons from 'lucide-react';

interface StudentDashboardProps {
  profile: UserProfile;
  categories: QuizCategory[];
  attempts: QuizAttempt[];
  setView: (view: AppView) => void;
  setSelectedCategoryForQuiz: (id: string) => void;
  setSelectedAttemptId: (id: string) => void;
}

export default function StudentDashboard({
  profile,
  categories,
  attempts,
  setView,
  setSelectedCategoryForQuiz,
  setSelectedAttemptId
}: StudentDashboardProps) {
  // Compute student stats
  const totalQuizzes = categories.length;
  const completedQuizzes = attempts.length;
  
  const avgScore = completedQuizzes > 0
    ? Math.round(attempts.reduce((sum, item) => sum + item.percentage, 0) / completedQuizzes)
    : 0;

  const bestScore = completedQuizzes > 0
    ? Math.round(Math.max(...attempts.map(item => item.percentage)))
    : 0;

  const recentAttempts = [...attempts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  // Subject performance calculation for the custom interactive SVG chart
  const subjectPerformance = categories.map((cat) => {
    const subjectAttempts = attempts.filter((att) => att.categoryId === cat.id);
    const avgPercent = subjectAttempts.length > 0
      ? Math.round(subjectAttempts.reduce((sum, att) => sum + att.percentage, 0) / subjectAttempts.length)
      : 0;
    return { name: cat.name, percent: avgPercent };
  }).filter(item => item.percent > 0 || ['Java', 'Python', 'React', 'DBMS', 'SQL'].includes(item.name));

  const startQuiz = (categoryId: string) => {
    setSelectedCategoryForQuiz(categoryId);
    setView('quiz');
  };

  const handleReviewAttempt = (attemptId: string) => {
    setSelectedAttemptId(attemptId);
    setView('review');
  };

  // Dynamically render lucide icon by string representation safely
  const renderCategoryIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.BookOpen;
    return <IconComponent className="h-5 w-5 text-purple-600" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 shadow-xs mb-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">Academic Dashboard</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                Welcome back, {profile.fullName}!
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {profile.department} • {profile.college}
              </p>
            </div>
            <button
              onClick={() => setView('categories')}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Explore New Quizzes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
            <div className="p-2.5 bg-indigo-50 text-purple-600 rounded-md">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Quizzes</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{totalQuizzes}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{completedQuizzes}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-md">
              <Percent className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{avgScore}%</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex items-center space-x-4">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-md">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Best Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{bestScore}%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Custom Subject Performance Chart (Screen 4: Subject Performance Chart) */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-sans font-bold text-gray-900 text-base">Subject Performance</h3>
                <p className="text-xs text-gray-400">Average accuracy percentage per subject</p>
              </div>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </div>

            {/* Custom Interactive SVG Horizontal Bar Chart */}
            <div className="space-y-4">
              {subjectPerformance.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>{item.name}</span>
                    <span className="font-mono text-purple-600">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(item.percent, 3)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Goal: 85%+ Correctness</span>
              <button onClick={() => setView('performance')} className="text-purple-600 font-bold hover:underline transition-all">
                Detailed Analytics →
              </button>
            </div>
          </div>

          {/* Recent Quiz History */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-sans font-bold text-gray-900 text-base">Recent Quiz History</h3>
                <p className="text-xs text-gray-400">Attempts and scores achieved in previous exams</p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded uppercase font-mono tracking-wider">
                {completedQuizzes} Total Tests
              </span>
            </div>

            {recentAttempts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <ShieldAlert className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-gray-700">No attempts yet</p>
                <p className="text-xs text-gray-400 mt-1">Select a category below to test your knowledge.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentAttempts.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2 bg-indigo-50 text-purple-600 rounded-md">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{item.categoryName} Assessment</h4>
                        <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {Math.round(item.timeTakenSeconds / 60)}m {item.timeTakenSeconds % 60}s
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          {item.correctAnswers} / {item.totalQuestions}
                        </p>
                        <span className={`text-[10px] font-bold uppercase ${
                          item.percentage >= 80 ? 'text-emerald-600' : item.percentage >= 50 ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {item.percentage}% Score
                        </span>
                      </div>
                      <button
                        onClick={() => handleReviewAttempt(item.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-800 transition-colors"
                        title="Review Answers"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available Quiz Categories Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-sans font-bold text-gray-900 text-lg">Available Quiz Categories</h3>
            <p className="text-sm text-gray-400">Pick any subject to challenge yourself with 3 core concept MCQs.</p>
          </div>
          <button
            onClick={() => setView('categories')}
            className="text-sm font-bold text-purple-600 hover:underline flex items-center space-x-1 transition-all"
          >
            <span>View All Categories</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Category Quick Grid (6 categories shown in dashboard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-indigo-50 text-purple-600 rounded-md">
                    {renderCategoryIcon(cat.iconName)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider border ${
                    cat.difficulty === 'Advanced'
                      ? 'bg-rose-50 text-rose-600 border-rose-100'
                      : cat.difficulty === 'Intermediate'
                      ? 'bg-amber-50 text-amber-600 border-amber-100'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {cat.difficulty}
                  </span>
                </div>
                <h4 className="font-sans font-bold text-gray-900 text-base">
                  {cat.name}
                </h4>
                <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-400">{cat.questionCount} Questions</span>
                <button
                  onClick={() => startQuiz(cat.id)}
                  className="px-3.5 py-1.5 bg-gray-50 hover:bg-purple-600 text-gray-700 hover:text-white rounded-md transition-all flex items-center space-x-1 cursor-pointer font-bold"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
