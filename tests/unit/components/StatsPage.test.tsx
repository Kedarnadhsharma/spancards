import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../../src/context/AppContext';
import StatsPage from '../../../src/pages/StatsPage';

function renderStatsPage() {
  return render(
    <BrowserRouter>
      <AppProvider>
        <StatsPage />
      </AppProvider>
    </BrowserRouter>
  );
}

describe('StatsPage', () => {
  it('renders page title', () => {
    renderStatsPage();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Track your learning progress')).toBeInTheDocument();
  });

  it('displays global statistics cards', () => {
    renderStatsPage();
    
    expect(screen.getByText('Cards Studied')).toBeInTheDocument();
    expect(screen.getByText('Total Attempts')).toBeInTheDocument();
    expect(screen.getByText('Correct')).toBeInTheDocument();
    expect(screen.getByText('Incorrect')).toBeInTheDocument();
    expect(screen.getByText('Overall Accuracy')).toBeInTheDocument();
  });

  it('shows zero statistics initially', () => {
    renderStatsPage();
    
    // Find all stat values that show "0"
    const zeroStats = screen.getAllByText('0');
    expect(zeroStats.length).toBeGreaterThan(0);
  });

  it('displays per-deck statistics section', () => {
    renderStatsPage();
    expect(screen.getByText('Per-Deck Statistics')).toBeInTheDocument();
  });

  it('shows all three decks in per-deck stats', () => {
    renderStatsPage();
    
    const deckNames = screen.getAllByRole('heading', { level: 3 });
    const deckTexts = deckNames.map((h) => h.textContent);
    
    expect(deckTexts).toContain('Basics');
    expect(deckTexts).toContain('Food');
    expect(deckTexts).toContain('Travel');
  });

  it('shows "No data" for decks with no attempts', () => {
    renderStatsPage();
    
    const noDataText = screen.getAllByText('No data');
    expect(noDataText.length).toBeGreaterThan(0);
  });

  it('has study links for each deck', () => {
    renderStatsPage();
    
    const studyLinks = screen.getAllByText(/Study this deck/i);
    expect(studyLinks).toHaveLength(3);
  });

  it('shows placeholder when no study data exists', () => {
    renderStatsPage();
    
    expect(
      screen.getByText(/No study data yet. Start studying to see your statistics!/i)
    ).toBeInTheDocument();
  });

  it('has link to go to decks from placeholder', () => {
    renderStatsPage();
    
    const goToDecksLink = screen.getByRole('link', { name: /Go to Decks/i });
    expect(goToDecksLink).toHaveAttribute('href', '/');
  });
});

