import * as React from 'react'
import { deleteTransactionItem } from '../../../api_calls/wallet'
import { TransactionsContext } from '../../../contexts/TransactionsContext'
import { Transaction, TransactionItem } from '../interfaces'


interface Props {
  transaction: Transaction
  transactionItem: TransactionItem
  currency: string
}


const TransactionItemEntry: React.FC<Props> = ({ transaction, transactionItem, currency }) => {
  const [removeHovered, setRemoveHovered] = React.useState<boolean>(false)
  const { removeTransactionItem } = React.useContext(TransactionsContext)

  function handleRemoveClick() {
    deleteTransactionItem(transaction.id, transactionItem.id)
      .then(response => {
        if (response.status === 204) removeTransactionItem(transaction, transactionItem.id)
      })
  }

  return (
    <div className={`card-item ${removeHovered && 'red'}`} key={transactionItem.id}>
      <div className="card-item-name">
        {transactionItem.name}
      </div>
      <div className="card-item-amount numeric-font">
        {parseFloat(transactionItem.amount).toFixed(2)} {currency}
      </div>
      <div
        className="card-item-actions"
        role="button"
        aria-label="Remove"
        tabIndex={0}
        onClick={handleRemoveClick}
        onKeyPress={handleRemoveClick}
        onMouseEnter={() => setRemoveHovered(true)}
        onMouseLeave={() => setRemoveHovered(false)}
      >
        <i className="fas fa-minus" />
      </div>
    </div>
  )
}

export default TransactionItemEntry
