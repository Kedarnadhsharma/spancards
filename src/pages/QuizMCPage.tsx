import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useQuizSession } from '../hooks/useQuizSession';
import { calculateAccuracy } from '../utils/statistics';
import './QuizMCPage.css';

function QuizMCPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { getDeck, getCardsByDeck, updateCardStats } = useAppContext();

  if (!deckId) {
    return (
      <div className="quiz-mc-page">
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
      <div className="quiz-mc-page">
        <h1>Deck Not Found</h1>
        <p>The deck you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="quiz-mc-page">
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
    mcOptions,
    handleAnswer,
    handleNext,
    restartQuiz,
  } = useQuizSession({
    cards,
    mode: 'mc',
    onUpdateStats: updateCardStats,
  });

  // Guard: If no current card, show loading
  if (!currentCard && !showSummary) {
    return (
      <div className="quiz-mc-page">
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
      <div className="quiz-mc-page">
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

  const handleOptionClick = (option: string) => {
    if (showFeedback) return; // Don't allow answer changes during feedback
    const isCorrect = option === currentCard.english;
    handleAnswer(option, isCorrect);
  };

  return (
    <div className="quiz-mc-page">
      <div className="quiz-header">
        <h1>Multiple Choice Quiz</h1>
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
          <p className="question-label">Translate this Spanish word:</p>
          <h2 className="question-text">{currentCard.spanish}</h2>
        </div>

        <div className="options-container">
          {mcOptions.map((option, index) => {
            const isCorrect = option === currentCard.english;
            let optionClass = 'option-button';
            
            if (showFeedback) {
              if (isCorrect) {
                optionClass += ' correct';
              } else if (!isCorrect && !lastAnswerCorrect) {
                // Show which one was selected incorrectly
                optionClass += ' incorrect';
              }
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}.</span>
                <span className="option-text">{option}</span>
                {showFeedback && isCorrect && <span className="option-icon">✓</span>}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`feedback ${lastAnswerCorrect ? 'correct' : 'incorrect'}`}>
            <p className="feedback-message">
              {lastAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            {!lastAnswerCorrect && (
              <p className="correct-answer">
                The correct answer is: <strong>{currentCard.english}</strong>
              </p>
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

export default QuizMCPage;
