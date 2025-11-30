import { test, expect } from '@playwright/test';

test.describe('Complete Study Session E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display home page with decks', async ({ page }) => {
    // Check page loaded
    await expect(page.locator('h1')).toContainText('Welcome to SpanCards');
    
    // Check all decks are visible
    await expect(page.getByText('Basics')).toBeVisible();
    await expect(page.getByText('Food')).toBeVisible();
    await expect(page.getByText('Travel')).toBeVisible();
    
    // Check card counts
    await expect(page.getByText('8 cards').first()).toBeVisible();
  });

  test('should complete full study session', async ({ page }) => {
    // Click Study on first deck
    await page.getByRole('link', { name: 'Study' }).first().click();
    
    // Should be on study page
    await expect(page.getByText('Basics')).toBeVisible();
    await expect(page.getByText('Card 1 of 8')).toBeVisible();
    
    // Study through 3 cards
    for (let i = 0; i < 3; i++) {
      // Check Spanish is visible
      await expect(page.getByText('Spanish')).toBeVisible();
      
      // Flip the card
      await page.getByText('Flip Card').click();
      
      // Check English is visible
      await expect(page.getByText('English')).toBeVisible();
      
      // Answer correctly
      await page.getByText('I got it right').click();
    }
    
    // Should be on card 4
    await expect(page.getByText('Card 4 of 8')).toBeVisible();
    
    // Check session stats
    await expect(page.getByText('Correct: 3')).toBeVisible();
    await expect(page.getByText('Incorrect: 0')).toBeVisible();
  });

  test('should show session summary after completing all cards', async ({ page }) => {
    // Navigate to study page
    await page.getByRole('link', { name: 'Study' }).first().click();
    await expect(page.getByText('Card 1 of 8')).toBeVisible();
    
    // Complete all 8 cards (6 correct, 2 wrong)
    for (let i = 0; i < 6; i++) {
      await page.getByText('Flip Card').click();
      await page.getByText('I got it right').click();
    }
    
    for (let i = 0; i < 2; i++) {
      await page.getByText('Flip Card').click();
      await page.getByText('I got it wrong').click();
    }
    
    // Should show session summary
    await expect(page.getByText('Session Complete')).toBeVisible();
    
    // Check summary stats (using more flexible selectors)
    const summarySection = page.locator('.session-summary');
    await expect(summarySection).toContainText('6');  // Correct
    await expect(summarySection).toContainText('2');  // Incorrect
    await expect(summarySection).toContainText('75%'); // Accuracy
    
    // Should show redo button
    await expect(page.getByText(/Redo Only Cards I Got Wrong/i)).toBeVisible();
  });

  test('should allow redoing wrong cards', async ({ page }) => {
    // Navigate and complete session with wrong answers
    await page.getByRole('link', { name: 'Study' }).first().click();
    await expect(page.getByText('Card 1 of 8')).toBeVisible();
    
    // Answer 2 wrong, 6 correct
    for (let i = 0; i < 2; i++) {
      await page.getByText('Flip Card').click();
      await page.getByText('I got it wrong').click();
    }
    
    for (let i = 0; i < 6; i++) {
      await page.getByText('Flip Card').click();
      await page.getByText('I got it right').click();
    }
    
    // Click redo button
    await page.getByText(/Redo Only Cards I Got Wrong/i).click();
    
    // Should start new session with 2 cards
    await expect(page.getByText('Card 1 of 2')).toBeVisible();
    
    // Complete redo session
    await page.getByText('Flip Card').click();
    await page.getByText('I got it right').click();
    
    await page.getByText('Flip Card').click();
    await page.getByText('I got it right').click();
    
    // Should show new summary
    await expect(page.getByText('Session Complete')).toBeVisible();
  });

  test('should navigate to stats page and show data', async ({ page }) => {
    // Complete a study session first
    await page.getByRole('link', { name: 'Study' }).first().click();
    
    for (let i = 0; i < 8; i++) {
      await page.getByText('Flip Card').click();
      await page.getByText('I got it right').click();
    }
    
    // Return to home
    await page.getByRole('link', { name: 'Back to Decks' }).click();
    await expect(page.getByText('Welcome to SpanCards')).toBeVisible();
    
    // Navigate to stats
    await page.getByRole('link', { name: 'Stats' }).click();
    
    // Check stats page
    await expect(page.getByText('Statistics')).toBeVisible();
    await expect(page.getByText('Track your learning progress')).toBeVisible();
    
    // Should show updated stats
    await expect(page.getByText('Per-Deck Statistics')).toBeVisible();
    await expect(page.getByText('Basics')).toBeVisible();
  });

  test('should handle card flipping by clicking on card', async ({ page }) => {
    await page.getByRole('link', { name: 'Study' }).first().click();
    await expect(page.getByText('Card 1 of 8')).toBeVisible();
    
    // Click on the card itself (not the button)
    await page.locator('.flashcard').click();
    
    // Should flip to show English
    await expect(page.getByText('English')).toBeVisible();
  });

  test('should show progress bar updating', async ({ page }) => {
    await page.getByRole('link', { name: 'Study' }).first().click();
    
    // Get initial progress bar width
    const progressFill = page.locator('.progress-fill');
    
    // Complete a few cards and check progress updates
    for (let i = 0; i < 4; i++) {
      await page.getByText('Flip Card').click();
      await page.getByText('I got it right').click();
    }
    
    // Progress bar should be visible and have grown
    await expect(progressFill).toBeVisible();
    
    // Should be at card 5 (4 completed + 1)
    await expect(page.getByText('Card 5 of 8')).toBeVisible();
  });
});

