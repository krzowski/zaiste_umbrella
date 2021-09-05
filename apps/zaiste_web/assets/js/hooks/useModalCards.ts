/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"

export interface Modal {
  modalId: string
  additionalProps: any
  close: Function
}

// Usage:
//
//   const { openedModals, openModal, closeModal } = useModalCards(idPrefix)
//
// Map openedModals to ModalCard components (e.g. NewTransactionModal):
//
//   {openedModals.map(modal => (
//     <ModalCardComponent
//       key={modal.modalId}
//       modal={modal}
//     />
//   ))}
//
// openModal takes an optional props argument that will be passed to a Modal object, e.g.:
//
//   openModal({ prop: 1000 })
//
//   {openedModals.map(modal => (
//     <ModalCardComponent
//       key={modal.modalId}
//       modal={modal}
//       prop={modal.additionalProps.prop}
//     />
//   ))}
//
// Modals are closed by invoking closeModal function with modalId.

function useModalCards(idPrefix: string) {
  const [openedModals, setOpenedModals] = React.useState<Modal[]>([])

  function openModal(additionalProps = {}): void {
    const newModal = {
      modalId: idPrefix + +new Date(),
      additionalProps,
      close: undefined
    }
    updateOpenedModals([...openedModals, newModal])
  }

  function closeModal(modals: Modal[], modalId: string): void {
    const filteredModals = modals.filter(modal => modal.modalId !== modalId)
    updateOpenedModals(filteredModals)
  }

  // Refresh close function in modals
  function updateOpenedModals(modals: Modal[]): void {
    setOpenedModals(
      modals.map(modal => {
        return {
          ...modal,
          close: () => closeModal(modals, modal.modalId)
        }
      })
    )
  }

  return {
    openedModals,
    openModal
  }
}

export default useModalCards
