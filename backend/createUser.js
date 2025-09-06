const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/exam-app');
        console.log('Connected to MongoDB');

        // Get credentials from command line arguments
        const username = process.argv[2] || 'raki';
        const email = process.argv[3] || 'raki@example.com';
        const password = process.argv[4] || 'password123';

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User already exists with username:', username);
            process.exit(0);
        }

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            role: 'student'
        });

        await newUser.save();
        console.log('User created successfully!');
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        
        process.exit(0);
    } catch (error) {
        console.error('Error creating user:', error);
        process.exit(1);
    }
}

createUser();
