export interface DatesRange {
  startDate: Date
  endDate: Date
}

export interface TransactionsFilters {
  showIncomes: boolean
  showExpenses: boolean
}

export interface TransactionItem {
  id: number
  name: string
  amount: string
}

export interface Transaction {
  id: number
  name: string
  date: string
  income: boolean
  transactionItems: TransactionItem[]
}

export interface TransactionFormFields {
  name: string
  date: string
  income: string
}
