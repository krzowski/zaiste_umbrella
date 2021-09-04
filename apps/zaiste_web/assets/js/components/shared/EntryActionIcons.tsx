import * as React from "react"

interface Props {
  handleShowClick: any
  handleEditClick: any
  handleDeleteClick: any
}

const EntryActionIcons: React.FC<Props> = ({
  handleShowClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  function confirmHandleDeleteClick() {
    const deleteAccepted = window.confirm("This action cannot be reverted. Are you sure?")
    if (deleteAccepted) handleDeleteClick()
  }

  return (
    <div className="action-icons d-f">
      <i role="button" className="fas fa-list" onClick={handleShowClick} />
      <i role="button" className="fas fa-edit" onClick={handleEditClick} />
      <i role="button" className="fas fa-trash remove-icon" onClick={confirmHandleDeleteClick} />
    </div>
  )
}

export default EntryActionIcons
