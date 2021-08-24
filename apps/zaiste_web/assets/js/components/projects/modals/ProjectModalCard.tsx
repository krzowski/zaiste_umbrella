import * as React from 'react'
import ModalCard from '../../shared/ModalCard'
import Project from './Project'


interface Props {
  modalId: string
  closeModal: Function
}


const ProjectModalCard: React.FC<Props> = ({ modalId, closeModal }) => {
  return (
    <ModalCard
      modalId={modalId}
      modalTitle={project.name}
      closeModal={closeModal}
      modalWidth={window.innerWidth - 560}
      modalHeight={window.innerHeight - 40}
      initialTopPosition={20}
      initialLeftPosition={530}
    >
      <Project project={project} />
    </ModalCard>
  )
}

export default ProjectModalCard


var project = {
  id: 1,
  name: 'Create app',
  description: 'Project used to test this web app',
  position: 2,
  project_categories: [
    {
      id: 1,
      name: 'Projects functionality',
      position: 1,
      last_action_at: '2021-03-31 03:00',
      project_tasks: [
        {
          id: 1,
          title: 'Create new project',
          description: '',
          done: true,
          position: 1,
          priority: 6,
          updated_at: '2019-03-31 03:00'
        },
        {
          id: 2,
          title: 'Add project category',
          description: '',
          done: false,
          position: 2,
          priority: 5,
          updated_at: '2019-03-31 03:00'
        },
        {
          id: 3,
          title: 'Add project task',
          description: '',
          done: false,
          position: 3,
          priority: 5,
          updated_at: '2019-03-31 03:00'
        },
        {
          id: 5,
          title: 'Do project task',
          description: '',
          done: false,
          position: 5,
          priority: 8,
          updated_at: '2021-03-31 03:00'
        }
      ]
    },
    {
      id: 2,
      name: 'Contacts functionality',
      position: 2,
      last_action_at: '2021-07-31 03:00',
      project_tasks: [
        {
          id: 7,
          title: 'Add new contact',
          description: '',
          done: false,
          position: 1,
          priority: 3,
          updated_at: '2019-03-31 03:00'
        }
      ]
    }
  ]
}
