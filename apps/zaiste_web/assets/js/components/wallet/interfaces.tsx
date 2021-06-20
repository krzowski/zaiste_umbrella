export interface DatesRange {
  startDate: Date
  endDate: Date
}

export interface TransactionsFilters {
  showIncomes: boolean
  showExpenses: boolean
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
