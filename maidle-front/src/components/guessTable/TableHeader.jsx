import { Flex, Divider, Typography } from "antd";

const { Title } = Typography

export const TABLE_HEADERS = [
  { title: "Song", type: "image", width: "10%" },
  { title: "Level", type: "number", width: "10%" },
  { title: "Category", type: "text", width: "10%" },
  { title: "Artist", type: "text", width: "30%" },
  { title: "BPM", type: "number", width: "10%" },
  { title: "Version", type: "version", width: "10%" },
];

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

export default TableHeader
