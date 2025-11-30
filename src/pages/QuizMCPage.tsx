import { useParams } from 'react-router-dom';
import './QuizMCPage.css';

function QuizMCPage() {
  const { deckId } = useParams<{ deckId: string }>();

  return (
    <div className="quiz-mc-page">
      <h1>Multiple Choice Quiz</h1>
      <p className="deck-info">Deck ID: {deckId}</p>
      <div className="placeholder-message">
        <p>Multiple choice quiz coming soon!</p>
      </div>
    </div>
  );
}

export default QuizMCPage;

