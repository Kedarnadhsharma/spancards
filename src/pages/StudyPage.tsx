import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Card } from '../types';
import './StudyPage.css';

function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { getDeck, getCardsByDeck, updateCardStats, addSession } = useAppContext();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCards, setSessionCards] = useState<Card[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartTime] = useState(new Date().toISOString());

  // Initialize session cards (shuffled)
  useEffect(() => {
    if (deckId) {
      const cards = getCardsByDeck(deckId);
      // Shuffle cards for variety
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setSessionCards(shuffled);
    }
  }, [deckId, getCardsByDeck]);

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

  if (sessionCards.length === 0) {
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

  const currentCard = sessionCards[currentCardIndex];
  const isLastCard = currentCardIndex === sessionCards.length - 1;
  const totalCards = sessionCards.length;
  const cardNumber = currentCardIndex + 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    // Update card statistics
    updateCardStats(currentCard.id, correct);

    // Update session statistics
    if (correct) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
      setWrongCardIds([...wrongCardIds, currentCard.id]);
    }

    // Move to next card or show summary
    if (isLastCard) {
      // Session complete - record session and show summary
      const session = {
        id: `session-${Date.now()}`,
        deckId: deckId,
        startedAt: sessionStartTime,
        endedAt: new Date().toISOString(),
        totalCards: totalCards,
        correct: correct ? correctCount + 1 : correctCount,
        incorrect: correct ? incorrectCount : incorrectCount + 1,
      };
      addSession(session);
      setShowSummary(true);
    } else {
      // Move to next card
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleRedoWrongCards = () => {
    const wrongCards = sessionCards.filter(card => wrongCardIds.includes(card.id));
    setSessionCards(wrongCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongCardIds([]);
    setShowSummary(false);
  };

  const handleStartNewSession = () => {
    const cards = getCardsByDeck(deckId);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setSessionCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongCardIds([]);
    setShowSummary(false);
  };

  // Summary Screen
  if (showSummary) {
    const accuracy = totalCards > 0 
      ? Math.round((correctCount / totalCards) * 100) 
      : 0;

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
              <button onClick={handleRedoWrongCards} className="btn btn-warning">
                Redo Only Cards I Got Wrong ({wrongCardIds.length})
              </button>
            )}
            <button onClick={handleStartNewSession} className="btn btn-primary">
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

  // Study Screen
  return (
    <div className="study-page">
      <div className="study-header">
        <h1>{deck.name}</h1>
        <div className="progress-info">
          <span className="card-progress">Card {cardNumber} of {totalCards}</span>
          <div className="progress-bar">
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
        >
          <div className="flashcard-content">
            {!isFlipped ? (
              <div className="card-front">
                <span className="language-label">Spanish</span>
                <h2 className="card-text">{currentCard.spanish}</h2>
                <p className="flip-hint">Click card to flip</p>
              </div>
            ) : (
              <div className="card-back">
                <span className="language-label">English</span>
                <h2 className="card-text">{currentCard.english}</h2>
                {currentCard.exampleSentenceSpanish && (
                  <div className="example-sentences">
                    <p className="example-spanish">"{currentCard.exampleSentenceSpanish}"</p>
                    <p className="example-english">"{currentCard.exampleSentenceEnglish}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!isFlipped ? (
          <div className="card-actions">
            <button onClick={handleFlip} className="btn btn-flip">
              Flip Card
            </button>
          </div>
        ) : (
          <div className="card-actions">
            <button 
              onClick={() => handleAnswer(false)} 
              className="btn btn-wrong"
            >
              ✗ I got it wrong
            </button>
            <button 
              onClick={() => handleAnswer(true)} 
              className="btn btn-correct"
            >
              ✓ I got it right
            </button>
          </div>
        )}

        <div className="session-stats-inline">
          <span className="stat-inline correct">Correct: {correctCount}</span>
          <span className="stat-inline incorrect">Incorrect: {incorrectCount}</span>
        </div>
      </div>
    </div>
  );
}

export default StudyPage;

