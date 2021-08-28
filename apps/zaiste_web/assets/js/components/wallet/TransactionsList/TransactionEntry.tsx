import * as React from "react"
import { calculateItemsAmount } from "../helper_functions"
import { UserSettingsContext } from "../../../contexts/UserSettingsContext"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import { Transaction } from "../interfaces"
import { deleteTransaction } from "../../../api_calls/wallet"
import EntryActionIcons from "../../shared/EntryActionIcons"

interface Props {
  transaction: Transaction
  openEditTransactionModal: Function
  openEditTransactionItemsModal: Function
}

const TransactionEntry: React.FC<Props> = ({
  transaction,
  openEditTransactionModal,
  openEditTransactionItemsModal,
}) => {
  const { userSettings } = React.useContext(UserSettingsContext)
  const { removeTransaction } = React.useContext(TransactionsContext)
  const transactionAmount = calculateItemsAmount(transaction.transactionItems).toFixed(2)

  function handleShowClick() {
    openEditTransactionItemsModal({ transactionId: transaction.id })
  }

  function handleEditClick() {
    openEditTransactionModal({ transactionId: transaction.id })
  }

  function handleDeleteClick() {
    deleteTransaction(transaction.id).then(response => {
      if (response.status === 204) removeTransaction(transaction.id)
    })
  }

  return (
    <div className="card event-card mt2">
      <div className="card-summary">
        <div className="transaction-date numeric-font secondary-text">{transaction.date}</div>
        <div className="transaction-name">{transaction.name}</div>
        <div
          className={`transaction-amount mr20 numeric-font ${transaction.income ? "green" : "red"}`}
        >
          {!transaction.income && "-"}
          {transactionAmount} {userSettings.currency}
        </div>
        <EntryActionIcons
          showButtonName="Show transaction"
          handleShowClick={handleShowClick}
          editButtonName="Edit transaction"
          handleEditClick={handleEditClick}
          deleteButtonName="Delete transaction"
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  )
}

export default TransactionEntry
