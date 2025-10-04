import { useState, useEffect } from "react";

import { Flex, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import GuessTable from "./components/guessTable/GuessTable";
import SearchBar from "./components/searchBar/SearchBar";
import { Chart, ChartApiData } from "./types/chart";
import { Difficulty } from "./types/difficulty";

const { Text } = Typography;

const MaidleGame = () => {
  const [guesses, setGuesses] = useState<Chart[]>([]);
  const [charts, setCharts] = useState<Chart[]>([]);
  const [goalGuess, setGoalGuess] = useState<Chart | null>(null);

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
      const newGoalGuess = charts[Math.floor(Math.random() * charts.length)];
      setGoalGuess(newGoalGuess ?? null);
    });
  }, []);

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
        onSubmit={(guess: Chart) => {
          const newGuesses: Chart[] = [guess, ...guesses];
          setGuesses(newGuesses);
        }}
      />
      <GuessTable guesses={guesses} goalGuess={goalGuess} />
    </Flex>
  );
};

export default MaidleGame;
