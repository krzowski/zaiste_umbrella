import * as React from 'react'
import useModalCards from '../../hooks/useModalCards'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import TransactionEntry from './TransactionEntry'
import TransactionsSummary from './TransactionsSummary'
import NewTransactionModal from './NewTransactionModal'
import EditTransactionModal from './EditTransactionModal'


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
          openEditTransactionModal={openEditTransactionModal}
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
    </div>
  )
}

export default Transactions
