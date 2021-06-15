import * as React from 'react'
import { Formik, Field, Form } from 'formik';
import { format } from 'date-fns'

import WalletMenuCalendar from './WalletMenuCalendar'
import { DatesRange, TransactionsFilters } from './interfaces'


interface Props {
  dates: Date[]
  transactionsFilters: TransactionsFilters
  setTransactionsFilters: React.Dispatch<React.SetStateAction<TransactionsFilters>>
}


const today = new Date()
const initialDates = {
  start_date: new Date(today.getFullYear(), today.getMonth(), 1),
  end_date: new Date(today.getFullYear(), today.getMonth() + 1, 0),
}

const WalletMenu: React.FC<Props> = ({ dates, transactionsFilters, setTransactionsFilters }) => {
  const [datesRange, setDatesRange] = React.useState<DatesRange>(initialDates)
  const filtersContainerClass = "wallet-filters"

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
              checked={transactionsFilters.show_incomes}
              onChange={() => setTransactionsFilters(
                {
                  ...transactionsFilters,
                  show_incomes: !transactionsFilters.show_incomes
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
              checked={transactionsFilters.show_expenses}
              onChange={() => setTransactionsFilters(
                {
                  ...transactionsFilters,
                  show_expenses: !transactionsFilters.show_expenses
                }
              )}
            />
            <label htmlFor="type_expense">Expenses</label>
          </div>
        </div>


        <div className="section-title mt30 mb8">Date</div>

        <Formik
          initialValues={{
            dateFrom: format(datesRange.start_date, "dd / MM / yyyy"),
            dateTo: format(datesRange.end_date, "dd / MM / yyyy")
          }}
          onSubmit={(values) => { }}
          enableReinitialize={true}
        >
          <Form className="pl10">
            <div className="row">
              <label htmlFor="dateFrom">Date from</label>
              <Field id="dateFrom" name="dateFrom" className='numeric-font' />
            </div>

            <div className="row">
              <label htmlFor="dateTo">Date to</label>
              <Field id="dateTo" name="dateTo" className='numeric-font' />
            </div>

            <div className="form-button">
              <button type="submit">Filter</button>
            </div>
          </Form>
        </Formik>
      </div>

      <WalletMenuCalendar
        setDatesRange={setDatesRange}
        filtersContainerClass={filtersContainerClass}
      />
    </div>
  )
}

export default WalletMenu
