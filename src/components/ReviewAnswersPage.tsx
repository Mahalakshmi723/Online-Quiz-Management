/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  LayoutDashboard,
  Award,
  BookOpen
} from 'lucide-react';
import { QuizAttempt, Question, AppView } from '../types';
import { getTwentyQuestionsForCategory } from '../data/questionBank';

interface ReviewAnswersPageProps {
  attempt: QuizAttempt | null;
  questions: Question[];
  setView: (view: AppView) => void;
  onRetry: () => void;
}

export default function ReviewAnswersPage({
  attempt,
  questions,
  setView,
  onRetry
}: ReviewAnswersPageProps) {
  if (!attempt) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
          <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-bold text-slate-700">No active test details to review</p>
          <button onClick={() => setView('student-dashboard')} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get the 20 questions used in the quiz
  const attemptedQuestions = React.useMemo(() => {
    return getTwentyQuestionsForCategory(attempt.categoryId, questions, attempt.categoryName);
  }, [attempt.categoryId, questions, attempt.categoryName]);

  const {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    percentage,
    categoryName
  } = attempt;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Back Button */}
        <div className="flex items-center space-x-3 mb-6">
          <button
            onClick={() => setView('result')}
            className="p-2 bg-white hover:bg-gray-100 rounded-md border border-gray-200 shadow-xs text-gray-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest font-mono">Detailed Analysis</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Review MCQ Answers</h1>
          </div>
        </div>

        {/* Question Review Cards List */}
        <div className="space-y-6 mb-8">
          {attemptedQuestions.map((q, idx) => {
            const studentSelected = attempt.selectedAnswers[q.id];
            const isCorrect = studentSelected === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-lg p-6 sm:p-8 border shadow-xs relative overflow-hidden ${
                  isCorrect ? 'border-emerald-200 ring-1 ring-emerald-50' : 'border-rose-200 ring-1 ring-rose-50'
                }`}
              >
                {/* Visual Status Indicator strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                {/* Question metadata row */}
                <div className="flex items-start justify-between gap-4 mb-5 border-b border-gray-100 pb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold font-mono rounded-md">
                    Question {idx + 1} of {attemptedQuestions.length}
                  </span>
                  
                  {isCorrect ? (
                    <span className="flex items-center text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Correct Answer
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-rose-600 font-bold bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-md">
                      <XCircle className="h-3.5 w-3.5 mr-1" />
                      Incorrect Answer
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-gray-900 text-base leading-relaxed mb-6">
                  {q.text}
                </h3>

                {/* Options representation */}
                <div className="space-y-3 mb-6">
                  {q.options.map((option, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = studentSelected === optIdx;
                    const isCorrectAnswer = q.correctAnswerIndex === optIdx;

                    let optionStyle = 'border-gray-200 bg-white text-gray-700';
                    let letterStyle = 'bg-gray-100 text-gray-400';

                    if (isCorrectAnswer) {
                      // Correct answer highlighted in green
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      letterStyle = 'bg-emerald-500 text-white';
                    } else if (isSelected && !isCorrectAnswer) {
                      // Wrong selected answer highlighted in red
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                      letterStyle = 'bg-rose-500 text-white';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-4 rounded-lg border flex items-center justify-between gap-4 ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <span className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs ${letterStyle}`}>
                            {letter}
                          </span>
                          <span className="text-sm sm:text-base leading-snug">{option}</span>
                        </div>

                        {/* Labels for correctness */}
                        <div className="flex items-center space-x-2">
                          {isCorrectAnswer && (
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-sm">
                              Correct Answer
                            </span>
                          )}
                          {isSelected && (
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                              isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Answer Summary with explicit textual display of Your Answer and Correct Answer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-gray-100 text-xs sm:text-sm">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Your Answer:</span>
                    <span className={`inline-block mt-1 font-bold ${
                      studentSelected === undefined
                        ? 'text-amber-600'
                        : isCorrect
                        ? 'text-emerald-600'
                        : 'text-rose-600'
                    }`}>
                      {studentSelected !== undefined ? q.options[studentSelected] : 'Skipped / Unanswered'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Correct Answer:</span>
                    <span className="inline-block mt-1 font-bold text-emerald-600">
                      {q.options[q.correctAnswerIndex]}
                    </span>
                  </div>
                </div>

                {/* Explanation Box */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start space-x-3">
                  <HelpCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider">Explanation</h4>
                    <p className="text-gray-700 text-sm mt-1 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom statistics summary panel (Accuracy, Correct, Wrong) */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Correct</p>
              <p className="text-lg font-extrabold text-emerald-600">{correctAnswers} MCQs</p>
            </div>
            <div className="border-r border-gray-100 h-8 hidden sm:block" />
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Wrong</p>
              <p className="text-lg font-extrabold text-rose-500">{wrongAnswers} MCQs</p>
            </div>
            <div className="border-r border-gray-100 h-8 hidden sm:block" />
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Accuracy Rate</p>
              <p className="text-lg font-extrabold text-purple-600">{percentage}% Accuracy</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onRetry}
              className="flex-1 sm:flex-initial px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xs text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Quiz</span>
            </button>
            
            <button
              onClick={() => setView('student-dashboard')}
              className="flex-1 sm:flex-initial px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-semibold rounded-lg text-xs flex items-center justify-center space-x-1 cursor-pointer transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
