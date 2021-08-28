/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"
import { compareAsc, parseISO, isWithinInterval } from "date-fns"
import {
  Transaction,
  TransactionItem,
  DatesRange,
  TransactionsFilters,
} from "../components/wallet/interfaces"

interface Props {
  fetchedTransactions: Transaction[]
  datesRange: DatesRange
  children: JSX.Element
}

export const TransactionsContext = React.createContext<{
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
  addTransaction: Function
  addTransactionItem: Function
  editTransaction: Function
  removeTransaction: Function
  removeTransactionItem: Function
  transactionsFilters: TransactionsFilters
  setTransactionsFilters: React.Dispatch<React.SetStateAction<TransactionsFilters>>
}>({} as any)

const initialTransactionFilters = {
  showIncomes: true,
  showExpenses: true,
}

export const TransactionsProvider: React.FC<Props> = ({
  fetchedTransactions,
  datesRange,
  children,
}) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>(fetchedTransactions)
  const [transactionsFilters, setTransactionsFilters] =
    React.useState<TransactionsFilters>(initialTransactionFilters)

  // transactions must include all previously fetched data because opened modals may
  // still be using them.
  React.useEffect(() => {
    const unfetchedTransactions = transactions.filter(
      t => !fetchedTransactions.find(ft => ft.id === t.id)
    )
    setTransactions([...unfetchedTransactions, ...fetchedTransactions])
  }, [fetchedTransactions])

  function sortedFilteredData(transactionsData: Transaction[]): Transaction[] {
    const filteredData = transactionsData
      .filter(transaction => {
        // income / expense filter
        if (transactionsFilters.showIncomes && transaction.income) return true
        if (transactionsFilters.showExpenses && !transaction.income) return true
        return false
      })
      .filter(transaction => {
        // dates filter
        return isWithinInterval(parseISO(transaction.date), {
          start: datesRange.startDate,
          end: datesRange.endDate,
        })
      })

    return sortTransactions(filteredData)
  }

  function sortTransactions(transactionsData: Transaction[]): Transaction[] {
    return transactionsData.sort((t1, t2) => compareAsc(parseISO(t1.date), parseISO(t2.date)))
  }

  function addTransaction(newTransaction: Transaction) {
    setTransactions([...transactions, newTransaction])
  }

  function addTransactionItem(transaction: Transaction, transactionItem: TransactionItem) {
    const changedTransaction = { ...transaction }
    changedTransaction.transactionItems = [...transaction.transactionItems, transactionItem]
    editTransaction(changedTransaction)
  }

  function editTransaction(editedTransaction: Transaction) {
    const unchangedTransactions = transactions.filter(t => t.id !== editedTransaction.id)
    setTransactions([...unchangedTransactions, editedTransaction])
  }

  function removeTransaction(transactionId: number) {
    const remainingTransactions = transactions.filter(t => t.id !== transactionId)
    setTransactions(remainingTransactions)
  }

  function removeTransactionItem(transaction: Transaction, transactionItemId: number) {
    const changedTransaction = { ...transaction }
    changedTransaction.transactionItems = transaction.transactionItems.filter(
      item => item.id !== transactionItemId
    )
    editTransaction(changedTransaction)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        filteredTransactions: sortedFilteredData(transactions),
        setTransactions,
        addTransaction,
        addTransactionItem,
        editTransaction,
        removeTransaction,
        removeTransactionItem,
        transactionsFilters,
        setTransactionsFilters,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
