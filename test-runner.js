#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Test Suite for Exam App...\n');

// Function to run tests
function runTests(directory, command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📁 Running ${description}...`);
    
    const child = spawn(command, [], {
      cwd: path.join(__dirname, directory),
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} completed successfully!\n`);
        resolve();
      } else {
        console.log(`❌ ${description} failed with code ${code}\n`);
        reject(new Error(`${description} failed`));
      }
    });

    child.on('error', (error) => {
      console.log(`❌ Error running ${description}: ${error.message}\n`);
      reject(error);
    });
  });
}

// Main test execution
async function runAllTests() {
  try {
    // Run frontend tests
    await runTests('.', 'npm test -- --watchAll=false', 'Frontend Tests');
    
    // Run backend tests
    await runTests('backend', 'npm test', 'Backend Tests');
    
    console.log('🎉 All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.log('💥 Some tests failed. Please check the output above.');
    process.exit(1);
  }
}

// Check if specific test type is requested
const args = process.argv.slice(2);
if (args.length > 0) {
  const testType = args[0].toLowerCase();
  
  if (testType === 'frontend') {
    runTests('.', 'npm test -- --watchAll=false', 'Frontend Tests')
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  } else if (testType === 'backend') {
    runTests('backend', 'npm test', 'Backend Tests')
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  } else {
    console.log('Usage: node test-runner.js [frontend|backend]');
    console.log('  frontend - Run only frontend tests');
    console.log('  backend  - Run only backend tests');
    console.log('  (no args) - Run all tests');
    process.exit(1);
  }
} else {
  // Run all tests
  runAllTests();
}






