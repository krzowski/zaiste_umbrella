export interface Project {
  id: number
  name: string
  position: number
  description: string
  project_categories: ProjectCategory[]
}

export interface ProjectCategory {
  id: number
  name: string
  position: number
  last_action_at: string
  project_tasks: ProjectTask[]
}

export interface ProjectTask {
  id: number
  title: string
  description: string
  done: boolean
  position: number
  priority: number
  updated_at: string
}

export interface ProjectFormFields {
  name: string
  description: string
}
