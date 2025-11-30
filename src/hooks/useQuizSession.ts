import { useState, useCallback, useEffect } from 'react';
import { Card } from '../types';
import { shuffleArray } from '../utils/array';
import { generateMCOptions } from '../utils/quiz';

interface UseQuizSessionProps {
  cards: Card[];
  mode: 'mc' | 'fill';
  onUpdateStats: (cardId: string, correct: boolean) => void;
}

export function useQuizSession({ cards, mode, onUpdateStats }: UseQuizSessionProps) {
  // Initialize quiz cards (shuffled)
  const [quizCards, setQuizCards] = useState<Card[]>(() => shuffleArray(cards));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  // For multiple choice
  const [mcOptions, setMcOptions] = useState<string[]>([]);

  const currentCard = quizCards[currentCardIndex];
  const totalCards = quizCards.length;
  const cardNumber = currentCardIndex + 1;
  const isLastCard = currentCardIndex === quizCards.length - 1;

  // Generate MC options when card changes (for MC mode)
  useEffect(() => {
    if (mode === 'mc' && currentCard) {
      const options = generateMCOptions(currentCard, cards, 4);
      setMcOptions(options);
    }
  }, [currentCard, cards, mode]);

  const handleAnswer = useCallback(
    (answer: string, isCorrect: boolean) => {
      // Update stats
      onUpdateStats(currentCard.id, isCorrect);

      // Update session statistics
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setIncorrectCount((prev) => prev + 1);
      }

      setLastAnswerCorrect(isCorrect);
      setShowFeedback(true);
    },
    [currentCard, onUpdateStats]
  );

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    setUserAnswer('');

    if (isLastCard) {
      setShowSummary(true);
    } else {
      setCurrentCardIndex((prev) => prev + 1);
    }
  }, [isLastCard]);

  const restartQuiz = useCallback(() => {
    const shuffled = shuffleArray(cards);
    setQuizCards(shuffled);
    setCurrentCardIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setShowFeedback(false);
    setLastAnswerCorrect(false);
    setShowSummary(false);
    setUserAnswer('');
  }, [cards]);

  return {
    // State
    currentCard,
    currentCardIndex,
    cardNumber,
    totalCards,
    correctCount,
    incorrectCount,
    showFeedback,
    lastAnswerCorrect,
    showSummary,
    userAnswer,
    mcOptions,
    isLastCard,
    // Actions
    handleAnswer,
    handleNext,
    restartQuiz,
    setUserAnswer,
  };
}

