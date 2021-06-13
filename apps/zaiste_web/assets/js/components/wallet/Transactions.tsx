import * as React from 'react'

import useModalCards from '../../hooks/useModalCards'

import TransactionEntry from './TransactionEntry'
import TransactionsSummary from './TransactionsSummary'
import NewTransactionModal from './NewTransactionModal'


export interface TransactionItem {
  name: string
  amount: number
}
export interface Transaction {
  id: number
  name: string
  date: string
  income: boolean
  transaction_items: TransactionItem[]
}

interface Props {
  transactions_data: Transaction[]
}


const Transactions: React.FC<Props> = ({ transactions_data }) => {
  const { openedModals, openModal, closeModal } = useModalCards("new_transaction")

  return (
    <div className="transactions-container">
      <div className="transactions-header mt20 ml15">
        <TransactionsSummary transactions_data={transactions_data} />

        <div className="new-transaction pt17 pr15">
          <button id='add_transaction_button' onClick={openModal}>
            Add transaction
          </button>
        </div>

        {openedModals.map(modal => (
          <NewTransactionModal
            key={modal.modalId}
            modalId={modal.modalId}
            closeModal={closeModal}
          />
        ))}
      </div>

      <div className="transactions-cards custom-scrollbar pr15 pl15 mt20">
        {
          transactions_data.map(transaction => (
            <TransactionEntry
              transaction={transaction}
              key={transaction.id}
            />
          ))
        }
      </div>
    </div>
  )
}


export function calculateTransactionsAmount(transactions: Transaction[], income: boolean) {
  const items = transactions.filter(transaction => (
    transaction.income === income
  )).flatMap(transaction => (
    transaction.transaction_items
  ))

  return calculateItemsAmount(items)
}

export function calculateItemsAmount(items: TransactionItem[]) {
  return items.reduce((sum, item) => {
    return sum + item.amount
  }, 0)
}

export default Transactions
