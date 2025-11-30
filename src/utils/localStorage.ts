import { AppState } from '../types';

const STORAGE_KEY = 'spanCards:data:v1';
const STORAGE_VERSION = 1;

interface StoredData {
  version: number;
  data: AppState;
  lastUpdated: string;
}

/**
 * Checks if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Saves app state to localStorage
 * @param state - The app state to save
 * @returns true if successful, false otherwise
 */
export function saveToLocalStorage(state: AppState): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available. Data will not be persisted.');
    return false;
  }

  try {
    const dataToStore: StoredData = {
      version: STORAGE_VERSION,
      data: state,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
}

/**
 * Loads app state from localStorage
 * @returns The stored app state, or null if not found or invalid
 */
export function loadFromLocalStorage(): AppState | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed: StoredData = JSON.parse(stored);
    
    // Check version compatibility
    if (parsed.version !== STORAGE_VERSION) {
      console.warn(`Stored data version mismatch. Expected ${STORAGE_VERSION}, got ${parsed.version}`);
      // In future, implement migration logic here
      return null;
    }

    // Validate that the data has the expected structure
    if (!parsed.data || !parsed.data.cards || !parsed.data.decks) {
      console.warn('Stored data is invalid or corrupted');
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}

/**
 * Clears all app data from localStorage
 * @returns true if successful, false otherwise
 */
export function clearLocalStorage(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
}

/**
 * Gets the last updated timestamp from stored data
 * @returns ISO timestamp string or null
 */
export function getLastUpdatedTime(): string | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed: StoredData = JSON.parse(stored);
    return parsed.lastUpdated || null;
  } catch (error) {
    return null;
  }
}

