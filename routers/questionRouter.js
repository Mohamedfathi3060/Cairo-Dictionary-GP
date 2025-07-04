const express = require('express');
const router = express.Router();
const Question = require('../Models/questionModel');

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

router.get('/', async (req, res) => {
  const size = parseInt(req.query.size) || 10;
  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  const questions = await Question.aggregate([
    { $match: filter },
    { $sample: { size } },
    { $project: { options: 1, image: 1, question: 1 } },
  ]);

  const shuffled = questions.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));

  res.json({
    status: 'success',
    data: shuffled,
  });
});

router.post('/:id/check', async (req, res) => {
  const { answer } = req.body;
  const question = await Question.findById(req.params.id);
  if (!question)
    return res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  const isCorrect = question.correctAnswer === answer;

  res.json({
    correct: isCorrect,
    correct_answer: question.correctAnswer,
  });
});

module.exports = router;
