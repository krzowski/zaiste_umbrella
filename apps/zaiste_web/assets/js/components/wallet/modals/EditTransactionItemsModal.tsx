import * as React from 'react'
import { calculateItemsAmount } from '../helper_functions'
import TransactionItemEntry from './TransactionItemEntry'
import { TransactionsContext } from '../../../contexts/TransactionsContext'
import { UserSettingsContext } from '../../../contexts/UserSettingsContext'
import ModalCard from '../../shared/ModalCard'
import { Transaction } from '../interfaces'
import TransactionItemForm from './TransactionItemForm'


interface Props {
  modalId: string
  transactionId: number
  closeModal: Function
}


const EditTransactionItemsModal: React.FC<Props> = ({ modalId, transactionId, closeModal }) => {
  const { transactions } = React.useContext(TransactionsContext)
  const transaction: Transaction | undefined = transactions.find(t => t.id === transactionId)
  if (!transaction) return null

  const { userSettings } = React.useContext(UserSettingsContext)
  const transactionAmount = calculateItemsAmount(transaction.transactionItems).toFixed(2)

  return (
    <ModalCard
      modalId={modalId}
      modalTitle={`${transaction.date} - ${transaction.name}`}
      closeModal={closeModal}
      modalWidth={window.innerWidth - 560}
      modalHeight={150 + transaction.transactionItems.length * 22}
      initialTopPosition={20}
      initialLeftPosition={280}
    >
      <div className="edit-transaction pt20 pr20 pb20">
        <div className="card no-background event-card mt2">
          <div className="card-summary">
            <div className="transaction-name">
              {transaction.name}
            </div>
            <div className={`transaction-amount numeric-font ${transaction.income ? 'green' : 'red'}`}>
              {!transaction.income && '-'}{transactionAmount} {userSettings.currency}
            </div>
            <div className="transaction-items-toggle" />
          </div>

          <div className="card-items">
            {transaction.transactionItems.map(item => (
              <TransactionItemEntry
                key={item.id}
                transaction={transaction}
                transactionItem={item}
                currency={userSettings.currency}
              />
            ))}
          </div>
        </div>

        <div className="card-form">
          <TransactionItemForm transaction={transaction} />
        </div>
      </div>
    </ModalCard>
  )
}

export default EditTransactionItemsModal
