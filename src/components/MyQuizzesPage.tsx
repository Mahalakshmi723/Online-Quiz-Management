import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Award,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { QuizCategory, QuizAttempt, AppView } from '../types';

interface MyQuizzesPageProps {
  attempts: QuizAttempt[];
  categories: QuizCategory[];
  setView: (view: AppView) => void;
  setSelectedAttemptId: (id: string) => void;
  setSelectedCategoryForQuiz: (id: string) => void;
}

export default function MyQuizzesPage({
  attempts,
  categories,
  setView,
  setSelectedAttemptId,
  setSelectedCategoryForQuiz
}: MyQuizzesPageProps) {
  const [activeTab, setActiveTab] = useState<'completed' | 'available'>('completed');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filteredAttempts = attempts.filter((att) => {
    return att.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || cat.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleReviewAttempt = (attemptId: string) => {
    setSelectedAttemptId(attemptId);
    setView('review');
  };

  const handleStartQuiz = (categoryId: string) => {
    setSelectedCategoryForQuiz(categoryId);
    setView('quiz');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">Academic Registry</span>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">My Quizzes</h1>
              <p className="text-gray-400 text-xs mt-0.5">Track your exam history, check completed scores, and jump back into active subjects.</p>
            </div>
            
            {/* Tabs switcher */}
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 self-start">
              <button
                onClick={() => { setActiveTab('completed'); setSearchTerm(''); }}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  activeTab === 'completed'
                    ? 'bg-white text-gray-900 border border-gray-200 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Completed ({attempts.length})
              </button>
              <button
                onClick={() => { setActiveTab('available'); setSearchTerm(''); }}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  activeTab === 'available'
                    ? 'bg-white text-gray-900 border border-gray-200 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Available ({categories.length})
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder={activeTab === 'completed' ? "Search completed quizzes..." : "Search subject quizzes..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-purple-500 text-gray-900 transition-colors"
            />
          </div>

          {activeTab === 'available' && (
            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 text-xs">
              <Filter className="h-3.5 w-3.5 text-gray-400 mr-2" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-transparent text-gray-700 outline-none pr-4 font-bold cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Completed Quizzes */}
        {activeTab === 'completed' && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
            {filteredAttempts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">No Quizzes Completed Yet</h3>
                <p className="text-xs text-gray-400 mt-1">When you finish MCQ assessments, your academic records will show up right here.</p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Start First Quiz
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">
                      <th className="py-4 px-6">Quiz Domain</th>
                      <th className="py-4 px-6">Completion Date</th>
                      <th className="py-4 px-6 text-center">Questions</th>
                      <th className="py-4 px-6 text-center">Accuracy Score</th>
                      <th className="py-4 px-6 text-center">Time Spent</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                    {filteredAttempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
                              <CheckCircle2 className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{attempt.categoryName}</p>
                              <span className="text-[10px] font-mono text-gray-400 uppercase">MCQ ASSESSMENT</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1.5 text-gray-500">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            <span>{new Date(attempt.date).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-gray-500">
                          {attempt.totalQuestions} Questions
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block font-mono font-bold px-2 py-1 rounded-sm text-xs ${
                            attempt.percentage >= 80
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : attempt.percentage >= 50
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}>
                            {attempt.percentage}%
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center text-gray-500">
                          {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleReviewAttempt(attempt.id)}
                            className="px-3.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100/80 rounded-md text-xs font-bold transition-colors cursor-pointer inline-flex items-center space-x-1"
                          >
                            <span>Review Answers</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Available Quizzes */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-sm font-mono uppercase border ${
                      cat.difficulty === 'Beginner'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : cat.difficulty === 'Intermediate'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {cat.difficulty}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">10 Mins Duration</span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{cat.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-gray-400 text-xs">
                    <FileText className="h-4 w-4" />
                    <span>{cat.questionCount} MCQs</span>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(cat.id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <span>Start Quiz</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="col-span-full py-12 text-center text-xs text-gray-400">
                No available subject quizzes match your query.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
