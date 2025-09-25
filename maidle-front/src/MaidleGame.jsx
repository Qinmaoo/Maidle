import { useState, useEffect } from "react";

import { Flex, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import GuessTable from "./components/guessTable/GuessTable";
import SearchBar from "./components/SearchBar";

const { Text } = Typography;

const MaidleGame = () => {
  const [guesses, setGuesses] = useState([]);
  const [charts, setCharts] = useState([]);
  const [goalGuess, setGoalGuess] = useState(null);

  async function getData() {
    const url = "https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      return result.songs;
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData().then((data) => {
      let charts = [];
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
          const difficulty = sheet.difficulty;
          const type = sheet.type;
          const version = sheet.version;
          if (difficulty === "master" || difficulty === "remaster") {
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
      setGoalGuess(newGoalGuess);
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
        loading={charts.length === 0}
        onSubmit={(guess) => {
          const newGuesses = [guess, ...guesses];
          setGuesses(newGuesses);
        }}
      />
      <GuessTable guesses={guesses} goalGuess={goalGuess} />
    </Flex>
  );
};

export default MaidleGame;
