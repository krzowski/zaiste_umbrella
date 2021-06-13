import * as React from 'react'

import TransactionEntry from './TransactionEntry'

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
  const incomesAmount = calculateTransactionsAmount(transactions_data, true)
  const expensesAmount = calculateTransactionsAmount(transactions_data, false)
  const balanceAmount = incomesAmount - expensesAmount
  const balanceColorClass = balanceAmount > 0 ? 'green' : balanceAmount < 0 ? 'red' : ''

  return (
    <div className="transactions-container">
      <div className="transactions-header mt20 ml15">
        <div className="transactions-summary numeric-font">
          <div className="summary-section flex-row-justify">
            <div className="title">Incomes:</div>
            <div className="green">
              {incomesAmount.toFixed(2)}
            </div>
          </div>
          <div className="summary-section flex-row-justify">
            <div className="title">Expenses:</div>
            <div className="red">
              -{expensesAmount.toFixed(2)}
            </div>
          </div>
          <div className="summary-section flex-row-justify">
            <div className="title">Balance:</div>
            <div className={balanceColorClass}>
              {balanceAmount.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="new-transaction pt17 pr15">
          <button >Add transaction</button>
        </div>
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
