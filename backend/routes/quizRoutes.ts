import { Router } from 'express';
import {
  getCategories,
  updateCategorySettings,
  getQuestions,
  addQuestions,
  updateQuestionInDb,
  deleteQuestionFromDb
} from '../../database/db';

const router = Router();

// GET /api/quizzes/categories
router.get('/categories', (req, res) => {
  const categories = getCategories();
  return res.json(categories);
});

// PUT /api/quizzes/categories/:id
router.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { difficulty } = req.body;
  const categories = updateCategorySettings(id, difficulty);
  return res.json(categories);
});

// GET /api/quizzes/questions
router.get('/questions', (req, res) => {
  const categoryId = req.query.categoryId as string | undefined;
  const questions = getQuestions(categoryId);
  return res.json(questions);
});

// POST /api/quizzes/questions (add single or multiple questions)
router.post('/questions', (req, res) => {
  try {
    const questionOrList = req.body;
    const questionsToAdd = Array.isArray(questionOrList) ? questionOrList : [questionOrList];
    const updated = addQuestions(questionsToAdd);
    return res.status(201).json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Failed to add question' });
  }
});

// PUT /api/quizzes/questions/:id
router.put('/questions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedQ = { ...req.body, id };
    const questions = updateQuestionInDb(updatedQ);
    return res.json(questions);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Failed to update question' });
  }
});

// DELETE /api/quizzes/questions/:id
router.delete('/questions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const questions = deleteQuestionFromDb(id);
    return res.json(questions);
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Failed to delete question' });
  }
});

export default router;
