import * as React from 'react'
import { Transaction, TransactionItem, DatesRange, TransactionsFilters } from '../components/wallet/interfaces'
import { compareAsc, parseISO, isWithinInterval } from 'date-fns'

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
  showExpenses: true
}


export const TransactionsProvider: React.FC<Props> = ({ fetchedTransactions, datesRange, children }) => {
  const [transactions, setTransactions] = React.useState<Transaction[]>(fetchedTransactions)
  const [transactionsFilters, setTransactionsFilters] = React.useState<TransactionsFilters>(initialTransactionFilters)

  // In case EditTransactionModals are opened when transations are outside the dates range,
  // transactions state must contain all previously fetched transactions.
  React.useEffect(() => {
    const unfetchedTransactions = transactions.filter(t => (
      !fetchedTransactions.find(ft => ft.id === t.id)
    ))
    setTransactions([...unfetchedTransactions, ...fetchedTransactions])
  }, [fetchedTransactions])


  function sortedFilteredData(transactionsData: Transaction[]): Transaction[] {
    const filteredData = transactionsData.filter(transaction => {
      // income / expense filter
      if (transactionsFilters.showIncomes && transaction.income) return true
      if (transactionsFilters.showExpenses && !transaction.income) return true
    }).filter(transaction => {
      // dates filter
      return isWithinInterval(
        parseISO(transaction.date),
        {
          start: datesRange.startDate,
          end: datesRange.endDate
        }
      )
    })

    return sortTransactions(filteredData)
  }

  function sortTransactions(transactionsData: Transaction[]): Transaction[] {
    return transactionsData.sort((t1, t2) => compareAsc(parseISO(t1.date), parseISO(t2.date)))
  }

  function addTransaction(newTransaction: Transaction) {
    setTransactions([...transactions, newTransaction])
  }

  function addTransactionItem(transaction: Transaction, transaction_item: TransactionItem) {
    transaction.transaction_items = [...transaction.transaction_items, transaction_item]
    editTransaction(transaction)
  }

  function editTransaction(editedTransaction: Transaction) {
    const unchangedTransactions = transactions.filter(t => t.id !== editedTransaction.id)
    setTransactions([...unchangedTransactions, editedTransaction])
  }

  function removeTransaction(transaction_id: number) {
    const remainingTransactions = transactions.filter(t => t.id !== transaction_id)
    setTransactions(remainingTransactions)
  }

  function removeTransactionItem(transaction: Transaction, transaction_item_id: number) {
    transaction.transaction_items = transaction.transaction_items.filter(item => item.id !== transaction_item_id)
    editTransaction(transaction)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions: transactions,
        filteredTransactions: sortedFilteredData(transactions),
        setTransactions,
        addTransaction,
        addTransactionItem,
        editTransaction,
        removeTransaction,
        removeTransactionItem,
        transactionsFilters,
        setTransactionsFilters
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
