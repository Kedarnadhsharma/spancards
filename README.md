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

## Development Status

### Phase 1 - Project Setup & Basic Navigation ✅ COMPLETED

- [x] Initialize Vite + React + TypeScript Project
- [x] Set Up Routing (react-router-dom)
- [x] Implement Global Layout (Header + Main Container)

### Phase 2 - Data Model & Seed Data ✅ COMPLETED

- [x] Define TypeScript Interfaces for Core Models
- [x] Create Seed Data for Cards and Decks (24 cards, 3 decks)
- [x] Implement Simple In-Memory State for App Data (React Context)

### Phase 3 - Basic Study (Flashcards) Mode ✅ COMPLETED

- [x] Implement Decks / Home Page UI
- [x] Implement Basic Flashcard Display (Front Only)
- [x] Implement Card Flipping (Spanish → English)
- [x] Add "I got it right" / "I got it wrong" Buttons

### Phase 4 - Tracking Performance & Wrong Cards ✅ COMPLETED

- [x] Implement Card Stats Update Logic
- [x] Track "Wrong" Cards Within a Session
- [x] Implement Session Summary Screen
- [x] Implement "Redo Only Cards I Got Wrong"

### Upcoming Phases

- Phase 5: Persistence with Local Storage
- Phase 6: Quiz / Test Modes
- Phase 7: Statistics Page (enhanced)
- Phase 8: Polish, UX and Edge Cases

## Features Implemented

### Current Features (Phase 1-4)
- ✅ Modern React + TypeScript + Vite setup
- ✅ Full routing with React Router DOM
- ✅ Global layout with navigation
- ✅ TypeScript type definitions for all data models
- ✅ 24 seed cards across 3 themed decks (Basics, Food, Travel)
- ✅ React Context state management
- ✅ Beautiful, responsive UI
- ✅ Deck browsing and selection
- ✅ **Full Flashcard Study Mode**
  - 3D flip animation
  - Spanish → English card flipping
  - Answer tracking (I got it right/wrong)
  - Progress bar and card counter
  - Session statistics
  - Example sentences
- ✅ **Session Management**
  - Track correct/incorrect answers
  - Record wrong cards
  - Session summary screen
  - Redo wrong cards functionality
  - Session history tracking
- ✅ Statistics dashboard (live data tracking)
- ✅ Quiz mode selection interface
- ✅ Empty state and error handling
- ✅ Responsive design (mobile, tablet, desktop)

## License

ISC

