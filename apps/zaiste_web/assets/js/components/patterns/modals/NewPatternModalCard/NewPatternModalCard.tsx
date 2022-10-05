import * as React from "react"
import ModalCard from "../../../shared/ModalCard/ModalCard"
import { PatternFormFields } from "../../interfaces"
import { Modal } from "../../../../hooks/useModalCards"
import PatternModalForm from "../PatternModalForm/PatternModalForm"

interface Props {
  modal: Modal
  // openPatternModal: Function
}

const NewPatternModalCard: React.FC<Props> = ({ modal }) => {
  const defaultFormValues: PatternFormFields = {
    name: "",
    description: "",
  }
  const onSubmit = (data: PatternFormFields): void => {}

  React.useEffect(() => {
    const nameInput: HTMLElement = document
      .getElementById(modal.modalId)!
      .querySelector("input#name")!
    nameInput.focus()
  }, [])

  return (
    <ModalCard
      modalId={modal.modalId}
      modalTitle="New Pattern"
      closeModal={modal.close}
      modalWidth={300}
      modalHeight={135}
      initialTopPosition={20}
      initialLeftPosition={window.innerWidth - 500}
    >
      <div className="card-form new-project p-r p15">
        <PatternModalForm onSubmit={onSubmit} defaultValues={defaultFormValues} buttonName="Add" />
      </div>
    </ModalCard>
  )
}

export default NewPatternModalCard
