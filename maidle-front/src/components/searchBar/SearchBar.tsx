import { Flex, Select, Typography } from "antd";
import { useState } from "react";
import { Chart } from "../../types/chart";
import DifficultyChip from "../common/DifficultyChip";
import SearchBarChartDisplay from "./SearchBarChartDisplay";
import SearchSubmitButton from "./SearchSubmitButton";

const { Text } = Typography;

interface Option {
  label: string
  value: number
  data: Chart
}

const renderOption = (option: Option) => (
  <Flex align="center" gap={8}>
    <img
      src={option.data.image}
      alt={option.data.song}
      style={{ width: 32, height: 32, borderRadius: 4, objectFit: "cover" }}
    />
    <div>
      <Flex className="flex-col gap-y-0" gap="small">
        <Flex className="gap-x-1">
          <Text strong>{option.data.song}</Text>
          <div className="my-0.5 ml-1">
            <DifficultyChip difficulty={option.data.difficulty} />
          </div>
          <span
            className="flex bg-yellow-300 rounded-sm
            font-bold text-[6pt] px-1 my-0.5 items-center"
          >
            {option.data.type?.toUpperCase()}
          </span>
        </Flex>
        <Text type="secondary" className="text-[8pt] max-w-[320px] overflow-hidden text-ellipsis text-nowrap">
          {option.data.artist}
        </Text>
      </Flex>
    </div>
  </Flex>
);

const SearchBar = ({
  onSubmit,
  charts
}: {
  onSubmit: (guess: Chart) => void
  charts: Chart[]
}) => {
  const [editing, setEditing] = useState(true);
  const [selectedChart, setSelectedChart] = useState<Chart | null>(null);

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
      className="w-4/5 min-w-[400px] max-w-[600px] h-[64px]"
    >
      {!editing && selectedChart ? (
        <SearchBarChartDisplay
          selectedChart={selectedChart}
          setEditing={setEditing}
        />
      ) : (
        <Select
          showSearch
          value={selectedChart?.index}
          placeholder="Search Chart"
          className="h-full w-3/4"
          options={options}
          onChange={(v) => {
            setEditing(false);
            setSelectedChart(charts.find((chart) => chart.index === v) ?? null);
          }}
          filterOption={(input, option) =>
            option?.data.song.toLowerCase().includes(input.toLowerCase()) ?? false
          }
          optionRender={(option) => renderOption(option.data)}
          dropdownStyle={{ minWidth: 350 }}
          autoFocus
          onBlur={() => setEditing(false)}
        />
      )}
      <SearchSubmitButton
        selectedChart={selectedChart}
        setSelectedChart={setSelectedChart}
        onSubmit={onSubmit}
      />
    </Flex>
  );
};

export default SearchBar
