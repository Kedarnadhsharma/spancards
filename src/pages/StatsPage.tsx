import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { calculateCardStats, getStudiedCards } from '../utils/statistics';
import { getDifficultCards, getDifficultyLevel } from '../utils/difficulty';
import './StatsPage.css';

function StatsPage() {
  const { appState, getAllDecks, getCardsByDeck } = useAppContext();
  const decks = getAllDecks();

  // Calculate global statistics
  const allCards = Object.values(appState.cards);
  const totalCardsStudied = getStudiedCards(allCards).length;
  const { correct: totalCorrect, incorrect: totalIncorrect, attempts: totalAttempts, accuracy: overallAccuracy } = 
    calculateCardStats(allCards);

  return (
    <div className="stats-page">
      <h1>Statistics</h1>
      <p className="subtitle">Track your learning progress</p>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Cards Studied</h3>
          <p className="stat-value">{totalCardsStudied}</p>
          <p className="stat-label">out of {allCards.length} total</p>
        </div>
        <div className="stat-card">
          <h3>Total Attempts</h3>
          <p className="stat-value">{totalAttempts}</p>
          <p className="stat-label">questions answered</p>
        </div>
        <div className="stat-card">
          <h3>Correct</h3>
          <p className="stat-value correct">{totalCorrect}</p>
          <p className="stat-label">correct answers</p>
        </div>
        <div className="stat-card">
          <h3>Incorrect</h3>
          <p className="stat-value incorrect">{totalIncorrect}</p>
          <p className="stat-label">wrong answers</p>
        </div>
        <div className="stat-card highlight">
          <h3>Overall Accuracy</h3>
          <p className="stat-value">{overallAccuracy}%</p>
          <p className="stat-label">
            {totalAttempts === 0 ? 'Start studying!' : 'Keep it up!'}
          </p>
        </div>
      </div>

      <div className="deck-stats-section">
        <h2>Per-Deck Statistics</h2>
        {decks.length === 0 ? (
          <p className="no-data">No decks available.</p>
        ) : (
          <div className="deck-stats-grid">
            {decks.map((deck) => {
              const cards = getCardsByDeck(deck.id);
              const { correct: deckCorrect, incorrect: deckIncorrect, attempts: deckAttempts, accuracy: deckAccuracy } = 
                calculateCardStats(cards);

              return (
                <div key={deck.id} className="deck-stat-card">
                  <h3>{deck.name}</h3>
                  <div className="deck-stat-details">
                    <div className="stat-row">
                      <span>Total Answers:</span>
                      <span className="stat-number">{deckAttempts}</span>
                    </div>
                    <div className="stat-row">
                      <span>Correct:</span>
                      <span className="stat-number correct">{deckCorrect}</span>
                    </div>
                    <div className="stat-row">
                      <span>Incorrect:</span>
                      <span className="stat-number incorrect">
                        {deckIncorrect}
                      </span>
                    </div>
                    <div className="stat-row highlight">
                      <span>Accuracy:</span>
                      <span className="stat-number">
                        {deckAttempts > 0 ? `${deckAccuracy}%` : 'No data'}
                      </span>
                    </div>
                  </div>
                  <Link to={`/study/${deck.id}`} className="study-link">
                    Study this deck →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Difficult Cards Section */}
      <div className="difficult-cards-section">
        <h2>Difficult Cards</h2>
        {(() => {
          const difficultCards = getDifficultCards(allCards);
          
          if (difficultCards.length === 0) {
            return (
              <p className="no-data">
                {totalAttempts === 0
                  ? 'Start studying to identify difficult cards.'
                  : 'Great job! No difficult cards yet. Keep studying!'}
              </p>
            );
          }

          return (
            <>
              <p className="section-description">
                Cards with accuracy below 60% ({difficultCards.length} card{difficultCards.length !== 1 ? 's' : ''})
              </p>
              <div className="difficult-cards-grid">
                {difficultCards.slice(0, 10).map((card) => {
                  const accuracy = Math.round(
                    (card.stats.correctCount /
                      (card.stats.correctCount + card.stats.incorrectCount)) *
                      100
                  );
                  const difficulty = getDifficultyLevel(card);

                  return (
                    <div key={card.id} className={`difficult-card ${difficulty}`}>
                      <div className="card-content">
                        <p className="card-spanish">{card.spanish}</p>
                        <p className="card-english">{card.english}</p>
                      </div>
                      <div className="card-stats">
                        <span className="accuracy-badge">{accuracy}%</span>
                        <span className="attempts">
                          {card.stats.correctCount}✓ / {card.stats.incorrectCount}✗
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {difficultCards.length > 10 && (
                <p className="more-cards">
                  +{difficultCards.length - 10} more difficult card{difficultCards.length - 10 !== 1 ? 's' : ''}
                </p>
              )}
            </>
          );
        })()}
      </div>

      {totalAttempts === 0 && (
        <div className="placeholder-message">
          <p>No study data yet. Start studying to see your statistics!</p>
          <Link to="/" className="btn btn-primary">
            Go to Decks
          </Link>
        </div>
      )}
    </div>
  );
}

export default StatsPage;

