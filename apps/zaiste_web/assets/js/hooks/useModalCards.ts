import * as React from "react"

export interface Modal {
  modalId: string
  additionalProps: any
}

// Usage:
// const { openedModals, openModal, closeModal } = useModalCards(idPrefix)
//
// Render openedModals to ModalCard elements (e.g. NewTransactionModal):
//
//   {openedModals.map(modal => (
//     <NewTransactionModal
//       key={modal.modalId}
//       modal={modal}
//     />
//   ))}
//
// openModal takes an optional props argument that will be passed to a Modal object, e.g.:
//
//   openModal({ additionalProp: 1000 })
//
//   {openedModals.map(modal => (
//     <NewTransactionModal
//       key={modal.modalId}
//       modalId={modal.modalId}
//       additionalProp={modal.additionalProps.additionalProp}
//     />
//   ))}
//
// Modals are closed by invoking closeModal function with modalId.

function useModalCards(idPrefix: string) {
  const [openedModals, setOpenedModals] = React.useState<Modal[]>([])

  function openModal(props = {}) {
    const newModal = {
      modalId: idPrefix + +new Date(),
      additionalProps: props,
    }
    setOpenedModals([...openedModals, newModal])
  }

  function closeModal(modalId: string) {
    const filteredModals = openedModals.filter(modal => modal.modalId !== modalId)
    setOpenedModals(filteredModals)
  }

  return {
    openedModals,
    openModal,
    closeModal,
  }
}

export default useModalCards
