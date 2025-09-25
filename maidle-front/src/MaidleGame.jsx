import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Divider, Flex, Typography, Select } from "antd";
import {
  ArrowRightOutlined,
  StarFilled,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const MAIMAI_VERSION_LIST = [
  "maimai",
  "GreeN",
  "ORANGE",
  "PiNK",
  "MURASAKi",
  "MiLK",
  "FiNALE",
  "DX",
  "DX+",
  "Splash",
  "Splash+",
  "Universe",
  "Universe+",
  "Festival",
  "Festival+",
  "BUDDiES",
  "BUDDiES+",
  "Prism",
  "Prism+",
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

const GOAL_GUESS = {
  song: "Overjoy Overdose",
  image:
    "https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg",
  level: "14.2",
  category: "Pops & Anime",
  artist: "Luna Fozer",
  bpm: 220,
  version: "Prism+",

  value: "overjoy-overdose",
  difficulty: "master",
  type: "DX",
};

const chartOptions = [
  {
    song: "Overjoy Overdose",
    image:
      "https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/35f7753bd0fd0f35e5209f4f7cd6e4aece12473f33001419fb894f1aee69c62b.png",
    level: "14.2",
    category: "Pops & Anime",
    artist: "Luna Fozer",
    bpm: 220,
    version: "Prism+",

    value: "overjoy-overdose",
    difficulty: "master",
    type: "DX",
  },
  {
    song: "Moon of Noon",
    image:
      "https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/51323f3bc8073d991fca4bb8c78c21eaff445cd57d7e2971d8112820fe93656e.png",
    level: "14.4",
    category: "maimai",
    artist: "Sampling masters MEGA",
    bpm: 240,
    version: "Finale",

    value: "Moon of Noon",
    difficulty: "master",
    type: "DX",
  },
];

const renderOption = (option) => (
  <Flex align="center" gap={8}>
    <img
      src={option.image}
      alt={option.label}
      style={{ width: 32, height: 32, borderRadius: 4, objectFit: "cover" }}
    />
    <div>
      <Flex gap="small">
        <Text strong>{option.song}</Text>
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
          {option.difficulty?.toUpperCase()}
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
          {option.type}
        </span>
      </Flex>
      <div style={{ fontSize: 12, color: "#888" }}>{option.artist}</div>
    </div>
  </Flex>
);

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState();
  const [editing, setEditing] = useState(false);

  const opt =
    chartOptions.find((o) => o.value === (value?.value || value)) || null;

  return (
    <Flex
      align="center"
      justify="center"
      gap="middle"
      style={{ width: "55%", height: 90 }}
    >
      {!editing && opt ? (
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
            src={opt.image}
            alt={opt.song}
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
                {opt.difficulty?.toUpperCase()}
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
                {opt.type}
              </span>
            </Flex>
            <Flex vertical>
              <Text type="secondary" style={{ marginBottom: -8 }}>
                {opt.artist}
              </Text>
              <Text strong style={{ fontSize: 20, margin: 0 }}>
                {opt.song}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Select
          showSearch
          value={value}
          placeholder="Search Chart"
          style={{ width: "75%", height: "100%" }}
          options={chartOptions}
          labelInValue
          onChange={(v) => {
            setValue(v);
            setEditing(false);
          }}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
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
          const selected =
            chartOptions.find((o) => o.value === (value?.value || value)) ||
            null;
          if (selected) {
            onSubmit(selected);
            setValue(null);
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

const GuessItem = ({ item, width, aspect, type, goalItem, guess }) => {
  console.log(item, goalItem);
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
            borderRadius: 8,
            margin: -4,
            boxSizing: "border-box",
            border:
              guess.difficulty === "master"
                ? "solid 8px purple"
                : "solid 8px lightpurple",
          }}
        >
          <img
            src={item}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Flex>
      ) : type === "number" || type === "version" ? (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
          <Text strong style={{ color: "white" }}>
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
          }}
        >
          {item}
        </Text>
      )}
    </Flex>
  );
};

const Guess = ({ guess }) => {
  const guessValues = [
    guess.song,
    guess.level,
    guess.category,
    guess.artist,
    guess.bpm,
    guess.version,
  ];
  const goalValues = [
    GOAL_GUESS.song,
    GOAL_GUESS.level,
    GOAL_GUESS.category,
    GOAL_GUESS.artist,
    GOAL_GUESS.bpm,
    GOAL_GUESS.version,
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

const GuessTable = ({ guesses }) => {
  return (
    <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
      <TableHeader items={TABLE_HEADERS} />
      {guesses.map((guess, index) => (
        <Guess key={index} guess={guess} />
      ))}
    </Flex>
  );
};

const MaidleGame = () => {
  const [guesses, setGuesses] = useState([
    {
      song: "サンバディ！",
      image:
        "https://dp4p6x0xfi5o9.cloudfront.net/maimai/img/cover/137a8bcc05be07d995c108b39b153ffa6ca3130c0245ac7a34236a01bad08694.png",
      level: "13.2",
      category: "maimai",
      artist: "光吉猛修",
      bpm: 136,
      version: "BUDDiES",
      value: "サンバディ！",
      difficulty: "master",
      type: "DX",
    },
  ]);
  return (
    <Flex vertical align="center" gap="middle" style={{ padding: 24 }}>
      <Flex justify="center" align="center" gap="small">
        <StarFilled style={{ fontSize: 64, color: "#ffc23eff" }} />
        <Text strong style={{ fontSize: 64, marginTop: -16 }}>
          maiDLE
        </Text>
      </Flex>
      <SearchBar
        onSubmit={(guess) => {
          setGuesses([guess, ...guesses]);
          console.log([guess, ...guesses]);
        }}
      />
      <Divider />
      <GuessTable guesses={guesses} />
    </Flex>
  );
};

export default MaidleGame;
