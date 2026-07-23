# Online Quiz Management System - Full-Stack Application

A full-stack Online Quiz Management System built with a React + Vite frontend, Express REST API backend, and persistent file-backed JSON database with secure bcrypt password hashing and JWT authentication.

---

## 🏗️ Project Architecture

```text
online-quiz-management-system/
│
├── src/                    # React + Vite Frontend Application
│   ├── components/         # UI pages (Landing, Login, Register, Dashboard, Quiz, etc.)
│   ├── services/           # REST API client integration (api.ts)
│   ├── data/               # Initial state & seed fallback
│   ├── types.ts            # Global TypeScript definitions
│   └── App.tsx             # Main React application entry point
│
├── backend/                # Express REST API Backend
│   ├── routes/             # API Endpoints
│   │   ├── authRoutes.ts   # Registration & Login REST handlers
│   │   ├── quizRoutes.ts   # Categories & Question management REST handlers
│   │   ├── attemptRoutes.ts# Quiz attempt & history REST handlers
│   │   └── studentRoutes.ts# Student profile REST handlers
│   └── auth.ts             # JWT token authentication & bcrypt helpers
│
├── database/               # Persistent Database Layer
│   ├── db.ts               # Database layer & query methods
│   └── quiz_db.json        # Persistent JSON database (auto-seeded on startup)
│
├── server.ts               # Express Server & Vite Development Integration
├── package.json            # Managed Dependencies & Scripts
├── .env.example            # Environment variables blueprint
└── README.md               # Documentation & setup guide
```

---

## ⚡ Key Features

1. **Secure Authentication & Password Hashing**
   - User registration with bcrypt password hashing (never plain-text).
   - Duplicate registration prevention (`This email is already registered. Please log in instead.`).
   - Secure login verification returning JWT bearer tokens.

2. **Persistent Database Integration**
   - Centralized database layer storing users, quiz categories, questions, and attempt records.
   - Preserves all previous quiz attempt scores and results per user.
   - Allows users to log in and attempt quizzes multiple times without re-registering.

3. **Full-Stack REST API**
   - `POST /api/auth/register` - Create new student account.
   - `POST /api/auth/login` - Verify student or admin credentials.
   - `GET /api/auth/me` - Fetch active session profile.
   - `GET /api/quizzes/categories` - Fetch quiz topics.
   - `GET /api/quizzes/questions` - Fetch questions by topic.
   - `POST /api/quizzes/questions` - Create new question (Admin).
   - `GET /api/attempts` - Fetch user-specific quiz attempt history.
   - `POST /api/attempts` - Record new quiz submission & score.
   - `GET /api/students` - Fetch registered students list (Admin).

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `.env` contains:
```env
JWT_SECRET=super-secret-jwt-token-key-for-quiz-app
PORT=3000
NODE_ENV=development
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server (Frontend + Backend REST API)
```bash
npm run dev
```
The unified full-stack dev server will start at:
👉 **`http://localhost:3000`**

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔑 Demo Credentials

- **Default Student Login**:
  - Email: `alex.carter@edu.org`
  - Password: `password123`

- **Default Admin Login**:
  - Email: `admin@quiz.com`
  - Password: `admin123`
