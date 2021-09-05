import * as React from "react"

interface Props {
  openNewTransactionModal: React.MouseEventHandler<HTMLButtonElement>
}

const NewTransactionButton: React.FC<Props> = ({ openNewTransactionModal }) => (
  <div className="new-transaction mt40">
    <button type="button" className="d-b m0a" onClick={openNewTransactionModal}>
      Add transaction
    </button>
  </div>
)

export default NewTransactionButton
