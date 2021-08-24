import * as React from 'react'
import { format } from 'date-fns'
import ModalCard from '../../shared/ModalCard'
import { TransactionsContext } from '../../../contexts/TransactionsContext'
import { createTransaction } from '../../../api_calls/wallet'
import { TransactionFormFields } from '../interfaces'
import TransactionModalForm from './TransactionModalForm'


interface Props {
  modalId: string
  closeModal: Function
  openEditTransactionItemsModal: Function
}


const NewTransactionModal: React.FC<Props> = ({
  modalId,
  closeModal,
  openEditTransactionItemsModal,
}) => {
  const { addTransaction } = React.useContext(TransactionsContext)
  const defaultFormValues: TransactionFormFields = {
    date: format(new Date(), "dd / MM / yyyy"),
    name: '',
    income: 'false',
  }
  const onSubmit = (data: TransactionFormFields): void => {
    createTransaction(data)
      .then(response => response.json())
      .then(response => {
        const transactionData = response.data
        addTransaction({ ...transactionData, transactionItems: [] })
        openEditTransactionItemsModal({ transactionId: transactionData.id })
        closeModal(modalId)
      })
      // .catch(_error => { })
  }

  React.useEffect(() => {
    const nameInput: HTMLElement = document.getElementById(modalId)!.querySelector('input#name')!
    nameInput.focus()
  }, [])

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="New transaction"
      closeModal={closeModal}
      modalWidth={300}
      modalHeight={235}
      initialTopPosition={35}
      initialLeftPosition={240}
    >
      <div className="card-form new-transaction p-r p15">
        <TransactionModalForm
          onSubmit={onSubmit}
          defaultValues={defaultFormValues}
          buttonName="Add"
          modalId={modalId}
        />
      </div>
    </ModalCard>
  )
}

export default NewTransactionModal

