import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useStudySession } from '../hooks/useStudySession';
import { calculateAccuracy } from '../utils/statistics';
import './StudyPage.css';

function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { getDeck, getCardsByDeck, updateCardStats, addSession } = useAppContext();

  if (!deckId) {
    return (
      <div className="study-page">
        <h1>Error</h1>
        <p>No deck selected.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const deck = getDeck(deckId);

  if (!deck) {
    return (
      <div className="study-page">
        <h1>Deck Not Found</h1>
        <p>The deck you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const cards = getCardsByDeck(deckId);

  if (cards.length === 0) {
    return (
      <div className="study-page">
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
    isFlipped,
    correctCount,
    incorrectCount,
    wrongCardIds,
    showSummary,
    totalCards,
    cardNumber,
    handleFlip,
    handleAnswer: handleSessionAnswer,
    startNewSession,
    redoWrongCards,
  } = useStudySession({
    deckId,
    cards,
    onSessionComplete: (session) => addSession(session),
  });

  const handleAnswer = (correct: boolean) => {
    if (!currentCard) return;
    updateCardStats(currentCard.id, correct);
    handleSessionAnswer(correct);
  };

  // Guard: If no current card, show loading or return to prevent rendering errors
  if (!currentCard && !showSummary) {
    return (
      <div className="study-page">
        <h1>{deck.name}</h1>
        <div className="empty-state">
          <p>Loading cards...</p>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (showSummary) {
    const accuracy = calculateAccuracy(correctCount, incorrectCount);

    return (
      <div className="study-page">
        <div className="session-summary">
          <h1>Session Complete! 🎉</h1>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Cards Studied</span>
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
            {wrongCardIds.length > 0 && (
              <button onClick={redoWrongCards} className="btn btn-warning">
                Redo Only Cards I Got Wrong ({wrongCardIds.length})
              </button>
            )}
            <button onClick={startNewSession} className="btn btn-primary">
              Start New Session
            </button>
            <Link to="/" className="btn btn-secondary">
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Study Screen (only if currentCard exists)
  if (!currentCard) {
    return null; // This shouldn't happen due to guard above, but TypeScript needs it
  }

  return (
    <div className="study-page">
      <div className="study-header">
        <h1>{deck.name}</h1>
        <div className="progress-info" role="status" aria-live="polite">
          <span className="card-progress" aria-label={`Card ${cardNumber} of ${totalCards}`}>
            Card {cardNumber} of {totalCards}
          </span>
          <div className="progress-bar" role="progressbar" aria-valuenow={cardNumber} aria-valuemin={1} aria-valuemax={totalCards} aria-label="Study progress">
            <div 
              className="progress-fill" 
              style={{ width: `${(cardNumber / totalCards) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flashcard-container">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? `English translation: ${currentCard.english}` : `Spanish word: ${currentCard.spanish}. Press to flip card`}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFlip();
            }
          }}
        >
          <div className="flashcard-content">
            {!isFlipped ? (
              <div className="card-front">
                <span className="language-label" aria-label="Language: Spanish">Spanish</span>
                <h2 className="card-text">{currentCard.spanish}</h2>
                <p className="flip-hint">Click card to flip</p>
              </div>
            ) : (
              <div className="card-back">
                <span className="language-label" aria-label="Language: English">English</span>
                <h2 className="card-text">{currentCard.english}</h2>
                {currentCard.exampleSentenceSpanish && (
                  <div className="example-sentences">
                    <p className="example-spanish" lang="es">"{currentCard.exampleSentenceSpanish}"</p>
                    <p className="example-english" lang="en">"{currentCard.exampleSentenceEnglish}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!isFlipped ? (
          <div className="card-actions" role="group" aria-label="Card actions">
            <button onClick={handleFlip} className="btn btn-flip" aria-label="Flip card to see English translation">
              Flip Card
            </button>
          </div>
        ) : (
          <div className="card-actions" role="group" aria-label="Answer options">
            <button 
              onClick={() => handleAnswer(false)} 
              className="btn btn-wrong"
              aria-label="Mark as incorrect"
            >
              <span aria-hidden="true">✗</span> I got it wrong
            </button>
            <button 
              onClick={() => handleAnswer(true)} 
              className="btn btn-correct"
              aria-label="Mark as correct"
            >
              <span aria-hidden="true">✓</span> I got it right
            </button>
          </div>
        )}

        <div className="session-stats-inline" role="status" aria-live="polite" aria-label="Current session statistics">
          <span className="stat-inline correct" aria-label={`Correct answers: ${correctCount}`}>
            Correct: {correctCount}
          </span>
          <span className="stat-inline incorrect" aria-label={`Incorrect answers: ${incorrectCount}`}>
            Incorrect: {incorrectCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StudyPage;

