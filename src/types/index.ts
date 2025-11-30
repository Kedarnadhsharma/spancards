export interface CardStats {
  correctCount: number;
  incorrectCount: number;
  lastStudiedAt: string | null; // ISO timestamp
}

export interface Card {
  id: string;
  spanish: string;
  english: string;
  exampleSentenceSpanish?: string;
  exampleSentenceEnglish?: string;
  tags?: string[];
  createdAt: string;
  stats: CardStats;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cardIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StudySessionRecord {
  id: string;
  deckId: string | "all" | "difficult";
  startedAt: string;
  endedAt: string;
  totalCards: number;
  correct: number;
  incorrect: number;
}

export interface AppState {
  cards: Record<string, Card>;
  decks: Record<string, Deck>;
  sessions: StudySessionRecord[];
}

