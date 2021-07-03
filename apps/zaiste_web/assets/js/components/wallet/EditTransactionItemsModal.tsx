import * as React from 'react'
import { useForm } from 'react-hook-form'
import { calculateItemsAmount } from './helper_functions'
import TransactionItemEntry from './TransactionItemEntry'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { UserSettingsContext } from '../../contexts/UserSettingsContext'
import ModalCard from '../shared/ModalCard'
import { Transaction, TransactionItem } from './interfaces'
import { createTransactionItem, deleteTransactionItem } from './api_calls'

interface Props {
  transaction: Transaction
  modalId: string
  closeModal: Function
}

const EditTransactionItemsModal: React.FC<Props> = ({ transaction, modalId, closeModal }) => {
  const { userSettings } = React.useContext(UserSettingsContext)
  const {
    addTransactionItem,
    removeTransactionItem
  } = React.useContext(TransactionsContext)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const onSubmit = (data: { name: string, amount: string }): void => {
    createTransactionItem(transaction.id, data)
      .then(response => response.json())
      .then(response => {
        addTransactionItem(transaction, response.data)
        reset()
        focusNameInput()
      })
      .catch(_error => { })
  }

  function handleRemoveClick(transaction_item: TransactionItem) {
    deleteTransactionItem(transaction.id, transaction_item.id)
      .then(response => {
        if (response.status === 204) removeTransactionItem(transaction, transaction_item.id)
      })
  }

  const transaction_amount = calculateItemsAmount(transaction.transaction_items).toFixed(2)

  function focusNameInput() {
    const name_input: HTMLElement = document.getElementById(modalId)!.querySelector('input#name')!
    name_input.focus()
  }
  React.useEffect(() => focusNameInput(), [])

  return (
    <ModalCard
      modalId={modalId}
      modalTitle={transaction.date + ' - ' + transaction.name}
      closeModal={closeModal}
      modalWidth={window.innerWidth - 500}
      modalHeight={150 + transaction.transaction_items.length * 22}
      initialTopPosition={80}
      initialLeftPosition={250}
    >
      <div className="edit-transaction pt20 pr20 pb20">
        <div className="card no-background event-card mt2">
          <div className="card-summary">
            <div className="transaction-name">
              {transaction.name}
            </div>
            <div className={`transaction-amount numeric-font ${transaction.income ? 'green' : 'red'}`}>
              {!transaction.income && '-'}{transaction_amount} {userSettings.currency}
            </div>
            <div className="transaction-items-toggle">
            </div>
          </div>

          <div className="card-items">
            {transaction.transaction_items.map(item =>
              <TransactionItemEntry
                key={item.id}
                transaction={transaction}
                transaction_item={item}
                currency={userSettings.currency}
                handleRemoveClick={() => handleRemoveClick(item)}
              />
            )}
          </div>

        </div>
        <div className="card-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-name row">
              <label htmlFor="name">Name</label>
              <input {...register('name')}
                id="name"
                required
                className='in-box p4'
              />
            </div>

            <div className="form-amount">
              <label htmlFor="date">Amount</label>
              <input {...register('amount')}
                required
                className='in-box p4'
              />
            </div>

            <div className="form-button mt23">
              <button type="submit" disabled={isSubmitting}>Add</button>
            </div>
          </form>
        </div>
      </div>
    </ModalCard>
  )
}

export default EditTransactionItemsModal
