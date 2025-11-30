import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { clearLocalStorage, getLastUpdatedTime } from '../utils/localStorage';
import './SettingsPage.css';

function SettingsPage() {
  const { resetData, appState } = useAppContext();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const lastUpdated = getLastUpdatedTime();
  const totalCards = Object.keys(appState.cards).length;
  const totalDecks = Object.keys(appState.decks).length;
  const totalSessions = appState.sessions.length;

  const handleResetClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmReset = () => {
    // Reset the app data
    resetData();
    // Clear localStorage
    clearLocalStorage();
    setShowConfirmDialog(false);
    setResetSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setResetSuccess(false), 3000);
  };

  const handleCancelReset = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <p className="subtitle">Manage your app preferences and data</p>

      <div className="settings-section">
        <h2>📊 Data Overview</h2>
        <div className="data-overview">
          <div className="data-item">
            <span className="data-label">Total Cards:</span>
            <span className="data-value">{totalCards}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Total Decks:</span>
            <span className="data-value">{totalDecks}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Study Sessions:</span>
            <span className="data-value">{totalSessions}</span>
          </div>
          {lastUpdated && (
            <div className="data-item">
              <span className="data-label">Last Updated:</span>
              <span className="data-value">
                {new Date(lastUpdated).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h2>⚙️ App Information</h2>
        <div className="app-info">
          <p><strong>Version:</strong> 0.1.0</p>
          <p><strong>Storage:</strong> Browser Local Storage</p>
          <p><strong>Data Persistence:</strong> Enabled</p>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h2>⚠️ Danger Zone</h2>
        <div className="danger-content">
          <div className="danger-description">
            <h3>Reset All Data</h3>
            <p>
              This will permanently delete all your progress, statistics, and study
              sessions. The app will be restored to its initial state with seed data.
            </p>
          </div>
          <button onClick={handleResetClick} className="btn btn-danger">
            Reset All Data
          </button>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="modal-overlay" onClick={handleCancelReset}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Confirm Data Reset</h2>
            <p>
              Are you sure you want to reset all data? This action cannot be undone.
            </p>
            <p className="warning-text">
              You will lose:
            </p>
            <ul className="warning-list">
              <li>All study progress and statistics</li>
              <li>All {totalSessions} study session{totalSessions !== 1 ? 's' : ''}</li>
              <li>Card performance data for {totalCards} cards</li>
            </ul>
            <div className="modal-actions">
              <button onClick={handleCancelReset} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleConfirmReset} className="btn btn-danger">
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {resetSuccess && (
        <div className="success-toast">
          ✓ All data has been reset successfully!
        </div>
      )}

      <div className="settings-actions">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link to="/stats" className="btn btn-secondary">
          View Statistics
        </Link>
      </div>
    </div>
  );
}

export default SettingsPage;

