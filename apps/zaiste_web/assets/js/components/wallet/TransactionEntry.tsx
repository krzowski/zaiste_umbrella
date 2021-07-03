import * as React from 'react'
import { calculateItemsAmount } from './helper_functions'
import { UserSettingsContext } from '../../contexts/UserSettingsContext'
import { Transaction } from './interfaces'


interface Props {
  transaction: Transaction
  openEditTransactionModal: Function
}


const TransactionEntry: React.FC<Props> = ({ transaction, openEditTransactionModal }) => {
  const { userSettings } = React.useContext(UserSettingsContext)
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
          {!transaction.income && '-'}{transaction_amount} {userSettings.currency}
        </div>
        <div className="transaction-items-toggle" onClick={() => openEditTransactionModal({ transaction_id: transaction.id })}>
          <i className="fas fa-edit"></i>
        </div>
      </div>
    </div>
  )
}

export default TransactionEntry
