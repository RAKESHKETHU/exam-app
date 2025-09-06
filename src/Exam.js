import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Exam() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes countdown
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = useCallback(async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/exam/submit', { answers });
            localStorage.setItem('examResult', JSON.stringify(data));
            navigate('/result', { state: { result: data } });
        } catch (error) {
            alert('Submission failed: ' + (error.response?.data?.message || error.message));
            setIsSubmitting(false);
        }
    }, [answers, navigate, isSubmitting]);

    useEffect(() => {
        // Fetch exam questions from backend
        const fetchQuestions = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/exam/questions');
                setQuestions(data);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                alert('Failed to load exam questions. Please refresh the page.');
            }
        };
        fetchQuestions();

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [handleSubmit]);

    const handleAnswerChange = (questionId, selectedAnswer) => {
        setAnswers({ ...answers, [questionId]: selectedAnswer });
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getQuestionStatus = (index) => {
        const question = questions[index];
        if (!question) return 'unanswered';
        return answers[question._id] ? 'answered' : 'unanswered';
    };

    if (questions.length === 0) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                fontSize: '18px'
            }}>
                Loading exam questions...
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(answers).length;

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header with Timer */}
            <div style={{ 
                position: 'sticky', 
                top: '0', 
                background: 'white', 
                padding: '15px', 
                borderBottom: '2px solid #007bff',
                marginBottom: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, color: '#333' }}>Exam</h2>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: timeRemaining < 300 ? '#dc3545' : '#007bff' }}>
                            {formatTime(timeRemaining)}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            Time Remaining
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
                            {answeredCount}/{totalQuestions}
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            Questions Answered
                        </div>
                    </div>
                </div>
            </div>

            {/* Question Navigation */}
            <div style={{ 
                marginBottom: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
            }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>Question Navigation</h4>
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    justifyContent: 'center'
                }}>
                    {questions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToQuestion(index)}
                            style={{
                                width: '40px',
                                height: '40px',
                                border: 'none',
                                borderRadius: '50%',
                                backgroundColor: index === currentQuestionIndex 
                                    ? '#007bff' 
                                    : getQuestionStatus(index) === 'answered' 
                                        ? '#28a745' 
                                        : '#6c757d',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Current Question */}
            <div style={{ 
                marginBottom: '30px', 
                padding: '25px', 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                background: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '15px',
                    borderBottom: '1px solid #eee'
                }}>
                    <h3 style={{ margin: 0, color: '#333' }}>
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </h3>
                    <span style={{ 
                        padding: '5px 12px', 
                        borderRadius: '15px', 
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: getQuestionStatus(currentQuestionIndex) === 'answered' ? '#d4edda' : '#f8d7da',
                        color: getQuestionStatus(currentQuestionIndex) === 'answered' ? '#155724' : '#721c24'
                    }}>
                        {getQuestionStatus(currentQuestionIndex) === 'answered' ? 'Answered' : 'Unanswered'}
                    </span>
                </div>

                <h4 style={{ marginBottom: '20px', color: '#495057', lineHeight: '1.5' }}>
                    {currentQuestion.question}
                </h4>

                {currentQuestion.options.map((option, idx) => (
                    <label key={idx} style={{ 
                        display: 'block', 
                        margin: '10px 0', 
                        padding: '15px',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: answers[currentQuestion._id] === option ? '#e3f2fd' : 'white'
                    }}>
                        <input
                            type="radio"
                            name={currentQuestion._id}
                            value={option}
                            checked={answers[currentQuestion._id] === option}
                            onChange={() => handleAnswerChange(currentQuestion._id, option)}
                            style={{ marginRight: '12px', transform: 'scale(1.2)' }}
                        />
                        <span style={{ fontSize: '16px', color: '#495057' }}>{option}</span>
                    </label>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '20px',
                borderTop: '1px solid #dee2e6',
                background: '#f8f9fa',
                borderRadius: '8px'
            }}>
                <button 
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        backgroundColor: currentQuestionIndex === 0 ? '#6c757d' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                        opacity: currentQuestionIndex === 0 ? 0.6 : 1
                    }}
                >
                    ← Previous
                </button>

                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                </div>

                {currentQuestionIndex < totalQuestions - 1 ? (
                    <button 
                        onClick={goToNextQuestion}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Next →
                    </button>
                ) : (
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                    </button>
                )}
            </div>

            {/* Progress Bar */}
            <div style={{ 
                marginTop: '20px',
                padding: '15px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
            }}>
                <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                        Progress: {answeredCount}/{totalQuestions} questions answered
                    </span>
                </div>
                <div style={{ 
                    width: '100%', 
                    height: '10px', 
                    backgroundColor: '#e9ecef', 
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${(answeredCount / totalQuestions) * 100}%`,
                        height: '100%',
                        backgroundColor: '#28a745',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Exam;
