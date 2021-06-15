import * as React from 'react'

import { calculateTransactionsAmount } from './Transactions'

import { Transaction } from './interfaces'


interface Props {
  transactions_data: Transaction[]
}


const TransactionsSummary: React.FC<Props> = ({ transactions_data }) => {
  const incomesAmount = calculateTransactionsAmount(transactions_data, true)
  const expensesAmount = calculateTransactionsAmount(transactions_data, false)
  const balanceAmount = incomesAmount - expensesAmount
  const balanceColorClass = balanceAmount > 0 ? 'green' : balanceAmount < 0 ? 'red' : ''

  return (
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
  )
}

export default TransactionsSummary
