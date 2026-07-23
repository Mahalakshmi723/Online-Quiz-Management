/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Filter, Play, BookOpen, Layers, Award } from 'lucide-react';
import { QuizCategory, AppView } from '../types';
import * as Icons from 'lucide-react';

interface CategoriesPageProps {
  categories: QuizCategory[];
  setView: (view: AppView) => void;
  setSelectedCategoryForQuiz: (id: string) => void;
}

export default function CategoriesPage({
  categories,
  setView,
  setSelectedCategoryForQuiz
}: CategoriesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Filter logic
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || cat.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleStartQuiz = (categoryId: string) => {
    setSelectedCategoryForQuiz(categoryId);
    setView('quiz');
  };

  // Safe Lucide icon rendering helper
  const renderCategoryIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.BookOpen;
    return <IconComponent className="h-6 w-6 text-purple-600" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Search/Filters Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Quiz Categories</h1>
            <p className="text-sm text-gray-400 mt-1">
              Select one of our 11 curated subject areas to test and expand your technical knowledge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 focus:border-purple-500 rounded-lg text-sm outline-none text-gray-800 shadow-xs"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="relative w-full sm:w-44 flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-xs">
              <Filter className="h-4 w-4 text-gray-400 mr-2" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-transparent text-gray-700 outline-none w-full appearance-none pr-4 cursor-pointer font-medium"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 text-sm text-gray-400 font-medium">
          <span>Found {filteredCategories.length} quiz topics</span>
          {searchTerm || selectedDifficulty !== 'All' ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('All');
              }}
              className="text-purple-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          ) : null}
        </div>

        {/* Category Cards Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-200">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-bold text-gray-700">No categories match your criteria</p>
            <p className="text-sm text-gray-400 mt-1">Try resetting the search terms or difficulty filter selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
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

                  <h3 className="font-sans font-extrabold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed h-12 overflow-hidden line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-400">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{cat.questionCount} MCQs</span>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(cat.id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Start Quiz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
