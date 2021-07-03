import * as React from 'react'


interface Modal {
  modalId: string
  additionalProps: any
}


// Usage:
// const { openedModals, openModal, closeModal } = useModalCards(id_prefix)
//
// In render, map openedModals to react component which implements ModalCard (e.g. NewTransactionModal):
//
//   {openedModals.map(modal => (
//     <NewTransactionModal
//       key={modal.modalId}
//       modalId={modal.modalId}
//       closeModal={closeModal}
//     />
//   ))}
//
// openModal takes an optional object with props which will be passed to openedModals, e.g.:
//
//   openModal({ additionalProp: 1000 })
//
//   {openedModals.map(modal => (
//     <NewTransactionModal
//       key={modal.modalId}
//       additionalProp={modal.additionalProps.additionalProp}
//       modalId={modal.modalId}
//       closeModal={closeModal}
//     />
//   ))}
//

function useModalCards(id_prefix: string) {
  const [openedModals, setOpenedModals] = React.useState<Modal[]>([])

  function openModal(props = {}) {
    const newModal = {
      modalId: id_prefix + +new Date(),
      additionalProps: props
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
