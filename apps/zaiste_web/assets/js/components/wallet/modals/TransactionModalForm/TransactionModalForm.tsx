/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { TransactionFormFields } from "../../interfaces"

interface Props {
  onSubmit: SubmitHandler<TransactionFormFields>
  defaultValues: TransactionFormFields
  buttonName: string
  modalId: string
}

const TransactionModalForm: React.FC<Props> = ({
  modalId,
  onSubmit,
  defaultValues,
  buttonName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues })

  const expenseRadioId = `${modalId}expense_radio`
  const incomeRadioId = `${modalId}income_radio`

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <label htmlFor="date">Date</label>
        <input {...register("date")} required className="in-box mt5" />
      </div>

      <div className="row mt10">
        <label htmlFor="name">Name</label>
        <input {...register("name")} id="name" required className="in-box mt5" />
      </div>

      <div className="row mt10">
        <label>Type</label>
        <div className="radios-row mt5">
          <input
            {...register("income")}
            type="radio"
            name="income"
            id={expenseRadioId}
            value="false"
          />
          <label htmlFor={expenseRadioId}>Expense</label>

          <input
            {...register("income")}
            type="radio"
            name="income"
            id={incomeRadioId}
            value="true"
          />
          <label htmlFor={incomeRadioId}>Income</label>
        </div>
      </div>

      <div className="form-button">
        <button type="submit" disabled={isSubmitting}>
          {buttonName}
        </button>
      </div>
    </form>
  )
}

export default TransactionModalForm
