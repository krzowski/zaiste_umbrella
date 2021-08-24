import * as React from 'react'
import { Project } from './interfaces'
import { parse, formatDistanceToNow } from 'date-fns'


interface Props {
  project: Project
  openProjectModal: Function
}

const ProjectEntry: React.FC<Props> = ({ project, openProjectModal }) => {
  return (
    <div className="card event-card mt2 mb4">
      <div className="card-summary">
        <div className="project-drag">
          <i className="fas fa-grip-lines"></i>
        </div>
        <div className="project-name">
          {project.name}
        </div>

        <div className="action-icons d-f">
          <i className="fas fa-list" onClick={() => openProjectModal({ projectId: project.id })}></i>
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash remove-icon"></i>
        </div>
      </div>
      <div className="project-categories">
        {project.project_categories.map((category) => (
          <div className="project-category flex-row-justify secondary-text">
            <div className="category-indicator"></div>
            <div className="category-name">{category.name}</div>

            <div className="project-last-action">
              {formatDistanceToNow(parse(category.last_action_at, 'yyyy-MM-dd HH:mm', new Date()), { addSuffix: true })}
            </div>
            <div className="project-tasks numeric-font pr20">
              {category.project_tasks.filter(task => task.done).length} / {category.project_tasks.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectEntry
