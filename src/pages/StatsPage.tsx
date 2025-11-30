import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './StatsPage.css';

function StatsPage() {
  const { appState, getAllDecks, getCardsByDeck } = useAppContext();
  const decks = getAllDecks();

  // Calculate global statistics
  const allCards = Object.values(appState.cards);
  const totalCardsStudied = allCards.filter(
    (card) => card.stats.correctCount > 0 || card.stats.incorrectCount > 0
  ).length;
  const totalCorrect = allCards.reduce(
    (sum, card) => sum + card.stats.correctCount,
    0
  );
  const totalIncorrect = allCards.reduce(
    (sum, card) => sum + card.stats.incorrectCount,
    0
  );
  const totalAttempts = totalCorrect + totalIncorrect;
  const overallAccuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

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
              const deckCorrect = cards.reduce(
                (sum, card) => sum + card.stats.correctCount,
                0
              );
              const deckIncorrect = cards.reduce(
                (sum, card) => sum + card.stats.incorrectCount,
                0
              );
              const deckAttempts = deckCorrect + deckIncorrect;
              const deckAccuracy =
                deckAttempts > 0
                  ? Math.round((deckCorrect / deckAttempts) * 100)
                  : 0;

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

