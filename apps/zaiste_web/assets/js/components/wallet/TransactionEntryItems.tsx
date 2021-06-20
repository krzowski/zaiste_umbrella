import * as React from 'react'
import { UserSettingsContext } from '../../contexts/UserSettingsContext'
import { TransactionItem } from './interfaces'

interface Props {
  transaction_items: TransactionItem[]
}

const TransactionEntryItems: React.FC<Props> = ({ transaction_items }) => {
  const { userSettings } = React.useContext(UserSettingsContext)

  return (
    <div className="card-items">
      {
        transaction_items.map((item, index) => {
          const [removeHovered, setRemoveHovered] = React.useState<boolean>(false)

          return (
            <div className={`card-item ${removeHovered && 'red'}`} key={`item.name ${index}`}>
              <div className="card-item-name">
                {item.name}
              </div>
              <div className="card-item-amount numeric-font">
                {item.amount.toFixed(2)} {userSettings.currency}
              </div>
              <div className="card-item-actions"
                onMouseEnter={() => setRemoveHovered(true)}
                onMouseLeave={() => setRemoveHovered(false)}
              >
                <i className="fas fa-minus"></i>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default TransactionEntryItems
