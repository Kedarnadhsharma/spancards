import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../../src/context/AppContext';
import HomePage from '../../../src/pages/HomePage';

function renderHomePage() {
  return render(
    <BrowserRouter>
      <AppProvider>
        <HomePage />
      </AppProvider>
    </BrowserRouter>
  );
}

describe('HomePage', () => {
  it('renders welcome message', () => {
    renderHomePage();
    expect(screen.getByText('Welcome to SpanCards')).toBeInTheDocument();
    expect(
      screen.getByText('Your Spanish vocabulary learning companion')
    ).toBeInTheDocument();
  });

  it('displays all three decks', () => {
    renderHomePage();
    
    expect(screen.getByText('Basics')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Travel')).toBeInTheDocument();
  });

  it('shows correct card count for each deck', () => {
    renderHomePage();
    
    // Each deck should show "8 cards"
    const cardCounts = screen.getAllByText('8 cards');
    expect(cardCounts).toHaveLength(3);
  });

  it('displays deck descriptions', () => {
    renderHomePage();
    
    expect(
      screen.getByText(/Essential words and greetings/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Common food and drink vocabulary/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Essential words for traveling/i)
    ).toBeInTheDocument();
  });

  it('has Study button for each deck', () => {
    renderHomePage();
    
    const studyButtons = screen.getAllByRole('link', { name: /study/i });
    expect(studyButtons).toHaveLength(3);
  });

  it('has Quiz button for each deck', () => {
    renderHomePage();
    
    const quizButtons = screen.getAllByRole('link', { name: /quiz/i });
    expect(quizButtons).toHaveLength(3);
  });

  it('Study buttons have correct href', () => {
    renderHomePage();
    
    const studyButtons = screen.getAllByRole('link', { name: /study/i });
    
    expect(studyButtons[0]).toHaveAttribute('href', '/study/deck-basics');
    expect(studyButtons[1]).toHaveAttribute('href', '/study/deck-food');
    expect(studyButtons[2]).toHaveAttribute('href', '/study/deck-travel');
  });

  it('Quiz buttons have correct href', () => {
    renderHomePage();
    
    const quizButtons = screen.getAllByRole('link', { name: /quiz/i });
    
    expect(quizButtons[0]).toHaveAttribute('href', '/quiz/deck-basics');
    expect(quizButtons[1]).toHaveAttribute('href', '/quiz/deck-food');
    expect(quizButtons[2]).toHaveAttribute('href', '/quiz/deck-travel');
  });

  it('renders deck cards with proper structure', () => {
    renderHomePage();
    
    const deckCards = screen.getAllByRole('heading', { level: 2 });
    expect(deckCards).toHaveLength(3);
    expect(deckCards[0]).toHaveTextContent('Basics');
    expect(deckCards[1]).toHaveTextContent('Food');
    expect(deckCards[2]).toHaveTextContent('Travel');
  });
});

