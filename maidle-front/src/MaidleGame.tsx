import { useState, useEffect } from "react";

import { Flex, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import GuessTable from "./components/guessTable/GuessTable";
import SearchBar from "./components/searchBar/SearchBar";
import { Chart, ChartApiData } from "./types/chart";
import { Difficulty } from "./types/difficulty";
import { getTokyoDateKey, selectDailyChart } from "./utils/dailyPuzzle";
import {
  loadDailyGuesses,
  saveDailyGuesses,
} from "./utils/dailyGameStorage";

const { Text } = Typography;

const MaidleGame = () => {
  const [guesses, setGuesses] = useState<Chart[]>([]);
  const [charts, setCharts] = useState<Chart[]>([]);
  const [goalGuess, setGoalGuess] = useState<Chart | null>(null);
  const [puzzleDate] = useState(() => getTokyoDateKey());
  const [isPuzzleExpired, setIsPuzzleExpired] = useState(false);

  async function getData(): Promise<ChartApiData[]> {
    const url = "https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      return result.songs;
    } catch (error: any) {
      console.error(error.message);
      return []
    }
  }

  useEffect(() => {
    getData().then((data) => {
      const charts: Chart[] = [];
      let index = 1;
      data.forEach((item) => {
        const song = item.title;
        const image =
          "https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/" +
          item.imageName;
        const category = item.category;
        const artist = item.artist;
        const bpm = item.bpm;
        const releaseVersion = item.version;
        item.sheets.forEach((sheet) => {
          const level = sheet.internalLevelValue;
          const difficulty: Difficulty = sheet.difficulty as Difficulty;
          const type = sheet.type;
          const version = sheet.version;
          if (difficulty === Difficulty.Master || difficulty === Difficulty.Remaster) {
            charts.push({
              id: `${item.songId}:${difficulty}:${type}`,
              index: index++,
              song: song,
              image: image,
              level: level,
              category: category,
              artist: artist,
              bpm: bpm,
              type: type,
              difficulty: difficulty,
              version: version ? version : releaseVersion,
            });
          }
        });
      });
      setCharts(charts || []);
      setGoalGuess(selectDailyChart(charts, puzzleDate));
      setGuesses(loadDailyGuesses(charts, puzzleDate));
    });
  }, [puzzleDate]);

  return (
    <Flex vertical align="center" gap="middle" style={{ padding: 24 }}>
      <Flex justify="center" align="center" gap="small">
        <StarFilled style={{ fontSize: 64, color: "#ffc23eff" }} />
        <Text strong style={{ fontSize: 64, marginTop: -16 }}>
          maiDLE
        </Text>
      </Flex>
      <SearchBar
        charts={charts}
        disabled={isPuzzleExpired}
        onSubmit={(guess: Chart) => {
          if (getTokyoDateKey() !== puzzleDate) {
            setIsPuzzleExpired(true);
            return;
          }

          const newGuesses: Chart[] = [guess, ...guesses];
          setGuesses(newGuesses);
          saveDailyGuesses(newGuesses, puzzleDate);
        }}
      />
      {isPuzzleExpired && (
        <Text type="secondary">
          A new daily puzzle is available. Refresh to play it.
        </Text>
      )}
      <GuessTable guesses={guesses} goalGuess={goalGuess} />
    </Flex>
  );
};

export default MaidleGame;
