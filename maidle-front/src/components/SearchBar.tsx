import { Flex, Select, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

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

export default SearchBar
