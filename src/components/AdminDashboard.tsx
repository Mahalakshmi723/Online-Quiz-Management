/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Users,
  BookOpen,
  HelpCircle,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Download,
  CheckCircle,
  TrendingUp,
  LayoutDashboard,
  Tag,
  Award,
  ListCollapse,
  AlertCircle,
  LogOut,
  Clock
} from 'lucide-react';
import { QuizCategory, Question, AppView, AdminStats, QuizAttempt, UserProfile } from '../types';

interface AdminDashboardProps {
  categories: QuizCategory[];
  questions: Question[];
  attempts?: QuizAttempt[];
  stats: AdminStats;
  students: UserProfile[];
  onAddQuestion: (q: Question) => void;
  onAddQuestions: (qs: Question[]) => void;
  onEditQuestion: (q: Question) => void;
  onDeleteQuestion: (qId: string) => void;
  onAddCategory: (cat: QuizCategory) => void;
  onLogout?: () => void;
  setView?: (view: AppView) => void;
  onUpdateCategory?: (cat: QuizCategory) => void;
  onUpdateStudent?: (student: UserProfile) => void;
}

type AdminSubView =
  | 'dashboard'
  | 'manage-categories'
  | 'manage-quizzes'
  | 'manage-questions'
  | 'manage-students'
  | 'add-quiz-questions'
  | 'results'
  | 'reports';

