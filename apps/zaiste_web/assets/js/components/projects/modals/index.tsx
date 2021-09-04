import * as React from "react"
import { Modal } from "../../../hooks/useModalCards"
import ProjectModalCard from "./ProjectModalCard/ProjectModalCard"
import NewProjectModalCard from "./NewProjectModalCard/NewProjectModalCard"

interface Props {
  openedNewProjectModals: Modal[]
  closeNewProjectModal: Function
  openedProjectModals: Modal[]
  closeProjectModal: Function
}

const ProjectModals: React.FC<Props> = ({
  openedNewProjectModals,
  closeNewProjectModal,
  openedProjectModals,
  closeProjectModal,
}) => (
  <>
    {openedNewProjectModals.map(modal => (
      <NewProjectModalCard
        key={modal.modalId}
        modalId={modal.modalId}
        closeModal={closeNewProjectModal}
      />
    ))}

    {/* <ProjectModalCard
        key={321313}
        modalId="321321321"
        closeModal={() => { }}
      /> */}

    {openedProjectModals.map(modal => (
      <ProjectModalCard
        key={modal.modalId}
        modalId={modal.modalId}
        closeModal={closeProjectModal}
      />
    ))}
  </>
)

export default ProjectModals
