import * as React from "react"
import { UserSettingsContext } from "../../../contexts/UserSettingsContext"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import { balanceColorClass, calculateTransactionsAmount } from "../helper_functions"

const TransactionsSummary: React.FC = () => {
  const { filteredTransactions } = React.useContext(TransactionsContext)
  const incomesAmount = calculateTransactionsAmount(filteredTransactions, true)
  const expensesAmount = calculateTransactionsAmount(filteredTransactions, false)
  const balanceAmount = incomesAmount - expensesAmount

  const { userSettings } = React.useContext(UserSettingsContext)

  return (
    <div className="transactions-summary numeric-font">
      <div className="summary-section flex-row-justify">
        <div className="title">Incomes:</div>
        <div className="green">
          {incomesAmount.toFixed(2)} {userSettings.currency}
        </div>
      </div>
      <div className="summary-section flex-row-justify">
        <div className="title">Expenses:</div>
        <div className="red">
          -{expensesAmount.toFixed(2)} {userSettings.currency}
        </div>
      </div>
      <div className="summary-section flex-row-justify">
        <div className="title">Balance:</div>
        <div className={balanceColorClass(balanceAmount)}>
          {balanceAmount.toFixed(2)} {userSettings.currency}
        </div>
      </div>
    </div>
  )
}

export default TransactionsSummary
