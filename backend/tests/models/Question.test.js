import mongoose from 'mongoose';
import Question from '../../models/Question.js';

describe('Question Model', () => {
  describe('Question Creation', () => {
    test('should create a question with valid data', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework', 'A language', 'A database'],
        correctAnswer: 0,
        category: 'Programming',
        difficulty: 'Easy'
      };

      const question = new Question(questionData);
      const savedQuestion = await question.save();

      expect(savedQuestion.question).toBe(questionData.question);
      expect(savedQuestion.options).toEqual(questionData.options);
      expect(savedQuestion.correctAnswer).toBe(questionData.correctAnswer);
      expect(savedQuestion.category).toBe(questionData.category);
      expect(savedQuestion.difficulty).toBe(questionData.difficulty);
    });

    test('should set default values', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework'],
        correctAnswer: 0
      };

      const question = new Question(questionData);
      const savedQuestion = await question.save();

      expect(savedQuestion.difficulty).toBe('Medium');
      expect(savedQuestion.isActive).toBe(true);
      expect(savedQuestion.createdAt).toBeDefined();
      expect(savedQuestion.updatedAt).toBeDefined();
    });
  });

  describe('Validation', () => {
    test('should require question text', async () => {
      const questionData = {
        options: ['A library', 'A framework'],
        correctAnswer: 0
      };

      const question = new Question(questionData);
      let error;

      try {
        await question.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.question).toBeDefined();
    });

    test('should require options array', async () => {
      const questionData = {
        question: 'What is React?',
        correctAnswer: 0
      };

      const question = new Question(questionData);
      let error;

      try {
        await question.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.options).toBeDefined();
    });

    test('should require at least 2 options', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library'],
        correctAnswer: 0
      };

      const question = new Question(questionData);
      let error;

      try {
        await question.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.options).toBeDefined();
    });

    test('should require correctAnswer', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework']
      };

      const question = new Question(questionData);
      let error;

      try {
        await question.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.correctAnswer).toBeDefined();
    });

    test('should validate correctAnswer is within options range', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework'],
        correctAnswer: 2 // Invalid index
      };

      const question = new Question(questionData);
      let error;

      try {
        await question.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.correctAnswer).toBeDefined();
    });

    test('should validate difficulty level', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework'],
        correctAnswer: 0,
        difficulty: 'Invalid'
      };

      const question = new Question(questionData);
      let error;

      try {
        await question.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.difficulty).toBeDefined();
    });
  });

  describe('Question Methods', () => {
    test('should check if answer is correct', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework', 'A language'],
        correctAnswer: 0
      };

      const question = new Question(questionData);
      await question.save();

      expect(question.isCorrectAnswer(0)).toBe(true);
      expect(question.isCorrectAnswer(1)).toBe(false);
      expect(question.isCorrectAnswer(2)).toBe(false);
    });

    test('should get correct answer text', async () => {
      const questionData = {
        question: 'What is React?',
        options: ['A library', 'A framework', 'A language'],
        correctAnswer: 1
      };

      const question = new Question(questionData);
      await question.save();

      expect(question.getCorrectAnswerText()).toBe('A framework');
    });
  });

  describe('Question Queries', () => {
    beforeEach(async () => {
      await Question.deleteMany({});
    });

    test('should find questions by category', async () => {
      const question1 = new Question({
        question: 'What is React?',
        options: ['A library', 'A framework'],
        correctAnswer: 0,
        category: 'Programming'
      });

      const question2 = new Question({
        question: 'What is MongoDB?',
        options: ['A database', 'A language'],
        correctAnswer: 0,
        category: 'Database'
      });

      await question1.save();
      await question2.save();

      const programmingQuestions = await Question.find({ category: 'Programming' });
      expect(programmingQuestions).toHaveLength(1);
      expect(programmingQuestions[0].question).toBe('What is React?');
    });

    test('should find questions by difficulty', async () => {
      const question1 = new Question({
        question: 'What is React?',
        options: ['A library', 'A framework'],
        correctAnswer: 0,
        difficulty: 'Easy'
      });

      const question2 = new Question({
        question: 'What is MongoDB?',
        options: ['A database', 'A language'],
        correctAnswer: 0,
        difficulty: 'Hard'
      });

      await question1.save();
      await question2.save();

      const easyQuestions = await Question.find({ difficulty: 'Easy' });
      expect(easyQuestions).toHaveLength(1);
      expect(easyQuestions[0].question).toBe('What is React?');
    });

    test('should find only active questions', async () => {
      const question1 = new Question({
        question: 'What is React?',
        options: ['A library', 'A framework'],
        correctAnswer: 0,
        isActive: true
      });

      const question2 = new Question({
        question: 'What is MongoDB?',
        options: ['A database', 'A language'],
        correctAnswer: 0,
        isActive: false
      });

      await question1.save();
      await question2.save();

      const activeQuestions = await Question.find({ isActive: true });
      expect(activeQuestions).toHaveLength(1);
      expect(activeQuestions[0].question).toBe('What is React?');
    });
  });
});

