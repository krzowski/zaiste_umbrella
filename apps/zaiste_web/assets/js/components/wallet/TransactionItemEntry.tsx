import * as React from 'react'
import { Transaction, TransactionItem } from './interfaces'


interface Props {
  transaction: Transaction
  transaction_item: TransactionItem
  currency: string
  handleRemoveClick: Function
}

const TransactionItemEntry: React.FC<Props> = ({ transaction, transaction_item, currency, handleRemoveClick }) => {
  const [removeHovered, setRemoveHovered] = React.useState<boolean>(false)

  return (
    <div className={`card-item ${removeHovered && 'red'}`} key={transaction_item.id}>
      <div className="card-item-name">
        {transaction_item.name}
      </div>
      <div className="card-item-amount numeric-font">
        {parseFloat(transaction_item.amount).toFixed(2)} {currency}
      </div>
      <div className="card-item-actions" onClick={() => handleRemoveClick(transaction, transaction_item.id)}
        onMouseEnter={() => setRemoveHovered(true)}
        onMouseLeave={() => setRemoveHovered(false)}
      >
        <i className="fas fa-minus"></i>
      </div>
    </div>
  )
}

export default TransactionItemEntry
