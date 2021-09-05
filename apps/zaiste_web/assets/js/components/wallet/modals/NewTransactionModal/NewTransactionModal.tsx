import * as React from "react"
import { format } from "date-fns"
import ModalCard from "../../../shared/ModalCard/ModalCard"
import { requestCreateTransaction } from "../../../../api_calls/wallet"
import { TransactionFormFields } from "../../interfaces"
import { Modal } from "../../../../hooks/useModalCards"
import TransactionModalForm from "../TransactionModalForm/TransactionModalForm"

interface Props {
  modal: Modal
  openEditTransactionItemsModal: Function
  addTransaction: Function
}

const NewTransactionModal: React.FC<Props> = ({
  modal,
  openEditTransactionItemsModal,
  addTransaction,
}) => {
  const defaultFormValues: TransactionFormFields = {
    date: format(new Date(), "dd / MM / yyyy"),
    name: "",
    income: "false",
  }
  const onSubmit = (data: TransactionFormFields): void => {
    requestCreateTransaction(data)
      .then(response => response.json())
      .then(response => {
        const transactionData = response.data
        addTransaction({ ...transactionData, transactionItems: [] })
        openEditTransactionItemsModal({ transactionId: transactionData.id })
        modal.close()
      })
    // .catch(_error => { })
  }

  React.useEffect(() => {
    const nameInput: HTMLElement = document.getElementById(modal.modalId)!.querySelector("input#name")!
    nameInput.focus()
  }, [])

  return (
    <ModalCard
      modalId={modal.modalId}
      modalTitle="New transaction"
      closeModal={modal.close}
      modalWidth={300}
      modalHeight={235}
      initialTopPosition={35}
      initialLeftPosition={window.innerWidth - 330}
    >
      <div className="card-form new-transaction p-r p15">
        <TransactionModalForm
          onSubmit={onSubmit}
          defaultValues={defaultFormValues}
          buttonName="Add"
          modalId={modal.modalId}
        />
      </div>
    </ModalCard>
  )
}

export default NewTransactionModal