export default function AdminDashboard({
  categories,
  questions,
  attempts = [],
  stats,
  students,
  onAddQuestion,
  onAddQuestions,
  onEditQuestion,
  onDeleteQuestion,
  onAddCategory,
  onLogout,
  setView,
  onUpdateCategory,
  onUpdateStudent
}: AdminDashboardProps) {
  const [subView, setSubView] = useState<AdminSubView>('dashboard');

  // State for composing multiple quiz questions on one page
  const [multiQuestions, setMultiQuestions] = useState<Question[]>(() => [
    {
      id: `q-added-${Date.now()}-0`,
      categoryId: categories[0]?.id || 'java',
      text: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
      explanation: ''
    }
  ]);

  // State for Managing Questions
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All');
  
  // State for Add/Edit Question Modal
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState('');
  
  const [qText, setQText] = useState('');
  const [qCategory, setQCategory] = useState(categories[0]?.id || 'java');
  const [qOptA, setQOptA] = useState('');
  const [qOptB, setQOptB] = useState('');
  const [qOptC, setQOptC] = useState('');
  const [qOptD, setQOptD] = useState('');
  const [qCorrectIndex, setQCorrectIndex] = useState(0);
  const [qExplanation, setQExplanation] = useState('');

  // State for Managing Categories modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatDifficulty, setNewCatDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || q.categoryId === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Action helpers for Question Modal
  const handleOpenAdd = () => {
    setIsEditing(false);
    setQText('');
    setQCategory(categories[0]?.id || 'java');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQCorrectIndex(0);
    setQExplanation('');
    setShowQuestionModal(true);
  };

  const handleOpenEdit = (q: Question) => {
    setIsEditing(true);
    setEditingQuestionId(q.id);
    setQText(q.text);
    setQCategory(q.categoryId);
    setQOptA(q.options[0] || '');
    setQOptB(q.options[1] || '');
    setQOptC(q.options[2] || '');
    setQOptD(q.options[3] || '');
    setQCorrectIndex(q.correctAnswerIndex);
    setQExplanation(q.explanation);
    setShowQuestionModal(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText || !qOptA || !qOptB || !qOptC || !qOptD) {
      alert('Please fill out the question text and all four options.');
      return;
    }

    const newQ: Question = {
      id: isEditing ? editingQuestionId : `q-added-${Date.now()}`,
      categoryId: qCategory,
      text: qText,
      options: [qOptA, qOptB, qOptC, qOptD],
      correctAnswerIndex: qCorrectIndex,
      explanation: qExplanation || 'The chosen option correctly answers the technical concept.'
    };

    if (isEditing) {
      onEditQuestion(newQ);
    } else {
      onAddQuestion(newQ);
    }
    setShowQuestionModal(false);
  };

  // Category Addition helper
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatDesc) {
      alert('Please fill in the category name and description.');
      return;
    }

    const catId = newCatName.toLowerCase().replace(/\s+/g, '');
    const newCat: QuizCategory = {
      id: catId,
      name: newCatName,
      description: newCatDesc,
      iconName: 'Code',
      questionCount: 0,
      difficulty: newCatDifficulty
    };

    onAddCategory(newCat);
    setShowCategoryModal(false);
    
    // Auto-redirect to multiple questions adding page with this subject
    setSubView('add-quiz-questions');
    setMultiQuestions([
      {
        id: `q-added-${Date.now()}-0`,
        categoryId: catId,
        text: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        explanation: ''
      }
    ]);

    setNewCatName('');
    setNewCatDesc('');
  };

  // Report download generator helper
  const triggerDownloadReport = (title: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}_Report.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Mock reports content generator (Screen 13: Reports Page)
  const handleGenerateStudentReport = () => {
    const reportText = `
SYSTEM ADMINISTRATIVE REPORTS: Student Statistics
===================================================
Generated Date: ${new Date().toLocaleDateString()}
Report Scope: Overall Active Registrations and Performance metrics

Total Students: ${stats.totalStudents}
Average Completed Exams: ${stats.totalAttempts} (Avg: 2.1 per student)
Average System Score: 78.5% Correctness
Highest Performance Field: Java Core Concepts

Detailed Student Roster:
- Alex Carter (alex.carter@edu.org): 3 Quizzes completed, best score 100% (Python)
- Sarah Connor (sarah@univ.edu): Registered, CSE Dept
- Robert Chen (robert@tech.edu): Registered, CSE Dept

QuizMaster Examination Platform Analytics
    `;
    triggerDownloadReport('Student_Statistics_Summary', reportText);
  };

  const handleGenerateQuizReport = () => {
    const reportText = `
SYSTEM ADMINISTRATIVE REPORTS: Quiz Domain Metrics
==================================================
Generated Date: ${new Date().toLocaleDateString()}

Total Configured Subject Categories: ${categories.length}
Total Global Questions: ${questions.length}
Total Attempt Logs Saved: ${stats.totalAttempts}

Category Attempt Frequency:
- Python MCQ Assessment: 2 attempts, Avg Score: 100%
- React Hooks Assessment: 1 attempt, Avg Score: 66.7%
- DBMS Normalized Theory: 1 attempt, Avg Score: 66.7%
- Core Java Assessment: 0 attempts

QuizMaster Examination Platform Analytics
    `;
    triggerDownloadReport('Quiz_Domain_Frequency', reportText);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with Shield Icon */}
        <div className="bg-white text-gray-900 rounded-lg p-6 border border-gray-200 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-purple-600 rounded-lg text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest font-mono">Administration Hub</span>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">System Control Panel</h1>
            </div>
          </div>
          <span className="text-xs bg-gray-100 border border-gray-200 text-gray-600 font-mono px-3 py-1.5 rounded-lg">
            Active Session: Root Admin
          </span>
        </div>

        {/* Inner layout grid: Left Navigation Sidebar, Right Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Admin Navigation Sidebar (Screen 11 Menu) */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3.5 py-2 font-mono">Control Menu</p>
              
              <button
                onClick={() => setSubView('dashboard')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setSubView('manage-categories')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'manage-categories' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Tag className="h-4 w-4" />
                <span>Manage Categories</span>
              </button>

              <button
                onClick={() => setSubView('manage-quizzes')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'manage-quizzes' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Manage Quizzes</span>
              </button>

              <button
                onClick={() => setSubView('manage-questions')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'manage-questions' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Manage Questions</span>
              </button>

              <button
                onClick={() => {
                  setSubView('add-quiz-questions');
                  setMultiQuestions([
                    {
                      id: `q-added-${Date.now()}-0`,
                      categoryId: categories[0]?.id || 'java',
                      text: '',
                      options: ['', '', '', ''],
                      correctAnswerIndex: 0,
                      explanation: ''
                    }
                  ]);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'add-quiz-questions' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>Add Quiz Questions</span>
              </button>

              <button
                onClick={() => setSubView('manage-students')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'manage-students' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Manage Students</span>
              </button>

              <button
                onClick={() => setSubView('results')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'results' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Results</span>
              </button>

              <button
                onClick={() => setSubView('reports')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer ${
                  subView === 'reports' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>Reports</span>
              </button>

              <button
                onClick={() => {
                  if (onLogout) {
                    onLogout();
                  } else if (setView) {
                    setView('landing');
                  }
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-2.5 cursor-pointer text-red-600 hover:bg-red-50 mt-4"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Right Panel Body */}
          <div className="lg:col-span-3 space-y-6">
            
            {subView === 'dashboard' && (
              /* Administrative Dashboard Overview Tab (Screen 11 View) */
              <div className="space-y-6">
                
                {/* Global Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Students</span>
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-black text-gray-950 mt-2">{stats.totalStudents}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Quizzes</span>
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-black text-gray-950 mt-2">{categories.length}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Questions</span>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-black text-gray-950 mt-2">{questions.length}</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Attempts</span>
                      <Award className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-black text-gray-950 mt-2">{stats.totalAttempts}</p>
                  </div>
                </div>

                {/* Dashboard summary card list */}
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                  <h3 className="font-sans font-bold text-gray-900 text-sm mb-4">Quick Administrative Operations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleOpenAdd}
                      className="p-4 bg-white hover:bg-gray-50 text-purple-700 rounded-lg border border-gray-200 text-left transition-colors cursor-pointer"
                    >
                      <Plus className="h-5 w-5 mb-2 text-purple-600" />
                      <h4 className="font-bold text-xs font-mono uppercase text-gray-900">Add MCQ Question</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-normal">Draft a new multiple choice question complete with options and correct solution explanation.</p>
                    </button>

                    <button
                      onClick={() => setShowCategoryModal(true)}
                      className="p-4 bg-white hover:bg-gray-50 text-blue-700 rounded-lg border border-gray-200 text-left transition-colors cursor-pointer"
                    >
                      <Plus className="h-5 w-5 mb-2 text-blue-600" />
                      <h4 className="font-bold text-xs font-mono uppercase text-gray-900">Manage Categories</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-normal">Boot up a brand new course domain category into the system, enabling instant student quizzes.</p>
                    </button>
                  </div>
                </div>

                {/* Quick categories stats summary */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                    Subject Database Overview
                  </div>
                  <div className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                    {categories.map((cat) => {
                      const subjectQuestions = questions.filter((q) => q.categoryId === cat.id);
                      return (
                        <div key={cat.id} className="p-4 flex items-center justify-between">
                          <span className="font-bold text-gray-900 text-xs">{cat.name} Category</span>
                          <span className="font-mono text-gray-400">{subjectQuestions.length} standard MCQs</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {subView === 'manage-categories' && (
              /* Manage Categories Sub Panel */
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Manage Course Domains</h2>
                    <p className="text-xs text-gray-400">Boot up, edit and configuration options for standard subjects.</p>
                  </div>
                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Create Category</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <div key={cat.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono font-bold text-gray-400 tracking-wider">ID: {cat.id}</span>
                        <h3 className="font-bold text-gray-900 text-sm mt-1">{cat.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{cat.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase font-mono">
                        <span>Difficulty: {cat.difficulty}</span>
                        <span className="text-purple-600">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subView === 'manage-questions' && (
              /* Screen 12: Manage Questions Page with search, filter, adding, editing and delete capabilities */
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                
                {/* Search / Filter toolbar header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Question Bank (Screen 12)</h2>
                    <p className="text-xs text-gray-400">Add, edit, search and filter through the complete database of MCQ assessments.</p>
                  </div>

                  <button
                    onClick={handleOpenAdd}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-extrabold flex items-center space-x-1 cursor-pointer self-start md:self-center transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Question</span>
                  </button>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* Search inputs */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <Search className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search questions by text..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                    />
                  </div>

                  {/* Filter by Subject */}
                  <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs">
                    <Filter className="h-3.5 w-3.5 text-gray-400 mr-2" />
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="bg-transparent text-gray-700 outline-none w-full appearance-none pr-4 cursor-pointer font-bold"
                    >
                      <option value="All">All Subjects</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Questions Grid table list */}
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-12 text-xs text-gray-400">
                    No questions match your current filters. Add a new question above.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredQuestions.map((q) => {
                      const catObj = categories.find((c) => c.id === q.categoryId);
                      return (
                        <div
                          key={q.id}
                          className="p-5 border border-gray-200 rounded-lg bg-gray-50/40 hover:bg-gray-50 hover:border-gray-300 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold font-mono rounded-md">
                                {catObj?.name || q.categoryId}
                              </span>

                              {/* Row action buttons */}
                              <div className="flex items-center space-x-1.5">
                                <button
                                  onClick={() => handleOpenEdit(q)}
                                  className="p-1.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-purple-600 transition-colors cursor-pointer"
                                  title="Edit Question"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('Delete this question?')) {
                                      onDeleteQuestion(q.id);
                                    }
                                  }}
                                  className="p-1.5 bg-white border border-gray-200 hover:bg-rose-50 rounded-lg text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Delete Question"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>

                            <h3 className="font-bold text-gray-900 text-sm leading-relaxed">{q.text}</h3>

                            {/* Options List */}
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                              {q.options.map((opt, oIdx) => {
                                const isCorrect = q.correctAnswerIndex === oIdx;
                                return (
                                  <div
                                    key={oIdx}
                                    className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                                      isCorrect
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                                        : 'bg-white border-gray-200'
                                    }`}
                                  >
                                    <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                      isCorrect ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                      {String.fromCharCode(65 + oIdx)}
                                    </span>
                                    <span className="truncate">{opt}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Explanation preview text */}
                          <p className="text-[11px] text-gray-400 mt-3 line-clamp-1 border-t border-gray-100 pt-2 font-mono">
                            Explanation: {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}

            {subView === 'add-quiz-questions' && (
              /* Screen: Professional Batch Question Creator with dynamic +/- buttons */
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Add Quiz Questions</h2>
                    <p className="text-xs text-gray-400">Compose and save multiple MCQ questions in a single batch session.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMultiQuestions((prev) => [
                        ...prev,
                        {
                          id: `q-added-${Date.now()}-${prev.length}`,
                          categoryId: prev[prev.length - 1]?.categoryId || categories[0]?.id || 'java',
                          text: '',
                          options: ['', '', '', ''],
                          correctAnswerIndex: 0,
                          explanation: ''
                        }
                      ]);
                    }}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ Add Question</span>
                  </button>
                </div>

                <div className="space-y-8">
                  {multiQuestions.map((q, idx) => (
                    <div key={q.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50/30 relative">
                      {/* Header row with Delete option */}
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                        <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-bold font-mono rounded-md">
                          Question {idx + 1}
                        </span>
                        {multiQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setMultiQuestions((prev) => prev.filter((_, i) => i !== idx));
                            }}
                            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove Question</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-4 text-xs">
                        {/* Category Select for this specific question */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Subject Category
                          </label>
                          <select
                            value={q.categoryId}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMultiQuestions((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, categoryId: val } : item))
                              );
                            }}
                            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none text-gray-700 font-bold"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Question Text */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Question Text
                          </label>
                          <textarea
                            value={q.text}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMultiQuestions((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, text: val } : item))
                              );
                            }}
                            required
                            rows={2}
                            placeholder="e.g., Which normal form eliminates partial dependencies?"
                            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-purple-500 text-gray-900 font-medium transition-colors"
                          />
                        </div>

                        {/* MCQ Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx}>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                                Option {String.fromCharCode(65 + oIdx)}
                              </label>
                              <input
                                type="text"
                                required
                                value={opt}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setMultiQuestions((prev) =>
                                    prev.map((item, i) => {
                                      if (i === idx) {
                                        const nextOpts = [...item.options];
                                        nextOpts[oIdx] = val;
                                        return { ...item, options: nextOpts };
                                      }
                                      return item;
                                    })
                                  );
                                }}
                                placeholder={`Option ${String.fromCharCode(65 + oIdx)} text`}
                                className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-purple-500 text-gray-900 transition-colors"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Correct Answer dropdown */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Correct Answer Option
                          </label>
                          <select
                            value={q.correctAnswerIndex}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMultiQuestions((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, correctAnswerIndex: val } : item))
                              );
                            }}
                            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none text-gray-700 font-bold"
                          >
                            <option value={0}>Option A</option>
                            <option value={1}>Option B</option>
                            <option value={2}>Option C</option>
                            <option value={3}>Option D</option>
                          </select>
                        </div>

                        {/* Explanation */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Explanation / Solution logic
                          </label>
                          <textarea
                            value={q.explanation}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMultiQuestions((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, explanation: val } : item))
                              );
                            }}
                            rows={2}
                            placeholder="Explain why this option is correct..."
                            className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-purple-500 text-gray-900 transition-colors font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions row */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMultiQuestions((prev) => [
                        ...prev,
                        {
                          id: `q-added-${Date.now()}-${prev.length}`,
                          categoryId: prev[prev.length - 1]?.categoryId || categories[0]?.id || 'java',
                          text: '',
                          options: ['', '', '', ''],
                          correctAnswerIndex: 0,
                          explanation: ''
                        }
                      ]);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add Another Question</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      // Validation check
                      for (let i = 0; i < multiQuestions.length; i++) {
                        const item = multiQuestions[i];
                        if (!item.text.trim()) {
                          alert(`Please fill out the Question Text for Question ${i + 1}`);
                          return;
                        }
                        if (item.options.some((opt) => !opt.trim())) {
                          alert(`Please fill out all Options for Question ${i + 1}`);
                          return;
                        }
                      }

                      // Fill in fallback explanations if empty
                      const validatedQs = multiQuestions.map((item) => ({
                        ...item,
                        explanation: item.explanation.trim() || 'The chosen option correctly answers the technical concept.'
                      }));

                      if (onAddQuestions) {
                        onAddQuestions(validatedQs);
                      }
                      alert(`Successfully saved ${validatedQs.length} questions to the database!`);
                      setSubView('manage-questions');
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-lg text-xs shadow-md transition-colors cursor-pointer text-center"
                  >
                    Save All Questions
                  </button>
                </div>
              </div>
            )}

            {subView === 'manage-students' && (
              /* Manage Student Registry view list */
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900">Registered Students</h2>
                  <p className="text-xs text-gray-400">View college registration database details of users.</p>
                </div>

                <div className="divide-y divide-gray-100 text-xs font-medium text-gray-600">
                  <div className="py-3 flex items-center justify-between border-b border-gray-200 font-bold text-gray-400 uppercase font-mono tracking-wider">
                    <span className="w-1/3">Student / Email</span>
                    <span className="w-1/3">College & Department</span>
                    <span className="w-1/6 text-center">Registration / Status</span>
                    <span className="w-1/6 text-right">Action</span>
                  </div>
                  
                  {students.map((student) => (
                    <div key={student.email} className="py-4 flex items-center justify-between">
                      <div className="w-1/3 pr-2">
                        <h4 className="font-bold text-gray-900 text-sm">{student.fullName}</h4>
                        <p className="text-gray-400 text-xs truncate">{student.email}</p>
                      </div>
                      <div className="w-1/3 pr-2">
                        <p className="text-gray-900 font-bold">{student.department}</p>
                        <p className="text-gray-400 text-[10px] font-mono uppercase truncate">{student.college}</p>
                      </div>
                      <div className="w-1/6 text-center">
                        <p className="text-gray-900 font-mono text-[11px]">{student.registrationDate || '2026-07-15'}</p>
                        <span className="inline-block mt-1 font-bold px-1.5 py-0.5 rounded-sm uppercase text-[9px] border bg-emerald-50 text-emerald-700 border-emerald-100">
                          {student.status || 'Active'}
                        </span>
                      </div>
                      <div className="w-1/6 text-right">
                        <button 
                          onClick={() => {
                            const newName = prompt(`Edit Name for ${student.fullName}:`, student.fullName);
                            const newDept = prompt(`Edit Department for ${student.fullName}:`, student.department);
                            const newCol = prompt(`Edit College for ${student.fullName}:`, student.college);
                            if (newName || newDept || newCol) {
                              onUpdateStudent?.({
                                ...student,
                                fullName: newName || student.fullName,
                                department: newDept || student.department,
                                college: newCol || student.college
                              });
                            }
                          }}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subView === 'reports' && (
              /* Screen 13: Reports Page with mock Student, Quiz & Subject Reports generation and downloadable text reports */
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs">
                
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900">System Reports Generator (Screen 13)</h2>
                  <p className="text-xs text-gray-400">Generate, compile, and instantly download CSV/text summaries representing live statistics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Student Report Column */}
                  <div className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 text-center flex flex-col justify-between">
                    <div>
                      <div className="p-3 bg-purple-50 text-purple-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">Student Reports</h3>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Detailed compilation of all registered students, department metrics, and average performance scores.</p>
                    </div>
                    <button
                      onClick={handleGenerateStudentReport}
                      className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Report</span>
                    </button>
                  </div>

                  {/* Quiz Report Column */}
                  <div className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 text-center flex flex-col justify-between">
                    <div>
                      <div className="p-3 bg-blue-50 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">Quiz Reports</h3>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Compilation of available MCQ exam sets, question bank distribution, and aggregate test scores.</p>
                    </div>
                    <button
                      onClick={handleGenerateQuizReport}
                      className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Report</span>
                    </button>
                  </div>

                  {/* Subject Report Column */}
                  <div className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 text-center flex flex-col justify-between">
                    <div>
                      <div className="p-3 bg-emerald-50 text-emerald-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">Subject Reports</h3>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">Subject accuracy breakdown comparison, highest performing domain areas, and historical trends.</p>
                    </div>
                    <button
                      onClick={handleGenerateQuizReport}
                      className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {subView === 'manage-quizzes' && (
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs animate-fadeIn">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Manage Quizzes</h2>
                    <p className="text-xs text-gray-400">Configure core MCQ assessment settings, difficulty tiers, and duration policies.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-medium">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-mono font-bold uppercase text-gray-400">
                        <th className="py-3 px-4">Quiz Title</th>
                        <th className="py-3 px-4">Subject Key</th>
                        <th className="py-3 px-4 text-center">Difficulty</th>
                        <th className="py-3 px-4 text-center">Questions Count</th>
                        <th className="py-3 px-4 text-center">Time Limit</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                      {categories.map((cat) => (
                        <tr key={cat.id} className="hover:bg-gray-50/50">
                          <td className="py-4 px-4 font-bold text-gray-900">{cat.name}</td>
                          <td className="py-4 px-4 font-mono text-gray-400">{cat.id}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block font-bold px-2 py-0.5 rounded-sm uppercase text-[9px] border ${
                              cat.difficulty === 'Beginner'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                : cat.difficulty === 'Intermediate'
                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                              {cat.difficulty}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center font-bold text-gray-800">
                            {questions.filter(q => q.categoryId === cat.id).length} Questions
                          </td>
                          <td className="py-4 px-4 text-center text-gray-500 font-mono">
                            10 Mins
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSubView('add-quiz-questions');
                                setMultiQuestions([
                                  {
                                    id: `q-added-${Date.now()}-0`,
                                    categoryId: cat.id,
                                    text: '',
                                    options: ['', '', '', ''],
                                    correctAnswerIndex: 0,
                                    explanation: ''
                                  }
                                ]);
                              }}
                              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs font-bold transition-colors cursor-pointer"
                            >
                              Add Questions
                            </button>
                            <button
                              onClick={() => {
                                const newDifficulty = prompt(`Change difficulty for ${cat.name}? (Beginner, Intermediate, Advanced)`, cat.difficulty);
                                if (newDifficulty && ['Beginner', 'Intermediate', 'Advanced'].includes(newDifficulty)) {
                                  if (onUpdateCategory) {
                                    onUpdateCategory({
                                      ...cat,
                                      difficulty: newDifficulty as any
                                    });
                                  }
                                }
                              }}
                              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-xs font-bold transition-colors cursor-pointer"
                            >
                              Edit Settings
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {subView === 'results' && (
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-xs animate-fadeIn">
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-base font-bold text-gray-900">Student Results Log</h2>
                  <p className="text-xs text-gray-400">View live exam records, individual percentages, and answers chosen by test candidates.</p>
                </div>

                {attempts.length === 0 ? (
                  <div className="p-10 text-center text-xs text-gray-400">
                    No student results recorded yet on this deployment.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-medium">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-mono font-bold uppercase text-gray-400">
                          <th className="py-3 px-4">Student</th>
                          <th className="py-3 px-4">Subject</th>
                          <th className="py-3 px-4">Date Completed</th>
                          <th className="py-3 px-4 text-center">Score</th>
                          <th className="py-3 px-4 text-center">Percentage</th>
                          <th className="py-3 px-4 text-center">Duration</th>
                          <th className="py-3 px-4 text-right">Review</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-600">
                        {attempts.map((attempt) => (
                          <tr key={attempt.id} className="hover:bg-gray-50/50">
                            <td className="py-4 px-4 font-bold text-gray-900 truncate max-w-[150px]">
                              mv9365888@gmail.com
                            </td>
                            <td className="py-4 px-4 font-bold text-gray-800">{attempt.categoryName}</td>
                            <td className="py-4 px-4 text-gray-500">{new Date(attempt.date).toLocaleString()}</td>
                            <td className="py-4 px-4 text-center font-mono">
                              {attempt.correctAnswers}/{attempt.totalQuestions}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded-sm text-[11px] ${
                                attempt.percentage >= 80
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : attempt.percentage >= 50
                                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                  : 'bg-rose-50 text-rose-700 border border-rose-100'
                              }`}>
                                {attempt.percentage}%
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center text-gray-500 font-mono">
                              {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => {
                                  alert(`Reviewing: ${attempt.categoryName} for Candidate\nScore: ${attempt.percentage}%\nCorrect: ${attempt.correctAnswers}\nWrong: ${attempt.wrongAnswers}`);
                                }}
                                className="px-2.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-md font-bold transition-colors cursor-pointer"
                              >
                                View Details
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

      </div>

      {/* MODAL: Add/Edit Question */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-gray-950/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-xl max-w-lg w-full relative">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-4">
              {isEditing ? 'Edit MCQ Question' : 'Add MCQ Question'}
            </h3>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              
              {/* Category Select */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Subject Category
                </label>
                <select
                  value={qCategory}
                  onChange={(e) => setQCategory(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none text-gray-700 font-bold"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Question Text
                </label>
                <textarea
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  required
                  rows={3}
                  placeholder="Which normal form eliminates partial dependencies?"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 font-medium transition-colors"
                />
              </div>

              {/* MCQ Options A, B, C, D */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Option A
                  </label>
                  <input
                    type="text"
                    required
                    value={qOptA}
                    onChange={(e) => setQOptA(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Option B
                  </label>
                  <input
                    type="text"
                    required
                    value={qOptB}
                    onChange={(e) => setQOptB(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Option C
                  </label>
                  <input
                    type="text"
                    required
                    value={qOptC}
                    onChange={(e) => setQOptC(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Option D
                  </label>
                  <input
                    type="text"
                    required
                    value={qOptD}
                    onChange={(e) => setQOptD(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                  />
                </div>
              </div>

              {/* Correct Answer dropdown */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Correct Answer Index
                </label>
                <select
                  value={qCorrectIndex}
                  onChange={(e) => setQCorrectIndex(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none text-gray-700 font-bold"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              {/* Solution Explanation */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Explanation / Solved breakdown
                </label>
                <input
                  type="text"
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Second normal form eliminates partial dependencies by moving columns..."
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-800 bg-white rounded-lg font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  Save Question
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Category */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-gray-950/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-xl max-w-md w-full relative">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-4">Create Course Domain Category</h3>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Category / Subject Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., C++ Programming, Docker"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Subject Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g., Object-oriented concepts, templates, pointers & file handling in modern C++ standard."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white text-gray-900 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Difficulty Range
                </label>
                <select
                  value={newCatDifficulty}
                  onChange={(e) => setNewCatDifficulty(e.target.value as any)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none text-gray-700 font-bold"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-800 bg-white rounded-lg font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  Save Subject
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
