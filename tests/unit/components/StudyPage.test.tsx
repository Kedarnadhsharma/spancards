import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '../../../src/context/AppContext';
import StudyPage from '../../../src/pages/StudyPage';

function renderStudyPage(deckId = 'deck-basics') {
  return render(
    <MemoryRouter initialEntries={[`/study/${deckId}`]}>
      <AppProvider>
        <Routes>
          <Route path="/study/:deckId" element={<StudyPage />} />
        </Routes>
      </AppProvider>
    </MemoryRouter>
  );
}

describe('StudyPage', () => {
  describe('Initial Render', () => {
    it('renders deck name', () => {
      renderStudyPage('deck-basics');
      expect(screen.getByText('Basics')).toBeInTheDocument();
    });

    it('displays progress counter', () => {
      renderStudyPage('deck-basics');
      expect(screen.getByText(/Card 1 of 8/i)).toBeInTheDocument();
    });

    it('shows progress bar', () => {
      renderStudyPage('deck-basics');
      const progressBar = document.querySelector('.progress-bar');
      expect(progressBar).toBeInTheDocument();
    });

    it('displays Spanish text initially', () => {
      renderStudyPage('deck-basics');
      expect(screen.getByText('Spanish')).toBeInTheDocument();
    });

    it('does not show English text initially', () => {
      renderStudyPage('deck-basics');
      expect(screen.queryByText('English')).not.toBeInTheDocument();
    });

    it('shows Flip Card button', () => {
      renderStudyPage('deck-basics');
      expect(screen.getByText('Flip Card')).toBeInTheDocument();
    });

    it('does not show answer buttons initially', () => {
      renderStudyPage('deck-basics');
      expect(screen.queryByText(/I got it right/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/I got it wrong/i)).not.toBeInTheDocument();
    });
  });

  describe('Card Flipping', () => {
    it('shows English text after clicking Flip button', () => {
      renderStudyPage('deck-basics');
      
      const flipButton = screen.getByText('Flip Card');
      fireEvent.click(flipButton);
      
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('shows answer buttons after flipping', () => {
      renderStudyPage('deck-basics');
      
      const flipButton = screen.getByText('Flip Card');
      fireEvent.click(flipButton);
      
      expect(screen.getByText(/I got it right/i)).toBeInTheDocument();
      expect(screen.getByText(/I got it wrong/i)).toBeInTheDocument();
    });

    it('hides Flip button after flipping', () => {
      renderStudyPage('deck-basics');
      
      const flipButton = screen.getByText('Flip Card');
      fireEvent.click(flipButton);
      
      expect(screen.queryByText('Flip Card')).not.toBeInTheDocument();
    });

    it('can flip card by clicking on it', () => {
      renderStudyPage('deck-basics');
      
      const flashcard = document.querySelector('.flashcard');
      fireEvent.click(flashcard!);
      
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });

  describe('Answer Tracking', () => {
    it('moves to next card after answering correct', () => {
      renderStudyPage('deck-basics');
      
      // Flip the card
      const flipButton = screen.getByText('Flip Card');
      fireEvent.click(flipButton);
      
      // Answer correctly
      const correctButton = screen.getByText(/I got it right/i);
      fireEvent.click(correctButton);
      
      // Should show Card 2
      expect(screen.getByText(/Card 2 of 8/i)).toBeInTheDocument();
    });

    it('moves to next card after answering wrong', () => {
      renderStudyPage('deck-basics');
      
      // Flip the card
      const flipButton = screen.getByText('Flip Card');
      fireEvent.click(flipButton);
      
      // Answer wrong
      const wrongButton = screen.getByText(/I got it wrong/i);
      fireEvent.click(wrongButton);
      
      // Should show Card 2
      expect(screen.getByText(/Card 2 of 8/i)).toBeInTheDocument();
    });

    it('resets flip state for next card', () => {
      renderStudyPage('deck-basics');
      
      // Flip and answer first card
      fireEvent.click(screen.getByText('Flip Card'));
      fireEvent.click(screen.getByText(/I got it right/i));
      
      // Next card should show Spanish (not flipped)
      expect(screen.getByText('Spanish')).toBeInTheDocument();
      expect(screen.queryByText('English')).not.toBeInTheDocument();
    });

    it('updates session statistics', () => {
      renderStudyPage('deck-basics');
      
      // Initially 0 correct, 0 incorrect
      expect(screen.getByText('Correct: 0')).toBeInTheDocument();
      expect(screen.getByText('Incorrect: 0')).toBeInTheDocument();
      
      // Answer one correctly
      fireEvent.click(screen.getByText('Flip Card'));
      fireEvent.click(screen.getByText(/I got it right/i));
      
      // Should update
      expect(screen.getByText('Correct: 1')).toBeInTheDocument();
      expect(screen.getByText('Incorrect: 0')).toBeInTheDocument();
    });
  });

  describe('Session Summary', () => {
    it('shows summary after last card', async () => {
      renderStudyPage('deck-basics');
      
      // Go through all 8 cards
      for (let i = 0; i < 8; i++) {
        fireEvent.click(screen.getByText('Flip Card'));
        fireEvent.click(screen.getByText(/I got it right/i));
      }
      
      // Should show summary
      await waitFor(() => {
        expect(screen.getByText(/Session Complete/i)).toBeInTheDocument();
      });
    });

    it('displays correct statistics in summary', async () => {
      renderStudyPage('deck-basics');
      
      // Answer 6 correct, 2 wrong
      for (let i = 0; i < 6; i++) {
        fireEvent.click(screen.getByText('Flip Card'));
        fireEvent.click(screen.getByText(/I got it right/i));
      }
      for (let i = 0; i < 2; i++) {
        fireEvent.click(screen.getByText('Flip Card'));
        fireEvent.click(screen.getByText(/I got it wrong/i));
      }
      
      await waitFor(() => {
        expect(screen.getByText(/Session Complete/i)).toBeInTheDocument();
      });
      
      // Check summary stats
      const statValues = screen.getAllByRole('generic', { hidden: true });
      const summaryText = screen.getByText(/Session Complete/i).parentElement?.textContent || '';
      
      expect(summaryText).toContain('8'); // Total cards
      expect(summaryText).toContain('6'); // Correct
      expect(summaryText).toContain('2'); // Incorrect
    });

    it('shows Redo Wrong Cards button when there are wrong answers', async () => {
      renderStudyPage('deck-basics');
      
      // Answer some wrong
      fireEvent.click(screen.getByText('Flip Card'));
      fireEvent.click(screen.getByText(/I got it wrong/i));
      
      // Finish session
      for (let i = 0; i < 7; i++) {
        fireEvent.click(screen.getByText('Flip Card'));
        fireEvent.click(screen.getByText(/I got it right/i));
      }
      
      await waitFor(() => {
        expect(
          screen.getByText(/Redo Only Cards I Got Wrong/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles invalid deck ID gracefully', () => {
      renderStudyPage('invalid-deck');
      expect(screen.getByText('Deck Not Found')).toBeInTheDocument();
    });
  });
});

