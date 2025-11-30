import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../../src/context/AppContext';

// Test component to access context
function TestComponent() {
  const {
    appState,
    getCard,
    getDeck,
    getCardsByDeck,
    getAllDecks,
    updateCardStats,
    addSession,
  } = useAppContext();

  return (
    <div>
      <div data-testid="deck-count">{Object.keys(appState.decks).length}</div>
      <div data-testid="card-count">{Object.keys(appState.cards).length}</div>
      <div data-testid="session-count">{appState.sessions.length}</div>
      <button
        onClick={() => updateCardStats('card-001', true)}
        data-testid="update-correct"
      >
        Update Correct
      </button>
      <button
        onClick={() => updateCardStats('card-001', false)}
        data-testid="update-incorrect"
      >
        Update Incorrect
      </button>
      <button
        onClick={() =>
          addSession({
            id: 'test-session',
            deckId: 'deck-basics',
            startedAt: new Date().toISOString(),
            endedAt: new Date().toISOString(),
            totalCards: 8,
            correct: 6,
            incorrect: 2,
          })
        }
        data-testid="add-session"
      >
        Add Session
      </button>
      <div data-testid="card-correct">
        {getCard('card-001')?.stats.correctCount}
      </div>
      <div data-testid="card-incorrect">
        {getCard('card-001')?.stats.incorrectCount}
      </div>
      <div data-testid="deck-name">{getDeck('deck-basics')?.name}</div>
      <div data-testid="deck-cards">
        {getCardsByDeck('deck-basics').length}
      </div>
      <div data-testid="all-decks">{getAllDecks().length}</div>
    </div>
  );
}

describe('AppContext', () => {
  it('initializes with seed data', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Should have 3 decks
    expect(screen.getByTestId('deck-count')).toHaveTextContent('3');
    
    // Should have 24 cards
    expect(screen.getByTestId('card-count')).toHaveTextContent('24');
    
    // Should have no sessions initially
    expect(screen.getByTestId('session-count')).toHaveTextContent('0');
  });

  it('getCard returns correct card', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Card should have initial stats
    expect(screen.getByTestId('card-correct')).toHaveTextContent('0');
    expect(screen.getByTestId('card-incorrect')).toHaveTextContent('0');
  });

  it('getDeck returns correct deck', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('deck-name')).toHaveTextContent('Basics');
  });

  it('getCardsByDeck returns all deck cards', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Basics deck should have 8 cards
    expect(screen.getByTestId('deck-cards')).toHaveTextContent('8');
  });

  it('getAllDecks returns all decks', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('all-decks')).toHaveTextContent('3');
  });

  it('updateCardStats updates correct count', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const updateButton = screen.getByTestId('update-correct');

    // Initially 0
    expect(screen.getByTestId('card-correct')).toHaveTextContent('0');

    // Click to update
    act(() => {
      updateButton.click();
    });

    // Should now be 1
    expect(screen.getByTestId('card-correct')).toHaveTextContent('1');
  });

  it('updateCardStats updates incorrect count', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const updateButton = screen.getByTestId('update-incorrect');

    // Initially 0
    expect(screen.getByTestId('card-incorrect')).toHaveTextContent('0');

    // Click to update
    act(() => {
      updateButton.click();
    });

    // Should now be 1
    expect(screen.getByTestId('card-incorrect')).toHaveTextContent('1');
  });

  it('addSession adds to sessions array', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const addButton = screen.getByTestId('add-session');

    // Initially 0 sessions
    expect(screen.getByTestId('session-count')).toHaveTextContent('0');

    // Add a session
    act(() => {
      addButton.click();
    });

    // Should now have 1 session
    expect(screen.getByTestId('session-count')).toHaveTextContent('1');
  });

  it('multiple updates accumulate correctly', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const correctButton = screen.getByTestId('update-correct');
    const incorrectButton = screen.getByTestId('update-incorrect');

    // Update correct 3 times
    act(() => {
      correctButton.click();
      correctButton.click();
      correctButton.click();
    });

    expect(screen.getByTestId('card-correct')).toHaveTextContent('3');

    // Update incorrect 2 times
    act(() => {
      incorrectButton.click();
      incorrectButton.click();
    });

    expect(screen.getByTestId('card-incorrect')).toHaveTextContent('2');
  });
});

