import { useState, useCallback, useEffect } from 'react';
import { Card, StudySessionRecord } from '../types';
import { shuffleArray } from '../utils/array';

interface UseStudySessionProps {
  deckId: string;
  cards: Card[];
  onSessionComplete: (session: StudySessionRecord) => void;
}

export function useStudySession({ deckId, cards, onSessionComplete }: UseStudySessionProps) {
  // Initialize session cards immediately with shuffled cards
  const [sessionCards, setSessionCards] = useState<Card[]>(() => shuffleArray(cards));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartTime] = useState(new Date().toISOString());

  // Update session cards if the deck changes
  useEffect(() => {
    if (cards.length > 0 && sessionCards.length === 0) {
      const shuffled = shuffleArray(cards);
      setSessionCards(shuffled);
    }
  }, [cards, sessionCards.length]);

  const currentCard = sessionCards[currentCardIndex];
  const isLastCard = currentCardIndex === sessionCards.length - 1;
  const totalCards = sessionCards.length;
  const cardNumber = currentCardIndex + 1;

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      // Update session statistics
      if (correct) {
        setCorrectCount((prev) => prev + 1);
      } else {
        setIncorrectCount((prev) => prev + 1);
        setWrongCardIds((prev) => [...prev, currentCard.id]);
      }

      // Move to next card or show summary
      if (isLastCard) {
        // Session complete - record session and show summary
        const session: StudySessionRecord = {
          id: `session-${Date.now()}`,
          deckId,
          startedAt: sessionStartTime,
          endedAt: new Date().toISOString(),
          totalCards,
          correct: correct ? correctCount + 1 : correctCount,
          incorrect: correct ? incorrectCount : incorrectCount + 1,
        };
        onSessionComplete(session);
        setShowSummary(true);
      } else {
        // Move to next card
        setCurrentCardIndex((prev) => prev + 1);
        setIsFlipped(false);
      }
    },
    [
      currentCard,
      isLastCard,
      correctCount,
      incorrectCount,
      deckId,
      sessionStartTime,
      totalCards,
      onSessionComplete,
    ]
  );

  const startNewSession = useCallback(() => {
    const shuffled = shuffleArray(cards);
    setSessionCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongCardIds([]);
    setShowSummary(false);
  }, [cards]);

  const redoWrongCards = useCallback(() => {
    const wrongCards = sessionCards.filter((card) =>
      wrongCardIds.includes(card.id)
    );
    setSessionCards(wrongCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongCardIds([]);
    setShowSummary(false);
  }, [sessionCards, wrongCardIds]);

  return {
    // State
    currentCard,
    currentCardIndex,
    isFlipped,
    correctCount,
    incorrectCount,
    wrongCardIds,
    showSummary,
    isLastCard,
    totalCards,
    cardNumber,
    // Actions
    handleFlip,
    handleAnswer,
    startNewSession,
    redoWrongCards,
  };
}

