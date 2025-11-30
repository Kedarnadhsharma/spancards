Implementation TODOs for Spanish Flashcards App
Phase 1 – Project Setup & Basic Navigation (Easiest)
[x] 1. Initialize Vite + React + TypeScript Project

Tasks

Create a new Vite project with React + TypeScript.

Set up basic file structure (src/components, src/pages, src/routes, etc.).

Clean out boilerplate.

Acceptance Criteria

 npm run dev runs successfully with no TypeScript errors.

 Home page renders a simple “Hello” or app title component.

 Project structure is organized into logical folders (components, pages, etc.).

[x] 2. Set Up Routing (react-router or similar)

Tasks

Install and configure react-router-dom (or alternative).

Create routes:

/ → Home / Decks

/study/:deckId

/quiz/:deckId

/quiz/:deckId/mc

/quiz/:deckId/fill

/stats

Acceptance Criteria

 Navigating directly to each path shows a distinct placeholder page.

 No console errors when switching routes.

 Header navigation links (or buttons) allow moving between at least Home and Stats.

[x] 3. Implement Global Layout (Header + Main Container)

Tasks

Create a layout component with:

Header: app title + simple navigation links.

Main content area for routed pages.

Acceptance Criteria

 All pages share a consistent header.

 Main content view changes when route changes, while header stays visible.

 Layout looks reasonable on desktop and mobile (no overlapping elements).

Phase 2 – Data Model & Seed Data
[x] 4. Define TypeScript Interfaces for Core Models

Tasks

Implement interfaces for:

CardStats

Card

Deck

StudySessionRecord

AppState

Acceptance Criteria

 Interfaces match the spec (ids, spanish/english, stats, etc.).

 No TypeScript compilation errors after adding interfaces.

 Other parts of the app can import these types and use them.

[x] 5. Create Seed Data for Cards and Decks

Tasks

Create a static JSON or TS file with:

A few sample decks (e.g., “Basics”, “Food”, “Travel”).

Several cards per deck (Spanish → English).

Acceptance Criteria

 App can import seed data without runtime errors.

 Home/Decks page shows the seeded decks and card counts.

 At least 2–3 decks appear with more than 5 cards each.

[x] 6. Implement Simple In-Memory State for App Data

Tasks

Use React Context or a simple top-level state to store:

cards, decks, sessions.

Initialize from seed data.

Acceptance Criteria

 Components can access cards and decks via a context or shared hook.

 Re-rendering occurs when state changes (verified by simple test update).

 No type errors when accessing state.

Phase 3 – Basic Study (Flashcards) Mode
[x] 7. Implement Decks / Home Page UI

Tasks

Create a Decks list page showing:

Deck name, description, card count.

Buttons for “Study” and “Quiz”.

Acceptance Criteria

 Home page lists available decks with correct card counts.

 Clicking “Study” for a deck navigates to /study/:deckId.

 If a deck has no cards, show an empty-state message.

[x] 8. Implement Basic Flashcard Display (Front Only)

Tasks

On /study/:deckId, load the deck’s cards.

Display:

Current card’s Spanish word prominently.

Simple “Next” button to move forward (no flip yet).

Acceptance Criteria

 Study page shows at least one card’s Spanish text.

 Clicking “Next” cycles through cards in the deck.

 When there are no more cards, show a completion message (e.g., “Session complete”).

[x] 9. Implement Card Flipping (Spanish → English)

Tasks

Add card flip behavior:

Initial view: Spanish only.

After flipping: show English translation.

Flip can be triggered by:

Clicking a “Flip” button, and/or

Clicking the card itself.

Acceptance Criteria

 Before flip, only Spanish text is visible (no English).

 After clicking Flip, English becomes visible for the current card.

 Flipping state resets appropriately when moving to the next card.

[x] 10. Add "I got it right" / "I got it wrong" Buttons

Tasks

After the card is flipped, show two buttons:

“I got it right”

“I got it wrong”

Only show them after the English is visible.

Acceptance Criteria

 “Right” and “Wrong” buttons appear only after the card is flipped.

 Clicking either button moves to the next card.

 No visual glitches when rapidly clicking between cards.

Phase 4 – Tracking Performance & Wrong Cards
[x] 11. Implement Card Stats Update Logic

Tasks

Add CardStats to each card in state.

When user clicks:

“I got it right” → increment correctCount.

“I got it wrong” → increment incorrectCount.

Update lastStudiedAt with current timestamp.

Acceptance Criteria

 After marking answers, the underlying state object for that card shows updated counts.

 Multiple sessions accumulate correct/incorrect counts (not reset unintentionally).

 lastStudiedAt is updated each time the card is answered.

[x] 12. Track "Wrong" Cards Within a Session

Tasks

Maintain a session-local collection of card IDs marked “wrong”.

At session end, this list is available.

Acceptance Criteria

 During a study session, cards marked “wrong” are recorded in a session-specific list.

 At the end of the session, if at least one card was wrong, app knows which ones.

 If no cards were marked wrong, the “wrong cards” list is empty or undefined.

[x] 13. Implement Session Summary Screen

Tasks

After the last card is answered, show a summary:

Total cards studied.

Count of correct and incorrect.

Accuracy percentage.

Acceptance Criteria

 Finishing a session always navigates to or displays a summary view.

 Summary values (correct/incorrect/total/accuracy) match observed behavior during the session.

 Summary includes a button to return to deck list or start a new session.

[x] 14. Implement "Redo Only Cards I Got Wrong" (Session-Based)

Tasks

On summary screen:

If there were wrong cards, show “Redo only cards I got wrong”.

