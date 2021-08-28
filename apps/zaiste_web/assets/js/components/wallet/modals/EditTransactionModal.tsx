import * as React from "react"
import { format, parseISO } from "date-fns"
import ModalCard from "../../shared/ModalCard"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import { updateTransaction } from "../../../api_calls/wallet"
import { Transaction, TransactionFormFields } from "../interfaces"
import TransactionModalForm from "./TransactionModalForm"

interface Props {
  modalId: string
  transactionId: number
  closeModal: Function
}

const EditTransactionModal: React.FC<Props> = ({ modalId, transactionId, closeModal }) => {
  const { transactions, editTransaction } = React.useContext(TransactionsContext)
  const transaction: Transaction | undefined = transactions.find(t => t.id === transactionId)
  if (!transaction) return null

  const defaultFormValues: TransactionFormFields = {
    date: format(parseISO(transaction.date), "dd / MM / yyyy"),
    name: transaction.name,
    income: String(transaction.income),
  }
  const onSubmit = (data: TransactionFormFields): void => {
    updateTransaction(transaction.id, data)
      .then(response => response.json())
      .then(response => {
        const transactionData = response.data
        editTransaction({ ...transactionData, transactionItems: transaction.transactionItems })
        closeModal(modalId)
      })
    // .catch(_error => { })
  }

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="Edit transaction"
      closeModal={closeModal}
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
          modalId={modalId}
        />
      </div>
    </ModalCard>
  )
}

export default EditTransactionModal
