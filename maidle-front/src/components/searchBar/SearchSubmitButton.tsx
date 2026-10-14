import { Button, Flex } from "antd";
import { Chart } from "../../types/chart";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function SearchSubmitButton({
  selectedChart,
  setSelectedChart,
  onSubmit,
  disabled = false,
}: {
  selectedChart: Chart | null
  setSelectedChart: (chart: Chart | null) => void
  onSubmit: (guess: Chart) => void
  disabled?: boolean
}) {
  return (
    <Button
      style={{
        height: "100%",
        aspectRatio: "1",
        borderRadius: 8,
        background: "#222",
        cursor: "pointer",
        transition: "background 0.2s ease",
      }}
      disabled={disabled}
      onClick={() => {
        if (selectedChart && !disabled) {
          onSubmit(selectedChart);
          setSelectedChart(null);
        }
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#222")}
    >
      <ArrowRightOutlined style={{ fontSize: 24, color: "white" }} />
    </Button>
  )
}
