const express = require('express');
const router = express.Router();
const { Exam, Result } = require('../models');

router.post('/', async (req, res) => {
  try {
    const exam = await Exam.create(req.body, {
      include: [{ model: Result, as: 'result' }]
    });
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const exams = await Exam.findAll({ include: 'result' });
    res.status(200).json(exams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the exam by id
    const exam = await Exam.findByPk(id);

    // If exam not found
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Delete the exam
    await exam.destroy();

    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete exam' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, description, result } = req.body;

    // Update exam
    const updatedExam = await Exam.findByPk(id);
    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Update exam fields
    updatedExam.name = name || updatedExam.name;
    updatedExam.surname = surname || updatedExam.surname;
    updatedExam.description = description || updatedExam.description;
    await updatedExam.save();

    // Update result if provided
    if (result) {
      let examResult = await Result.findOne({ where: { resId: id } });
      if (!examResult) {
        examResult = await Result.create({ resId: id, ...result });
      } else {
        await examResult.update(result);
      }
    }

    res.json(updatedExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update exam' });
  }
});


module.exports = router;
