import * as React from 'react'

interface EventObject {
  id: number
  name: string
  date: string
  done: boolean
  position: number | null
}
interface DayEvents {
  date: string
  events: Array<EventObject>
}
interface Props {
  month: string
  events_data: Array<DayEvents>
}

const EventsCalendar: React.FC<Props> = ({month, events_data}) => {
  return (
    <div>
      {events_data.map( day_events => {
        return (<div>
          {day_events.events.map( event => <div key={event.id}>{event.name}</div> )}
        </div>)
      } )}
    </div>
  )
}

export default EventsCalendar;
