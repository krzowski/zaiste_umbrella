import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Formik, Field, Form } from 'formik';
import { format } from 'date-fns'
import useFetch from '../../hooks/useFetch'



const Wallet: React.FC<RouteComponentProps> = () => {
  const today = new Date()
  const [date, setDate] = React.useState<Date>(today)

  const [filtersHeight, setFiltersHeight] = React.useState<number>(0)

  // const { isLoading, data, errorMessage } = useFetch('/calendar_events/month_events', { date: format(calendarDate, 'yyyy-MM-dd') })


  React.useEffect( () => {
    setFiltersHeight(document.querySelector('.wallet-filters').clientHeight)
  }, []) // height will depend on number of labels

  return (
    <div className="wallet-container">

      <div className="transactions-container">
        <div className="transactions-summary mt20 ml15">
          <div className="summary-section p15">
            Incomes:
            <div className="green numeric-font">6200.00</div>
          </div>
          <div className="summary-section">
            Expenses:
            <div className="red numeric-font">-4500.00</div>
          </div>
          <div className="summary-section">
            Balance:
            <div className="yellow numeric-font">1700.00</div>
          </div>
        </div>

        <div className="transactions-cards custom-scrollbar pr15 pl15 mt30">
          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                1 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy w biedronce
              </div>
              <div className="transaction-amount numeric-font red">
                20.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                2 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy na allegro
              </div>
              <div className="transaction-amount numeric-font red">
                420.32
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items">
              <div className="card-item">
                <div className="card-item-name">
                  Morszczuk filet 950g
                </div>
                <div className="card-item-amount numeric-font">
                  17.99zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Trio warzywne 750g
                </div>
                <div className="card-item-amount numeric-font">
                  4.49zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Krem do opalania Garnier 200ml x2
                </div>
                <div className="card-item-amount numeric-font">
                  23.98zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Masło orzechowe Vitanella 450g x2
                </div>
                <div className="card-item-amount numeric-font">
                  14.98zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Chleb z makiem 500g
                </div>
                <div className="card-item-amount numeric-font">
                  2.89zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Pomidor gałązka 2.105kg (2.99zł)
                </div>
                <div className="card-item-amount numeric-font">
                  6.21zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Banany 1.085kg (4.99zł)
                </div>
                <div className="card-item-amount numeric-font">
                  5.41zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Rzodkiewka
                </div>
                <div className="card-item-amount numeric-font">
                  0.99zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-item">
                <div className="card-item-name">
                  Makrela tusza wędzona 0.276kg (14.90zł)
                </div>
                <div className="card-item-amount numeric-font">
                  4.11zł
                </div>
                <div className="card-item-actions">
                  <i className="fas fa-minus"></i>
                </div>
              </div>

              <div className="card-form">
                <Formik
                  initialValues={{
                    name: '',
                    amount: '',
                  }}
                  onSubmit={async (values) => {}}
                >
                  <Form>
                    <div className="form-name">
                      <Field id="name" name="name" placeholder="Name" />
                    </div>
                    <div className="form-amount">
                      <Field id="amount" name="amount" placeholder="Amount" />
                    </div>
                    <div className="form-button">
                      <button type="submit">Add</button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                5 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy w carrefourze
              </div>
              <div className="transaction-amount numeric-font red">
                230.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                11 / 03 / 2020
              </div>
              <div className="transaction-name">
                Czynsz
              </div>
              <div className="transaction-amount numeric-font red">
                1220.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>


          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                1 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy w biedronce
              </div>
              <div className="transaction-amount numeric-font red">
                20.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                2 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy na allegro
              </div>
              <div className="transaction-amount numeric-font red">
                420.32
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                5 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy w carrefourze
              </div>
              <div className="transaction-amount numeric-font red">
                230.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                11 / 03 / 2020
              </div>
              <div className="transaction-name">
                Czynsz
              </div>
              <div className="transaction-amount numeric-font red">
                1220.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>


          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                1 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy w biedronce
              </div>
              <div className="transaction-amount numeric-font red">
                20.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                2 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy na allegro
              </div>
              <div className="transaction-amount numeric-font red">
                420.32
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                5 / 03 / 2020
              </div>
              <div className="transaction-name">
                Zakupy w carrefourze
              </div>
              <div className="transaction-amount numeric-font red">
                230.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

          <div className="card event-card p10 mt2">
            <div className="card-summary">
              <div className="transaction-date numeric-font">
                11 / 03 / 2020
              </div>
              <div className="transaction-name">
                Czynsz
              </div>
              <div className="transaction-amount numeric-font red">
                1220.03
              </div>
              <div className="transaction-items-toggle">
                <i className="fas fa-bars"></i>
              </div>
            </div>

            <div className="card-items d-none">

            </div>
          </div>

        </div>

      </div>







      <div className="wallet-menu">
        <div className="wallet-filters mt30">
          <div className="section-title mt20">Labels</div>
          <div className="labels">
            <div className="label">Food</div>
            <div className="label">Leisure</div>
          </div>


          <div className="section-title mt30 mb15">Type</div>
          <input type="checkbox" name="type_expense" id="type_expense" />
          <label htmlFor="type_expense">Expense</label>
          <input type="checkbox" name="type_expense" id="type_income" />
          <label htmlFor="type_income">Income</label>

          <div className="section-title mt30 mb15">Date</div>

          <Formik
            initialValues={{
              dateFrom: format(new Date(today.getFullYear(), today.getMonth(), 1), "dd / MM / yyyy"),
              dateTo: format(new Date(today.getFullYear(), today.getMonth()+1, 1), "dd / MM / yyyy")
            }}
            onSubmit={async (values) => {}}
          >
            <Form>
              <div className="row">
                <label htmlFor="dateFrom">Date from</label>
                <Field id="dateFrom" name="dateFrom" />
              </div>

              <div className="row">
                <label htmlFor="dateTo">Date to</label>
                <Field id="dateTo" name="dateTo" />
              </div>

              <div className="form-button">
                <button type="submit">Filter</button>
              </div>
            </Form>
          </Formik>
        </div>

        <div className="wallet-months-year">
          <div className="year">2020</div>
          <div className='calendar-nav-arrows'>
            <span onClick={() => "prev year"}>&#8249;</span>
            <span onClick={() => "next year"}>&#8250;</span>
          </div>
        </div>
        <div className="section-title mt30 mb5">2020</div>
        <div className="wallet-months custom-scrollbar pl10" style={{height: `calc(100vh - ${filtersHeight}px - 95px)`}}>
          <div className="wallet-month">January</div>
          <div className="wallet-month">February</div>
          <div className="wallet-month">March</div>
          <div className="wallet-month">April</div>
          <div className="wallet-month">May</div>
          <div className="wallet-month">June</div>
          <div className="wallet-month">July</div>
          <div className="wallet-month">August</div>
          <div className="wallet-month">September</div>
          <div className="wallet-month">October</div>
          <div className="wallet-month">November</div>
          <div className="wallet-month">December</div>
        </div>

      </div>
    </div>

  )
}

export default Wallet
