# Exam Application

A full-stack web application for conducting online exams with user authentication, question management, and real-time scoring.

## 🚀 Features

- **User Authentication**: Registration and login system with JWT tokens
- **Exam Interface**: Interactive exam with timer and question navigation
- **Question Management**: Random question selection from database
- **Real-time Scoring**: Automatic score calculation and results display
- **Responsive Design**: Modern UI that works on all devices
- **Progress Tracking**: Visual progress indicators and question status

## 🛠️ Tech Stack

### Frontend
- React 19.1.1
- React Router DOM 7.8.1
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js 5.1.0
- MongoDB with Mongoose 8.17.2
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

### Database
- MongoDB (local or Atlas)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd exam-app
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file in the backend folder

### 4. Environment Configuration

Create a `.env` file in the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/exam-app
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/exam-app?retryWrites=true&w=majority

JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_HERE
PORT=5000
```

### 5. Seed the Database

```bash
cd backend
node seedQuestions.js
node createTestUser.js
```

### 6. Start the Application

#### Method 1: Using the provided scripts (Windows)
```bash
# Start both frontend and backend
.\start-app.bat

# OR using PowerShell
.\start-app.ps1
```

#### Method 2: Manual start
```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
npm start
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 👤 Default Credentials

### Test User
- **Username**: `student`
- **Password**: `password123`

### Demo User
- **Username**: `raki`
- **Password**: `password123`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "student",
  "password": "password123"
}
```

### Exam Endpoints

#### Get Random Questions
```http
GET /api/exam/questions
```

#### Submit Exam
```http
POST /api/exam/submit
Content-Type: application/json

{
  "answers": {
    "questionId1": "selectedAnswer1",
    "questionId2": "selectedAnswer2"
  }
}
```

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
npm test
```

### Manual Testing
Use the provided Postman collection or curl commands (see below).

## 📁 Project Structure

```
exam-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Question.js
│   ├── routes/
│   │   ├── AuthRoutes.js
│   │   └── ExamRoutes.js
│   ├── tests/
│   ├── index.js
│   ├── seedQuestions.js
│   └── createTestUser.js
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Exam.js
│   │   └── Result.js
│   └── App.js
├── public/
├── package.json
└── README.md
```

## 🔧 Configuration

### Frontend Configuration
- API Base URL: `http://localhost:5000`
- Default timeout: 30 minutes for exams

### Backend Configuration
- Port: 5000 (configurable via PORT env variable)
- JWT Expiry: 24 hours
- CORS: Enabled for all origins

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network access for Atlas

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes using the port

3. **Login Failed**
   - Verify user exists in database
   - Check JWT_SECRET is set
   - Ensure backend is running

4. **Questions Not Loading**
   - Run `node seedQuestions.js` to populate database
   - Check MongoDB connection

### Debug Mode
```bash
# Backend with debug logs
cd backend
DEBUG=* npm start

# Frontend with verbose logging
npm start -- --verbose
```

## 📊 Sample Questions

The application includes 15 sample questions covering:
- Geography (capitals, countries)
- Science (chemistry, biology, astronomy)
- Mathematics (basic arithmetic)
- Technology (programming, web development)
- History and general knowledge

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Update API URLs for production

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy with MongoDB Atlas
3. Update CORS settings for production domain

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support or questions, contact: support@leadmasters.ai

---

**Note**: This application is designed for educational purposes and includes basic security measures. For production use, implement additional security features like rate limiting, input validation, and proper error handling.