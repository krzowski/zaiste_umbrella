import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import useModalCards from '../../hooks/useModalCards'
import ProjectsList from './ProjectsList'
import ProjectsMenu from './menu/ProjectMenu'
import ProjectModalCard from './modals/ProjectModalCard'
import NewProjectModalCard from './modals/NewProjectModalCard'


const Projects: React.FC<RouteComponentProps> = () => {
  const {
    openedModals: openedNewProjectModals,
    openModal: openNewProjectModal,
    closeModal: closeNewProjectModal,
  } = useModalCards("new_project")
  const {
    openedModals: openedProjectModals,
    openModal: openProjectModal,
    closeModal: closeProjectModal,
  } = useModalCards("project")

  return (
    <div className="page-container projects-container">

      <ProjectsMenu
        openNewProjectModal={openNewProjectModal}
      />

      <ProjectsList
        openProjectModal={openProjectModal}
      />

      {/* MODALS */}

      {openedNewProjectModals.map(modal => (
        <NewProjectModalCard
          key={modal.modalId}
          modalId={modal.modalId}
          closeModal={closeNewProjectModal}
        />
      ))}

      <ProjectModalCard
        key={321313}
        modalId="321321321"
        closeModal={() => { }}
      />

      {openedProjectModals.map(modal => (
        <ProjectModalCard
          key={modal.modalId}
          modalId={modal.modalId}
          closeModal={closeProjectModal}
        />
      ))}

    </div>
  )
}

export default Projects
