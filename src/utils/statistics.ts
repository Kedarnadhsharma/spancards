import { Card } from '../types';

/**
 * Calculates accuracy percentage from correct and incorrect counts
 * @param correct - Number of correct answers
 * @param incorrect - Number of incorrect answers
 * @returns Accuracy percentage (0-100)
 */
export function calculateAccuracy(correct: number, incorrect: number): number {
  const total = correct + incorrect;
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

/**
 * Calculates statistics from an array of cards
 * @param cards - Array of cards to analyze
 * @returns Statistics object with correct, incorrect, attempts, and accuracy
 */
export function calculateCardStats(cards: Card[]) {
  const correct = cards.reduce((sum, card) => sum + card.stats.correctCount, 0);
  const incorrect = cards.reduce((sum, card) => sum + card.stats.incorrectCount, 0);
  const attempts = correct + incorrect;
  const accuracy = calculateAccuracy(correct, incorrect);
  
  return {
    correct,
    incorrect,
    attempts,
    accuracy,
  };
}

/**
 * Filters cards that have been studied at least once
 * @param cards - Array of cards to filter
 * @returns Studied cards
 */
export function getStudiedCards(cards: Card[]): Card[] {
  return cards.filter(
    (card) => card.stats.correctCount > 0 || card.stats.incorrectCount > 0
  );
}

