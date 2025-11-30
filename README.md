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

### Upcoming Phases

- Phase 3: Basic Study (Flashcards) Mode
- Phase 4: Tracking Performance & Wrong Cards
- Phase 5: Persistence with Local Storage
- Phase 6: Quiz / Test Modes
- Phase 7: Statistics Page
- Phase 8: Polish, UX and Edge Cases

## Features Implemented

### Current Features (Phase 1 & 2)
- ✅ Modern React + TypeScript + Vite setup
- ✅ Full routing with React Router DOM
- ✅ Global layout with navigation
- ✅ TypeScript type definitions for all data models
- ✅ 24 seed cards across 3 themed decks (Basics, Food, Travel)
- ✅ React Context state management
- ✅ Beautiful, responsive UI
- ✅ Deck browsing and selection
- ✅ Statistics dashboard (ready for tracking data)
- ✅ Quiz mode selection interface
- ✅ Empty state and error handling

## License

ISC

