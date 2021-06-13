import * as React from 'react'
import { Formik, Field, Form } from 'formik';

import { TransactionItem } from './Transactions'

interface Props {
  transaction_items: TransactionItem[]
}

const TransactionEntryItems: React.FC<Props> = ({ transaction_items }) => {
  return (
    <div className="card-items">
      {
        transaction_items.map((item, index) => {
          const [removeHovered, setRemoveHovered] = React.useState<boolean>(false)

          return (
            <div className={`card-item ${removeHovered && 'red'}`} key={`item.name ${index}`}>
              <div className="card-item-name">
                {item.name}
              </div>
              <div className="card-item-amount numeric-font">
                {item.amount}
              </div>
              <div className="card-item-actions"
                onMouseEnter={() => setRemoveHovered(true)}
                onMouseLeave={() => setRemoveHovered(false)}
              >
                <i className="fas fa-minus"></i>
              </div>
            </div>
          )
        })
      }

      <div className="card-form">
        <Formik
          initialValues={{
            name: '',
            amount: '',
          }}
          onSubmit={async (values) => { }}
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
  )
}

export default TransactionEntryItems
