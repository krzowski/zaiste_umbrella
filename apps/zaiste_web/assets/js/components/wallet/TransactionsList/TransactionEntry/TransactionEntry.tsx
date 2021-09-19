import * as React from "react"
import { calculateItemsAmount } from "../../helper_functions"
import { Transaction } from "../../interfaces"
import EntryActionIcons from "../../../shared/EntryActionIcons/EntryActionIcons"

interface Props {
  transaction: Transaction
  handleShowClick: Function
  handleEditClick: Function
  handleDeleteClick: Function
  currency: string
}

const TransactionEntry: React.FC<Props> = ({
  transaction,
  currency,
  handleShowClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  const transactionAmount = calculateItemsAmount(transaction.transactionItems).toFixed(2)

  return (
    <div className="card event-card mt2">
      <div className="card-summary">
        <div className="transaction-date numeric-font secondary-text">{transaction.date}</div>
        <div className="transaction-name">{transaction.name}</div>
        <div
          className={`transaction-amount mr20 numeric-font ${transaction.income ? "green" : "red"}`}
        >
          {!transaction.income && "-"}
          {transactionAmount} {currency}
        </div>
        <EntryActionIcons
          handleShowClick={handleShowClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  )
}

export default TransactionEntry
