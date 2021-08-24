import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { TransactionsProvider } from '../../contexts/TransactionsContext'
import { DatesRange } from './interfaces'
import { fetchTransactions } from '../../api_calls/wallet'
import { formatDatesRange } from './helper_functions'
import TransactionsList from './TransactionsList'
import WalletMenu from './menu'
import useModalCards from '../../hooks/useModalCards'
import NewTransactionModal from './modals/NewTransactionModal'
import EditTransactionModal from './modals/EditTransactionModal'
import EditTransactionItemsModal from './modals/EditTransactionItemsModal'


const today = new Date()
const initialDates = {
  startDate: new Date(today.getFullYear(), today.getMonth(), 1),
  endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
}


const Wallet: React.FC<RouteComponentProps> = () => {
  const [datesRange, setDatesRange] = React.useState<DatesRange>(initialDates)
  const { data } = fetchTransactions(formatDatesRange(datesRange))

  const {
    openedModals: openedNewTransactionModals,
    openModal: openNewTransactionModal,
    closeModal: closeNewTransactionModal
  } = useModalCards("new_transaction")
  const {
    openedModals: openedEditTransactionModals,
    openModal: openEditTransactionModal,
    closeModal: closeEditTransactionModal
  } = useModalCards("edit_transaction")
  const {
    openedModals: openedEditTransactionItemsModals,
    openModal: openEditTransactionItemsModal,
    closeModal: closeEditTransactionItemsModal
  } = useModalCards("edit_transaction_items")

  return (
    <TransactionsProvider
      fetchedTransactions={data || []}
      datesRange={datesRange}
    >
      <div className="wallet-container">
        <TransactionsList
          openEditTransactionModal={openEditTransactionModal}
          openEditTransactionItemsModal={openEditTransactionItemsModal}
        />

        <WalletMenu
          datesRange={datesRange}
          setDatesRange={setDatesRange}
          openNewTransactionModal={openNewTransactionModal}
        />

        {/* MODALS */}

        {openedNewTransactionModals.map(modal => (
          <NewTransactionModal
            key={modal.modalId}
            modalId={modal.modalId}
            closeModal={closeNewTransactionModal}
            openEditTransactionItemsModal={openEditTransactionItemsModal}
          />
        ))}

        {openedEditTransactionModals.map(modal => (
          <EditTransactionModal
            key={modal.modalId}
            modalId={modal.modalId}
            transactionId={modal.additionalProps.transactionId}
            closeModal={closeEditTransactionModal}
          />
        ))}

        {openedEditTransactionItemsModals.map(modal => (
          <EditTransactionItemsModal
            key={modal.modalId}
            modalId={modal.modalId}
            transactionId={modal.additionalProps.transactionId}
            closeModal={closeEditTransactionItemsModal}
          />
        ))}
      </div>
    </TransactionsProvider>
  )
}

export default Wallet
