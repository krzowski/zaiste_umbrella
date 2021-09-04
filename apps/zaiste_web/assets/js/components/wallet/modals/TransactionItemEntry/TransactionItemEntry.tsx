import * as React from "react"
import { TransactionItem } from "../../interfaces"

interface Props {
  transactionItem: TransactionItem
  currency: string
  handleRemoveItemClick: React.MouseEventHandler<HTMLDivElement>
}

const TransactionItemEntry: React.FC<Props> = ({
  transactionItem,
  currency,
  handleRemoveItemClick,
}) => {
  const [removeHovered, setRemoveHovered] = React.useState<boolean>(false)
  const { id, name, amount } = transactionItem
  const formattedAmount = parseFloat(amount).toFixed(2)

  return (
    <div className={`card-item ${removeHovered && "red"}`} key={id}>
      <div className="card-item-name">{name}</div>
      <div className="card-item-amount numeric-font">
        {formattedAmount} {currency}
      </div>
      <div
        className="card-item-actions"
        role="button"
        onClick={handleRemoveItemClick}
        onMouseEnter={() => setRemoveHovered(true)}
        onMouseLeave={() => setRemoveHovered(false)}
      >
        <i className="fas fa-minus" />
      </div>
    </div>
  )
}

export default TransactionItemEntry
