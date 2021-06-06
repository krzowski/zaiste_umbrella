import * as React from 'react'

import { DayEvents } from '../index';


interface Props {
  eventsData: Array<DayEvents>,
}

const EventsList: React.FC<Props> = ({eventsData}) => {
  return (
    <>
      <div className="social-events">
        <div className="section-title">Social events</div>

      </div>
      <div className="other-tasks">
        <div className="section-title">Tasks</div>
      </div>
    </>
  )
}

export default EventsList
