import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Divider, Flex, Typography, Select } from "antd";
import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";

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
  "Buddies",
  "Buddies+",
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
  { title: "Version", type: "number", width: "10%" },
];

const chartOptions = [
  {
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
      <Button
        type="primary"
        icon={<ArrowRightOutlined />}
        color="default"
        variant="solid"
        style={{
          height: "100%",
          width: "15%",
          padding: 0,
          fontSize: 32,
          color: "white",
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
      />
    </Flex>
  );
};

const GuessItem = ({ item, width, aspect, type }) => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width,
        ...(aspect ? { aspectRatio: aspect } : { height: "100%" }),
        border: "1px solid #ccc",
        minWidth: 0,
        borderRadius: 8,
      }}
    >
      {type === "image" ? (
        <img
          src={item}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ) : type === "number" ? (
        <Text>{item}</Text>
      ) : (
        <Text
          style={{
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
          aspect={header.title === "Artist" ? undefined : "1"}
          type={header.type}
        />
      ))}
    </Flex>
  );
};

const TableHeader = ({ items }) => {
  return (
    <Flex justify="space-between" style={{ width: "90%" }}>
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
      song: "Test value",
      image:
        "https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg",
      level: "14.0",
      category: "G&V",
      artist: "Takenobu Mistuyoshi",
      bpm: 12,
      version: "Buddies",

      value: "overjoy-overdose",
      difficulty: "master",
      type: "DX",
    },
  ]);
  return (
    <Flex vertical align="center" gap="middle" style={{ padding: 24 }}>
      <Flex justify="center" align="center" gap="small">
        <StarFilled style={{ fontSize: 32, color: "#08c" }} />
        <Text strong style={{ fontSize: 32 }}>
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
