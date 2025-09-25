import { Flex } from "antd";
import GuessItem from "./GuessItem";
import { TABLE_HEADERS } from "./TableHeader";

const Guess = ({ guess, goalGuess }) => {
  if (!goalGuess) return null;
  const guessValues = [
    guess.song,
    guess.level,
    guess.category,
    guess.artist,
    guess.bpm,
    guess.version,
  ];
  const goalValues = [
    goalGuess.song,
    goalGuess.level,
    goalGuess.category,
    goalGuess.artist,
    goalGuess.bpm,
    goalGuess.version,
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

export default Guess
