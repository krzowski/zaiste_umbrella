import * as React from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import ModalCard from '../shared/ModalCard'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { createTransaction } from './api_calls'


interface NewTransactionFields {
  name: string
  date: string
  income: string
}
interface Props {
  modalId: string
  closeModal: Function
  openEditTransactionModal: Function
}


const NewTransactionModal: React.FC<Props> = ({ modalId, closeModal, openEditTransactionModal }) => {
  const { addTransaction } = React.useContext(TransactionsContext)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      date: format(new Date(), "dd / MM / yyyy"),
      name: '',
      income: 'false',
    }
  })
  const onSubmit = (data: NewTransactionFields): void => {
    createTransaction(data)
      .then(response => response.json())
      .then(response => {
        const transactionData = response.data
        addTransaction({ ...transactionData, transaction_items: [] })
        openEditTransactionModal({ transaction_id: transactionData.id })
        closeModal(modalId)
      })
      .catch(_error => { })
  }

  React.useEffect(() => {
    const name_input: HTMLElement = document.getElementById(modalId)!.querySelector('input#name')!
    name_input.focus()
  }, [])

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="New transaction"
      closeModal={closeModal}
      modalWidth={300}
      modalHeight={235}
      initialTopPosition={20}
      initialLeftPosition={window.innerWidth - 500}
    >
      <div className="card-form new-transaction p-r p15">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <label htmlFor="date">Date</label>
            <input {...register('date')}
              required
              className='in-box mt5'
            />
          </div>

          <div className="row mt10">
            <label htmlFor="name">Name</label>
            <input {...register('name')}
              id="name"
              required
              className='in-box mt5'
            />
          </div>

          <div className="row mt10">
            <label>Type</label>
            <div className="radios-row mt5">
              <input {...register('income')}
                type="radio"
                name="income"
                id={modalId + "expense_radio"}
                value="false"
              />
              <label htmlFor={modalId + "expense_radio"}>
                <span>Expense</span>
              </label>
              <input {...register('income')}
                type="radio"
                name="income"
                id={modalId + "income_radio"}
                value="true"
              />
              <label htmlFor={modalId + "income_radio"}>
                <span>Income</span>
              </label>
            </div>
          </div>

          <div className="form-button">
            <button type="submit" disabled={isSubmitting}>Add</button>
          </div>
        </form>
      </div>
    </ModalCard>
  )
}

export default NewTransactionModal

