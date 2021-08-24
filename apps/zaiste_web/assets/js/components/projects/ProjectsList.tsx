import * as React from 'react'
import ProjectEntry from './ProjectEntry'


interface Props {
  openProjectModal: Function
}

const ProjectsList: React.FC<Props> = ({ openProjectModal }) => {
  return (
    <div className="page-main">
      <div className="cards custom-scrollbar pr15 pl15 mt20">
        {projects.length ?
          projects.map(project => (
            <ProjectEntry
              key={project.id}
              project={project}
              openProjectModal={openProjectModal}
            />
          ))
          :
          <div className="card event mt2 p10">
            <div className="card-summary">
              There are no projects.
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProjectsList


var projects = [
  {
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
  },
  {
    id: 2,
    name: 'Exercise',
    description: 'Project used to test this web app',
    position: 1,
    project_categories: [
      {
        id: 1,
        name: '6-minute workouts',
        position: 1,
        last_action_at: '2021-05-31 03:00',
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
            done: true,
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
            updated_at: '2019-03-31 03:00'
          }
        ]
      },
      {
        id: 2,
        name: 'ABS workout',
        position: 3,
        last_action_at: '2021-08-20 19:53',
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
      },
      {
        id: 3,
        name: 'Cardio',
        position: 2,
        last_action_at: '2019-03-31 03:00',
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
  },
  {
    id: 3,
    name: 'Exercise',
    description: 'Project used to test this web app',
    position: 1,
    project_categories: [
      {
        id: 1,
        name: '6-minute workouts',
        position: 1,
        last_action_at: '2021-05-31 03:00',
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
            done: true,
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
            updated_at: '2019-03-31 03:00'
          }
        ]
      },
      {
        id: 2,
        name: 'ABS workout',
        position: 3,
        last_action_at: '2021-08-20 19:53',
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
      },
      {
        id: 3,
        name: 'Cardio',
        position: 2,
        last_action_at: '2019-03-31 03:00',
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
  },
  {
    id: 4,
    name: 'Exercise',
    description: 'Project used to test this web app',
    position: 1,
    project_categories: [
      {
        id: 1,
        name: '6-minute workouts',
        position: 1,
        last_action_at: '2021-05-31 03:00',
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
            done: true,
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
            updated_at: '2019-03-31 03:00'
          }
        ]
      },
      {
        id: 2,
        name: 'ABS workout',
        position: 3,
        last_action_at: '2021-08-20 19:53',
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
      },
      {
        id: 3,
        name: 'Cardio',
        position: 2,
        last_action_at: '2019-03-31 03:00',
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
  },
  {
    id: 5,
    name: 'Exercise',
    description: 'Project used to test this web app',
    position: 1,
    project_categories: [
      {
        id: 1,
        name: '6-minute workouts',
        position: 1,
        last_action_at: '2021-05-31 03:00',
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
            done: true,
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
            updated_at: '2019-03-31 03:00'
          }
        ]
      },
      {
        id: 2,
        name: 'ABS workout',
        position: 3,
        last_action_at: '2021-08-20 19:53',
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
      },
      {
        id: 3,
        name: 'Cardio',
        position: 2,
        last_action_at: '2019-03-31 03:00',
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
  },
  {
    id: 6,
    name: 'Exercise',
    description: 'Project used to test this web app',
    position: 1,
    project_categories: [
      {
        id: 1,
        name: '6-minute workouts',
        position: 1,
        last_action_at: '2021-05-31 03:00',
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
            done: true,
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
            updated_at: '2019-03-31 03:00'
          }
        ]
      },
      {
        id: 2,
        name: 'ABS workout',
        position: 3,
        last_action_at: '2021-08-20 19:53',
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
      },
      {
        id: 3,
        name: 'Cardio',
        position: 2,
        last_action_at: '2019-03-31 03:00',
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
  },
  {
    id: 7,
    name: 'Exercise',
    description: 'Project used to test this web app',
    position: 1,
    project_categories: [
      {
        id: 1,
        name: '6-minute workouts',
        position: 1,
        last_action_at: '2021-05-31 03:00',
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
            done: true,
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
            updated_at: '2019-03-31 03:00'
          }
        ]
      },
      {
        id: 2,
        name: 'ABS workout',
        position: 3,
        last_action_at: '2021-08-20 19:53',
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
      },
      {
        id: 3,
        name: 'Cardio',
        position: 2,
        last_action_at: '2019-03-31 03:00',
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
]
