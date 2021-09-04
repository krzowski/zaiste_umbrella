import * as React from "react"
import { useForm } from "react-hook-form"
import { requestCreateTransactionItem } from "../../../api_calls/wallet"
import { Transaction } from "../interfaces"

interface Props {
  transaction: Transaction
  addTransactionItem: Function
}

const TransactionItemForm: React.FC<Props> = ({ transaction, addTransactionItem }) => {
  const nameInputId = `name${transaction.id}`
  function focusNameInput() {
    const nameInput: HTMLElement = document.getElementById(nameInputId)!
    nameInput.focus()
  }
  React.useEffect(() => focusNameInput(), [])

  const {
    register,
    handleSubmit,
    // setError,
    // clearErrors,
    reset,
    formState: { isSubmitting },
  } = useForm()
  const onSubmit = (data: { name: string; amount: string }): void => {
    requestCreateTransactionItem(transaction.id, data)
      .then(response => response.json())
      .then(response => {
        addTransactionItem(transaction, response.data)
        reset()
        focusNameInput()
      })
    // .catch(_error => { })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-name row">
        <label htmlFor="name">Name</label>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("name")}
          id={nameInputId}
          required
          className="in-box p4"
        />
      </div>

      <div className="form-amount">
        <label htmlFor="amount">Amount</label>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("amount")}
          id="amount"
          required
          className="in-box p4"
        />
      </div>

      <div className="form-button">
        <button type="submit" disabled={isSubmitting}>
          Add
        </button>
      </div>
    </form>
  )
}

export default TransactionItemForm
