# Testing Guide for Exam App

This document provides comprehensive testing instructions for both the frontend and backend of the Exam App.

## 🚀 Quick Start

### Run All Tests
```bash
node test-runner.js
```

### Run Frontend Tests Only
```bash
node test-runner.js frontend
```

### Run Backend Tests Only
```bash
node test-runner.js backend
```

## 📁 Test Structure

```
exam-app/
├── src/                    # Frontend source code
│   ├── App.test.js        # App component tests
│   ├── Login.test.js      # Login component tests
│   ├── Exam.test.js       # Exam component tests
│   └── setupTests.js      # Frontend test configuration
├── backend/                # Backend source code
│   ├── tests/             # Backend test files
│   │   ├── setup.js       # Backend test configuration
│   │   ├── models/        # Model tests
│   │   │   ├── User.test.js
│   │   │   └── Question.test.js
│   │   └── routes/        # Route tests
│   │       └── AuthRoutes.test.js
│   ├── jest.config.js     # Jest configuration
│   └── package.json       # Backend dependencies
└── test-runner.js         # Test runner script
```

## 🧪 Frontend Testing

### Dependencies
The frontend already includes these testing libraries:
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - Custom Jest matchers
- `@testing-library/user-event` - User interaction simulation
- `@testing-library/dom` - DOM testing utilities

### Running Frontend Tests
```bash
# Run tests once
npm test -- --watchAll=false

# Run tests in watch mode (interactive)
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false
```

### Test Files
- **App.test.js**: Tests the main App component, navigation, and routing
- **Login.test.js**: Tests login form functionality, validation, and API calls
- **Exam.test.js**: Tests exam interface, question loading, and submission
- **setupTests.js**: Global test configuration and mocks

### Frontend Test Features
- ✅ Component rendering tests
- ✅ User interaction tests (clicks, form inputs)
- ✅ API call mocking with axios
- ✅ Router testing with BrowserRouter
- ✅ Form validation testing
- ✅ Error handling tests
- ✅ Async operation testing

## 🔧 Backend Testing

### Dependencies
Install backend testing dependencies:
```bash
cd backend
npm install --save-dev jest supertest mongodb-memory-server nodemon
```

### Running Backend Tests
```bash
cd backend

# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Files
- **setup.js**: Database connection and test environment setup
- **User.test.js**: User model validation and methods
- **Question.test.js**: Question model validation and methods
- **AuthRoutes.test.js**: Authentication API endpoint tests

### Backend Test Features
- ✅ In-memory MongoDB database for testing
- ✅ Model validation testing
- ✅ API endpoint testing with supertest
- ✅ JWT token testing
- ✅ Password hashing verification
- ✅ Database operation testing
- ✅ Error handling tests

## 🎯 Test Coverage

### Frontend Coverage Areas
- Component rendering
- User interactions
- Form validation
- API integration
- Error handling
- Navigation and routing

### Backend Coverage Areas
- Model validation
- Database operations
- API endpoints
- Authentication
- Password security
- Error handling

## 🛠️ Test Configuration

### Frontend Jest Configuration
Located in `package.json`:
```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  }
}
```

### Backend Jest Configuration
Located in `backend/jest.config.js`:
```javascript
{
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/tests/**'
  ]
}
```

## 📊 Running Tests with Coverage

### Frontend Coverage
```bash
npm test -- --coverage --watchAll=false
```
Coverage report will be generated in the `coverage/` directory.

### Backend Coverage
```bash
cd backend
npm run test:coverage
```
Coverage report will be generated in the `backend/coverage/` directory.

## 🔍 Debugging Tests

### Frontend Debugging
```bash
# Run tests in debug mode
npm test -- --verbose

# Run specific test file
npm test -- Login.test.js

# Run tests matching pattern
npm test -- --testNamePattern="login"
```

### Backend Debugging
```bash
cd backend

# Run tests in verbose mode
npm test -- --verbose

# Run specific test file
npm test -- tests/models/User.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should create user"
```

## 🚨 Common Issues and Solutions

### Frontend Issues
1. **Test environment not found**: Ensure `@testing-library/jest-dom` is imported in `setupTests.js`
2. **Router errors**: Wrap components with `BrowserRouter` in tests
3. **API call errors**: Mock axios calls to avoid actual HTTP requests

### Backend Issues
1. **Database connection errors**: Check MongoDB memory server setup in `tests/setup.js`
2. **Import errors**: Ensure ES modules are properly configured
3. **JWT errors**: Verify `JWT_SECRET` environment variable is set

## 📝 Writing New Tests

### Frontend Test Template
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import YourComponent from './YourComponent';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('YourComponent', () => {
  test('should render correctly', () => {
    renderWithRouter(<YourComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });

  test('should handle user interactions', () => {
    renderWithRouter(<YourComponent />);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    // Add assertions
  });
});
```

### Backend Test Template
```javascript
import mongoose from 'mongoose';
import YourModel from '../../models/YourModel.js';

describe('YourModel', () => {
  beforeEach(async () => {
    await YourModel.deleteMany({});
  });

  test('should create with valid data', async () => {
    const data = { /* your test data */ };
    const instance = new YourModel(data);
    const saved = await instance.save();
    
    expect(saved.property).toBe(data.property);
  });
});
```

## 🎉 Best Practices

1. **Test Structure**: Use descriptive test names and group related tests
2. **Isolation**: Each test should be independent and not rely on others
3. **Mocking**: Mock external dependencies (APIs, databases) for unit tests
4. **Coverage**: Aim for high test coverage but focus on critical functionality
5. **Maintenance**: Keep tests simple and maintainable
6. **Documentation**: Document complex test scenarios and edge cases

## 🔗 Additional Resources

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [MongoDB Memory Server](https://github.com/nodkz/mongodb-memory-server)

---

Happy Testing! 🧪✨






