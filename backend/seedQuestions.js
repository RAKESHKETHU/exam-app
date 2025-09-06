const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const sampleQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which programming language is known for its use in web development?",
        options: ["Java", "Python", "JavaScript", "C++"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue whale"
    },
    {
        question: "Which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: "1945"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        question: "Which country is home to the Great Wall?",
        options: ["Japan", "China", "India", "Korea"],
        correctAnswer: "China"
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswer: "2"
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Won", "Yuan", "Yen", "Dong"],
        correctAnswer: "Yen"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
        correctAnswer: "Hydrogen"
    },
    {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Tiger"],
        correctAnswer: "Cheetah"
    },
    {
        question: "Which programming paradigm does React follow?",
        options: ["Object-Oriented", "Functional", "Procedural", "Logic"],
        correctAnswer: "Functional"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", "Skin", "Lungs"],
        correctAnswer: "Skin"
    }
];

async function seedQuestions() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/exam-app');
        console.log('Connected to MongoDB');

        // Clear existing questions
        await Question.deleteMany({});
        console.log('Cleared existing questions');

        // Insert sample questions
        await Question.insertMany(sampleQuestions);
        console.log(`Inserted ${sampleQuestions.length} sample questions`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedQuestions();
