import * as React from 'react'


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
}) => (
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
      onClick={handleDeleteClick}
      onKeyPress={handleDeleteClick}
      aria-label={deleteButtonName}
      tabIndex={0}
    />
  </div>
)

export default EntryActionIcons
