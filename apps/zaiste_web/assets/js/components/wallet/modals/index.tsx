import * as React from "react"
import { UserSettingsContext } from "../../../contexts/UserSettingsContext"
import { TransactionsContext } from "../../../contexts/TransactionsContext"
import { Modal } from "../../../hooks/useModalCards"
import { Transaction } from "../interfaces"
import NewTransactionModal from "./NewTransactionModal/NewTransactionModal"
import EditTransactionModal from "./EditTransactionModal/EditTransactionModal"
import EditTransactionItemsModal from "./EditTransactionItemsModal/EditTransactionItemsModal"

interface Props {
  openedNewTransactionModals: Modal[]
  closeNewTransactionModal: Function
  openedEditTransactionModals: Modal[]
  closeEditTransactionModal: Function
  openedEditTransactionItemsModals: Modal[]
  openEditTransactionItemsModal: React.MouseEventHandler<HTMLButtonElement>
  closeEditTransactionItemsModal: Function
}

const WalletModals: React.FC<Props> = ({
  openedNewTransactionModals,
  closeNewTransactionModal,
  openedEditTransactionModals,
  closeEditTransactionModal,
  openedEditTransactionItemsModals,
  openEditTransactionItemsModal,
  closeEditTransactionItemsModal,
}) => {
  const { userSettings } = React.useContext(UserSettingsContext)
  const {
    transactions,
    addTransaction,
    editTransaction,
    addTransactionItem,
    removeTransactionItem,
  } = React.useContext(TransactionsContext)

  function findTransactionByID(transactionId: number): Transaction | undefined {
    return transactions.find(t => t.id === transactionId)
  }

  return (
    <>
      {openedNewTransactionModals.map(modal => (
        <NewTransactionModal
          key={modal.modalId}
          modalId={modal.modalId}
          closeModal={closeNewTransactionModal}
          addTransaction={addTransaction}
          openEditTransactionItemsModal={openEditTransactionItemsModal}
        />
      ))}

      {openedEditTransactionModals.map(modal => {
        const transaction = findTransactionByID(modal.additionalProps.transactionId)
        if (!transaction) return null

        return (
          <EditTransactionModal
            key={modal.modalId}
            modalId={modal.modalId}
            transaction={transaction}
            editTransaction={editTransaction}
            closeModal={closeEditTransactionModal}
          />
        )
      })}

      {openedEditTransactionItemsModals.map(modal => {
        const transaction = findTransactionByID(modal.additionalProps.transactionId)
        if (!transaction) return null

        return (
          <EditTransactionItemsModal
            key={modal.modalId}
            modalId={modal.modalId}
            transaction={transaction}
            currency={userSettings.currency}
            closeModal={closeEditTransactionItemsModal}
            addTransactionItem={addTransactionItem}
            removeTransactionItem={removeTransactionItem}
          />
        )
      })}
    </>
  )
}

export default WalletModals
