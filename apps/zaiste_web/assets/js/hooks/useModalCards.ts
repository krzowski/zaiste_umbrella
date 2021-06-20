import * as React from 'react'


interface Modal {
  modalId: string
}


// Usage:
// const { openedModals, openModal, closeModal } = useModalCards(id_prefix)
//
// Then map openedModals to react components implementing ModalCard (e.g. NewTransactionModal):
//
//   {openedModals.map(modal => (
//     <NewTransactionModal
//       key={modal.modalId}
//       modalId={modal.modalId}
//       closeModal={closeModal}
//     />
//   ))}


function useModalCards(id_prefix: string) {
  const [openedModals, setOpenedModals] = React.useState<Modal[]>([])

  function openModal() {
    const newModal = {
      modalId: id_prefix + +new Date()
    }
    setOpenedModals([...openedModals, newModal])
  }

  function closeModal(modalId: string) {
    const filteredModals = openedModals.filter(modal => {
      return modal.modalId !== modalId
    })
    setOpenedModals(filteredModals)
  }

  return {
    openedModals,
    openModal,
    closeModal
  }
}

export default useModalCards
