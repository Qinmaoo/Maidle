import { Chart } from "../types/chart";
import { Difficulty } from "../types/difficulty";
import { getDailySeed, getTokyoDateKey, selectDailyChart } from "./dailyPuzzle";

const charts: Chart[] = [
  {
    index: 1,
    song: "Beta",
    image: "beta.png",
    level: 13.7,
    category: "Game & Variete",
    artist: "Artist B",
    bpm: 180,
    type: "dx",
    difficulty: Difficulty.Master,
    version: "PRiSM",
  },
  {
    index: 2,
    song: "Alpha",
    image: "alpha.png",
    level: 14,
    category: "POPS & ANIME",
    artist: "Artist A",
    bpm: 200,
    type: "std",
    difficulty: Difficulty.Master,
    version: "BUDDiES",
  },
  {
    index: 3,
    song: "Gamma",
    image: "gamma.png",
    level: 13.4,
    category: "niconico & VOCALOID",
    artist: "Artist C",
    bpm: 160,
    type: "dx",
    difficulty: Difficulty.Remaster,
    version: "PRiSM PLUS",
  },
];

describe("getTokyoDateKey", () => {
  it("uses the Japan calendar date around midnight", () => {
    expect(getTokyoDateKey(new Date("2026-10-15T14:59:59Z"))).toBe("2026-10-15");
    expect(getTokyoDateKey(new Date("2026-10-15T15:00:00Z"))).toBe("2026-10-16");
  });
});

describe("selectDailyChart", () => {
  it("selects the same chart for the same date", () => {
    const firstSelection = selectDailyChart(charts, "2026-10-15");
    const secondSelection = selectDailyChart(charts, "2026-10-15");

    expect(firstSelection).toEqual(secondSelection);
  });

  it("derives distinct seeds from distinct calendar dates", () => {
    expect(getDailySeed("2026-10-15")).not.toBe(getDailySeed("2026-10-16"));
  });

  it("does not depend on the source chart order", () => {
    const selectedFromOriginalOrder = selectDailyChart(charts, "2026-10-15");
    const selectedFromReversedOrder = selectDailyChart([...charts].reverse(), "2026-10-15");

    expect(selectedFromOriginalOrder).toEqual(selectedFromReversedOrder);
  });

  it("returns null when no charts are available", () => {
    expect(selectDailyChart([], "2026-10-15")).toBeNull();
  });
});
