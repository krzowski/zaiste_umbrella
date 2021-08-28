import * as React from 'react'
import { parse, formatDistanceToNow } from 'date-fns'
import { Project, ProjectCategory } from './interfaces'
import EntryActionIcons from '../shared/EntryActionIcons'


interface Props {
  project: Project
  openProjectModal: Function
}

const ProjectEntry: React.FC<Props> = ({ project, openProjectModal }) => {
  function lastActionInWords(category: ProjectCategory) {
    const lastActionDate = parse(category.lastActionAt, 'yyyy-MM-dd HH:mm', new Date())
    return formatDistanceToNow(lastActionDate, { addSuffix: true })
  }

  return (
    <div className="card event-card mt2 mb2">
      <div className="card-summary">
        <div className="project-drag">
          <i className="fas fa-grip-lines" />
        </div>
        <div className="project-name">
          {project.name}
        </div>

        <EntryActionIcons
          showButtonName="Show project"
          handleShowClick={() => openProjectModal({ projectId: project.id })}
          editButtonName="Edit project"
          handleEditClick={() => { }}
          deleteButtonName="Delete project"
          handleDeleteClick={() => { }}
        />
      </div>

      {/* <div className="project-categories">
      {project.projectCategories.map((category) => (
        <div className="project-category flex-row-justify secondary-text">
          <div className="category-indicator" />
          <div className="category-name">{category.name}</div>

          <div className="project-last-action">
            {lastActionInWords(category)}
          </div>
          <div className="category-tasks-number numeric-font pr20">
            {category.projectTasks.filter(task => task.done).length}
            {' / '}
            {category.projectTasks.length}
          </div>
        </div>
      ))}
    </div> */}
    </div>
  )
}

export default ProjectEntry
