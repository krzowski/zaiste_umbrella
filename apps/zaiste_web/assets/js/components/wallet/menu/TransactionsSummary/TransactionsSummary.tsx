import * as React from "react"
import {
  balanceColorClass,
  calculateIncomesAmount,
  calculateExpensesAmount,
} from "../../helper_functions"
import { Transaction } from "../../interfaces"

interface Props {
  transactions: Transaction[]
  currency: string
}

const TransactionsSummary: React.FC<Props> = ({ transactions, currency }) => {
  const incomesAmount = calculateIncomesAmount(transactions)
  const expensesAmount = calculateExpensesAmount(transactions)
  const balanceAmount = incomesAmount - expensesAmount

  return (
    <div className="transactions-summary numeric-font">
      <div className="summary-section flex-row-justify">
        <div className="title">Incomes:</div>
        <div className="green">
          {incomesAmount.toFixed(2)} {currency}
        </div>
      </div>
      <div className="summary-section flex-row-justify">
        <div className="title">Expenses:</div>
        <div className="red">
          -{expensesAmount.toFixed(2)} {currency}
        </div>
      </div>
      <div className="summary-section flex-row-justify">
        <div className="title">Balance:</div>
        <div className={balanceColorClass(balanceAmount)}>
          {balanceAmount.toFixed(2)} {currency}
        </div>
      </div>
    </div>
  )
}

export default TransactionsSummary
