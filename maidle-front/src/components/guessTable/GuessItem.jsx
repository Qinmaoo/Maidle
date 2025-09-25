import { Flex, Typography } from "antd";
import {
  MinusOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

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
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width,
        ...(aspect ? { aspectRatio: aspect } : undefined),
        background: item === goalItem ? "#0ebb0eff" : "#e6342eff",
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
          }}
        >
          {item}
        </Text>
      )}
    </Flex>
  );
};

export default GuessItem
