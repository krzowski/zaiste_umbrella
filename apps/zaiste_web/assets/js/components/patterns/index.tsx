import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import useModalCards from "../../hooks/useModalCards"
import PatternsList from "./PatternsList"
import PatternsMenu from "./menu"
import PatternModals from "./modals"

const Patterns: React.FC<RouteComponentProps> = () => {
  const { openedModals: openedNewPatternModals, openModal: openNewPatternModal } =
    useModalCards("new_pattern")
  const { openedModals: openedPatternModals, openModal: openPatternModal } =
    useModalCards("pattern")

  return (
    <div className="page-container patterns-container">
      <PatternsList openPatternModal={openPatternModal} />

      <PatternsMenu openNewPatternModal={openNewPatternModal} />

      <PatternModals
        openedNewPatternModals={openedNewPatternModals}
        openedPatternModals={openedPatternModals}
      />
    </div>
  )
}

export default Patterns
