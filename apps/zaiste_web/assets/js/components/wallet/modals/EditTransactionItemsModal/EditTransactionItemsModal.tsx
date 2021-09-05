import * as React from "react"
import { Transaction } from "../../interfaces"
import { calculateItemsAmount } from "../../helper_functions"
import ModalCard from "../../../shared/ModalCard/ModalCard"
import TransactionItemEntry from "../TransactionItemEntry/TransactionItemEntry"
import TransactionItemForm from "../TransactionItemForm/TransactionItemForm"
import { requestDeleteTransactionItem } from "../../../../api_calls/wallet"
import { Modal } from "../../../../hooks/useModalCards"

interface Props {
  modal: Modal
  transaction: Transaction
  currency: string
  addTransactionItem: Function
  removeTransactionItem: Function
}

const EditTransactionItemsModal: React.FC<Props> = ({
  modal,
  transaction,
  currency,
  addTransactionItem,
  removeTransactionItem,
}) => {
  const { date, name, income, transactionItems } = transaction
  const transactionAmount = calculateItemsAmount(transaction.transactionItems).toFixed(2)

  function handleRemoveItemClick(transactionItemId: number) {
    requestDeleteTransactionItem(transaction.id, transactionItemId).then(response => {
      if (response.status === 204) removeTransactionItem(transaction, transactionItemId)
    })
  }

  return (
    <ModalCard
      modalId={modal.modalId}
      modalTitle={`${date} - ${name}`}
      closeModal={modal.close}
      modalWidth={window.innerWidth - 560}
      modalHeight={150 + transactionItems.length * 22}
      initialTopPosition={20}
      initialLeftPosition={280}
    >
      <div className="edit-transaction pt20 pr20 pb20">
        <div className="card no-background event-card mt2">
          <div className="card-summary">
            <div className="transaction-name">{name}</div>
            <div className={`transaction-amount numeric-font ${income ? "green" : "red"}`}>
              {!income && "-"}
              {transactionAmount} {currency}
            </div>
            <div className="transaction-items-toggle" />
          </div>

          <div className="card-items">
            {transactionItems.map(item => (
              <TransactionItemEntry
                key={item.id}
                transactionItem={item}
                handleRemoveItemClick={() => handleRemoveItemClick(item.id)}
                currency={currency}
              />
            ))}
          </div>
        </div>

        <div className="card-form">
          <TransactionItemForm transaction={transaction} addTransactionItem={addTransactionItem} />
        </div>
      </div>
    </ModalCard>
  )
}

export default EditTransactionItemsModal
