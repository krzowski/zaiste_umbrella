import * as React from "react"

interface Props {
  showButtonName: string
  handleShowClick: any
  editButtonName: string
  handleEditClick: any
  deleteButtonName: string
  handleDeleteClick: any
}

const EntryActionIcons: React.FC<Props> = ({
  showButtonName,
  handleShowClick,
  editButtonName,
  handleEditClick,
  deleteButtonName,
  handleDeleteClick,
}) => {
  function confirmHandleDeleteClick() {
    const deleteAccepted = window.confirm("This action cannot be reverted. Are you sure?")
    if (deleteAccepted) handleDeleteClick()
  }

  return (
    <div className="action-icons d-f">
      <i
        role="button"
        className="fas fa-list"
        onClick={handleShowClick}
        onKeyPress={handleShowClick}
        aria-label={showButtonName}
        tabIndex={0}
      />
      <i
        role="button"
        className="fas fa-edit"
        onClick={handleEditClick}
        onKeyPress={handleEditClick}
        aria-label={editButtonName}
        tabIndex={0}
      />
      <i
        role="button"
        className="fas fa-trash remove-icon"
        onClick={confirmHandleDeleteClick}
        onKeyPress={confirmHandleDeleteClick}
        aria-label={deleteButtonName}
        tabIndex={0}
      />
    </div>
  )
}

export default EntryActionIcons
