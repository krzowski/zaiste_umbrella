import * as React from 'react'
import { calculateItemsAmount } from './Transactions'

import TransactionEntryItems from './TransactionEntryItems'

import { Transaction } from './interfaces'


interface Props {
  transaction: Transaction
}


const TransactionEntry: React.FC<Props> = ({ transaction }) => {
  const [areItemsOpened, setAreItemsOpened] = React.useState<boolean>(false)

  const transaction_amount = calculateItemsAmount(transaction.transaction_items).toFixed(2)

  return (
    <div className="card event-card p10 mt2">
      <div className="card-summary">
        <div className="transaction-date numeric-font">
          {transaction.date}
        </div>
        <div className="transaction-name">
          {transaction.name}
        </div>
        <div className={`transaction-amount numeric-font ${transaction.income ? 'green' : 'red'}`}>
          {!transaction.income && '-'}{transaction_amount}
        </div>
        <div className="transaction-items-toggle" onClick={() => setAreItemsOpened(!areItemsOpened)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>

      {areItemsOpened &&
        <TransactionEntryItems transaction_items={transaction.transaction_items} />
      }

    </div>
  )
}

export default TransactionEntry
