import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { QuizCategory, Question, QuizAttempt, UserProfile } from '../src/types';
import { INITIAL_CATEGORIES, INITIAL_QUESTIONS, INITIAL_STUDENTS, INITIAL_ATTEMPTS } from '../src/data/initialData';

export interface DbSchema {
  users: (UserProfile & { passwordHash?: string; role?: 'student' | 'admin' })[];
  categories: QuizCategory[];
  questions: Question[];
  attempts: QuizAttempt[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'database', 'quiz_db.json');

// Ensure database directory exists
function ensureDbDir() {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read database from file or create initial seed
export function readDb(): DbSchema {
  ensureDbDir();

  if (!fs.existsSync(DB_FILE_PATH)) {
    // Seed initial users with hashed passwords
    const seededUsers: DbSchema['users'] = INITIAL_STUDENTS.map((s) => ({
      ...s,
      passwordHash: bcrypt.hashSync(s.password || 'password123', 10),
      role: 'student' as const
    }));

    // Add default admin user
    seededUsers.push({
      fullName: 'Admin User',
      email: 'admin@quiz.com',
      phoneNumber: '+1 (555) 999-0000',
      college: 'System Administration',
      department: 'Management',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop',
      registrationDate: '2026-01-01',
      status: 'Active',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin' as const
    });

    const initialDb: DbSchema = {
      users: seededUsers,
      categories: INITIAL_CATEGORIES,
      questions: INITIAL_QUESTIONS,
      attempts: INITIAL_ATTEMPTS
    };

    writeDb(initialDb);
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(raw) as DbSchema;
  } catch (err) {
    console.error('Error reading database file, re-initializing...', err);
    const fallbackDb: DbSchema = {
      users: [],
      categories: INITIAL_CATEGORIES,
      questions: INITIAL_QUESTIONS,
      attempts: []
    };
    writeDb(fallbackDb);
    return fallbackDb;
  }
}

// Write database atomically
export function writeDb(db: DbSchema): void {
  ensureDbDir();
  const tempPath = `${DB_FILE_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tempPath, DB_FILE_PATH);
}

// DB Helper functions

// Users
export function findUserByEmail(email: string) {
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export function getAllUsers() {
  const db = readDb();
  return db.users.map(({ passwordHash, ...user }) => user);
}

export function createUser(userData: UserProfile & { passwordHash: string; role?: 'student' | 'admin' }) {
  const db = readDb();
  const existing = db.users.find((u) => u.email.toLowerCase() === userData.email.trim().toLowerCase());
  if (existing) {
    throw new Error('This email is already registered. Please log in instead.');
  }

  const newUser = {
    ...userData,
    email: userData.email.trim().toLowerCase(),
    role: userData.role || 'student'
  };

  db.users.push(newUser);
  writeDb(db);
  const { passwordHash, ...safeUser } = newUser;
  return safeUser;
}

export function updateUserProfile(email: string, updateData: Partial<UserProfile>) {
  const db = readDb();
  const index = db.users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (index === -1) {
    throw new Error('User not found');
  }

  db.users[index] = {
    ...db.users[index],
    ...updateData
  };

  writeDb(db);
  const { passwordHash, ...safeUser } = db.users[index];
  return safeUser;
}

// Categories
export function getCategories() {
  const db = readDb();
  return db.categories;
}

export function updateCategorySettings(id: string, difficulty: string) {
  const db = readDb();
  const catIndex = db.categories.findIndex((c) => c.id === id);
  if (catIndex !== -1) {
    db.categories[catIndex].difficulty = difficulty as any;
    writeDb(db);
  }
  return db.categories;
}

// Questions
export function getQuestions(categoryId?: string) {
  const db = readDb();
  if (categoryId) {
    return db.questions.filter((q) => q.categoryId === categoryId);
  }
  return db.questions;
}

export function addQuestions(newQuestions: Question[]) {
  const db = readDb();
  db.questions.push(...newQuestions);

  // Update question count in categories
  newQuestions.forEach((q) => {
    const cat = db.categories.find((c) => c.id === q.categoryId);
    if (cat) {
      cat.questionCount += 1;
    }
  });

  writeDb(db);
  return db.questions;
}

export function updateQuestionInDb(updatedQ: Question) {
  const db = readDb();
  const idx = db.questions.findIndex((q) => q.id === updatedQ.id);
  if (idx !== -1) {
    db.questions[idx] = updatedQ;
    writeDb(db);
  }
  return db.questions;
}

export function deleteQuestionFromDb(questionId: string) {
  const db = readDb();
  const q = db.questions.find((item) => item.id === questionId);
  if (q) {
    db.questions = db.questions.filter((item) => item.id !== questionId);
    const cat = db.categories.find((c) => c.id === q.categoryId);
    if (cat && cat.questionCount > 0) {
      cat.questionCount -= 1;
    }
    writeDb(db);
  }
  return db.questions;
}

// Quiz Attempts
export function getAttemptsForUser(email?: string) {
  const db = readDb();
  if (email) {
    return db.attempts.filter((a) => a.userEmail?.toLowerCase() === email.trim().toLowerCase());
  }
  return db.attempts;
}

export function saveQuizAttempt(attempt: QuizAttempt) {
  const db = readDb();
  db.attempts.unshift(attempt); // Add to top of list
  writeDb(db);
  return attempt;
}

// Admin Stats
export function getAdminDashboardStats() {
  const db = readDb();
  return {
    totalStudents: db.users.filter((u) => u.role !== 'admin').length,
    totalQuizzes: db.categories.length,
    totalQuestions: db.questions.length,
    totalAttempts: db.attempts.length
  };
}
