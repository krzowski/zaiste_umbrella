import * as React from "react"
import { UserSettingsContext } from "../../../contexts/UserSettingsContext"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import TransactionEntry from "./TransactionEntry/TransactionEntry"
import { requestDeleteTransaction } from "../../../api_calls/wallet"

interface Props {
  openEditTransactionModal: Function
  openEditTransactionItemsModal: Function
}

const TransactionsList: React.FC<Props> = ({
  openEditTransactionModal,
  openEditTransactionItemsModal,
}) => {
  const { userSettings } = React.useContext(UserSettingsContext)
  const { filteredTransactions, removeTransaction } = React.useContext(TransactionsContext)

  function handleShowClick(transactionId: number): void {
    openEditTransactionItemsModal({ transactionId })
  }

  function handleEditClick(transactionId: number): void {
    openEditTransactionModal({ transactionId })
  }

  function handleDeleteClick(transactionId: number): void {
    requestDeleteTransaction(transactionId).then(response => {
      if (response.status === 204) removeTransaction(transactionId)
    })
  }

  return (
    <div className="page-main transactions-container">
      <div className="transactions-cards custom-scrollbar pr15 pl15 mt20">
        {filteredTransactions.length ? (
          filteredTransactions.map(transaction => (
            <TransactionEntry
              key={transaction.id}
              transaction={transaction}
              currency={userSettings.currency}
              handleShowClick={() => handleShowClick(transaction.id)}
              handleEditClick={() => handleEditClick(transaction.id)}
              handleDeleteClick={() => handleDeleteClick(transaction.id)}
            />
          ))
        ) : (
          <div className="card event-card mt2 p10">
            <div className="card-summary transaction-name">There are no transactions.</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsList
