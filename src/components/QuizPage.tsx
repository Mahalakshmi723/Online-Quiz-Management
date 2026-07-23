/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Bookmark, ChevronLeft, ChevronRight, CheckSquare, AlertTriangle, ShieldCheck, AlertCircle } from 'lucide-react';
import { QuizCategory, Question, AppView, QuizAttempt } from '../types';
import { getTwentyQuestionsForCategory } from '../data/questionBank';

interface QuizPageProps {
  category: QuizCategory;
  questions: Question[];
  setView: (view: AppView) => void;
  onQuizSubmit: (attempt: QuizAttempt) => void;
}

export default function QuizPage({
  category,
  questions,
  setView,
  onQuizSubmit
}: QuizPageProps) {
  // Ensure we always have exactly 20 questions for this category
  const categoryQuestions = useMemo(() => {
    return getTwentyQuestionsForCategory(category.id, questions, category.name);
  }, [category.id, questions, category.name]);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(1200); // Exactly 20 minutes (1200 seconds)
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      // Automatically calculate and submit the quiz after showing the Time's Up dialog for 3 seconds
      const timeout = setTimeout(() => {
        calculateAndSubmit(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    const currentQuestion = categoryQuestions[currentIdx];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const toggleMarkForReview = () => {
    const qId = categoryQuestions[currentIdx].id;
    setMarkedForReview((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleNext = () => {
    if (currentIdx < categoryQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const calculateAndSubmit = (wasTimeUp = false) => {
    let correctCount = 0;
    let wrongCount = 0;

    categoryQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined) {
        if (selected === q.correctAnswerIndex) {
          correctCount++;
        } else {
          wrongCount++;
        }
      } else {
        wrongCount++; // unanswered counted as wrong for score
      }
    });

    const totalQ = categoryQuestions.length;
    const score = correctCount;
    const percentage = Math.round((correctCount / totalQ) * 100 * 10) / 10;
    
    // Total duration is 20 mins (1200 seconds)
    const timeTaken = 1200 - (wasTimeUp ? 0 : timeLeft);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      categoryId: category.id,
      categoryName: category.name,
      date: new Date().toISOString().split('T')[0],
      totalQuestions: totalQ,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      score,
      percentage,
      timeTakenSeconds: timeTaken,
      selectedAnswers,
      markedForReview,
      wasTimeUp
    };

    onQuizSubmit(attempt);
    setView('result');
  };

  if (categoryQuestions.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center border border-slate-100 shadow-sm">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">No questions available</h2>
          <p className="text-slate-500 text-sm mt-1.5">There are no questions configured for this category yet.</p>
          <button onClick={() => setView('categories')} className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = categoryQuestions[currentIdx];
  const isSelected = selectedAnswers[currentQuestion.id] !== undefined;
  const currentSelectedValue = selectedAnswers[currentQuestion.id];
  const isMarked = markedForReview.includes(currentQuestion.id);

  // Stats for progress bar
  const totalQuestionsCount = categoryQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestionsCount) * 100);

  return (
    <div className="bg-gray-50 min-h-screen py-8 relative">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Top Floating Timer Bar */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 text-purple-600 rounded-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 font-bold">University Placement Assessment Portal</span>
              <h2 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                {category.name} Examination
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Visual Progress Bar */}
            <div className="hidden sm:block text-right">
              <span className="text-xs font-bold text-gray-400 uppercase font-mono">Completed</span>
              <div className="flex items-center space-x-2 mt-0.5">
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-pulse" style={{ width: `${(answeredCount / totalQuestionsCount) * 100}%` }} />
                </div>
                <span className="text-xs font-bold text-gray-700 font-mono">{answeredCount}/{totalQuestionsCount}</span>
              </div>
            </div>

            {/* Timer component */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              timeLeft < 120 
                ? 'bg-rose-50 border-rose-200 text-rose-700 font-black animate-pulse shadow-xs shadow-rose-100' 
                : 'bg-slate-900 border-slate-900 text-white font-bold'
            }`}>
              <Clock className="h-4.5 w-4.5 text-purple-400 shrink-0" />
              <span className="font-mono text-xs sm:text-sm leading-none whitespace-nowrap">
                ⏰ Time Remaining: {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Main Quiz Board Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Question view container */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200 shadow-xs relative">
              
              {/* Question count and Progress percentage at the top */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <div className="text-sm font-extrabold text-gray-900 tracking-tight">
                    Question {currentIdx + 1} of {totalQuestionsCount}
                  </div>
                  <div className="text-xs font-bold text-purple-600 font-mono">
                    Progress: {progressPercent}%
                  </div>
                </div>
                
                {isMarked && (
                  <span className="flex items-center text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-md font-extrabold font-mono shadow-xs">
                    <Bookmark className="h-3.5 w-3.5 fill-current mr-1.5 text-amber-600" />
                    Review Logged
                  </span>
                )}
              </div>

              {/* Question Text */}
              <div className="min-h-[100px] flex items-center">
                <h3 className="font-sans font-bold text-gray-900 text-base sm:text-lg leading-relaxed mb-6">
                  {currentQuestion.text}
                </h3>
              </div>

              {/* MCQ Options Container */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx); // A, B, C, D
                  const isCurrentSelected = currentSelectedValue === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-150 flex items-center space-x-4 cursor-pointer ${
                        isCurrentSelected
                          ? 'border-purple-600 bg-purple-50/55 text-purple-900 font-extrabold shadow-xs shadow-purple-50/50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        isCurrentSelected ? 'bg-purple-600 text-white shadow-xs' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Action Row with exactly Previous, Next, Mark for Review, and Submit Quiz */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentIdx === 0}
                    className="px-4 py-2.5 text-xs font-bold text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 rounded-lg transition-all flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={toggleMarkForReview}
                    className={`flex items-center space-x-1.5 text-xs font-bold px-4 py-2.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                      isMarked
                        ? 'bg-amber-100 border-amber-300 text-amber-800 font-black'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isMarked ? 'fill-amber-600 text-amber-600' : 'text-gray-400'}`} />
                    <span>{isMarked ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                </div>

                <div>
                  {currentIdx < totalQuestionsCount - 1 ? (
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <CheckSquare className="h-4.5 w-4.5" />
                      <span>Submit Quiz</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar Question Nav Grid */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Question Grid</h4>
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-sm font-mono">MCQ-20</span>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
                {categoryQuestions.map((_, idx) => {
                  const qId = categoryQuestions[idx].id;
                  const isCurrent = idx === currentIdx;
                  const isAnswered = selectedAnswers[qId] !== undefined;
                  const isQMarked = markedForReview.includes(qId);

                  let bgClass = 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100';
                  if (isCurrent) bgClass = 'bg-purple-600 text-white border-purple-600 font-extrabold shadow-sm scale-105';
                  else if (isQMarked) bgClass = 'bg-amber-50 border-amber-200 text-amber-700 font-bold';
                  else if (isAnswered) bgClass = 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold';

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-md text-xs font-mono font-bold border transition-all text-center flex items-center justify-center cursor-pointer ${bgClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legends */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center space-x-2 text-[11px] font-medium text-gray-500">
                  <span className="w-3.5 h-3.5 rounded-sm bg-purple-600 block shrink-0" />
                  <span>Current Question</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] font-medium text-gray-500">
                  <span className="w-3.5 h-3.5 rounded-sm bg-emerald-50 border border-emerald-200 block shrink-0" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] font-medium text-gray-500">
                  <span className="w-3.5 h-3.5 rounded-sm bg-amber-50 border border-amber-200 block shrink-0" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] font-medium text-gray-500">
                  <span className="w-3.5 h-3.5 rounded-sm bg-gray-50 border border-gray-200 block shrink-0" />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Submit Overlay Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-md max-w-md w-full relative">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Confirm Exam Submission</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Are you sure you want to finalize and submit your assessment answers? You have answered{' '}
              <span className="font-extrabold text-gray-800">{answeredCount} out of {totalQuestionsCount}</span> questions.
            </p>
            
            {answeredCount < totalQuestionsCount && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-700 flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                <span><strong>Unanswered Questions Found:</strong> Submitting now will count remaining {totalQuestionsCount - answeredCount} unanswered questions as incorrect.</span>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-800 bg-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => calculateAndSubmit(false)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time's Up Auto Submission Modal Overlay */}
      {isTimeUp && (
        <div className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn">
          <div className="bg-white p-6 sm:p-10 rounded-lg border border-gray-200 shadow-xl max-w-md w-full text-center relative animate-scaleUp">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-5 text-rose-600 border border-rose-100">
              <Clock className="h-8 w-8 text-rose-500 animate-bounce" />
            </div>
            
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Time's Up!</h3>
            <p className="text-sm text-gray-600 mt-3 font-semibold leading-relaxed">
              Your quiz has been submitted automatically.
            </p>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              The 20-minute time limit for this examination has expired. Saving progress and preparing exam result sheet...
            </p>

            <div className="mt-8">
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 animate-[loadingBar_3s_linear]" style={{ width: '100%' }} />
              </div>
              <button
                onClick={() => calculateAndSubmit(true)}
                className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Proceed to Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
