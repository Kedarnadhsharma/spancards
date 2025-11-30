import { useParams } from 'react-router-dom';
import './QuizFillPage.css';

function QuizFillPage() {
  const { deckId } = useParams<{ deckId: string }>();

  return (
    <div className="quiz-fill-page">
      <h1>Fill in the Blank Quiz</h1>
      <p className="deck-info">Deck ID: {deckId}</p>
      <div className="placeholder-message">
        <p>Fill in the blank quiz coming soon!</p>
      </div>
    </div>
  );
}

export default QuizFillPage;

