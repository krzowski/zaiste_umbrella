export interface Pattern {
  id: number
  name: string
  position: number
  description: string
  patternCategories: PatternCategory[]
}

export interface PatternCategory {
  id: number
  name: string
  position: number
  lastActionAt: string
  patternTasks: PatternTask[]
}

export interface PatternTask {
  id: number
  title: string
  description: string
  done: boolean
  position: number
  priority: number
  updatedAt: string
}

export interface PatternFormFields {
  name: string
  description: string
}
