import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './QuizPage.css';

function QuizPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { getDeck, getCardsByDeck } = useAppContext();

  if (!deckId) {
    return (
      <div className="quiz-page">
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
      <div className="quiz-page">
        <h1>Deck Not Found</h1>
        <p>The deck you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="quiz-page">
        <h1>{deck.name}</h1>
        <div className="empty-state">
          <p>This deck has no cards yet.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1>Quiz Mode: {deck.name}</h1>
      <p className="deck-info">{deck.description}</p>
      <p className="card-count">{cards.length} cards available</p>
      
      <div className="quiz-modes">
        <div className="quiz-mode-card">
          <h2>Multiple Choice</h2>
          <p>Test your knowledge by selecting the correct translation from multiple options.</p>
          <Link to={`/quiz/${deckId}/mc`} className="btn btn-primary">
            Start Multiple Choice Quiz
          </Link>
        </div>
        
        <div className="quiz-mode-card">
          <h2>Fill in the Blank</h2>
          <p>Type the correct English translation for each Spanish word.</p>
          <Link to={`/quiz/${deckId}/fill`} className="btn btn-secondary">
            Start Fill-in Quiz
          </Link>
        </div>
      </div>
      
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}

export default QuizPage;

