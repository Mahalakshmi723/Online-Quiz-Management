import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import authRoutes from './backend/routes/authRoutes';
import quizRoutes from './backend/routes/quizRoutes';
import attemptRoutes from './backend/routes/attemptRoutes';
import studentRoutes from './backend/routes/studentRoutes';
import { readDb } from './database/db';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Middleware
  app.use(express.json());

  // Initialize DB seed
  readDb();

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/quizzes', quizRoutes);
  app.use('/api/attempts', attemptRoutes);
  app.use('/api/students', studentRoutes);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
