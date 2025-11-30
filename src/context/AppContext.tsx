import { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from 'react';
import { AppState, Card, Deck, StudySessionRecord } from '../types';
import { initialAppState } from '../data/seedData';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

interface AppContextType {
  appState: AppState;
  getCard: (cardId: string) => Card | undefined;
  getDeck: (deckId: string) => Deck | undefined;
  getCardsByDeck: (deckId: string) => Card[];
  getAllDecks: () => Deck[];
  updateCardStats: (cardId: string, correct: boolean) => void;
  addSession: (session: StudySessionRecord) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Initialize state from localStorage or use seed data
  const [appState, setAppState] = useState<AppState>(() => {
    const stored = loadFromLocalStorage();
    return stored || initialAppState;
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(appState);
  }, [appState]);

  // Helper function to get a card by ID
  const getCard = useCallback(
    (cardId: string): Card | undefined => {
      return appState.cards[cardId];
    },
    [appState.cards]
  );

  // Helper function to get a deck by ID
  const getDeck = useCallback(
    (deckId: string): Deck | undefined => {
      return appState.decks[deckId];
    },
    [appState.decks]
  );

  // Helper function to get all cards in a deck
  const getCardsByDeck = useCallback(
    (deckId: string): Card[] => {
      const deck = appState.decks[deckId];
      if (!deck) return [];
      return deck.cardIds
        .map((cardId) => appState.cards[cardId])
        .filter((card): card is Card => card !== undefined);
    },
    [appState.decks, appState.cards]
  );

  // Helper function to get all decks
  const getAllDecks = useCallback((): Deck[] => {
    return Object.values(appState.decks);
  }, [appState.decks]);

  // Update card statistics
  const updateCardStats = useCallback((cardId: string, correct: boolean) => {
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
  }, []);

  // Add a study session record
  const addSession = useCallback((session: StudySessionRecord) => {
    setAppState((prevState) => ({
      ...prevState,
      sessions: [...prevState.sessions, session],
    }));
  }, []);

  // Reset data to initial state
  const resetData = useCallback(() => {
    setAppState(initialAppState);
  }, []);

  const contextValue: AppContextType = useMemo(
    () => ({
      appState,
      getCard,
      getDeck,
      getCardsByDeck,
      getAllDecks,
      updateCardStats,
      addSession,
      resetData,
    }),
    [appState, getCard, getDeck, getCardsByDeck, getAllDecks, updateCardStats, addSession, resetData]
  );

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

