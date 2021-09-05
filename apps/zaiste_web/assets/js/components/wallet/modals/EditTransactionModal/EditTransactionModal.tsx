import * as React from "react"
import { format, parseISO } from "date-fns"
import ModalCard from "../../../shared/ModalCard/ModalCard"
import { requestUpdateTransaction } from "../../../../api_calls/wallet"
import { Transaction, TransactionFormFields } from "../../interfaces"
import TransactionModalForm from "../TransactionModalForm/TransactionModalForm"
import { Modal } from "../../../../hooks/useModalCards"

interface Props {
  modal: Modal
  transaction: Transaction
  editTransaction: Function
}

const EditTransactionModal: React.FC<Props> = ({
  modal,
  transaction,
  editTransaction,
}) => {
  const defaultFormValues: TransactionFormFields = {
    date: format(parseISO(transaction.date), "dd / MM / yyyy"),
    name: transaction.name,
    income: String(transaction.income),
  }
  const onSubmit = (data: TransactionFormFields): void => {
    requestUpdateTransaction(transaction.id, data)
      .then(response => response.json())
      .then(response => {
        const transactionData = response.data
        editTransaction({ ...transactionData, transactionItems: transaction.transactionItems })
        modal.close()
      })
    // .catch(_error => { })
  }

  return (
    <ModalCard
      modalId={modal.modalId}
      modalTitle="Edit transaction"
      closeModal={modal.close}
      modalWidth={300}
      modalHeight={235}
      initialTopPosition={20}
      initialLeftPosition={window.innerWidth - 480}
    >
      <div className="card-form new-transaction p-r p15">
        <TransactionModalForm
          onSubmit={onSubmit}
          defaultValues={defaultFormValues}
          buttonName="Save"
          modalId={modal.modalId}
        />
      </div>
    </ModalCard>
  )
}

export default EditTransactionModal
