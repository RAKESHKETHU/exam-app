const express = require('express');
const mongoose = require('mongoose');
const Question = require('../models/Question');
const router = express.Router();

// Fetch Random Questions
router.get('/questions', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ 
                message: 'Database not connected. Please try again later.' 
            });
        }
        
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // Fetch 10 random questions
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Submit Exam
router.post('/submit', async (req, res) => {
    try {
        const { answers } = req.body;
        
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ 
                message: 'Database not connected. Please try again later.' 
            });
        }
        
        // Get all questions to calculate score
        const questions = await Question.find({});
        let score = 0;
        let totalQuestions = questions.length;
        
        // Calculate score
        questions.forEach(question => {
            if (answers[question._id] === question.correctAnswer) {
                score++;
            }
        });
        
        const percentage = Math.round((score / totalQuestions) * 100);
        
        res.json({
            score,
            totalQuestions,
            percentage,
            answers,
            passed: percentage >= 60
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
