import { Chart } from "../../types/chart";
import { Difficulty } from "../../types/difficulty";
import { matchesChartSearch } from "./SearchBar";

const chart: Chart = {
  id: "song-a:master:dx",
  index: 1,
  song: "Starlight Disco",
  image: "song-a.png",
  level: 14,
  category: "POPS & ANIME",
  artist: "Maidle Ensemble",
  bpm: 180,
  type: "dx",
  difficulty: Difficulty.Master,
  version: "PRiSM",
};

describe("matchesChartSearch", () => {
  it("matches a song title regardless of case", () => {
    expect(matchesChartSearch("STARLIGHT", chart)).toBe(true);
  });

  it("matches an artist name regardless of case", () => {
    expect(matchesChartSearch("ensemble", chart)).toBe(true);
  });

  it("does not match unrelated text", () => {
    expect(matchesChartSearch("unrelated", chart)).toBe(false);
  });
});
