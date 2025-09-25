import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Divider, Flex, Typography, Select } from "antd";
import {
  ArrowRightOutlined,
  StarFilled,
  MinusOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const MAIMAI_VERSION_LIST = [
  "maimai",
  "maimai PLUS",
  "GreeN",
  "GreeN PLUS",
  "ORANGE",
  "ORANGE PLUS",
  "PiNK",
  "PiNK PLUS",
  "MURASAKi",
  "MURASAKi PLUS",
  "MiLK",
  "MiLK PLUS",
  "FiNALE",
  "maimaiでらっくす",
  "maimaiでらっくす PLUS",
  "Splash",
  "Splash PLUS",
  "UNiVERSE",
  "UNiVERSE PLUS",
  "FESTiVAL",
  "FESTiVAL PLUS",
  "BUDDiES",
  "BUDDiES PLUS",
  "PRiSM",
  "PRiSM PLUS",
  "CiRCLE",
];

const TABLE_HEADERS = [
  { title: "Song", type: "image", width: "10%" },
  { title: "Level", type: "number", width: "10%" },
  { title: "Category", type: "text", width: "10%" },
  { title: "Artist", type: "text", width: "30%" },
  { title: "BPM", type: "number", width: "10%" },
  { title: "Version", type: "version", width: "10%" },
];

const getVersionOrder = (version) => {
  const idx = MAIMAI_VERSION_LIST.findIndex(
    (v) => v.toLowerCase() === (version || "").toLowerCase()
  );
  return idx === -1 ? Infinity : idx;
};

const getNumberComparisonIcon = (item, goalItem, type) => {
  if (type === "number") {
    const numItem = parseFloat(item);
    const numGoal = parseFloat(goalItem);
    if (isNaN(numItem) || isNaN(numGoal))
      return <MinusOutlined style={{ color: "#fff" }} />;
    if (numItem === numGoal) return <MinusOutlined style={{ color: "#fff" }} />;
    if (numItem > numGoal)
      return <DownOutlined style={{ color: "#ffffffff" }} />;
    return <UpOutlined style={{ color: "#ffffffff" }} />;
  }
  if (type === "version") {
    const idxItem = getVersionOrder(item);
    const idxGoal = getVersionOrder(goalItem);
    if (idxItem === Infinity || idxGoal === Infinity)
      return <MinusOutlined style={{ color: "#fff" }} />;
    if (idxItem === idxGoal) return <MinusOutlined style={{ color: "#fff" }} />;

    if (idxItem > idxGoal)
      return <DownOutlined style={{ color: "#ffffffff" }} />;
    return <UpOutlined style={{ color: "#ffffffff" }} />;
  }
  return null;
};

const renderOption = (option) => (
  <Flex align="center" gap={8}>
    <img
      src={option.data.image}
      alt={option.data.label}
      style={{ width: 32, height: 32, borderRadius: 4, objectFit: "cover" }}
    />
    <div>
      <Flex gap="small">
        <Text strong>{option.data.song}</Text>
        <span
          style={{
            background: "#a0a",
            color: "#fff",
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: 12,
            padding: "2px 6px",
            marginRight: 4,
          }}
        >
          {option.data.difficulty?.toUpperCase()}
        </span>
        <span
          style={{
            background: "#ffe066",
            color: "#333",
            borderRadius: 4,
            fontWeight: "bold",
            fontSize: 12,
            padding: "2px 6px",
          }}
        >
          {option.data.type?.toUpperCase()}
        </span>
      </Flex>
      <div style={{ fontSize: 12, color: "#888" }}>{option.data.artist}</div>
    </div>
  </Flex>
);

const SearchBar = ({ onSubmit, charts }) => {
  const [editing, setEditing] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);

  const options = charts.map((chart) => ({
    value: chart.index,
    label: chart.song,
    data: chart,
  }));

  return (
    <Flex
      align="center"
      justify="center"
      gap="middle"
      style={{ width: "55%", height: 90 }}
    >
      {!editing && selectedChart ? (
        <Flex
          gap="middle"
          style={{
            width: "75%",
            height: "100%",
            border: "solid 2px #f4f4f4",
            borderRadius: 8,
            boxSizing: "border-box",
            padding: 8,
          }}
          align="center"
          onClick={() => setEditing(true)}
        >
          <img
            src={selectedChart.image}
            alt={selectedChart.song}
            style={{
              height: "100%",
              borderRadius: 8,
            }}
          />

          <Flex vertical justify="space-between" style={{ height: "100%" }}>
            <Flex>
              <span
                style={{
                  background: "#a0a",
                  color: "#fff",
                  borderRadius: 4,
                  fontWeight: "bold",
                  fontSize: 12,
                  padding: "2px 8px",
                  marginRight: 4,
                }}
              >
                {selectedChart.difficulty?.toUpperCase()}
              </span>
              <span
                style={{
                  background: "#ffe066",
                  color: "#333",
                  borderRadius: 4,
                  fontWeight: "bold",
                  fontSize: 12,
                  padding: "2px 8px",
                }}
              >
                {selectedChart.type?.toUpperCase()}
              </span>
            </Flex>
            <Flex vertical>
              <Text type="secondary" style={{ marginBottom: -8 }}>
                {selectedChart.artist}
              </Text>
              <Text strong style={{ fontSize: 20, margin: 0 }}>
                {selectedChart.song}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Select
          showSearch
          value={selectedChart?.index}
          placeholder="Search Chart"
          style={{ width: "75%", height: "100%" }}
          options={options}
          onChange={(v) => {
            setEditing(false);
            setSelectedChart(charts.find((chart) => chart.index === v));
          }}
          filterOption={(input, option) =>
            option.data.song.toLowerCase().includes(input.toLowerCase())
          }
          optionRender={(option) => renderOption(option.data)}
          dropdownStyle={{ minWidth: 350 }}
          autoFocus
          onBlur={() => setEditing(false)}
        />
      )}
      <Flex
        align="center"
        justify="center"
        style={{
          height: "100%",
          aspectRatio: "1",
          borderRadius: 8,
          background: "#222",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onClick={() => {
          if (selectedChart) {
            onSubmit(selectedChart);
            setSelectedChart(null);
          }
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
      >
        <ArrowRightOutlined style={{ fontSize: 32, color: "white" }} />
      </Flex>
    </Flex>
  );
};

const GuessItem = ({ item, width, aspect, type, goalItem, guess }) => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width,
        ...(aspect ? { aspectRatio: aspect } : undefined),
        background: item == goalItem ? "#0ebb0eff" : "#e6342eff",
        boxSizing: "border-box",
        padding: 4,
        minWidth: 0,
        borderRadius: 8,
      }}
    >
      {type === "image" ? (
        <Flex
          justify="center"
          align="center"
          style={{
            position: "relative",
            borderRadius: 8,
            margin: -4,
            boxSizing: "border-box",
            border:
              guess.difficulty === "master"
                ? "solid 6px #af0dafff"
                : "solid 6px #e98ee9ff",
            overflow: "hidden",
            boxShadow:
              guess.difficulty === "master"
                ? "inset 0 0 0 4px #af0dafff"
                : "inset 0 0 0 4px #e98ee9ff",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 4,
              background: "#c2b116ff",
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold",
              padding: "2px 6px",
              borderRadius: 4,
              zIndex: 1,
            }}
          >
            {guess.type?.toUpperCase()}
          </div>

          <img
            src={item}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 4,
            }}
          />
        </Flex>
      ) : type === "number" || type === "version" ? (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
          <Text strong style={{ color: "white", textAlign: "center" }}>
            {item}
          </Text>
          {getNumberComparisonIcon(item, goalItem, type)}
        </Flex>
      ) : (
        <Text
          strong
          style={{
            color: "white",
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            textAlign: "center",
          }}
        >
          {item}
        </Text>
      )}
    </Flex>
  );
};

