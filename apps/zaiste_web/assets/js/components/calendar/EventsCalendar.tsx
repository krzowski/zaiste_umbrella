import * as React from 'react'

export interface EventsCalendarProps {
  month: number,
  events_data: Array<object> | null
}

export default function EventsCalendar(props) {
  return (
    <div>
      {props.events_data.map( event => <div key={event.id}>{event.name}</div> )}
    </div>
  )
}
