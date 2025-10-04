import { Difficulty } from "./difficulty"

export interface Chart {
  index: number
  song: string
  image: string
  level: number
  category: string
  artist: string
  bpm: number
  type: string
  difficulty: Difficulty
  version: string
}

interface Regions {
  cn: boolean
  intl: boolean
  jp: boolean
  usa: boolean
}

interface NoteCount {
  break: number
  hold: number
  slide: number
  tap: number
  total: number
  touch: number
}

interface ChartSheet {
  difficulty: string
  internalLevel: string | null
  internalLevelValue: number
  isSpecial: boolean
  level: string
  levelValue: string
  noteCounts: NoteCount
  noteDesigner: string
  regions: Regions
  type: string
  version: string
}

export interface ChartApiData {
  artist: string
  bpm: number
  category: string
  comment: string | null
  imageName: string
  isLocked: boolean
  isNew: boolean
  sheets: ChartSheet[]
  releaseDate: string
  songId: string
  title: string
  version: string
}

