import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import QuizPage from './pages/QuizPage';
import QuizMCPage from './pages/QuizMCPage';
import QuizFillPage from './pages/QuizFillPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/study/:deckId" element={<StudyPage />} />
            <Route path="/quiz/:deckId" element={<QuizPage />} />
            <Route path="/quiz/:deckId/mc" element={<QuizMCPage />} />
            <Route path="/quiz/:deckId/fill" element={<QuizFillPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

