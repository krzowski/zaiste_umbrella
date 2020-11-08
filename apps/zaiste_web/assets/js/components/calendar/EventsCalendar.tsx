import * as React from 'react'

export interface EventObject {
  id: number,
  name: string,
  date: string,
  done: boolean,
  position: number | null
}
export interface DayEvents {
  date: string,
  events: Array<EventObject>
}
interface EventsCalendarProps {
  month: number,
  events_data: Array<DayEvents>
}

export default function EventsCalendar(props: EventsCalendarProps) {
  console.log(props.events_data)

  return (
    <div>
      {props.events_data.map( day_events => {
        return (<div>
          {day_events.events.map( event => <div key={event.id}>{event.name}</div> )}
        </div>)
      } )}
    </div>
  )
}
