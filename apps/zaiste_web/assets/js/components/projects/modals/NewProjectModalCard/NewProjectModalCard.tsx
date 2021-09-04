import * as React from "react"
import { format } from "date-fns"
import ModalCard from "../../../shared/ModalCard/ModalCard"
import { ProjectFormFields } from "../../interfaces"
import { createProject } from "../../../../api_calls/projects"
import ProjectModalForm from "../ProjectModalForm/ProjectModalForm"

interface Props {
  modalId: string
  closeModal: Function
  // openProjectModal: Function
}

const NewProjectModalCard: React.FC<Props> = ({ modalId, closeModal }) => {
  const defaultFormValues: ProjectFormFields = {
    name: "",
    description: "",
  }
  const onSubmit = (data: ProjectFormFields): void => {
    // createProject(data)
    //   .then(response => response.json())
    //   .then(response => {
    //     const transactionData = response.data
    //     addTransaction({ ...transactionData, transactionItems: [] })
    //     openEditTransactionItemsModal({ transactionId: transactionData.id })
    //     closeModal(modalId)
    //   })
    //   .catch(_error => { })
  }

  React.useEffect(() => {
    const nameInput: HTMLElement = document.getElementById(modalId)!.querySelector("input#name")!
    nameInput.focus()
  }, [])

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="New project"
      closeModal={closeModal}
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
          modalId={modalId}
        />
      </div>
    </ModalCard>
  )
}

export default NewProjectModalCard
