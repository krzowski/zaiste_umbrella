import * as React from 'react'
import { Project } from '../interfaces'


interface Props {
  project: Project
}


// eslint-disable-next-line arrow-body-style
const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="project-modal p15">
      Text
    </div>
  )
}

export default ProjectCard
