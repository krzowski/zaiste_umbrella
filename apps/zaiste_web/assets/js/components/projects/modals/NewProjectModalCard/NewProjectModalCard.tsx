import * as React from "react"
import ModalCard from "../../../shared/ModalCard/ModalCard"
import { ProjectFormFields } from "../../interfaces"
import { Modal } from "../../../../hooks/useModalCards"
import ProjectModalForm from "../ProjectModalForm/ProjectModalForm"

interface Props {
  modal: Modal
  // openProjectModal: Function
}

const NewProjectModalCard: React.FC<Props> = ({ modal }) => {
  const defaultFormValues: ProjectFormFields = {
    name: "",
    description: "",
  }
  const onSubmit = (data: ProjectFormFields): void => {}

  React.useEffect(() => {
    const nameInput: HTMLElement = document
      .getElementById(modal.modalId)!
      .querySelector("input#name")!
    nameInput.focus()
  }, [])

  return (
    <ModalCard
      modalId={modal.modalId}
      modalTitle="New project"
      closeModal={modal.close}
      modalWidth={300}
      modalHeight={135}
      initialTopPosition={20}
      initialLeftPosition={window.innerWidth - 500}
    >
      <div className="card-form new-project p-r p15">
        <ProjectModalForm
          onSubmit={onSubmit}
          defaultValues={defaultFormValues}
          buttonName="Add"
          modalId={modal.modalId}
        />
      </div>
    </ModalCard>
  )
}

export default NewProjectModalCard
