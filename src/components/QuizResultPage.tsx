/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, RefreshCw, ClipboardCheck, Clock, CheckCircle, XCircle, ArrowLeft, Download } from 'lucide-react';
import { QuizAttempt, AppView } from '../types';

interface QuizResultPageProps {
  attempt: QuizAttempt | null;
  setView: (view: AppView) => void;
  onRetry: () => void;
}

export default function QuizResultPage({
  attempt,
  setView,
  onRetry
}: QuizResultPageProps) {
  if (!attempt) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs max-w-sm w-full text-center">
          <Award className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-bold text-slate-700">No active result found</p>
          <button onClick={() => setView('student-dashboard')} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    percentage,
    timeTakenSeconds,
    categoryName
  } = attempt;

  // Circular progress configuration
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Success theme colors
  let colorTheme = {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-100',
    circle: 'stroke-emerald-500',
    label: 'Passed with Honors'
  };

  if (percentage < 50) {
    colorTheme = {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-100',
      circle: 'stroke-rose-500',
      label: 'Needs Improvement'
    };
  } else if (percentage < 80) {
    colorTheme = {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-100',
      circle: 'stroke-amber-500',
      label: 'Passed Successfully'
    };
  }

  const handleDownloadReport = () => {
    // Generate simple dynamic receipt download
    const reportData = `
ONLINE ASSESSMENT RESULT REPORT
-------------------------------
Subject: ${categoryName} MCQ Assessment
Date Taken: ${attempt.date}
Total Questions: ${totalQuestions}
Correct Answers: ${correctAnswers}
Wrong Answers: ${wrongAnswers}
Percentage Achieved: ${percentage}%
Time Taken: ${Math.floor(timeTakenSeconds / 60)}m ${timeTakenSeconds % 60}s
Status: ${colorTheme.label}
-------------------------------
Generated via QuizMaster MCQ Examination Portal
    `;

    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Result_${categoryName}_${attempt.date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        
        {attempt.wasTimeUp && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs sm:text-sm flex items-start space-x-3 text-left shadow-xs animate-fadeIn">
            <span className="text-lg shrink-0 mt-0.5">⏰</span>
            <div>
              <p className="font-extrabold text-amber-900 leading-snug">Time's Up! Your quiz has been submitted automatically.</p>
              <p className="text-xs text-amber-700 mt-1 leading-normal">
                The 20-minute examination timer limit was reached. All answers selected up to that point have been securely recorded.
              </p>
            </div>
          </div>
        )}

        {/* Main Result Card */}
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-gray-200 shadow-xs relative overflow-hidden text-center border-t-4 border-t-purple-600">
          
          <div className="mb-8">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Exam Submitted</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1.5">
              {categoryName} MCQ Result
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 pb-8 border-b border-gray-100">
            {/* Custom Circular Progress Chart */}
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                {/* Background Track Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-gray-100"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Score Progress Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className={`transition-all duration-1000 ${colorTheme.circle}`}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-black text-gray-900 font-mono">{percentage}%</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Correct</span>
              </div>
            </div>

            {/* General Description */}
            <div className="text-center md:text-left space-y-3">
              <div className={`inline-flex px-3.5 py-1.5 rounded-md border text-xs font-bold uppercase tracking-wider ${colorTheme.bg} ${colorTheme.text} ${colorTheme.border}`}>
                {colorTheme.label}
              </div>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                You correctly answered <span className="font-extrabold text-gray-900">{correctAnswers} out of {totalQuestions}</span> questions in our timed MCQ exam. Your accuracy rate has been added to your profile analytics page.
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Total Questions</span>
              <span className="text-xl font-bold text-gray-800 block mt-1">{totalQuestions}</span>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Correct</span>
              </div>
              <span className="text-xl font-extrabold text-emerald-800 block mt-1">{correctAnswers}</span>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-100 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-rose-600 text-xs font-bold uppercase tracking-wider">
                <XCircle className="h-3.5 w-3.5" />
                <span>Wrong</span>
              </div>
              <span className="text-xl font-extrabold text-rose-800 block mt-1">{wrongAnswers}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5" />
                <span>Time Taken</span>
              </div>
              <span className="text-lg font-bold text-gray-800 block mt-1.5 font-mono">
                {Math.floor(timeTakenSeconds / 60)}m {timeTakenSeconds % 60}s
              </span>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={() => setView('review')}
              className="w-full sm:w-auto px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xs transition-colors text-sm flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <ClipboardCheck className="h-4.5 w-4.5" />
              <span>Review Answers</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="w-full sm:w-auto px-6 py-3.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Download className="h-4.5 w-4.5 text-gray-400" />
              <span>Download Result</span>
            </button>

            <button
              onClick={() => setView('student-dashboard')}
              className="w-full sm:w-auto px-6 py-3.5 text-gray-400 hover:text-gray-800 font-bold text-sm hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
