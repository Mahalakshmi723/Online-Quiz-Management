/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import StudentDashboard from './components/StudentDashboard';
import CategoriesPage from './components/CategoriesPage';
import QuizPage from './components/QuizPage';
import QuizResultPage from './components/QuizResultPage';
import ReviewAnswersPage from './components/ReviewAnswersPage';
import PerformancePage from './components/PerformancePage';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import StudentSidebar from './components/StudentSidebar';
import MyQuizzesPage from './components/MyQuizzesPage';
import { AppView, QuizCategory, Question, QuizAttempt, UserProfile, AdminStats } from './types';
import {
  registerApi,
  loginApi,
  getCurrentUserApi,
  getCategoriesApi,
  getQuestionsApi,
  addQuestionsApi,
  updateQuestionApi,
  deleteQuestionApi,
  getAttemptsApi,
  submitAttemptApi,
  getStudentsApi,
  updateStudentProfileApi,
  setAuthToken,
  getAuthToken
} from './services/api';
import {
  INITIAL_CATEGORIES,
  INITIAL_QUESTIONS,
  INITIAL_ATTEMPTS,
  INITIAL_PROFILE,
  INITIAL_STUDENTS,
  loadState,
  saveState
} from './data/initialData';

export default function App() {
  // Helper to determine initial view based on URL route
  const getInitialView = (): AppView => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin' || hash === '#admin-dashboard') {
        return 'admin-dashboard';
      }
      if (path === '/' || path === '/index.html' || path === '') {
        return 'landing';
      }
    }
    return loadState<AppView>('current_view', 'landing');
  };

  const getInitialRole = (): 'guest' | 'student' | 'admin' => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin' || hash === '#admin-dashboard') {
        return 'admin';
      }
      if (path === '/' || path === '/index.html' || path === '') {
        return 'guest';
      }
    }
    return loadState<'guest' | 'student' | 'admin'>('user_role', 'guest');
  };

  // Global States
  const [currentView, setView] = useState<AppView>(getInitialView);
  const [userRole, setUserRole] = useState<'guest' | 'student' | 'admin'>(getInitialRole);

  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() =>
    loadState<string | null>('active_session_email', null)
  );

  const [activeProfile, setActiveProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string>('');

  const [categories, setCategories] = useState<QuizCategory[]>(INITIAL_CATEGORIES);
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [attempts, setAttempts] = useState<QuizAttempt[]>(INITIAL_ATTEMPTS);
  const [students, setStudents] = useState<UserProfile[]>(INITIAL_STUDENTS);

  // Active quiz state
  const [selectedCategoryIdForQuiz, setSelectedCategoryForQuiz] = useState<string>(() =>
    loadState<string>('selected_cat_for_quiz', 'python')
  );

  const [selectedAttemptId, setSelectedAttemptId] = useState<string>(() =>
    loadState<string>('selected_attempt_id', '')
  );

  // Load backend data on startup
  const refreshBackendData = async () => {
    try {
      const cats = await getCategoriesApi();
      if (cats && cats.length > 0) setCategories(cats);

      const qs = await getQuestionsApi();
      if (qs && qs.length > 0) setQuestions(qs);

      const atts = await getAttemptsApi(currentUserEmail || undefined);
      if (atts) setAttempts(atts);

      const stus = await getStudentsApi();
      if (stus && stus.length > 0) setStudents(stus);
    } catch (err) {
      console.warn('API sync warning (using cached data):', err);
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, [currentUserEmail]);

  // Sync token / user on load
  useEffect(() => {
    const initAuth = async () => {
      const user = await getCurrentUserApi();
      if (user) {
        setActiveProfile(user);
        setCurrentUserEmail(user.email);
        if (userRole === 'guest') {
          setUserRole('student');
        }
      }
    };
    initAuth();
  }, []);

  // Save changes to local storage when state changes & sync URL path
  useEffect(() => {
    saveState('current_view', currentView);
    if (typeof window !== 'undefined') {
      if (currentView === 'landing' && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.replaceState({}, '', '/');
      } else if (currentView === 'admin-dashboard' && window.location.pathname !== '/admin') {
        window.history.replaceState({}, '', '/admin');
      }
    }
  }, [currentView]);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin' || hash === '#admin-dashboard') {
        setView('admin-dashboard');
        setUserRole('admin');
      } else if (path === '/' || path === '/index.html') {
        setView('landing');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    saveState('user_role', userRole);
  }, [userRole]);

  useEffect(() => {
    saveState('active_session_email', currentUserEmail);
  }, [currentUserEmail]);

  useEffect(() => {
    saveState('selected_cat_for_quiz', selectedCategoryIdForQuiz);
  }, [selectedCategoryIdForQuiz]);

  useEffect(() => {
    saveState('selected_attempt_id', selectedAttemptId);
  }, [selectedAttemptId]);

  const userAttempts = currentUserEmail
    ? attempts.filter((a) => a.userEmail?.toLowerCase() === currentUserEmail.toLowerCase())
    : attempts;

  // Operations handlers
  const handleLoginAttempt = async (email: string, password: string, isAdmin: boolean) => {
    try {
      const result = await loginApi(email, password, isAdmin);
      if (result.success && result.user) {
        setActiveProfile(result.user);
        setCurrentUserEmail(result.user.email);
        setUserRole(isAdmin ? 'admin' : 'student');
        setView(isAdmin ? 'admin-dashboard' : 'student-dashboard');
        setLoginSuccessMessage('');

        // Fetch fresh user-specific attempts
        const userAtts = await getAttemptsApi(result.user.email);
        setAttempts(userAtts);

        return { success: true };
      }
      return { success: false, message: result.error || 'Login failed' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Login failed. Please check credentials.' };
    }
  };

  const handleRegisterSuccess = async (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    college: string;
    department: string;
    password: string;
  }) => {
    try {
      const result = await registerApi(data);
      if (result.success) {
        setLoginSuccessMessage('Registration successful! Please log in with your credentials.');
        setView('login');
        return { success: true };
      } else {
        return { success: false, message: result.error || 'Registration failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Registration failed' };
    }
  };

  const handleQuizSubmit = async (newAttempt: QuizAttempt) => {
    const attemptWithUser: QuizAttempt = {
      ...newAttempt,
      userEmail: currentUserEmail || activeProfile.email
    };

    try {
      const savedAttempt = await submitAttemptApi(attemptWithUser);
      setAttempts((prev) => [savedAttempt, ...prev]);
      setSelectedAttemptId(savedAttempt.id);
    } catch (err) {
      console.error('Failed to submit attempt to backend:', err);
      // Fallback
      setAttempts((prev) => [attemptWithUser, ...prev]);
      setSelectedAttemptId(attemptWithUser.id);
    }
  };

  const handleRetryQuiz = () => {
    const activeAttempt = attempts.find((a) => a.id === selectedAttemptId);
    if (activeAttempt) {
      setSelectedCategoryForQuiz(activeAttempt.categoryId);
      setView('quiz');
    } else {
      setView('categories');
    }
  };

  const handleAddQuestion = async (q: Question) => {
    try {
      const updatedList = await addQuestionsApi(q);
      setQuestions(updatedList);
      setCategories((prev) =>
        prev.map((c) => (c.id === q.categoryId ? { ...c, questionCount: c.questionCount + 1 } : c))
      );
    } catch (err) {
      setQuestions((prev) => [...prev, q]);
    }
  };

  const handleAddQuestions = async (newQs: Question[]) => {
    try {
      const updatedList = await addQuestionsApi(newQs);
      setQuestions(updatedList);
      const cats = await getCategoriesApi();
      setCategories(cats);
    } catch (err) {
      setQuestions((prev) => [...prev, ...newQs]);
    }
  };

  const handleUpdateStudent = async (updatedStudent: UserProfile) => {
    try {
      const saved = await updateStudentProfileApi(updatedStudent);
      setStudents((prev) =>
        prev.map((s) => (s.email.toLowerCase() === saved.email.toLowerCase() ? saved : s))
      );
    } catch (err) {
      setStudents((prev) =>
        prev.map((s) => (s.email.toLowerCase() === updatedStudent.email.toLowerCase() ? updatedStudent : s))
      );
    }
  };

  const handleEditQuestion = async (updatedQ: Question) => {
    try {
      const updatedList = await updateQuestionApi(updatedQ);
      setQuestions(updatedList);
    } catch (err) {
      setQuestions((prev) => prev.map((q) => (q.id === updatedQ.id ? updatedQ : q)));
    }
  };

  const handleDeleteQuestion = async (qId: string) => {
    try {
      const updatedList = await deleteQuestionApi(qId);
      setQuestions(updatedList);
      const cats = await getCategoriesApi();
      setCategories(cats);
    } catch (err) {
      const qToRemove = questions.find((q) => q.id === qId);
      if (qToRemove) {
        setQuestions((prev) => prev.filter((q) => q.id !== qId));
      }
    }
  };

  const handleAddCategory = (cat: QuizCategory) => {
    setCategories((prev) => [...prev, cat]);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setCurrentUserEmail(null);
    setActiveProfile(INITIAL_PROFILE);
    saveState('active_session_email', null);
    setUserRole('guest');
    setView('login');
    setLoginSuccessMessage('');
  };

  // Compute stats for admin
  const adminStats: AdminStats = {
    totalStudents: students.length,
    totalQuizzes: categories.length,
    totalQuestions: questions.length,
    totalAttempts: attempts.length
  };

  const activeCategory = categories.find((c) => c.id === selectedCategoryIdForQuiz) || categories[0];
  const activeAttempt = attempts.find((a) => a.id === selectedAttemptId) || userAttempts[0] || null;

  // Determine if student has a sidebar-based layout
  const isLoggedInStudent = userRole === 'student' && !!currentUserEmail;
  const showStudentSidebar = isLoggedInStudent && currentView !== 'quiz';

  return (
    <div className={`bg-gray-50 min-h-screen flex ${showStudentSidebar ? 'flex-col md:flex-row' : 'flex-col'} font-sans selection:bg-purple-100 selection:text-purple-900`}>
      
      {/* Header bar only for guest */}
      {userRole === 'guest' && (
        <Header
          currentView={currentView}
          setView={setView}
          userRole={userRole}
          setUserRole={setUserRole}
          profile={activeProfile}
          onLogout={handleLogout}
          isLoggedIn={isLoggedInStudent}
        />
      )}

      {/* Left Sidebar for logged-in students */}
      {showStudentSidebar && (
        <StudentSidebar
          currentView={currentView}
          setView={setView}
          profile={activeProfile}
          onLogout={handleLogout}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1">
          {currentView === 'landing' && (
            <LandingPage
              setView={setView}
              setUserRole={setUserRole}
              isLoggedIn={isLoggedInStudent}
            />
          )}

          {currentView === 'login' && (
            <LoginPage
              setView={setView}
              setUserRole={setUserRole}
              onLoginAttempt={handleLoginAttempt}
              successMessage={loginSuccessMessage}
            />
          )}

          {currentView === 'register' && (
            <RegisterPage
              setView={setView}
              setUserRole={setUserRole}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )}

          {currentView === 'student-dashboard' && (
            <StudentDashboard
              profile={activeProfile}
              categories={categories}
              attempts={userAttempts}
              setView={setView}
              setSelectedCategoryForQuiz={setSelectedCategoryForQuiz}
              setSelectedAttemptId={setSelectedAttemptId}
            />
          )}

          {currentView === 'categories' && (
            <CategoriesPage
              categories={categories}
              setView={setView}
              setSelectedCategoryForQuiz={setSelectedCategoryForQuiz}
            />
          )}

          {currentView === 'my-quizzes' && (
            <MyQuizzesPage
              attempts={userAttempts}
              categories={categories}
              setView={setView}
              setSelectedAttemptId={setSelectedAttemptId}
              setSelectedCategoryForQuiz={setSelectedCategoryForQuiz}
            />
          )}

          {currentView === 'quiz' && activeCategory && (
            <QuizPage
              category={activeCategory}
              questions={questions}
              setView={setView}
              onQuizSubmit={handleQuizSubmit}
            />
          )}

          {currentView === 'result' && (
            <QuizResultPage
              attempt={activeAttempt}
              setView={setView}
              onRetry={handleRetryQuiz}
            />
          )}

          {currentView === 'review' && (
            <ReviewAnswersPage
              attempt={activeAttempt}
              questions={questions}
              setView={setView}
              onRetry={handleRetryQuiz}
            />
          )}

          {currentView === 'performance' && (
            <PerformancePage
              attempts={userAttempts}
              categories={categories}
              setView={setView}
              setSelectedAttemptId={setSelectedAttemptId}
            />
          )}

          {currentView === 'profile' && (
            <ProfilePage
              profile={activeProfile}
              setView={setView}
              onUpdateProfile={async (updatedProfile) => {
                setActiveProfile(updatedProfile);
                await handleUpdateStudent(updatedProfile);
              }}
            />
          )}

          {(currentView === 'admin-dashboard' ||
            currentView === 'manage-questions' ||
            currentView === 'reports') && (
            <AdminDashboard
              categories={categories}
              questions={questions}
              attempts={attempts}
              stats={adminStats}
              students={students}
              onAddQuestion={handleAddQuestion}
              onAddQuestions={handleAddQuestions}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onAddCategory={handleAddCategory}
              onUpdateStudent={handleUpdateStudent}
              onLogout={handleLogout}
              setView={setView}
              onUpdateCategory={(updatedCat) => setCategories(prev => prev.map(c => c.id === updatedCat.id ? updatedCat : c))}
            />
          )}
        </div>

        {/* Sticky footer only for guest */}
        {userRole === 'guest' && (
          <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p>© 2026 QuizMaster MCQ Platform. Created for Academic Assessment.</p>
              <div className="flex space-x-4">
                <button onClick={() => setView('landing')} className="hover:text-purple-600 transition-colors cursor-pointer">Home</button>
                <button onClick={() => setView('categories')} className="hover:text-purple-600 transition-colors cursor-pointer">Browse Quizzes</button>
                <button onClick={() => { setUserRole('admin'); setView('admin-dashboard'); }} className="hover:text-purple-600 transition-colors font-bold text-gray-500 cursor-pointer">Admin Panel</button>
              </div>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
