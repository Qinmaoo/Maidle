import { Chart } from "../types/chart";
import { Difficulty } from "../types/difficulty";
import {
  getDailyGameStorageKey,
  loadDailyGuesses,
  saveDailyGuesses,
} from "./dailyGameStorage";

const charts: Chart[] = [
  {
    id: "song-a:master:dx",
    index: 1,
    song: "Song A",
    image: "song-a.png",
    level: 14,
    category: "POPS & ANIME",
    artist: "Artist A",
    bpm: 180,
    type: "dx",
    difficulty: Difficulty.Master,
    version: "PRiSM",
  },
  {
    id: "song-b:remaster:std",
    index: 2,
    song: "Song B",
    image: "song-b.png",
    level: 13.7,
    category: "Game & Variete",
    artist: "Artist B",
    bpm: 200,
    type: "std",
    difficulty: Difficulty.Remaster,
    version: "PRiSM PLUS",
  },
];

beforeEach(() => {
  window.localStorage.clear();
});

describe("daily game storage", () => {
  it("saves chart IDs and restores their current chart data", () => {
    saveDailyGuesses([charts[1], charts[0]], "2026-10-15");

    expect(window.localStorage.getItem(getDailyGameStorageKey("2026-10-15"))).toBe(
      JSON.stringify({ guessIds: [charts[1].id, charts[0].id] }),
    );
    expect(loadDailyGuesses(charts, "2026-10-15")).toEqual([charts[1], charts[0]]);
  });

  it("keeps guesses isolated to their puzzle date", () => {
    saveDailyGuesses([charts[0]], "2026-10-15");

    expect(loadDailyGuesses(charts, "2026-10-16")).toEqual([]);
  });

  it("ignores malformed stored data", () => {
    const storageKey = getDailyGameStorageKey("2026-10-15");
    window.localStorage.setItem(storageKey, "not-json");

    expect(loadDailyGuesses(charts, "2026-10-15")).toEqual([]);
  });

  it("ignores chart IDs that are no longer in the catalog", () => {
    window.localStorage.setItem(
      getDailyGameStorageKey("2026-10-15"),
      JSON.stringify({ guessIds: [charts[0].id, "removed-chart"] }),
    );

    expect(loadDailyGuesses(charts, "2026-10-15")).toEqual([charts[0]]);
  });
});
