import { format } from 'date-fns'
import { DatesRange, Transaction, TransactionItem } from './interfaces'

export function formatDatesRange(datesRange: DatesRange) {
  return {
    startDate: format(datesRange.startDate, "dd / MM / yyyy"),
    endDate: format(datesRange.endDate, "dd / MM / yyyy")
  }
}

export function calculateItemsAmount(items: TransactionItem[]) {
  return items.reduce((sum, item) => {
    return sum + parseFloat(item.amount)
  }, 0)
}

export function calculateTransactionsAmount(transactions: Transaction[], income: boolean) {
  const items = transactions.filter(transaction => (
    transaction.income === income
  )).flatMap(transaction => (
    transaction.transaction_items
  ))

  return calculateItemsAmount(items)
}
