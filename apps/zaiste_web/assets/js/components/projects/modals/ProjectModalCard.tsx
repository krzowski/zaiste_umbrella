/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import * as React from "react"
import ModalCard from "../../shared/ModalCard"
import CategoryCard from "./CategoryCard"

interface Props {
  modalId: string
  closeModal: Function
}

const ProjectModalCard: React.FC<Props> = ({ modalId, closeModal }) => (
  <ModalCard
    modalId={modalId}
    modalTitle={project.projectCategories[0].name}
    closeModal={closeModal}
    modalWidth={500}
    modalHeight={window.innerHeight}
    initialTopPosition={0}
    initialLeftPosition={window.innerWidth - 500}
  >
    <CategoryCard category={project.projectCategories[0]} />
  </ModalCard>
)

export default ProjectModalCard

var project = {
  id: 1,
  name: "Create app",
  description: "Project used to test this web app",
  position: 2,
  projectCategories: [
    {
      id: 1,
      name: "Projects functionality",
      position: 1,
      lastActionAt: "2021-03-31 03:00",
      projectTasks: [
        {
          id: 1,
          title: "Create new project",
          description: "",
          done: true,
          position: 1,
          priority: 6,
          updatedAt: "2019-03-31 03:00",
        },
        {
          id: 2,
          title: "Add project category",
          description: "",
          done: false,
          position: 2,
          priority: 5,
          updatedAt: "2019-03-31 03:00",
        },
        {
          id: 3,
          title: "Add project task",
          description: "",
          done: false,
          position: 3,
          priority: 5,
          updatedAt: "2019-03-31 03:00",
        },
        {
          id: 5,
          title: "Do project task",
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
      projectTasks: [
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
}
