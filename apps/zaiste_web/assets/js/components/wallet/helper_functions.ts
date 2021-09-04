import { format } from "date-fns"
import { DatesRange, Transaction, TransactionItem } from "./interfaces"

export function formatDatesRange(datesRange: DatesRange) {
  return {
    startDate: format(datesRange.startDate, "dd / MM / yyyy"),
    endDate: format(datesRange.endDate, "dd / MM / yyyy"),
  }
}

export function calculateItemsAmount(items: TransactionItem[]) {
  return items.reduce((sum, item) => sum + parseFloat(item.amount), 0)
}

function calculateTransactionsTypeAmount(transactions: Transaction[], income: boolean) {
  const items = transactions
    .filter(transaction => transaction.income === income)
    .flatMap(transaction => transaction.transactionItems)

  return calculateItemsAmount(items)
}

export function calculateIncomesAmount(transactions: Transaction[]) {
  return calculateTransactionsTypeAmount(transactions, true)
}

export function calculateExpensesAmount(transactions: Transaction[]) {
  return calculateTransactionsTypeAmount(transactions, false)
}

export function balanceColorClass(balanceAmount: number) {
  if (balanceAmount > 0) return "green"
  if (balanceAmount < 0) return "red"
  return ""
}
