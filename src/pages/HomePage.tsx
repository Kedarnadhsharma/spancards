import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './HomePage.css';

function HomePage() {
  const { getAllDecks, getCardsByDeck } = useAppContext();
  const decks = getAllDecks();

  return (
    <div className="home-page">
      <h1>Welcome to SpanCards</h1>
      <p className="subtitle">Your Spanish vocabulary learning companion</p>
      
      {decks.length === 0 ? (
        <div className="empty-state">
          <p>No decks available yet. Add some cards to get started!</p>
        </div>
      ) : (
        <div className="decks-grid">
          {decks.map((deck) => {
            const cardCount = getCardsByDeck(deck.id).length;
            return (
              <div key={deck.id} className="deck-card">
                <h2 className="deck-name">{deck.name}</h2>
                <p className="deck-description">{deck.description}</p>
                <p className="deck-card-count">{cardCount} cards</p>
                <div className="deck-actions">
                  <Link to={`/study/${deck.id}`} className="btn btn-primary">
                    Study
                  </Link>
                  <Link to={`/quiz/${deck.id}`} className="btn btn-secondary">
                    Quiz
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;

