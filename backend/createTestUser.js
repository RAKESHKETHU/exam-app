const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createTestUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/exam-app');
        console.log('Connected to MongoDB');

        // Check if test user already exists
        const existingUser = await User.findOne({ username: 'student' });
        if (existingUser) {
            console.log('Test user already exists');
            process.exit(0);
        }

        // Create test user
        const testUser = new User({
            username: 'student',
            email: 'student@example.com',
            password: 'password123',
            role: 'student'
        });

        await testUser.save();
        console.log('Test user created successfully!');
        console.log('Username: student');
        console.log('Password: password123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating test user:', error);
        process.exit(1);
    }
}

createTestUser();
