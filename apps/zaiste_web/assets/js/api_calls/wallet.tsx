import useFetch from '../hooks/useFetch'

export function fetchTransactions(formattedDatesRange: object) {
  return useFetch('/api/wallet/transactions', formattedDatesRange)
}

export function createTransaction(transaction_data: object) {
  return fetch("/api/transactions/", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transaction: transaction_data })
  })
}

export function updateTransaction(transaction_id: number, transaction_data: object) {
  return fetch(`/api/transactions/${transaction_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transaction: transaction_data })
  })
}

export function deleteTransaction(transaction_id: number) {
  return fetch(`/api/transactions/${transaction_id}`, {
    method: 'DELETE'
  })
}

export function createTransactionItem(transaction_id: number, transaction_item_data: object) {
  return fetch(`/api/transactions/${transaction_id}/transaction_items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transaction_item: transaction_item_data })
  })
}

export function deleteTransactionItem(transaction_id: number, transaction_item_id: number) {
  return fetch(`/api/transactions/${transaction_id}/transaction_items/${transaction_item_id}`, {
    method: 'DELETE'
  })
}
