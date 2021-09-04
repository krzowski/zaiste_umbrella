import * as React from "react"
import { parse, formatDistanceToNow } from "date-fns"
import EntryActionIcons from "../../shared/EntryActionIcons"
import { ProjectCategory } from "../interfaces"

interface Props {
  category: ProjectCategory
}

// eslint-disable-next-line arrow-body-style
const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className="project-modal p15">
      <div className="card flex-row-justify">
        <EntryActionIcons
          handleShowClick={() => {}}
          handleEditClick={() => {}}
          handleDeleteClick={() => {}}
        />
      </div>
    </div>
  )
}

export default CategoryCard
