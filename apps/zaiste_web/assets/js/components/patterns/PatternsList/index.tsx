/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import * as React from "react"
import PatternEntry from "./PatternEntry/PatternEntry"

interface Props {
  openPatternModal: Function
}

const PatternsList: React.FC<Props> = ({ openPatternModal }) => (
  <div className="page-main">
    <div className="cards custom-scrollbar pr15 pl15 mt20">
      {patterns.length ? (
        patterns.map(pattern => (
          <PatternEntry key={pattern.id} pattern={pattern} openPatternModal={openPatternModal} />
        ))
      ) : (
        <div className="card event mt2 p10">
          <div className="card-summary">There are no patterns.</div>
        </div>
      )}
    </div>
  </div>
)

export default PatternsList

var patterns = [
  {
    id: 1,
    name: "Create app",
    description: "pattern used to test this web app",
    position: 2,
    patternCategories: [
      {
        id: 1,
        name: "patterns functionality",
        position: 1,
        lastActionAt: "2021-03-31 03:00",
        patternTasks: [
          {
            id: 1,
            title: "Create new pattern",
            description: "",
            done: true,
            position: 1,
            priority: 6,
            updatedAt: "2019-03-31 03:00",
          },
          {
            id: 2,
            title: "Add pattern category",
            description: "",
            done: false,
            position: 2,
            priority: 5,
            updatedAt: "2019-03-31 03:00",
          },
          {
            id: 3,
            title: "Add pattern task",
            description: "",
            done: false,
            position: 3,
            priority: 5,
            updatedAt: "2019-03-31 03:00",
          },
          {
            id: 5,
            title: "Do pattern task",
            description: "",
            done: false,
            position: 5,
            priority: 8,
            updatedAt: "2021-03-31 03:00",
          },
        ],
      },
      {
        id: 2,
        name: "Contacts functionality",
        position: 2,
        lastActionAt: "2021-07-31 03:00",
        patternTasks: [
          {
            id: 7,
            title: "Add new contact",
            description: "",
            done: false,
            position: 1,
            priority: 3,
            updatedAt: "2019-03-31 03:00",
          },
        ],
      },
    ],
  },
]
