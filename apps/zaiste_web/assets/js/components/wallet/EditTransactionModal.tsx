import * as React from 'react'
import { format, parseISO } from 'date-fns'
import ModalCard from '../shared/ModalCard'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { updateTransaction } from '../../api_calls/wallet'
import { Transaction, TransactionFormFields } from './interfaces'
import TransactionModalForm from './TransactionModalForm'


interface Props {
  transaction: Transaction
  modalId: string
  closeModal: Function
}

const EditTransactionModal: React.FC<Props> = ({ transaction, modalId, closeModal }) => {
  const { editTransaction } = React.useContext(TransactionsContext)
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
        editTransaction({ ...transactionData, transaction_items: transaction.transaction_items })
        closeModal(modalId)
      })
      .catch(_error => { })
  }

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="Edit transaction"
      closeModal={closeModal}
      modalWidth={300}
      modalHeight={235}
      initialTopPosition={20}
      initialLeftPosition={window.innerWidth - 500}
    >
      <div className="card-form new-transaction p-r p15">
        <TransactionModalForm
          onSubmit={onSubmit}
          defaultValues={defaultFormValues}
          buttonName={"Save"}
          modalId={modalId}
        />
      </div>
    </ModalCard>
  )
}

export default EditTransactionModal

