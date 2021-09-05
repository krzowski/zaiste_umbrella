import * as React from "react"
import { TransactionsFilters } from "../../interfaces"

interface Props {
  transactionsFilters: TransactionsFilters
  toggleShowIncomes: React.ChangeEventHandler<HTMLInputElement>
  toggleShowExpenses: React.ChangeEventHandler<HTMLInputElement>
}

const TransactionTypeFilters: React.FC<Props> = ({
  transactionsFilters,
  toggleShowIncomes,
  toggleShowExpenses,
}) => (
  <>
    <div className="section-title mt30 pt5 mb13">Type</div>

    <div className="flex-row-justify pr20">
      <div>
        <input
          type="checkbox"
          name="type_income"
          id="type_income"
          checked={transactionsFilters.showIncomes}
          onChange={toggleShowIncomes}
        />
        <label htmlFor="type_income">Incomes</label>
      </div>

      <div>
        <input
          type="checkbox"
          name="type_expense"
          id="type_expense"
          checked={transactionsFilters.showExpenses}
          onChange={toggleShowExpenses}
        />
        <label htmlFor="type_expense">Expenses</label>
      </div>
    </div>
  </>
)

export default TransactionTypeFilters
