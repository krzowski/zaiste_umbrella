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
  openedEditTransactionModals: Modal[]
  openedEditTransactionItemsModals: Modal[]
  openEditTransactionItemsModal: React.MouseEventHandler<HTMLButtonElement>
}

const WalletModals: React.FC<Props> = ({
  openedNewTransactionModals,
  openedEditTransactionModals,
  openedEditTransactionItemsModals,
  openEditTransactionItemsModal,
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
          modal={modal}
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
            modal={modal}
            transaction={transaction}
            editTransaction={editTransaction}
          />
        )
      })}

      {openedEditTransactionItemsModals.map(modal => {
        const transaction = findTransactionByID(modal.additionalProps.transactionId)
        if (!transaction) return null

        return (
          <EditTransactionItemsModal
            key={modal.modalId}
            modal={modal}
            transaction={transaction}
            currency={userSettings.currency}
            addTransactionItem={addTransactionItem}
            removeTransactionItem={removeTransactionItem}
          />
        )
      })}
    </>
  )
}

export default WalletModals
