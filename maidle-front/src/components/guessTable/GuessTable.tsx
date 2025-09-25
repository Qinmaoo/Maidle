import { Flex } from "antd";
import Guess from "./Guess";
import TableHeader, { TABLE_HEADERS } from "./TableHeader";

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

export default GuessTable
