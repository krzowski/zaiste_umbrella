import * as React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { TransactionFormFields } from "../interfaces"


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
    // setError,
    // clearErrors,
    formState: { isSubmitting },
  } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <label htmlFor="date">Date</label>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("date")}
          required
          className="in-box mt5"
        />
      </div>

      <div className="row mt10">
        <label htmlFor="name">Name</label>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("name")}
          id="name"
          required
          className="in-box mt5"
        />
      </div>

      <div className="row mt10">
        <label>Type</label>
        <div className="radios-row mt5">
          <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("income")}
            type="radio"
            name="income"
            id={`${modalId}expense_radio`}
            value="false"
          />
          <label htmlFor={`${modalId}expense_radio`}>
            <span>Expense</span>
          </label>
          <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("income")}
            type="radio"
            name="income"
            id={`${modalId}income_radio`}
            value="true"
          />
          <label htmlFor={`${modalId}income_radio`}>
            <span>Income</span>
          </label>
        </div>
      </div>

      <div className="form-button">
        <button type="submit" disabled={isSubmitting}>{buttonName}</button>
      </div>
    </form>
  )
}

export default TransactionModalForm