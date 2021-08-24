import * as React from 'react'
import { useForm } from 'react-hook-form'
import { createTransactionItem } from '../../../api_calls/wallet'
import { TransactionsContext } from '../../../contexts/TransactionsContext'
import { Transaction } from '../interfaces'


interface Props {
  transaction: Transaction
}


const TransactionItemForm: React.FC<Props> = ({ transaction }) => {
  const { addTransactionItem } = React.useContext(TransactionsContext)
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

  const nameInputId = `name${transaction.id}`
  function focusNameInput() {
    const nameInput: HTMLElement = document.getElementById(nameInputId)!
    nameInput.focus()
  }
  React.useEffect(() => focusNameInput(), [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-name row">
        <label htmlFor="name">Name</label>
        <input {...register('name')}
          id={nameInputId}
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
  )
}

export default TransactionItemForm
