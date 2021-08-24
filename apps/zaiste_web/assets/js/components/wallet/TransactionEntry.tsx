import * as React from 'react'
import { calculateItemsAmount } from './helper_functions'
import { UserSettingsContext } from '../../contexts/UserSettingsContext'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Transaction } from './interfaces'
import { deleteTransaction } from '../../api_calls/wallet'


interface Props {
  transaction: Transaction
  openEditTransactionModal: Function
  openEditTransactionItemsModal: Function
}


const TransactionEntry: React.FC<Props> = ({ transaction, openEditTransactionModal, openEditTransactionItemsModal }) => {
  const { userSettings } = React.useContext(UserSettingsContext)
  const { removeTransaction } = React.useContext(TransactionsContext)
  const transaction_amount = calculateItemsAmount(transaction.transaction_items).toFixed(2)

  function handleDeleteClick() {
    deleteTransaction(transaction.id)
      .then(response => {
        if (response.status === 204) removeTransaction(transaction.id)
      })
  }

  return (
    <div className="card event-card mt2">
      <div className="card-summary">
        <div className="transaction-date numeric-font secondary-text">
          {transaction.date}
        </div>
        <div className="transaction-name">
          {transaction.name}
        </div>
        <div className={`transaction-amount mr20 numeric-font ${transaction.income ? 'green' : 'red'}`}>
          {!transaction.income && '-'}{transaction_amount} {userSettings.currency}
        </div>
        <div className="action-icons d-f">
          <i className="fas fa-list" onClick={() => openEditTransactionItemsModal({ transactionId: transaction.id })}></i>
          <i className="fas fa-edit" onClick={() => openEditTransactionModal({ transactionId: transaction.id })}></i>
          <i className="fas fa-trash remove-icon" onClick={handleDeleteClick}></i>
        </div>
      </div>
    </div>
  )
}

export default TransactionEntry
