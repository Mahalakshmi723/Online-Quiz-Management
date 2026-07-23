/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  categoryId: string; // matches category key, e.g., 'java', 'python'
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // e.g. 'Coffee', 'Code', 'Database', 'Terminal'
  questionCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuizAttempt {
  id: string;
  categoryId: string;
  categoryName: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  percentage: number;
  timeTakenSeconds: number;
  selectedAnswers: { [questionId: string]: number }; // questionId -> selectedIndex
  markedForReview: string[]; // list of questionIds
  wasTimeUp?: boolean;
  userEmail?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  college: string;
  department: string;
  avatarUrl: string;
  password?: string;
  registrationDate?: string;
  status?: string;
  role?: 'student' | 'admin';
}

export interface AdminStats {
  totalStudents: number;
  totalQuizzes: number;
  totalQuestions: number;
  totalAttempts: number;
}

export type AppView =
  | 'landing'
  | 'login'
  | 'register'
  | 'student-dashboard'
  | 'categories'
  | 'quiz'
  | 'result'
  | 'review'
  | 'performance'
  | 'profile'
  | 'my-quizzes'
  | 'admin-dashboard'
  | 'manage-questions'
  | 'reports';
