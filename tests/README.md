# SpanCards Testing Documentation

## Test Structure

```
tests/
├── unit/
│   ├── components/     # Component unit tests
│   │   ├── HomePage.test.tsx
│   │   ├── StudyPage.test.tsx
│   │   ├── StatsPage.test.tsx
│   │   └── Layout.test.tsx
│   └── context/        # Context/state management tests
│       └── AppContext.test.tsx
├── integration/        # Integration tests
│   └── studyFlow.test.tsx
├── e2e/               # End-to-end tests (Playwright)
│   ├── completeSession.spec.ts
│   └── navigation.spec.ts
└── setup.ts           # Test setup and configuration
```

## Running Tests

### Unit & Integration Tests (Vitest)

```bash
# Run all tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

## Test Coverage

### Unit Tests

**AppContext Tests:**
- ✅ Initializes with seed data
- ✅ getCard() returns correct card
- ✅ getDeck() returns correct deck
- ✅ getCardsByDeck() returns all deck cards
- ✅ getAllDecks() returns all decks
- ✅ updateCardStats() updates correct/incorrect counts
- ✅ addSession() adds to sessions array
- ✅ Multiple updates accumulate correctly

**HomePage Tests:**
- ✅ Renders welcome message
- ✅ Displays all three decks
- ✅ Shows correct card count for each deck
- ✅ Displays deck descriptions
- ✅ Has Study and Quiz buttons
- ✅ Buttons have correct navigation links

**StudyPage Tests:**
- ✅ Renders deck name and progress
- ✅ Displays Spanish text initially
- ✅ Shows English text after flipping
- ✅ Answer buttons appear only after flip
- ✅ Moves to next card after answering
- ✅ Resets flip state for next card
- ✅ Updates session statistics
- ✅ Shows summary after last card
- ✅ Displays "Redo wrong cards" when applicable
- ✅ Handles invalid deck ID gracefully

**StatsPage Tests:**
- ✅ Renders page title and sections
- ✅ Displays global statistics
- ✅ Shows zero statistics initially
- ✅ Displays per-deck statistics
- ✅ Shows all three decks
- ✅ Has study links for each deck

**Layout Tests:**
- ✅ Renders app title
- ✅ Displays navigation links
- ✅ Links have correct href attributes
- ✅ Renders children in main content

### Integration Tests

**Study Flow:**
- ✅ Complete study session workflow
- ✅ Tracks wrong answers and allows redo
- ✅ Updates global statistics after session

### E2E Tests

**Complete Session:**
- ✅ Displays home page with decks
- ✅ Completes full study session
- ✅ Shows session summary
- ✅ Allows redoing wrong cards
- ✅ Navigates to stats page
- ✅ Handles card flipping by clicking on card
- ✅ Shows progress bar updating

**Navigation:**
- ✅ Navigates between all main pages
- ✅ Navigates from home to study/quiz
- ✅ Navigates to different quiz modes
- ✅ Navigates between all three decks
- ✅ Maintains navigation header
- ✅ Handles direct URL navigation
- ✅ Handles browser back/forward buttons

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../../src/context/AppContext';
import YourComponent from '../../../src/components/YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <YourComponent />
        </AppProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should perform action', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Welcome')).toBeVisible();
  await page.getByRole('button', { name: 'Click Me' }).click();
  await expect(page.getByText('Result')).toBeVisible();
});
```

## Continuous Integration

Tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Unit Tests
  run: npm run test:run

- name: Run E2E Tests
  run: npm run test:e2e
```

## Test Philosophy

1. **Unit Tests** - Test components and functions in isolation
2. **Integration Tests** - Test how components work together
3. **E2E Tests** - Test complete user workflows from the browser perspective

## Coverage Goals

- **Unit Tests:** 80%+ code coverage
- **Integration Tests:** Cover all major user flows
- **E2E Tests:** Cover critical paths and user journeys

## Debugging Tests

### Vitest
- Use `test.only()` to run a single test
- Use `test.skip()` to skip a test
- Add `console.log()` for debugging
- Use Vitest UI for visual debugging: `npm run test:ui`

### Playwright
- Use `--headed` to see the browser
- Use `--ui` for the Playwright UI inspector
- Add `await page.pause()` to pause execution
- Screenshots are captured on failure

## Common Issues

### Vitest Tests Failing
- Ensure test setup is correct (`tests/setup.ts`)
- Check that components are properly wrapped with providers
- Verify async operations with `waitFor()`

### Playwright Tests Failing
- Ensure dev server is running on port 5173
- Check selectors are correct and elements are visible
- Verify timing with appropriate `waitFor` or `expect` with timeouts

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)

