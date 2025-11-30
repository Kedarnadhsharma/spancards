import { Card } from '../types';
import { calculateAccuracy } from './statistics';

/**
 * Determines if a card is considered difficult
 * @param card - The card to evaluate
 * @returns true if the card is difficult, false otherwise
 */
export function isDifficultCard(card: Card): boolean {
  const { correctCount, incorrectCount } = card.stats;
  const totalAttempts = correctCount + incorrectCount;

  // Card must have been attempted at least once
  if (totalAttempts === 0) {
    return false;
  }

  // Card must have at least one incorrect answer
  if (incorrectCount === 0) {
    return false;
  }

  // Card is difficult if accuracy is below 60%
  const accuracy = calculateAccuracy(correctCount, incorrectCount);
  return accuracy < 60;
}

/**
 * Gets all difficult cards from an array
 * @param cards - Array of cards to filter
 * @returns Array of difficult cards, sorted by accuracy (worst first)
 */
export function getDifficultCards(cards: Card[]): Card[] {
  return cards
    .filter(isDifficultCard)
    .sort((a, b) => {
      const accuracyA = calculateAccuracy(a.stats.correctCount, a.stats.incorrectCount);
      const accuracyB = calculateAccuracy(b.stats.correctCount, b.stats.incorrectCount);
      return accuracyA - accuracyB; // Worst cards first
    });
}

/**
 * Gets difficulty level string for a card
 * @param card - The card to evaluate
 * @returns Difficulty level: 'easy', 'medium', 'hard', or 'unstudied'
 */
export function getDifficultyLevel(card: Card): 'easy' | 'medium' | 'hard' | 'unstudied' {
  const { correctCount, incorrectCount } = card.stats;
  const totalAttempts = correctCount + incorrectCount;

  if (totalAttempts === 0) {
    return 'unstudied';
  }

  const accuracy = calculateAccuracy(correctCount, incorrectCount);

  if (accuracy >= 80) {
    return 'easy';
  } else if (accuracy >= 60) {
    return 'medium';
  } else {
    return 'hard';
  }
}