Clicking this:

Starts a new study session containing only those cards.

Behavior same as normal study (flip, mark right/wrong).

Acceptance Criteria

 “Redo only cards I got wrong” button appears only if there are wrong cards.

 Clicking it starts a new session using only those cards.

 New session updates stats just like a normal study session.

 If the user gets them all correct in the redo, summary reflects that.

Phase 5 – Persistence with Local Storage
[x] 15. Persist AppState to Local Storage

Tasks

On relevant state changes (stats, sessions, etc.), serialize AppState and save to localStorage using a key like spanCards:data:v1.

Include a version field in the stored object.

Acceptance Criteria

 After reloading the browser, previously updated stats and sessions are retained.

 Local storage entry can be inspected and matches expected structure.

 No runtime errors if localStorage is not available (graceful fallback).

[x] 16. Hydrate State from Local Storage on App Load

Tasks

On app startup:

Check localStorage for data under the expected key.

If found and valid, use it to hydrate the app state.

If not found or corrupt, fallback to seeded data and/or reset.

Acceptance Criteria

 On refresh, user’s progress (stats) is preserved.

 If localStorage data is manually corrupted, the app detects it and can reset to defaults without crashing.

 The app does not duplicate or conflict between seed data and stored data.

Phase 6 – Quiz / Test Modes
[x] 17. Implement Quiz Mode Selection UI

Tasks

On /quiz/:deckId, show choices:

“Multiple Choice”

“Fill in the Blank”

Clicking each navigates to respective routes:

/quiz/:deckId/mc

/quiz/:deckId/fill

Acceptance Criteria

 Quiz screen displays both mode options for the chosen deck.

 Clicking each option correctly routes to MC or Fill-in-the-blank quiz screens.

 Unknown deck ID results in an error or redirect message (not a crash).

[x] 18. Implement Multiple-Choice Quiz Logic

Tasks

For each question:

Show Spanish prompt.

Generate 3–5 English options:

1 correct (from card).

Remaining options as distractors from other cards in the deck.

Randomize order of options.

On answer:

Indicate correct/incorrect immediately.

Update card stats.

Move to next question.

Show quiz summary at end.

Acceptance Criteria

 Each question has exactly one correct answer option.

 Distractor options are drawn from other cards in the same deck.

 Selecting an answer updates stats and reveals feedback (correct/incorrect).

 Completion summary displays total, correct, incorrect, and accuracy.

[x] 19. Implement Fill-in-the-Blank Quiz Logic

Tasks

For each question:

Show Spanish prompt.

Provide text input for user to type English translation.

On submit:

Normalize input (e.g., trim, lower case).

Compare against expected translation.

Mark correct if exact match (MVP).

Show correct answer if user is wrong.

Update card stats.

Move to next question.

End with summary screen.

Acceptance Criteria

 User can type an answer and submit via button or Enter key.

 Correct answers (case-insensitive) are recognized as correct.

 Incorrect answers show a message with the correct translation.

 Stats and summary screen reflect user performance.

Phase 7 – Statistics Page
[x] 20. Implement Global Statistics Summary

Tasks

On /stats:

Show total cards studied (all time).

Show overall correct and incorrect counts.

Show overall accuracy percentage.

Acceptance Criteria

 Statistics page loads without errors.

 Global stats match what’s stored in state/localStorage.

 Accuracy is calculated as correct / (correct + incorrect) and formatted nicely (e.g. 73%).

[x] 21. Implement Per-Deck Statistics

Tasks

On the Stats page:

List each deck with:

Total answers for that deck.

Correct/incorrect counts.

Accuracy per deck.

Acceptance Criteria

 Each deck shows its own stats that differ when user studies different decks.

 Deck stats update after sessions or quizzes for that deck.

 Decks with no activity display a clear “No data yet” or 0% state.

[x] 22. Show "Difficult Cards" Overview

Tasks

Define “difficult” criteria (e.g. incorrectCount > 0 and accuracy < 60%).

On Stats page:

Display a list of difficult cards (Spanish and English).

Add a button “Review Difficult Cards” to start a study session with only these cards (optional).

Acceptance Criteria

 Cards meeting difficulty criteria are displayed in a dedicated section.

 Cards that improve over time can drop out of the difficult list when stats improve.

 If implementing “Review Difficult Cards,” clicking it launches a valid study session on those cards.

Phase 8 – Polish, UX and Edge Cases (Harder / Longer-Term)
[x] 23. Responsive Layout & Mobile UX Improvements

Tasks

Ensure all key screens (Study, Quiz, Stats) look good on mobile.

Optimize tap targets (buttons, cards).

Avoid horizontal scroll.

Acceptance Criteria

 On a mobile-width viewport, no essential content is cut off or overlapped.

 Buttons are comfortably tappable (e.g. ~40px height).

 Card text remains readable without needing to zoom.

[x] 24. Accessibility Improvements

Tasks

Ensure keyboard navigation:

Can tab to flip button and right/wrong buttons.

Add ARIA roles/labels where helpful.

Ensure colors are not the only indicator (use text/icons).

Acceptance Criteria

 All interactive elements reachable via keyboard alone.

 Screen reader can read card content and button labels meaningfully.

 Correct/incorrect feedback is also conveyed via text, not only color.

[x] 25. Data Reset / Settings

Tasks

Add a Settings or small "Reset Data" option.

Confirm with user before full reset.

Acceptance Criteria

 Clicking "Reset Data" after confirmation clears localStorage and reverts to seed data.

 App reloads cleanly after reset with no stale references.

 Reset does not break routing or core functionality.