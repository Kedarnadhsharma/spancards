import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useQuizSession } from '../hooks/useQuizSession';
import { calculateAccuracy } from '../utils/statistics';
import { checkAnswer } from '../utils/quiz';
import './QuizFillPage.css';

function QuizFillPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { getDeck, getCardsByDeck, updateCardStats } = useAppContext();

  if (!deckId) {
    return (
      <div className="quiz-fill-page">
        <h1>Error</h1>
        <p>No deck selected.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const deck = getDeck(deckId);
  const cards = getCardsByDeck(deckId);

  if (!deck) {
    return (
      <div className="quiz-fill-page">
        <h1>Deck Not Found</h1>
        <p>The deck you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="quiz-fill-page">
        <h1>{deck.name}</h1>
        <div className="empty-state">
          <p>This deck has no cards yet.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const {
    currentCard,
    cardNumber,
    totalCards,
    correctCount,
    incorrectCount,
    showFeedback,
    lastAnswerCorrect,
    showSummary,
    userAnswer,
    handleAnswer,
    handleNext,
    restartQuiz,
    setUserAnswer,
  } = useQuizSession({
    cards,
    mode: 'fill',
    onUpdateStats: updateCardStats,
  });

  // Guard: If no current card, show loading
  if (!currentCard && !showSummary) {
    return (
      <div className="quiz-fill-page">
        <h1>{deck.name}</h1>
        <div className="empty-state">
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (showSummary) {
    const accuracy = calculateAccuracy(correctCount, incorrectCount);

    return (
      <div className="quiz-fill-page">
        <div className="quiz-summary">
          <h1>Quiz Complete! 🎉</h1>
          <h2>{deck.name}</h2>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Questions</span>
              <span className="stat-value">{totalCards}</span>
            </div>
            <div className="summary-stat correct">
              <span className="stat-label">Correct</span>
              <span className="stat-value">{correctCount}</span>
            </div>
            <div className="summary-stat incorrect">
              <span className="stat-label">Incorrect</span>
              <span className="stat-value">{incorrectCount}</span>
            </div>
            <div className="summary-stat accuracy">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value">{accuracy}%</span>
            </div>
          </div>

          <div className="summary-actions">
            <button onClick={restartQuiz} className="btn btn-primary">
              Retake Quiz
            </button>
            <Link to={`/quiz/${deckId}`} className="btn btn-secondary">
              Choose Different Mode
            </Link>
            <Link to="/" className="btn btn-tertiary">
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (!currentCard) {
    return null; // This shouldn't happen due to guard above
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim() || showFeedback) return;

    const isCorrect = checkAnswer(userAnswer, currentCard.english);
    handleAnswer(userAnswer, isCorrect);
  };

  return (
    <div className="quiz-fill-page">
      <div className="quiz-header">
        <h1>Fill in the Blank Quiz</h1>
        <h2>{deck.name}</h2>
        <div className="progress-info">
          <span className="card-progress">Question {cardNumber} of {totalCards}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(cardNumber / totalCards) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <p className="question-label">Translate this Spanish word to English:</p>
          <h2 className="question-text">{currentCard.spanish}</h2>
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          <div className="input-container">
            <input
              type="text"
              className="answer-input"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              autoFocus
            />
          </div>

          {!showFeedback && (
            <button 
              type="submit" 
              className="btn btn-primary submit-button"
              disabled={!userAnswer.trim()}
            >
              Submit Answer
            </button>
          )}
        </form>

        {showFeedback && (
          <div className={`feedback ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
            <p className="feedback-message">
              {lastAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            {!lastAnswerCorrect && (
              <div className="answer-comparison">
                <p className="your-answer">
                  Your answer: <strong>{userAnswer}</strong>
                </p>
                <p className="correct-answer">
                  Correct answer: <strong>{currentCard.english}</strong>
                </p>
              </div>
            )}
            <button onClick={handleNext} className="btn btn-primary">
              {cardNumber === totalCards ? 'See Results' : 'Next Question'}
            </button>
          </div>
        )}

        <div className="quiz-stats-inline">
          <span className="stat-inline correct">Correct: {correctCount}</span>
          <span className="stat-inline incorrect">Incorrect: {incorrectCount}</span>
        </div>
      </div>
    </div>
  );
}

export default QuizFillPage;
