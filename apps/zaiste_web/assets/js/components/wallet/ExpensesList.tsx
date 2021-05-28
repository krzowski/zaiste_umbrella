import * as React from 'react'

interface ExpenseItem {
  id: number
  name: string
  amount: number
}

interface Expenses {
  date: string // YYYY-MM-DD
  name: string
  expense_items: Array<ExpenseItem>
}

interface Props {
  expenses_data: Array<Expenses>
}

const ExpensesList: React.FC<Props> = ({expenses_data}) => {
  return (
    <div className="expenses">

    </div>
  )
}

export default ExpensesList
