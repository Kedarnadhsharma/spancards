import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './StudyPage.css';

function StudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { getDeck, getCardsByDeck } = useAppContext();

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
  const cards = getCardsByDeck(deckId);

  if (!deck) {
    return (
      <div className="study-page">
        <h1>Deck Not Found</h1>
        <p>The deck you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

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

  return (
    <div className="study-page">
      <h1>Study Mode: {deck.name}</h1>
      <p className="deck-info">{deck.description}</p>
      <p className="card-count">{cards.length} cards in this deck</p>
      <div className="placeholder-message">
        <p>Flashcard study mode will be implemented in Phase 3!</p>
        <p>Ready to study {cards.length} cards.</p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default StudyPage;

