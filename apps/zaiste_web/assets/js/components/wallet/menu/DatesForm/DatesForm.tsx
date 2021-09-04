import * as React from "react"
import { useForm } from "react-hook-form"
import { parse as parseDate } from "date-fns"
import { DatesRange } from "../../interfaces"
import { formatDatesRange } from "../../helper_functions"

interface DateFields {
  startDate: string
  endDate: string
}

interface Props {
  datesRange: DatesRange
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
}

const DatesForm: React.FC<Props> = ({ datesRange, setDatesRange }) => {
  const defaultValues = formatDatesRange(datesRange)
  const {
    register,
    handleSubmit,
    // setError,
    // clearErrors,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues })
  React.useEffect(() => reset(defaultValues), [datesRange])

  function onSubmit(data: DateFields) {
    setDatesRange({
      startDate: parseDate(data.startDate, "dd / MM / yyyy", new Date()),
      endDate: parseDate(data.endDate, "dd / MM / yyyy", new Date()),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="wallet-dates-form">
      <div className="row">
        <label htmlFor="startDate">Date from</label>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("startDate")}
          id="startDate"
          name="startDate"
          required
        />
      </div>

      <div className="row">
        <label htmlFor="endDate">Date to</label>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("endDate")}
          id="endDate"
          name="endDate"
          required
        />
      </div>

      <div className="form-button">
        <button type="submit" disabled={isSubmitting}>
          Filter
        </button>
      </div>
    </form>
  )
}

export default DatesForm
