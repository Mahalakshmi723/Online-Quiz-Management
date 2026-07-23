/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, TrendingUp, PieChart as PieIcon, BarChart2, Calendar, Clock, ArrowLeft, RefreshCw, ChevronRight } from 'lucide-react';
import { QuizAttempt, QuizCategory, AppView } from '../types';

interface PerformancePageProps {
  attempts: QuizAttempt[];
  categories: QuizCategory[];
  setView: (view: AppView) => void;
  setSelectedAttemptId: (id: string) => void;
}

export default function PerformancePage({
  attempts,
  categories,
  setView,
  setSelectedAttemptId
}: PerformancePageProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'history'>('analytics');

  // Overall Statistics
  const totalAttempts = attempts.length;
  
  const totalCorrect = attempts.reduce((sum, att) => sum + att.correctAnswers, 0);
  const totalWrong = attempts.reduce((sum, att) => sum + att.wrongAnswers, 0);
  const totalQuestions = attempts.reduce((sum, att) => sum + att.totalQuestions, 0);
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Average time taken
  const avgTime = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, att) => sum + att.timeTakenSeconds, 0) / totalAttempts)
    : 0;

  // Custom doughnut chart slice calculations for Pie Chart
  const pieRadius = 50;
  const pieStroke = 12;
  const pieCircum = 2 * Math.PI * pieRadius;
  
  // Slices: Correct answers vs Wrong answers
  const correctPercent = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 70;
  const wrongPercent = 100 - correctPercent;
  const correctOffset = pieCircum - (correctPercent / 100) * pieCircum;

  // Historical data for Line Chart (progress over time)
  // Sorted chronologically
  const chronologicalAttempts = [...attempts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const handleReviewAttempt = (attemptId: string) => {
    setSelectedAttemptId(attemptId);
    setView('review');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Performance Analytics</h1>
            <p className="text-sm text-gray-400 mt-1">In-depth statistical reporting of your technical assessment scores.</p>
          </div>

          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-xs self-start sm:self-center">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-gray-800'
              }`}
            >
              Analytics Charts
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-gray-400 hover:text-gray-800'
              }`}
            >
              Full Test History
            </button>
          </div>
        </div>

        {/* Global Summary Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Completed</span>
            <p className="text-2xl font-black text-gray-900 mt-1">{totalAttempts} Exams</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Overall Accuracy</span>
            <p className="text-2xl font-black text-purple-600 mt-1">{overallAccuracy}% Accuracy</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Avg Time Spent</span>
            <p className="text-2xl font-black text-gray-900 mt-1 font-mono">
              {Math.floor(avgTime / 60)}m {avgTime % 60}s
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Study Streak</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">3 Days Active</p>
          </div>
        </div>

        {activeTab === 'analytics' ? (
          /* Charts section containing Pie, Bar, and Line charts */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Pie Chart: Correct vs Wrong (Screen 9: Pie Chart) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-sans font-bold text-gray-900 text-sm">Overall MCQ Accuracy</h3>
                  <PieIcon className="h-4 w-4 text-gray-400" />
                </div>

                <div className="relative flex items-center justify-center my-8">
                  {totalAttempts === 0 ? (
                    <div className="text-center py-6 text-xs text-gray-400">Take a quiz first to render charts.</div>
                  ) : (
                    <>
                      <svg className="w-36 h-36 transform -rotate-90">
                        {/* Track circle (Wrong answers - Red) */}
                        <circle
                          cx="72"
                          cy="72"
                          r={pieRadius}
                          className="stroke-rose-500"
                          strokeWidth={pieStroke}
                          fill="transparent"
                        />
                        {/* Overlay track (Correct answers - Green) */}
                        <circle
                          cx="72"
                          cy="72"
                          r={pieRadius}
                          className="stroke-emerald-500"
                          strokeWidth={pieStroke}
                          strokeDasharray={pieCircum}
                          strokeDashoffset={correctOffset}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-black text-gray-900 font-mono">{overallAccuracy}%</span>
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Correct</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Legend details */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-gray-400">Correct Answers</span>
                  </div>
                  <span className="font-mono font-bold text-gray-800">{totalCorrect} ({Math.round(correctPercent)}%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-gray-400">Wrong/Unanswered</span>
                  </div>
                  <span className="font-mono font-bold text-gray-800">{totalWrong} ({Math.round(wrongPercent)}%)</span>
                </div>
              </div>
            </div>

            {/* Line Chart: Score Progression Over Time (Screen 9: Line Chart) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-sans font-bold text-gray-900 text-sm">Score Progress Trend</h3>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>

              {chronologicalAttempts.length < 2 ? (
                <div className="h-56 flex flex-col items-center justify-center text-center text-gray-400 text-xs">
                  <TrendingUp className="h-8 w-8 text-gray-300 mb-2" />
                  <span>Not enough historic attempts. Complete 2 or more quizzes to see trend line.</span>
                </div>
              ) : (
                /* Pure React SVG Line Chart */
                <div className="relative">
                  <svg viewBox="0 0 400 200" className="w-full h-56 overflow-visible">
                    {/* Grid Lines */}
                    <line x1="30" y1="20" x2="380" y2="20" stroke="#f3f4f6" strokeWidth="1" />
                    <line x1="30" y1="70" x2="380" y2="70" stroke="#f3f4f6" strokeWidth="1" />
                    <line x1="30" y1="120" x2="380" y2="120" stroke="#f3f4f6" strokeWidth="1" />
                    <line x1="30" y1="170" x2="380" y2="170" stroke="#e5e7eb" strokeWidth="1.5" />

                    {/* Y Axis labels */}
                    <text x="5" y="24" className="text-[10px] font-mono font-bold fill-gray-400">100%</text>
                    <text x="5" y="74" className="text-[10px] font-mono font-bold fill-gray-400">70%</text>
                    <text x="5" y="124" className="text-[10px] font-mono font-bold fill-gray-400">40%</text>
                    <text x="5" y="174" className="text-[10px] font-mono font-bold fill-gray-400">0%</text>

                    {/* Plot Points and Line Paths */}
                    {(() => {
                      const points = chronologicalAttempts.map((att, i) => {
                        const stepX = chronologicalAttempts.length > 1
                          ? 30 + (i * (350 / (chronologicalAttempts.length - 1)))
                          : 200;
                        const stepY = 170 - (att.percentage / 100) * 150;
                        return { x: stepX, y: stepY, att };
                      });

                      const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                      return (
                        <>
                          {/* Smooth gradient fill underneath */}
                          {points.length > 1 && (
                            <path
                              d={`${pathD} L ${points[points.length - 1].x} 170 L ${points[0].x} 170 Z`}
                              className="fill-purple-50/25"
                            />
                          )}

                          {/* Line */}
                          <path
                             d={pathD}
                             className="stroke-purple-600 fill-none"
                             strokeWidth="3"
                             strokeLinecap="round"
                             strokeLinejoin="round"
                          />

                          {/* Dots */}
                          {points.map((p, idx) => (
                            <g key={idx} className="group/dot cursor-pointer">
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="5"
                                className="fill-white stroke-purple-600 hover:fill-purple-600 transition-colors"
                                strokeWidth="2.5"
                              />
                              {/* Overlay tooltips */}
                              <text
                                x={p.x}
                                y={p.y - 12}
                                className="text-[10px] font-bold font-mono fill-purple-700 text-center"
                                textAnchor="middle"
                              >
                                {p.att.percentage}%
                              </text>
                              {/* Label on X-axis */}
                              <text
                                x={p.x}
                                y="188"
                                className="text-[9px] font-bold fill-gray-400"
                                textAnchor="middle"
                              >
                                {p.att.categoryName}
                              </text>
                            </g>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}
            </div>

            {/* Bar Chart: Subject performance overview (Screen 9: Bar Chart) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-sans font-bold text-gray-900 text-sm">Subject Percentage Breakdown</h3>
                <BarChart2 className="h-4 w-4 text-gray-400" />
              </div>

              {/* Custom SVG Bar Chart comparing categories */}
              <div className="h-64 flex items-end justify-between gap-3 pt-6 px-4">
                {categories.slice(0, 8).map((cat, idx) => {
                  const subjectAttempts = attempts.filter((att) => att.categoryId === cat.id);
                  const scorePercent = subjectAttempts.length > 0
                    ? Math.round(subjectAttempts.reduce((sum, att) => sum + att.percentage, 0) / subjectAttempts.length)
                    : 0;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group/bar cursor-pointer">
                      <div className="relative w-full flex justify-center">
                        {/* Hover Score Badge */}
                        <span className="absolute -top-7 text-[10px] font-bold text-gray-700 bg-white border border-gray-200 px-1.5 py-0.5 rounded-sm opacity-0 group-hover/bar:opacity-100 transition-opacity z-10 shadow-xs">
                          {scorePercent}%
                        </span>
                        
                        {/* Bar Pillar */}
                        <div
                          className="w-8 sm:w-10 rounded-t-md bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                          style={{ height: `${Math.max(scorePercent * 1.5, 6)}px` }}
                        />
                      </div>
                      
                      {/* X Label */}
                      <span className="text-[10px] font-bold text-gray-400 mt-3 truncate w-full text-center uppercase tracking-wider font-mono">
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* Detailed Full Attempts History list (Screen 9: Quiz History) */
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-sans font-bold text-gray-900 text-base">Full Exam Logs</h3>
              <span className="text-xs font-bold text-gray-400 uppercase font-mono tracking-wider">{totalAttempts} Recorded attempts</span>
            </div>

            {attempts.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm">No quiz logs available. Take a quiz to view records.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm text-gray-400">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                      <th className="p-4 pl-6">Topic / Subject</th>
                      <th className="p-4">Date taken</th>
                      <th className="p-4">Time Taken</th>
                      <th className="p-4">Correct MCQs</th>
                      <th className="p-4">Final Score</th>
                      <th className="p-4 pr-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {attempts.map((att) => (
                      <tr key={att.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 pl-6 font-bold text-gray-900">{att.categoryName}</td>
                        <td className="p-4 flex items-center space-x-1 text-xs text-gray-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{att.date}</span>
                        </td>
                        <td className="p-4 text-xs font-mono text-gray-400">
                          {Math.floor(att.timeTakenSeconds / 60)}m {att.timeTakenSeconds % 60}s
                        </td>
                        <td className="p-4 font-mono text-xs font-bold text-gray-700">
                          {att.correctAnswers} / {att.totalQuestions}
                        </td>
                        <td className="p-4">
                          <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded-md ${
                            att.percentage >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {att.percentage}%
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => handleReviewAttempt(att.id)}
                            className="px-3 py-1 bg-gray-100 hover:bg-purple-600 text-gray-700 hover:text-white rounded-md text-xs font-semibold transition-all cursor-pointer"
                          >
                            Review Answers
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

      </div>
    </div>
  );
}
