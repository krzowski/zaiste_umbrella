import * as React from 'react'
import { Formik, Field, Form } from 'formik';
import { format } from 'date-fns'

import WalletMenuCalendar from './WalletMenuCalendar'


export interface DatesRange {
  start_date: Date
  end_date: Date
}

interface Props {
  dates: Date[]
}


const today = new Date()
const initialDates = {
  start_date: new Date(today.getFullYear(), today.getMonth(), 1),
  end_date: new Date(today.getFullYear(), today.getMonth() + 1, 0),
} // mock dates

const WalletMenu: React.FC<Props> = ({ dates }) => {
  const [datesRange, setDatesRange] = React.useState<DatesRange>(initialDates)

  return (
    <div className="wallet-menu">
      <div className="wallet-filters mt30">

        {/* TODO - labels for transactions */}
        {/* <div className="section-title mt20">Labels</div>
        <div className="labels">
          <div className="label">Food</div>
          <div className="label">Leisure</div>
        </div> */}


        <div className="section-title pt5 mb13">Type</div>
        <div className="flex-row-justify pl10 pr20">
          <div>
            <input type="checkbox" name="type_expense" id="type_income" />
            <label htmlFor="type_income">Incomes</label>
          </div>
          <div>
            <input type="checkbox" name="type_expense" id="type_expense" />
            <label htmlFor="type_expense">Expenses</label>
          </div>
        </div>


        <div className="section-title mt30 mb8">Date</div>

        <Formik
          initialValues={{
            dateFrom: format(datesRange.start_date, "dd / MM / yyyy"),
            dateTo: format(datesRange.end_date, "dd / MM / yyyy")
          }}
          onSubmit={async (values) => { }}
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

      <WalletMenuCalendar setDatesRange={setDatesRange} />
    </div>
  )
}

export default WalletMenu
