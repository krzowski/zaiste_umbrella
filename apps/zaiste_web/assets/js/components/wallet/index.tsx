import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import { TransactionsProvider } from "../../contexts/TransactionsContext"
import { DatesRange } from "./interfaces"
import { requestFetchTransactions } from "../../api_calls/wallet"
import { formatDatesRange } from "./helper_functions"
import useModalCards from "../../hooks/useModalCards"
import TransactionsList from "./TransactionsList"
import WalletMenu from "./menu"
import WalletModals from "./modals"

const today = new Date()
const initialDates = {
  startDate: new Date(today.getFullYear(), today.getMonth(), 1),
  endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
}

const Wallet: React.FC<RouteComponentProps> = () => {
  const [datesRange, setDatesRange] = React.useState<DatesRange>(initialDates)
  const { data } = requestFetchTransactions(formatDatesRange(datesRange))

  const { openedModals: openedNewTransactionModals, openModal: openNewTransactionModal } =
    useModalCards("new_transaction")
  const { openedModals: openedEditTransactionModals, openModal: openEditTransactionModal } =
    useModalCards("edit_transaction")
  const {
    openedModals: openedEditTransactionItemsModals,
    openModal: openEditTransactionItemsModal,
  } = useModalCards("edit_transaction_items")

  return (
    <TransactionsProvider fetchedTransactions={data || []} datesRange={datesRange}>
      <div className="wallet-container">
        <WalletMenu
          datesRange={datesRange}
          setDatesRange={setDatesRange}
          openNewTransactionModal={openNewTransactionModal}
        />

        <TransactionsList
          openEditTransactionModal={openEditTransactionModal}
          openEditTransactionItemsModal={openEditTransactionItemsModal}
        />

        <WalletModals
          openedNewTransactionModals={openedNewTransactionModals}
          openedEditTransactionModals={openedEditTransactionModals}
          openedEditTransactionItemsModals={openedEditTransactionItemsModals}
          openEditTransactionItemsModal={openEditTransactionItemsModal}
        />
      </div>
    </TransactionsProvider>
  )
}

export default Wallet