const Guess = ({ guess, goalGuess }) => {
  if (!goalGuess) return null;
  const guessValues = [
    guess.song,
    guess.level,
    guess.category,
    guess.artist,
    guess.bpm,
    guess.version,
  ];
  const goalValues = [
    goalGuess.song,
    goalGuess.level,
    goalGuess.category,
    goalGuess.artist,
    goalGuess.bpm,
    goalGuess.version,
  ];
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        width: "90%",
        minHeight: 60,
      }}
    >
      {TABLE_HEADERS.map((header, idx) => (
        <GuessItem
          key={header.title}
          item={header.type === "image" ? guess.image : guessValues[idx]}
          width={header.width}
          aspect={header.title === "Artist" ? "3" : "1"}
          goalItem={goalValues[idx]}
          guess={guess}
          type={header.type}
        />
      ))}
    </Flex>
  );
};

const TableHeader = ({ items }) => {
  return (
    <Flex justify="space-between" style={{ width: "90%", marginBottom: 8 }}>
      {items.map((item, index) => (
        <Flex
          vertical
          gap="2px"
          align="center"
          key={index}
          style={{ width: item.width }}
        >
          <Title level={5}>{item.title}</Title>
          <Divider style={{ margin: 0 }} />
        </Flex>
      ))}
    </Flex>
  );
};

const GuessTable = ({ guesses, goalGuess }) => {
  return (
    <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
      <TableHeader items={TABLE_HEADERS} />
      {guesses.map((guess, index) => (
        <Guess key={index} guess={guess} goalGuess={goalGuess} />
      ))}
    </Flex>
  );
};

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
