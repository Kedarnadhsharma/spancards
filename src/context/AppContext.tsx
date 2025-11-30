import { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Card, Deck, StudySessionRecord } from '../types';
import { initialAppState } from '../data/seedData';

interface AppContextType {
  appState: AppState;
  getCard: (cardId: string) => Card | undefined;
  getDeck: (deckId: string) => Deck | undefined;
  getCardsByDeck: (deckId: string) => Card[];
  getAllDecks: () => Deck[];
  updateCardStats: (cardId: string, correct: boolean) => void;
  addSession: (session: StudySessionRecord) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [appState, setAppState] = useState<AppState>(initialAppState);

  // Helper function to get a card by ID
  const getCard = (cardId: string): Card | undefined => {
    return appState.cards[cardId];
  };

  // Helper function to get a deck by ID
  const getDeck = (deckId: string): Deck | undefined => {
    return appState.decks[deckId];
  };

  // Helper function to get all cards in a deck
  const getCardsByDeck = (deckId: string): Card[] => {
    const deck = appState.decks[deckId];
    if (!deck) return [];
    return deck.cardIds
      .map((cardId) => appState.cards[cardId])
      .filter((card): card is Card => card !== undefined);
  };

  // Helper function to get all decks
  const getAllDecks = (): Deck[] => {
    return Object.values(appState.decks);
  };

  // Update card statistics
  const updateCardStats = (cardId: string, correct: boolean) => {
    setAppState((prevState) => {
      const card = prevState.cards[cardId];
      if (!card) return prevState;

      const updatedCard: Card = {
        ...card,
        stats: {
          correctCount: card.stats.correctCount + (correct ? 1 : 0),
          incorrectCount: card.stats.incorrectCount + (correct ? 0 : 1),
          lastStudiedAt: new Date().toISOString(),
        },
      };

      return {
        ...prevState,
        cards: {
          ...prevState.cards,
          [cardId]: updatedCard,
        },
      };
    });
  };

  // Add a study session record
  const addSession = (session: StudySessionRecord) => {
    setAppState((prevState) => ({
      ...prevState,
      sessions: [...prevState.sessions, session],
    }));
  };

  const contextValue: AppContextType = {
    appState,
    getCard,
    getDeck,
    getCardsByDeck,
    getAllDecks,
    updateCardStats,
    addSession,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

