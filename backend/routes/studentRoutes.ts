import { Router } from 'express';
import { getAllUsers, updateUserProfile } from '../../database/db';

const router = Router();

// GET /api/students - List all registered students for admin
router.get('/', (req, res) => {
  const users = getAllUsers();
  const students = users.filter((u) => u.role !== 'admin');
  return res.json(students);
});

// PUT /api/students/profile - Update student profile
router.put('/profile', (req, res) => {
  try {
    const { email, fullName, phoneNumber, college, department, avatarUrl } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'User email is required' });
    }

    const updatedUser = updateUserProfile(email, {
      fullName,
      phoneNumber,
      college,
      department,
      avatarUrl
    });

    return res.json(updatedUser);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Failed to update profile' });
  }
});

export default router;
