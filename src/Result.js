import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Result() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Try to get result from navigation state first
        if (location.state?.result) {
            setResult(location.state.result);
            setLoading(false);
        } else {
            // Fallback to localStorage
            const savedResult = localStorage.getItem('examResult');
            if (savedResult) {
                try {
                    setResult(JSON.parse(savedResult));
                } catch (error) {
                    console.error('Failed to parse saved result:', error);
                }
            }
            setLoading(false);
        }
    }, [location.state]);

    const getScoreColor = (percentage) => {
        if (percentage >= 80) return '#28a745'; // Green for excellent
        if (percentage >= 60) return '#ffc107'; // Yellow for good
        if (percentage >= 40) return '#fd7e14'; // Orange for average
        return '#dc3545'; // Red for poor
    };

    const getScoreMessage = (percentage) => {
        if (percentage >= 80) return 'Excellent! Outstanding performance!';
        if (percentage >= 60) return 'Good job! Well done!';
        if (percentage >= 40) return 'Average performance. Keep practicing!';
        return 'Keep studying and try again!';
    };

    const handleRetakeExam = () => {
        localStorage.removeItem('examResult');
        navigate('/exam');
    };

    const handleGoHome = () => {
        localStorage.removeItem('examResult');
        navigate('/');
    };

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                fontSize: '18px'
            }}>
                Loading results...
            </div>
        );
    }

    if (!result) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                padding: '20px'
            }}>
                <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>No Results Found</h2>
                <p style={{ marginBottom: '30px', textAlign: 'center' }}>
                    It seems like there are no exam results to display. 
                    Please take an exam first.
                </p>
                <button 
                    onClick={handleGoHome}
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
                    Go to Home
                </button>
            </div>
        );
    }

    const percentage = Math.round((result.score / result.total) * 100);
    const scoreColor = getScoreColor(percentage);
    const scoreMessage = getScoreMessage(percentage);

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '800px', 
            margin: '0 auto',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            {/* Header */}
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                padding: '20px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ 
                    color: '#333', 
                    marginBottom: '10px',
                    fontSize: '2.5rem'
                }}>
                    Exam Results
                </h1>
                <p style={{ color: '#666', fontSize: '18px' }}>
                    Your exam has been completed successfully!
                </p>
            </div>

            {/* Score Display */}
            <div style={{ 
                background: 'white',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                marginBottom: '30px',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: `8px solid ${scoreColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 30px auto',
                    background: 'white'
                }}>
                    <div style={{ 
                        fontSize: '3rem', 
                        fontWeight: 'bold', 
                        color: scoreColor 
                    }}>
                        {percentage}%
                    </div>
                    <div style={{ 
                        fontSize: '1.2rem', 
                        color: '#666',
                        marginTop: '5px'
                    }}>
                        Score
                    </div>
                </div>

                <h2 style={{ 
                    color: scoreColor, 
                    marginBottom: '15px',
                    fontSize: '2rem'
                }}>
                    {scoreMessage}
                </h2>

                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '40px',
                    marginTop: '30px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            fontSize: '2rem', 
                            fontWeight: 'bold', 
                            color: '#28a745' 
                        }}>
                            {result.score}
                        </div>
                        <div style={{ color: '#666' }}>Correct Answers</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            fontSize: '2rem', 
                            fontWeight: 'bold', 
                            color: '#dc3545' 
                        }}>
                            {result.total - result.score}
                        </div>
                        <div style={{ color: '#666' }}>Incorrect Answers</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            fontSize: '2rem', 
                            fontWeight: 'bold', 
                            color: '#007bff' 
                        }}>
                            {result.total}
                        </div>
                        <div style={{ color: '#666' }}>Total Questions</div>
                    </div>
                </div>
            </div>

            {/* Detailed Results */}
            <div style={{ 
                background: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <h3 style={{ 
                    color: '#333', 
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    Performance Summary
                </h3>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                }}>
                    <div style={{ 
                        padding: '20px', 
                        background: '#f8f9fa', 
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 'bold', 
                            color: '#28a745' 
                        }}>
                            {Math.round((result.score / result.total) * 100)}%
                        </div>
                        <div style={{ color: '#666' }}>Accuracy</div>
                    </div>
                    
                    <div style={{ 
                        padding: '20px', 
                        background: '#f8f9fa', 
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 'bold', 
                            color: '#007bff' 
                        }}>
                            {result.total}
                        </div>
                        <div style={{ color: '#666' }}>Questions Attempted</div>
                    </div>
                    
                    <div style={{ 
                        padding: '20px', 
                        background: '#f8f9fa', 
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <div style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 'bold', 
                            color: '#ffc107' 
                        }}>
                            {new Date().toLocaleDateString()}
                        </div>
                        <div style={{ color: '#666' }}>Exam Date</div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '20px',
                flexWrap: 'wrap'
            }}>
                <button 
                    onClick={handleRetakeExam}
                    style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Retake Exam
                </button>
                
                <button 
                    onClick={handleGoHome}
                    style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Go to Home
                </button>
            </div>

            {/* Footer */}
            <div style={{ 
                textAlign: 'center', 
                marginTop: '40px',
                padding: '20px',
                color: '#666',
                fontSize: '14px'
            }}>
                <p>Thank you for completing the exam!</p>
                <p>Your results have been saved. You can retake the exam anytime.</p>
            </div>
        </div>
    );
}

export default Result;






