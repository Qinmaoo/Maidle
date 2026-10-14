import { Chart } from "../types/chart";
import { getTokyoDateKey } from "./dailyPuzzle";

const STORAGE_PREFIX = "maidle:game:";

interface StoredDailyGame {
  guessIds: string[];
}

function getStorage(storage?: Storage): Storage | null {
  if (storage) {
    return storage;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isStoredDailyGame(value: unknown): value is StoredDailyGame {
  return (
    typeof value === "object" &&
    value !== null &&
    "guessIds" in value &&
    Array.isArray(value.guessIds) &&
    value.guessIds.every((guessId) => typeof guessId === "string")
  );
}

export function getDailyGameStorageKey(dateKey: string = getTokyoDateKey()): string {
  return `${STORAGE_PREFIX}${dateKey}`;
}

export function loadDailyGuesses(
  charts: Chart[],
  dateKey: string = getTokyoDateKey(),
  storage?: Storage,
): Chart[] {
  const localStorage = getStorage(storage);
  if (!localStorage) {
    return [];
  }

  const storageKey = getDailyGameStorageKey(dateKey);
  try {
    const rawGame = localStorage.getItem(storageKey);
    if (!rawGame) {
      return [];
    }

    const storedGame: unknown = JSON.parse(rawGame);
    if (!isStoredDailyGame(storedGame)) {
      localStorage.removeItem(storageKey);
      return [];
    }

    const chartsById = new Map(charts.map((chart) => [chart.id, chart]));
    const restoredGuessIds = new Set<string>();
    return storedGame.guessIds.flatMap((guessId) => {
      if (restoredGuessIds.has(guessId)) {
        return [];
      }

      restoredGuessIds.add(guessId);
      const chart = chartsById.get(guessId);
      return chart ? [chart] : [];
    });
  } catch {
    return [];
  }
}

export function saveDailyGuesses(
  guesses: Chart[],
  dateKey: string = getTokyoDateKey(),
  storage?: Storage,
): void {
  const localStorage = getStorage(storage);
  if (!localStorage) {
    return;
  }

  try {
    localStorage.setItem(
      getDailyGameStorageKey(dateKey),
      JSON.stringify({ guessIds: guesses.map((guess) => guess.id) }),
    );
  } catch {
    // The game remains playable when storage is unavailable or full.
  }
}
