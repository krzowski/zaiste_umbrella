import * as React from 'react'

import ModalCard from '../shared/ModalCard'


interface Props {
  modalId: string
  closeModal: Function
}


const NewTransactionModal: React.FC<Props> = ({ modalId, closeModal }) => {
  const coords = document.getElementById('add_transaction_button').getBoundingClientRect()

  return (
    <ModalCard
      modalId={modalId}
      modalTitle="New transaction"
      closeModal={closeModal}
      modalWidth={300}
      modalHeight={200}
      initialTopPosition={20}
      initialLeftPosition={coords.left - 100}
    >
      <div>New transaction form</div>
    </ModalCard>
  )
}

export default NewTransactionModal

