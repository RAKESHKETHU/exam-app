# API Testing Commands

This document contains curl commands for testing all API endpoints of the Exam Application.

## Prerequisites

- Backend server running on http://localhost:5000
- MongoDB database with seeded questions and users

## Authentication Endpoints

### 1. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "testuser",
    "email": "testuser@example.com",
    "role": "student"
  }
}
```

### 2. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "student",
    "email": "student@example.com",
    "role": "student"
  }
}
```

### 3. Login with Demo User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "raki",
    "password": "password123"
  }'
```

## Exam Endpoints

### 4. Get Random Questions

```bash
curl -X GET http://localhost:5000/api/exam/questions
```

**Expected Response:**
```json
[
  {
    "_id": "68bbdfada9a0b24741cff73a",
    "question": "Which planet is known as the Red Planet?",
    "options": ["Venus", "Mars", "Jupiter", "Saturn"],
    "correctAnswer": "Mars",
    "__v": 0
  },
  {
    "_id": "68bbdfada9a0b24741cff745",
    "question": "Which programming language is known for its use in web development?",
    "options": ["Java", "Python", "JavaScript", "C++"],
    "correctAnswer": "JavaScript",
    "__v": 0
  }
  // ... more questions
]
```

### 5. Submit Exam

```bash
curl -X POST http://localhost:5000/api/exam/submit \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "68bbdfada9a0b24741cff73a": "Mars",
      "68bbdfada9a0b24741cff745": "JavaScript",
      "68bbdfada9a0b24741cff746": "4"
    }
  }'
```

**Expected Response:**
```json
{
  "score": 3,
  "totalQuestions": 15,
  "percentage": 20,
  "answers": {
    "68bbdfada9a0b24741cff73a": "Mars",
    "68bbdfada9a0b24741cff745": "JavaScript",
    "68bbdfada9a0b24741cff746": "4"
  },
  "passed": false
}
```

## Error Testing

### 6. Test Invalid Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "invaliduser",
    "password": "wrongpassword"
  }'
```

**Expected Response:**
```json
{
  "message": "User not found"
}
```

### 7. Test Duplicate Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student",
    "email": "student@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "Username or email already exists"
}
```

## PowerShell Commands (Windows)

### 1. Register User (PowerShell)

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"username":"testuser","email":"testuser@example.com","password":"password123"}'
```

### 2. Login User (PowerShell)

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"username":"student","password":"password123"}'
```

### 3. Get Questions (PowerShell)

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/exam/questions" -Method GET
```

### 4. Submit Exam (PowerShell)

```powershell
$body = @{
    answers = @{
        "68bbdfada9a0b24741cff73a" = "Mars"
        "68bbdfada9a0b24741cff745" = "JavaScript"
    }
} | ConvertTo-Json -Depth 3

Invoke-WebRequest -Uri "http://localhost:5000/api/exam/submit" -Method POST -ContentType "application/json" -Body $body
```

## Testing Workflow

1. **Start the backend server**
2. **Seed the database** with questions and test users
3. **Test registration** with a new user
4. **Test login** with existing users
5. **Test question retrieval** to ensure questions are loaded
6. **Test exam submission** with sample answers
7. **Verify error handling** with invalid credentials

## Sample Test Data

### Test Users
- Username: `student`, Password: `password123`
- Username: `raki`, Password: `password123`

### Sample Question IDs (update with actual IDs from your database)
- `68bbdfada9a0b24741cff73a` - Mars question
- `68bbdfada9a0b24741cff745` - JavaScript question
- `68bbdfada9a0b24741cff746` - Math question

## Notes

- Replace question IDs with actual IDs from your database
- JWT tokens expire after 24 hours
- All endpoints return JSON responses
- CORS is enabled for all origins
- Database connection errors return 503 status
