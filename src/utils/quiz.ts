import { Card } from '../types';
import { shuffleArray } from './array';

/**
 * Generates distractor options for a multiple choice question
 * @param correctCard - The card with the correct answer
 * @param allCards - All available cards to choose distractors from
 * @param count - Number of distractors to generate (default: 3)
 * @returns Array of distractor English translations
 */
export function generateDistractors(
  correctCard: Card,
  allCards: Card[],
  count: number = 3
): string[] {
  // Filter out the correct card and cards with duplicate English translations
  const availableCards = allCards.filter(
    (card) =>
      card.id !== correctCard.id && card.english !== correctCard.english
  );

  // Shuffle and take the required number of distractors
  const shuffled = shuffleArray(availableCards);
  const distractors = shuffled.slice(0, count).map((card) => card.english);

  return distractors;
}

/**
 * Generates options for a multiple choice question
 * @param correctCard - The card with the correct answer
 * @param allCards - All available cards
 * @param optionCount - Total number of options (default: 4)
 * @returns Shuffled array of options with the correct answer included
 */
export function generateMCOptions(
  correctCard: Card,
  allCards: Card[],
  optionCount: number = 4
): string[] {
  const distractorCount = optionCount - 1;
  const distractors = generateDistractors(correctCard, allCards, distractorCount);

  // Add the correct answer and shuffle
  const options = [correctCard.english, ...distractors];
  return shuffleArray(options);
}

/**
 * Normalizes user input for comparison
 * @param input - The user's input string
 * @returns Normalized string (trimmed, lowercase)
 */
export function normalizeInput(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Checks if the user's answer is correct
 * @param userAnswer - The user's answer
 * @param correctAnswer - The correct answer
 * @param caseSensitive - Whether to compare case-sensitively (default: false)
 * @returns true if answers match, false otherwise
 */
export function checkAnswer(
  userAnswer: string,
  correctAnswer: string,
  caseSensitive: boolean = false
): boolean {
  if (caseSensitive) {
    return userAnswer.trim() === correctAnswer.trim();
  }
  return normalizeInput(userAnswer) === normalizeInput(correctAnswer);
}

