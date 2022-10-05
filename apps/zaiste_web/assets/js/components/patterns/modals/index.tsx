import * as React from "react"
import { Modal } from "../../../hooks/useModalCards"
import PatternModalCard from "./PatternModalCard/PatternModalCard"
import NewPatternModalCard from "./NewPatternModalCard/NewPatternModalCard"

interface Props {
  openedNewPatternModals: Modal[]
  openedPatternModals: Modal[]
}

const PatternModals: React.FC<Props> = ({ openedNewPatternModals, openedPatternModals }) => (
  <>
    {openedNewPatternModals.map(modal => (
      <NewPatternModalCard key={modal.modalId} modal={modal} />
    ))}

    {openedPatternModals.map(modal => (
      <PatternModalCard key={modal.modalId} modal={modal} />
    ))}

    {/* <PatternModalCard
        key={321313}
        modal={"321321321"}
      /> */}
  </>
)

export default PatternModals
