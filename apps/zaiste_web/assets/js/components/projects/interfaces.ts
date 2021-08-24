export interface Project {
  id: number
  name: string
  position: number
  description: string
  projectCategories: ProjectCategory[]
}

export interface ProjectCategory {
  id: number
  name: string
  position: number
  lastActionAt: string
  projectTasks: ProjectTask[]
}

export interface ProjectTask {
  id: number
  title: string
  description: string
  done: boolean
  position: number
  priority: number
  updatedAt: string
}

export interface ProjectFormFields {
  name: string
  description: string
}
