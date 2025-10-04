import { Difficulty } from "../../types/difficulty"
import formatDifficultyName from "../../utils/formatDifficultyName"

export default function DifficultyChip({
  difficulty
}: {
  difficulty?: Difficulty
}) {
  if (!difficulty) {
     return null
  }

  const difficultyStyle = (difficulty: Difficulty) => {
    switch(difficulty) {
      case Difficulty.Remaster:
        return "text-purple-600 bg-purple-50"
      case Difficulty.Master:
        return "text-white bg-fuchsia-600"
      default:
        return "text-white bg-fuchsia-600" // Add more later
    }
  }

  return (
    <div
      className={`flex w-fit h-full rounded-sm font-bold text-[6pt] px-1 items-center
        ${difficultyStyle(difficulty)}`}
    >
      { formatDifficultyName(difficulty) }
    </div>
  )
}
