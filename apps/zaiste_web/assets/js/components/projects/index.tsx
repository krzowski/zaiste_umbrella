import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import useModalCards from "../../hooks/useModalCards"
import ProjectsList from "./ProjectsList"
import ProjectsMenu from "./menu"
import ProjectModals from "./modals"

const Projects: React.FC<RouteComponentProps> = () => {
  const { openedModals: openedNewProjectModals, openModal: openNewProjectModal } =
    useModalCards("new_project")
  const { openedModals: openedProjectModals, openModal: openProjectModal } =
    useModalCards("project")

  return (
    <div className="page-container projects-container">
      <ProjectsList openProjectModal={openProjectModal} />

      <ProjectsMenu openNewProjectModal={openNewProjectModal} />

      <ProjectModals
        openedNewProjectModals={openedNewProjectModals}
        openedProjectModals={openedProjectModals}
      />
    </div>
  )
}

export default Projects
