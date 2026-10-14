import { Button, Flex, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap="large"
      style={{ minHeight: "100vh", padding: 24, textAlign: "center" }}
    >
      <Flex vertical align="center" gap={0}>
        <StarFilled style={{ color: "#ffc23e", fontSize: 56 }} />
        <Title level={1} style={{ fontSize: 48, lineHeight: 1, margin: "12px 0 8px" }}>
          maiDLE
        </Title>
        <Text>Day n</Text>
      </Flex>

      <Flex vertical gap="middle" style={{ width: "min(100%, 240px)" }}>
        <Button
          type="primary"
          size="large"
          shape="round"
          block
          onClick={() => navigate("/maidle")}
        >
          Start
        </Button>
        <Button 
          size="middle"
          shape="round"
          block
          onClick={() => navigate("/about")}
        >
          About
        </Button>
      </Flex>
    </Flex>
  );
};

export default StartScreen;
