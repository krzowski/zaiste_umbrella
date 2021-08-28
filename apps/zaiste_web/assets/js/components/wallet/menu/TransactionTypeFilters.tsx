import * as React from "react"
import { TransactionsContext } from "../../../contexts/TransactionsContext"

const TransactionTypeFilters: React.FC = () => {
  const { transactionsFilters, setTransactionsFilters } = React.useContext(TransactionsContext)

  function toggleIncomes() {
    setTransactionsFilters({
      ...transactionsFilters,
      showIncomes: !transactionsFilters.showIncomes,
    })
  }

  function toggleExpenses() {
    setTransactionsFilters({
      ...transactionsFilters,
      showExpenses: !transactionsFilters.showExpenses,
    })
  }

  return (
    <div className="flex-row-justify pr20">
      <div>
        <input
          type="checkbox"
          name="type_income"
          id="type_income"
          checked={transactionsFilters.showIncomes}
          onChange={toggleIncomes}
        />
        <label htmlFor="type_income">Incomes</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="type_expense"
          id="type_expense"
          checked={transactionsFilters.showExpenses}
          onChange={toggleExpenses}
        />
        <label htmlFor="type_expense">Expenses</label>
      </div>
    </div>
  )
}

export default TransactionTypeFilters
