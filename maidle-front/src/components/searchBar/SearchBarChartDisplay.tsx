import { Flex, Typography } from "antd";
import { Chart } from "../../types/chart";
import DifficultyChip from "../common/DifficultyChip";

const { Text } = Typography;

export default function SearchBarChartDisplay({
  selectedChart,
  setEditing
}: {
  selectedChart: Chart
  setEditing: (isEditing: boolean) => void
}) {
  return (
    <Flex
      gap="middle"
      className="w-3/4 h-full border border-1 border-gray-100
        rounded-md p-2 hover:bg-gray-50 cursor-pointer duration-100"
      align="center"
      onClick={() => setEditing(true)}
    >
      <img
        src={selectedChart.image}
        alt={selectedChart.song}
        className="h-full rounded-md"
      />
      <Flex
        vertical
        justify="space-between"
        className="h-full gap-y-0.5 pt-1"
      >
        <Flex className="gap-x-1">
          <DifficultyChip difficulty={selectedChart.difficulty} />
          <span
            className="flex bg-yellow-300 rounded-sm
              font-bold text-[6pt] px-1 py-0.5 items-center"
          >
            {selectedChart.type?.toUpperCase()}
          </span>
          <Text type="secondary" className="text-[8pt] max-w-[280px] overflow-hidden text-ellipsis text-nowrap">
            ・ {selectedChart.artist}
          </Text>
        </Flex>
        <Flex vertical>
          <Text strong className="text-md">
            {selectedChart.song}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
