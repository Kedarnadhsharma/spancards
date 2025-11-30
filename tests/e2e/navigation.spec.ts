import { test, expect } from '@playwright/test';

test.describe('Navigation E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between all main pages', async ({ page }) => {
    // Start on home page
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Welcome to SpanCards')).toBeVisible();
    
    // Click Stats in navigation
    await page.getByRole('link', { name: 'Stats' }).first().click();
    await expect(page).toHaveURL('/stats');
    await expect(page.getByText('Statistics')).toBeVisible();
    
    // Click Home in navigation
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Welcome to SpanCards')).toBeVisible();
  });

  test('should navigate from home to study page', async ({ page }) => {
    await page.getByRole('link', { name: 'Study' }).first().click();
    
    await expect(page).toHaveURL(/\/study\/deck-/);
    await expect(page.getByText(/Card 1 of 8/i)).toBeVisible();
  });

  test('should navigate from home to quiz selection', async ({ page }) => {
    await page.getByRole('link', { name: 'Quiz' }).first().click();
    
    await expect(page).toHaveURL(/\/quiz\/deck-/);
    await expect(page.getByText('Quiz Mode')).toBeVisible();
    await expect(page.getByText('Multiple Choice')).toBeVisible();
    await expect(page.getByText('Fill in the Blank')).toBeVisible();
  });

  test('should navigate to different quiz modes', async ({ page }) => {
    await page.getByRole('link', { name: 'Quiz' }).first().click();
    
    // Click Multiple Choice
    await page.getByRole('link', { name: /Start Multiple Choice Quiz/i }).click();
    await expect(page).toHaveURL(/\/quiz\/deck-.*\/mc/);
    await expect(page.getByText('Multiple Choice Quiz')).toBeVisible();
    
    // Go back
    await page.goBack();
    
    // Click Fill in the Blank
    await page.getByRole('link', { name: /Start Fill-in Quiz/i }).click();
    await expect(page).toHaveURL(/\/quiz\/deck-.*\/fill/);
    await expect(page.getByText('Fill in the Blank Quiz')).toBeVisible();
  });

  test('should navigate between all three decks', async ({ page }) => {
    // Study Basics deck
    const studyLinks = page.getByRole('link', { name: 'Study' });
    await studyLinks.nth(0).click();
    await expect(page.getByText('Basics')).toBeVisible();
    
    // Back to home
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Study Food deck
    await page.getByRole('link', { name: 'Study' }).nth(1).click();
    await expect(page.getByText('Food')).toBeVisible();
    
    // Back to home
    await page.getByRole('link', { name: 'Home' }).click();
    
    // Study Travel deck
    await page.getByRole('link', { name: 'Study' }).nth(2).click();
    await expect(page.getByText('Travel')).toBeVisible();
  });

  test('should maintain navigation header across all pages', async ({ page }) => {
    // Check header on home page
    await expect(page.getByText('SpanCards')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats' }).first()).toBeVisible();
    
    // Navigate to study page
    await page.getByRole('link', { name: 'Study' }).first().click();
    
    // Header should still be visible
    await expect(page.getByText('SpanCards')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stats' }).first()).toBeVisible();
    
    // Navigate to stats page
    await page.getByRole('link', { name: 'Stats' }).first().click();
    
    // Header should still be visible
    await expect(page.getByText('SpanCards')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Navigate directly to study page
    await page.goto('/study/deck-basics');
    await expect(page.getByText('Basics')).toBeVisible();
    
    // Navigate directly to quiz page
    await page.goto('/quiz/deck-food');
    await expect(page.getByText('Food')).toBeVisible();
    
    // Navigate directly to stats page
    await page.goto('/stats');
    await expect(page.getByText('Statistics')).toBeVisible();
  });

  test('should handle browser back/forward buttons', async ({ page }) => {
    // Navigate through several pages
    await page.getByRole('link', { name: 'Study' }).first().click();
    await page.getByRole('link', { name: 'Stats' }).first().click();
    
    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/\/study\//);
    
    // Go back again
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // Go forward
    await page.goForward();
    await expect(page).toHaveURL(/\/study\//);
  });
});

