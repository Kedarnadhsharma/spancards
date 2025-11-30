import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';

describe('Study Flow Integration', () => {
  it('complete study session workflow', async () => {
    render(<App />);

    // 1. Start on home page
    expect(screen.getByText('Welcome to SpanCards')).toBeInTheDocument();
    
    // Verify decks are loaded
    await waitFor(() => {
      expect(screen.getByText('Basics')).toBeInTheDocument();
    });

    // 2. Find and click Study button
    const studyLinks = screen.getAllByRole('link');
    const studyButton = studyLinks.find(link => 
      link.textContent === 'Study' && link.getAttribute('href')?.includes('deck-basics')
    );
    
    expect(studyButton).toBeDefined();
    if (!studyButton) return;
    
    fireEvent.click(studyButton);

    // 3. Should be on study page
    await waitFor(() => {
      expect(screen.queryByText(/Card 1 of 8/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // 4. Study a few cards
    for (let i = 0; i < 2; i++) {
      await waitFor(() => {
        expect(screen.getByText('Flip Card')).toBeInTheDocument();
      });
      
      // Flip card
      fireEvent.click(screen.getByText('Flip Card'));

      await waitFor(() => {
        expect(screen.getByText(/I got it right/i)).toBeInTheDocument();
      });
      
      // Answer correctly
      fireEvent.click(screen.getByText(/I got it right/i));
    }

    // 5. Verify progress updated
    await waitFor(() => {
      expect(screen.getByText(/Card 3 of 8/i)).toBeInTheDocument();
    });
  });

  // Additional integration tests can be added here
  // Note: Complex navigation tests are better suited for E2E testing with Playwright
});

