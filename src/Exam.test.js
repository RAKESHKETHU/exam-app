import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Exam from './Exam';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockQuestions = [
  {
    _id: '1',
    question: 'What is React?',
    options: ['A library', 'A framework', 'A language', 'A database'],
    correctAnswer: 0
  },
  {
    _id: '2',
    question: 'Which hook is used for side effects?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 1
  }
];

describe('Exam Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  test('renders exam interface', () => {
    renderWithRouter(<Exam />);
    expect(screen.getByText(/exam/i)).toBeInTheDocument();
    expect(screen.getByText(/loading questions/i)).toBeInTheDocument();
  });

  test('loads and displays questions', async () => {
    axios.get.mockResolvedValueOnce({ data: mockQuestions });
    
    renderWithRouter(<Exam />);
    
    await waitFor(() => {
      expect(screen.getByText('What is React?')).toBeInTheDocument();
      expect(screen.getByText('Which hook is used for side effects?')).toBeInTheDocument();
    });
  });

  test('allows selecting answers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockQuestions });
    
    renderWithRouter(<Exam />);
    
    await waitFor(() => {
      expect(screen.getByText('What is React?')).toBeInTheDocument();
    });
    
    const firstOption = screen.getByLabelText('A library');
    fireEvent.click(firstOption);
    expect(firstOption.checked).toBe(true);
  });

  test('submits exam answers', async () => {
    axios.get.mockResolvedValueOnce({ data: mockQuestions });
    axios.post.mockResolvedValueOnce({ data: { score: 100, total: 2 } });
    
    renderWithRouter(<Exam />);
    
    await waitFor(() => {
      expect(screen.getByText('What is React?')).toBeInTheDocument();
    });
    
    // Select answers
    const firstOption = screen.getByLabelText('A library');
    const secondOption = screen.getByLabelText('useEffect');
    
    fireEvent.click(firstOption);
    fireEvent.click(secondOption);
    
    const submitButton = screen.getByRole('button', { name: /submit exam/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/exam/submit', {
        answers: {
          '1': 'A library',
          '2': 'useEffect'
        }
      });
    });
  });

  test('displays results after submission', async () => {
    axios.get.mockResolvedValueOnce({ data: mockQuestions });
    axios.post.mockResolvedValueOnce({ data: { score: 100, total: 2 } });
    
    renderWithRouter(<Exam />);
    
    await waitFor(() => {
      expect(screen.getByText('What is React?')).toBeInTheDocument();
    });
    
    // Select answers and submit
    const firstOption = screen.getByLabelText('A library');
    const secondOption = screen.getByLabelText('useEffect');
    
    fireEvent.click(firstOption);
    fireEvent.click(secondOption);
    
    const submitButton = screen.getByRole('button', { name: /submit exam/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/result');
    });
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'Failed to load questions' } } });
    
    renderWithRouter(<Exam />);
    
    // Should still show loading state
    expect(screen.getByText(/loading questions/i)).toBeInTheDocument();
  });

  test('displays timer correctly', () => {
    renderWithRouter(<Exam />);
    
    // Timer should be visible
    expect(screen.getByText(/time remaining/i)).toBeInTheDocument();
  });

  test('formats time correctly', () => {
    renderWithRouter(<Exam />);
    
    // Initial time should be 30:00
    expect(screen.getByText(/30:00/i)).toBeInTheDocument();
  });
});
