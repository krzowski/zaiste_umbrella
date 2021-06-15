export interface DatesRange {
  start_date: Date
  end_date: Date
}

export interface TransactionsFilters {
  show_incomes: boolean
  show_expenses: boolean
}

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
