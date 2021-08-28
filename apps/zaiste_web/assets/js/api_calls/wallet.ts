import useFetch from "../hooks/useFetch"

export function fetchTransactions(formattedDatesRange: object) {
  return useFetch("/api/wallet/transactions", formattedDatesRange)
}

export function createTransaction(transactionData: object) {
  return fetch("/api/transactions/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction: transactionData }),
  })
}

export function updateTransaction(transactionId: number, transactionData: object) {
  return fetch(`/api/transactions/${transactionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction: transactionData }),
  })
}

export function deleteTransaction(transactionId: number) {
  return fetch(`/api/transactions/${transactionId}`, {
    method: "DELETE",
  })
}

export function createTransactionItem(transactionId: number, transactionItemData: object) {
  return fetch(`/api/transactions/${transactionId}/transaction_items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction_item: transactionItemData }),
  })
}

export function deleteTransactionItem(transactionId: number, transactionItemId: number) {
  return fetch(`/api/transactions/${transactionId}/transaction_items/${transactionItemId}`, {
    method: "DELETE",
  })
}
