import * as React from "react"
import { Modal } from "../../../hooks/useModalCards"
import ProjectModalCard from "./ProjectModalCard/ProjectModalCard"
import NewProjectModalCard from "./NewProjectModalCard/NewProjectModalCard"

interface Props {
  openedNewProjectModals: Modal[]
  openedProjectModals: Modal[]
}

const ProjectModals: React.FC<Props> = ({
  openedNewProjectModals,
  openedProjectModals,
}) => (
  <>
    {openedNewProjectModals.map(modal => (
      <NewProjectModalCard
        key={modal.modalId}
        modal={modal}
      />
    ))}

    {openedProjectModals.map(modal => (
      <ProjectModalCard
        key={modal.modalId}
        modal={modal}
      />
    ))}

    {/* <ProjectModalCard
        key={321313}
        modal={"321321321"}
      /> */}
  </>
)

export default ProjectModals
