import { QuizCategory, Question, QuizAttempt, UserProfile } from '../types';

const TOKEN_KEY = 'quiz_app_auth_token';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Auth REST APIs
export const registerApi = async (data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  college: string;
  department: string;
  password: string;
}) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || 'Registration failed');
  }
  return result;
};

export const loginApi = async (email: string, password: string, isAdmin: boolean) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password, isAdmin })
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || 'Login failed');
  }

  if (result.token) {
    setAuthToken(result.token);
  }

  return result;
};

export const getCurrentUserApi = async (): Promise<UserProfile | null> => {
  try {
    const token = getAuthToken();
    if (!token) return null;

    const res = await fetch('/api/auth/me', {
      headers: getHeaders()
    });

    if (!res.ok) {
      setAuthToken(null);
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (err) {
    return null;
  }
};

// Quiz & Category REST APIs
export const getCategoriesApi = async (): Promise<QuizCategory[]> => {
  const res = await fetch('/api/quizzes/categories', { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const getQuestionsApi = async (categoryId?: string): Promise<Question[]> => {
  const url = categoryId ? `/api/quizzes/questions?categoryId=${encodeURIComponent(categoryId)}` : '/api/quizzes/questions';
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
};

export const addQuestionsApi = async (questions: Question | Question[]): Promise<Question[]> => {
  const res = await fetch('/api/quizzes/questions', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(questions)
  });
  if (!res.ok) throw new Error('Failed to create question');
  return res.json();
};

export const updateQuestionApi = async (question: Question): Promise<Question[]> => {
  const res = await fetch(`/api/quizzes/questions/${encodeURIComponent(question.id)}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(question)
  });
  if (!res.ok) throw new Error('Failed to update question');
  return res.json();
};

export const deleteQuestionApi = async (id: string): Promise<Question[]> => {
  const res = await fetch(`/api/quizzes/questions/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete question');
  return res.json();
};

// Attempts REST APIs
export const getAttemptsApi = async (email?: string): Promise<QuizAttempt[]> => {
  const url = email ? `/api/attempts?email=${encodeURIComponent(email)}` : '/api/attempts';
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch attempts');
  return res.json();
};

export const submitAttemptApi = async (attempt: QuizAttempt): Promise<QuizAttempt> => {
  const res = await fetch('/api/attempts', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(attempt)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to record attempt');
  return data;
};

export const getAdminStatsApi = async () => {
  const res = await fetch('/api/attempts/stats', { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch admin statistics');
  return res.json();
};

// Students REST APIs
export const getStudentsApi = async (): Promise<UserProfile[]> => {
  const res = await fetch('/api/students', { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
};

export const updateStudentProfileApi = async (profile: UserProfile): Promise<UserProfile> => {
  const res = await fetch('/api/students/profile', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profile)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update profile');
  return data;
};
