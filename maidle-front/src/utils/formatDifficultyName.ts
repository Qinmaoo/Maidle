import { Difficulty } from "../types/difficulty";

export default function formatDifficultyName(difficulty: Difficulty) {
  if (difficulty === Difficulty.Remaster) {
    return "RE:MASTER"
  }
  return difficulty.toUpperCase()
}
