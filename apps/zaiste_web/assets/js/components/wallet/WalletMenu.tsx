import * as React from 'react'
import { useForm } from 'react-hook-form'
import { format, parse as parseDate } from 'date-fns'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import WalletMenuCalendar from './WalletMenuCalendar'
import { DatesRange } from './interfaces'


interface DateFields {
  startDate: string
  endDate: string
}

interface Props {
  datesRange: DatesRange
  setDatesRange: React.Dispatch<React.SetStateAction<DatesRange>>
}

const WalletMenu: React.FC<Props> = ({ datesRange, setDatesRange }) => {
  const { transactionsFilters, setTransactionsFilters } = React.useContext(TransactionsContext)
  const filtersContainerClass = "wallet-filters"
  const defaultValues = formatDatesRange(datesRange)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues })
  React.useEffect(() => reset(defaultValues), [datesRange])
  const onSubmit = (data: DateFields): void => {
    setDatesRange({
      startDate: parseDate(data.startDate, 'dd / MM / yyyy', new Date()),
      endDate: parseDate(data.endDate, 'dd / MM / yyyy', new Date())
    })
  }

  return (
    <div className="wallet-menu">
      <div className={`${filtersContainerClass} mt15`}>

        {/* TODO - labels for transactions */}
        {/* <div className="section-title mt20">Labels</div>
        <div className="labels">
          <div className="label">Food</div>
          <div className="label">Leisure</div>
        </div> */}


        <div className="section-title pt5 mb13">Type</div>
        <div className="flex-row-justify pl10 pr20">
          <div>
            <input
              type="checkbox"
              name="type_income"
              id="type_income"
              checked={transactionsFilters.showIncomes}
              onChange={() => setTransactionsFilters(
                {
                  ...transactionsFilters,
                  showIncomes: !transactionsFilters.showIncomes
                }
              )}
            />
            <label htmlFor="type_income">Incomes</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="type_expense"
              id="type_expense"
              checked={transactionsFilters.showExpenses}
              onChange={() => setTransactionsFilters(
                {
                  ...transactionsFilters,
                  showExpenses: !transactionsFilters.showExpenses
                }
              )}
            />
            <label htmlFor="type_expense">Expenses</label>
          </div>
        </div>


        <div className="section-title mt30 mb8">Date</div>

        <form onSubmit={handleSubmit(onSubmit)} className="pl10">
          <div className="row">
            <label htmlFor="startDate">Date from</label>
            <input {...register('startDate')}
              id="startDate" name="startDate" required
            />
          </div>

          <div className="row">
            <label htmlFor="endDate">Date to</label>
            <input  {...register('endDate')}
              id="endDate" name="endDate" required
            />
          </div>

          <div className="form-button">
            <button type="submit" disabled={isSubmitting}>Filter</button>
          </div>
        </form>
      </div>

      <WalletMenuCalendar
        setDatesRange={setDatesRange}
        filtersContainerClass={filtersContainerClass}
      />
    </div>
  )
}

export function formatDatesRange(datesRange: DatesRange) {
  return {
    startDate: format(datesRange.startDate, "dd / MM / yyyy"),
    endDate: format(datesRange.endDate, "dd / MM / yyyy")
  }
}

export default WalletMenu
