# SpanCards - Spanish Flashcards Web App

A web application to help users learn Spanish vocabulary efficiently through flashcards, quizzes, and statistics tracking.

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router DOM 7
- **Styling**: CSS (modular approach)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components for routing
├── types/          # TypeScript type definitions
├── context/        # React Context providers (future)
├── data/           # Seed data and static content
└── routes/         # Route configurations (future)
```

## Available Routes

- `/` - Home / Decks page
- `/study/:deckId` - Study mode (flashcards)
- `/quiz/:deckId` - Quiz mode selection
- `/quiz/:deckId/mc` - Multiple choice quiz
- `/quiz/:deckId/fill` - Fill in the blank quiz
- `/stats` - Statistics page
- `/settings` - Settings and data management

## Features

### Core Functionality
- 📚 **Study Mode**: Flashcard-based learning with 3D flip animations
- 📝 **Quiz Modes**: Multiple-choice and fill-in-the-blank tests
- 📊 **Statistics**: Track your progress with detailed analytics
- 🔄 **Smart Review**: Redo cards you got wrong in a session
- 💾 **Data Persistence**: All progress saved to browser localStorage
- ⚙️ **Settings**: Manage your data with reset functionality

### User Experience
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ♿ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- 🎨 **Modern UI**: Beautiful design with smooth animations
- 🎯 **Touch-Optimized**: Minimum 44px tap targets for mobile

### Technical Excellence
- ⚡ **Fast**: Vite-powered with optimized React rendering
- 🔒 **Type-Safe**: Full TypeScript implementation
- ✅ **Tested**: 55 passing unit, component, and integration tests
- 🏗️ **Clean Architecture**: Modular with reusable hooks and utilities

## Testing

Run all tests:
```bash
npm run test        # Watch mode
npm run test:run    # Run once
npm run test:ui     # UI mode
npm run test:coverage # Coverage report
```

Run E2E tests:
```bash
npm run test:e2e         # Headless mode
npm run test:e2e:ui      # UI mode
npm run test:e2e:headed  # Headed browser mode
```

## Development Status

✅ **ALL PHASES COMPLETED - PRODUCTION READY!**

### Phase 1 - Project Setup & Basic Navigation ✅

- [x] Initialize Vite + React + TypeScript Project
- [x] Set Up Routing (react-router-dom)
- [x] Implement Global Layout (Header + Main Container)

### Phase 2 - Data Model & Seed Data ✅

- [x] Define TypeScript Interfaces for Core Models
- [x] Create Seed Data for Cards and Decks (24 cards, 3 decks)
- [x] Implement In-Memory State with React Context

### Phase 3 - Basic Study (Flashcards) Mode ✅

- [x] Implement Decks / Home Page UI
- [x] Implement Flashcard Display with 3D Flip Animation
- [x] Implement Card Flipping (Spanish → English)
- [x] Add "I got it right" / "I got it wrong" Buttons

### Phase 4 - Tracking Performance & Wrong Cards ✅

- [x] Implement Card Stats Update Logic
- [x] Track Wrong Cards Within Session
- [x] Implement Session Summary Screen
- [x] Implement "Redo Only Cards I Got Wrong" Feature

### Phase 5 - Persistence with Local Storage ✅

- [x] Persist AppState to Local Storage
- [x] Hydrate State from Local Storage on App Load
- [x] Version checking and graceful fallbacks

### Phase 6 - Quiz / Test Modes ✅

- [x] Implement Quiz Mode Selection UI
- [x] Implement Multiple-Choice Quiz Logic
- [x] Implement Fill-in-the-Blank Quiz Logic

### Phase 7 - Statistics Page ✅

- [x] Implement Global Statistics Summary
- [x] Implement Per-Deck Statistics
- [x] Show "Difficult Cards" Overview

### Phase 8 - Polish, UX and Edge Cases ✅

- [x] Responsive Layout & Mobile UX Improvements
- [x] Accessibility Improvements (WCAG 2.1 AA)
- [x] Data Reset / Settings Page

## Project Documentation

- 📋 [`docs/TODO.md`](docs/TODO.md) - Complete task list (all phases marked complete)
- 📖 [`docs/specifications.md`](docs/specifications.md) - Full software requirements
- 📝 [`PHASE1_COMPLETION.md`](PHASE1_COMPLETION.md) - Phase 1 completion report
- 📝 [`PHASE2_COMPLETION.md`](PHASE2_COMPLETION.md) - Phase 2 completion report
- 📝 [`PHASE3_COMPLETION.md`](PHASE3_COMPLETION.md) - Phases 3 & 4 completion report
- 📝 [`PHASE8_COMPLETION.md`](PHASE8_COMPLETION.md) - Phase 8 completion report
- 🧪 [`TESTING_SUMMARY.md`](TESTING_SUMMARY.md) - Testing strategy and results

## Complete Feature List

### Study & Learning
- ✅ Flashcard study mode with 3D flip animations
- ✅ Multiple-choice quiz mode with smart distractors
- ✅ Fill-in-the-blank quiz mode with input validation
- ✅ Session progress tracking and summaries
- ✅ Redo wrong cards feature
- ✅ Card shuffling for variety

### Data & Statistics
- ✅ Per-card statistics (correct/incorrect counts, last studied)
- ✅ Per-deck statistics (total cards, accuracy)
- ✅ Global statistics (cards studied, overall accuracy)
- ✅ Difficult cards identification
- ✅ Session history tracking
- ✅ localStorage persistence (auto-save)

### User Experience
- ✅ Responsive design (320px to desktop)
- ✅ Mobile-optimized touch targets (44px minimum)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Full keyboard navigation support
- ✅ Screen reader friendly (ARIA labels)
- ✅ Settings page with data management
- ✅ Confirmation dialogs for destructive actions

### Technical
- ✅ React 19 with TypeScript
- ✅ Vite 7 for fast development
- ✅ React Router DOM 7 for routing
- ✅ Context API for state management
- ✅ Custom hooks for reusable logic
- ✅ Utility functions for common operations
- ✅ 55 passing tests (unit + integration)
- ✅ Clean, maintainable code architecture

## License

ISC

