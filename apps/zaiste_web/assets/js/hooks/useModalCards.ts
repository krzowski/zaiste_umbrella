import * as React from 'react'

// Usage:
// const { openedModals, openModal, closeModal } = useModalCards(id_prefix)

function useModalCards(id_prefix: string) {
  const [openedModals, setOpenedModals] = React.useState([])

  function openModal() {
    const newModal = {
      modalId: id_prefix + +new Date()
    }
    setOpenedModals([...openedModals, newModal])
  }

  function closeModal(modalId) {
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
