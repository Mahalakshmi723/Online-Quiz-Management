import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../../database/db';
import { generateToken, authenticateToken, AuthRequest } from '../auth';

const router = Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { fullName, email, phoneNumber, college, department, password } = req.body;

    if (!fullName || !email || !password || !college || !department) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check duplicate registration
    const existing = findUserByEmail(trimmedEmail);
    if (existing) {
      return res.status(400).json({ error: 'This email is already registered. Please log in instead.' });
    }

    // Hash password securely
    const passwordHash = bcrypt.hashSync(password, 10);

    const newStudent = createUser({
      fullName,
      email: trimmedEmail,
      phoneNumber: phoneNumber || '',
      college,
      department,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      passwordHash,
      role: 'student'
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Please log in with your credentials.',
      user: newStudent
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = findUserByEmail(trimmedEmail);

    if (!user) {
      return res.status(400).json({ error: 'Account not found. Please register first.' });
    }

    if (isAdmin && user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. You do not have administrator privileges.' });
    }

    if (user.passwordHash && !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(400).json({ error: 'Incorrect password. Please try again.' });
    }

    const token = generateToken({
      email: user.email,
      fullName: user.fullName,
      role: user.role || 'student'
    });

    const { passwordHash, ...safeUser } = user;

    return res.json({
      success: true,
      token,
      user: safeUser
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = findUserByEmail(req.user.email);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { passwordHash, ...safeUser } = user;
  return res.json({ user: safeUser });
});

export default router;
