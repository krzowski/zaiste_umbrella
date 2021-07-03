import * as React from 'react'
import useModalCards from '../../hooks/useModalCards'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import TransactionEntry from './TransactionEntry'
import TransactionsSummary from './TransactionsSummary'
import NewTransactionModal from './NewTransactionModal'
import EditTransactionModal from './EditTransactionModal'
import EditTransactionItemsModal from './EditTransactionItemsModal'


const Transactions: React.FC = () => {
  const { transactions, filteredTransactions } = React.useContext(TransactionsContext)
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
    <div className="transactions-container">
      <div className="transactions-header mt20 ml15">
        <TransactionsSummary />

        <div className="new-transaction pt17 pr15">
          <button id='add_transaction_button' onClick={openNewTransactionModal}>
            Add transaction
          </button>
        </div>
      </div>

      <div className="transactions-cards custom-scrollbar pr15 pl15 mt20">
        {filteredTransactions.length ?
          filteredTransactions.map(transaction => (
            <TransactionEntry
              key={transaction.id}
              transaction={transaction}
              openEditTransactionModal={openEditTransactionModal}
              openEditTransactionItemsModal={openEditTransactionItemsModal}
            />
          ))
          :
          <div className="card event mt2 p10">
            <div className="card-summary transaction-name">
              There are no transactions.
            </div>
          </div>
        }
      </div>

      { openedNewTransactionModals.map(modal => (
        <NewTransactionModal
          key={modal.modalId}
          modalId={modal.modalId}
          closeModal={closeNewTransactionModal}
          openEditTransactionItemsModal={openEditTransactionItemsModal}
        />
      ))}

      { openedEditTransactionModals.map(modal => {
        const transaction = transactions.find(t => t.id == modal.additionalProps.transaction_id)
        if (!transaction) return null

        return <EditTransactionModal
          key={modal.modalId}
          modalId={modal.modalId}
          closeModal={closeEditTransactionModal}
          transaction={transaction}
        />
      })}

      { openedEditTransactionItemsModals.map(modal => {
        const transaction = transactions.find(t => t.id == modal.additionalProps.transaction_id)
        if (!transaction) return null

        return <EditTransactionItemsModal
          key={modal.modalId}
          modalId={modal.modalId}
          closeModal={closeEditTransactionItemsModal}
          transaction={transaction}
        />
      })}
    </div>
  )
}

export default Transactions
