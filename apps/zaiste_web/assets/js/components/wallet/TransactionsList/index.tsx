import * as React from "react"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import TransactionEntry from "./TransactionEntry"

interface Props {
  openEditTransactionModal: Function
  openEditTransactionItemsModal: Function
}

const TransactionsList: React.FC<Props> = ({
  openEditTransactionModal,
  openEditTransactionItemsModal,
}) => {
  const { filteredTransactions } = React.useContext(TransactionsContext)

  return (
    <div className="transactions-container">
      <div className="transactions-cards custom-scrollbar pr15 pl15 mt20">
        {filteredTransactions.length ? (
          filteredTransactions.map(transaction => (
            <TransactionEntry
              key={transaction.id}
              transaction={transaction}
              openEditTransactionModal={openEditTransactionModal}
              openEditTransactionItemsModal={openEditTransactionItemsModal}
            />
          ))
        ) : (
          <div className="card event mt2 p10">
            <div className="card-summary transaction-name">There are no transactions.</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsList
