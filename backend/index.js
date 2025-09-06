const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/AuthRoutes');  // Authentication routes
const examRoutes = require('./routes/ExamRoutes');  // Exam routes

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/exam-app';

console.log('Attempting to connect to MongoDB...');

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    console.log("Starting server without database for testing...");
    console.log("Note: Data will not persist without MongoDB connection");
    // Don't exit, continue without database for testing
  });

// Define routes for authentication API
app.use('/api/auth', authRoutes);

// Define routes for exam API
app.use('/api/exam', examRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
