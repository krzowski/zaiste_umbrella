import * as React from "react"
import { parse, formatDistanceToNow } from "date-fns"
import { Pattern, PatternCategory } from "../../interfaces"
import EntryActionIcons from "../../../shared/EntryActionIcons/EntryActionIcons"

interface Props {
  pattern: Pattern
  openPatternModal: Function
}

const PatternEntry: React.FC<Props> = ({ pattern, openPatternModal }) => {
  function lastActionInWords(category: PatternCategory) {
    const lastActionDate = parse(category.lastActionAt, "yyyy-MM-dd HH:mm", new Date())
    return formatDistanceToNow(lastActionDate, { addSuffix: true })
  }

  return (
    <div className="card event-card mt4">
      <div className="card-summary">
        <div className="pattern-drag">
          <i className="fas fa-grip-lines" />
        </div>
        <div className="pattern-name">{pattern.name}</div>

        <EntryActionIcons
          handleShowClick={() => openPatternModal({ patternId: pattern.id })}
          handleEditClick={() => {}}
          handleDeleteClick={() => {}}
        />
      </div>

      <div className="pattern-categories">
        {pattern.patternCategories.map((category) => (
          <div className="pattern-category flex-row-justify secondary-text">
            <div className="category-indicator" />
            <div className="category-name">{category.name}</div>

            <div className="pattern-last-action">
              {lastActionInWords(category)}
            </div>
            <div className="category-tasks-number numeric-font pr20">
              {category.patternTasks.filter(task => task.done).length}
              {' / '}
              {category.patternTasks.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatternEntry
